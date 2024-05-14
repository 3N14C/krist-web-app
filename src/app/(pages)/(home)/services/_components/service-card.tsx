"use client";

import { Button } from "@/components/ui/button";
import { createServiceOrderSchema } from "@/server/zod-validators/post-create-service-order";
import { trpc } from "@/trpc-client/client";
import { Service } from "@prisma/client";
import { FC } from "react";
import { z } from "zod";

interface IProps {
  service: Service;
}

export const ServiceCard: FC<IProps> = ({ service }) => {
  const { mutateAsync } =
    trpc.createOrderService.createServiceOrder.useMutation();
  const { data: user } = trpc.authUser.getUserSession.useQuery();

  const handleCreateOrder = async (
    data: z.infer<typeof createServiceOrderSchema>
  ) => {
    await mutateAsync(data);
    console.log("CREATED");
  };

  return (
    <div className="flex items-center gap-10 border rounded-lg px-4 py-3">
      <div className="text-xl flex flex-col items-start gap-3">
        <p className="">{service.name}</p>
        <Button
          onClick={() => {
            user &&
              handleCreateOrder({ serviceId: service.id, userId: user.id });
          }}
          size={"lg"}
          className=""
        >
          Оставить заявку
        </Button>
      </div>
    </div>
  );
};
