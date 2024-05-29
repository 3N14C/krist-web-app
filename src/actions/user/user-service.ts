import { axiosInstance } from "@/configs/axios-config";
import { updateCurrentUserSchema } from "@/server/zod-validators/update-current-user.validator";
import { UserOrderService } from "@/types/user-types";
import { Role, User } from "@prisma/client";
import { z } from "zod";

export const UserService = {
  updateById: async (data: z.infer<typeof updateCurrentUserSchema>) => {
    const response = await axiosInstance.patch<User>(`user/update/by-id`, data);
    return response.data;
  },

  updateRole: async (data: { userId: string; role: Role }) => {
    const response = await axiosInstance.patch<User>(
      `user/update/role-by-id?id=${data.userId}`,
      data.role
    );

    return response.data;
  },

  getAll: async () => {
    const response = await axiosInstance.get<User[]>("user/get-all");

    return response.data;
  },

  getOrderService: async ({ userId }: { userId: string }) => {
    const response = await axiosInstance.get<UserOrderService>(
      `user/get-order-service?id=${userId}`
    );

    return response.data;
  },
};
