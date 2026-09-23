import type { Metadata } from "next";
import { FEEDBACK_SECTIONS } from "@/review/feedback";
import { FeedbackForm } from "./_components/feedback-form";

export const metadata: Metadata = { title: "Feedback" };

export default function ReviewFeedbackPage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-10 sm:px-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          What do you think?
        </h1>
        <p className="text-muted-foreground">
          About ten minutes. Gut feeling first, details after, and your own
          words last. Skip anything you don’t have an opinion on; your answers
          are kept in this browser until you send.
        </p>
      </header>
      <FeedbackForm sections={FEEDBACK_SECTIONS} />
    </main>
  );
}
