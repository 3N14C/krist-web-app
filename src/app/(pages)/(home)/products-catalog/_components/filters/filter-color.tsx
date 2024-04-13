"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Color } from "@prisma/client";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { FC } from "react";

interface IProps {
  colors: Color[];
}

export const FilterColor: FC<IProps> = ({ colors }) => {
  const [colorParams, setColorParams] = useQueryState(
    "colorId",
    parseAsArrayOf(parseAsString)
  );

  const handleFilter = (color: Color) => {
    const newParams = colorParams ? colorParams : [];
    if (newParams.includes(color.id)) {
      newParams.splice(newParams.indexOf(color.id), 1);
    } else {
      newParams.push(color.id);
    }
    setColorParams(newParams);
  };

  return (
    <div className="flex flex-col gap-2">
      {colors?.map((color) => (
        <div key={color.id} className="">
          <div className="flex items-center gap-3">
            <Checkbox
              style={{ backgroundColor: color.color }}
              className="border-none w-5 h-5"
              checked={colorParams?.includes(color.id) || false}
              onClick={() => handleFilter(color)}
            />
            <p className="text-xl capitalize">{color.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
