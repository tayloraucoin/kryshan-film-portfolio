"use client";

import { useState } from "react";
import { Input } from "@/components/primitives/input";
import { Label } from "@/components/primitives/label";
import { Textarea } from "@/components/primitives/textarea";
import type { FeedbackOption } from "@/lib/review/types";

/**
 * The four question kinds (KR-6). Every one is a native control, so
 * keyboard, touch and screen readers get the platform's behaviour: a rank is
 * a radio group of places per option (no drag), a slider is a real range
 * input with its value printed to one decimal and both ends labelled.
 * Every field can be cleared back to unanswered.
 */

const ORDINALS = ["1st", "2nd", "3rd", "4th", "5th", "6th"];

function ClearButton({ onClear, what }: { onClear: () => void; what: string }) {
  return (
    <button
      type="button"
      onClick={onClear}
      className="self-start text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
    >
      Clear<span className="sr-only"> {what}</span>
    </button>
  );
}

function Hint({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="text-sm text-muted-foreground">
      {children}
    </p>
  );
}

const chip =
  "flex min-h-10 cursor-pointer items-center justify-center rounded-lg border border-border px-3 text-sm transition-colors hover:bg-muted has-checked:border-foreground has-checked:bg-foreground has-checked:text-background has-focus-visible:ring-2 has-focus-visible:ring-ring";

export function RankField({
  id,
  label,
  hint,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  options: FeedbackOption[];
  /** Option ids by place; "" is an empty place. */
  value: string[] | undefined;
  onChange: (next: string[] | undefined) => void;
}) {
  const places = options.map((_, i) => value?.[i] ?? "");

  const put = (optionId: string, place: number) => {
    const next = [...places];
    const from = next.indexOf(optionId);
    const occupant = next[place] ?? "";
    next[place] = optionId;
    // The option that held this place takes the chosen option's old one.
    if (from >= 0 && from !== place) next[from] = occupant;
    onChange(next);
  };

  return (
    <fieldset
      className="flex flex-col gap-3"
      aria-describedby={hint ? `${id}-hint` : undefined}
    >
      <legend className="mb-1 font-medium">{label}</legend>
      <Hint id={`${id}-hint`}>{hint}</Hint>
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <div
            key={option.id}
            className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <div id={`${id}:${option.id}`} className="text-sm sm:max-w-sm">
              <span className="font-medium">{option.label}</span>
              {option.detail ? (
                <span className="block text-muted-foreground">
                  {option.detail}
                </span>
              ) : null}
            </div>
            <div
              role="radiogroup"
              aria-labelledby={`${id}:${option.id}`}
              className="grid shrink-0 grid-cols-3 gap-2 sm:w-56"
            >
              {options.map((_, place) => (
                <label key={place} className={chip}>
                  <input
                    type="radio"
                    className="sr-only"
                    name={`${id}:${option.id}`}
                    checked={places[place] === option.id}
                    onChange={() => put(option.id, place)}
                  />
                  {ORDINALS[place] ?? `${place + 1}th`}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      {places.some(Boolean) ? (
        <ClearButton onClear={() => onChange(undefined)} what={label} />
      ) : null}
    </fieldset>
  );
}

export function ScaleField({
  id,
  label,
  hint,
  ends,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  ends: { low: string; high: string };
  value: number | undefined;
  onChange: (next: number | undefined) => void;
}) {
  const set = value !== undefined;
  const shown = value ?? 3.5;
  const commit = (raw: string) => onChange(Math.round(Number(raw) * 10) / 10);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <Label htmlFor={id} className="font-medium">
          {label}
        </Label>
        <output
          htmlFor={id}
          className={
            set
              ? "font-mono text-lg font-semibold tabular-nums"
              : "text-sm text-muted-foreground"
          }
        >
          {set ? shown.toFixed(1) : "Not set"}
        </output>
      </div>
      <Hint id={`${id}-hint`}>{hint}</Hint>
      <input
        id={id}
        type="range"
        min={0}
        max={7}
        step={0.1}
        value={shown}
        aria-describedby={`${id}-ends${hint ? ` ${id}-hint` : ""}`}
        aria-valuetext={
          set
            ? `${shown.toFixed(1)} of 7, from ${ends.low} at 0 to ${ends.high} at 7`
            : `Not set. ${ends.low} at 0, ${ends.high} at 7`
        }
        onChange={(e) => commit(e.currentTarget.value)}
        // A tap on the untouched thumb changes nothing, so no change event
        // fires; count the tap as the answer.
        onPointerUp={(e) => {
          if (!set) commit(e.currentTarget.value);
        }}
        className={`h-10 w-full cursor-pointer accent-foreground ${set ? "" : "opacity-40"}`}
      />
      <div
        id={`${id}-ends`}
        className="flex justify-between gap-4 text-sm text-muted-foreground"
      >
        <span>
          <span className="font-mono text-xs">0 </span>
          {ends.low}
        </span>
        <span className="text-right">
          {ends.high}
          <span className="font-mono text-xs"> 7</span>
        </span>
      </div>
      {set ? (
        <ClearButton onClear={() => onChange(undefined)} what={label} />
      ) : null}
    </div>
  );
}

export function ChoiceField({
  id,
  label,
  hint,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  options: FeedbackOption[];
  value: string | undefined;
  onChange: (next: string | undefined) => void;
}) {
  return (
    <fieldset
      className="flex flex-col gap-2"
      aria-describedby={hint ? `${id}-hint` : undefined}
    >
      <legend className="mb-1 font-medium">{label}</legend>
      <Hint id={`${id}-hint`}>{hint}</Hint>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg border border-border px-3 py-2.5 text-sm transition-colors hover:bg-muted has-checked:border-foreground has-checked:bg-muted has-focus-visible:ring-2 has-focus-visible:ring-ring"
          >
            <input
              type="radio"
              name={id}
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
              className="mt-0.5 size-4 shrink-0 accent-foreground"
            />
            <span>
              {option.label}
              {option.detail ? (
                <span className="block text-muted-foreground">
                  {option.detail}
                </span>
              ) : null}
            </span>
          </label>
        ))}
      </div>
      {value ? (
        <ClearButton onClear={() => onChange(undefined)} what={label} />
      ) : null}
    </fieldset>
  );
}

