import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../../prisma/prisma-client";

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const orderServiceId = searchParams.get("id");

  const orderService = await prisma.serviceOrder.delete({
    where: {
      id: orderServiceId as string,
    },
  });

  return NextResponse.json({
    orderService,
    message: "Order service successfully removed",
  });
};
