"use client";

import { FC } from "react";
import { useForm } from "..";
import { Star } from "@/components/primitives/star";
import { Rating } from "@/utils/local-db";
import { defaultTestimonialValues } from "@/utils/testimonial-store";

export const RatingStep: FC = () => {
  const { spaceConfig, testimonial, updateTestimonial } = useForm();

  return (
    <div>
      <h1 className="font-serif text-heading">
        {spaceConfig?.steps.rating.heading}
      </h1>
      <p>{spaceConfig?.steps.rating.description}</p>
      <div className="mt-10 flex gap-4 justify-center mb-10">
        {Array.from(new Array(5), (_, i) => (i + 1) as Rating).map((rating) => (
          <Star
            key={rating}
            className="size-10"
            variant={
              (testimonial?.rating || defaultTestimonialValues.rating) >= rating
                ? "filled"
                : "outline"
            }
            onClick={() => updateTestimonial({ rating })}
          />
        ))}
      </div>
    </div>
  );
};
