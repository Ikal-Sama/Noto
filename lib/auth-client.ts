import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    // Use current origin in the browser, or fall back to env for SSR/build
    baseURL: typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL,
})