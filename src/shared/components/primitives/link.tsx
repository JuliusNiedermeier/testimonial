"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, createContext, FC, useContext } from "react";

interface LinkContext {
  active: boolean;
}

const LinkContext = createContext<LinkContext>({ active: false });

// Intentionally not checking if result of usContext is undefined.
// This will allow components to use it, without knowing, if it is wrapped by a Link component higher up the tree.
export const useLink = () => useContext(LinkContext);

export const Link: FC<ComponentProps<typeof NextLink>> = (props) => {
  const pathname = usePathname();

  return (
    <LinkContext.Provider value={{ active: pathname === props.href }}>
      <NextLink {...props} />
    </LinkContext.Provider>
  );
};
