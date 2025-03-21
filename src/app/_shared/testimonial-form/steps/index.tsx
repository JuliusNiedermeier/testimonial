import { JSX, useMemo } from "react";
import { FormConfig } from "@/app/_shared/testimonial-form/utils/form-config";
import { useTestimonialFormStore } from "@/app/_shared/testimonial-form/utils/use-testimonial-form-store";

// Step components
import { VideoFeedbackStep } from "@/app/_shared/testimonial-form/steps/video-feedback";
import { TextFeedbackStep } from "@/app/_shared/testimonial-form/steps/text-feedback";
import { CoverStep } from "@/app/_shared/testimonial-form/steps/cover";
import { NameStep } from "@/app/_shared/testimonial-form/steps/name";
import { ImageStep } from "@/app/_shared/testimonial-form/steps/image";
import { CompanyStep } from "@/app/_shared/testimonial-form/steps/company";
import { RoleStep } from "@/app/_shared/testimonial-form/steps/role";
import { ConsentStep } from "@/app/_shared/testimonial-form/steps/consent";
import { FeedbackTypeStep } from "@/app/_shared/testimonial-form/steps/feedback-type";
import { QuestionPreviewStep } from "@/app/_shared/testimonial-form/steps/question-preview";
import { RatingStep } from "@/app/_shared/testimonial-form/steps/rating";
import { ThankYouStep } from "@/app/_shared/testimonial-form/steps/thank-you";

export interface Step {
  id: keyof FormConfig["steps"];
  component: JSX.Element;
}

export const useSteps = (
  testimonial: ReturnType<typeof useTestimonialFormStore>["testimonial"],
  formConfig: FormConfig
) => {
  return useMemo<Step[] | null>(() => {
    if (!testimonial) return null;

    const questionSteps: Step[] = formConfig.questions.map((question) => {
      const Component =
        testimonial.feedbackType === "video"
          ? VideoFeedbackStep
          : TextFeedbackStep;

      return {
        id:
          testimonial.feedbackType === "video"
            ? "videoFeedback"
            : "textFeedback",
        component: <Component key={question.id} questionId={question.id} />,
      };
    });

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
        id: "questionPreview",
        component: <QuestionPreviewStep />,
      },
      {
        id: "feedbackType",
        component: <FeedbackTypeStep />,
      },
      ...questionSteps,
      { id: "rating", component: <RatingStep /> },
      {
        id: "consent",
        component: <ConsentStep />,
      },
      {
        id: "thankYou",
        component: <ThankYouStep />,
      },
    ];

    return steps;
  }, [formConfig, testimonial]);
};
