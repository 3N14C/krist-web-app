import { FC } from "react";
import { Logo } from "../ui/logo";
import { MobileMenu } from "./mobile/mobile-menu";
import { NavbarHeader } from "./navbar-header";
import { ToolsHeader } from "./tools-header";

export const Header: FC = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between max-[845px]:hidden">
        <Logo />

        <NavbarHeader />

        <ToolsHeader />
      </div>

      <div className="lg:hidden flex items-center justify-between">
        <Logo />

        <MobileMenu />
      </div>
    </div>
  );
};
