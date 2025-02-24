"use client";

import { FC } from "react";
import { useForm } from "..";
import { Upload } from "lucide-react";

export const ImageStep: FC = () => {
  const { spaceConfig } = useForm();

  return (
    <div>
      <h1 className="font-serif text-heading">
        {spaceConfig?.steps.image.heading}
      </h1>
      <p>{spaceConfig?.steps.image.description}</p>
      <div className="size-40 rounded-full bg-background-secondary mx-auto my-10 grid place-content-center">
        <Upload />
      </div>
    </div>
  );
};
