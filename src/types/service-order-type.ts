import { Prisma } from "@prisma/client";

export type ServiceOrdersByUser = Prisma.ServiceOrderGetPayload<{
  include: { user: true; service: true };
}>;
