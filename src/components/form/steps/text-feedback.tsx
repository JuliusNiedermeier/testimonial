"use client";

import { FC } from "react";
import { useForm } from "..";

export const TextFeedbackStep: FC<{ questionIndex: number }> = (props) => {
  const { spaceConfig } = useForm();

  return (
    <h1 className="font-serif text-heading">
      {
        spaceConfig?.steps.questionPreview.questions[props.questionIndex]
          .question
      }
    </h1>
  );
};
