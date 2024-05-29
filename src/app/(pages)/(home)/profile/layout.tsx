"use client";

import { CustomTitle } from "@/components/ui/custom-title";
import { parseAsString, useQueryState } from "nuqs";

interface IProps {
  children: React.ReactNode;

  // Parallel Routes
  user: React.ReactNode;
  orders: React.ReactNode;
  wishlist: React.ReactNode;
  addresses: React.ReactNode;
  cards: React.ReactNode;
  notifications: React.ReactNode;
  settings: React.ReactNode;
}

const Layout = ({
  children,
  user,
  orders,
  wishlist,
  addresses,
  cards,
  notifications,
  settings,
}: IProps) => {
  const [profilePage] = useQueryState("profilePage", parseAsString);

  return (
    <div className="max-w-[1600px] mx-auto lg:mt-[100px]">
      <CustomTitle title="Профиль" />

      <div className="flex lg:flex-row flex-col items-start lg:my-14 my-5 gap-16">
        {children}

        <div className="">
          {profilePage === "user" && user}
          {profilePage === "orders" && orders}
          {profilePage === "wishlist" && wishlist}
          {profilePage === "addresses" && addresses}
          {profilePage === "cards" && cards}
          {/* {profilePage === "notifications" && notifications} */}
          {profilePage === "settings" && settings}
        </div>
      </div>
    </div>
  );
};

export default Layout;
