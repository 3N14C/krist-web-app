"use client";

import { TotalOrder } from "@/components/total-order";
import { FC } from "react";
import { CreateOrderStatus } from "./_components/create-order-status";
import { CustomTitle } from "@/components/ui/custom-title";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { trpc } from "@/trpc-client/client";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";

interface IProps {
  address: React.ReactNode;
  payment: React.ReactNode;
  review: React.ReactNode;
}

const Layout: FC<IProps> = ({ address, payment, review }) => {
  const router = useRouter();
  const [orderPage] = useQueryState("orderPage", parseAsArrayOf(parseAsString));
  const { mutateAsync: createOrder } =
    trpc.createOrder.createOrder.useMutation();

  const { data: user } = trpc.authUser.getUserSession.useQuery();

  const { productsCart, removeAllProducts } = useCartStore();

  const { mutateAsync: checkout } = trpc.checkout.checkoutOrder.useMutation({
    onSuccess: ({ url, isPaid }) => {
      router.push(url);

      productsCart.products.forEach(async (product) => {
        await createOrder({
          productId: product.id,
          size: product?.size?.name || "Регулируемый",
          quantity: product.count,

          userId: user?.id || "",
        });
      });

      removeAllProducts();
    },
  });

  return (
    <div className="">
      <CustomTitle title="Адрес доставки" />
      <div className="mt-10 grid grid-cols-4">
        <div className="col-span-3">
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
            onClick={async () => {
              user?.id &&
                (await checkout({
                  totalPrice: productsCart.totalPrice + 5,
                  userId: user?.id,
                  products: productsCart.products,
                }));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;
