import { ICard } from "@/interfaces/card.interface";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface ICardStore {
  cards: ICard[];
  choosenCard: ICard | null

  addCard: (card: ICard) => void;
  removeCard: (id: string) => void;
  chooseCard: (card: ICard) => void
}

export const useCardStore = create<ICardStore>()(
  devtools(
    persist(
      (set) => ({
        cards: [],
        choosenCard: null,

        addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),

        removeCard: (id) =>
          set((state) => ({ cards: state.cards.filter((c) => c.id !== id) })),

        chooseCard: (card) =>
          set((state) => ({
            choosenCard: state.cards.find((a) => a.id === card.id) || null,
          })),
      }),

      {
        name: "card-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
