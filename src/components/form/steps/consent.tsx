"use client";

import { FC } from "react";
import { useForm } from "..";
import { Switch } from "@/components/primitives/switch";
import { defaultTestimonialValues } from "@/utils/testimonial-store";

export const ConsentStep: FC = () => {
  const { spaceConfig, testimonial, updateTestimonial } = useForm();

  return (
    <div>
      <h1 className="font-serif text-heading">
        {spaceConfig?.steps.consent.heading}
      </h1>
      <p>{spaceConfig?.steps.consent.description}</p>
      <div className="flex justify-between items-center mt-12">
        <label htmlFor="consent-toggle" className="text-label">
          {spaceConfig?.steps.consent.inputLabel}
        </label>
        <Switch
          id="consent-toggle"
          checked={testimonial?.consent ?? defaultTestimonialValues.consent}
          onCheckedChange={(consent) => updateTestimonial({ consent })}
        />
      </div>
    </div>
  );
};
