"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { MobileMenuContent } from "./mobile-menu-conent";
import { usePathname } from "next/navigation";

export const MobileMenu: FC = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Menu size={32} />
        </SheetTrigger>
        <SheetContent>
          <div className="mt-5 h-full">
            <MobileMenuContent />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
