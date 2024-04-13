"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Prisma } from "@prisma/client";
import { parseAsString, useQueryState } from "nuqs";
import { FC } from "react";

interface IProps {
  product: Prisma.ProductGetPayload<{
    include: {
      colors: true;
    };
  }>;
}

export const ColorPicker: FC<IProps> = ({ product }) => {
  const [focusColor, setFocusColor] = useQueryState("color", parseAsString);

  return (
    <div className="flex flex-col gap-1">
      <p className="text-xl font-bold">Цвет</p>

      <div className="flex items-center gap-4">
        {product?.colors.map((color, idx) => (
          <Checkbox
            onClick={() => setFocusColor(color.id)}
            style={{ backgroundColor: color.color }}
            className="border-none w-10 h-10"
            key={color.id}
            checked={color.id === focusColor}
          />
        ))}
      </div>
    </div>
  );
};
