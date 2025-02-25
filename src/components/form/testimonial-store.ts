import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Rating = 1 | 2 | 3 | 4 | 5;

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
  rating: Rating;
}

export type TestimonialStore = Testimonial & {
  setName: (name: string) => void;
  setCompany: (company: string) => void;
  setRole: (role: string) => void;
  setConsent: (consent: boolean) => void;
  setFeedbackType: (type: Feedback["type"]) => void;
  setRating: (rating: Rating) => void;
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
      setCompany: (company) => set({ company }),
      setRole: (role) => set({ role }),
      setConsent: (consent) => set({ consent }),
      setFeedbackType: (type) => {
        set({ feedback: { type, answers: get().feedback.answers } });
      },
      setRating: (rating) => set({ rating }),
    }),
    {
      name: "testimonial",
    }
  )
);
