"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getUser() {
    const sessionResponse = await auth.api.getSession({
        headers: await headers(),
    });

    // Ensure we have a proper session object with user data
    const session = sessionResponse?.session
        ? {
            ...sessionResponse.session,
            user: sessionResponse.user,
          }
        : null;

    const user = session?.user ?? null;
    return user;
}
