import type { Route } from "next";

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
  /** Structured answers (KR-6, M-KR-4). Absent or null before KR-6. */
  answers?: ReviewAnswers | null;
};

/** An option as this site labelled it when the answer was given. */
export type ReviewAnswerOption = { id: string; label: string };

type ReviewAnswerBase = {
  /** Stable question id from `review/feedback.ts`. */
  id: string;
  /** The section heading the question sat under. */
  section: string;
  /** The question as the reviewer read it. */
  label: string;
};

/**
 * One answered question on the wire, self-describing so taylor-aucoin's
 * stored row and email read without this site's code (contract §4a).
 */
export type ReviewAnswer =
  | (ReviewAnswerBase & { kind: "rank"; value: ReviewAnswerOption[] })
  | (ReviewAnswerBase & {
      kind: "scale";
      value: number;
      ends: { low: string; high: string };
      baseline: number | null;
    })
  | (ReviewAnswerBase & { kind: "choice"; value: ReviewAnswerOption })
  | (ReviewAnswerBase & { kind: "text"; value: string });

export type ReviewAnswers = {
  schema: string;
  /** In the order the form asked them; unanswered questions omitted. */
  items: ReviewAnswer[];
};

/**
 * The feedback form's question set, as data (`review/feedback.ts`). The
 * renderer and the server action read it; the wire carries a label snapshot
 * of it (`ReviewAnswer`).
 */
export type FeedbackOption = {
  id: string;
  label: string;
  /** A line under the label on the form; never sent. */
  detail?: string;
  /**
   * The legacy submission fields this option fills when chosen, so the
   * contract's `preferredKit` / `preferredLayout` / `preferredMock` keep
   * meaning something. The first answered question that sets a field wins.
   */
  sets?: Partial<
    Pick<ReviewSubmission, "preferredKit" | "preferredLayout" | "preferredMock">
  >;
};

type FeedbackQuestionBase = {
  id: string;
  label: string;
  /** One line on why it is asked, or how to answer. */
  hint?: string;
};

export type FeedbackQuestion =
  | (FeedbackQuestionBase & { kind: "rank"; options: FeedbackOption[] })
  | (FeedbackQuestionBase & {
      kind: "scale";
      ends: { low: string; high: string };
    })
  | (FeedbackQuestionBase & { kind: "choice"; options: FeedbackOption[] })
  | (FeedbackQuestionBase & { kind: "text"; maxLength: number });

export type FeedbackSection = {
  id: string;
  title: string;
  intro?: string;
  /** A way back to the pages the section asks about. */
  links?: ReadonlyArray<{ label: string; href: Route }>;
  questions: FeedbackQuestion[];
};

/** What the browser holds per question: a rank's ids in order, a number, an id, or text. */
export type FeedbackValue = string | number | string[];

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
