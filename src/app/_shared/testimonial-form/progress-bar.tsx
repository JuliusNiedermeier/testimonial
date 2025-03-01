"use client";

import { cn } from "@/app/_shared/utils/cn";
import { ComponentProps, FC } from "react";
import { useForm } from "@/app/_shared/testimonial-form";

export type ProgressBarProps = Omit<ComponentProps<"div">, "children">;

export const ProgressBar: FC<ProgressBarProps> = ({
  className,
  ...restProps
}) => {
  const { steps, space } = useForm();

  const currentStepIndex = space?.currentStepIndex;

  return (
    <div className={cn("flex gap-2", className)} {...restProps}>
      {steps?.map((step, index) => (
        <div
          key={index}
          className={cn("h-1 flex-1", {
            "bg-foreground-primary":
              currentStepIndex !== undefined && index <= currentStepIndex,
            "bg-foreground-secondary":
              currentStepIndex === undefined || index > currentStepIndex,
          })}
        />
      ))}
    </div>
  );
};
