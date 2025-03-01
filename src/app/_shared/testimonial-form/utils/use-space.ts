import { useCallback, useEffect, useMemo, useRef } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { SpaceConfig } from "@/app/_shared/testimonial-form/utils/space-config";
import {
  Space,
  Testimonial,
  Answer,
  localDb,
  createAnswerId,
} from "@/app/_shared/testimonial-form/utils/local-db";

export type SpaceUpdate = Partial<Omit<Space, "id">>;

export type TestimonialUpdate = Partial<Omit<Testimonial, "id">>;

export type AnswerUpdate = Partial<
  Omit<Answer, "id" | "testimonialId" | "questionId">
>;

export type DenormalizedAnswer = Omit<
  Answer,
  "id" | "testimonialId" | "questionId"
>;

export interface DenormalizedTestimonial extends Testimonial {
  answers: Map<string, DenormalizedAnswer>;
}

export interface DenormalizedTestimonialUpdate extends TestimonialUpdate {
  answers?: Map<string, AnswerUpdate>;
}

export const defaultTestimonial: Omit<Testimonial, "spaceId"> = {
  consent: true,
  feedbackType: "video",
  rating: 5,
};

export const defaultSpace: Omit<Space, "id"> = {
  currentStepIndex: 0,
};

export interface UseSpaceConfig {
  spaceId: string;
  spaceConfig: SpaceConfig;
}

export const useSpace = ({ spaceId, spaceConfig }: UseSpaceConfig) => {
  const spaceRecord = useLiveQuery(async () => {
    const space = await localDb.spaces.get(spaceId);
    if (!space)
      return { space: { id: spaceId, ...defaultSpace }, hasRecord: false };
    return { space: space, hasRecord: true };
  });

  const testimonialRecord = useLiveQuery(async () => {
    const [testimonial, answers] = await Promise.all([
      localDb.testimonials.get(spaceId),
      localDb.answers.where("testimonialId").equals(spaceId).toArray(),
    ]);

    const answerMap = answers.reduce(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (answerMap, { id, testimonialId, questionId, ...answer }) => {
        return answerMap.set(questionId, answer);
      },
      new Map<string, DenormalizedAnswer>()
    );

    if (!testimonial) {
      return {
        testimonial: {
          spaceId,
          ...defaultTestimonial,
          answers: answerMap,
        },
        hasRecord: false,
      };
    }

    return {
      testimonial: { ...testimonial, answers: answerMap },
      hasRecord: true,
    };
  }, [spaceId]);

  const { space, hasRecord: hasSpaceRecord } = useMemo(() => {
    if (!spaceRecord) return { space: null, hasRecord: null };
    return spaceRecord;
  }, [spaceRecord]);

  const { testimonial, hasRecord: hasTestimonialRecord } = useMemo(() => {
    if (!testimonialRecord) return { testimonial: null, hasRecord: null };
    return testimonialRecord;
  }, [testimonialRecord]);

  const updateSpace = useCallback(
    (update: SpaceUpdate) => {
      if (space === null) {
        throw new Error("Tried updating space before it was loaded.");
      }

      if (hasSpaceRecord) localDb.spaces.update(spaceId, update);
      else localDb.spaces.add({ ...space, ...update });
    },
    [spaceId, space, hasSpaceRecord]
  );

  const updateTestimonial = useCallback(
    async (update: DenormalizedTestimonialUpdate) => {
      if (testimonial === null) {
        throw new Error("Tried updating testimonial before it was loaded.");
      }

      const { answers: answerUpdates, ...normalizedUpdate } = update;

      localDb.transaction(
        "readwrite",
        [localDb.testimonials, localDb.answers],
        async () => {
          const operations = [];

          if (hasTestimonialRecord) {
            // Update testimonial
            operations.push(
              localDb.testimonials.update(spaceId, normalizedUpdate)
            );
          } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { answers, ...normalizedTestimonial } = testimonial;

            // Create testimonial
            operations.push(
              localDb.testimonials.add({
                ...normalizedTestimonial,
                ...normalizedUpdate,
              })
            );
          }

          interface BulkOperationConfig {
            updates: { key: string; changes: AnswerUpdate }[];
            creates: Answer[];
          }

          const emptyBulkUpdateMap: BulkOperationConfig = {
            updates: [],
            creates: [],
          };

          const bulkOperationConfig =
            answerUpdates
              ?.entries()
              .reduce((result, [questionId, answerUpdate]) => {
                const existingAnswer = testimonial.answers.get(questionId);

                const answerId = createAnswerId(
                  testimonial.spaceId,
                  questionId
                );

                if (existingAnswer) {
                  result.updates.push({ key: answerId, changes: answerUpdate });
                } else {
                  const questionIndexInConfig = spaceConfig.questions.findIndex(
                    ({ id }) => id === questionId
                  );

                  const questionConfig =
                    spaceConfig.questions[questionIndexInConfig];

                  if (!questionConfig) {
                    throw new Error(
                      "Tried updating an answer, without a matching question specified in the spaceConfig."
                    );
                  }

                  result.creates.push({
                    id: answerId,
                    questionId,
                    testimonialId: testimonial.spaceId,
                    question: questionConfig.content,
                    questionIndex: questionIndexInConfig,
                    ...answerUpdate,
                  });
                }
                return result;
              }, emptyBulkUpdateMap) || emptyBulkUpdateMap;

          operations.push(
            localDb.answers.bulkUpdate(bulkOperationConfig.updates)
          );

          operations.push(localDb.answers.bulkAdd(bulkOperationConfig.creates));

          await Promise.all(operations);
        }
      );
    },
    [spaceId, testimonial, hasTestimonialRecord, spaceConfig.questions]
  );

  const syncedWithSpaceConfig = useRef(false);

  useEffect(() => {
    if (!testimonial || syncedWithSpaceConfig.current) return;

    // Sync the order of existing answers with the order of questions in the spaceConfig
    testimonial.answers.forEach((answer, questionId) => {
      const questionIndexInConfig = spaceConfig.questions.findIndex(
        (question) => question.id === questionId
      );

      if (questionIndexInConfig < 0 && !answer.lostReference) {
        // If no matching question to an answer is present in the spaceConfig anymore,
        // and the answer is not already marked as lost,
        // leave the current index, just mark the answer as lost.
        return updateTestimonial({
          answers: new Map([[questionId, { lostReference: true }]]),
        });
      }

      // If a matching question to an answer is present in the spaceConfig,
      // update it with the current question and questionIndex,
      updateTestimonial({
        answers: new Map([
          [
            questionId,
            {
              lostReference: false,
              questionIndex: questionIndexInConfig,
              question: spaceConfig.questions[questionIndexInConfig].content,
            },
          ],
        ]),
      });
    });

    syncedWithSpaceConfig.current = true;
  }, [spaceConfig.questions, testimonial, updateTestimonial]);

  return { space, testimonial, updateSpace, updateTestimonial };
};
