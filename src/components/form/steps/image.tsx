"use client";

import { ComponentProps, FC, useState } from "react";
import { useForm } from "..";
import { Upload } from "lucide-react";
import Image from "next/image";

export const ImageStep: FC = () => {
  const { spaceConfig } = useForm();

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange: ComponentProps<"input">["onChange"] = (e) => {
    const file = e.currentTarget.files?.item(0);
    if (!file) return;
    setImageUrl(URL.createObjectURL(file));
  };

  return (
    <div>
      <h1 className="font-serif text-heading">
        {spaceConfig?.steps.image.heading}
      </h1>
      <p>{spaceConfig?.steps.image.description}</p>
      <label
        htmlFor="image-input"
        className="relative size-40 rounded-full bg-background-secondary mx-auto my-10 grid place-content-center overflow-hidden"
      >
        {imageUrl && (
          <Image src={imageUrl} fill className="object-cover" alt="Avatar" />
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
