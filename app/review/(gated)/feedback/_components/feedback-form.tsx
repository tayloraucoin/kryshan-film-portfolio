"use client";

import {
  useState,
  useSyncExternalStore,
  useTransition,
  type FormEvent,
} from "react";
import Link from "next/link";
import { submitFeedback } from "@/app/review/(gated)/feedback/_actions/submit-feedback";
import { submitFinal } from "@/app/review/(gated)/final/_actions/submit-final";
import { Button } from "@/components/primitives/button";
import { countPendingEverywhere } from "@/lib/review/pending-store";
import {
  FEEDBACK_NOTE_MAX,
  FEEDBACK_NOTE_SUFFIX,
  type FeedbackQuestion,
  type FeedbackSection,
  type FeedbackValue,
} from "@/lib/review/types";
import { reviewRoutes, siteRoutes } from "@/lib/routes";
import { designDraft, finalDraft, type FeedbackDraft } from "./feedback-draft";
import {
  ChoiceField,
  NoteField,
  RankField,
  ScaleField,
  TextField,
} from "./feedback-fields";

type FeedbackFormProps = {
  sections: ReadonlyArray<FeedbackSection>;
  /** Which form: the design round's (default) or the final review's. */
  variant?: "design" | "final";
};

function answered(value: FeedbackValue | undefined): boolean {
  if (value === undefined) return false;
  if (Array.isArray(value)) return value.some(Boolean);
  return typeof value === "number" || value.trim() !== "";
}

type Words = ReadonlyArray<{
  key: "flinch" | "fightFor" | "notes";
  label: string;
  hint?: string;
}>;

/** The three free-text boxes: the contract's own fields, always last. */
const WORDS: Words = [
  {
    key: "flinch",
    label: "What made you flinch?",
    hint: "Which page, in which option, and what on it.",
  },
  {
    key: "fightFor",
    label: "Anything you would fight for?",
    hint: "Things you want kept whatever else changes.",
  },
  { key: "notes", label: "Anything else / general impressions" },
];

/**
 * What differs between the two forms: where the draft is kept, which action
 * files it, the free boxes at the end, and what the reviewer reads after
 * sending. The final review links out to the live pages, so those open in
 * a new tab and the form stays where it was.
 */
const VARIANTS = {
  design: {
    draft: designDraft,
    submit: submitFeedback,
    words: WORDS,
    sendLabel: "Send feedback",
    sentBody:
      "Your comments and this form are on their way. You can keep commenting; anything new is picked up too.",
    back: { label: "Back to the options", href: reviewRoutes.index },
    linksInNewTab: false,
  },
  final: {
    draft: finalDraft,
    submit: submitFinal,
    words: [
      {
        key: "notes",
        label: "Anything else?",
        hint: "Anything that isn’t about one page, or that you’d like to tell me before it goes live.",
      },
    ] satisfies Words,
    sendLabel: "Send my final changes",
    sentBody:
      "I’ll make all of these in one go and tell you when they’re up. After that: your site moves onto kryshanrandel.com, and you get the guide to changing it yourself.",
    back: { label: "Back to your site", href: siteRoutes.home },
    linksInNewTab: true,
  },
} as const;

/**
 * The round's one form, rendered from `review/feedback.ts` (KR-6). Every
 * answer is optional and saved in this browser as it is given, so a reload
 * keeps the reviewer's place; the draft survives sending so answers can be
 * revised and sent again. An empty form is refused here so nobody submits
 * nothing by accident. The comment count is read from the browser's own
 * storage at submit time, so it reflects what the reviewer actually left.
 */
