"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCardStore } from "@/store/card-store";
import { trpc } from "@/trpc-client/client";
import { Trash2 } from "lucide-react";
import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";
import { FC } from "react";

export const CardList: FC = () => {
  const { cards, removeCard, chooseCard, choosenCard } = useCardStore();
  const { data: user } = trpc.authUser.getUserSession.useQuery();

  const [orderPage, setOrderPage] = useQueryState(
    "orderPage",
    parseAsArrayOf(parseAsString)
  );

  return (
    <div className="">
      <div className="grid grid-cols-2 items-center gap-6 max-w-[900px]">
        {cards
          .filter((card) => card.userId === user?.id)
          .map((card) => (
            <div key={card.id} className="bg-[#f5f5fd] pl-4 py-3 rounded-lg">
              <div className="grid grid-cols-5 items-center">
                <p className="text-xl font-bold col-span-4">{card.name}</p>
                <Checkbox
                  checked={choosenCard?.id === card.id}
                  onClick={() => chooseCard(card)}
                  className="w-5 h-5"
                />
              </div>

              <p className="mt-2">
                <p>{card.cardNumber}</p>
              </p>

              <div
                onClick={() => removeCard(card.id)}
                className="flex items-center mt-4 gap-3 bg-red-100 w-fit px-3 py-2 rounded-lg cursor-pointer hover:bg-red-200 transition"
              >
                <Trash2 className="text-red-400" />
                <p>Удалить</p>
              </div>
            </div>
          ))}
      </div>

      <Button
        onClick={() => setOrderPage([...(orderPage || []), "review"])}
        className="mt-10 text-xl py-8 px-20"
      >
        Использовать эту карту
      </Button>
    </div>
  );
};
