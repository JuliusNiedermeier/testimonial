"use client";

import { ComponentProps, FC } from "react";
import { cn } from "@/app/_shared/utils/cn";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/app/_shared/components/primitives/button";
import { useForm } from "@/app/_shared/testimonial-form";

export type NavigationButtonsProps = Omit<ComponentProps<"div">, "children">;

export const NavigationButtons: FC<NavigationButtonsProps> = ({
  className,
  ...restProps
}) => {
  const { steps, spaceConfig, space, navigate } = useForm();

  const currentStepIndex = space?.currentStepIndex;

  if (currentStepIndex === undefined || !steps) return null;

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const currentStepId =
    currentStepIndex === null ? null : steps[currentStepIndex]?.id;

  const nextButtonLabel =
    currentStepId !== "thankYou" && currentStepId
      ? spaceConfig?.steps[currentStepId].nextButtonlabel
      : "";

  return (
    <div className={cn("flex gap-4", className)} {...restProps}>
      {!isFirstStep && !isLastStep && (
        <Button variant="secondary" onClick={() => navigate("back")}>
          <ChevronLeft />
        </Button>
      )}
      <Button
        variant="primary"
        className="flex-1"
        onClick={() => navigate("forward")}
      >
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
