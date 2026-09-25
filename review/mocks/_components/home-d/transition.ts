import { flushSync } from "react-dom";
import { prefersReducedMotion } from "@/review/mocks/_components/view-transition";

/** "move": a film opens, closes or moves line; "swap": same line, new film. */
export type TransitionKind = "move" | "swap";

/**
 * Demo D's one deliberate motion (M-KR-1, M-KR-6): the state change runs
 * inside a same-document view transition so the tiles below the opened film
 * slide and the panel fades. Unlike the shared helper, this one reports
 * when the DOM holds the new state (`updated`, for focus) and when the
 * animation has ended (`finished`, for scrolling), so the open-film
 * orchestration can sequence both. Under reduced motion, or without
 * support, the change is applied at once and both resolve immediately.
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
  if (kind === "swap") root.dataset.demoVt = "swap";
  const transition = document.startViewTransition(() => flushSync(update));
  transition.ready.catch(() => {});
  // A skipped transition rejects its promises; the state change has still
  // happened, so both settle either way.
  const settle = (promise: Promise<unknown>) =>
    promise.then(
      () => undefined,
      () => undefined,
    );
  return {
    updated: settle(transition.updateCallbackDone),
    finished: settle(transition.finished).then(() => {
      delete root.dataset.demoVt;
    }),
  };
}
