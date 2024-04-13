"use client";

import { useAddressStore } from "@/store/address-store";
import { useCardStore } from "@/store/card-store";
import { FC } from "react";

export const ShippingAddress: FC = () => {
  const { chosenAddress } = useAddressStore();

  return (
    <div className="">
      <p className="text-2xl font-bold">Адрес доставки</p>

      <div className="mt-3 flex flex-col text-lg">
        <p className="font-bold">{chosenAddress?.name}</p>

        <p>
          {chosenAddress?.street}, {chosenAddress?.city}{" "}
          {chosenAddress?.zipCode}
        </p>
      </div>
    </div>
  );
};
