import { ComponentProps, FC } from "react";
import { cn } from "@app/_utils/cn";

export const AccountMenuContentTarget: FC<ComponentProps<"div">> = ({
  className,
  ...restProps
}) => {
  return <div className={cn("relative", className)} {...restProps} />;
};
