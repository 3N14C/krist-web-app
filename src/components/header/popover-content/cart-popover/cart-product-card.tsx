"use client";

import { Button } from "@/components/ui/button";
import { ICartProduct } from "@/interfaces/cart.interface";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@prisma/client";
import { Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { toast } from "sonner";

interface IProps {
  products: ICartProduct[];

  visibleRemoveButton?: boolean;
}

export const CartProductCard: FC<IProps> = ({
  products,
  visibleRemoveButton = true,
}) => {
  const { removeProduct } = useCartStore();

  return (
    <div className="flex flex-col gap-5">
      {products?.map((product) => (
        <div key={product.id} className="flex items-center gap-3 relative">
          <Image
            src={product.img}
            alt={product.name}
            width={100}
            height={100}
          />

          <div className="flex flex-col gap-2">
            <p>{product.name}</p>

            <div className="flex items-center gap-1 font-bold">
              <p>{product.count}</p>
              <p>x</p>
              <p>${parseFloat(product.price.toString()).toFixed(2)}</p>
            </div>

            <p>
              Размер:{" "}
              {product?.size?.name ? (
                <span className="uppercase">{product?.size?.name}</span>
              ) : (
                "Регулируемый"
              )}
            </p>
          </div>

          {visibleRemoveButton && (
            <Trash2
              className="text-red-400 cursor-pointer absolute right-10"
              onClick={() => {
                removeProduct(product);
                toast.success("Товар удален из корзины");
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
