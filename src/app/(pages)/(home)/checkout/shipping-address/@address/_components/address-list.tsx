"use client";

import { useAddressStore } from "@/store/address-store";
import { trpc } from "@/trpc-client/client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { AddressCard } from "./address-card";
import { Button } from "@/components/ui/button";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

export const AddressList: FC = () => {
  const { address, removeAddress, chooseAddress, chosenAddress } =
    useAddressStore();
  const { data: user } = trpc.authUser.getUserSession.useQuery();

  const [orderPage, setOrderPage] = useQueryState(
    "orderPage",
    parseAsArrayOf(parseAsString)
  );

  return (
    <div className="">
      <AddressCard
        addresses={address}
        user={user || null}
        removeAddress={removeAddress}
        chooseAddress={chooseAddress}
        chosenAddress={chosenAddress}
      />

      <Button
        onClick={() => setOrderPage([...(orderPage || []), "payment"])}
        className="mt-10 text-xl py-8 px-20"
      >
        Доставить на этот адрес
      </Button>
    </div>
  );
};
