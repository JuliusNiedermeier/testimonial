"use client";

import { useLink } from "@/app/_shared/components/primitives/link";
import { cn } from "@/app/_shared/utils/cn";
import { ComponentProps, FC, PropsWithChildren } from "react";

export const NavItemGroup: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

export const NavItem: FC<ComponentProps<"div">> = ({
  children,
  className,
  ...restProps
}) => {
  const { active } = useLink();

  return (
    <div
      className={cn(
        "grid grid-cols-[1.5rem_1fr] items-center grid-rows-[1.5rem] gap-4 rounded-lg p-2",
        {
          "bg-background-secondary text-label": active,
          "hover:bg-background-secondary text-foreground-secondary": !active,
        },
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
};

export const NavItemIcon: FC<PropsWithChildren> = ({ children }) => {
  return <div className="col-start-1">{children}</div>;
};

export const NavItemLabel: FC<ComponentProps<"div">> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <div
      className={cn("col-start-2 flex items-center", className)}
      {...restProps}
    >
      {children}
    </div>
  );
};
