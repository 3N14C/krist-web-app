import { axiosInstance } from "@/configs/axios-config";
import { postReviewSchema } from "@/server/zod-validators/post-review.validator";
import { Review } from "@prisma/client";
import { z } from "zod";

export const ReviewService = {
  create: async (input: z.infer<typeof postReviewSchema>) => {
    const response = await axiosInstance.post<Review>("review/create", input);

    return response.data;
  },
};
