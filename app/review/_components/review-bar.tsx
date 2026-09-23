"use client";

import Link from "next/link";
import { MessageSquarePlus, MessageSquareText } from "lucide-react";
import { useReview } from "@/app/review/_components/review-context";
import { Button } from "@/components/primitives/button";
import { reviewRoutes } from "@/lib/routes";

/**
 * The fixed bar at the top of every review page. It is the review layer's
 * only chrome: a way back to the index, the comment-mode switch, the count
 * of comments on this page, and the feedback form. Marked
 * `data-review-chrome` so comment mode ignores clicks on it.
 */
export function ReviewBar({ roundLabel }: { roundLabel: string | null }) {
  const {
    comments,
    pendingIds,
    backend,
    commentMode,
    setCommentMode,
    setSheetOpen,
  } = useReview();

  return (
    <div
      data-review-chrome
      className="dark sticky top-0 z-40 border-b border-border bg-background/95 text-foreground backdrop-blur"
      style={
        {
          "--background": "#0f0f10",
          "--foreground": "#f4f4f2",
          "--border": "#2a2a2e",
          "--muted": "#1c1c1f",
          "--muted-foreground": "#a3a3a0",
          "--primary": "#f4f4f2",
          "--primary-foreground": "#0f0f10",
          "--ring": "#8a8a86",
          "--input": "#3a3a3f",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-3 py-2 sm:px-4">
        <Link
          href={reviewRoutes.index}
          className="text-sm font-semibold tracking-tight"
        >
          Review
        </Link>
        {roundLabel ? (
          <span className="hidden text-sm text-muted-foreground sm:inline">
            · {roundLabel}
          </span>
        ) : null}
        <span className="ml-auto flex items-center gap-2">
          <span
            className="hidden text-xs text-muted-foreground sm:inline"
            title={
              backend === "connected"
                ? "Comments are being saved"
                : backend === "offline"
                  ? "Backend unreachable: comments stay in this browser until it is"
                  : ""
            }
          >
            {backend === "connected"
              ? "Connected"
              : backend === "offline"
                ? "Offline"
                : ""}
          </span>
          <Button
            type="button"
            size="sm"
            variant={commentMode ? "default" : "outline"}
            aria-pressed={commentMode}
            onClick={() => setCommentMode(!commentMode)}
          >
            <MessageSquarePlus data-icon="inline-start" />
            {commentMode ? "Commenting: click anything" : "Comment"}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setSheetOpen(true)}
          >
            <MessageSquareText data-icon="inline-start" />
            {comments.length}
            {pendingIds.size > 0 ? ` (${pendingIds.size} unsent)` : ""}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            nativeButton={false}
            render={<Link href={reviewRoutes.feedback} />}
          >
            Leave feedback
          </Button>
        </span>
      </div>
    </div>
  );
}
