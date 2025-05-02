import { ComponentProps, FC } from "react";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "root/src/app/_utils/cn";
import { DialogOverlay } from "@app/_components/primitives/dialog";
import {
  NavItem,
  NavItemGroup,
  NavItemIcon,
  NavItemLabel,
} from "root/src/app/dashboard/_components/nav-item";
import {
  ChevronsLeftRightEllipsisIcon,
  LogOutIcon,
  MoonIcon,
  UserIcon,
} from "lucide-react";

export const AccountMenuContent: FC<
  Omit<ComponentProps<typeof DialogContent>, "children">
> = ({ className, ...restProps }) => {
  return (
    <>
      <DialogOverlay />
      <DialogContent
        className={cn(
          "absolute z-50 rounded-xl p-2 top-0 left-0 right-0 bg-card flex flex-col gap-2",
          className
        )}
        {...restProps}
      >
        <DialogTitle className="sr-only">Team & Account</DialogTitle>
        <NavItemGroup>
          <NavItem>
            <NavItemIcon>
              <ChevronsLeftRightEllipsisIcon size={20} />
            </NavItemIcon>
            <NavItemLabel>Team switcher</NavItemLabel>
          </NavItem>
        </NavItemGroup>
        <div className="border-t" />
        <NavItemGroup>
          <NavItem>
            <NavItemIcon>
              <MoonIcon size={20} />
            </NavItemIcon>
            <NavItemLabel>Theme</NavItemLabel>
          </NavItem>
          <NavItem>
            <NavItemIcon>
              <UserIcon size={20} />
            </NavItemIcon>
            <NavItemLabel>Account settings</NavItemLabel>
          </NavItem>
          <NavItem>
            <NavItemIcon>
              <LogOutIcon size={20} />
            </NavItemIcon>
            <NavItemLabel>Log out</NavItemLabel>
          </NavItem>
        </NavItemGroup>
      </DialogContent>
    </>
  );
};
