"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { FC } from "react";

export const MobileMenu: FC = () => {
  return (
    <div className="">
      <Sheet>
        <SheetTrigger>
          <Menu size={32} />
        </SheetTrigger>
        <SheetContent>
          <div className="">content</div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
