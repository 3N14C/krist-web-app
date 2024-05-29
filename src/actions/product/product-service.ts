import { axiosInstance } from "@/configs/axios-config";
import { ProductInputSlug } from "@/interfaces/product-slug-interface";
import {
  BestSellerProduct,
  ProductById,
  ProductBySlug,
  RelatedProduct,
} from "@/types/product-type";
import { Product } from "@prisma/client";

export const ProductService = {
  getById: async ({ productId }: { productId: string }) => {
    const response = await axiosInstance.get<ProductById>(
      `product/get-by-id?id=${productId}`
    );

    return response.data;
  },

  getRelated: async (input: { collectionId: string; productId: string }) => {
    const response = await axiosInstance.get<RelatedProduct[]>(
      `product/get-related?collectionId=${input.collectionId}&productId=${input.productId}`
    );

    return response.data;
  },

  getBestSeller: async () => {
    const response = await axiosInstance.get<BestSellerProduct[]>(
      "product/get-best-seller"
    );
    return response.data;
  },

  getBySlug: async (input: ProductInputSlug) => {
    const paramsCondition: string[] = [];

    if (input.categoryId && input.categoryId.length > 0) {
      paramsCondition.push(`categoryId=${input.categoryId}`);
    }

    if (
      !input.categoryId &&
      input.collectionId &&
      input.collectionId.length > 0
    ) {
      const index = paramsCondition.indexOf(
        `collectionId=${input.collectionId}`
      );
      if (index > -1) {
        paramsCondition.splice(index);
      }
    }
    if (input.collectionId && input.collectionId.length > 0) {
      paramsCondition.push(`collectionId=${input.collectionId}`);
    }

    if (input.price) {
      paramsCondition.push(`price=${input.price}`);
    }

    if (input.colorId && input.colorId.length > 0) {
      paramsCondition.push(`colorId=${input.colorId}`);
    }

    if (input.sizeId && input.sizeId.length > 0) {
      paramsCondition.push(`sizeId=${input.sizeId}`);
    }

    const filteredParams = paramsCondition.filter((param) => param.length > 0);

    const response = await axiosInstance.get<ProductBySlug[]>(
      `product/get-by-slug?${filteredParams.join("&")}`
    );

    return response.data;
  },

  getAll: async () => {
    const response = await axiosInstance.get<Product[]>("product/get-all");

    return response.data;
  },
};
