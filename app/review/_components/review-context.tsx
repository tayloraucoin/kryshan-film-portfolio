"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import {
  addComment,
  loadComments,
  removeComment,
} from "@/app/review/_actions/comments";
import {
  readPending,
  readPendingServer,
  subscribePending,
  writePending,
} from "@/lib/review/pending-store";
import type { ReviewComment, ReviewCommentTarget } from "@/lib/review/types";

/**
 * Review state for one page: the comments on it, whether comment mode is on,
 * and a queue of writes the backend has not confirmed.
 *
 * Nothing a reviewer writes is lost on a failed send. A comment is shown the
 * moment it is written, sent to the backend through the server action, and,
 * if that fails, kept in `localStorage` under this path (`lib/review/
 * pending-store.ts`) and retried on the next load or on Retry. Ids are minted
 * here so the retry is the same write, which the backend treats as a no-op.
 *
 * Two lists, one view: `remote` is what the backend holds (plus comments it
 * has just confirmed); `pending` is the browser's queue. `comments` is the
 * merge. State is keyed by path, so navigation remounts it.
 */
type BackendState = "unknown" | "connected" | "offline";

type ReviewContextValue = {
  path: string;
  comments: ReviewComment[];
  pendingIds: ReadonlySet<string>;
  backend: BackendState;
  commentMode: boolean;
  setCommentMode: (on: boolean) => void;
  sheetOpen: boolean;
  setSheetOpen: (open: boolean) => void;
  focusId: string | null;
  setFocusId: (id: string | null) => void;
  add: (target: ReviewCommentTarget, body: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  retryPending: () => Promise<void>;
};

const ReviewContext = createContext<ReviewContextValue | null>(null);

export function ReviewProvider({ children }: { children: ReactNode }) {
  const path = usePathname();
  return (
    <ReviewState key={path} path={path}>
      {children}
    </ReviewState>
  );
}

function ReviewState({
  path,
  children,
}: {
  path: string;
  children: ReactNode;
}) {
  const pending = useSyncExternalStore(
    subscribePending,
    () => readPending(path),
    readPendingServer,
  );
  const [remote, setRemote] = useState<ReviewComment[]>([]);
  const [backend, setBackend] = useState<BackendState>("unknown");
  const [commentMode, setCommentMode] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [focusId, setFocusId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadComments(path).then((result) => {
      if (cancelled) return;
      if (result.ok) {
        setBackend("connected");
        setRemote(result.data);
      } else {
        setBackend("offline");
      }
    });
    return () => {
      cancelled = true;
    };
  }, [path]);

  const comments = useMemo(() => {
    const known = new Set(remote.map((c) => c.id));
    return [...remote, ...pending.filter((c) => !known.has(c.id))];
  }, [remote, pending]);

  /** Sends one comment; on success it joins `remote`, on failure the queue. */
  const send = useCallback(
    async (comment: ReviewComment): Promise<boolean> => {
      const result = await addComment(comment);
      const queue = readPending(path);
      if (result.ok) {
        setBackend("connected");
        setRemote((current) =>
          current.some((c) => c.id === comment.id)
            ? current
            : [...current, comment],
        );
        writePending(
          path,
          queue.filter((c) => c.id !== comment.id),
        );
        return true;
      }
      if (result.reason === "offline") setBackend("offline");
      if (!queue.some((c) => c.id === comment.id)) {
        writePending(path, [...queue, comment]);
      }
      return false;
    },
    [path],
  );

  const add = useCallback(
    async (target: ReviewCommentTarget, body: string) => {
      const comment: ReviewComment = {
        id: crypto.randomUUID(),
        path,
        body,
        target,
        viewport: { width: window.innerWidth, height: window.innerHeight },
        createdAt: new Date().toISOString(),
      };
      // Queue first so it is visible at once and survives a closed tab.
      writePending(path, [...readPending(path), comment]);
      const ok = await send(comment);
      if (!ok) {
        toast.warning("Saved in this browser only", {
          description: "The backend could not be reached. It will retry.",
        });
      }
    },
    [path, send],
  );

  const remove = useCallback(
    async (id: string) => {
      const queue = readPending(path);
      if (queue.some((c) => c.id === id)) {
        writePending(
          path,
          queue.filter((c) => c.id !== id),
        );
        return;
      }
      setRemote((current) => current.filter((c) => c.id !== id));
      const result = await removeComment(id);
      if (!result.ok) toast.error("Could not delete that comment. Try again.");
    },
    [path],
  );

  const retryPending = useCallback(async () => {
    const queue = readPending(path);
    let failed = 0;
    for (const comment of queue) {
      if (!(await send(comment))) failed += 1;
    }
    if (failed === 0 && queue.length > 0) toast.success("All comments sent.");
  }, [path, send]);

  const value = useMemo<ReviewContextValue>(
    () => ({
      path,
      comments,
      pendingIds: new Set(pending.map((c) => c.id)),
      backend,
      commentMode,
      setCommentMode,
      sheetOpen,
      setSheetOpen,
      focusId,
      setFocusId,
      add,
      remove,
      retryPending,
    }),
    [
      path,
      comments,
      pending,
      backend,
      commentMode,
      sheetOpen,
      focusId,
      add,
      remove,
      retryPending,
    ],
  );

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
}

export function useReview(): ReviewContextValue {
  const value = useContext(ReviewContext);
  if (!value) throw new Error("useReview must be used inside ReviewProvider.");
  return value;
}
