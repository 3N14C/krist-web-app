import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("id");

  const orderService = await prisma.serviceOrder.findMany({
    where: {
      userId: userId as string,
    },

    include: {
      user: true,
      service: true,
    },
  });

  return NextResponse.json(orderService);
};
