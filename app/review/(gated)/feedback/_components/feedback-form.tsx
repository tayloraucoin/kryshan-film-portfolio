"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { submitFeedback } from "@/app/review/(gated)/feedback/_actions/submit-feedback";
import { Button } from "@/components/primitives/button";
import { Label } from "@/components/primitives/label";
import { Textarea } from "@/components/primitives/textarea";
import { countPendingEverywhere } from "@/lib/review/pending-store";
import { reviewRoutes } from "@/lib/routes";

type Option = { id: string; label: string };

type FeedbackFormProps = {
  kits: Option[];
  layouts: Option[];
  mocks: Option[];
};

/**
 * The round's one form. Every field is optional; an empty form is refused
 * on the client so nobody submits three nulls by accident. The comment count
 * is read from the browser's own storage at submit time, so it reflects what
 * the reviewer actually left, sent or not.
 */
export function FeedbackForm({ kits, layouts, mocks }: FeedbackFormProps) {
  const [pending, start] = useTransition();
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submissionId, setSubmissionId] = useState<string | undefined>();

  const onSubmit = (formData: FormData) => {
    setError(null);
    const values = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;
    const anything = Object.values(values).some((v) => v && v.trim());
    if (!anything) {
      setError("Pick something or write something before sending.");
      return;
    }
    start(async () => {
      const result = await submitFeedback(
        { ...values, commentCount: countPendingEverywhere() },
        submissionId,
      );
      if (result.ok) {
        setSubmissionId(result.data.id);
        setDone(true);
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

  if (done) {
    return (
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Sent. Thank you.</h2>
        <p className="text-muted-foreground">
          Your comments and this form are on their way. You can keep commenting;
          anything new is picked up too.
        </p>
        <p>
          <Link
            href={reviewRoutes.index}
            className="underline underline-offset-4"
          >
            Back to the options
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form action={onSubmit} className="flex flex-col gap-6">
      <Choice name="preferredKit" label="Which branding kit?" options={kits} />
      <Choice name="preferredLayout" label="Which layout?" options={layouts} />
      <Choice
        name="preferredMock"
        label="Which demo home page?"
        options={mocks}
      />

      <Field
        name="flinch"
        label="What made you flinch?"
        hint="Which page, in which option, and what on it."
      />
      <Field
        name="fightFor"
        label="Anything you would fight for?"
        hint="Things you want kept whatever else changes."
      />
      <Field name="notes" label="Anything else" />

      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send feedback"}
        </Button>
        <span className="text-xs text-muted-foreground">
          Every field is optional.
        </span>
      </div>
    </form>
  );
}

function Choice({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: Option[];
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm has-checked:border-primary has-checked:bg-muted"
          >
            <input
              type="radio"
              name={name}
              value={option.id}
              className="accent-primary"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Field({
  name,
  label,
  hint,
}: {
  name: string;
  label: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      <Textarea id={name} name={name} rows={4} maxLength={5000} />
    </div>
  );
}
