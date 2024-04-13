"use client";

import { cn } from "@/lib/utils";
import { parseAsString, useQueryState } from "nuqs";
import { FC } from "react";
import { Description } from "./components/description";
import { AdditionalInfo } from "./components/additional-info";
import { Reviews } from "./components/reviews";
import { Product } from "@prisma/client";

const productPages = [
  {
    id: "description",
    name: "Описание",
  },

  {
    id: "additional-info",
    name: "Доп. информация",
  },

  {
    id: "reviews",
    name: "Отзывы",
  },
];

interface IProps {
  product: Product;
}

export const ProductNavbar: FC<IProps> = ({ product }) => {
  // QUERY STATES
  const [productPage, setProductPage] = useQueryState(
    "productPage",
    parseAsString
  );

  return (
    <div className="">
      <div className="mt-14 flex items-center gap-10 text-xl font-medium">
        {productPages.map((item) => (
          <p
            className={cn("cursor-pointer", {
              "underline underline-offset-8": item.id === productPage,
            })}
            onClick={() => setProductPage(item.id)}
            key={item.id}
          >
            {item.name}
          </p>
        ))}
      </div>

      {/* CONTENT */}
      <div className="mt-5">
        {productPage === "description" && <Description product={product} />}

        {productPage === "additional-info" && (
          // @ts-ignore
          <AdditionalInfo product={product} />
        )}
        {productPage === "reviews" && (
          //@ts-ignore
          <Reviews product={product} />
        )}
      </div>
    </div>
  );
};
