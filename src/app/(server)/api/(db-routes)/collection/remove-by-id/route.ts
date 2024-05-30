import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const collectionId = searchParams.get("id");

  const collection = await prisma.collection.delete({
    where: {
      id: collectionId as string,
    },
  });

  return NextResponse.json({
    collection,
    message: "Collection successfully deleted",
  });
};
