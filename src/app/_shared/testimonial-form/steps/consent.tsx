"use client";

import { FC } from "react";
import { useForm } from "@/app/_shared/testimonial-form";
import { Switch } from "@/app/_shared/components/primitives/switch";
import { defaultTestimonial } from "@/app/_shared/testimonial-form/utils/use-space";

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
          checked={testimonial?.consent ?? defaultTestimonial.consent}
          onCheckedChange={(consent) => updateTestimonial({ consent })}
        />
      </div>
    </div>
  );
};
