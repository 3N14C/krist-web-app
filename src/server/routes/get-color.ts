import { publicProcedure, router } from "../trpc";
import prisma from "../../../prisma/prisma-client";

export const getColor = router({
  getColors: publicProcedure.query(async ({ ctx }) => {
    return await prisma.color.findMany({
      include: {
        products: true,
      },
    });
  }),
});
