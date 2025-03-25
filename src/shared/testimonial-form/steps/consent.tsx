"use client";

import { FC } from "react";
import { useForm } from "@/shared/testimonial-form";
import { Switch } from "@/shared/components/primitives/switch";
import { defaultTestimonial } from "@/shared/testimonial-form/utils/use-testimonial-form-store";

export const ConsentStep: FC = () => {
  const { formConfig, testimonial, updateTestimonial } = useForm();

  return (
    <div>
      <h1 className="font-serif text-heading">
        {formConfig?.steps.consent.heading}
      </h1>
      <p>{formConfig?.steps.consent.description}</p>
      <div className="flex justify-between items-center mt-12">
        <label htmlFor="consent-toggle" className="text-label">
          {formConfig?.steps.consent.inputLabel}
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
