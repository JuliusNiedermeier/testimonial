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
  FormConfig,
} from "@/app/_shared/testimonial-form/utils/form-config";
import { useTestimonialFormStore } from "@/app/_shared/testimonial-form/utils/use-testimonial-form-store";
import { useSteps } from "@/app/_shared/testimonial-form/steps";

type GetQuestionSuccessResult = { question: QuestionConfig; index: number };
type GetQuestionErrorResult = { question: null; index: null };
type GetQuestionResult = GetQuestionSuccessResult | GetQuestionErrorResult;

type UseTestimonialFormStoreResult = ReturnType<typeof useTestimonialFormStore>;

type FormContext = {
  // General data
  formConfig?: FormConfig;
  steps: ReturnType<typeof useSteps>;

  // Form
  form: UseTestimonialFormStoreResult["form"];
  testimonial: UseTestimonialFormStoreResult["testimonial"];
  updateForm: UseTestimonialFormStoreResult["updateForm"];
  updateTestimonial: UseTestimonialFormStoreResult["updateTestimonial"];

  // Helpers
  getQuestion: (id: string) => GetQuestionResult;
  navigate: (direction: "forward" | "back") => void;
};

const FormContext = createContext<FormContext>({
  steps: [],
  form: null,
  testimonial: null,
  updateForm: () => {},
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
  formId: string;
  formConfig: FormConfig;
}

export const Form: FC<FormProps> = ({ formId, formConfig, children }) => {
  const { form, testimonial, updateForm, updateTestimonial } =
    useTestimonialFormStore({ formId, formConfig });

  const steps = useSteps(testimonial, formConfig);

  const initializedCurrentStepIndex = useRef(false);

  const navigate = useCallback(
    (direction: "forward" | "back") => {
      if (!form || !steps) return;
      const change = direction === "forward" ? 1 : -1;
      const updatedStepIndex = form.currentStepIndex + change;
      if (updatedStepIndex < 0 || updatedStepIndex > steps.length - 1) return;
      updateForm({ currentStepIndex: updatedStepIndex });
    },
    [form, updateForm, steps]
  );

  const getQuestion = (id: string): GetQuestionResult => {
    const index = formConfig.questions.findIndex(
      (question) => question.id === id
    );

    if (index === undefined || index < 0) {
      return { question: null, index: null };
    }

    return { question: formConfig.questions[index], index };
  };

  useEffect(() => {
    if (initializedCurrentStepIndex.current || !form || !steps) return;

    if (form.currentStepIndex >= steps.length - 1) {
      updateForm({ currentStepIndex: 0 });
    }

    initializedCurrentStepIndex.current = true;
  }, [form, steps, updateForm]);

  return (
    <FormContext.Provider
      value={{
        formConfig,
        steps,
        form,
        testimonial,
        updateForm,
        updateTestimonial,
        navigate,
        getQuestion,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
