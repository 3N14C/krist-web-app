"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import { FC } from "react";

interface IProps {
  title: string;
  body: string;

  // selector
  options: string[];
}

export const SelectComponent: FC<IProps> = ({ title, body, options }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold select-none">{title}</p>
        <p className="text-lg text-[#a5a2ab] select-none">{body}</p>
      </div>

      <Select onValueChange={(value) => setTheme(value)} value={`${theme}`}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value={"light"}>{options[0]}</SelectItem>
          <SelectItem value={"dark"}>{options[1]}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
