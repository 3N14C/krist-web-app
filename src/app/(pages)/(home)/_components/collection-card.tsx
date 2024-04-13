"use client";

import { ICategory } from "@/interfaces/category.interface";
import { Category, Collection } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface IProps {
  collections: Collection[];
}

export const CollectionCard: FC<IProps> = ({ collections }) => {
  return (
    <div className="grid lg:grid-cols-3 justify-items-center">
      {collections?.map((collection) => (
        <Link
          href={`/products-catalog/?categoryId=${collection.categoryId}&collectionId=${collection.id}`}
          key={collection.id}
          className="flex flex-col items-center gap-[20px] relative"
        >
          <Image
            src={collection.img}
            width={1000}
            height={1000}
            alt={collection.name}
            className="w-[400px] h-[400px] object-cover rounded-lg"
          />
          <p className="text-2xl dark:text-black font-medium leading-none absolute bottom-[20px] bg-white px-20 py-5 rounded-lg capitalize">
            {collection.name}
          </p>
        </Link>
      ))}
    </div>
  );
};
