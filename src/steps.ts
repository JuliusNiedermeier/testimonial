import { StepConfig } from "./utils/step-builder";

export const steps: StepConfig[] = [
  {
    id: "step-1",
    title: "First step",
    nextStepId: "step-2",
    blocks: [
      {
        id: "id-d662",
        title: "Heading",
        type: "heading",
        config: {
          content: "Thank you so much for sharing your feedback with us!",
        },
      },
      {
        id: "id-d73k",
        title: "Description",
        type: "body",
        config: { content: "This means so much to us." },
      },
      {
        id: "id-773f",
        title: "Name",
        type: "single-line-text-input",
        config: { placeholder: "Your name" },
      },
    ],
  },
  {
    id: "step-2",
    title: "Second step",
    nextStepId: "",
    blocks: [
      {
        id: "id-d662",
        title: "Heading",
        type: "heading",
        config: {
          content: "Complete!",
        },
      },
      {
        id: "id-d73k",
        title: "Description",
        type: "body",
        config: { content: "You reached the last step." },
      },
    ],
  },
];
