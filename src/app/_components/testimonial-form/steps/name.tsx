"use client";

import { FC } from "react";
import { useForm } from "@app/_components/testimonial-form";
import { Input } from "@app/_components/primitives/input";

export const NameStep: FC = () => {
  const { formConfig, testimonial, updateTestimonial } = useForm();

  return (
    <div>
      <h1 className="text-heading font-serif">
        {formConfig?.steps.name.heading}
      </h1>
      <p>{formConfig?.steps.name.description}</p>
      <Input
        className="w-full mt-4"
        placeholder={formConfig?.steps.name.inputPlaceholder}
        autoFocus
        defaultValue={testimonial?.name || ""}
        onInput={(e) => updateTestimonial({ name: e.currentTarget.value })}
      />
    </div>
  );
};
