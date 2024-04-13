"use client";

import { useCartStore } from "@/store/cart-store";
import { FC } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface IProps {
  visible?: boolean;
  buttonTitle?: string;
  onClick: () => void;
}

export const TotalOrder: FC<IProps> = ({
  visible = true,
  buttonTitle = "Перейти к оплате",
  onClick,
}) => {
  const { productsCart } = useCartStore();
  const router = useRouter();

  const deliveryCharge = 5;

  return (
    <div className="flex flex-col gap-6 border px-5 py-4">
      <div className="text-xl font-bold flex items-center justify-between border-b pb-4">
        <p>Промежуточный итог</p>
        <p>${parseFloat(productsCart.totalPrice.toString()).toFixed(2)}</p>
      </div>

      <div className="mt-5">
        <p className="text-base">Скидочный купон</p>

        <div className="flex items-center">
          <Input
            placeholder="Скидочный купон"
            className="rounded-r-[0px] h-[60px] text-xl uppercase placeholder:normal-case"
          />
          <Button className="rounded-l-[0px] h-[60px]">Проверить</Button>
        </div>
      </div>

      <div className="flex items-center justify-between text-xl border-b pb-4">
        <p>Стоимость Доставки</p>
        <p>${parseFloat(deliveryCharge.toString()).toFixed(2)}</p>
      </div>

      <div className="flex items-center justify-between text-xl font-bold">
        <p>Общий итог</p>
        <p>
          ${parseFloat((deliveryCharge + productsCart.totalPrice).toString()).toFixed(2)}
        </p>
      </div>

      {visible && (
        <Button onClick={onClick} className="h-[60px] text-lg">
          {buttonTitle}
        </Button>
      )}
    </div>
  );
};
