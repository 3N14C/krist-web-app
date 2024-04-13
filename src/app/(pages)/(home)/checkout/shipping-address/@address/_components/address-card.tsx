"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { IAddress } from "@/interfaces/address.interface";
import { User } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { FC } from "react";

interface IProps {
  addresses: IAddress[];
  user: User | null;
  removeAddress: (id: string) => void;
  chooseAddress: (address: IAddress) => void;
  chosenAddress: IAddress | null;
}

export const AddressCard: FC<IProps> = ({
  addresses,
  user,
  removeAddress,
  chooseAddress,
  chosenAddress,
}) => {
  return (
    <div className="grid grid-cols-2 items-center gap-6 max-w-[900px]">
      {addresses
        .filter((address) => address.userId === user?.id)
        .map((address) => (
          <div key={address.id} className="bg-[#f5f5fd] pl-4 py-3 rounded-lg">
            <div className="grid grid-cols-5 items-center">
              <p className="text-xl font-bold col-span-4">{address.name}</p>
              <Checkbox
                checked={chosenAddress?.id === address.id}
                onClick={() => chooseAddress(address)}
                className="w-5 h-5"
              />
            </div>

            <p className="mt-2">
              {address.street}, {address.city} {address.zipCode}
            </p>

            <div
              onClick={() => removeAddress(address.id)}
              className="flex items-center mt-4 gap-3 bg-red-100 w-fit px-3 py-2 rounded-lg cursor-pointer hover:bg-red-200 transition"
            >
              <Trash2 className="text-red-400" />
              <p>Удалить</p>
            </div>
          </div>
        ))}
    </div>
  );
};
