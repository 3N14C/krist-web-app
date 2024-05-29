import { Prisma } from "@prisma/client";

export type ProductById = Prisma.ProductGetPayload<{
  include: { reviews: { include: { user: true } }; colors: true; sizes: true };
}>;

export type RelatedProduct = Prisma.ProductGetPayload<{
  include: { reviews: true; colors: true; sizes: true };
}>;

export type BestSellerProduct = Prisma.ProductGetPayload<{
  include: {
    sizes: true;
    colors: true;
    reviews: true;
  };
}>;

export type ProductBySlug = Prisma.ProductGetPayload<{
  include: {
    reviews: true;
    colors: true;
    sizes: true;
  };
}>;
