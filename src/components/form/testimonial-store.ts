import { Rating } from "@/utils/local-db";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Answer {
  question: string; // Redundantly saved here in case the question is deleted from the spaceConfig in teh future
  questionIndex: number; // Redundantly saved here, so answers are displayed in the original order, even if questions are reordered in the future
  lostReference?: boolean;
  videoUrl?: string;
  text?: string;
}

export interface Feedback {
  type: "video" | "text";
  answers: Record<string, Answer>;
}

export interface Testimonial {
  name: string;
  imageUrl: string;
  company: string;
  role: string;
  consent: boolean;
  feedback: Feedback;
  rating: Rating;
}

export type TestimonialStore = Testimonial & {
  setName: (name: string) => void;
  setCompany: (company: string) => void;
  setRole: (role: string) => void;
  setConsent: (consent: boolean) => void;
  setFeedbackType: (type: Feedback["type"]) => void;
  setTextFeedback: (questionId: string, answer: Answer) => void;
  setRating: (rating: Rating) => void;
};

export const defaultTestimonial: Testimonial = {
  name: "",
  imageUrl: "",
  company: "",
  role: "",
  consent: true,
  feedback: { type: "video", answers: {} },
  rating: 5,
};

export const useTestimonial = create<TestimonialStore>()(
  persist(
    (set, get) => ({
      ...defaultTestimonial,
      setName: (name) => set({ name }),
      setCompany: (company) => set({ company }),
      setRole: (role) => set({ role }),
      setConsent: (consent) => set({ consent }),
      setFeedbackType: (type) => {
        set({ feedback: { type, answers: get().feedback.answers } });
      },
      setTextFeedback: (questionId, answer) => {
        const feedback = get().feedback;
        set({
          feedback: {
            type: feedback.type,
            answers: {
              ...feedback.answers,
              [questionId]: { ...feedback.answers[questionId], ...answer },
            },
          },
        });
      },
      setRating: (rating) => set({ rating }),
    }),
    {
      name: "testimonial",
    }
  )
);
