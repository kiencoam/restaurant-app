import { hasPermission } from "@/auth";
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

  const payload = decodeJWT(token.value);
  const role = payload.scope;
  if (!role || !hasPermission(role, pathname)) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*"],
};
