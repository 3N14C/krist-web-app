"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC } from "react";
import { icons } from "lucide-react";

interface IProps {
  notifications: INotification[];
  userId: string;
}

export const NotificationCard: FC<IProps> = ({ notifications, userId }) => {
  return (
    <div className="flex flex-col gap-10">
      {notifications
        ?.filter((notification) => notification.userId === userId)
        ?.map((notification) => {
          const Icon = icons[notification.icon as keyof typeof icons];

          return (
            <div
              key={notification.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-5">
                {notification.avatar ? (
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={notification.avatar} />
                    <AvatarFallback>user</AvatarFallback>
                  </Avatar>
                ) : (
                  <Icon name={notification.icon} className="h-10 w-10" />
                )}

                <div className="flex flex-col gap-2">
                  <p className="font-bold text-xl">{notification.title}</p>

                  <p className="text-lg text-[#a5a2ab]">
                    {notification.message}
                  </p>
                </div>
              </div>

              <p className="text-[#a5a2ab] text-lg">
                {new Date(notification.date).toLocaleString()}
              </p>
            </div>
          );
        })}
    </div>
  );
};
