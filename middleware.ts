import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Login page is always accessible
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;
  const secret = process.env.AUTH_SECRET;

  if (!secret || token !== secret) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
