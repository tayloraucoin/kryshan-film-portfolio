"use server";

import { randomUUID } from "node:crypto";
import { z } from "zod";
import { postSubmission } from "@/lib/review/backend";
import {
  FEEDBACK_NOTE_MAX,
  FEEDBACK_NOTE_SUFFIX,
  type FeedbackOption,
  type FeedbackValue,
  type ReviewActionResult,
  type ReviewAnswer,
  type ReviewAnswers,
  type ReviewSubmission,
} from "@/lib/review/types";
import {
  feedbackFormInput,
  reviewSubmissionInput,
} from "@/lib/validators/review";
import {
  FEEDBACK_SCHEMA,
  FEEDBACK_SECTIONS,
  INTAKE_BASELINES,
} from "@/review/feedback";

const input = feedbackFormInput.extend({
  commentCount: z.number().int().min(0).default(0),
});

type Legacy = Pick<
  ReviewSubmission,
  "preferredKit" | "preferredLayout" | "preferredMock"
>;

/**
 * Turns the browser's `{ questionId: value }` into the wire's ordered,
 * labelled items (contract §4a, M-KR-4). Labels come from the question set,
 * never from the browser; an unknown question or option makes the whole
 * submission invalid rather than silently dropping an answer. Empty answers
 * are omitted. Returns null when anything does not match.
 */
function buildAnswers(
  raw: Record<string, FeedbackValue>,
): { answers: ReviewAnswers | null; legacy: Partial<Legacy> } | null {
  const known = new Set(
    FEEDBACK_SECTIONS.flatMap((s) =>
      s.questions.flatMap((q) =>
        q.kind === "text" || q.note === false
          ? [q.id]
          : [q.id, `${q.id}${FEEDBACK_NOTE_SUFFIX}`],
      ),
    ),
  );
  if (Object.keys(raw).some((id) => !known.has(id))) return null;

  const items: ReviewAnswer[] = [];
  const legacy: Partial<Legacy> = {};
  const option = (options: FeedbackOption[], id: string) =>
    options.find((o) => o.id === id);

  for (const section of FEEDBACK_SECTIONS) {
    for (const q of section.questions) {
      const value = raw[q.id];
      const base = { id: q.id, section: section.title, label: q.label };

      if (value !== undefined)
        switch (q.kind) {
          case "rank": {
            if (!Array.isArray(value)) return null;
            const ids = value.filter((id) => id !== "");
            if (ids.length === 0) break;
            if (new Set(ids).size !== ids.length) return null;
            const ranked: FeedbackOption[] = [];
            for (const id of ids) {
              const found = option(q.options, id);
              if (!found) return null;
              ranked.push(found);
            }
            items.push({
              ...base,
              kind: "rank",
              value: ranked.map((o) => ({ id: o.id, label: o.label })),
            });
            break;
          }
          case "scale": {
            if (typeof value !== "number" || value < 0 || value > 7)
              return null;
            items.push({
              ...base,
              kind: "scale",
              value: Math.round(value * 10) / 10,
              ends: q.ends,
              baseline: INTAKE_BASELINES[q.id] ?? null,
            });
            break;
          }
          case "choice": {
            if (typeof value !== "string") return null;
            if (value === "") break;
            const chosen = option(q.options, value);
            if (!chosen) return null;
            items.push({
              ...base,
              kind: "choice",
              value: { id: chosen.id, label: chosen.label },
            });
            for (const [field, id] of Object.entries(chosen.sets ?? {})) {
              const key = field as keyof Legacy;
              if (legacy[key] === undefined) legacy[key] = id;
            }
            break;
          }
          case "text": {
            if (typeof value !== "string") return null;
            const text = value.trim();
            if (!text) break;
            if (text.length > q.maxLength) return null;
            items.push({ ...base, kind: "text", value: text });
            break;
          }
        }

      // The reviewer's own words on this question, straight after the
      // answer (or on their own if the question was left unanswered).
      const note = raw[`${q.id}${FEEDBACK_NOTE_SUFFIX}`];
      if (note === undefined) continue;
      if (typeof note !== "string") return null;
      const noteText = note.trim();
      if (!noteText) continue;
      if (noteText.length > FEEDBACK_NOTE_MAX) return null;
      items.push({
        id: `${q.id}${FEEDBACK_NOTE_SUFFIX}`,
        section: section.title,
        label: `${q.label} (in your words)`,
        kind: "text",
        value: noteText,
      });
    }
  }

  return {
    answers: items.length ? { schema: FEEDBACK_SCHEMA, items } : null,
    legacy,
  };
}

/**
 * Files the round's feedback form. The form mints the id and keeps it in its
 * draft until a send is confirmed, so a retry after a lost response is the
 * same submission to the backend; a missing or malformed id gets a fresh one.
 */
export async function submitFeedback(
  values: unknown,
  existingId?: string,
): Promise<ReviewActionResult<{ id: string }>> {
  const parsed = input.safeParse(values);
  if (!parsed.success) return { ok: false, reason: "invalid" };

  const v = parsed.data;
  const blank = (s: string | undefined) => (s && s.trim() ? s.trim() : null);

  const built = buildAnswers(v.answers ?? {});
  if (!built) return { ok: false, reason: "invalid" };

  const submission = reviewSubmissionInput.safeParse({
    id:
      existingId && z.uuid().safeParse(existingId).success
        ? existingId
        : randomUUID(),
    preferredKit: blank(v.preferredKit) ?? built.legacy.preferredKit ?? null,
    preferredLayout:
      blank(v.preferredLayout) ?? built.legacy.preferredLayout ?? null,
    preferredMock: blank(v.preferredMock) ?? built.legacy.preferredMock ?? null,
    flinch: blank(v.flinch),
    fightFor: blank(v.fightFor),
    notes: blank(v.notes),
    commentCount: v.commentCount,
    submittedAt: new Date().toISOString(),
    answers: built.answers,
  });
  if (!submission.success) return { ok: false, reason: "invalid" };

  const result = await postSubmission(submission.data);
  if (!result.ok) return result;
  return { ok: true, data: { id: submission.data.id } };
}
