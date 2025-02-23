import { cn } from "@/utils/cn";
import { ComponentProps, FC } from "react";

export const Input: FC<ComponentProps<"input">> = ({
  className,
  ...restProps
}) => {
  return (
    <input
      type="text"
      className={cn("bg-background-secondary p-6 text-label", className)}
      {...restProps}
    />
  );
};
