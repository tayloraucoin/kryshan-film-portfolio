"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { markJsReady } from "@/lib/pre-paint-script";

const DONE_MS = 2000;

/**
 * Copy a value, and never claim it worked when it didn't (spec §4.3). One
 * component for the panel's and the detail page's "Copy link" and
 * Contact's "Copy". The decision it carries: the clipboard is used only in
 * a secure context, and every failure ends with the value in the visitor's
 * hands instead. A link opens the share sheet where there is one, or shows
 * the URL selected; Contact selects the address already on the page. A
 * polite status, always in the DOM, says which happened.
 *
 * Needs JavaScript, so it is hidden without it (`data-needs-js`; the
 * pre-paint script marks `<html data-js>`). The value arrives as a prop:
 * client leaves never import `lib/config`.
 */
export function CopyButton({
  value,
  labels,
  onFailure,
  selectTargetId,
  shareTitle,
  className,
  classes,
}: Readonly<{
  value: string;
  /** Idle, done ("Link copied", 2 s) and failed (the status text). */
  labels: Readonly<{ idle: string; done: string; failed: string }>;
  /** "share-or-show" for links; "select" selects `selectTargetId`'s text. */
  onFailure: "share-or-show" | "select";
  selectTargetId?: string;
  shareTitle?: string;
  className?: string;
  classes?: Readonly<{ button?: string; fallback?: string }>;
}>) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");
  const [showValue, setShowValue] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fallback = useRef<HTMLParagraphElement>(null);
  const fallbackId = useId();

  useEffect(() => {
    markJsReady();
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (showValue && fallback.current) selectContents(fallback.current);
  }, [showValue]);

  function announce(text: string) {
    // Clear first so the same words are announced again on a second press.
    setStatus("");
    setTimeout(() => setStatus(text), 50);
  }

  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    try {
      if (!window.isSecureContext || !navigator.clipboard?.writeText) {
        throw new Error("Clipboard unavailable");
      }
      await navigator.clipboard.writeText(value);
      setCopied(true);
      announce(labels.done);
      timer.current = setTimeout(() => {
        setCopied(false);
        setStatus("");
      }, DONE_MS);
    } catch {
      setCopied(false);
      await fail();
    }
  }

  async function fail() {
    if (onFailure === "select") {
      const target = selectTargetId
        ? document.getElementById(selectTargetId)
        : null;
      if (target) selectContents(target);
      announce(labels.failed);
      return;
    }
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: shareTitle, url: value });
        return;
      } catch (error) {
        // Cancelled by the visitor: say nothing, change nothing.
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }
    setShowValue(true);
    if (fallback.current) selectContents(fallback.current);
    announce(labels.failed);
  }

  return (
    <>
      <button
        type="button"
        data-needs-js
        onClick={copy}
        aria-describedby={showValue ? fallbackId : undefined}
        className={cn(
          "inline-flex min-h-11 cursor-pointer items-center rounded-(--radius) text-[0.6875rem] leading-none font-semibold font-stretch-88% tracking-[0.18em] text-muted-foreground uppercase transition-colors",
          "hover:text-foreground",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          classes?.button,
          className,
        )}
      >
        {copied ? labels.done : labels.idle}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {status}
      </span>
      {showValue ? (
        <p
          ref={fallback}
          id={fallbackId}
          className={cn(
            "w-full text-[0.8125rem] font-medium font-stretch-90% tracking-[0.02em] [overflow-wrap:anywhere] text-foreground select-all",
            classes?.fallback,
          )}
        >
          {value}
        </p>
      ) : null}
    </>
  );
}

function selectContents(element: HTMLElement): void {
  const selection = window.getSelection();
  if (!selection) return;
  selection.removeAllRanges();
  const range = document.createRange();
  range.selectNodeContents(element);
  selection.addRange(range);
}
