"use client";

import { cn } from "@app/_utils/cn";
import { ComponentProps, FC } from "react";
import { useForm } from "@app/_components/testimonial-form";

export type ProgressBarProps = Omit<ComponentProps<"div">, "children">;

export const ProgressBar: FC<ProgressBarProps> = ({
  className,
  ...restProps
}) => {
  const { steps, form } = useForm();

  const currentStepIndex = form?.currentStepIndex;

  return (
    <div className={cn("flex gap-2", className)} {...restProps}>
      {steps?.map((step, index) => (
        <div
          key={index}
          className={cn("h-1 flex-1", {
            "bg-primary":
              currentStepIndex !== undefined && index <= currentStepIndex,
            "bg-secondary":
              currentStepIndex === undefined || index > currentStepIndex,
          })}
        />
      ))}
    </div>
  );
};
