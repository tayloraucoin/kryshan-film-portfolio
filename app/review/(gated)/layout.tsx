import { CommentLayer } from "@/app/review/_components/comment-layer";
import { CommentsSheet } from "@/app/review/_components/comments-sheet";
import { ReviewBar } from "@/app/review/_components/review-bar";
import { ReviewProvider } from "@/app/review/_components/review-context";
import { Toaster } from "@/components/primitives/sonner";
import { fetchRoundInfo } from "@/lib/review/backend";

/**
 * The gated review shell. The proxy has admitted the reviewer by the time
 * this renders; this layout only supplies the chrome: bar, comment layer,
 * comment list, toasts. Pages inside decide their own kit scope.
 */
export default async function GatedReviewLayout({
  children,
}: LayoutProps<"/review">) {
  const round = await fetchRoundInfo();

  return (
    <ReviewProvider>
      <div className="relative flex min-h-full flex-1 flex-col">
        <ReviewBar
          roundLabel={
            round.ok ? round.data.label || round.data.clientName : null
          }
        />
        <div className="relative flex-1">
          {children}
          <CommentLayer />
        </div>
      </div>
      <CommentsSheet />
      <Toaster position="bottom-center" />
    </ReviewProvider>
  );
}
