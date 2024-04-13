"use client";

import { ICard } from "@/interfaces/card.interface";
import { trpc } from "@/trpc-client/client";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { toast } from "sonner";

interface IProps {
  cards: ICard[];

  removeCard: (id: string) => void;
}

export const CardItem: FC<IProps> = ({ cards, removeCard }) => {
  const { data: user } = trpc.authUser.getUserSession.useQuery();

  const handleRemoveCard = (id: string) => {
    removeCard(id);

    toast.success("Карта удалена");
  };

  return (
    <div className="flex flex-col gap-10">
      {cards
        .filter((card) => card.userId === user?.id)
        .map((card) => (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <Image
                  src={card.img}
                  alt={card.name}
                  width={1000}
                  height={1000}
                  className="h-20 w-20"
                />

                <div className="flex flex-col gap-3 text-xl text-[#3c3b40]">
                  <p className="font-bold text-2xl text-[#1b1b1b]">
                    {card.name}
                  </p>
                  <p className="">
                    {card.cardNumber.replace(/(.{4})/g, "$1 ")}
                  </p>
                </div>
              </div>

              <div
                className="flex items-center gap-2 cursor-pointer bg-red-100/50 hover:bg-red-200/50 transition duration-300 py-2 px-4 rounded-lg"
                onClick={() => handleRemoveCard(card.id)}
              >
                <Trash2 className="text-red-400" />
                <p className="text-red-400">Удалить</p>
              </div>
            </div>
            <hr />
          </>
        ))}
    </div>
  );
};
