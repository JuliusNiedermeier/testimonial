"use client";

import { FC } from "react";
import { useForm } from "..";

export const ConsentStep: FC = () => {
  const { spaceConfig } = useForm();

  return (
    <div>
      <h1 className="font-serif text-heading">
        {spaceConfig?.steps.consent.heading}
      </h1>
      <p>{spaceConfig?.steps.consent.description}</p>
      <div className="flex justify-between items-center mt-12">
        <label htmlFor="consent-toggle" className="text-label">
          {spaceConfig?.steps.consent.inputLabel}
        </label>
        <div className="rounded-full p-1 bg-foreground-primary">
          <div className="size-8 rounded-full bg-background-secondary ml-8" />
        </div>
      </div>
    </div>
  );
};
