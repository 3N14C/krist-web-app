"use client";

import { FC } from "react";
import { trpc } from "@/trpc-client/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const OrderProductList: FC = () => {
  const { data: user } = trpc.authUser.getUserSession.useQuery();
  const { data: orders } = trpc.orders.getOrdersByUserId.useQuery(
    user?.id || ""
  );

  return (
    <div className="flex flex-col gap-14">
      {orders?.map((order) => (
        <div key={order.id} className="">
          <div className="text-xl grid grid-cols-8 items-center">
            <div className="flex items-center gap-2 col-span-2">
              <Image
                src={order.product.img}
                alt={order.product.name}
                width={1000}
                height={1000}
                className="h-32 w-32"
              />

              <div className="flex flex-col gap-1 ">
                <p className="font-bold">{order.product.name}</p>
                <p className="">
                  Размер: <span className="uppercase">{order.size}</span>
                </p>

                <p>Количество: {order.quantity}</p>
              </div>
            </div>

            <p className="font-bold text-center col-span-5">
              ${order.product.price * order.quantity}
            </p>

            <div className="flex flex-col gap-3">
              <Button className="py-7">
                <Link
                  href={`/product/${order.product.collectionId}/${order.productId}`}
                >
                  Посмотреть заказ
                </Link>
              </Button>

              {order.status === "Доставлен" && (
                <Button className="py-7">
                  <Link
                    href={`/product/${order.product.collectionId}/${order.productId}?productPage=reviews`}
                  >
                    Оставить отзыв
                  </Link>
                </Button>
              )}
            </div>
          </div>

          <p className="mt-5 text-xl flex items-center gap-3">
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

      {/* {orders?.map((order) => (
        <div key={order.id} className="">
          {order.product.name}
        </div>
      ))} */}
    </div>
  );
};
