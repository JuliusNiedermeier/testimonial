"use client";

import { FC } from "react";
import { useForm } from "..";

export const VideoFeedbackStep: FC<{ questionId: string }> = ({
  questionId,
}) => {
  const { spaceConfig, getQuestion } = useForm();

  if (!spaceConfig) return null;
  
  const { question, index } = getQuestion(questionId);
  if (!question) return;

  return (
    <div>
      <span className="text-label text-foreground-secondary">
        {index + 1}/{spaceConfig.questions.length}
      </span>
      <h1 className="text-label mt-4">{question.content}</h1>
      <div className="aspect-square rounded-md bg-foreground-secondary mt-10 grid place-content-center">
        <div className="size-20 bg-background-primary rounded-full grid place-content-center" />
      </div>
    </div>
  );
};
