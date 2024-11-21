import { hasPermission } from "@/data/auth";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJWT } from "./utils/JWTDecoder";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const pathname = request.nextUrl.pathname;

  console.log("Pathname:", pathname);

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const role = decodeToken(token);
  if (!role || !hasPermission(role, pathname)) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

function decodeToken(token: RequestCookie): string | null {
  const tokenValue = decodeJWT(token.value);

  // Decode and verify token here
  // For the sake of example, returning a hardcoded object
  return "TESTER";
  return tokenValue.scope;
}

export const config = {
  matcher: ["/home/:path*"],
};
