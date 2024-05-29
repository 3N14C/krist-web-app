import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const GET = async (req: NextRequest) => {
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
};
