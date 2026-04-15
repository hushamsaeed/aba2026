import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Payload CMS handles its own auth for /admin routes
  // Only protect custom /api/admin routes that still use old auth
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/admin")) {
    const token = request.cookies.get("aba-admin-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*"],
};
