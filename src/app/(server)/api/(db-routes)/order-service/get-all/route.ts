import { NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const GET = async () => {
  const orderServices = await prisma.serviceOrder.findMany({
    include: {
      user: true,
    },
  });

  return NextResponse.json(orderServices);
};
