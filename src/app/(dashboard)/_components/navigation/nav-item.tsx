"use client";

import { useLink } from "@/app/_shared/components/primitives/link";
import { cn } from "@/app/_shared/utils/cn";
import { SFC, WithFallbackProps } from "@/app/_shared/utils/types";
import { ComponentProps, PropsWithChildren } from "react";

export const NavItemGroup: SFC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

export const NavItem: SFC<WithFallbackProps<ComponentProps<"div">>> = ({
  fallback,
  className,
  ...restProps
}) => {
  const { active } = useLink();

  return (
    <div
      className={cn(
        "h-10 rounded-lg w-full",
        {
          skeleton: fallback,
          "grid grid-cols-[1.5rem_1fr] items-center grid-rows-[1.5rem] gap-4 p-2 overflow-hidden":
            !fallback,
          "bg-background-secondary text-label": !fallback && active,
          "hover:bg-background-secondary text-foreground-secondary":
            !fallback && !active,
        },
        className
      )}
      {...restProps}
    />
  );
};

export const NavItemIcon: SFC<WithFallbackProps<ComponentProps<"div">>> = ({
  fallback,
  className,
  ...restProps
}) => {
  return (
    <div
      className={cn(
        "col-start-1",
        { "skeleton h-full w-full": fallback },
        className
      )}
      {...restProps}
    />
  );
};

export const NavItemLabel: SFC<WithFallbackProps<ComponentProps<"div">>> = ({
  fallback,
  className,
  ...restProps
}) => {
  return (
    <div
      className={cn(
        "col-start-2",
        {
          "flex items-center truncate": !fallback,
          "skeleton h-full w-full": fallback,
        },
        className
      )}
      {...restProps}
    />
  );
};
