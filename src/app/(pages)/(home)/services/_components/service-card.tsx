"use client";

import { OrderServiceService } from "@/actions/order-service/order-service-service";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";
import { createServiceOrderSchema } from "@/server/zod-validators/post-create-service-order";
import { Service } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";
import { z } from "zod";

interface IProps {
  service: Service;
}

export const ServiceCard: FC<IProps> = ({ service }) => {
  // const { mutateAsync } =
  //   trpc.createOrderService.createServiceOrder.useMutation({
  //     onSuccess: () => {
  //       toast.success("Заявка успешно отправлена");
  //     },
  //   });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: OrderServiceService.create,
    onSuccess: () => {
      toast.success("Заявка успешно отправлена");
    },
    onError: () => {
      toast.error("Не удалось отправить заявку");
    },
  });

  const { user } = useSession();

  const handleCreateOrder = async (
    data: z.infer<typeof createServiceOrderSchema>
  ) => {
    user &&
      (await mutateAsync({
        ...data,
      }));
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
          {isPending ? <Loader2 className="animate-spin" /> : "Оставить заявку"}
        </Button>
      </div>
    </div>
  );
};