export function TextField({
  id,
  label,
  hint,
  maxLength,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  maxLength: number;
  value: string | undefined;
  onChange: (next: string) => void;
}) {
  const short = maxLength <= 200;
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="font-medium">
        {label}
      </Label>
      <Hint id={`${id}-hint`}>{hint}</Hint>
      {short ? (
        <Input
          id={id}
          value={value ?? ""}
          maxLength={maxLength}
          aria-describedby={hint ? `${id}-hint` : undefined}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      ) : (
        <Textarea
          id={id}
          rows={4}
          value={value ?? ""}
          maxLength={maxLength}
          aria-describedby={hint ? `${id}-hint` : undefined}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      )}
    </div>
  );
}

/**
 * The reviewer's own words beside an answer. Closed behind "Add a thought"
 * unless the question asks for it open or it already holds text, so twenty
 * questions do not become twenty empty boxes on a phone.
 */
export function NoteField({
  id,
  prompt,
  open,
  maxLength,
  value,
  onChange,
}: {
  id: string;
  prompt: string;
  open: boolean;
  maxLength: number;
  value: string | undefined;
  onChange: (next: string | undefined) => void;
}) {
  const [shown, setShown] = useState(open);

  if (!shown && !value) {
    return (
      <button
        type="button"
        onClick={() => setShown(true)}
        className="-mt-4 self-start text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
      >
        Add a thought
      </button>
    );
  }

  return (
    <div className="-mt-3 flex flex-col gap-2">
      <Label htmlFor={id} className="text-sm font-normal text-muted-foreground">
        {prompt}
      </Label>
      <Textarea
        id={id}
        rows={3}
        value={value ?? ""}
        maxLength={maxLength}
        autoFocus={!open && !value}
        onChange={(e) => {
          const next = e.currentTarget.value;
          onChange(next === "" ? undefined : next);
        }}
      />
    </div>
  );
}
