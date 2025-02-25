import { SpaceConfig } from "./utils/space-config";

export const space: SpaceConfig = {
  steps: {
    cover: {
      logoImageUrl: "/logo.svg",
      profileImageUrl: "/profile-image.png",
      heading: "Thank you so much for sharing your feedback with us!",
      description:
        "We greatly appreciate your effort. This helps us immensely to continue givng people like you the great service they deserve.",
      nextButtonlabel: "Let's begin",
    },
    name: {
      heading: "Please begin by telling us your name.",
      description: "This makes your feedback more authentic.",
      inputPlaceholder: "Your name",
      nextButtonlabel: "Next",
    },
    image: {
      heading: "Please upload your favorite profile picture.",
      description:
        "Seeing the face behind the feedback makes it more trustworthy.",
      uploadButtonLabel: "Select",
      removeButtonLabel: "Remove",
      nextButtonlabel: "Next",
    },
    company: {
      heading: "What company are you working for?",
      description: "Lorem ipsum.",
      inputPlaceholder: "Company name",
      nextButtonlabel: "Next",
    },
    role: {
      heading: "What role do you have at this company?",
      description: "Lorem ipsum.",
      inputPlaceholder: "Your role",
      nextButtonlabel: "Next",
    },
    consent: {
      heading: "Is it okay, if we share your feedback publicly?",
      description:
        "Your name, image, company, role and feedback will be visible.",
      inputLabel: "Allow sharing",
      nextButtonlabel: "Next",
    },
    questionPreview: {
      heading: "We have prepared the following questions for you.",
      nextButtonlabel: "Next",
    },
    feedbackType: {
      heading: "Would you like to answer these questions in a short video?",
      description: "Lorem ipsum.",
      videoOptionLabel: "With a short video",
      textOptionLabel: "With text",
      nextButtonlabel: "Next",
    },
    videoFeedback: {
      recordLabel: "Record",
      stopLabel: "Stop",
      playLabel: "Watch",
      rerecordLabel: "Record again",
      nextButtonlabel: "Next",
    },
    textFeedback: {
      nextButtonlabel: "Next",
    },
    rating: {
      heading: "And finally... What star rating would you give us?",
      description: "Lorem ipsum.",
      nextButtonlabel: "Submit",
    },
    thankYou: {
      heading:
        "Thank you so much, for taking the time to share your feedback with us!",
      description: "Lorem ipsum.",
    },
  },
  questions: [
    {
      id: "question-1",
      content: "How has our service helped you get more Leads?",
      inputPlaceholder: "Your answer",
    },
    {
      id: "question-2",
      content: "Would you reccommend us to others in the industry?",
      inputPlaceholder: "Your answer",
    },
  ],
};
