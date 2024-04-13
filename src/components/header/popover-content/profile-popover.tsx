"use client";

import { trpc } from "@/trpc-client/client";
import { ListOrdered, Loader2, LogOut, UserCheck } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { toast } from "sonner";

export const ProfilePopover: FC = () => {
  const { mutateAsync, isLoading: isLoadingLogout } =
    trpc.authUser.logoutUser.useMutation();

  const handleLogout = async () => {
    await mutateAsync(undefined, {
      onSuccess: () => {
        toast.success("Вы вышли из аккаунта");
        window.location.reload();
        window.location.replace("/");
      },
    });
  };

  return (
    <div className="grid gap-4">
      <div className="grid gap-2 dark:text-white">
        <Link
          href={"/profile?profilePage=user"}
          className="grid grid-cols-3 items-center gap-4 cursor-pointer"
        >
          <UserCheck />
          <p>Профиль</p>
        </Link>
        <Link
          href={"/profile?profilePage=orders"}
          className="grid grid-cols-3 items-center gap-4 cursor-pointer"
        >
          <ListOrdered className="" />
          <p>Заказы</p>
        </Link>
        <div
          onClick={handleLogout}
          className="grid grid-cols-3 items-center gap-4 cursor-pointer"
        >
          <LogOut className="text-red-400" />
          {isLoadingLogout ? (
            <Loader2 className="animate-spin" />
          ) : (
            <p className="text-red-400">Выйти</p>
          )}
        </div>
      </div>
    </div>
  );
};
