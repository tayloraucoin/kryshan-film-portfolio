"use client";

import { Trash2 } from "lucide-react";
import { useReview } from "@/app/review/_components/review-context";
import { Button } from "@/components/primitives/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/primitives/sheet";

/** The list of comments on this page, with jump-to and delete. */
export function CommentsSheet() {
  const {
    comments,
    pendingIds,
    backend,
    sheetOpen,
    setSheetOpen,
    setFocusId,
    remove,
    retryPending,
  } = useReview();

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent
        side="right"
        data-review-chrome
        className="dark flex flex-col gap-4 overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>Comments on this page</SheetTitle>
          <SheetDescription>
            {comments.length === 0
              ? "None yet. Turn on Comment and click anything."
              : `${comments.length} comment${comments.length === 1 ? "" : "s"}.`}
          </SheetDescription>
        </SheetHeader>

        {pendingIds.size > 0 ? (
          <div className="flex items-center justify-between gap-2 rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm">
            <span>
              {pendingIds.size} not yet sent
              {backend === "offline" ? " (backend unreachable)" : ""}.
            </span>
            <Button
              type="button"
              size="xs"
              variant="outline"
              onClick={() => void retryPending()}
            >
              Retry
            </Button>
          </div>
        ) : null}

        <ol className="flex flex-col gap-3 px-4 pb-4">
          {comments.map((comment, index) => (
            <li
              key={comment.id}
              className="flex flex-col gap-1 rounded-md border border-border p-3 text-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <button
                  type="button"
                  className="text-left text-xs text-muted-foreground hover:underline"
                  onClick={() => {
                    setFocusId(comment.id);
                    setSheetOpen(false);
                  }}
                >
                  #{index + 1} ·{" "}
                  {comment.target.label ?? comment.target.selector}
                </button>
                <Button
                  type="button"
                  size="icon-xs"
                  variant="ghost"
                  aria-label="Delete comment"
                  onClick={() => void remove(comment.id)}
                >
                  <Trash2 />
                </Button>
              </div>
              <p className="whitespace-pre-wrap">{comment.body}</p>
              {pendingIds.has(comment.id) ? (
                <span className="text-xs text-amber-500">Not yet sent</span>
              ) : null}
            </li>
          ))}
        </ol>
      </SheetContent>
    </Sheet>
  );
}
