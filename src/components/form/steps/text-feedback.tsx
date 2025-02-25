"use client";

import { FC } from "react";
import { useForm } from "..";

export const TextFeedbackStep: FC<{ questionIndex: number }> = ({
  questionIndex,
}) => {
  const { spaceConfig, testimonial } = useForm();

  return (
    <div>
      <span className="text-label text-foreground-secondary">
        {questionIndex + 1}/
        {spaceConfig?.steps.questionPreview.questions.length}
      </span>
      <h1 className="text-label mt-4">
        {spaceConfig?.steps.questionPreview.questions[questionIndex].question}
      </h1>
      <textarea
        className="w-full h-40 mt-10 p-6"
        placeholder={
          spaceConfig?.steps.questionPreview.questions[questionIndex]
            .inputPlaceholder
        }
        autoFocus
        value={testimonial.feedback.answers[questionIndex]?.text}
        onInput={(e) =>
          testimonial.setTextFeedback(questionIndex, e.currentTarget.value)
        }
      />
    </div>
  );
};
