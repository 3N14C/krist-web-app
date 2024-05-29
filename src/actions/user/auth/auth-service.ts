import { axiosInstance } from "@/configs/axios-config";
import {
  userLoginSchema,
  userRegisterSchema,
} from "@/server/zod-validators/user.validator";
import { User } from "@prisma/client";
import { z } from "zod";

export const AuthService = {
  signUp: async (input: z.infer<typeof userRegisterSchema>) => {
    const response = await axiosInstance.post<User>("user/auth/sign-up", input);
    return response.data;
  },

  signIn: async (data: z.infer<typeof userLoginSchema>) => {
    const response = await axiosInstance.post<User>("user/auth/sign-in", data);

    return response.data;
  },

  signOut: async () => {
    const response = await axiosInstance.post("user/auth/sign-out");
    return response.data;
  },

  getSession: async () => {
    const response = await axiosInstance.get<User>("/user/auth/get-session");
    return response.data;
  },
};
