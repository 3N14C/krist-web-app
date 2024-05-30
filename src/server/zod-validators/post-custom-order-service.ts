import { z } from "zod";

export const customOrderServiceSchema = z.object({
  title: z
    .string()
    .min(1, "Это поле обязательно")
    .max(50, "Максимальная длина 50 символов"),
  message: z
    .string()
    .min(1, "Это поле обязательно")
    .max(500, "Максимальная длина 500 символов"),
});
