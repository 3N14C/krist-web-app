import { NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const GET = async () => {
  const products = await prisma.product.findMany({});

  return NextResponse.json(products);
};
