import { publicProcedure, router } from "../trpc";
import prisma from "../../../prisma/prisma-client";
import { customOrderServiceSchema } from "../zod-validators/post-custom-order-service";

export const customOrderService = router({
  createCustomOrderService: publicProcedure
    .input(customOrderServiceSchema)
    .mutation(async ({ input }) => {
      try {
        const order = await prisma.customOrderService.create({
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

        return order;
      } catch (error) {
        throw new Error(`${error}`);
      }
    }),
});
