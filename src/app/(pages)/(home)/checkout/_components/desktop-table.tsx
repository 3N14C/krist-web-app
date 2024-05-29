"use client";

import { TotalOrder } from "@/components/total-order";
import { CustomTitle } from "@/components/ui/custom-title";
import { ICartProduct } from "@/interfaces/cart.interface";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { toast } from "sonner";

interface IProps {
  productsCart: {
    products: ICartProduct[];
  };

  removeProduct: (product: ICartProduct) => void;
  changeProductCount: (id: string, increment: boolean) => void;
}

export const DesktopTable: FC<IProps> = ({
  productsCart,
  removeProduct,
  changeProductCount,
}) => {
  const router = useRouter();

  const handleRemoveProduct = (product: ICartProduct) => {
    removeProduct(product);
    toast.success("Товар удален из корзины");
  };

  return (
    <div className="">
      <CustomTitle title="Подтвердите заказ" />
      <div className="grid grid-cols-4 mt-10">
        <div className="w-full col-span-3">
          <div className="grid grid-cols-4 text-xl">
            <p className="">Товары</p>
            <p>Цена</p>
            <p>Количество</p>
            <p>Итоговая цена</p>
          </div>

          <div className="mt-10 flex flex-col gap-10 ">
            {productsCart.products.map((product) => (
              <div key={product.id} className="grid grid-cols-4 items-center">
                <div className="flex items-center gap-5">
                  <Image
                    src={product.img || ""}
                    alt={product.name || ""}
                    width={1000}
                    height={1000}
                    className="w-[60px] h-[60px]"
                  />

                  <div className="">
                    <p className="text-xl font-bold">{product.name}</p>
                    <p className="text-md">
                      Размер:{" "}
                      {product?.size?.name ? (
                        <span className="uppercase">{product?.size?.name}</span>
                      ) : (
                        "Регулируемый"
                      )}
                    </p>
                  </div>
                </div>

                <p className="text-xl">
                  ${parseFloat(product.price.toString()).toFixed(2)}
                </p>

                <div className="flex items-center justify-evenly gap-2 border border-black rounded-lg w-48 py-3">
                  <Minus
                    onClick={() => changeProductCount(product.id, false)}
                    className="cursor-pointer"
                  />
                  <p className="text-xl">{product.count}</p>
                  <Plus
                    onClick={() => changeProductCount(product.id, true)}
                    className="cursor-pointer"
                  />
                </div>

                <div className="flex items-center gap-20">
                  <p className="text-xl">
                    $
                    {parseFloat(
                      (product.price * product.count).toString()
                    ).toFixed(2)}
                  </p>

                  <Trash2
                    className="text-red-400 cursor-pointer"
                    onClick={() => handleRemoveProduct(product)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <TotalOrder
          onClick={() =>
            router.push("/checkout/shipping-address?orderPage=address")
          }
        />
      </div>
    </div>
  );
};
