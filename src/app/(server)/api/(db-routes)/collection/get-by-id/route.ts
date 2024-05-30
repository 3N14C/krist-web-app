import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const collectionId = searchParams.get("id");

  const colleciton = await prisma.collection.findUnique({
    where: {
      id: collectionId as string,
    },
  });

  return NextResponse.json(colleciton);
};
