"use client";

import { FC } from "react";
import { useForm } from "..";
import { Star } from "lucide-react";

export const RatingStep: FC = () => {
  const { spaceConfig } = useForm();

  return (
    <div>
      <h1 className="font-serif text-heading">
        {spaceConfig?.steps.rating.heading}
      </h1>
      <p>{spaceConfig?.steps.rating.description}</p>
      <div className="mt-10 flex gap-4 justify-center mb-10">
        {Array.from(new Array(5)).map((_, index) => (
          <Star key={index} className="size-10" />
        ))}
      </div>
    </div>
  );
};
