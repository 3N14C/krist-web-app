"use client";

import { useSession } from "@/hooks/use-session";
import { useNotificationsStore } from "@/store/notifications-store";
import { FC } from "react";
import { NotificationCardComponent } from "./notification-card";

export const NotificationList: FC = () => {
  const { notifications } = useNotificationsStore();
  const { user, isLoading } = useSession();

  return (
    <div className="w-[1250px]">
      {/* <NotificationCard userId={user?.id || ""} notifications={notifications} /> */}
      {user && (
        <NotificationCardComponent userId={user?.id} notifications={notifications} />
      )}
    </div>
  );
};
