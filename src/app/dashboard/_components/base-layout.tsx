"use client";

import {
  ComponentProps,
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { cn } from "../../_utils/cn";
import { Button } from "../../_components/primitives/button";
import { usePathname } from "next/navigation";
import { withSuspense } from "../../_components/with-suspense";

const SIDEBAR_WIDTH_DESKTOP_EXPANDED = "20rem";
const SIDEBAR_WIDTH_DESKTOP_COLLAPSED = "3rem";
const SIDEBAR_WIDTH_MOBILE = "85vw";

interface LayoutContext {
  open: boolean;
  collapsed: boolean;
  setOpen: (open: boolean) => void;
  setCollapsed: (collapsed: boolean) => void;
}

const LayoutContext = createContext<LayoutContext | null>(null);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return context;
};

export const Layout = withSuspense<ComponentProps<"div">>(
  ({ children, className, style, ...restProps }) => {
    const [open, setOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    return (
      <LayoutContext.Provider
        value={{ open, collapsed, setOpen, setCollapsed }}
      >
        <div
          data-sidebar-open={open}
          data-sidebar-collapsed={collapsed}
          className={cn(
            "group/layout h-svh grid divide-x overflow-hidden transition-all", // Base
            "md:data-[sidebar-collapsed=false]:grid-cols-[var(--sidebar-width-desktop-expanded)_1fr]", // Desktop expanded
            "md:data-[sidebar-collapsed=true]:grid-cols-[var(--sidebar-width-desktop-collapsed)_1fr]", // Desktop collapsed
            "not-md:data-[sidebar-open=false]:grid-cols-[0_1fr]", // Mobile closed
            "not-md:data-[sidebar-open=true]:grid-cols-[var(--sidebar-width-mobile)_1fr]", // Mobile open
            className
          )}
          style={{
            "--sidebar-width-desktop-expanded": SIDEBAR_WIDTH_DESKTOP_EXPANDED,
            "--sidebar-width-desktop-collapsed":
              SIDEBAR_WIDTH_DESKTOP_COLLAPSED,
            "--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE,

            ...style,
          }}
          {...restProps}
        >
          <AutoCloseOnNavigation fallback={null} />
          {children}
        </div>
      </LayoutContext.Provider>
    );
  }
);

// Helper component, that closes the mobile sidebar on navigation.
// To access pathname in a client component, it needs to have a suspense boundary above it.
// Moving this logic inside a separate component enables us to access the pathname inside a suspense boundary,
// but render the children of <Layout> beside the suspense boundary instead of inside it,
// allowing nextjs to prerender deeper than <Layout>.
const AutoCloseOnNavigation = withSuspense(() => {
  const { setOpen } = useLayout();
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  return null;
});

export const LayoutSidebar: FC<ComponentProps<"nav">> = ({
  className,
  ...restProps
}) => {
  return (
    <nav
      className={cn("relative overflow-hidden h-full w-full", className)}
      {...restProps}
    />
  );
};

export const LayoutSidebarContent: FC<ComponentProps<"div">> = ({
  className,
  ...restProps
}) => {
  return (
    <nav
      className={cn(
        "h-full",
        "md:w-full", // Desktop
        "not-md:absolute not-md:right-0 not-md:w-[var(--sidebar-width-mobile)]", // Mobile
        className
      )}
      {...restProps}
    />
  );
};

export const LayoutPage: FC<ComponentProps<"main">> = ({
  className,
  ...restProps
}) => {
  return (
    <main
      className={cn(
        "relative overflow-hidden h-full not-md:w-screen md:w-full",
        className
      )}
      {...restProps}
    />
  );
};

export const LayoutPageOverlay: FC<ComponentProps<"div">> = ({
  className,
  ...restProps
}) => {
  const { setOpen } = useLayout();

  return (
    <div
      onClick={() => setOpen(false)}
      className={cn(
        "transition-colors absolute inset-0", // Base
        "md:hidden", // Desktop
        "not-md:group-data-[sidebar-open=true]/layout:bg-black/50", // Mobile open
        "not-md:group-data-[sidebar-open=false]/layout:pointer-events-none",
        className
      )}
      {...restProps}
    />
  );
};

export const LayoutSidebarOpenTrigger: FC<ComponentProps<typeof Button>> = ({
  ...restProps
}) => {
  const { open, setOpen } = useLayout();
  return <Button onClick={() => setOpen(!open)} {...restProps} />;
};

export const LayoutSidebarCollapseTrigger: FC<
  ComponentProps<typeof Button>
> = ({ ...restProps }) => {
  const { collapsed, setCollapsed } = useLayout();
  return <Button onClick={() => setCollapsed(!collapsed)} {...restProps} />;
};
