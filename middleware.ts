import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token && request.nextUrl.pathname.startsWith("/blogs/") && request.nextUrl.pathname !== "/blogs") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check if token is expired
  if (token && token.exp && Date.now() >= token.exp * 1000) {
    // Token has expired, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/blogs/:path*"],
};
