"use client";

import { CollectionService } from "@/actions/collection/collection-service";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

export const AdminCollectionList: FC = () => {
  const { data: collections } = useQuery({
    queryKey: ["admin-collections"],
    queryFn: CollectionService.getAll,
  });

  return (
    <div className="flex flex-col gap-5">
      {collections?.map((collection) => (
        <div key={collection.id} className="">
          <p className="text-xl">{collection.name}</p>
        </div>
      ))}
    </div>
  );
};
