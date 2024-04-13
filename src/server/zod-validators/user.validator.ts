import { z } from "zod";

export const userLoginSchema = z.object({
  email: z.string().email({ message: "Некорректная почта" }),
  password: z
    .string()
    .min(6, { message: "Это поле должно быть не менее 6 символов" }),
});

export const userRegisterSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Это поле должно быть не менее 5 символов" }),
  email: z.string().email({ message: "Некорректная почта" }),
  password: z
    .string()
    .min(6, { message: "Это поле должно быть не менее 6 символов" }),
});
