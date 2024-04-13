import { publicProcedure, router } from "../trpc";
import prisma from "../../../prisma/prisma-client";
import { z } from "zod";

export const getCategory = router({
  getCategories: publicProcedure.query(async ({ ctx }) => {
    return await prisma.category.findMany({
      include: {
        collection: true,
      },
    });
  }),

  getCategoryById: publicProcedure
    .input(z.object({ id: z.string().array().optional() }))
    .query(async ({ input }) => {
      const categories = await prisma.category.findMany({
        include: {
          collection: true,
        },
        where: {
          id: {
            in: input.id,
          },
        },
      });

      return categories;
    }),
});
