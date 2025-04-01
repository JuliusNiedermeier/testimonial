"use client";

import { ComponentProps, FC, useMemo } from "react";
import { useForm } from "@app/_components/testimonial-form";
import { Upload } from "lucide-react";
import Image from "next/image";

export const ImageStep: FC = () => {
  const { formConfig, testimonial, updateTestimonial } = useForm();

  const avatarUrl = useMemo(() => {
    if (!testimonial?.avatar) return null;
    return URL.createObjectURL(testimonial.avatar);
  }, [testimonial?.avatar]);

  const handleFileChange: ComponentProps<"input">["onChange"] = (e) => {
    const file = e.currentTarget.files?.item(0);
    if (!file) return;
    updateTestimonial({ avatar: file });
  };

  return (
    <div>
      <h1 className="font-serif text-heading">
        {formConfig?.steps.image.heading}
      </h1>
      <p>{formConfig?.steps.image.description}</p>
      <label
        htmlFor="image-input"
        className="relative size-40 rounded-full bg-secondary mx-auto my-10 grid place-content-center overflow-hidden"
      >
        {avatarUrl && (
          <Image src={avatarUrl} fill className="object-cover" alt="Avatar" />
        )}
        <Upload />
      </label>
      <input
        id="image-input"
        type="file"
        hidden
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};
