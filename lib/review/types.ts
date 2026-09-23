/**
 * The review layer's wire and UI types. The wire shapes match
 * docs/REVIEW-BACKEND-CONTRACT.md §4 field for field; the zod schemas in
 * `lib/validators/review.ts` are the runtime check.
 */

export type ReviewCommentTarget = {
  /** A selector the page can resolve again to place the pin. */
  selector: string;
  /** 0..1, horizontal position inside the target's box. */
  x: number;
  /** 0..1, vertical position inside the target's box. */
  y: number;
  /** Human name of the element, when the page could work one out. */
  label?: string;
};

export type ReviewComment = {
  id: string;
  path: string;
  body: string;
  target: ReviewCommentTarget;
  viewport: { width: number; height: number };
  createdAt: string;
};

export type ReviewSubmission = {
  id: string;
  preferredKit: string | null;
  preferredLayout: string | null;
  preferredMock: string | null;
  flinch: string | null;
  fightFor: string | null;
  notes: string | null;
  commentCount: number;
  submittedAt: string;
};

/**
 * What a server action hands back to the review UI. A result, never a thrown
 * error: an exception crossing the action boundary arrives as an opaque
 * digest, and the UI has to tell "the backend is down, kept locally" apart
 * from "this was rejected".
 */
export type ReviewActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; reason: "invalid" | "offline" | "unauthorized" | "failed" };

/** What the review index shows about the round it is connected to. */
export type ReviewRoundInfo = {
  label: string;
  clientName: string;
  submittedAt: string | null;
};
