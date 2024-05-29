import { NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";

export const GET = async () => {
  const services = await prisma.service.findMany({
    include: {
      
    }
  });

  return NextResponse.json(services);
};
