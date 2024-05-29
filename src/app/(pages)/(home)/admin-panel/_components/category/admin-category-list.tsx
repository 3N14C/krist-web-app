"use client";

import { CategoryService } from "@/actions/category/category-service";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

export const AdminCategoryList: FC = () => {
  const { data: categories } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: CategoryService.getAll,
  });

  return (
    <div className="flex flex-col gap-5">
      {categories?.map((category) => (
        <div key={category.id} className="">
          <p className="text-xl">{category.name}</p>
        </div>
      ))}
    </div>
  );
};
