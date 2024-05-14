import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface IDealMonthStore {
  dateTime: Date;
}

export const useDealMonthStore = create<IDealMonthStore>()(
  devtools(
    persist(
      (set) => ({
        dateTime: new Date("2024-06-14"),
      }),

      {
        name: "deal-month-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
