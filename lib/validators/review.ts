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
});

/** What the feedback form posts, before ids and timestamps are attached. */
export const feedbackFormInput = z.object({
  preferredKit: z.string().trim().max(100).optional(),
  preferredLayout: z.string().trim().max(100).optional(),
  preferredMock: z.string().trim().max(100).optional(),
  flinch: z.string().trim().max(5000).optional(),
  fightFor: z.string().trim().max(5000).optional(),
  notes: z.string().trim().max(5000).optional(),
});

export const accessCodeInput = z.object({
  code: z.string().trim().min(1).max(200),
  next: z.string().max(512).optional(),
});
