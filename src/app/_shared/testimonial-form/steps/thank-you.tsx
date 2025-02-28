"use client";

import { FC } from "react";
import { useForm } from "@/app/_shared/testimonial-form";

export const ThankYouStep: FC = () => {
  const { spaceConfig } = useForm();

  return (
    <div>
      <h1 className="font-serif text-heading">
        {spaceConfig?.steps.thankYou.heading}
      </h1>
      <p>{spaceConfig?.steps.thankYou.description}</p>
    </div>
  );
};
