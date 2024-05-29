import { axiosInstance } from "@/configs/axios-config";
import { OrderService } from "@prisma/client";

export const OrderServiceService = {
  create: async ({
    userId,
    serviceId,
  }: {
    userId: string;
    serviceId: string;
  }) => {
    const response = await axiosInstance.post<OrderService>(
      `order-service/create?userId=${userId}&serviceId=${serviceId}`
    );

    return response.data;
  },
};
