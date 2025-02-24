"use client";

import { FC } from "react";
import { useForm } from "..";
import { Button } from "@/components/primitives/button";
import { Check } from "lucide-react";

export const FeedbackTypeStep: FC = () => {
  const { spaceConfig, testimonial } = useForm();

  return (
    <div>
      <h1 className="font-serif text-heading">
        {spaceConfig?.steps.feedbackType.heading}
      </h1>
      <p>{spaceConfig?.steps.feedbackType.description}</p>
      <div className="flex flex-col gap-2 mt-10">
        <Button
          onClick={() => testimonial.setFeedbackType("video")}
          variant={
            testimonial.feedback.type === "video" ? "primary" : "secondary"
          }
        >
          <div className="size-8 rounded-full bg-background-primary grid place-content-center text-foreground-primary">
            {testimonial.feedback.type === "video" && <Check />}
          </div>
          <span>{spaceConfig?.steps.feedbackType.videoOptionLabel}</span>
        </Button>
        <Button
          variant={
            testimonial.feedback.type === "text" ? "primary" : "secondary"
          }
          onClick={() => testimonial.setFeedbackType("text")}
        >
          <div className="size-8 rounded-full bg-background-primary grid place-content-center text-foreground-primary">
            {testimonial.feedback.type === "text" && <Check />}
          </div>
          <span>{spaceConfig?.steps.feedbackType.videoOptionLabel}</span>
        </Button>
      </div>
    </div>
  );
};
