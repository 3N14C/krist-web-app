"use client";

import { cn } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { parseAsString, useQueryState } from "nuqs";
import { FC } from "react";

interface IProps {
  product: Prisma.ProductGetPayload<{
    include: {
      sizes: true;
    };
  }>;
}

export const SizePicker: FC<IProps> = ({ product }) => {
  const [focusSize, setFocusSize] = useQueryState("size", parseAsString);

  return (
    <div className="flex flex-col gap-1">
      <p className="text-xl font-bold">Размер</p>
      <div className="flex items-center gap-4">
        {product?.sizes.map((size, idx) => (
          <div
            onClick={() => setFocusSize(size.name)}
            key={size.id}
            className={cn(
              "border border-black px-4 py-2 transition duration-150 rounded-lg cursor-pointer",
              {
                "bg-black text-white": size.name === focusSize,
              }
            )}
          >
            <p className="text-xl uppercase text-center inline-block">
              {size.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
