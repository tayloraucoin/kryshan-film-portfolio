import type { Metadata } from "next";
import { REVIEW_KITS } from "@/review/kits";
import { REVIEW_LAYOUTS } from "@/review/layouts";
import { REVIEW_MOCKS } from "@/review/mocks";
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
          Comment on the feeling first and the details last. Which option would
          you want a producer to land on, and which page made you flinch?
        </p>
      </header>
      <FeedbackForm
        kits={REVIEW_KITS.map((k) => ({
          id: k.id,
          label: `Kit ${k.letter} · ${k.name}`,
        }))}
        layouts={REVIEW_LAYOUTS.map((l) => ({
          id: l.id,
          label: `Layout ${l.letter} · ${l.name}`,
        }))}
        mocks={REVIEW_MOCKS.map((m) => ({
          id: m.id,
          label: `Demo ${m.letter} · ${m.name}`,
        }))}
      />
    </main>
  );
}
