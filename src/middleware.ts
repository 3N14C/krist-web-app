import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export const middleware = async (req: NextRequest) => {
  const userToken = req.cookies.get("token")?.value;

  if (!userToken && req.nextUrl.pathname.includes("/profile")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (req.nextUrl.pathname.includes("/auth") && userToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!userToken && req.nextUrl.pathname.includes("/admin-panel")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!userToken) {
    return NextResponse.next();
  }

  const jwtVerify = await jose.jwtVerify(
    userToken,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  if (
    jwtVerify.payload.role !== "ADMIN" &&
    req.nextUrl.pathname.includes("/admin-panel")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/auth/:path*", "/profile:path*", "/admin-panel:path*"],
};
