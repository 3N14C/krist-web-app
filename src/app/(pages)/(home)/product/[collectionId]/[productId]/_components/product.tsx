"use client";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { trpc } from "@/trpc-client/client";
import { Prisma, Product } from "@prisma/client";
import { Heart, Minus, Plus, Star } from "lucide-react";
import { babelIncludeRegexes } from "next/dist/build/webpack-config";
import Image from "next/image";
import { parseAsString, useQueryState } from "nuqs";
import { FC, useEffect, useState } from "react";
import { ColorPicker } from "./product-components/color-picker";
import { SizePicker } from "./product-components/size-picker";
import { ProductCounter } from "./product-components/item-counter";
import { ProductNavbar } from "./product-components/product-navbar/product-navbar";
import { ProductRating } from "./product-components/product-rating";

interface IProps {
  productId: string;
}

export const ProductPage: FC<IProps> = ({ productId }) => {
  const { data: product, isLoading } =
    trpc.products.getProductById.useQuery(productId);

  const [focusSize, setFocusSize] = useState<number | null>(null);
  const [counter, setCounter] = useState<number>(1);

  const totalRating = product?.reviews?.reduce(
    (acc, review) => acc + review.rating,
    0
  );

  return (
    <div className="">
      <div className="mt-20">
        <Breadcrumbs productName={product?.name} />
      </div>

      <div className="mt-10 flex items-start justify-around">
        <div className="flex flex-col items-center">
          <Image
            src={product?.img || ""}
            alt={product?.name || ""}
            width={1000}
            height={1000}
            className="object-cover w-fit h-fit"
          />

          <div className="flex items-center mt-10 gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Image
                key={index}
                src={product?.img || ""}
                alt={product?.name || ""}
                width={1000}
                height={1000}
                className="w-[200px] h-[200px] cursor-pointer"
              />
            ))}
          </div>
        </div>

        <div className="w-2/5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-4xl font-bold">{product?.name}</p>

            {/* ДОБАВИТЬ СТАТУС В БД */}
            <p className="text-green-400 bg-[#ebfaeb] inline-block px-4 py-1">
              В наличии
            </p>
          </div>

          {/* @ts-ignore */}
          <ProductRating product={product} />

          <p className="text-2xl text-[#1b1b1b]">
            ${parseFloat(product?.price.toString()!).toFixed(2)}
          </p>

          <p className="text-[#37353b]">{product?.description}</p>

          <ColorPicker
            // @ts-ignore
            product={product!}
          />

          {product?.sizes.length !== undefined && product?.sizes.length > 0 ? (
            <SizePicker
              // @ts-ignore
              product={product!}
            />
          ) : null}

          {/* @ts-ignore */}
          <ProductCounter {...{ product, counter, setCounter }} />
        </div>
      </div>

      <ProductNavbar product={product as Product} />
    </div>
  );
};
