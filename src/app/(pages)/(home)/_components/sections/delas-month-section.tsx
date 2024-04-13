"use client";

import { CustomTitle } from "@/components/ui/custom-title";
import { FC, useEffect, useState } from "react";

export const DealsMonthSection: FC = () => {
  const [daysLeft, setDaysLeft] = useState(120);

  useEffect(() => {
    const timer = setInterval(() => {
      setDaysLeft((prevDays) => prevDays - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <CustomTitle title="Предложение Месяца" />
      <p>Дней осталось: {daysLeft}</p>
    </div>
  );
};
