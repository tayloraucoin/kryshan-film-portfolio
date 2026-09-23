"use server";

import { randomUUID } from "node:crypto";
import { z } from "zod";
import { postSubmission } from "@/lib/review/backend";
import type { ReviewActionResult } from "@/lib/review/types";
import {
  feedbackFormInput,
  reviewSubmissionInput,
} from "@/lib/validators/review";

const input = feedbackFormInput.extend({
  commentCount: z.number().int().min(0).default(0),
});

/**
 * Files the round's feedback form. The id is minted here rather than in the
 * browser because a submission is sent once from one form; a retry of a
 * failed send reuses the id the form kept from the first attempt.
 */
export async function submitFeedback(
  values: unknown,
  existingId?: string,
): Promise<ReviewActionResult<{ id: string }>> {
  const parsed = input.safeParse(values);
  if (!parsed.success) return { ok: false, reason: "invalid" };

  const v = parsed.data;
  const blank = (s: string | undefined) => (s && s.trim() ? s.trim() : null);

  const submission = reviewSubmissionInput.safeParse({
    id:
      existingId && z.uuid().safeParse(existingId).success
        ? existingId
        : randomUUID(),
    preferredKit: blank(v.preferredKit),
    preferredLayout: blank(v.preferredLayout),
    preferredMock: blank(v.preferredMock),
    flinch: blank(v.flinch),
    fightFor: blank(v.fightFor),
    notes: blank(v.notes),
    commentCount: v.commentCount,
    submittedAt: new Date().toISOString(),
  });
  if (!submission.success) return { ok: false, reason: "invalid" };

  const result = await postSubmission(submission.data);
  if (!result.ok) return result;
  return { ok: true, data: { id: submission.data.id } };
}
