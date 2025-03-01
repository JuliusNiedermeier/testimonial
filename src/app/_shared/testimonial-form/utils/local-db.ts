import { Dexie, EntityTable } from "dexie";

export type Rating = 1 | 2 | 3 | 4 | 5;

export type FeedbackType = "video" | "text";

export interface Testimonial {
  spaceId: string;
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
  testimonials: EntityTable<Testimonial, "spaceId">;
  answers: EntityTable<Answer, "id">;
  spaces: EntityTable<Space, "id">;
};

localDb.version(1).stores({
  testimonials: "spaceId",
  // Intentionally not using a compound primary key of [testimonialId+questionId] based on the following arguments:
  // - Compound indexes can only be looked up by the first or both components, not the second alone.
  // - Didn't find a good way of typing compound primary keys bacause EntityTable<T, K extends keyof T>.
  // Why this works and is an acceptable tradeoff:
  // - id can be manually set to "testimonialId:questionId" and used as a pseudo compound primary key.
  // - Becuase ids should never change in general, this duplication is acceptable.
  // This way the combination of testimonialId and questionId can be looked up using id,
  // and both components can also be looked up individually.
  answers: "id, testimonialId, questionId",
  spaces: "id",
});
