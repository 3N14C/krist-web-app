import { CustomTitle } from "@/components/ui/custom-title";
import { FC } from "react";
import { ProductCard } from "../product-card";
import prisma from "../../../../../../prisma/prisma-client";
import { cn } from "@/lib/utils";

const getProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      reviews: {
        some: {
          rating: {
            gte: 3,
          },
        },
      },
    },

    take: 8,
    orderBy: {
      reviews: {
        _count: "desc",
      },
    },

    include: {
      sizes: true,
      colors: true,
      reviews: true,
    },
  });

  return products;
};

export const BestSeller: FC = async () => {
  const products = await getProducts();

  return (
    <div className="">
      <CustomTitle title="Лучшие товары" className="text-center" />

      <div className="mt-10">
        <ProductCard
          products={products}
          gridCols={cn("lg:grid-cols-4", {
            "lg:grid-cols-3 justify-items-center": products.length === 3,
          })}
        />
      </div>
    </div>
  );
};
