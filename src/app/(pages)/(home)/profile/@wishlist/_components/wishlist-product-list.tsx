"use client";

import { useWishlistStore } from "@/store/wishlist-store";
import { FC } from "react";
import { ProductCard } from "../../../_components/product-card";

export const WishlistProductList: FC = () => {
  const { products } = useWishlistStore();

  return (
    <div className="">
      <ProductCard products={products} />
    </div>
  );
};
