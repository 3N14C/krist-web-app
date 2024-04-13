"use client";

import { useAddressStore } from "@/store/address-store";
import { FC } from "react";
import { AddressCard } from "./address-card";

export const AddressList: FC = () => {
  const { address, removeAddress } = useAddressStore();

  return (
    <div className="w-[1250px]">
      <AddressCard removeAddress={removeAddress} address={address} />
    </div>
  );
};
