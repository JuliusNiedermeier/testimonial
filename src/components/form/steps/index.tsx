import { SpaceConfig } from "@/utils/space-config";
import { useTestimonial } from "@/utils/testimonial-store";
import { JSX, useMemo } from "react";
import { VideoFeedbackStep } from "./video-feedback";
import { TextFeedbackStep } from "./text-feedback";
import { CoverStep } from "./cover";
import { NameStep } from "./name";
import { ImageStep } from "./image";
import { CompanyStep } from "./company";
import { RoleStep } from "./role";
import { ConsentStep } from "./consent";
import { FeedbackTypeStep } from "./feedback-type";
import { QuestionPreviewStep } from "./question-preview";
import { RatingStep } from "./rating";
import { ThankYouStep } from "./thank-you";

export interface Step {
  id: keyof SpaceConfig["steps"];
  component: JSX.Element;
}

export const useSteps = (
  testimonial: ReturnType<typeof useTestimonial>["testimonial"],
  spaceConfig: SpaceConfig
) => {
  return useMemo<Step[]>(() => {
    if (!testimonial) return [];

    const questionSteps: Step[] = spaceConfig.questions.map((question) => {
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
  }, [spaceConfig, testimonial]);
};
