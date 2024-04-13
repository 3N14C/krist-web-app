import { publicProcedure, router } from "../trpc";
import prisma from "../../../prisma/prisma-client";
import { z } from "zod";

export const getCollection = router({
  getCollections: publicProcedure.query(async ({ ctx }) => {
    return await prisma?.collection.findMany({});
  }),
});
