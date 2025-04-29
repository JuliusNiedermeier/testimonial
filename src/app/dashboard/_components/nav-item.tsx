"use client";

import { useLink } from "@app/_components/primitives/link";
import { cn } from "@app/_utils/cn";
import { SFC, WithFallbackProps } from "@app/_utils/types";
import { ComponentProps } from "react";

export const NavItemGroup: SFC<ComponentProps<"div">> = ({
  className,
  ...restProps
}) => {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...restProps} />
  );
};

export const NavItem: SFC<
  WithFallbackProps<ComponentProps<"div"> & { interactive?: boolean }>
> = ({ fallback, className, interactive, ...restProps }) => {
  const { active } = useLink();

  return (
    <div
      data-active={active}
      className={cn(
        "h-10 rounded-lg w-full font-medium",
        {
          skeleton: fallback,
          "grid grid-cols-[1.5rem_1fr] items-center grid-rows-[1.5rem] gap-4 py-2 px-3 overflow-hidden":
            !fallback,
          "bg-primary text-label text-primary-foreground shadow":
            !fallback && active,
          "text-foreground": !fallback && !active,
          "hover:bg-secondary": !fallback && !active && interactive !== false,
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
        "col-start-1 grid place-content-center",
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
