import { NextRequest, NextResponse } from "next/server";
import { Log } from "@/utils/logger";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  Log(
    "frontend",
    "info",
    "middleware",
    `Incoming request: ${method} ${pathname}`
  );

  const response = NextResponse.next();

  Log(
    "frontend",
    "debug",
    "middleware",
    `Request processed: ${method} ${pathname}`
  );

  return response;
}

export const config = {
  matcher: ["/", "/api/:path*"],
};
