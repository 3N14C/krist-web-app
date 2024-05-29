"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";

interface IProps {
  title: string;
  className?: string;
}

export const CustomTitle: FC<IProps> = ({ title, className }) => {
  return (
    <p
      className={cn("lg:text-4xl text-xl font-medium leading-none", className, {
        "lg:text-4xl text-xl": !className,
      })}
    >
      {title}
    </p>
  );
};
