import { axiosInstance } from "@/configs/axios-config";
import { Collection } from "@prisma/client";

export const CollectionService = {
  getAll: async () => {
    const response = await axiosInstance.get<Collection[]>(
      "/collection/get-all"
    );

    return response.data;
  },

  create: async ({ name }: { name: string }) => {
    const response = await axiosInstance.post<Collection>("collection/create", {
      name,
    });

    return response.data;
  },

  updateById: async (input: {
    collectionId: string;
    name: string;
    img: string;
    categoryId: string;
  }) => {
    const response = await axiosInstance.patch<Collection>(
      `collection/update/by-id?id=${input.collectionId}`,
      {
        ...input,
      }
    );

    return response.data;
  },

  deleteById: async ({ collectionId }: { collectionId: string }) => {
    const response = await axiosInstance.delete<Collection>(
      `collection/remove-by-id?id=${collectionId}`
    );

    return response.data;
  },

  getById: async ({ collectionId }: { collectionId: string }) => {
    const response = await axiosInstance.get<Collection>(
      `collection/get-by-id?id=${collectionId}`
    );

    return response.data;
  },
};
