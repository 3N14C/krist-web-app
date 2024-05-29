"use client";

import { CategoryService } from "@/actions/category/category-service";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { FC } from "react";

export const CategoryScroll: FC = () => {
  const { data: categories } = useQuery({
    queryKey: ["all-categories"],
    queryFn: CategoryService.getAll,
  });

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
    <ScrollArea className="w-[300px] h-20 whitespace-nowrap">
      <div className="flex gap-14 items-center">
        {categories?.map((category) => (
          <div key={category.id} className="">
            <p
              onClick={() => handleFilter(category)}
              className="text-xl border rounded-lg px-5 py-2"
            >
              {category.name}

              {categoryParams?.includes(category.id) && (
                <span className="ml-2 text-green-400">✓</span>
              )}
            </p>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
