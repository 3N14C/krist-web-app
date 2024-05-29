import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../../prisma/prisma-client";
import { z } from "zod";
import { userRegisterSchema } from "@/server/zod-validators/user.validator";
import * as jose from "jose";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  const data: z.infer<typeof userRegisterSchema> = await req.json();

  const user = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: data.password,
    },
  });

  const jwt = await new jose.SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .setSubject(user.id.toString())
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  cookies().set("token", jwt, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30d
    path: "/",
    sameSite: "strict",
  });

  return NextResponse.json({ token: jwt });
};
