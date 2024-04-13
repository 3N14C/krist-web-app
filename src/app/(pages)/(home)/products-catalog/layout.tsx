"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { trpc } from "@/trpc-client/client";
import { Category, Color, Size } from "@prisma/client";
import { parseAsArrayOf, parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
import { FilterCategory } from "./_components/filters/filter-category";
import { FilterColor } from "./_components/filters/filter-color";
import { FilterSize } from "./_components/filters/filter-size";
import { ServicesList } from "../product/[collectionId]/[productId]/_components/services-list";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: category, isLoading: isLoadingCategory } =
    trpc.category.getCategories.useQuery();

  const { data: colors, isLoading: isLoadingColors } =
    trpc.colors.getColors.useQuery();

  const { data: sizes, isLoading: isLoadingSizes } =
    trpc.sizes.getSizes.useQuery();

  const [price, setPrice] = useState([10]);
  const [priceParams, setPriceParams] = useQueryState(
    "price",
    parseAsArrayOf(parseAsInteger)
  );

  return (
    <div className="">
      <div className="flex items-start max-w-[1600px] mx-auto mt-10 gap-20">
        <Accordion type="multiple" className="w-1/4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="capitalize text-xl font-bold">
              фильтр по категориям
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {isLoadingCategory ? (
                <>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Skeleton className="w-4 h-4 bg-slate-200" />
                      <Skeleton className="w-1/2 h-4 bg-slate-200" />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <FilterCategory category={category || ([] as Category[])} />
                </>
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="capitalize text-xl font-bold">
              фильтр по цене
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-5">
              <div className="">
                <p className="text-lg">Текущая Цена От: {priceParams || 10}$</p>
                <p className="text-lg">Новая Цена От: {price}$</p>
              </div>

              <Slider
                onValueChange={setPrice}
                defaultValue={priceParams || [10]}
                max={200}
                step={1}
              />

              <Button className="w-full" onClick={() => setPriceParams(price)}>
                Применить
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="capitalize text-xl font-bold">
              фильтр по цвету
            </AccordionTrigger>
            <AccordionContent>
              <FilterColor colors={colors || ([] as Color[])} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="capitalize text-xl font-bold">
              фильтр по размеру
            </AccordionTrigger>
            <AccordionContent>
              <FilterSize sizes={sizes || ([] as Size[])} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="">{children}</div>
      </div>

      <div className="mt-20 max-w-[1600px] mx-auto">
        <ServicesList />
      </div>
    </div>
  );
};

export default Layout;
