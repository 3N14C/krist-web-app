"use client";

import { ProductService } from "@/actions/product/product-service";
import { ProductCard } from "@/app/(pages)/(home)/_components/product-card";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface IProps {
  collectionId: string;
  productId: string;
}

export const RelatedProducts: FC<IProps> = ({ collectionId, productId }) => {
  const { data: relatedProducts, isLoading } = useQuery({
    queryKey: ["related-products", collectionId, productId],
    queryFn: async () => ProductService.getRelated({ productId, collectionId }),
  });

  return (
    <div className="">
      <p className="text-3xl font-bold capitalize">похожие товары</p>

      <div className="mt-10">
        {/* @ts-ignore */}
        <ProductCard products={relatedProducts} />
      </div>
    </div>
  );
};
