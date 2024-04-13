'use client'

import { FC } from "react"
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

interface IProps {
    gridCols: string
}

export const ProductSkeleton: FC<IProps> = ({gridCols}) => {
    return (
      <div className={cn("grid gap-10", gridCols)}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index}>
            <Skeleton
              key={index}
              className="h-[300px] w-[300px] bg-slate-200"
            />
            <Skeleton className="mt-3 h-4 w-20 bg-slate-200" />
            <Skeleton className="mt-3 h-4 w-20 bg-slate-200" />
          </div>
        ))}
      </div>
    );
}