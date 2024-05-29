import { axiosInstance } from "@/configs/axios-config";
import { AllColor } from "@/types/color-type";

export const ColorService = {
  getAll: async () => {
    const response = await axiosInstance.get<AllColor[]>("color/get-all");

    return response.data;
  },
};
