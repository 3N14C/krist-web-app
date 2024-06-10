"use client";

import { useCartStore } from "@/store/cart-store";
import { FC } from "react";
import { CartProductCard } from "./cart-product-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const CartProductList: FC = () => {
  const { productsCart: cartProducts } = useCartStore();
  const router = useRouter();

  return (
    <div className="px-5 py-2">
      <p className="p-2 rounded-lg">
        Товаров в корзине: {cartProducts.products?.length}
      </p>

      <ScrollArea
        className={cn("", {
          "w-[400px]": cartProducts.products?.length,
          "h-[300px] w-[400px]": cartProducts.products?.length >= 3,
        })}
      >
        <CartProductCard products={cartProducts.products} />
      </ScrollArea>

      {cartProducts.products?.length > 0 && (
        <div className="py-5 flex flex-col gap-4">
          <div className="text-xl font-bold flex items-center justify-between">
            <p className="">Итого:</p>

            <p>
              {cartProducts.totalPrice.toLocaleString("ru-RU", {
                style: "currency",
                currency: "RUB",
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          <Button
            variant={"default"}
            size={"lg"}
            className="border-black w-full h-14"
            onClick={() => router.push("/checkout")}
          >
            Оформить заказ
          </Button>
        </div>
      )}
    </div>
  );
};
