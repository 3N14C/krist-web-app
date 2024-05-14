import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string(),
  img: z.string().optional(),
});
