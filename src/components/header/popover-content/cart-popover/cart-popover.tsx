"use client";

import { FC } from "react";
import { CartProductList } from "./cart-product-list";

export const CartPopover: FC = () => {
  return (
    <div className="">
      <CartProductList />
    </div>
  );
};
