import { flushSync } from "react-dom";
import {
  announceWork,
  getWorkFilter,
  setWorkFilter,
  setWorkNaming,
} from "@/app/(site)/work/_components/work-filter-store";
import { dismissFilm } from "@/components/composed/work/open-film";
import { runTransition } from "@/components/composed/work/transition";
import { WORK_COPY } from "@/content/site";
import { siteRoutes } from "@/lib/routes";
import {
  sameWorkFilter,
  workFilterKey,
  type WorkFilter,
} from "@/lib/work-filter";

/** Mirror a filter onto `<html>`, where the CSS reads it (SITE-4 ruling 1). */
export function writeWorkAttributes(filter: WorkFilter): void {
  const root = document.documentElement;
  if (filter.role) root.setAttribute("data-work-role", filter.role);
  else root.removeAttribute("data-work-role");
  if (filter.passion) root.setAttribute("data-work-passion", "");
  else root.removeAttribute("data-work-passion");
}

export function clearWorkAttributes(): void {
  const root = document.documentElement;
  root.removeAttribute("data-work-role");
  root.removeAttribute("data-work-passion");
}

/**
 * A filter change (spec §6.2): close any open film, show the new set with
 * the site's one transition, write the URL without adding history, announce
 * the count, and leave focus on the control that was used (or `focusTarget`,
 * when that control disappears, as "Show all" does).
 *
 * The tiles visible after the change are named just before the transition
 * starts, so a leaving tile fades with the page instead of moving (Vesper
 * C4). The URL is written inside the update, so the state and the URL never
 * disagree for a render, with or without motion.
 */
export function changeWorkFilter(
  next: WorkFilter,
  options: Readonly<{
    control: HTMLElement;
    focusTarget?: HTMLElement | null;
    counts: Readonly<Record<string, number>>;
    total: number;
  }>,
): void {
  if (sameWorkFilter(next, getWorkFilter())) return;

  flushSync(() => setWorkNaming(next));
  const { updated } = runTransition(() => {
    dismissFilm();
    window.history.replaceState(null, "", siteRoutes.work(next));
    writeWorkAttributes(next);
    setWorkFilter(next);
  }, "move");

  const shown = options.counts[workFilterKey(next)] ?? 0;
  announceWork(
    next.role || next.passion
      ? WORK_COPY.status.filtered(shown, options.total)
      : WORK_COPY.status.all(options.total),
  );

  void updated.then(() => {
    const target = options.focusTarget ?? options.control;
    if (target.isConnected && document.activeElement !== target) {
      target.focus({ preventScroll: true });
    }
  });
}
