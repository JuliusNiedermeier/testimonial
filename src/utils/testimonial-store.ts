import { useLiveQuery } from "dexie-react-hooks";
import { Answer, createAnswerId, localDb, Testimonial } from "./local-db";
import { useEffect } from "react";
import { SpaceConfig } from "./space-config";

export type TestimonialUpdate = Partial<Omit<Testimonial, "id">>;

export type AnswerUpdate = Partial<
  Omit<Answer, "id" | "testimonialId" | "questionId">
>;

export type DenormalizedAnswer = Omit<
  Answer,
  "id" | "testimonialId" | "questionId"
>;

export interface DenormalizedTestimonial extends Testimonial {
  answers: Record<string, DenormalizedAnswer>;
}

export interface DenormalizedTestimonialUpdate extends TestimonialUpdate {
  answers?: Record<string, AnswerUpdate>;
}

export const defaultTestimonialValues: Omit<Testimonial, "spaceId"> = {
  consent: true,
  feedbackType: "video",
  rating: 5,
};

export const useTestimonial = (spaceId: string, spaceConfig: SpaceConfig) => {
  const testimonial = useLiveQuery(async () => {
    const [testimonial, answers] = await Promise.all([
      localDb.testimonials.get(spaceId),
      localDb.answers.where("testimonialId").equals(spaceId).toArray(),
    ]);

    if (!testimonial) return null;

    const answerMap = answers.reduce(
      (answerMap, { id, testimonialId, questionId, ...answer }) => {
        return answerMap.set(questionId, answer);
      },
      new Map<string, DenormalizedAnswer>()
    );

    return { ...testimonial, answers: Object.fromEntries(answerMap.entries()) };
  });

  // Create empty default testimonial and answers if no testimonial with that spaceId exists on client.
  // This eliminates the need to check for existence first on every update for the testimonial or its answers.
  useEffect(() => {
    if (testimonial === null) {
      localDb.testimonials.add({
        spaceId,
        ...defaultTestimonialValues,
      });
    }

    if (testimonial === undefined || testimonial === null) return;

    const questionIds = new Set(
      spaceConfig.questions.map((question) => question.id)
    );

    const newQuestionIds = questionIds.difference(
      new Set(Object.keys(testimonial.answers))
    );

    if (!newQuestionIds.size) return;

    localDb.answers.bulkAdd(
      spaceConfig.questions
        .filter((question) => newQuestionIds.has(question.id))
        .map((question, index) => ({
          id: createAnswerId(spaceId, question.id),
          testimonialId: spaceId,
          questionId: question.id,
          questionIndex: index,
          type: defaultTestimonialValues.feedbackType,
          question: question.content,
        }))
    );
  }, [testimonial]);

  useEffect(() => {
    if (!testimonial) return;

    // Sync the order of existing answers with the order of questions in the spaceConfig
    Object.keys(testimonial.answers).forEach((questionId) => {
      const questionConfigIndex = spaceConfig.questions.findIndex(
        (question) => question.id === questionId
      );

      if (questionConfigIndex < 0) {
        // If no matching question to an answer is present in the spaceConfig anymore,
        // leave the current index, just mark the answer as lost.
        return update({
          answers: { [questionId]: { lostReference: true } },
        });
      }

      // If a matching question to an answer is present in the spaceConfig,
      // update it with the current question and questionIndex,
      update({
        answers: {
          [questionId]: {
            lostReference: false,
            questionIndex: questionConfigIndex,
            question: spaceConfig.questions[questionConfigIndex].content,
          },
        },
      });
    });
  }, [spaceConfig, testimonial]);

  const update = async (update: DenormalizedTestimonialUpdate) => {
    const { answers, ...normalizedUpdate } = update;

    try {
      await localDb.transaction(
        "readwrite",
        [localDb.testimonials, localDb.answers],
        async () => {
          await Promise.all([
            // Update the testimonial
            localDb.testimonials.update(spaceId, normalizedUpdate),
            // Update the answers, if any answer updates are present
            localDb.answers.bulkUpdate(
              Object.keys(answers || {}).map((questionId) => ({
                key: createAnswerId(spaceId, questionId),
                changes: answers![questionId],
              }))
            ),
          ]);
        }
      );
      return true;
    } catch (error) {
      return false;
    }
  };

  return { testimonial, update };
};
