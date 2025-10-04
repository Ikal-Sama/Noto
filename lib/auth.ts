import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { hash, compare } from 'bcryptjs';

// Reuse the singleton Prisma instance (with Accelerate) defined in lib/prisma.ts

export const auth = betterAuth({
    socialProviders: {
      google: { 
          clientId: process.env.GOOGLE_CLIENT_ID as string, 
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
      }, 
  },
  emailAndPassword: { 
    enabled: true, 
    password: {
      hash: async (password: string) => {
        return await hash(password, 10);
      },
      verify: async ({ hash, password }: { hash: string; password: string }) => {
        return await compare(password, hash);
      }
    }
  }, 
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  plugins: [nextCookies()]
});