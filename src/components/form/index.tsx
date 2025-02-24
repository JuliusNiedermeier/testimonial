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
import { SpaceConfig } from "./space-config";
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

type FormContext = {
  spaceConfig?: SpaceConfig;
  currentStepIndex: number | null;
  next: () => void;
  previous: () => void;
  steps: Step[];
  testimonial: TestimonialStore;
};

const FormContext = createContext<FormContext>({
  testimonial: { ...defaultTestimonial, setName: () => {} },
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
  spaceConfig: SpaceConfig;
}

interface Step {
  id: keyof SpaceConfig["steps"];
  component: JSX.Element;
}

export const Form: FC<FormProps> = ({ spaceConfig, children }) => {
  const testimonial = useTestimonial();
  const formState = useFormState();

  const initialized = useRef(false);

  const steps = useMemo<Step[]>(() => {
    const questionSteps: Step[] =
      spaceConfig.steps.questionPreview.questions.map((question, index) =>
        testimonial.feedback.type === "video"
          ? {
              id: "videoFeedback",
              component: <VideoFeedbackStep questionIndex={index} />,
            }
          : {
              id: "textFeedback",
              component: <TextFeedbackStep questionIndex={index} />,
            }
      );

    const steps: Step[] = [
      {
        id: "cover",
        component: <CoverStep {...spaceConfig.steps.cover} />,
      },
      { id: "name", component: <NameStep {...spaceConfig.steps.name} /> },
      { id: "image", component: <ImageStep {...spaceConfig.steps.image} /> },
      {
        id: "company",
        component: <CompanyStep />,
      },
      { id: "role", component: <RoleStep {...spaceConfig.steps.role} /> },
      {
        id: "consent",
        component: <ConsentStep {...spaceConfig.steps.consent} />,
      },
      {
        id: "feedbackType",
        component: <FeedbackTypeStep {...spaceConfig.steps.feedbackType} />,
      },
      {
        id: "questionPreview",
        component: (
          <QuestionPreviewStep {...spaceConfig.steps.questionPreview} />
        ),
      },
      ...questionSteps,
      { id: "rating", component: <RatingStep {...spaceConfig.steps.rating} /> },
      {
        id: "thankYou",
        component: <ThankYouStep {...spaceConfig.steps.thankYou} />,
      },
    ];
    return steps;
  }, [spaceConfig, testimonial.feedback.type]);

  useEffect(() => {
    if (initialized.current || !formState.storeHydrated) return;

    if (
      formState.currentStepIndex === null ||
      formState.currentStepIndex === undefined
    ) {
      console.log(formState);
      return formState.setCurrentStepIndex(0);
    } else if (formState.currentStepIndex === steps.length - 1) {
      formState.setCurrentStepIndex(0);
    }

    initialized.current = true;
  }, [formState, steps]);

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

  return (
    <FormContext.Provider
      value={{
        testimonial,
        currentStepIndex: formState.currentStepIndex,
        next,
        previous,
        steps,
        spaceConfig,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
