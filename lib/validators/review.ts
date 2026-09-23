import { z } from "zod";

/**
 * Wire validation for the review layer. Mirrors
 * docs/REVIEW-BACKEND-CONTRACT.md §4 and the copy in taylor-aucoin's
 * `lib/validators/review.ts`; the two must agree field for field.
 */
export const reviewCommentTargetInput = z.object({
  selector: z.string().trim().min(1).max(1024),
  x: z.number().min(0).max(1),
  y: z.number().min(0).max(1),
  label: z.string().trim().max(200).optional(),
});

export const reviewCommentInput = z.object({
  id: z.uuid(),
  path: z.string().trim().min(1).max(512).startsWith("/"),
  body: z.string().trim().min(1).max(4000),
  target: reviewCommentTargetInput,
  viewport: z.object({
    width: z.number().int().min(0),
    height: z.number().int().min(0),
  }),
  createdAt: z.iso.datetime({ offset: true }),
});

const longText = z.string().trim().max(5000).nullable();
const choice = z.string().trim().max(100).nullable();

/**
 * The structured answers (KR-6, contract §4a, M-KR-4). Same kinds, bounds
 * and unique-id rules as taylor-aucoin's copy.
 */
const answerOption = z.object({
  id: z.string().trim().min(1).max(100),
  label: z.string().trim().min(1).max(200),
});

const answerBase = {
  id: z
    .string()
    .max(64)
    .regex(/^[a-z0-9][a-z0-9.-]*$/),
  section: z.string().trim().min(1).max(100),
  label: z.string().trim().min(1).max(300),
};

/** 0.0–7.0 in tenths, the intake's scale. Float-tolerant: 0.7 * 10 is not 7. */
const scaleValue = z
  .number()
  .min(0)
  .max(7)
  .refine((n) => Math.abs(n * 10 - Math.round(n * 10)) < 1e-9, {
    message: "One decimal place at most",
  });

export const reviewAnswerInput = z.discriminatedUnion("kind", [
  z.object({
    ...answerBase,
    kind: z.literal("rank"),
    value: z
      .array(answerOption)
      .min(1)
      .max(20)
      .refine((o) => new Set(o.map((x) => x.id)).size === o.length, {
        message: "An option is ranked twice",
      }),
  }),
  z.object({
    ...answerBase,
    kind: z.literal("scale"),
    value: scaleValue,
    ends: z.object({
      low: z.string().trim().min(1).max(100),
      high: z.string().trim().min(1).max(100),
    }),
    baseline: scaleValue.nullable(),
  }),
  z.object({
    ...answerBase,
    kind: z.literal("choice"),
    value: answerOption,
  }),
  z.object({
    ...answerBase,
    kind: z.literal("text"),
    value: z.string().trim().min(1).max(5000),
  }),
]);

export const reviewAnswersInput = z.object({
  schema: z.string().trim().min(1).max(64),
  items: z
    .array(reviewAnswerInput)
    .max(80)
    .refine((items) => new Set(items.map((i) => i.id)).size === items.length, {
      message: "A question is answered twice",
    }),
});

export const reviewSubmissionInput = z.object({
  id: z.uuid(),
  preferredKit: choice,
  preferredLayout: choice,
  preferredMock: choice,
  flinch: longText,
  fightFor: longText,
  notes: longText,
  commentCount: z.number().int().min(0),
  submittedAt: z.iso.datetime({ offset: true }),
  answers: reviewAnswersInput.nullable().optional(),
});

/** What the feedback form posts, before ids and timestamps are attached. */
export const feedbackFormInput = z.object({
  preferredKit: z.string().trim().max(100).optional(),
  preferredLayout: z.string().trim().max(100).optional(),
  preferredMock: z.string().trim().max(100).optional(),
  flinch: z.string().trim().max(5000).optional(),
  fightFor: z.string().trim().max(5000).optional(),
  notes: z.string().trim().max(5000).optional(),
  /**
   * The browser's answers keyed by question id: a rank's option ids by
   * position ("" for an empty place), a slider's number, a choice's id, or
   * text. The action checks each against `review/feedback.ts`.
   */
  answers: z
    .record(
      z.string().max(64),
      z.union([
        z.number(),
        z.string().max(5000),
        z.array(z.string().max(100)).max(20),
      ]),
    )
    .optional(),
});

export const accessCodeInput = z.object({
  code: z.string().trim().min(1).max(200),
  next: z.string().max(512).optional(),
});
