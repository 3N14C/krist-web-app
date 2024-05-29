import { Prisma } from "@prisma/client";

export type AllColor = Prisma.ColorGetPayload<{
  include: {
    products: true;
  };
}>;
