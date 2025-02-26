"use client";

import { createContext, FC, PropsWithChildren, useContext } from "react";
import { QuestionConfig, SpaceConfig } from "../../utils/space-config";
import { useTestimonial } from "@/utils/testimonial-store";
import { useSpace } from "@/utils/space-store";
import { useSteps } from "./steps";

type GetQuestionSuccessResult = { question: QuestionConfig; index: number };
type GetQuestionErrorResult = { question: null; index: null };
type GetQuestionResult = GetQuestionSuccessResult | GetQuestionErrorResult;

type FormContext = {
  // General data
  spaceConfig?: SpaceConfig;
  steps: ReturnType<typeof useSteps>;

  // Testimonial store
  testimonial: ReturnType<typeof useTestimonial>["testimonial"];
  updateTestimonial: ReturnType<typeof useTestimonial>["update"];

  // Space store
  space: ReturnType<typeof useSpace>["space"];
  updateSpace: ReturnType<typeof useSpace>["update"];

  // Helpers
  getQuestion: (id: string) => GetQuestionResult;
  navigate: (direction: "forward" | "back") => void;
};

const FormContext = createContext<FormContext>({
  steps: [],
  testimonial: undefined,
  updateTestimonial: async () => false,
  space: undefined,
  updateSpace: () => {},
  getQuestion: () => ({ question: null, index: null }),
  navigate: () => {},
});

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context)
    throw new Error("Hook useForm must be used inside a <Form> component.");
  return context;
};

interface FormProps extends PropsWithChildren {
  spaceId: string;
  spaceConfig: SpaceConfig;
}

export const Form: FC<FormProps> = ({ spaceId, spaceConfig, children }) => {
  const { testimonial, update: updateTestimonial } = useTestimonial(
    spaceId,
    spaceConfig
  );

  const steps = useSteps(testimonial, spaceConfig);

  const { space, update: updateSpace } = useSpace(spaceId, steps.length);

  const navigate = (direction: "forward" | "back") => {
    if (!space) return;
    updateSpace({
      currentStepIndex:
        direction === "forward"
          ? space.currentStepIndex + 1
          : space.currentStepIndex - 1,
    });
  };

  const getQuestion = (id: string): GetQuestionResult => {
    const index = spaceConfig.questions.findIndex(
      (question) => question.id === id
    );

    if (index === undefined || index < 0) {
      return { question: null, index: null };
    }

    return { question: spaceConfig.questions[index], index };
  };

  return (
    <FormContext.Provider
      value={{
        spaceConfig,
        steps,
        testimonial,
        updateTestimonial,
        space,
        updateSpace,
        navigate,
        getQuestion,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
