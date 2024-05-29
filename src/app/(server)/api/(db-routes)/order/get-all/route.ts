import { NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const GET = async () => {
  const orders = await prisma.order.findMany({});

  return NextResponse.json(orders);
};
