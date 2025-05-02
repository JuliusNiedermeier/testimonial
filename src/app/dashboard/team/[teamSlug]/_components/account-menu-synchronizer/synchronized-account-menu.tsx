"use client";

import { ComponentProps, FC } from "react";
import { AccountMenu } from "../account-menu/account-menu";
import { useAccountMenuSynchronizer } from ".";

type SynchronizedAccountMenuProps = Omit<
  ComponentProps<typeof AccountMenu>,
  "open" | "defaultOpen" | "onOpenChange"
>;

export const SynchronizedAccountMenu: FC<SynchronizedAccountMenuProps> = (
  props
) => {
  const { open, setOpen } = useAccountMenuSynchronizer();
  return <AccountMenu open={open} onOpenChange={setOpen} {...props} />;
};
