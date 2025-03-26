"use client";

import { ComponentProps, FC, useCallback, useMemo } from "react";
import { useForm } from "@app/_components/testimonial-form";

export const TextFeedbackStep: FC<{ questionId: string }> = ({
  questionId,
}) => {
  const { formConfig, testimonial, updateTestimonial, getQuestion } = useForm();

  const { question, index } = useMemo(
    () => getQuestion(questionId),
    [questionId, getQuestion]
  );

  const handleInput = useCallback<
    NonNullable<ComponentProps<"textarea">["onInput"]>
  >(
    (e) => {
      if (!question) return;
      updateTestimonial({
        answers: new Map([[questionId, { text: e.currentTarget.value }]]),
      });
    },
    [questionId, question, updateTestimonial]
  );

  if (!formConfig || !question) return null;

  return (
    <div>
      <span className="text-label text-foreground-secondary">
        {index + 1}/{formConfig.questions.length}
      </span>
      <h1 className="text-label mt-4">{question.content}</h1>
      <textarea
        className="w-full h-40 mt-10 p-6"
        placeholder={question.inputPlaceholder}
        autoFocus
        defaultValue={testimonial?.answers.get(questionId)?.text || ""}
        onInput={handleInput}
      />
    </div>
  );
};
