import { ComponentProps, FC } from "react";
import { useForm } from "./form-provider";
import { Step } from "./step";

export type StepCarouselProps = Omit<ComponentProps<typeof Step>, "config">;

export const StepCarousel: FC<StepCarouselProps> = ({ ...restProps }) => {
  const { currentStepConfig } = useForm();
  return <Step config={currentStepConfig} {...restProps} />;
};
