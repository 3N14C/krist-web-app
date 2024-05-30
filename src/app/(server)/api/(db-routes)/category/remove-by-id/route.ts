import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const categoryId = searchParams.get("id");

  const category = await prisma.category.delete({
    where: {
      id: categoryId as string,
    },
  });

  return NextResponse.json({
    category,
    message: "Category successfully deleted",
  });
};
