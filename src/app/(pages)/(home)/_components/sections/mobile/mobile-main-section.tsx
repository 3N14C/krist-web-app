"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

export const MobileMainSection: FC = () => {
  const router = useRouter();

  return (
    <>
      <div className="mt-[20px]">
        <div className="flex flex-col gap-[20px]">
          {/* <CustomTitle title="Эксклюзивная классика" className="text-lg" /> */}
          <p className="text-6xl font-semibold leading-none max-w-[100px]">
            Женская Коллекция
          </p>
          <p className="text-4xl font-medium leading-none">ДО 40%</p>

          <Button
            onClick={() => router.push("/products-catalog")}
            size={"sm"}
            className=" text-base py-8 w-[200px] flex items-center gap-[10px]"
          >
            Заказать сейчас <ArrowRight />
          </Button>
        </div>
      </div>
    </>
  );
};
