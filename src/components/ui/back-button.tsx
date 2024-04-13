"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

export const BackButton: FC = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className="flex items-center gap-[5px] cursor-pointer w-fit"
    >
      <ChevronLeft />
      <p className="text-base font-semibold">Back</p>
    </div>
  );
};
