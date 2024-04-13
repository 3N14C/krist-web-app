"use client";

import { Switch } from "@/components/ui/switch";
import { FC, useState } from "react";

interface IProps {
  title: string;
  body: string;
  switchId: string;
  checked?: boolean;
}

export const SwitchComponent: FC<IProps> = ({
  title,
  body,
  switchId,
  checked = true,
}) => {
  const [checkedState, setCheckedState] = useState<boolean>(checked);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold select-none">{title}</p>
        <p className="text-lg text-[#a5a2ab] select-none">{body}</p>
      </div>

      <Switch
        checked={checkedState}
        onClick={() => setCheckedState(!checkedState)}
        id={switchId}
      />
    </div>
  );
};
