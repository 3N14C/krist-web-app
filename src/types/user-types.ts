import { Prisma } from "@prisma/client";

export type UserOrderService = Prisma.UserGetPayload<{
  include: {
    orderService: {
      include: {
        service: true;
      };
    };
    CustomOrderService: true;
  };
}>;
