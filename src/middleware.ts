import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const userToken = req.cookies.get("token")?.value;

  if (req.nextUrl.pathname.includes("/auth") && userToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!userToken && req.nextUrl.pathname.includes("/profile")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/auth/:path*", "/profile"],
};
