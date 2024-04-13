"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Category } from "@prisma/client";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { FC } from "react";

interface IProps {
  category: Category[];
}

export const FilterCategory: FC<IProps> = ({ category }) => {
  const [categoryParams, setCategoryParams] = useQueryState(
    "categoryId",
    parseAsArrayOf(parseAsString)
  );

  const handleFilter = (category: Category) => {
    const newParams = categoryParams ? categoryParams : [];
    if (newParams.includes(category.id)) {
      newParams.splice(newParams.indexOf(category.id), 1);
    } else {
      newParams.push(category.id);
    }
    setCategoryParams(newParams);
  };

  return (
    <div className="flex flex-col gap-2">
      {category?.map((category) => (
        <div key={category.id} className="">
          <div className="flex items-center gap-3">
            <Checkbox
              className="w-5 h-5"
              checked={categoryParams?.includes(category.id) || false}
              onClick={() => handleFilter(category)}
            />
            <p className="text-xl capitalize">{category.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
