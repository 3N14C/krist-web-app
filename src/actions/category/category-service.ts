import { axiosInstance } from "@/configs/axios-config";
import { CategoryById, CategoryCollection } from "@/types/category-type";

export const CategoryService = {
  getAll: async () => {
    const response =
      await axiosInstance.get<CategoryCollection[]>("/category/get-all");

    return response.data;
  },

  getById: async ({ categoryId }: { categoryId: string[] }) => {
    const response = await axiosInstance.get<CategoryById[]>(
      `category/by-id?id=${categoryId}`
    );

    return response.data;
  },
};
