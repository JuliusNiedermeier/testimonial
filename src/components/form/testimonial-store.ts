import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface VideoFeedback {
  type: "video";
  answers: {
    question: string;
    videoUrl: string;
  }[];
}

export interface TextFeedback {
  type: "text";
  answers: {
    question: string;
    content: string;
  }[];
}

export interface Testimonial {
  name: string;
  imageUrl: string;
  company: string;
  role: string;
  consent: boolean;
  feedback: VideoFeedback | TextFeedback;
  rating: number;
}

export type TestimonialStore = Testimonial & {
  setName: (name: string) => void;
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
    }),
    {
      name: "testimonial",
    }
  )
);
