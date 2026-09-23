import type { FeedbackValue } from "@/lib/review/types";

/**
 * The feedback form's answers, kept in `localStorage` as the reviewer goes,
 * so a reload or a closed tab loses nothing (KR-6). Same shape of store as
 * `lib/review/pending-store.ts`: read through `useSyncExternalStore`, an
 * empty server snapshot, snapshots cached by their raw string.
 *
 * A separate key from the comment queue, whose prefix
 * `countPendingEverywhere` counts.
 */
export type FeedbackDraft = {
  answers: Record<string, FeedbackValue>;
  flinch: string;
  fightFor: string;
  notes: string;
  /** Set once the form has been sent; the answers stay so they can be revised. */
  sentAt: string | null;
  /** The id of a send that has not been confirmed, reused on retry. */
  submissionId: string | null;
};

const KEY = "review:feedback-draft";
export const EMPTY_DRAFT: FeedbackDraft = {
  answers: {},
  flinch: "",
  fightFor: "",
  notes: "",
  sentAt: null,
  submissionId: null,
};

const listeners = new Set<() => void>();
let cache: { raw: string | null; value: FeedbackDraft } | null = null;

export function subscribeDraft(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function readDraft(): FeedbackDraft {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return cache?.value ?? EMPTY_DRAFT;
  }
  if (cache && cache.raw === raw) return cache.value;
  let value = EMPTY_DRAFT;
  if (raw) {
    try {
      value = {
        ...EMPTY_DRAFT,
        ...(JSON.parse(raw) as Partial<FeedbackDraft>),
      };
    } catch {
      value = EMPTY_DRAFT;
    }
  }
  cache = { raw, value };
  return value;
}

export function readDraftServer(): FeedbackDraft {
  return EMPTY_DRAFT;
}

export function writeDraft(draft: FeedbackDraft): void {
  const raw = JSON.stringify(draft);
  try {
    window.localStorage.setItem(KEY, raw);
    cache = { raw, value: draft };
  } catch {
    // Blocked storage: keep the draft in memory for this page's life.
    cache = { raw: null, value: draft };
  }
  for (const listener of listeners) listener();
}
