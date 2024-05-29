import * as jose from "jose";
import { userLoginSchema } from "@/server/zod-validators/user.validator";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../../../../../prisma/prisma-client";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  const data: z.infer<typeof userLoginSchema> = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new Error("Неверная почта или пароль");
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = "HS256";
  const jwt = await new jose.SignJWT({ role: user.role })
    .setProtectedHeader({ alg })
    .setExpirationTime("30d")
    .setSubject(user.id.toString())
    .sign(secret);

  cookies().set("token", jwt, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30d
    path: "/",
    sameSite: "strict",
  });

  return NextResponse.json({ token: jwt });
};
