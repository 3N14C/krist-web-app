import { axiosInstance } from "@/configs/axios-config";
import { ServiceOrdersByUser } from "@/types/service-order-type";
import { ServiceOrder } from "@prisma/client";

export const ServiceOrderService = {
  create: async ({
    userId,
    serviceId,
  }: {
    userId: string;
    serviceId: string;
  }) => {
    const response = await axiosInstance.post<ServiceOrder>(
      `order-service/create?userId=${userId}&serviceId=${serviceId}`
    );

    return response.data;
  },

  getServiceOrdersByUser: async ({ userId }: { userId: string }) => {
    const response = await axiosInstance.get<ServiceOrdersByUser[]>(
      `order-service/by-user-id?id=${userId}`
    );

    return response.data;
  },
};
