import { ICartProduct } from "@/interfaces/cart.interface";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface ICartStore {
  productsCart: {
    products: ICartProduct[];
    totalPrice: number;
  };

  addProduct: (products: ICartProduct) => void;
  removeProduct: (product: ICartProduct) => void;
  changeProductCount: (id: string, increment: boolean) => void;

  removeAllProducts: () => void;
}

export const useCartStore = create<ICartStore>()(
  devtools(
    persist(
      (set) => ({
        productsCart: {
          products: [],
          totalPrice: 0,
        },

        addProduct: (product) => {
          set((state) => {
            const existingProductIndex = state.productsCart.products.findIndex(
              (p) => p.id === product.id
            );
            if (existingProductIndex !== -1) {
              const updatedProducts = [...state.productsCart.products];
              updatedProducts[existingProductIndex].count++;
              return {
                productsCart: {
                  products: updatedProducts,
                  totalPrice: state.productsCart.totalPrice + product.price,
                },
              };
            } else {
              return {
                productsCart: {
                  products: [...state.productsCart.products, { ...product }],
                  totalPrice: state.productsCart.totalPrice + product.price,
                },
              };
            }
          });
        },
        removeProduct: (product) => {
          set((state) => {
            const existingProductIndex = state.productsCart.products.findIndex(
              (p) => p.id === product.id
            );
            if (existingProductIndex !== -1) {
              const updatedProducts = [...state.productsCart.products];
              if (updatedProducts[existingProductIndex].count > 1) {
                updatedProducts[existingProductIndex].count--;
              } else {
                updatedProducts.splice(existingProductIndex, 1);
              }
              return {
                productsCart: {
                  products: updatedProducts,
                  totalPrice: state.productsCart.totalPrice - product.price,
                },
              };
            }

            return state;
          });
        },

        changeProductCount: (id: string, increment: boolean) => {
          set((state) => {
            const updatedProducts = state.productsCart.products.map(
              (product) => {
                if (product.id === id) {
                  return {
                    ...product,
                    count: increment
                      ? product.count + 1
                      : product.count > 1
                        ? product.count - 1
                        : 1,
                  };
                }
                return product;
              }
            );

            const updatedTotalPrice = updatedProducts.reduce(
              (total, product) => {
                return total + product.price * product.count;
              },
              0
            );
            return {
              productsCart: {
                products: updatedProducts,
                totalPrice: updatedTotalPrice,
              },
            };
          });
        },

        removeAllProducts() {
          set({ productsCart: { products: [], totalPrice: 0 } });
        },
      }),
      {
        name: "cart-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
