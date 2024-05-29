import { NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const GET = async () => {
  const categories = await prisma.category.findMany({
    include: {
      collection: true,
    },
  });

  return NextResponse.json(categories);
};
