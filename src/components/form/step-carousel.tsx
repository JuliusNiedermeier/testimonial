"use client";

import { ComponentProps, FC } from "react";
import { useForm } from ".";
import { cn } from "@/utils/cn";

export type StepCarouselProps = Omit<ComponentProps<"div">, "children">;

export const StepCarousel: FC<StepCarouselProps> = ({
  className,
  ...restProps
}) => {
  const { steps, space } = useForm();
  if (space?.currentStepIndex === undefined) return;

  return (
    <div
      className={cn("flex-1 flex flex-col justify-end", className)}
      {...restProps}
    >
      {typeof space.currentStepIndex === "number" &&
        steps[space.currentStepIndex].component}
    </div>
  );
};
