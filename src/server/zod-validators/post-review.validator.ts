import { z } from "zod";

export const postReviewSchema = z.object({
  // productId: z.string(),
  // rating: z.number().min(1, 'Выберите ваш рейтинг'),
  // title: z.string().min(1, 'Это поле обязательно'),
  // body: z.string().min(1, 'Это поле обязательно'),
  // userId: z.string(),

  title: z.string().min(1, "Это поле обязательно"),
  body: z.string().min(1, "Это поле обязательно"),
  productId: z.string(),
  rating: z.number().min(1, "Выберите ваш рейтинг"),
  userId: z.string(),
});
