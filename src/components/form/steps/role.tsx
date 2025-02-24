"use client";

import { FC } from "react";
import { useForm } from "..";
import { Input } from "@/components/primitives/input";

export const RoleStep: FC = () => {
  const { spaceConfig } = useForm();

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
      />
    </div>
  );
};
