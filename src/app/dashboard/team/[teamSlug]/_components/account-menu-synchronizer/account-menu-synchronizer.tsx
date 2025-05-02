"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

interface AccountMenuSynchronizerContext {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AccountMenuSynchronizerContext =
  createContext<AccountMenuSynchronizerContext | null>(null);

export const useAccountMenuSynchronizer = () => {
  const context = useContext(AccountMenuSynchronizerContext);
  if (!context) {
    throw new Error(
      "Hook useAccountMenuSynchronizer must be used inside a <AccountMenuSynchronizer>"
    );
  }
  return context;
};

interface AccountMenuSynchronizerProps {
  defaultOpen?: boolean;
}

export const AccountMenuSynchronizer: FC<
  PropsWithChildren<AccountMenuSynchronizerProps>
> = ({ defaultOpen, children }) => {
  const [open, setOpen] = useState<boolean>(
    defaultOpen === undefined ? false : defaultOpen
  );

  return (
    <AccountMenuSynchronizerContext.Provider value={{ open, setOpen }}>
      {children}
    </AccountMenuSynchronizerContext.Provider>
  );
};
