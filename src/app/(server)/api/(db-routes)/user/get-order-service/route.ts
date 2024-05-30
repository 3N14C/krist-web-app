import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("id");

  const userOrderService = await prisma.user.findUnique({
    where: {
      id: userId as string,
    },

    include: {
      serviceOrder: true,
      ticketServiceOrder: true,
    },
  });

  return NextResponse.json(userOrderService);
};
