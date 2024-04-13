"use client";

import { TotalOrder } from "@/components/total-order";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "sonner";

export const ProductTable: FC = () => {
  const { productsCart, removeProduct, changeProductCount } = useCartStore();
  const router = useRouter();

  return (
    <div className="grid grid-cols-4">
      <div className="w-full col-span-3">
        <div className="grid grid-cols-4 text-xl">
          <p className="">Товары</p>
          <p>Цена</p>
          <p>Количество</p>
          <p>Итоговая цена</p>
        </div>

        <div className="mt-10 flex flex-col gap-10 ">
          {productsCart.products.map((product) => (
            <div key={product.id} className="grid grid-cols-4 items-center">
              <div className="flex items-center gap-5">
                <Image
                  src={product.img || ""}
                  alt={product.name || ""}
                  width={1000}
                  height={1000}
                  className="w-[60px] h-[60px]"
                />

                <div className="">
                  <p className="text-xl font-bold">{product.name}</p>
                  <p className="text-md">
                    Размер:{" "}
                    {product?.size?.name ? (
                      <span className="uppercase">{product?.size?.name}</span>
                    ) : (
                      "Регулируемый"
                    )}
                  </p>
                </div>
              </div>

              <p className="text-xl">
                ${parseFloat(product.price.toString()).toFixed(2)}
              </p>

              <div className="flex items-center justify-evenly gap-2 border border-black rounded-lg w-48 py-3">
                <Minus
                  onClick={() => changeProductCount(product.id, false)}
                  className="cursor-pointer"
                />
                <p className="text-xl">{product.count}</p>
                <Plus
                  onClick={() => changeProductCount(product.id, true)}
                  className="cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-20">
                <p className="text-xl">
                  $
                  {parseFloat(
                    (product.price * product.count).toString()
                  ).toFixed(2)}
                </p>

                <Trash2
                  className="text-red-400 cursor-pointer"
                  onClick={() => {
                    removeProduct(product);
                    toast.success("Товар удален из корзины");
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <TotalOrder
        onClick={() =>
          router.push("/checkout/shipping-address?orderPage=address")
        }
      />
    </div>
  );
};
