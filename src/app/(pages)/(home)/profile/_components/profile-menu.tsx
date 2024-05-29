"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "@/hooks/use-session";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  Heart,
  MapPin,
  Package,
  Settings,
  UserRound
} from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { FC } from "react";

const navMenu = [
  {
    id: "user",
    icon: <UserRound />,
    title: "Информация об аккаунте",
  },

  {
    id: "orders",
    icon: <Package />,
    title: "Мои заказы",
  },

  {
    id: "wishlist",
    icon: <Heart />,
    title: "Избранное",
  },

  {
    id: "addresses",
    icon: <MapPin />,
    title: "Управление адресами",
  },

  {
    id: "cards",
    icon: <CreditCard />,
    title: "Управление оплатой",
  },

  // {
  //   id: "notifications",
  //   icon: <Bell />,
  //   title: "Уведомления",
  // },

  {
    id: "settings",
    icon: <Settings />,
    title: "Настройки",
  },
];

export const ProfileMenu: FC = () => {
  const { user, isLoading } = useSession();

  const [profilePage, setProfilePage] = useQueryState(
    "profilePage",
    parseAsString
  );

  return (
    <div className="">
      <div className="border py-2 w-[300px] px-5 flex items-center gap-5 ">
        <Avatar className="h-20 w-20 bg-slate-400">
          <AvatarImage src={user?.avatar || ""} alt={user?.username} />
          <AvatarFallback>{user?.username}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <p className="text-lg">Hello 👋</p>
          <p className="text-xl font-bold">{user?.username}</p>
        </div>
      </div>

      <div className="border pt-5 lg:block hidden">
        {navMenu.map((item) => (
          <div
            onClick={() => setProfilePage(item.id)}
            key={item.id}
            className={cn(
              "text-black dark:text-white py-5 px-5 cursor-pointer transition duration-500 ",
              {
                "bg-[#1b1b1b] text-white dark:text-black transition duration-500 animate-slide-right bg-gradient-to-r from-black from-50% to-white dark:from-white dark to-50% bg-left-bottom bg-[length:200%_100%]":
                  profilePage === item.id,
              }
            )}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <p className="text-lg">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:hidden block">
        <Accordion type="multiple">
          <AccordionItem value="profile-user">
            <AccordionTrigger>Навигация</AccordionTrigger>
            <AccordionContent>
              {navMenu.map((item) => (
                <div
                  onClick={() => setProfilePage(item.id)}
                  key={item.id}
                  className={cn(
                    "text-black dark:text-white py-5 px-5 cursor-pointer transition duration-500 ",
                    {
                      "bg-[#1b1b1b] text-white dark:text-black transition duration-500 animate-slide-right bg-gradient-to-r from-black from-50% to-white dark:from-white dark to-50% bg-left-bottom bg-[length:200%_100%]":
                        profilePage === item.id,
                    }
                  )}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <p className="lg:text-lg">{item.title}</p>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
