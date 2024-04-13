import { IAddress } from "@/interfaces/address.interface";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface IAddressStore {
  address: IAddress[];
  chosenAddress: IAddress | null;

  addAddress: (address: IAddress) => void;
  removeAddress: (id: string) => void;
  chooseAddress: (address: IAddress) => void;
}

export const useAddressStore = create<IAddressStore>()(
  devtools(
    persist(
      (set) => ({
        address: [],
        chosenAddress: null,

        addAddress: (address) =>
          set((state) => ({ address: [...state.address, address] })),

        removeAddress: (id) =>
          set((state) => ({
            address: state.address.filter((a) => a.id !== id),
          })),

        chooseAddress: (address) =>
          set((state) => ({
            chosenAddress:
              state.address.find((a) => a.id === address.id) || null,
          })),
      }),

      {
        name: "address-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
