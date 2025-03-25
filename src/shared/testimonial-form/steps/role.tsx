"use client";

import { FC } from "react";
import { useForm } from "@/shared/testimonial-form";
import { Input } from "@/shared/components/primitives/input";

export const RoleStep: FC = () => {
  const { formConfig, testimonial, updateTestimonial } = useForm();

  return (
    <div>
      <h1 className="text-heading font-serif">
        {formConfig?.steps.role.heading}
      </h1>
      <p>{formConfig?.steps.role.description}</p>
      <Input
        className="w-full mt-4"
        placeholder={formConfig?.steps.role.inputPlaceholder}
        autoFocus
        defaultValue={testimonial?.role || ""}
        onInput={(e) => updateTestimonial({ role: e.currentTarget.value })}
      />
    </div>
  );
};
