"use client";

import { FC } from "react";
import { useForm } from "@/app/_shared/testimonial-form";
import { Input } from "@/app/_shared/components/primitives/input";

export const RoleStep: FC = () => {
  const { spaceConfig, testimonial, updateTestimonial } = useForm();

  return (
    <div>
      <h1 className="text-heading font-serif">
        {spaceConfig?.steps.role.heading}
      </h1>
      <p>{spaceConfig?.steps.role.description}</p>
      <Input
        className="w-full mt-4"
        placeholder={spaceConfig?.steps.role.inputPlaceholder}
        autoFocus
        defaultValue={testimonial?.role || ""}
        onInput={(e) => updateTestimonial({ role: e.currentTarget.value })}
      />
    </div>
  );
};
