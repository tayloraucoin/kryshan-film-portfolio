"use server";

import { randomUUID } from "node:crypto";
import { z } from "zod";
import { postSubmission } from "@/lib/review/backend";
import { buildAnswers } from "@/lib/review/build-answers";
import type { ReviewActionResult } from "@/lib/review/types";
import {
  feedbackFormInput,
  reviewSubmissionInput,
} from "@/lib/validators/review";
import { FINAL_SCHEMA, FINAL_SECTIONS } from "@/review/final";

const input = feedbackFormInput.extend({
  commentCount: z.number().int().min(0).default(0),
});

/**
 * Files the final review (`/review/final`): the page-by-page answers and the
 * one free box, sent as `stage: "final"` so taylor-aucoin files and emails
 * it as the last included round (M-REV-7). There is no kit, layout or demo
 * to prefer any more, and the design round's flinch / fight-for boxes are
 * not asked. Same id discipline as `submitFeedback`: the form's id is
 * reused on retry, a malformed one is replaced.
 */
export async function submitFinal(
  values: unknown,
  existingId?: string,
): Promise<ReviewActionResult<{ id: string }>> {
  const parsed = input.safeParse(values);
  if (!parsed.success) return { ok: false, reason: "invalid" };

  const v = parsed.data;
  const built = buildAnswers(v.answers ?? {}, FINAL_SECTIONS, FINAL_SCHEMA);
  if (!built) return { ok: false, reason: "invalid" };

  const submission = reviewSubmissionInput.safeParse({
    id:
      existingId && z.uuid().safeParse(existingId).success
        ? existingId
        : randomUUID(),
    preferredKit: null,
    preferredLayout: null,
    preferredMock: null,
    flinch: null,
    fightFor: null,
    notes: v.notes?.trim() ? v.notes.trim() : null,
    commentCount: v.commentCount,
    submittedAt: new Date().toISOString(),
    answers: built.answers,
    stage: "final",
  });
  if (!submission.success) return { ok: false, reason: "invalid" };

  const result = await postSubmission(submission.data);
  if (!result.ok) return result;
  return { ok: true, data: { id: submission.data.id } };
}
