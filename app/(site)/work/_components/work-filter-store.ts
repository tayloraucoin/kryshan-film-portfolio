import { useSyncExternalStore } from "react";
import { ALL_WORK, type WorkFilter } from "@/lib/work-filter";

/**
 * Work's filter state, shared by the filter controls and the grid without a
 * provider. `filter` is what the page shows; `naming` is the filter whose
 * tiles carry view-transition names, set to the next filter just before a
 * change starts, so only tiles visible after the change are named.
 *
 * What the visitor *sees* is styled from `<html data-work-role>` and
 * `data-work-passion`, never from this state (SITE-4 ruling 2); this state
 * drives the ARIA attributes, the status, the hrefs and where an open film
 * is inserted. The server snapshot is All. Like the open-film store, it
 * resets to All when nothing subscribes (the page unmounted).
 */
type State = Readonly<{
  filter: WorkFilter;
  naming: WorkFilter;
  /** The polite status: empty until the first change. */
  announcement: string;
}>;

const INITIAL: State = {
  filter: ALL_WORK,
  naming: ALL_WORK,
  announcement: "",
};

let state: State = INITIAL;
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) state = INITIAL;
  };
}

function emit(): void {
  for (const listener of listeners) listener();
}

export function getWorkFilter(): WorkFilter {
  return state.filter;
}

/** Name the tiles of `next` for the coming transition. */
export function setWorkNaming(next: WorkFilter): void {
  state = { ...state, naming: next };
  emit();
}

/** Show `next` (naming follows). No announcement: for syncing to the URL. */
export function setWorkFilter(next: WorkFilter): void {
  state = { ...state, filter: next, naming: next };
  emit();
}

/** Announce `text` in the status. Cleared first, so the same words are read again. */
export function announceWork(text: string): void {
  state = { ...state, announcement: "" };
  emit();
  setTimeout(() => {
    state = { ...state, announcement: text };
    emit();
  }, 50);
}

export function useWorkFilter(): State {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => INITIAL,
  );
}
