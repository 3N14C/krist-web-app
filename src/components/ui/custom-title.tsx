"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";

interface IProps {
  title: string;
  className?: string;
}

export const CustomTitle: FC<IProps> = ({ title, className }) => {
  return (
    <p className={cn('text-4xl font-medium leading-none', className, {
      'text-4xl': !className
    })}>{title}</p>
  );
};
