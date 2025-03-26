"use client";

import { FC } from "react";
import { useForm } from "@app/_components/testimonial-form";
import { Button } from "@app/_components/primitives/button";
import { Check } from "lucide-react";
import { defaultTestimonial } from "@app/_components/testimonial-form/utils/use-testimonial-form-store";

export const FeedbackTypeStep: FC = () => {
  const { formConfig, testimonial, updateTestimonial } = useForm();

  const feedbackType =
    testimonial?.feedbackType || defaultTestimonial.feedbackType;

  return (
    <div>
      <h1 className="font-serif text-heading">
        {formConfig?.steps.feedbackType.heading}
      </h1>
      <p>{formConfig?.steps.feedbackType.description}</p>
      <div className="flex flex-col gap-2 mt-10">
        <Button
          onClick={() => updateTestimonial({ feedbackType: "video" })}
          variant={feedbackType === "video" ? "primary" : "secondary"}
        >
          <div className="size-8 rounded-full bg-background-primary grid place-content-center text-foreground-primary">
            {feedbackType === "video" && <Check />}
          </div>
          <span>{formConfig?.steps.feedbackType.videoOptionLabel}</span>
        </Button>
        <Button
          variant={feedbackType === "text" ? "primary" : "secondary"}
          onClick={() => updateTestimonial({ feedbackType: "text" })}
        >
          <div className="size-8 rounded-full bg-background-primary grid place-content-center text-foreground-primary">
            {feedbackType === "text" && <Check />}
          </div>
          <span>{formConfig?.steps.feedbackType.textOptionLabel}</span>
        </Button>
      </div>
    </div>
  );
};
