"use client";

import { useSession } from "@/hooks/use-session";
import { PopoverContent } from "@radix-ui/react-popover";
import { Heart, Loader2, Search, ShoppingCart, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger } from "../ui/popover";
import { CartPopover } from "./popover-content/cart-popover/cart-popover";
import { ProfilePopover } from "./popover-content/profile-popover";

interface IProps {}

export const ToolsHeader: FC<IProps> = () => {
  const { user, isLoading } = useSession();
  const router = useRouter();

  return (
    <div className="flex items-center gap-[20px]">
      <Search />
      <Heart
        className="cursor-pointer"
        onClick={() => router.push("/profile?profilePage=wishlist")}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button size={"icon"} variant={"outline"}>
            <ShoppingCart />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="min-w-80 z-20 relative bg-white dark:bg-[#1b1b1b] shadow-lg rounded-lg pt-3">
          <CartPopover />
        </PopoverContent>
      </Popover>

      {user?.id ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button size={"icon"} variant={"outline"}>
              <User2 />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 z-20 relative bg-white dark:bg-[#1b1b1b] shadow-lg rounded-lg p-10">
            <ProfilePopover />
          </PopoverContent>
        </Popover>
      ) : isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Button onClick={() => router.push("/auth/login")} size={"lg"}>
          Вход
        </Button>
      )}
    </div>
  );
};
