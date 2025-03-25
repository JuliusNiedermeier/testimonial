import { useCallback, useEffect, useMemo, useRef } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { FormConfig } from "@/shared/testimonial-form/utils/form-config";
import {
  Form,
  Testimonial,
  Answer,
  testimonialDraftDb,
  createAnswerId,
} from "@/shared/testimonial-form/utils/testimonial-draft-db";

export type FormUpdate = Partial<Omit<Form, "id">>;

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

export const defaultTestimonial: Omit<Testimonial, "formId"> = {
  consent: true,
  feedbackType: "video",
  rating: 5,
};

export const defaultForm: Omit<Form, "id"> = {
  currentStepIndex: 0,
};

export interface UseTestimonialFormStoreConfig {
  formId: string;
  formConfig: FormConfig;
}

export const useTestimonialFormStore = ({
  formId,
  formConfig,
}: UseTestimonialFormStoreConfig) => {
  const formRecord = useLiveQuery(async () => {
    const form = await testimonialDraftDb.forms.get(formId);

    if (!form) {
      return { form: { id: formId, ...defaultForm }, hasRecord: false };
    }

    return { form, hasRecord: true };
  });

  const testimonialRecord = useLiveQuery(async () => {
    const [testimonial, answers] = await Promise.all([
      // The testimonial id is set to formId on creation, hence we can get a testimonial using the formId.
      testimonialDraftDb.testimonials.get(formId),
      testimonialDraftDb.answers.where("testimonialId").equals(formId).toArray(),
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
          formId,
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
  }, [formId]);

  const { form, hasRecord: hasFormRecord } = useMemo(() => {
    if (!formRecord) return { form: null, hasRecord: null };
    return formRecord;
  }, [formRecord]);

  const { testimonial, hasRecord: hasTestimonialRecord } = useMemo(() => {
    if (!testimonialRecord) return { testimonial: null, hasRecord: null };
    return testimonialRecord;
  }, [testimonialRecord]);

  const updateForm = useCallback(
    (update: FormUpdate) => {
      if (form === null) {
        throw new Error("Tried updating form before it was loaded.");
      }

      if (hasFormRecord) testimonialDraftDb.forms.update(formId, update);
      else testimonialDraftDb.forms.add({ ...form, ...update });
    },
    [formId, form, hasFormRecord]
  );

  const updateTestimonial = useCallback(
    async (update: DenormalizedTestimonialUpdate) => {
      if (testimonial === null) {
        throw new Error("Tried updating testimonial before it was loaded.");
      }

      const { answers: answerUpdates, ...normalizedUpdate } = update;

      testimonialDraftDb.transaction(
        "readwrite",
        [testimonialDraftDb.testimonials, testimonialDraftDb.answers],
        async () => {
          const operations = [];

          if (hasTestimonialRecord) {
            // Update testimonial
            operations.push(
              testimonialDraftDb.testimonials.update(formId, normalizedUpdate)
            );
          } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { answers, ...normalizedTestimonial } = testimonial;

            // Create testimonial
            operations.push(
              testimonialDraftDb.testimonials.add({
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
                const answerId = createAnswerId(testimonial.formId, questionId);

                if (existingAnswer) {
                  result.updates.push({ key: answerId, changes: answerUpdate });
                } else {
                  const questionIndexInConfig = formConfig.questions.findIndex(
                    ({ id }) => id === questionId
                  );

                  const questionConfig =
                    formConfig.questions[questionIndexInConfig];

                  if (!questionConfig) {
                    throw new Error(
                      "Tried updating an answer, without a matching question specified in the formConfig."
                    );
                  }

                  result.creates.push({
                    id: answerId,
                    questionId,
                    testimonialId: testimonial.formId,
                    question: questionConfig.content,
                    questionIndex: questionIndexInConfig,
                    ...answerUpdate,
                  });
                }
                return result;
              }, emptyBulkUpdateMap) || emptyBulkUpdateMap;

          operations.push(
            testimonialDraftDb.answers.bulkUpdate(bulkOperationConfig.updates)
          );

          operations.push(testimonialDraftDb.answers.bulkAdd(bulkOperationConfig.creates));

          await Promise.all(operations);
        }
      );
    },
    [formId, testimonial, hasTestimonialRecord, formConfig.questions]
  );

  const syncedAnswersWithFormConfig = useRef(false);

  useEffect(() => {
    if (!testimonial || syncedAnswersWithFormConfig.current) return;

    // Sync the order of existing answers with the order of questions in the formConfig
    testimonial.answers.forEach((answer, questionId) => {
      const questionIndexInConfig = formConfig.questions.findIndex(
        (question) => question.id === questionId
      );

      if (questionIndexInConfig < 0 && !answer.lostReference) {
        // If no matching question to an answer is present in the formConfig anymore,
        // and the answer is not already marked as lost,
        // leave the current index, just mark the answer as lost.
        return updateTestimonial({
          answers: new Map([[questionId, { lostReference: true }]]),
        });
      }

      // If a matching question to an answer is present in the formConfig,
      // update it with the current question and questionIndex,
      updateTestimonial({
        answers: new Map([
          [
            questionId,
            {
              lostReference: false,
              questionIndex: questionIndexInConfig,
              question: formConfig.questions[questionIndexInConfig].content,
            },
          ],
        ]),
      });
    });

    syncedAnswersWithFormConfig.current = true;
  }, [formConfig.questions, testimonial, updateTestimonial]);

  return {
    form,
    testimonial,
    updateForm,
    updateTestimonial,
  };
};
