import { NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const GET = async () => {
  const collections = await prisma.collection.findMany({});

  return NextResponse.json(collections);
};
