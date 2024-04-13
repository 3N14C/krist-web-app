"use client";

import { FC } from "react";
import { NotificationCard } from "./notification-card";
import { useNotificationsStore } from "@/store/notifications-store";
import { trpc } from "@/trpc-client/client";

export const NotificationList: FC = () => {
  const { notifications } = useNotificationsStore();
  const { data: user, isLoading: isLoadingUser } =
    trpc.authUser.getUserSession.useQuery();

  return (
    <div className="w-[1250px]">
      <NotificationCard userId={user?.id || ""} notifications={notifications} />
    </div>
  );
};
