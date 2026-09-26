import type { FeedbackValue } from "@/lib/review/types";

/**
 * A feedback form's answers, kept in `localStorage` as the reviewer goes,
 * so a reload or a closed tab loses nothing (KR-6). Same shape of store as
 * `lib/review/pending-store.ts`: read through `useSyncExternalStore`, an
 * empty server snapshot, snapshots cached by their raw string.
 *
 * One store per form, each under its own key, so the design round's answers
 * and the final review's never overwrite each other. Neither key shares the
 * comment queue's prefix, which `countPendingEverywhere` counts.
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

export const EMPTY_DRAFT: FeedbackDraft = {
  answers: {},
  flinch: "",
  fightFor: "",
  notes: "",
  sentAt: null,
  submissionId: null,
};

export type DraftStore = {
  subscribe: (listener: () => void) => () => void;
  read: () => FeedbackDraft;
  readServer: () => FeedbackDraft;
  write: (draft: FeedbackDraft) => void;
};

function createDraftStore(key: string): DraftStore {
  const listeners = new Set<() => void>();
  let cache: { raw: string | null; value: FeedbackDraft } | null = null;

  const read = (): FeedbackDraft => {
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(key);
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
  };

  return {
    subscribe(listener) {
      listeners.add(listener);
      window.addEventListener("storage", listener);
      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", listener);
      };
    },
    read,
    readServer: () => EMPTY_DRAFT,
    write(draft) {
      const raw = JSON.stringify(draft);
      try {
        window.localStorage.setItem(key, raw);
        cache = { raw, value: draft };
      } catch {
        // Blocked storage: keep the draft in memory for this page's life.
        cache = { raw: null, value: draft };
      }
      for (const listener of listeners) listener();
    },
  };
}

/** The design round's form (`/review/feedback`). The key predates the final review. */
export const designDraft = createDraftStore("review:feedback-draft");

/** The final review's form (`/review/final`). */
export const finalDraft = createDraftStore("review:final-draft");
