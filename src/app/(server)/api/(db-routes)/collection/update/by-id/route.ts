import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../../prisma/prisma-client";

export const PATCH = async (req: NextRequest) => {
  const {
    name,
    img,
    categoryId,
  }: { name: string; img: string; categoryId: string } = await req.json();
  const { searchParams } = req.nextUrl;
  const collectionId = searchParams.get("id");

  const collection = await prisma.collection.update({
    where: {
      id: collectionId as string,
    },

    data: {
      name,
      img: img ?? "",
      categoryId,
    },
  });

  return NextResponse.json({
    collection,
    message: "Collection successfully updated",
  });
};