export function FeedbackForm({
  sections,
  variant = "design",
}: FeedbackFormProps) {
  const config = VARIANTS[variant];
  const { read: readDraft, write: writeDraft } = config.draft;
  const draft = useSyncExternalStore(
    config.draft.subscribe,
    readDraft,
    config.draft.readServer,
  );
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const update = (patch: Partial<FeedbackDraft>) =>
    writeDraft({ ...readDraft(), ...patch });

  const setAnswer = (id: string, value: FeedbackValue | undefined) => {
    const answers = { ...readDraft().answers };
    if (value === undefined) delete answers[id];
    else answers[id] = value;
    update({ answers });
  };

  const questions = sections.flatMap((s) => s.questions);
  const done = questions.filter((q) => answered(draft.answers[q.id])).length;
  const wrote = config.words.some((w) => draft[w.key].trim());

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (done === 0 && !wrote) {
      setError("Answer something or write something before sending.");
      return;
    }
    const answers = Object.fromEntries(
      Object.entries(draft.answers).filter(([, v]) => answered(v)),
    );
    // One id per send, kept until it lands, so a retry after a lost
    // response is the same submission to the backend (contract §1).
    const submissionId = draft.submissionId ?? crypto.randomUUID();
    update({ submissionId });
    start(async () => {
      const result = await config.submit(
        {
          answers,
          flinch: draft.flinch,
          fightFor: draft.fightFor,
          notes: draft.notes,
          commentCount: countPendingEverywhere(),
        },
        submissionId,
      );
      if (result.ok) {
        update({ sentAt: new Date().toISOString(), submissionId: null });
        window.scrollTo({ top: 0 });
        return;
      }
      setError(
        result.reason === "offline"
          ? "The backend could not be reached. Nothing was lost; try again in a moment."
          : result.reason === "unauthorized"
            ? "This site's review key was refused. Tell Taylor."
            : "That could not be sent. Try again.",
      );
    });
  };

  if (draft.sentAt) {
    return (
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Sent. Thank you.</h2>
        <p className="text-muted-foreground">{config.sentBody}</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href={config.back.href}
            className="underline underline-offset-4"
          >
            {config.back.label}
          </Link>
          <button
            type="button"
            onClick={() => update({ sentAt: null })}
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Change an answer and send again
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-12">
      {sections.map((section, i) => (
        <section
          key={section.id}
          aria-labelledby={`section-${section.id}`}
          className="flex flex-col gap-8"
        >
          <header className="flex flex-col gap-2 border-t border-border pt-6">
            <p className="font-mono text-xs text-muted-foreground">
              {i + 1} of {sections.length + 1}
            </p>
            <h2
              id={`section-${section.id}`}
              className="text-xl font-semibold tracking-tight"
            >
              {section.title}
            </h2>
            {section.intro ? (
              <p className="text-muted-foreground">{section.intro}</p>
            ) : null}
            {section.links?.length ? (
              <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="underline underline-offset-4"
                    {...(config.linksInNewTab
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </Link>
                ))}
              </p>
            ) : null}
          </header>
          {section.questions.map((q) => {
            const noteId = `${q.id}${FEEDBACK_NOTE_SUFFIX}`;
            const note = draft.answers[noteId];
            return (
              <div key={q.id} className="flex flex-col gap-6">
                <Question
                  question={q}
                  value={draft.answers[q.id]}
                  onChange={(v) => setAnswer(q.id, v)}
                />
                {q.kind !== "text" && q.note !== false ? (
                  <NoteField
                    id={noteId}
                    prompt={
                      q.note?.prompt ??
                      "Anything to add? Say it in your own words."
                    }
                    open={q.note?.open ?? false}
                    maxLength={FEEDBACK_NOTE_MAX}
                    value={typeof note === "string" ? note : undefined}
                    onChange={(v) => setAnswer(noteId, v)}
                  />
                ) : null}
              </div>
            );
          })}
        </section>
      ))}

      <section aria-labelledby="section-words" className="flex flex-col gap-8">
        <header className="flex flex-col gap-2 border-t border-border pt-6">
          <p className="font-mono text-xs text-muted-foreground">
            {sections.length + 1} of {sections.length + 1}
          </p>
          <h2
            id="section-words"
            className="text-xl font-semibold tracking-tight"
          >
            In your words
          </h2>
        </header>
        {config.words.map((w) => (
          <TextField
            key={w.key}
            id={w.key}
            label={w.label}
            hint={w.hint}
            maxLength={5000}
            value={draft[w.key]}
            onChange={(v) => update({ [w.key]: v })}
          />
        ))}
      </section>

      <div className="flex flex-col gap-3 border-t border-border pt-6">
        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" size="lg" disabled={pending}>
            {pending ? "Sending…" : config.sendLabel}
          </Button>
          <span className="text-sm text-muted-foreground" aria-live="polite">
            {done} of {questions.length} answered. Every question is optional,
            and your answers are saved in this browser until you send.
          </span>
        </div>
      </div>
    </form>
  );
}

function Question({
  question: q,
  value,
  onChange,
}: {
  question: FeedbackQuestion;
  value: FeedbackValue | undefined;
  onChange: (next: FeedbackValue | undefined) => void;
}) {
  switch (q.kind) {
    case "rank":
      return (
        <RankField
          id={q.id}
          label={q.label}
          hint={q.hint}
          options={q.options}
          value={Array.isArray(value) ? value : undefined}
          onChange={onChange}
        />
      );
    case "scale":
      return (
        <ScaleField
          id={q.id}
          label={q.label}
          hint={q.hint}
          ends={q.ends}
          value={typeof value === "number" ? value : undefined}
          onChange={onChange}
        />
      );
    case "choice":
      return (
        <ChoiceField
          id={q.id}
          label={q.label}
          hint={q.hint}
          options={q.options}
          value={typeof value === "string" && value ? value : undefined}
          onChange={onChange}
        />
      );
    case "text":
      return (
        <TextField
          id={q.id}
          label={q.label}
          hint={q.hint}
          maxLength={q.maxLength}
          value={typeof value === "string" ? value : undefined}
          onChange={(v) => onChange(v === "" ? undefined : v)}
        />
      );
  }
}
