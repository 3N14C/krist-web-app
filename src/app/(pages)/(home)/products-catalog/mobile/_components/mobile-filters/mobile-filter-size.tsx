"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc-client/client";
import { Color, Size } from "@prisma/client";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { FC } from "react";

export const MobileSizeFilter: FC = () => {
  const { data: sizes } = trpc.sizes.getSizes.useQuery();

  const [sizeParams, setSizeParams] = useQueryState(
    "sizeId",
    parseAsArrayOf(parseAsString)
  );

  const handleFilter = (size: Size) => {
    const newParams = sizeParams ? sizeParams : [];
    if (newParams.includes(size.id)) {
      newParams.splice(newParams.indexOf(size.id), 1);
    } else {
      newParams.push(size.id);
    }
    setSizeParams(newParams);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Размер</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="grid grid-cols-2 items-center justify-items-center mt-3 gap-3">
        {sizes?.map((size) => (
          <div key={size.id}>
            <div
              onClick={() => handleFilter(size)}
              key={size.id}
              className={cn(
                "border border-black px-4 py-2 transition duration-150 rounded-lg cursor-pointer",
                {
                  "bg-black text-white": sizeParams?.includes(size.id),
                }
              )}
            >
              <p className="text-xl uppercase text-center inline-block">
                {size.name}
              </p>
            </div>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
