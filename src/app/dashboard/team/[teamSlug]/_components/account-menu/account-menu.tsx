import { ComponentProps, FC } from "react";
import { Dialog } from "@radix-ui/react-dialog";

export const AccountMenu: FC<ComponentProps<typeof Dialog>> = ({
  ...restProps
}) => {
  return <Dialog {...restProps} />;
};
