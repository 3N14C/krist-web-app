"use client";

import { AuthService } from "@/actions/user/auth/auth-service";
import { useSession } from "@/hooks/use-session";
import { useMutation } from "@tanstack/react-query";
import {
  ListOrdered,
  Loader2,
  LogOut,
  UserCheck,
  UserCog2,
} from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { toast } from "sonner";

export const ProfilePopover: FC = () => {
  const { user } = useSession();

  const { mutateAsync, isPending: isPendingLogout } = useMutation({
    mutationFn: AuthService.signOut,
    onSuccess: () => {
      toast.success("Вы вышли из аккаунта");
      window.location.reload();
    },
  });

  const handleLogout = async () => {
    await mutateAsync();
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

        {user?.role === "ADMIN" && (
          <Link
            href={"/admin-panel"}
            className="flex items-center gap-5"
          >
            <UserCog2 className="" />
            <p>Админ-панель</p>
          </Link>
        )}
        <div
          onClick={handleLogout}
          className="grid grid-cols-3 items-center gap-4 cursor-pointer"
        >
          <LogOut className="text-red-400" />
          {isPendingLogout ? (
            <Loader2 className="animate-spin" />
          ) : (
            <p className="text-red-400">Выйти</p>
          )}
        </div>
      </div>
    </div>
  );
};
