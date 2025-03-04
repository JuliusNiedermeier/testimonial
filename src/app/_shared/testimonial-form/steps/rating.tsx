"use client";

import { FC } from "react";
import { useForm } from "..";
import { Star } from "@/app/_shared/components/primitives/star";
import { Rating } from "@/app/_shared/testimonial-form/utils/testimonial-draft-db";
import { defaultTestimonial } from "@/app/_shared/testimonial-form/utils/use-testimonial-form-store";

export const RatingStep: FC = () => {
  const { formConfig, testimonial, updateTestimonial } = useForm();

  return (
    <div>
      <h1 className="font-serif text-heading">
        {formConfig?.steps.rating.heading}
      </h1>
      <p>{formConfig?.steps.rating.description}</p>
      <div className="mt-10 flex gap-4 justify-center mb-10">
        {Array.from(new Array(5), (_, i) => (i + 1) as Rating).map((rating) => (
          <Star
            key={rating}
            className="size-10"
            variant={
              (testimonial?.rating || defaultTestimonial.rating) >= rating
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
