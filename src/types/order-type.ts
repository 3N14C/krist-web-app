import { Prisma } from "@prisma/client";

export type OrderProductUser = Prisma.OrderGetPayload<{
  include: { product: true; user: true };
}>;
