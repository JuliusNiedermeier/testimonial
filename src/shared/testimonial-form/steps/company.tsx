"use client";

import { FC } from "react";
import { useForm } from "@/shared/testimonial-form";
import { Input } from "@/shared/components/primitives/input";

export const CompanyStep: FC = () => {
  const { formConfig, testimonial, updateTestimonial } = useForm();

  return (
    <div>
      <h1 className="text-heading font-serif">
        {formConfig?.steps.company.heading}
      </h1>
      <p>{formConfig?.steps.company.description}</p>
      <Input
        className="w-full mt-4"
        placeholder={formConfig?.steps.company.inputPlaceholder}
        autoFocus
        defaultValue={testimonial?.company || ""}
        onInput={(e) => updateTestimonial({ company: e.currentTarget.value })}
      />
    </div>
  );
};
