import {
  runTransition,
  type TransitionKind,
} from "@/review/mocks/_components/home-d/transition";
import { prefersReducedMotion } from "@/review/mocks/_components/view-transition";

/**
 * Demo D's one open film (D-KRD-6): a module-level store, so the featured
 * grid and the rows share it without a provider, and opening a film
 * anywhere closes whatever was open. Read it with `useOpenFilm`.
 *
 * `openFilm` and `closeFilm` also own what happens around the change:
 * focus moves to the panel on open and back to the tile on close; after
 * the transition the page scrolls so the player sits under both sticky
 * bars (only if it isn't already fully visible); and on close the page
 * returns to where it was, unless the visitor scrolled in between.
 */

/** The one panel's element id; there is never more than one on the page. */
export const FILM_PANEL_ID = "home-d-film";

let openSlug: string | null = null;
const listeners = new Set<() => void>();

export function subscribeOpenFilm(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getOpenFilm(): string | null {
  return openSlug;
}

/** The server (and the first client render) always has nothing open. */
export function getServerOpenFilm(): string | null {
  return null;
}

function setOpenFilm(slug: string | null): void {
  openSlug = slug;
  for (const listener of listeners) listener();
}

type Session = {
  /** The tile that opened the current film; focus returns here. */
  trigger: HTMLElement | null;
  /** Scroll position before the first film opened. */
  before: number;
  /** Where the page was left after the film was revealed. */
  target: number;
};

let session: Session | null = null;

/** Height of both sticky bars: the review bar and Demo D's own. */
function barOffset(): number {
  const reviewBar =
    Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--review-bar-h",
      ),
    ) || 0;
  const demoBar =
    document.querySelector<HTMLElement>("[data-demo-bar]")?.offsetHeight ?? 0;
  return reviewBar + demoBar;
}

function revealPanel(): void {
  const panel = document.getElementById(FILM_PANEL_ID);
  if (!panel || !session) return;
  const player = panel.querySelector("[data-film-player]") ?? panel;
  const offset = barOffset();
  const playerBox = player.getBoundingClientRect();
  if (playerBox.top >= offset && playerBox.bottom <= window.innerHeight) {
    session.target = window.scrollY;
    return;
  }
  const top = Math.max(
    0,
    window.scrollY + panel.getBoundingClientRect().top - offset,
  );
  session.target = top;
  window.scrollTo({
    top,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

/** Open `slug`'s film. `kind` is "swap" when it replaces one on the same line. */
export function openFilm(
  slug: string,
  trigger: HTMLElement,
  kind: TransitionKind,
): void {
  if (session) session.trigger = trigger;
  else session = { trigger, before: window.scrollY, target: window.scrollY };

  const { updated, finished } = runTransition(() => setOpenFilm(slug), kind);
  void updated.then(() => {
    document.getElementById(FILM_PANEL_ID)?.focus({ preventScroll: true });
  });
  void finished.then(revealPanel);
}

export function closeFilm(): void {
  if (openSlug === null) return;
  const closing = session;
  session = null;
  const { updated } = runTransition(() => setOpenFilm(null), "move");
  void updated.then(() => {
    if (!closing) return;
    closing.trigger?.focus({ preventScroll: true });
    if (Math.abs(window.scrollY - closing.target) < 4) {
      window.scrollTo({ top: closing.before, behavior: "auto" });
    } else {
      closing.trigger?.scrollIntoView({ block: "nearest" });
    }
  });
}
