"use client";

import {
  createContext,
  FC,
  JSX,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { QuestionConfig, SpaceConfig } from "../../utils/space-config";
import { CoverStep } from "./steps/cover";
import { NameStep } from "./steps/name";
import { ImageStep } from "./steps/image";
import { CompanyStep } from "./steps/company";
import { RoleStep } from "./steps/role";
import { ConsentStep } from "./steps/consent";
import { FeedbackTypeStep } from "./steps/feedback-type";
import { QuestionPreviewStep } from "./steps/question-preview";
import { VideoFeedbackStep } from "./steps/video-feedback";
import { TextFeedbackStep } from "./steps/text-feedback";
import { RatingStep } from "./steps/rating";
import { ThankYouStep } from "./steps/thank-you";
import {
  defaultTestimonial,
  TestimonialStore,
  useTestimonial,
} from "./testimonial-store";
import { useFormState } from "./form-store";
import { clamp } from "motion";

type GetQuestionSuccessResult = { question: QuestionConfig; index: number };
type GetQuestionErrorResult = { question: null; index: null };
type GetQuestionResult = GetQuestionSuccessResult | GetQuestionErrorResult;

type FormContext = {
  spaceConfig?: SpaceConfig;
  currentStepIndex: number | null;
  getQuestion: (id: string) => GetQuestionResult;
  next: () => void;
  previous: () => void;
  steps: Step[];
  testimonial: TestimonialStore;
};

const FormContext = createContext<FormContext>({
  testimonial: {
    ...defaultTestimonial,
    setName: () => {},
    setCompany: () => {},
    setRole: () => {},
    setConsent: () => {},
    setFeedbackType: () => {},
    setTextFeedback: () => {},
    setRating: () => {},
  },
  getQuestion: () => ({ question: null, index: null }),
  currentStepIndex: null,
  next: () => {},
  previous: () => {},
  steps: [],
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

interface Step {
  id: keyof SpaceConfig["steps"];
  component: JSX.Element;
}

export const Form: FC<FormProps> = ({ spaceId, spaceConfig, children }) => {
  const testimonial = useTestimonial();
  const formState = useFormState();

  const initialized = useRef(false);

  const steps = useMemo<Step[]>(() => {
    const questionSteps: Step[] = spaceConfig.questions.map((question) =>
      testimonial.feedback.type === "video"
        ? {
            id: "videoFeedback",
            component: (
              <VideoFeedbackStep key={question.id} questionId={question.id} />
            ),
          }
        : {
            id: "textFeedback",
            component: (
              <TextFeedbackStep key={question.id} questionId={question.id} />
            ),
          }
    );

    const steps: Step[] = [
      {
        id: "cover",
        component: <CoverStep />,
      },
      { id: "name", component: <NameStep /> },
      { id: "image", component: <ImageStep /> },
      {
        id: "company",
        component: <CompanyStep />,
      },
      { id: "role", component: <RoleStep /> },
      {
        id: "consent",
        component: <ConsentStep />,
      },
      {
        id: "feedbackType",
        component: <FeedbackTypeStep />,
      },
      {
        id: "questionPreview",
        component: <QuestionPreviewStep />,
      },
      ...questionSteps,
      { id: "rating", component: <RatingStep /> },
      {
        id: "thankYou",
        component: <ThankYouStep />,
      },
    ];
    return steps;
  }, [spaceConfig, testimonial.feedback.type]);

  useEffect(() => {
    // Return early, if the form is already initialized or the formState has not been hydrated yet.
    if (initialized.current || !formState.storeHydrated) return;

    if (
      formState.currentStepIndex === null ||
      formState.currentStepIndex === undefined ||
      formState.currentStepIndex === steps.length - 1
    ) {
      // Jump to first step, if the locally saved currentStep is not set or is the last step, when the form is mounted
      return formState.setCurrentStepIndex(0);
    }

    // Sync the order of existing answers with the order of questions in the spaceConfig
    Object.keys(testimonial.feedback.answers).forEach((questionId, index) => {
      const questionConfigIndex = spaceConfig.questions.findIndex(
        (question) => question.id === questionId
      );

      const answer = testimonial.feedback.answers[questionId];

      if (questionConfigIndex < 0) {
        // If no matching question to an answer is present in the spaceConfig anymore,
        // leave the current index, just mark the answer as lost.
        return testimonial.setTextFeedback(questionId, {
          ...answer,
          lostReference: true,
        });
      }

      // If a matching question to an answer is present in the spaceConfig,
      // update it with the current question and questionIndex,
      testimonial.setTextFeedback(questionId, {
        ...answer,
        lostReference: false,
        questionIndex: questionConfigIndex,
        question: spaceConfig.questions[questionConfigIndex].content,
      });
    });

    initialized.current = true;
  }, [formState, steps, testimonial, spaceConfig]);

  const next = () => {
    if (formState.currentStepIndex === null) return;
    formState.setCurrentStepIndex(
      clamp(0, steps.length - 1, formState.currentStepIndex + 1)
    );
  };

  const previous = () => {
    if (formState.currentStepIndex === null) return;
    formState.setCurrentStepIndex(
      clamp(0, steps.length - 1, formState.currentStepIndex - 1)
    );
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
        testimonial,
        currentStepIndex: formState.currentStepIndex,
        next,
        previous,
        getQuestion,
        steps,
        spaceConfig,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
