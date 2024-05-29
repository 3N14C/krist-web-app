import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const categoryId = searchParams.get("id")?.split(",");

  const categories = await prisma.category.findMany({
    include: {
      collection: true,
    },
    where: {
      id: {
        in: categoryId,
      },
    },
  });

  return NextResponse.json(categories);
};
