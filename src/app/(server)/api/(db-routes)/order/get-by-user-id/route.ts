import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("id");

  const orders = await prisma.order.findMany({
    where: {
      userId: userId as string,
    },

    include: {
      user: true,
      product: true,
    },
  });

  return NextResponse.json(orders);
};
