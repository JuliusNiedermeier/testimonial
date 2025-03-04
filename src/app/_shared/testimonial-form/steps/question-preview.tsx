"use client";

import { FC } from "react";
import { useForm } from "@/app/_shared/testimonial-form";

export const QuestionPreviewStep: FC = () => {
  const { formConfig } = useForm();

  return (
    <div>
      <h1 className="font-serif text-heading">
        {formConfig?.steps.questionPreview.heading}
      </h1>
      <div className="flex flex-col gap-6 mt-10">
        {formConfig?.questions.map((question, index) => (
          <div key={question.id} className="flex gap-6">
            <span className="text-label">{index + 1}</span>
            <p>{question.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
