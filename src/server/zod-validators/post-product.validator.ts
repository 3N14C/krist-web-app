import { z } from "zod";

export const postProductSchema = z.object({
  name: z.string(),
  img: z.string(),
  price: z.number(),
  description: z.string(),

  // relations
  categoryId: z.string(),
  collectionId: z.string(),
});
