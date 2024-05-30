import { z } from "zod";
import prisma from "../../../../../../../../prisma/prisma-client";
import { customOrderServiceSchema } from "@/server/zod-validators/post-custom-order-service";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const input: z.infer<typeof customOrderServiceSchema> & { userId: string } =
    await req.json();

  const service = await prisma.ticketServiceOrder.create({
    data: {
      title: input.title,
      message: input.title,
      userId: input.userId,
    },
  });

  return NextResponse.json(service);
};
