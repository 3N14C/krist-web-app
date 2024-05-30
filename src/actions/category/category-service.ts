import { axiosInstance } from "@/configs/axios-config";
import { CategoryById, CategoryCollection } from "@/types/category-type";
import { Category } from "@prisma/client";

export const CategoryService = {
  getAll: async () => {
    const response =
      await axiosInstance.get<CategoryCollection[]>("/category/get-all");

    return response.data;
  },

  getByIds: async ({ categoryId }: { categoryId: string[] }) => {
    const response = await axiosInstance.get<CategoryById[]>(
      `category/get-by-ids?id=${categoryId}`
    );

    return response.data;
  },

  getById: async ({ categoryId }: { categoryId: string }) => {
    const response = await axiosInstance<Category>(
      `category/get-by-id?id=${categoryId}`
    );

    return response.data;
  },

  create: async ({ name }: { name: string }) => {
    const response = await axiosInstance.post("category/create", { name });

    return response.data;
  },

  updateById: async ({
    categoryId,
    name,
  }: {
    categoryId: string;
    name: string;
  }) => {
    const response = await axiosInstance.patch<Category>(
      `category/update-by-id?id=${categoryId}`,
      { name }
    );

    return response.data;
  },

  deleteById: async ({categoryId}: {categoryId: string}) => {
    const response = await axiosInstance.delete<Category>(`category/remove-by-id?id=${categoryId}`)

    return response.data
  }
};
