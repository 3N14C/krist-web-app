import { z } from "zod";

export const updateCurrentUserSchema = z.object({
  username: z.string().min(1, "Это поле обязательно"),

  phoneNumber: z.string().min(1, "Это поле обязательно"),

  email: z.string().email("Некорректная почта"),

  avatar: z.string().optional().nullable(),
});
