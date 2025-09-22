import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { nextCookies } from "better-auth/next-js";

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
  }, 
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  plugins: [nextCookies()]
});