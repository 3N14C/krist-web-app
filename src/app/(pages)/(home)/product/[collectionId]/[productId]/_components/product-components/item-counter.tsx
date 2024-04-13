"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { Prisma } from "@prisma/client";
import { Heart, Minus, Plus } from "lucide-react";
import { useQueryState } from "nuqs";
import { FC } from "react";
import { toast } from "sonner";

interface IProps {
  product: Prisma.ProductGetPayload<{
    include: {
      colors: true;
      sizes: true;
    };
  }>;

  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}

export const ProductCounter: FC<IProps> = ({
  product,
  counter,
  setCounter,
}) => {
  const { addProduct: addProductToCart } = useCartStore();
  const { products, addProduct } = useWishlistStore();
  const [focusColor] = useQueryState("color");
  const [focusSize] = useQueryState("size");

  const handleAddToCart = (
    product: Prisma.ProductGetPayload<{
      include: { colors: true; sizes: true };
    }>
  ) => {
    addProductToCart({
      id: product?.id!,
      name: product?.name!,
      price: product?.price!,
      img: product?.img!,
      size: product?.sizes.find((size) => size.name === focusSize)!,
      color: product?.colors.find((color) => color.id === focusColor)!,
      count: counter,
    });

    toast.success("Товар добавлен в корзину");
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-evenly gap-2 border border-black rounded-lg w-48 py-3">
        <Minus
          onClick={() => setCounter(counter - 1)}
          className="cursor-pointer"
        />
        <p className="text-xl">{counter}</p>
        <Plus
          onClick={() => setCounter(counter + 1)}
          className="cursor-pointer"
        />
      </div>
      <Button
        onClick={() => handleAddToCart(product)}
        className="w-full text-xl py-7 rounded-lg"
      >
        Добавить в корзину
      </Button>
      <div className="border border-black rounded-lg py-2 px-3">
        <Heart
          // @ts-ignore
          onClick={() => addProduct(product)}
          className={cn("cursor-pointer", {
            "text-red-400": products.some((p) => p.id === product?.id),
          })}
          fill={products.some((p) => p.id === product?.id) ? "red" : "none"}
          size={40}
        />
      </div>
    </div>
  );
};
