"use client";

import { cn } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { Star } from "lucide-react";
import { FC, Fragment } from "react";

interface IProps {
  product: Prisma.ProductGetPayload<{
    include: {
      reviews: true;
    };
  }>;
}

export const ProductRating: FC<IProps> = ({ product }) => {
  const totalRating =
    product?.reviews?.reduce((acc, review) => acc + review.rating, 0) /
    product?.reviews?.length;

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Fragment key={index}>
            <Star
              className={cn("text-yellow-500 lg:block hidden", {
                "fill-yellow-500": index < Math.round(totalRating)!,
              })}
              size={30}
            />

            <Star
              className={cn("text-yellow-500 block lg:hidden", {
                "fill-yellow-500": index < Math.round(totalRating)!,
              })}
              size={20}
            />
          </Fragment>
        ))}
      </div>

      <div className="w-full">
        <p className="lg:text-lg text-sm text-[#6b7280]">
          {product?.reviews?.length > 0 ? totalRating.toFixed(1) : 0} (
          {product?.reviews?.length} отзывов)
        </p>
      </div>
    </div>
  );
};
