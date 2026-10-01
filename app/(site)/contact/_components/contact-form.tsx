"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type FormEvent,
  type ReactNode,
} from "react";
import { submitContactMessage } from "@/app/(site)/contact/_actions/send-message";
import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import { Label } from "@/components/primitives/label";
import { Textarea } from "@/components/primitives/textarea";
import { CONTACT, EMAIL_PAUSED_COPY } from "@/content/site";
import { cn } from "@/lib/cn";
import { mailtoHref } from "@/lib/mailto";
import { markJsReady } from "@/lib/pre-paint-script";
import {
  CONTACT_LIMITS,
  type ContactField,
  type ContactMessageResult,
} from "@/lib/validators/contact";

const COPY = CONTACT.form;
const EMPTY = { name: "", email: "", message: "" };

/** The Label step, as Copy wears it. */
const LABEL =
  "text-[0.6875rem] leading-none font-semibold font-stretch-88% tracking-[0.18em] text-muted-foreground uppercase";
/** The primitives at a 44 px target, on the kit's hairline and radius; errors in `--link`, never red 600 (fails on ink). */
const FIELD =
  "min-h-11 rounded-(--radius) border-border px-3 text-base md:text-base dark:bg-transparent aria-invalid:border-(--link) aria-invalid:ring-(--link)/25 dark:aria-invalid:border-(--link) dark:aria-invalid:ring-(--link)/25";
const ERROR = "text-sm text-(--link)";

/**
 * Contact's form: name, email, message, Send. The address above stays the
 * page's subject; this is the second route in. The decisions it carries:
 * - What the visitor wrote is never lost. Fields are controlled, so a failed
 *   send leaves them filled, and the failure names his address as a link.
 * - A sent message replaces the form, so it can't be sent twice by a
 *   second tap; "Write another" brings it back empty.
 * - Native `required`/`type=email` catch the obvious first; the server's
 *   refusals land under the field they name, announced politely.
 * - `website` is a honeypot, off-screen and out of the tab order.
 *
 * Needs JavaScript, so it is hidden without it (`data-needs-js`); the
 * address above works either way (while the address is paused, `email` is
 * null and there is no fallback to offer). The address arrives as a prop: client
 * leaves never import `lib/config`.
 */
export function ContactForm({ email }: Readonly<{ email: string | null }>) {
  const [values, setValues] = useState(EMPTY);
  const [result, setResult] = useState<ContactMessageResult | null>(null);
  const [pending, startTransition] = useTransition();
  const sentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    markJsReady();
  }, []);

  useEffect(() => {
    if (!result) return;
    if (result.ok) {
      sentRef.current?.focus();
    } else if (result.reason === "invalid" && result.fields[0]) {
      // Focus carries the screen reader to the field and its message.
      document.getElementById(`contact-${result.fields[0]}`)?.focus();
    }
  }, [result]);

  const invalid = new Set<ContactField>(
    result && !result.ok && result.reason === "invalid" ? result.fields : [],
  );

  function update(field: ContactField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const website = String(
      new FormData(event.currentTarget).get("website") ?? "",
    );
    startTransition(async () => {
      let next: ContactMessageResult;
      try {
        next = await submitContactMessage({ ...values, website });
      } catch {
        // The action never throws; this is the network dropping.
        next = { ok: false, reason: "failed" };
      }
      setResult(next);
      if (next.ok) setValues(EMPTY);
    });
  }

  if (result?.ok) {
    return (
      <div data-needs-js className="flex flex-col items-start gap-2">
        <p
          ref={sentRef}
          tabIndex={-1}
          role="status"
          className="max-w-[40rem] text-xl leading-[1.4] outline-none"
        >
          {COPY.sent}
        </p>
        <button
          type="button"
          onClick={() => setResult(null)}
          className={cn(
            LABEL,
            "inline-flex min-h-11 cursor-pointer items-center rounded-(--radius) transition-colors hover:text-(--link) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          )}
        >
          {COPY.another}
        </button>
      </div>
    );
  }

  return (
    <form
      data-needs-js
      onSubmit={submit}
      aria-busy={pending || undefined}
      className="flex w-full max-w-[40rem] flex-col gap-5"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          id="contact-name"
          label={COPY.name}
          error={invalid.has("name") ? COPY.invalid.name : undefined}
        >
          {(described) => (
            <Input
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              maxLength={CONTACT_LIMITS.name}
              value={values.name}
              onChange={(event) => update("name", event.target.value)}
              aria-invalid={invalid.has("name") || undefined}
              aria-describedby={described}
              className={FIELD}
            />
          )}
        </Field>
        <Field
          id="contact-email"
          label={COPY.email}
          error={invalid.has("email") ? COPY.invalid.email : undefined}
        >
          {(described) => (
            <Input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              spellCheck={false}
              required
              maxLength={CONTACT_LIMITS.email}
              value={values.email}
              onChange={(event) => update("email", event.target.value)}
              aria-invalid={invalid.has("email") || undefined}
              aria-describedby={described}
              className={FIELD}
            />
          )}
        </Field>
      </div>
      <Field
        id="contact-message"
        label={COPY.message}
        error={invalid.has("message") ? COPY.invalid.message : undefined}
      >
        {(described) => (
          <Textarea
            id="contact-message"
            name="message"
            required
            rows={6}
            maxLength={CONTACT_LIMITS.message}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={invalid.has("message") || undefined}
            aria-describedby={described}
            className={cn(FIELD, "min-h-40 py-2.5")}
          />
        )}
      </Field>

      {/* Honeypot: people never see or reach it. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className="flex flex-col items-start gap-3">
        <Button
          type="submit"
          variant="outline"
          disabled={pending}
          className={cn(
            LABEL,
            "min-h-11 rounded-(--radius) border-border px-5 text-foreground hover:border-(--link) hover:bg-transparent hover:text-(--link) focus-visible:border-ring dark:bg-transparent dark:hover:bg-transparent",
          )}
        >
          {pending ? COPY.sending : COPY.send}
        </Button>
        <p role="status" aria-live="polite" className="max-w-[40rem]">
          {result && !result.ok && result.reason === "failed" ? (
            !email ? (
              EMAIL_PAUSED_COPY.formFailed
            ) : (
              <>
                {COPY.failed}{" "}
                <a
                  href={mailtoHref(email)}
                  className="rounded-(--radius) text-(--link) underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {email}
                </a>
                .
              </>
            )
          ) : null}
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: Readonly<{
  id: string;
  label: string;
  error?: string;
  children: (describedBy: string | undefined) => ReactNode;
}>) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className={LABEL}>
        {label}
      </Label>
      {children(error ? errorId : undefined)}
      {error ? (
        <p id={errorId} className={ERROR}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
