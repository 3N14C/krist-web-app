"use client";

import { useCardStore } from "@/store/card-store";
import { FC } from "react";
import { CardItem } from "./card-card";

export const CardList: FC = () => {
  const { cards, removeCard } = useCardStore();

  return (
    <div className="w-[1250px]">
      <CardItem cards={cards} removeCard={removeCard} />
    </div>
  );
};
