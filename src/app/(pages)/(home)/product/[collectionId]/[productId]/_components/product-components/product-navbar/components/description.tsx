"use client";

import { Product } from "@prisma/client";
import { FC } from "react";

interface IProps {
  product: Product;
}

export const Description: FC<IProps> = ({ product }) => {
  return (
    <div className="">
      <p className="text-lg">{product?.description}</p>
    </div>
  );
};
