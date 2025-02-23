import { StepConfig } from "./components/step";

export const steps: StepConfig[] = [
  {
    id: "id-dh23",
    title: "First step",
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
];
