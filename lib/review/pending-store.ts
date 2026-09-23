import type { ReviewComment } from "@/lib/review/types";

/**
 * The browser-side queue of comments the backend has not confirmed, one list
 * per review page, in `localStorage`.
 *
 * Exposed as an external store so React reads it through
 * `useSyncExternalStore`: the server snapshot is always empty, the client
 * snapshot is the stored list, and hydration never sees two different
 * counts. Snapshots are cached by their raw string so an unchanged queue is
 * referentially stable.
 *
 * Client-only by nature; every function guards `window` so the module can be
 * imported from a component that also renders on the server.
 */
const PREFIX = "review:pending:";
const EMPTY: ReviewComment[] = [];
const listeners = new Set<() => void>();
let cache: { key: string; raw: string | null; value: ReviewComment[] } | null =
  null;

function keyFor(path: string): string {
  return `${PREFIX}${path}`;
}

export function subscribePending(listener: () => void): () => void {
  listeners.add(listener);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", listener);
  }
  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", listener);
    }
  };
}

export function readPending(path: string): ReviewComment[] {
  if (typeof window === "undefined") return EMPTY;
  const key = keyFor(path);
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    return EMPTY;
  }
  if (cache && cache.key === key && cache.raw === raw) return cache.value;
  let value: ReviewComment[] = EMPTY;
  if (raw) {
    try {
      value = JSON.parse(raw) as ReviewComment[];
    } catch {
      value = EMPTY;
    }
  }
  cache = { key, raw, value };
  return value;
}

/** The server's view: nothing queued. */
export function readPendingServer(): ReviewComment[] {
  return EMPTY;
}

export function writePending(path: string, items: ReviewComment[]): void {
  if (typeof window === "undefined") return;
  try {
    if (items.length === 0) window.localStorage.removeItem(keyFor(path));
    else window.localStorage.setItem(keyFor(path), JSON.stringify(items));
  } catch {
    // Private mode or blocked storage: the write is lost, and the caller has
    // already told the reviewer the comment is browser-only.
  }
  for (const listener of listeners) listener();
}

/** Every queued comment across all pages, for the feedback form's count. */
export function countPendingEverywhere(): number {
  if (typeof window === "undefined") return 0;
  try {
    let n = 0;
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const key = window.localStorage.key(i);
      if (key?.startsWith(PREFIX)) {
        n += (JSON.parse(window.localStorage.getItem(key) ?? "[]") as unknown[])
          .length;
      }
    }
    return n;
  } catch {
    return 0;
  }
}
