import { z } from "zod";

export const createServiceOrderSchema = z.object({
  userId: z.string(),
  serviceId: z.string(),
});
