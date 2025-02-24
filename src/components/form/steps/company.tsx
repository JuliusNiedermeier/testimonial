"use client";

import { FC } from "react";
import { useForm } from "..";

export const CompanyStep: FC = () => {
  const { spaceConfig } = useForm();

  return (
    <h1 className="font-serif text-heading">
      {spaceConfig?.steps.company.heading}
    </h1>
  );
};
