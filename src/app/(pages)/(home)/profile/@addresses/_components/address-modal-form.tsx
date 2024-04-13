"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAddressStore } from "@/store/address-store";
import { useNotificationsStore } from "@/store/notifications-store";
import { trpc } from "@/trpc-client/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IProps {
  buttonClassName?: string;
}

export const AddressModalForm: FC<IProps> = ({ buttonClassName }) => {
  const { data: user } = trpc.authUser.getUserSession.useQuery();
  const { addNotification } = useNotificationsStore();
  const { addAddress } = useAddressStore();

  const schema = z.object({
    name: z
      .string({ required_error: "Обязательное поле" })
      .min(1, "Обязательное поле"),

    phoneNumber: z
      .string()
      .min(11, "Номер телефона должен содержать 11 символов")
      .max(11, "Номер телефона должен содержать 11 символов"),

    zipCode: z
      .string({ required_error: "Обязательное поле" })
      .min(6, '"Почтовый индекс" должен содержать 6 символов')
      .max(6, '"Почтовый индекс" должен содержать 6 символов"'),

    city: z
      .string({ required_error: "Обязательное поле" })
      .min(1, "Обязательное поле"),

    street: z
      .string({ required_error: "Обязательное поле" })
      .min(1, "Обязательное поле"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      name: "",
      phoneNumber: "",
      zipCode: "",
      city: "",
      street: "",
    },

    resolver: zodResolver(schema),
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    if (user?.id) {
      addAddress({
        ...data,
        id: crypto.randomUUID(),
        userId: user?.id,
      });

      addNotification({
        id: crypto.randomUUID(),
        date: new Date(),
        title: "Адрес добавлен",
        message: "Вы успешно добавили новый адрес",
        userId: user?.id,
        icon: "MapPin",
      });
    }

    toast.success("Адрес успешно добавлен");
  };

  return (
    <>
      <form className="flex flex-col gap-3">
        <div className="">
          <p>Название</p>
          <Input
            {...register("name")}
            placeholder="Мой дом"
            className="py-6 text-lg"
          />

          {errors.name && (
            <p className="text-red-500">{errors.name?.message}</p>
          )}
        </div>

        <div className="">
          <p>Номер телефона</p>
          <Input
            {...register("phoneNumber")}
            placeholder="89876543210"
            className="py-6 text-lg"
          />

          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber?.message}</p>
          )}
        </div>

        <div className="">
          <p>Почтовый индекс</p>
          <Input
            {...register("zipCode")}
            placeholder="664000"
            className="py-6 text-lg"
          />

          {errors.zipCode && (
            <p className="text-red-500">{errors.zipCode?.message}</p>
          )}
        </div>

        <div className="">
          <p>Ваш город</p>
          <Input
            {...register("city")}
            placeholder="Иркутск"
            className="py-6 text-lg"
          />

          {errors.city && (
            <p className="text-red-500">{errors.city?.message}</p>
          )}
        </div>

        <div className="">
          <p>Ваша улица</p>
          <Input
            {...register("street")}
            placeholder="Байкальская 17/2"
            className="py-6 text-lg"
          />

          {errors.street && (
            <p className="text-red-500">{errors.street?.message}</p>
          )}
        </div>
      </form>

      <Button
        onClick={handleSubmit(onSubmit)}
        className={cn("py-7 text-lg", buttonClassName)}
      >
        Добавить
      </Button>
    </>
  );
};
