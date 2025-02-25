"use client";

import { FC } from "react";
import { useForm } from "..";
import { Input } from "@/components/primitives/input";

export const NameStep: FC = () => {
  const { spaceConfig, testimonial } = useForm();

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
        value={testimonial.name}
        onInput={(e) => testimonial.setName(e.currentTarget.value)}
      />
    </div>
  );
};
