"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/trpc-client/client";
import { Color } from "@prisma/client";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { FC } from "react";

export const MobileColorFilter: FC = () => {
  const { data: colors } = trpc.colors.getColors.useQuery();

  const [colorParams, setColorParams] = useQueryState(
    "colorId",
    parseAsArrayOf(parseAsString)
  );

  const handleFilter = (color: Color) => {
    const newParams = colorParams ? colorParams : [];
    if (newParams.includes(color.id)) {
      newParams.splice(newParams.indexOf(color.id), 1);
    } else {
      newParams.push(color.id);
    }
    setColorParams(newParams);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Цвет</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="grid grid-cols-2 items-center justify-items-center mt-3">
        {colors?.map((color) => (
          <div key={color.id}>
            <Checkbox
              style={{ backgroundColor: color.color }}
              className="border-none w-10 h-10"
              checked={colorParams?.includes(color.id) || false}
              onClick={() => handleFilter(color)}
            />
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
