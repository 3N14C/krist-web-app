import { publicProcedure, router } from "../trpc";
import prisma from "../../../prisma/prisma-client";
import { z } from "zod";
import { createServiceSchema } from "../zod-validators/post-create-service.validator";

export const AddService = router({
  addService: publicProcedure
    .input(createServiceSchema)
    .mutation(async ({ input }) => {
      try {
        const createService = await prisma.service.create({
          data: input,
        });

        return createService;
      } catch (error) {
        console.log(error);
      }
    }),
});
