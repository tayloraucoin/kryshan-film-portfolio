import { flushSync } from "react-dom";

/** "move": a film opens, closes or moves line; "swap": same line, new film. */
export type TransitionKind = "move" | "swap";

/** Client-only: reads `window`. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * The site's one deliberate motion (M-KR-1, M-KR-6, D-SITE-21): a state
 * change inside a same-document view transition, so the tiles below an
 * opened film slide and the panel fades. It reports when the DOM holds the
 * new state (`updated`, for focus) and when the animation has ended
 * (`finished`, for scrolling). Under reduced motion, or without support,
 * the change applies at once and both resolve immediately. The timing is
 * in `app/globals.css` ("Film components"); a swap sets
 * `html[data-film-vt=swap]` for its shorter duration.
 */
export function runTransition(
  update: () => void,
  kind: TransitionKind,
): { updated: Promise<void>; finished: Promise<void> } {
  if (prefersReducedMotion() || !document.startViewTransition) {
    flushSync(update);
    const done = Promise.resolve();
    return { updated: done, finished: done };
  }
  const root = document.documentElement;
  if (kind === "swap") root.dataset.filmVt = "swap";
  const transition = document.startViewTransition(() => flushSync(update));
  transition.ready.catch(() => {});
  // A skipped transition (a hidden tab, a resize mid-flight) rejects its
  // promises; the state change has still happened, so both settle anyway.
  const settle = (promise: Promise<unknown>) =>
    promise.then(
      () => undefined,
      () => undefined,
    );
  return {
    updated: settle(transition.updateCallbackDone),
    finished: settle(transition.finished).then(() => {
      delete root.dataset.filmVt;
    }),
  };
}
