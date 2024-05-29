"use client";

import { TotalOrder } from "@/components/total-order";
import { Button } from "@/components/ui/button";
import { CustomTitle } from "@/components/ui/custom-title";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "sonner";
import { DesktopTable } from "./desktop-table";
import { MobileTable } from "./mobile-table";

export const ProductTable: FC = () => {
  const { productsCart, removeProduct, changeProductCount } = useCartStore();
  const router = useRouter();

  if (productsCart.products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-5">
        <Image
          src={"/img/empty-cart-krist.png"}
          alt=""
          width={1000}
          height={1000}
          className="lg:w-[500px] lg:h-[500px]"
        />

        <div className="flex flex-col items-center gap-5">
          <CustomTitle title="Ваша корзина пуста" />

          <Button>
            <Link href={"/products-catalog"}>Перейти в каталог</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="lg:block hidden">
        <DesktopTable
          changeProductCount={changeProductCount}
          productsCart={productsCart}
          removeProduct={removeProduct}
        />
      </div>

      <div className="lg:hidden block">
        <MobileTable
          changeProductCount={changeProductCount}
          productsCart={productsCart}
          removeProduct={removeProduct}
        />
      </div>
    </div>
  );
};
