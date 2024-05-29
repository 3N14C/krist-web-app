import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../../prisma/prisma-client";
import { Role } from "@prisma/client";

export const PATCH = async (req: NextRequest) => {
  const { role }: { role: Role } = await req.json();

  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("id");

  const user = await prisma.user.update({
    where: {
      id: userId as string,
    },

    data: {
      role: role,
    },
  });

  return NextResponse.json({
    user,
    message: "User role successfully updated",
  });
};
