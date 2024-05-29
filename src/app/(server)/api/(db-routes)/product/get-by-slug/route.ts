import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";
import { Prisma } from "@prisma/client";
import { ProductInputSlug } from "@/interfaces/product-slug-interface";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const input: ProductInputSlug = {
    categoryId: searchParams.get("categoryId")?.split(","),
    collectionId: searchParams.get("collectionId")?.split(","),
    price: Number(searchParams.get("price")),
    colorId: searchParams.get("colorId")?.split(","),
    sizeId: searchParams.get("sizeId")?.split(","),
  };

  console.log(input.categoryId);

  let whereCondition: Prisma.ProductWhereInput = {};

  if (input.categoryId && input.categoryId.length > 0) {
    whereCondition.categoryId = {
      in: input.categoryId,
    };
  }

  if (input.collectionId && input.collectionId.length > 0) {
    whereCondition.collectionId = {
      in: input.collectionId,
    };
  }

  if (input.price) {
    whereCondition.price = {
      gte: input.price,
    };
  }

  if (input.colorId && input.colorId.length > 0) {
    whereCondition.colors = {
      some: {
        id: {
          in: input.colorId,
        },
      },
    };
  }

  if (input.sizeId && input.sizeId.length > 0) {
    whereCondition.sizes = {
      some: {
        id: {
          in: input.sizeId,
        },
      },
    };
  }

  const products = await prisma.product.findMany({
    where: whereCondition,

    include: {
      reviews: true,
      colors: true,
      sizes: true,
    },
  });

  return NextResponse.json(products);
};
