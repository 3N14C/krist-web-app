"use client";

import { TotalOrder } from "@/components/total-order";
import { FC } from "react";
import { CreateOrderStatus } from "./_components/create-order-status";
import { CustomTitle } from "@/components/ui/custom-title";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { useMutation } from "@tanstack/react-query";
import { OrderService } from "@/actions/order/order-service";
import { useSession } from "@/hooks/use-session";

interface IProps {
  address: React.ReactNode;
  payment: React.ReactNode;
  review: React.ReactNode;
}

const Layout: FC<IProps> = ({ address, payment, review }) => {
  const router = useRouter();
  const [orderPage] = useQueryState("orderPage", parseAsArrayOf(parseAsString));

  const { user } = useSession();

  const { productsCart, removeAllProducts } = useCartStore();

  const { mutateAsync } = useMutation({
    mutationFn: OrderService.create,
    onSuccess: ({ url, isPaid }) => {
      router.push(url);

      removeAllProducts();
    },
  });

  const handleCheckout = async () => {
    user?.id &&
      (await mutateAsync({
        totalPrice: productsCart.totalPrice + 5,
        userId: user?.id,
        products: productsCart.products,
        quantity: 1,
        size: "sm",
      }));
  };

  return (
    <div className="">
      <CustomTitle title="Адрес доставки" />
      <div className="mt-10 grid  lg:grid-cols-4">
        <div className="lg:col-span-3">
          <CreateOrderStatus orderPage={orderPage || ["address"]} />

          <div className="">
            {orderPage?.includes("address") &&
              !orderPage?.includes("payment") &&
              address}

            {orderPage?.includes("payment") &&
              !orderPage?.includes("review") &&
              payment}

            {orderPage?.includes("review") && review}
          </div>
        </div>

        <div className="">
          <TotalOrder
            visible={orderPage?.includes("review")}
            buttonTitle="Оформить заказ"
            onClick={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;
