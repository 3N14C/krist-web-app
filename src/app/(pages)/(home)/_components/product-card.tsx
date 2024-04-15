"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { Prisma, Product } from "@prisma/client";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "sonner";

interface IProps {
  products: Prisma.ProductGetPayload<{
    include: {
      reviews: true;
      colors: true;
      sizes: true;
    };
  }>[];

  gridCols?: string;
}

export const ProductCard: FC<IProps> = ({ products, gridCols }) => {
  const [hover, setHover] = useState<Product | null>(null);
  const { addProduct, products: wishlistProducts } = useWishlistStore();
  const { addProduct: addProductToCart } = useCartStore();
  const router = useRouter();

  return (
    <div
      className={cn("grid gap-10", gridCols, {
        "lg:grid-cols-3": !gridCols,
      })}
    >
      {products?.map((product) => (
        <div key={product?.id} className="cursor-pointer">
          <div className="relative w-fit">
            <Image
              onMouseEnter={() => setHover(product)}
              onMouseLeave={() => setHover(null)}
              src={product?.img || ""}
              width={1000}
              height={1000}
              alt={product?.name}
              className="w-[300px] h-[300px]  -z-10"
              onClick={() =>
                router.push(
                  `/product/${product.collectionId}/${product?.id}?productPage=description`
                )
              }
            />

            <div
              onMouseEnter={() => setHover(product)}
              onMouseLeave={() => setHover(null)}
            >
              <div
                className={cn(
                  "absolute top-0 right-3 opacity-0 transition duration-300",
                  {
                    "absolute top-0 right-3 opacity-100":
                      hover?.id === product?.id,
                  }
                )}
              >
                <div
                  className="p-2 bg-white rounded-full"
                  onClick={() => addProduct(product)}
                >
                  <Heart
                    fill={
                      wishlistProducts.some((p) => p.id === product?.id)
                        ? "red"
                        : "transparent"
                    }
                    color="red"
                  />
                </div>
              </div>

              <Button
                onClick={() => {
                  addProductToCart({
                    id: product?.id,
                    name: product?.name,
                    price: product?.price,
                    img: product?.img,
                    size: product?.sizes[0],
                    color: product?.colors[0],

                    count: 1,
                  });

                  toast.success("Товар добавлен в корзину");
                }}
                variant={"outline"}
                className={cn(
                  "absolute bottom-3 translate-x-1/2 opacity-0 transition duration-300",
                  {
                    "opacity-100": hover?.id === product?.id,
                  }
                )}
              >
                Добавить в корзину
              </Button>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-1">
            <p className="text-lg font-semibold capitalize">{product?.name}</p>
            <p>
              {parseFloat(product?.price.toString()).toLocaleString("us-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
