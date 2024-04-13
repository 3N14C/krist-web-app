"use client";

import { useCardStore } from "@/store/card-store";
import { FC } from "react";

export const PaymentMethod: FC = () => {
  const { choosenCard } = useCardStore();

  return (
    <div className="">
      <p className="text-2xl font-bold">Способ оплаты</p>

      <div className="mt-3 flex flex-col text-lg">
        <p className="font-bold">
          {choosenCard?.name} (
          <span>
            {choosenCard?.cardNumber.slice(0, 4)}...
            {choosenCard?.cardNumber.slice(-4)}
          </span>
          )
        </p>
      </div>
    </div>
  );
};
