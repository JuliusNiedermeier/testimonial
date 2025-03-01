"use client";

import { FC } from "react";
import { useForm } from "..";
import { Button } from "@/app/_shared/components/primitives/button";
import { Check } from "lucide-react";
import { defaultTestimonial } from "@/app/_shared/testimonial-form/utils/use-space";

export const FeedbackTypeStep: FC = () => {
  const { spaceConfig, testimonial, updateTestimonial } = useForm();

  const feedbackType =
    testimonial?.feedbackType || defaultTestimonial.feedbackType;

  return (
    <div>
      <h1 className="font-serif text-heading">
        {spaceConfig?.steps.feedbackType.heading}
      </h1>
      <p>{spaceConfig?.steps.feedbackType.description}</p>
      <div className="flex flex-col gap-2 mt-10">
        <Button
          onClick={() => updateTestimonial({ feedbackType: "video" })}
          variant={feedbackType === "video" ? "primary" : "secondary"}
        >
          <div className="size-8 rounded-full bg-background-primary grid place-content-center text-foreground-primary">
            {feedbackType === "video" && <Check />}
          </div>
          <span>{spaceConfig?.steps.feedbackType.videoOptionLabel}</span>
        </Button>
        <Button
          variant={feedbackType === "text" ? "primary" : "secondary"}
          onClick={() => updateTestimonial({ feedbackType: "text" })}
        >
          <div className="size-8 rounded-full bg-background-primary grid place-content-center text-foreground-primary">
            {feedbackType === "text" && <Check />}
          </div>
          <span>{spaceConfig?.steps.feedbackType.textOptionLabel}</span>
        </Button>
      </div>
    </div>
  );
};
