"use client";

import { FC } from "react";
import Image from "next/image";
import { useForm } from "..";

export const CoverStep: FC = () => {
  const { spaceConfig } = useForm();

  return (
    <div>
      <div className="flex gap-2">
        <div className="size-12 bg-background-secondary overflow-hidden relative">
          {spaceConfig && (
            <Image
              src={spaceConfig.steps.cover.logoImageUrl}
              alt="Logo"
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="size-12 rounded-full bg-background-secondary overflow-hidden relative">
          {spaceConfig && (
            <Image
              src={spaceConfig.steps.cover.profileImageUrl}
              alt="Logo"
              fill
              className="object-cover"
            />
          )}
        </div>
      </div>
      <h1 className="font-serif text-heading mt-20">
        {spaceConfig?.steps.cover.heading}
      </h1>
      <p className="text-foreground-secondary">
        {spaceConfig?.steps.cover.description}
      </p>
    </div>
  );
};
