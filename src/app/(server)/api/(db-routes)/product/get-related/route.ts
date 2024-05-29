import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const productId = searchParams.get("productId");
  const collectionId = searchParams.get("collectionId");

  const relatedProducts = await prisma.product.findMany({
    where: {
      collectionId: collectionId as string,
      id: {
        not: productId as string,
      },
    },

    take: 4,

    include: {
      reviews: true,
      colors: true,
      sizes: true,
    },
  });

  return NextResponse.json(relatedProducts);
};
