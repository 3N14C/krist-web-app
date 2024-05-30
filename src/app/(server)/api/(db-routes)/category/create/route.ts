import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const POST = async (req: NextRequest) => {
  const { name }: { name: string } = await req.json();

  const category = await prisma.category.create({
    data: {
      name: name,
    },
  });

  return NextResponse.json({
    category,
    message: "Category successfully created",
  });
};
