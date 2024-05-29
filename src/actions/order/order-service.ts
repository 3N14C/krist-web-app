import { axiosInstance } from "@/configs/axios-config";
import { OrderProductUser } from "@/types/order-type";

export const OrderService = {
  getAll: async () => {
    const { data } =
      await axiosInstance.get<OrderProductUser[]>(`order/get-all`);
    return data;
  },

  byUserId: async ({ userId }: { userId: string }) => {
    const { data } = await axiosInstance.get<OrderProductUser[]>(
      `order/get-by-user-id?id=${userId}`
    );
    return data;
  },

  create: async (input: {
    products: { id: string }[];
    totalPrice: number;
    userId: string;
    quantity: number;
    size: string;
  }) => {
    const response = await axiosInstance.post("order/create", input);

    return response.data;
  },
};
