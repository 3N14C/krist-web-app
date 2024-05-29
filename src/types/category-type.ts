import { Prisma } from "@prisma/client";

export type CategoryCollection = Prisma.CategoryGetPayload<{
  include: { collection: true };
}>;

export type CategoryById = Prisma.CategoryGetPayload<{
  include: { collection: true };
}>;
