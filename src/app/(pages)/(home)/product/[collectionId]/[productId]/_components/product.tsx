"use client";

import { ProductService } from "@/actions/product/product-service";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FC, useState } from "react";
import { ColorPicker } from "./product-components/color-picker";
import { ProductCounter } from "./product-components/item-counter";
import { ProductNavbar } from "./product-components/product-navbar/product-navbar";
import { ProductRating } from "./product-components/product-rating";
import { SizePicker } from "./product-components/size-picker";

interface IProps {
  productId: string;
}

export const ProductPage: FC<IProps> = ({ productId }) => {
  const { data: product, isLoading } = useQuery({
    queryKey: ["product-by-id", productId],
    queryFn: async () => await ProductService.getById({ productId }),
  });

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

      <div className="mt-10 flex lg:flex-row flex-col items-start lg:justify-around">
        <div className="flex flex-col items-center">
          <Image
            src={product?.img || ""}
            alt={product?.name || ""}
            width={1000}
            height={1000}
            className="object-cover w-fit h-fit"
          />

          <div className="lg:flex hidden items-center mt-10 gap-3">
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

        <div className="lg:w-2/5 flex flex-col gap-4">
          <div className="flex items-center lg:justify-between">
            <p className="lg:text-4xl text-2xl font-bold">{product?.name}</p>

            {/* ДОБАВИТЬ СТАТУС В БД */}
            <p className="text-green-400 bg-[#ebfaeb] inline-block px-4 py-1">
              В наличии
            </p>
          </div>

          {/* @ts-ignore */}
          <ProductRating product={product} />

          <p className="text-2xl text-[#1b1b1b]">
            {product?.price.toLocaleString("ru-RU", {
              style: "currency",
              currency: "RUB",
              maximumFractionDigits: 2,
            })}
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
