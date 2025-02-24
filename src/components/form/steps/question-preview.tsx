"use client";

import { FC } from "react";
import { useForm } from "..";

export const QuestionPreviewStep: FC = () => {
  const { spaceConfig } = useForm();

  return (
    <div>
      <h1 className="font-serif text-heading">
        {spaceConfig?.steps.questionPreview.heading}
      </h1>
      <div className="flex flex-col gap-6 mt-10">
        {spaceConfig?.steps.questionPreview.questions.map((question, index) => (
          <div key={index} className="flex gap-6">
            <span className="text-label">{index + 1}</span>
            <p>{question.question}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
