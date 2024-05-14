import { z } from "zod";

export const createServiceOrderSchema = z.object({
  userId: z.string().optional(),
  serviceId: z.string(),
});
