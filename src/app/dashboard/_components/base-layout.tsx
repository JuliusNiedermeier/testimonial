import { FC, PropsWithChildren } from "react";

export const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-[100dvh] overflow-hidden grid grid-cols-[24rem_1fr] divide-x">
      {children}
    </div>
  );
};

export const BaseLayoutSidebar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <nav className="grid grid-rows-[1fr_min-content] grid-cols-1 overflow-hidden divide-y">
      {children}
    </nav>
  );
};
