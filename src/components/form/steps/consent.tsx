"use client";

import { FC } from "react";
import { useForm } from "..";
import { Switch } from "@/components/primitives/switch";

export const ConsentStep: FC = () => {
  const { spaceConfig, testimonial } = useForm();

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
          checked={testimonial.consent}
          onCheckedChange={testimonial.setConsent}
        />
      </div>
    </div>
  );
};
