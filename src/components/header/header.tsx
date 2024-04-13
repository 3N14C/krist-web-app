import { FC } from "react";
import { Logo } from "../ui/logo";
import { NavbarHeader } from "./navbar-header";
import { ToolsHeader } from "./tools-header";

export const Header: FC = () => {
  return (
    <div className="flex items-center justify-between">
      <Logo />

      <NavbarHeader />

      <ToolsHeader />
    </div>
  );
};
