import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma-client";
import { z } from "zod";
import { postReviewSchema } from "@/server/zod-validators/post-review.validator";

export const POST = async (req: NextRequest) => {
  const data: z.infer<typeof postReviewSchema> = await req.json();

  const createReview = await prisma.review.create({
    data: {
      title: data.title,
      body: data.body,
      rating: data.rating,
      products: {
        connect: {
          id: data.productId,
        },
      },
      user: {
        connect: {
          id: data.userId,
        },
      },
    },
  });

  return NextResponse.json(createReview);
};
