"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/trpc-client/client";
import { Filter } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { FC } from "react";
import { ProductCard } from "../../_components/product-card";
import { ProductSkeleton } from "@/components/skeleton/product-skeleton";

interface IProps {}

export const ProductList: FC<IProps> = () => {
  const [categoryParams] = useQueryState(
    "categoryId",
    parseAsArrayOf(parseAsString)
  );

  const [collectionParams, setCollectionParams] = useQueryState(
    "collectionId",
    parseAsArrayOf(parseAsString)
  );

  const [priceParams] = useQueryState("price");
  const [colorParams] = useQueryState("colorId", parseAsArrayOf(parseAsString));
  const [sizeParams] = useQueryState("sizeId", parseAsArrayOf(parseAsString));

  const { data: products, isLoading } =
    trpc.products.getProductsByslug.useQuery({
      collectionId: collectionParams || [],
      categoryId: categoryParams || [],
      colorId: colorParams || [],
      sizeId: sizeParams || [],
      price: Number(priceParams)!,
    });

  const { data: category } = trpc.category.getCategoryById.useQuery({
    id: categoryParams || [],
  });

  return (
    <div className="flex flex-col gap-10 mt-5">
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger className="cursor-pointer" asChild>
            <Filter />
          </PopoverTrigger>
          <PopoverContent className="min-w-[600px] w-full">
            {categoryParams?.length! > 0 ? (
              <>
                <div className="grid grid-cols-3">
                  {category?.flatMap((category) => {
                    return category.collection.map((collection) => (
                      <div
                        key={collection.id}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          onClick={() => {
                            const newParams = collectionParams
                              ? collectionParams
                              : [];

                            if (newParams.includes(collection.id)) {
                              setCollectionParams(
                                newParams.filter(
                                  (param) => param !== collection.id
                                )
                              );
                            } else {
                              setCollectionParams([
                                ...newParams,
                                collection.id,
                              ]);
                            }
                          }}
                          checked={
                            collectionParams?.includes(collection.id) || false
                          }
                        />
                        <p className="text-lg capitalize">{collection.name}</p>
                      </div>
                    ));
                  })}
                </div>
              </>
            ) : (
              <p className="text-lg text-center">Выберите категорию</p>
            )}
          </PopoverContent>
        </Popover>
        <p>Показано {products?.length}</p>
      </div>

      {isLoading ? (
        <ProductSkeleton gridCols="grid-cols-3" />
      ) : (
        // @ts-ignore
        <ProductCard products={products || []} />
      )}
    </div>
  );
};
