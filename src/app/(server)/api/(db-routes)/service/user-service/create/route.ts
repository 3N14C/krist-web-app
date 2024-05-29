import { z } from "zod";
import prisma from "../../../../../../../../prisma/prisma-client";
import { customOrderServiceSchema } from "@/server/zod-validators/post-custom-order-service";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const input: z.infer<typeof customOrderServiceSchema> = await req.json();

  const service = await prisma.customOrderService.create({
    data: {
      user: {
        connect: {
          id: input.userId,
        },
      },

      title: input.title,
      message: input.title,
    },
  });

  return NextResponse.json(service);
};
