"use client";

import { FC } from "react";
import { Logo } from "../ui/logo";
import { NavbarHeader } from "./navbar-header";
import { ToolsHeader } from "./tools-header";
import { useResponsive } from "@/hooks/useResponsive";

export const Header: FC = () => {
  const { isMobile } = useResponsive();

  if (isMobile) {
    return (
      <div className="">
        <Logo className="text-md" />
        <div className=""></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <Logo />

      <NavbarHeader />

      <ToolsHeader />
    </div>
  );
};
