import { flushSync } from "react-dom";

/**
 * The review mocks' one deliberate motion (M-KR-1): a state change wrapped
 * in a same-document view transition, so an expanding cell or row grows from
 * where it was tapped and the rest reflows around it. Under
 * `prefers-reduced-motion: reduce`, or without browser support, the change
 * is applied instantly and the layout is the same.
 *
 * Client-only (reads `window` and `document`); call it from event handlers.
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function changeWithTransition(update: () => void): void {
  if (prefersReducedMotion() || !document.startViewTransition) {
    update();
    return;
  }
  const transition = document.startViewTransition(() => flushSync(update));
  // A skipped transition (tab hidden, viewport resized mid-flight) rejects
  // `ready`; the state change has still happened, so ignore it.
  transition.ready.catch(() => {});
}

/** The duration rule for the transition: 220 ms, out-eased. Render once per page. */
export const VIEW_TRANSITION_CSS =
  "::view-transition-group(*){animation-duration:220ms;animation-timing-function:cubic-bezier(0.2,0.8,0.2,1)}";
