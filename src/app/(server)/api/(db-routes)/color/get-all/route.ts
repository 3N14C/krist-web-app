import { NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const GET = async () => {
  const colors = await prisma.color.findMany({
    include: {
      products: true,
    },
  });

  return NextResponse.json(colors);
};
