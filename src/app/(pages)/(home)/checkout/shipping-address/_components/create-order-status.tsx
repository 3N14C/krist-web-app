"use client";

import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import { FC } from "react";
import { icons } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IProps {
  orderPage?: string[];
}

const statusbar = [
  {
    id: "address",
    name: "Адрес доставки",
    icon: "Home" as keyof typeof icons,
  },

  {
    id: "payment",
    name: "Способ оплаты",
    icon: "CreditCard" as keyof typeof icons,
  },

  {
    id: "review",
    name: "Подтверждение",
    icon: "NotepadText" as keyof typeof icons,
  },
];

export const CreateOrderStatus: FC<IProps> = ({ orderPage }) => {
  return (
    <div className="grid grid-cols-3">
      {statusbar.map((status, idx) => {
        const Icon = icons[status.icon];
        return (
          <div key={status.id} className="">
            <div className="flex">
              <div className="flex flex-col items-center">
                <Button
                  variant={orderPage?.includes(status.id) ? "default" : "ghost"}
                  className={cn("cursor-default", {})}
                >
                  <Icon
                    name={status.icon}
                    className={cn("", {
                      "text-black": !orderPage?.includes(status.id),
                      "text-white": orderPage?.includes(status.id),
                    })}
                  />
                </Button>

                <p>{status.name}</p>
              </div>

              {orderPage?.includes("payment") && idx !== 2 && idx !== 1 && (
                <div
                  className={cn(
                    "border-t border-dashed flex-1 mt-5 border-black",
                    {
                      "border-[#c1c0c2]": !orderPage?.includes(status.id),
                    }
                  )}
                />
              )}

              {orderPage?.includes("review") && idx !== 2 && (
                <div
                  className={cn(
                    "border-t border-dashed flex-1 mt-5 border-black",
                    {
                      "border-[#c1c0c2]": !orderPage?.includes(status.id),
                    }
                  )}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
