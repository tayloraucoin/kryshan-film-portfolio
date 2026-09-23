import type { ReviewCommentTarget } from "@/lib/review/types";

/**
 * Turns a click into something the page can find again, and back.
 *
 * Preference order for the selector: an explicit `data-review-id` on the
 * element or an ancestor (authors mark the parts they want comments to stick
 * to), then an `id`, then a structural path of `:nth-of-type` steps from the
 * nearest such anchor. Positions are stored as fractions of the target's box,
 * so a pin lands in the same place at any viewport that keeps the element.
 *
 * Pure DOM helpers, client-only by nature. No React in here.
 */
const ATTR = "data-review-id";

function cssEscape(value: string): string {
  return typeof CSS !== "undefined" && "escape" in CSS
    ? CSS.escape(value)
    : value.replace(/[^a-zA-Z0-9_-]/g, "\\$&");
}

function stepFor(el: Element): string {
  const parent = el.parentElement;
  const tag = el.tagName.toLowerCase();
  if (!parent) return tag;
  const siblings = Array.from(parent.children).filter(
    (c) => c.tagName === el.tagName,
  );
  if (siblings.length === 1) return tag;
  return `${tag}:nth-of-type(${siblings.indexOf(el) + 1})`;
}

/** Builds a selector for `el`, anchored at the nearest marked ancestor. */
export function selectorFor(el: Element): string {
  const steps: string[] = [];
  let current: Element | null = el;

  while (current && current !== document.body) {
    const marked = current.getAttribute(ATTR);
    if (marked) {
      steps.unshift(`[${ATTR}="${cssEscape(marked)}"]`);
      return steps.join(" > ");
    }
    if (current.id) {
      steps.unshift(`#${cssEscape(current.id)}`);
      return steps.join(" > ");
    }
    steps.unshift(stepFor(current));
    current = current.parentElement;
  }

  return ["body", ...steps].join(" > ");
}

/** A human label for the target: the marked id, or the tag and a text hint. */
export function labelFor(el: Element): string | undefined {
  const marked = el.closest(`[${ATTR}]`)?.getAttribute(ATTR);
  if (marked) return marked;
  const text = el.textContent?.trim().replace(/\s+/g, " ") ?? "";
  const tag = el.tagName.toLowerCase();
  if (!text) return tag;
  return `${tag}: ${text.length > 40 ? `${text.slice(0, 40)}…` : text}`;
}

/** Describes a click at viewport (`clientX`, `clientY`) on `el`. */
export function describeTarget(
  el: Element,
  clientX: number,
  clientY: number,
): ReviewCommentTarget {
  const rect = el.getBoundingClientRect();
  const x = rect.width > 0 ? (clientX - rect.left) / rect.width : 0;
  const y = rect.height > 0 ? (clientY - rect.top) / rect.height : 0;
  return {
    selector: selectorFor(el),
    x: Math.min(1, Math.max(0, x)),
    y: Math.min(1, Math.max(0, y)),
    label: labelFor(el),
  };
}

/** Where a stored target sits now, in document coordinates, or null if gone. */
export function resolveTarget(
  target: ReviewCommentTarget,
): { left: number; top: number } | null {
  let el: Element | null = null;
  try {
    el = document.querySelector(target.selector);
  } catch {
    return null;
  }
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX + rect.width * target.x,
    top: rect.top + window.scrollY + rect.height * target.y,
  };
}
