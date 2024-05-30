import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const PATCH = async (req: NextRequest) => {
  const { name }: { name: string } = await req.json();
  const { searchParams } = req.nextUrl;
  const categoryId = searchParams.get("id");

  const category = await prisma.category.update({
    where: {
      id: categoryId as string,
    },

    data: {
      name,
    },
  });

  return NextResponse.json({
    category,
    message: "Category successfully updated",
  });
};
