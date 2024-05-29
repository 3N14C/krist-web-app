"use client";

import { ProductService } from "@/actions/product/product-service";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

export const AdminProductList: FC = () => {
  const { data: products } = useQuery({
    queryKey: ["admin-product-list"],
    queryFn: ProductService.getAll,
  });

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      {products?.map((product) => (
        <div key={product.id} className="">
          <p className="text-xl">{product.name}</p>
        </div>
      ))}
    </div>
  );
};
