"use client";

import { OrderService } from "@/actions/order/order-service";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "@/hooks/use-session";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export const OrderProductList: FC = () => {
  const { user, isLoading } = useSession();
  const { data: orders } = useQuery({
    queryKey: ["orders-by-user-id", user?.id],
    queryFn: async () =>
      user && (await OrderService.byUserId({ userId: user?.id })),
  });

  return (
    <ScrollArea className="h-[600px] px-5">
      <div className="">
        {orders?.map((order) => (
          <div key={order.id} className="flex flex-col gap-14">
            {order.product.map((product) => (
              <div
                key={product.id}
                className="text-xl grid grid-cols-8 items-center"
              >
                <div className="flex items-center gap-2 col-span-2">
                  <Image
                    src={product.img}
                    alt={product.name}
                    width={1000}
                    height={1000}
                    className="h-32 w-32"
                  />

                  <div className="flex flex-col gap-1 ">
                    <p className="font-bold">{product.name}</p>
                    <p className="">
                      Размер: <span className="uppercase">{order.size}</span>
                    </p>

                    <p>Количество: {order.quantity}</p>
                  </div>
                </div>

                <p className="font-bold text-center col-span-5">
                  {(product.price * order.quantity).toLocaleString("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                    maximumFractionDigits: 2,
                  })}
                </p>

                <div className="flex flex-col gap-3">
                  <Button className="py-7">
                    <Link
                      href={`/product/${product.collectionId}/${product.id}`}
                    >
                      Посмотреть заказ
                    </Link>
                  </Button>

                  {order.status === "Доставлен" && (
                    <Button className="py-7">
                      <Link
                        href={`/product/${product.collectionId}/${product.id}?productPage=reviews`}
                      >
                        Оставить отзыв
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <p className="text-xl flex items-center gap-3">
              <span
                className={cn("", {
                  "text-yellow-600 bg-yellow-100 px-7 py-2 rounded-lg":
                    order.status === "В пути",
                  "text-green-600 bg-green-100 px-7 py-2 rounded-lg":
                    order.status === "Доставлен",
                })}
              >
                {order.status}
              </span>
              Ваш заказ {order.status}
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
