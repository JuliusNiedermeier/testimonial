"use client";

import { FC } from "react";
import { useForm } from "@app/_components/testimonial-form";

export const ThankYouStep: FC = () => {
  const { formConfig } = useForm();

  return (
    <div>
      <h1 className="font-serif text-heading">
        {formConfig?.steps.thankYou.heading}
      </h1>
      <p>{formConfig?.steps.thankYou.description}</p>
    </div>
  );
};
