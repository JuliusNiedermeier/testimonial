"use client";

import { FC } from "react";
import { useForm } from "..";

export const TextFeedbackStep: FC<{ questionIndex: number }> = (props) => {
  const { spaceConfig } = useForm();

  return (
    <div>
      <h1 className="font-serif text-heading">
        {
          spaceConfig?.steps.questionPreview.questions[props.questionIndex]
            .question
        }
      </h1>
      <textarea
        className="w-full h-40 mt-10 p-6"
        placeholder={
          spaceConfig?.steps.questionPreview.questions[props.questionIndex]
            .inputPlaceholder
        }
      />
    </div>
  );
};
