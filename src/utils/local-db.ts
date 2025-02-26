import { Dexie, EntityTable } from "dexie";

export type Rating = 1 | 2 | 3 | 4 | 5;

export type FeedbackType = "video" | "text";

export interface Testimonial {
  id: string;
  name?: string;
  avatar?: Blob;
  company?: string;
  role?: string;
  consent: boolean;
  feedbackType: FeedbackType;
  rating: Rating;
}

export interface Answer {
  id: string; // Composite key of testimonialId and questionId separated by a ":"
  testimonialId: string;
  questionId: string;
  lostReference?: boolean;
  questionIndex: number;
  question: string;
  type: FeedbackType;
  text?: string;
  video?: Blob;
}

export interface Space {
  id: string;
  currentStepIndex: number;
}

export const createAnswerId = (testimonialId: string, questionId: string) => {
  return `${testimonialId}:${questionId}`;
};

export const localDb = new Dexie("db") as Dexie & {
  testimonials: EntityTable<Testimonial, "id">;
  answers: EntityTable<Answer, "id">;
  spaces: EntityTable<Space, "id">;
};

localDb.version(1).stores({
  testimonials: "id",
  answers: "id, testimonialId, questionId",
  spaces: "id",
});
