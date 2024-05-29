"use client";

import { ProductService } from "@/actions/product/product-service";
import { CustomTitle } from "@/components/ui/custom-title";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { ProductCard } from "../product-card";

export const BestSeller: FC = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["bes-seller-products"],
    queryFn: ProductService.getBestSeller,
  });

  return (
    <div className="">
      <CustomTitle title="Лучшие товары" className="text-center" />

      {isLoading ? (
        <>Loading...</>
      ) : (
        <div className="mt-10">
          <ProductCard
            products={products ?? []}
            gridCols={cn("lg:grid-cols-4", {
              "lg:grid-cols-3 justify-items-center":
                products && products.length === 3,
            })}
          />
        </div>
      )}
    </div>
  );
};
