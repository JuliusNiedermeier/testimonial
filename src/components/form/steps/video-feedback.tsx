"use client";

import { FC } from "react";
import { useForm } from "..";

export const VideoFeedbackStep: FC<{ questionIndex: number }> = (props) => {
  const { spaceConfig } = useForm();

  return (
    <div>
      <span className="text-label text-foreground-secondary">
        {props.questionIndex + 1}/
        {spaceConfig?.steps.questionPreview.questions.length}
      </span>
      <h1 className="text-label mt-4">
        {
          spaceConfig?.steps.questionPreview.questions[props.questionIndex]
            .question
        }
      </h1>
      <div className="aspect-square rounded-md bg-foreground-secondary mt-10 grid place-content-center">
        <div className="size-20 bg-background-primary rounded-full grid place-content-center" />
      </div>
    </div>
  );
};
