"use client";

import { Button } from "@/components/ui/button";
import { CustomTitle } from "@/components/ui/custom-title";
import { useDealMonthStore } from "@/store/deal-month-store";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";

export const DealsMonthSection: FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { dateTime } = useDealMonthStore();
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: dateTime,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-10 text-lg">
        <CustomTitle title="Предложение Месяца" />

        <p className="lg:max-w-[800px] lg:text-start text-center w-full">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati,
          nam beatae veritatis repellat ipsa ea numquam earum? Laborum,
          aspernatur, neque reiciendis aperiam officiis laudantium velit quia
          veniam omnis, aliquam expedita.
        </p>

        <div className="flex lg:flex-row flex-col items-center gap-10">
          <div className="flex flex-col items-center border px-6 py-3">
            <p className="font-bold text-2xl">{days}</p>
            <p>Дней</p>
          </div>

          <div className="flex flex-col items-center border px-6 py-3">
            <p className="font-bold text-2xl">{hours}</p>
            <p>Часов</p>
          </div>

          <div className="flex flex-col items-center border px-6 py-3">
            <p className="font-bold text-2xl">{minutes}</p>
            <p>Минут</p>
          </div>

          <div className="flex flex-col items-center border px-6 py-3">
            <p className="font-bold text-2xl">{seconds}</p>
            <p>Секунд</p>
          </div>
        </div>

        <Button asChild className="py-9 lg:px-20">
          <Link href={"/products-catalog"}>Открыть каталог</Link>
        </Button>
      </div>

      <Image
        src={"/women.png"}
        alt="women"
        width={500}
        height={500}
        className="lg:block hidden"
      />
    </div>
  );
};
