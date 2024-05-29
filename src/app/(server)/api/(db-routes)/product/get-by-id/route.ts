import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const productId = searchParams.get("id");

  const product = await prisma.product.findUnique({
    where: {
      id: productId as string,
    },

    include: {
      reviews: {
        include: {
          user: true,
        },
      },
      colors: true,
      sizes: true,
    },
  });

  return NextResponse.json(product);
};
