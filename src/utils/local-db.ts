import { Dexie, EntityTable } from "dexie";

export type Rating = 1 | 2 | 3 | 4 | 5;

export interface Testimonial {
  id: string;
  name: string;
  avatar: Blob;
  company: string;
  role: string;
  consent: boolean;
  rating: Rating;
}

export type AnswerType = "video" | "text";

export interface Answer {
  id: string;
  testimonialId: string;
  questionIndex: string;
  type: AnswerType;
  text: string;
  video: Blob;
}

export const localDb = new Dexie("db") as Dexie & {
  testimonials: EntityTable<Testimonial, "id">;
  answers: EntityTable<Answer, "id">;
};

localDb.version(0).stores({
  testimonials: "id, name, image, company, role, consent, rating",
  answers: "id, testimonialId, questionIndex, type, video, text",
});
