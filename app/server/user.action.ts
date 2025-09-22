"use server"

import { signInSchema } from "@/components/login-form";
import { signUpSchema } from "@/components/signup-form";
import { auth } from "@/lib/auth";
import { z } from "zod"
import { headers } from "next/headers";

export const signIn= async(values: z.infer<typeof signInSchema>) => {
    try {
        await auth.api.signInEmail({
            body: {
                email: values.email, 
                password: values.password, 
            },
            headers: await headers(),
        });
        return{
            success: true,
            message: "Signed in successfully"
        }
    } catch (error) {
        const e = error as Error
        return{
            success: false,
            message: e.message || "An unknown error occured."
        }
    }
    
}



export const signUp= async(values: z.infer<typeof signUpSchema>) => {
    try {
        await auth.api.signUpEmail({
        body: {
            name: values.username, // required
            email: values.email, 
            password: values.password, 
        },
        headers: await headers(),
    });
    return{
        success: true,
        message: "Signed up successfully"
    }
    }catch(error) {
        const e = error as Error
        return{
            success: false,
            message: e.message || "An unknown error occured."
        }
    }
}



