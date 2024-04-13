import { Prisma, Product } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface IWishlistStore {
  products: Prisma.ProductGetPayload<{
    include: {
      reviews: true;
      colors: true;
      sizes: true;
    };
  }>[];

  addProduct: (
    product: Prisma.ProductGetPayload<{
      include: {
        reviews: true;
        colors: true;
        sizes: true;
      };
    }>
  ) => void;
}

export const useWishlistStore = create<IWishlistStore>()(
  devtools(
    persist(
      (set) => ({
        products: [],

        addProduct: (product) => {
          const existingProductIndex = useWishlistStore
            .getState()
            .products.findIndex((p) => p.id === product.id);

          if (existingProductIndex === -1) {
            // Если товара нет в списке, добавляем его
            set((state) => ({
              products: [...state.products, product],
            }));
          } else {
            // Если товар уже есть в списке, удаляем его
            set((state) => ({
              products: state.products.filter((p) => p.id !== product.id),
            }));
          }
        },
      }),

      {
        name: "wishlist-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
