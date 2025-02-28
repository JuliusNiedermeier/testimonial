"use client";

import { FC } from "react";
import { useForm } from "@/app/_shared/testimonial-form";
import { Input } from "@/app/_shared/components/primitives/input";

export const NameStep: FC = () => {
  const { spaceConfig, testimonial, updateTestimonial } = useForm();

  return (
    <div>
      <h1 className="text-heading font-serif">
        {spaceConfig?.steps.name.heading}
      </h1>
      <p>{spaceConfig?.steps.name.description}</p>
      <Input
        className="w-full mt-4"
        placeholder={spaceConfig?.steps.name.inputPlaceholder}
        autoFocus
        defaultValue={testimonial?.name || ""}
        onInput={(e) => updateTestimonial({ name: e.currentTarget.value })}
      />
    </div>
  );
};
