import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const POST = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("userId");
  const serviceId = searchParams.get("serviceId");

  const orderService = await prisma.orderService.create({
    data: {
      serviceId: serviceId as string,
      user: {
        connect: {
          id: userId as string,
        },
      },
    },
  });

  return NextResponse.json(orderService);
};
