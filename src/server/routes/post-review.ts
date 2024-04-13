import { publicProcedure } from "../trpc";
import { postReviewSchema } from "../zod-validators/post-review.validator";
import prisma from "../../../prisma/prisma-client";

export const postReview = publicProcedure
  .input(postReviewSchema)
  .mutation(async ({ input }) => {
    const createReview = await prisma.review.create({
      data: {
        title: input.title,
        body: input.body,
        rating: input.rating,
        products: {
          connect: {
            id: input.productId,
          },
        },
        user: {
          connect: {
            id: input.userId,
          },
        },
      },
    });

    return createReview;
  });
