"use client";

import { FC } from "react";
import { useForm } from "@app/_components/testimonial-form";
import { Button } from "@app/_components/primitives/button";
import { Check } from "lucide-react";
import { defaultTestimonial } from "@app/_components/testimonial-form/utils/use-testimonial-form-store";
import { cn } from "root/src/app/_utils/cn";

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
        {(["video", "text"] as const).map((type) => (
          <Button
            key={type}
            className="justify-start"
            size="lg"
            onClick={() => updateTestimonial({ feedbackType: type })}
            variant={feedbackType === type ? "default" : "secondary"}
          >
            <div
              className={cn(
                "size-6 rounded-full grid place-content-center transition-colors",
                {
                  "bg-primary-foreground/10": feedbackType === type,
                  "bg-primary/10": feedbackType !== type,
                }
              )}
            >
              <Check
                className={cn({
                  invisible: feedbackType !== type,
                })}
              />
            </div>
            <span>
              {type === "video"
                ? formConfig?.steps.feedbackType.videoOptionLabel
                : formConfig?.steps.feedbackType.textOptionLabel}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};
