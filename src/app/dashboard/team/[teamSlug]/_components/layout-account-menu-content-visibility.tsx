"use client";

import { FC, PropsWithChildren } from "react";
import { useLayout } from "../../../_components/layout";
import { useIsMobile } from "root/src/app/_utils/use-is-mobile";

export const LayoutAccountMenuContentVisibility: FC<
  PropsWithChildren<{ context: "sidebar" | "topbar" }>
> = ({ children, context }) => {
  const { open: sidebarOpen } = useLayout();
  const isMobile = useIsMobile();

  if (isMobile === undefined) return null;

  if (isMobile && context === "topbar") return sidebarOpen ? null : children;
  if (isMobile && context === "sidebar") return sidebarOpen ? children : null;

  return context === "topbar" ? null : children;
};
