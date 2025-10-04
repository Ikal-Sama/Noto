"use server";

import * as z from 'zod'
import { compare, hash } from 'bcryptjs';
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { editPasswordFormSchema, editProfileFormSchema } from '@/lib/schemas';

export async function updateProfileImage(imageUrl: string) {
  try {
    const session = await auth.api.getSession({
        headers: await headers(),
      });
    
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    // Update the user's image in the database
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { image: imageUrl },
    });

    // Update the session with the new image
    // With better-auth, the session will be updated automatically when we update the user in the database
    // No need for an additional API call to update the session

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating profile image:", error);
    return { success: false, error: "Failed to update profile image" };
  }
}


export const  updateProfileDetails = async(values: z.infer<typeof editProfileFormSchema>) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  const validatedFields = editProfileFormSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid input data"
    };
  }

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: { name: values.name, email: values.email },
  });

  return { success: true, user: updatedUser };
}


export const updatePassword = async (values: z.infer<typeof editPasswordFormSchema>) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  const validatedFields = editPasswordFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid input data"
    };
  }

  const { currentPassword, newPassword } = validatedFields.data;

  // --- 1. FIND THE CREDENTIAL ACCOUNT ---
  const account = await prisma.account.findFirst({
    where: { 
      userId: session.user.id,
      providerId: "credential",
      NOT: {
        password: null 
      }
    },
    select: { id: true, password: true }
  });

  if (!account || !account.password) {
    return {
      success: false,
      error: "No email/password account found. Please use a social provider or set a password first."
    };
  }

  // --- 2. VERIFY CURRENT PASSWORD USING BCRYPT ---
  console.log('Verifying current password with bcrypt...');
  const isPasswordValid = await compare(currentPassword, account.password);
  
  if (!isPasswordValid) {
    return {
      success: false,
      error: "Current password is incorrect"
    };
  }

  // --- 3. HASH NEW PASSWORD USING BCRYPT ---
  console.log('Hashing new password with bcrypt...');
  const saltRounds = 10; // Match the same cost factor used in auth.ts
  const newHashedPassword = await hash(newPassword, saltRounds);

  // --- 4. UPDATE PASSWORD IN DATABASE ---
  const updatedAccount = await prisma.account.update({
    where: { id: account.id },
    data: { 
      password: newHashedPassword,
      updatedAt: new Date()
    },
    select: { id: true, userId: true } 
  });

  return { 
    success: true, 
    account: updatedAccount 
  };
};