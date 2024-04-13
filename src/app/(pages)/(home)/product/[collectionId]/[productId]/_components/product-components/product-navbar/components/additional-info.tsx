"use client";

import { Prisma } from "@prisma/client";
import { FC } from "react";

interface IProps {
  product: Prisma.ProductGetPayload<{
    include: {
      sizes: true;
      colors: true;
    };
  }>;
}

export const AdditionalInfo: FC<IProps> = ({ product }) => {
  return (
    <div className="text-lg flex items-center gap-10">
      <div className="flex flex-col gap-3">
        <p className="font-bold">Цвета</p>
        <p className="font-bold">Размеры</p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center capitalize">
          {product?.colors.map((color) => color.name).join(", ")}
        </div>

        {product?.sizes !== undefined ? (
          <div className="flex items-center uppercase">
            {product?.sizes.map((size) => size.name).join(", ")}
          </div>
        ) : null}
      </div>
    </div>
  );
};
