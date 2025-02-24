"use client";

import { ComponentProps, FC } from "react";
import { useForm } from ".";
import { cn } from "@/utils/cn";

export type StepCarouselProps = Omit<ComponentProps<"div">, "children">;

export const StepCarousel: FC<StepCarouselProps> = ({
  className,
  ...restProps
}) => {
  const { steps, currentStepIndex } = useForm();
  return (
    <div
      className={cn("flex-1 flex flex-col justify-end", className)}
      {...restProps}
    >
      {currentStepIndex !== null && steps[currentStepIndex]?.component}
    </div>
  );
};
