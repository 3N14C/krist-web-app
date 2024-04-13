"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FC } from "react";

interface IProps {
  title: string;
}

export const AddItemButton: FC<IProps> = ({ title }) => {
  return (
    <div className="">
      <Button className="py-9 px-20 flex items-center gap-5">
        <Plus /> <p className="capitalize text-lg">{title}</p>
      </Button>
    </div>
  );
};
