import { CustomTitle } from "@/components/ui/custom-title";
import { FC } from "react";
import { ProductCard } from "../product-card";
import prisma from "../../../../../../prisma/prisma-client";

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
        {/* @ts-ignore */}
        <ProductCard gridCols="lg:grid-cols-4" products={products} />
      </div>
    </div>
  );
};
