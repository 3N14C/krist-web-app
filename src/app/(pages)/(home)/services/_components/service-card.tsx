"use client";

import { ServiceOrderService } from "@/actions/service-order/order-service-service";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";
import { createServiceOrderSchema } from "@/server/zod-validators/post-create-service-order";
import { Service } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { toast } from "sonner";
import { z } from "zod";

interface IProps {
  service: Service;
}

export const ServiceCard: FC<IProps> = ({ service }) => {
  const { user } = useSession();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ServiceOrderService.create,
    onSuccess: () => {
      toast.success("Заявка успешно отправлена");
    },
    onError: () => {
      toast.error("Не удалось отправить заявку");
    },
  });

  const handleCreateOrder = async ({ serviceId }: { serviceId: string }) => {
    if (!user) {
      return toast.error("Сначала авторизируйтесь");
    }

    if (!user.phone) {
      toast.error(
        "Для оформления заявки необходимо указать ваш номер телефона"
      );
      router.push("/profile?profilePage=user");
      return;
    }

    await mutateAsync({
      serviceId: serviceId,
      userId: user.id,
    });
  };

  return (
    <div className="flex items-center gap-10 border rounded-lg px-4 py-3">
      <div className="text-xl flex flex-col items-start gap-3">
        <p className="">{service.name}</p>
        <Button
          onClick={async () =>
            await handleCreateOrder({ serviceId: service.id })
          }
          size={"lg"}
          className=""
        >
          {isPending ? <Loader2 className="animate-spin" /> : "Оставить заявку"}
        </Button>
      </div>
    </div>
  );
};
