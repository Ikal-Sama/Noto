import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
  const { pathname } = new URL(request.url);

  // Redirect unauthenticated users trying to access protected routes to root
  if (!sessionCookie && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect authenticated users away from auth pages and root to dashboard
  if (sessionCookie) {
    if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/login", "/signup"],
};