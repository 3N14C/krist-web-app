"use client";

import { CollectionService } from "@/actions/collection/collection-service";
import { Button } from "@/components/ui/button";
import { CustomTitle } from "@/components/ui/custom-title";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { usePagination } from "@mantine/hooks";
import { Collection } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { CollectionCard } from "../collection-card";

const ITEMS_PER_PAGE = 3;

export const CollectionSection: FC = () => {
  const { data: collections, isLoading } = useQuery({
    queryKey: ["all-collections"],
    queryFn: CollectionService.getAll,
  });

  const [visibleResults, setVisibleResults] = useState<Collection[]>([]);

  useEffect(() => {
    setVisibleResults(collections?.slice(0, ITEMS_PER_PAGE)!);
  }, [collections]);

  const pagination = usePagination({
    total: Math.ceil(collections?.length! / ITEMS_PER_PAGE),
    initialPage: 1,
    onChange(page) {
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      setVisibleResults(collections?.slice(start, end)!);
    },
  });

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <CustomTitle title="Коллекции" />

        <div className="flex items-center gap-[10px] max-[845px]:hidden">
          <Button
            disabled={isLoading || pagination.active === 1}
            onClick={pagination.previous}
            size={"lg"}
            className={cn("", {
              "opacity-50": pagination.active === 1 || isLoading,
            })}
          >
            <ArrowLeft />
          </Button>

          <Button
            disabled={isLoading}
            onClick={pagination.next}
            size={"lg"}
            className={cn("", {
              "opacity-50": isLoading,
            })}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>

      <div className="mt-[50px]">
        {isLoading ? (
          <div className="grid lg:grid-cols-3 justify-items-center">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="relative">
                <Skeleton className="w-[400px] h-[400px] bg-slate-200" />
                <Skeleton
                  className="w-1/2 h-10 bg-slate-300
                absolute bottom-[20px] left-[50%] -translate-x-1/2"
                />
              </div>
            ))}
          </div>
        ) : (
          <CollectionCard collections={visibleResults!} />
        )}
      </div>
    </div>
  );
};
