interface BaseStep {
  nextButtonlabel: string;
}

export interface QuestionConfig {
  id: string;
  content: string;
  inputPlaceholder: string;
}

export interface SpaceConfig {
  steps: {
    cover: BaseStep & {
      logoImageUrl: string;
      profileImageUrl: string;
      heading: string;
      description: string;
    };
    name: BaseStep & {
      heading: string;
      description: string;
      inputPlaceholder: string;
    };
    image: BaseStep & {
      heading: string;
      description: string;
      uploadButtonLabel: string;
      removeButtonLabel: string;
    };
    company: BaseStep & {
      heading: string;
      description: string;
      inputPlaceholder: string;
    };
    role: BaseStep & {
      heading: string;
      description: string;
      inputPlaceholder: string;
    };
    consent: BaseStep & {
      heading: string;
      description: string;
      inputLabel: string;
    };
    questionPreview: BaseStep & {
      heading: string;
    };
    feedbackType: BaseStep & {
      heading: string;
      description: string;
      videoOptionLabel: string;
      textOptionLabel: string;
    };
    videoFeedback: BaseStep & {
      recordLabel: string;
      stopLabel: string;
      playLabel: string;
      discardLabel: string;
    };
    textFeedback: BaseStep & {};
    rating: BaseStep & {
      heading: string;
      description: string;
    };
    thankYou: {
      heading: string;
      description: string;
    };
  };
  questions: QuestionConfig[];
}
