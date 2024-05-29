import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../../prisma/prisma-client";

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const orderId = searchParams.get("id");

  const order = await prisma.order.delete({
    where: {
      id: orderId as string,
    },
  });

  return NextResponse.json({
    order,
    message: "Order successfully removed",
  });
};
