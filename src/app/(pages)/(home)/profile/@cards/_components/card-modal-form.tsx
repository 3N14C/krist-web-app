"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "@/hooks/use-session";
import { cn } from "@/lib/utils";
import { useCardStore } from "@/store/card-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IBankCard {
  id: number;
  name: string;
  img: string;
}

const bankCard: IBankCard[] = [
  {
    id: 1,
    name: "Visa",
    img: "/cards/visa.svg",
  },

  {
    id: 2,
    name: "MasterCard",
    img: "/cards/mastercard.svg",
  },
];

interface IProps {
  buttonClassName?: string;
}

export const CardModalForm: FC<IProps> = ({ buttonClassName }) => {
  const [focus, setFocus] = useState<IBankCard | null>(null);
  const { addCard } = useCardStore();
  const { user } = useSession();

  const schema = z.object({
    cardNumber: z
      .string()
      .regex(/^\d{16}$/, "Номер карты должен содержать 16 цифр"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      cardNumber: "",
    },

    resolver: zodResolver(schema),
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    if (!focus) return toast.error("Выберите карту");

    if (focus && user?.id) {
      addCard({
        id: crypto.randomUUID(),
        userId: user?.id,
        cardNumber: data.cardNumber,
        name: focus.name,
        img: focus.img,
      });

      toast.success("Карта добавлена");
    }
  };

  return (
    <>
      <form className="flex flex-col gap-3">
        <div className="flex items-center justify-center gap-10">
          {bankCard.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg max-w-[500px] w-full cursor-pointer relative"
              onClick={() => setFocus(item)}
            >
              <Image
                src={item.img}
                width={1000}
                height={1000}
                alt={item.name}
                className="w-[100px] h-[100px] mx-auto"
              />

              <Check
                color="green"
                className={cn("absolute top-2 right-2 opacity-0 transition", {
                  "opacity-100 transition": item.id === focus?.id,
                })}
              />
            </div>
          ))}
        </div>

        <div className="">
          <p>Номер карты</p>
          <Input
            {...register("cardNumber")}
            placeholder="0000 0000 0000 0000"
            className="py-6 text-lg"
            maxLength={16}
          />

          {errors.cardNumber && (
            <p className="text-red-500">{errors.cardNumber?.message}</p>
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
