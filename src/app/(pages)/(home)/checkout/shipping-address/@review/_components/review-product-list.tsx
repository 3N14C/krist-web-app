"use client";

import { CartProductCard } from "@/components/header/popover-content/cart-popover/cart-product-card";
import { useCartStore } from "@/store/cart-store";
import { FC } from "react";

export const ReviewProductList: FC = () => {
  const { productsCart } = useCartStore();

  return (
    <div className="">
      <div className="mt-10">
        <CartProductCard products={productsCart.products} visibleRemoveButton={false} />
      </div>
    </div>
  );
};
