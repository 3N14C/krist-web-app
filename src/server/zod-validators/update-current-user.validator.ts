import { z } from "zod";

export const updateCurrentUserSchema = z.object({
  username: z.string().optional().nullable(),

  phoneNumber: z.string().optional().nullable(),

  email: z.string().optional().nullable(),

  avatar: z.string().optional().nullable(),
});
