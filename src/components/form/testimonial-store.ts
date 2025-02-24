import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Feedback {
  type: "video" | "text";
  answers: {
    question: string;
    videoUrl?: string;
    text?: string;
  }[];
}

export interface Testimonial {
  name: string;
  imageUrl: string;
  company: string;
  role: string;
  consent: boolean;
  feedback: Feedback;
  rating: number;
}

export type TestimonialStore = Testimonial & {
  setName: (name: string) => void;
  setFeedbackType: (type: Feedback["type"]) => void;
};

export const defaultTestimonial: Testimonial = {
  name: "",
  imageUrl: "",
  company: "",
  role: "",
  consent: true,
  feedback: { type: "video", answers: [] },
  rating: 5,
};

export const useTestimonial = create<TestimonialStore>()(
  persist(
    (set, get) => ({
      ...defaultTestimonial,
      setName: (name) => set({ name }),
      setFeedbackType: (type) => {
        set({ feedback: { type, answers: get().feedback.answers } });
      },
    }),
    {
      name: "testimonial",
    }
  )
);
