import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("admin-token");
  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  if (isLoginPage) {
    if (!token) return NextResponse.next();
    try {
      await jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch {
      return NextResponse.next();
    }
  }

  if (isDashboard) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    try {
      await jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/login"],
};
