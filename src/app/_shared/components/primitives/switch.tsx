"use client";

import { ComponentProps, FC } from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/app/_shared/utils/cn";

export type SwitchProps = ComponentProps<typeof SwitchPrimitives.Root>;

export const Switch: FC<SwitchProps> = ({ className, ref, ...props }) => (
  <SwitchPrimitives.Root
    className={cn(
      "rounded-full p-1 data-[state=checked]:bg-foreground-primary data-[state=unchecked]:bg-background-secondary transition-colors",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "block size-8 rounded-full data-[state=checked]:ml-8 data-[state=unchecked]:mr-8 data-[state=checked]:bg-background-secondary data-[state=unchecked]:bg-foreground-secondary transition-[margin,background-color]"
      )}
    />
  </SwitchPrimitives.Root>
);
Switch.displayName = SwitchPrimitives.Root.displayName;
