"use client";

import { FC } from "react";

interface IProps {
  title: string;
  className?: string;
}

export const CustomTitle: FC<IProps> = ({ title, className }) => {
  return (
    <p className={`text-4xl font-medium leading-none ${className}`}>{title}</p>
  );
};
