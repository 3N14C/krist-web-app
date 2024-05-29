import { axiosInstance } from "@/configs/axios-config";
import { Collection } from "@prisma/client";

export const CollectionService = {
  getAll: async () => {
    const response = await axiosInstance.get<Collection[]>(
      "/collection/get-all"
    );

    return response.data;
  },
};
