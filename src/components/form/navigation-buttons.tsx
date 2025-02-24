"use client";

import { ComponentProps, FC } from "react";
import { cn } from "@/utils/cn";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../primitives/button";
import { useForm } from ".";

export type NavigationButtonsProps = Omit<ComponentProps<"div">, "children">;

export const NavigationButtons: FC<NavigationButtonsProps> = ({
  className,
  ...restProps
}) => {
  const { currentStepIndex, next, previous, steps, spaceConfig } = useForm();

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const currentStepId =
    currentStepIndex === null ? null : steps[currentStepIndex].id;

  const nextButtonLabel =
    currentStepId !== "thankYou" && currentStepId
      ? spaceConfig?.steps[currentStepId].nextButtonlabel
      : "";

  return (
    <div className={cn("flex gap-4", className)} {...restProps}>
      {!isFirstStep && !isLastStep && (
        <Button variant="secondary" onClick={previous}>
          <ChevronLeft />
        </Button>
      )}
      <Button variant="primary" className="flex-1" onClick={next}>
        {isLastStep ? (
          <CheckCircle />
        ) : (
          <>
            <span className="flex-1">{nextButtonLabel}</span>
            <ChevronRight />
          </>
        )}
      </Button>
    </div>
  );
};
