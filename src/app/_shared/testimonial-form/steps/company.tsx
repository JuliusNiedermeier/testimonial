"use client";

import { FC } from "react";
import { useForm } from "@/app/_shared/testimonial-form";
import { Input } from "@/app/_shared/components/primitives/input";

export const CompanyStep: FC = () => {
  const { spaceConfig, testimonial, updateTestimonial } = useForm();

  return (
    <div>
      <h1 className="text-heading font-serif">
        {spaceConfig?.steps.company.heading}
      </h1>
      <p>{spaceConfig?.steps.company.description}</p>
      <Input
        className="w-full mt-4"
        placeholder={spaceConfig?.steps.company.inputPlaceholder}
        autoFocus
        defaultValue={testimonial?.company || ""}
        onInput={(e) => updateTestimonial({ company: e.currentTarget.value })}
      />
    </div>
  );
};
