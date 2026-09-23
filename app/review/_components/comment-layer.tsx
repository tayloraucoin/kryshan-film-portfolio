"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useReview } from "@/app/review/_components/review-context";
import { Button } from "@/components/primitives/button";
import { Textarea } from "@/components/primitives/textarea";
import { describeTarget, resolveTarget } from "@/lib/review/anchor";
import type { ReviewCommentTarget } from "@/lib/review/types";

type Draft = { target: ReviewCommentTarget; left: number; top: number };
type Pin = {
  id: string;
  index: number;
  left: number;
  top: number;
  pending: boolean;
};

/**
 * Click-to-comment. In comment mode every click on the page (outside the
 * review chrome) is captured, turned into a target by `lib/review/anchor.ts`,
 * and answered with a composer at the click. Saved comments render as
 * numbered pins at the position their selector resolves to now, recomputed on
 * resize and after layout; a pin whose element is gone is simply not drawn
 * and still appears in the list.
 */
export function CommentLayer() {
  const {
    comments,
    pendingIds,
    commentMode,
    setCommentMode,
    add,
    focusId,
    setFocusId,
    setSheetOpen,
  } = useReview();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [body, setBody] = useState("");
  const [pins, setPins] = useState<Pin[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const layoutPins = useCallback(() => {
    const next: Pin[] = [];
    comments.forEach((comment, index) => {
      const pos = resolveTarget(comment.target);
      if (pos)
        next.push({
          id: comment.id,
          index: index + 1,
          ...pos,
          pending: pendingIds.has(comment.id),
        });
    });
    setPins(next);
  }, [comments, pendingIds]);

  useLayoutEffect(() => {
    // Positions depend on layout, so they are measured after paint, never
    // synchronously inside the effect body.
    const raf = requestAnimationFrame(layoutPins);
    window.addEventListener("resize", layoutPins);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", layoutPins);
    };
  }, [layoutPins]);

  // Capture clicks while in comment mode.
  useEffect(() => {
    if (!commentMode) return;
    const onClick = (event: MouseEvent) => {
      const el = event.target as Element | null;
      if (!el || el.closest("[data-review-chrome]")) return;
      event.preventDefault();
      event.stopPropagation();
      setDraft({
        target: describeTarget(el, event.clientX, event.clientY),
        left: event.clientX + window.scrollX,
        top: event.clientY + window.scrollY,
      });
      setBody("");
    };
    document.addEventListener("click", onClick, true);
    document.documentElement.style.cursor = "crosshair";
    return () => {
      document.removeEventListener("click", onClick, true);
      document.documentElement.style.cursor = "";
    };
  }, [commentMode]);

  useEffect(() => {
    if (draft) textareaRef.current?.focus();
  }, [draft]);

  useEffect(() => {
    if (!focusId) return;
    const pin = pins.find((p) => p.id === focusId);
    if (pin)
      window.scrollTo({ top: Math.max(0, pin.top - 160), behavior: "smooth" });
  }, [focusId, pins]);

  const save = async () => {
    if (!draft || !body.trim()) return;
    const target = draft.target;
    const text = body.trim();
    setDraft(null);
    setBody("");
    setCommentMode(false);
    await add(target, text);
  };

  return (
    <div
      data-review-chrome
      className="pointer-events-none absolute inset-0 z-30"
    >
      {pins.map((pin) => (
        <button
          key={pin.id}
          type="button"
          onClick={() => {
            setFocusId(pin.id);
            setSheetOpen(true);
          }}
          title={pin.pending ? "Not yet sent" : "Open comment"}
          className={[
            "pointer-events-auto absolute flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-xs font-semibold shadow-md",
            pin.pending ? "bg-amber-500 text-black" : "bg-blue-600 text-white",
            focusId === pin.id ? "ring-4 ring-blue-600/40" : "",
          ].join(" ")}
          style={{ left: pin.left, top: pin.top }}
        >
          {pin.index}
        </button>
      ))}

      {draft ? (
        <div
          className="dark pointer-events-auto absolute z-40 flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2 rounded-lg border border-border bg-background p-3 text-foreground shadow-xl"
          style={
            {
              left: Math.min(
                draft.left,
                Math.max(16, window.scrollX + window.innerWidth - 336),
              ),
              top: draft.top + 12,
              "--background": "#0f0f10",
              "--foreground": "#f4f4f2",
              "--border": "#2a2a2e",
              "--input": "#3a3a3f",
              "--muted-foreground": "#a3a3a0",
              "--primary": "#f4f4f2",
              "--primary-foreground": "#0f0f10",
              "--ring": "#8a8a86",
            } as React.CSSProperties
          }
        >
          <p className="text-xs text-muted-foreground">
            On: {draft.target.label ?? draft.target.selector}
          </p>
          <Textarea
            ref={textareaRef}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setDraft(null);
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) void save();
            }}
            placeholder="What is wrong, or right, here?"
            rows={3}
            maxLength={4000}
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => setDraft(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => void save()}
              disabled={!body.trim()}
            >
              Save comment
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
