"use client";

import { FC } from "react";
import { useForm } from "..";

export const TextFeedbackStep: FC<{ questionId: string }> = ({
  questionId,
}) => {
  const { spaceConfig, testimonial, updateTestimonial, getQuestion } =
    useForm();

  if (!spaceConfig) return null;

  const { question, index } = getQuestion(questionId);
  if (!question) return;

  return (
    <div>
      <span className="text-label text-foreground-secondary">
        {index + 1}/{spaceConfig.questions.length}
      </span>
      <h1 className="text-label mt-4">{question.content}</h1>
      <textarea
        className="w-full h-40 mt-10 p-6"
        placeholder={question.inputPlaceholder}
        autoFocus
        value={testimonial?.answers[questionId]?.text || ""}
        onInput={(e) =>
          updateTestimonial({
            answers: {
              [questionId]: {
                question: question.content,
                questionIndex: index,
                text: e.currentTarget.value,
              },
            },
          })
        }
      />
    </div>
  );
};
