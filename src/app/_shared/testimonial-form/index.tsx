"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import {
  QuestionConfig,
  SpaceConfig,
} from "@/app/_shared/testimonial-form/utils/space-config";
import { useSpace } from "@/app/_shared/testimonial-form/utils/use-space";
import { useSteps } from "@/app/_shared/testimonial-form/steps";

type GetQuestionSuccessResult = { question: QuestionConfig; index: number };
type GetQuestionErrorResult = { question: null; index: null };
type GetQuestionResult = GetQuestionSuccessResult | GetQuestionErrorResult;

type FormContext = {
  // General data
  spaceConfig?: SpaceConfig;
  steps: ReturnType<typeof useSteps>;

  // Space
  space: ReturnType<typeof useSpace>["space"];
  testimonial: ReturnType<typeof useSpace>["testimonial"];
  updateSpace: ReturnType<typeof useSpace>["updateSpace"];
  updateTestimonial: ReturnType<typeof useSpace>["updateTestimonial"];

  // Helpers
  getQuestion: (id: string) => GetQuestionResult;
  navigate: (direction: "forward" | "back") => void;
};

const FormContext = createContext<FormContext>({
  steps: [],
  space: null,
  testimonial: null,
  updateSpace: () => {},
  updateTestimonial: async () => {},
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
  const { space, testimonial, updateSpace, updateTestimonial } = useSpace({
    spaceId,
    spaceConfig,
  });

  const steps = useSteps(testimonial, spaceConfig);

  const initializedCurrentStepIndex = useRef(false);

  const navigate = useCallback(
    (direction: "forward" | "back") => {
      if (!space || !steps) return;
      const change = direction === "forward" ? 1 : -1;
      const updatedStepIndex = space.currentStepIndex + change;
      if (updatedStepIndex < 0 || updatedStepIndex > steps.length - 1) return;
      updateSpace({ currentStepIndex: updatedStepIndex });
    },
    [space, updateSpace, steps]
  );

  const getQuestion = (id: string): GetQuestionResult => {
    const index = spaceConfig.questions.findIndex(
      (question) => question.id === id
    );

    if (index === undefined || index < 0) {
      return { question: null, index: null };
    }

    return { question: spaceConfig.questions[index], index };
  };

  useEffect(() => {
    if (initializedCurrentStepIndex.current || !space || !steps) return;

    if (space.currentStepIndex >= steps.length - 1) {
      updateSpace({ currentStepIndex: 0 });
    }

    initializedCurrentStepIndex.current = true;
  }, [space, steps, updateSpace]);

  return (
    <FormContext.Provider
      value={{
        spaceConfig,
        steps,
        space,
        testimonial,
        updateSpace,
        updateTestimonial,
        navigate,
        getQuestion,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
