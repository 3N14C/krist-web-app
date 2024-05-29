import * as jose from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "../../../../../../../../prisma/prisma-client";

export const GET = async () => {
  const token = cookies().get("token")?.value;

  if (!token) {
    throw new Error("Токен отсутствует");
  }

  try {
    const verifiedJwt = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    if (!verifiedJwt) throw new Error("Invalid token");

    const user = await prisma.user.findUnique({
      where: {
        id: verifiedJwt.payload.sub,
      },
    });

    if (!user) throw new Error("User not found");

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof jose.errors.JWTExpired) {
      cookies().delete("token");
    }
  }

  return NextResponse.json({});
};
