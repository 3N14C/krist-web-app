"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Size } from "@prisma/client";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { FC } from "react";

interface IProps {
  sizes: Size[];
}

export const FilterSize: FC<IProps> = ({ sizes }) => {
  const [sizeParams, setSizeParams] = useQueryState(
    "sizeId",
    parseAsArrayOf(parseAsString)
  );

  const handleFilter = (size: Size) => {
    const newParams = sizeParams ? sizeParams : [];
    if (newParams.includes(size.id)) {
      newParams.splice(newParams.indexOf(size.id), 1);
    } else {
      newParams.push(size.id);
    }
    setSizeParams(newParams);
  };

  return (
    <div className="flex flex-col gap-2">
      {sizes?.map((size) => (
        <div key={size.id} className="">
          <div className="flex items-center gap-3">
            <Checkbox
              className="w-5 h-5"
              checked={sizeParams?.includes(size.id) || false}
              onClick={() => handleFilter(size)}
            />
            <p className="text-xl uppercase">{size.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
