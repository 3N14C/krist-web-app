import { NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const GET = async () => {
  const sizes = await prisma.size.findMany({
    include: {
      products: true,
    },
  });

  return NextResponse.json(sizes);
};
