"use client";

import { FC } from "react";
import { useForm } from "..";
import { Input } from "@/components/primitives/input";

export const CompanyStep: FC = () => {
  const { spaceConfig, testimonial } = useForm();

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
        value={testimonial.company}
        onInput={(e) => testimonial.setCompany(e.currentTarget.value)}
      />
    </div>
  );
};
