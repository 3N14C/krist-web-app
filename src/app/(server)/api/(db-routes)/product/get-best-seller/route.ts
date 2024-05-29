import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const GET = async (req: NextRequest) => {
  const products = await prisma.product.findMany({
    where: {
      reviews: {
        some: {
          rating: {
            gte: 3,
          },
        },
      },
    },

    take: 8,
    orderBy: {
      reviews: {
        _count: "desc",
      },
    },
  });

  return NextResponse.json(products);
};
