import { axiosInstance } from "@/configs/axios-config";
import { customOrderServiceSchema } from "@/server/zod-validators/post-custom-order-service";
import { CustomOrderService, Service } from "@prisma/client";
import { z } from "zod";

export const ServiceService = {
  createUserService: async (
    input: z.infer<typeof customOrderServiceSchema>
  ) => {
    const response = await axiosInstance.post<CustomOrderService>(
      "service/user-service/create",
      input
    );

    return response.data;
  },

  getAll: async () => {
    const response = await axiosInstance.get<Service[]>("service/get-all");

    return response.data;
  },
};
