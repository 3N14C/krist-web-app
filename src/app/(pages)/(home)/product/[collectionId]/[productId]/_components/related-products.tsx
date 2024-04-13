"use client";

import { ProductCard } from "@/app/(pages)/(home)/_components/product-card";
import { trpc } from "@/trpc-client/client";
import { FC } from "react";

interface IProps {
  collectionId: string;
  productId: string;
}

export const RelatedProducts: FC<IProps> = ({ collectionId, productId }) => {
  const { data: relatedProducts, isLoading } =
    trpc.products.getRelatedProducts.useQuery({
      collectionId: collectionId,
      productId: productId,
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
