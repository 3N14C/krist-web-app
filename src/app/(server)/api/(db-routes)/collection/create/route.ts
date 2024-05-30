import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const POST = async (req: NextRequest) => {
  const { name }: { name: string } = await req.json();

  const collection = await prisma.collection.create({
    data: {
      name,
      img: "",
    },
  });

  return NextResponse.json({
    collection,
    message: "Collection successfully created",
  });
};
