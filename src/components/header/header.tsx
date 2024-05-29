import Image from "next/image";
import { FC } from "react";
import { Logo } from "../ui/logo";
import { NavbarHeader } from "./navbar-header";
import { ToolsHeader } from "./tools-header";
import { MobileMenu } from "./mobile/mobile-menu";

export const Header: FC = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between max-[845px]:hidden">
        <Logo />

        <NavbarHeader />

        <ToolsHeader />
      </div>

      <div className="lg:hidden flex items-center justify-between">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={1000}
          height={1000}
          className="w-24 h-24"
        />

        <MobileMenu />
      </div>
    </div>
  );
};
