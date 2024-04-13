"use client";

import { Button } from "@/components/ui/button";
import { CustomTitle } from "@/components/ui/custom-title";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

export const MainSection: FC = () => {
  const router = useRouter();

  return (
    <div className="bg-[#f3f3f3] dark:bg-[#1f1f1f] mt-[20px] -z-10">
      <div className="flex items-center justify-around">
        <div className="">
          <div className="flex flex-col gap-[20px]">
            <CustomTitle title="Эксклюзивная классика" />
            <p className="text-8xl font-semibold leading-none">
              Женская Коллекция
            </p>
            <p className="text-4xl font-medium leading-none">ДО 40%</p>
          </div>

          <Button
            onClick={() => router.push("/products-catalog")}
            size={"lg"}
            className="mt-[40px] text-base py-8 flex items-center gap-[10px]"
          >
            Заказать сейчас <ArrowRight />
          </Button>
        </div>
        <Image
          src={"/women.png"}
          width={500}
          height={500}
          alt="women"
          className=""
        />
      </div>
    </div>
  );
};
