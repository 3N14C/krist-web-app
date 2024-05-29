import { axiosInstance } from "@/configs/axios-config";
import { AllSize } from "@/types/size-type";

export const SizeService = {
  getAll: async () => {
    const response = await axiosInstance.get<AllSize[]>("size/get-all");

    return response.data;
  },
};
