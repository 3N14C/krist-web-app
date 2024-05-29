"use client";

import { OrderService } from "@/actions/order/order-service";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

export const AdminOrderList: FC = () => {
  const { data: orders } = useQuery({
    queryKey: ["admin-order-lsit"],
    queryFn: OrderService.getAll,
  });

  return (
    <div className="flex flex-col gap-5">
      {orders?.map((order) => (
        <div key={order.id} className="">
          <p className="text-xl">{order.id.slice(20) + "..."}</p>
        </div>
      ))}
    </div>
  );
};
