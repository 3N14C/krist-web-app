import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../../prisma/prisma-client";
import { cookies } from "next/headers";
import * as jose from "jose";
import { z } from "zod";
import { updateCurrentUserSchema } from "@/server/zod-validators/update-current-user.validator";

export const PATCH = async (req: NextRequest) => {
  const data: z.infer<typeof updateCurrentUserSchema> = await req.json();

  const token = cookies().get("token")?.value;

  if (!token) {
    throw new Error("Токен отсутствует");
  }

  const verifiedJwt = await jose.jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  const userExists = await prisma.user.findUnique({
    where: {
      id: verifiedJwt.payload.sub,
    },
  });

  if (!userExists) throw new Error("User not found");

  const user = await prisma.user.update({
    where: {
      id: userExists.id,
    },

    data: {
      username: data.username,
      email: data.email,
      avatar: data.avatar,
      phone: data.phoneNumber,
    },
  });

  return NextResponse.json(user);
};
