import type { Metadata } from "next";
import { FeedbackForm } from "@/app/review/(gated)/feedback/_components/feedback-form";
import { FINAL_SECTIONS, FINAL_TERMS } from "@/review/final";

export const metadata: Metadata = { title: "Final review" };

/**
 * The final review: the last round of changes included in the build, asked
 * page by page on the live pages, before the site moves to his domain. The
 * terms (what a round costs after this, the admin panel) are stated before
 * the first question so nobody reads them after sending.
 */
export default function FinalReviewPage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-10 sm:px-6">
      <header className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">Final review</h1>
        <p>
          The site is built. This is the last round of changes included in what
          you’ve paid for, so put everything you want changed here, in one go.
          Go through it page by page, and check every page on your phone as well
          as a computer.
        </p>
        <div
          className="flex flex-col gap-2 rounded-lg border border-foreground/20 bg-muted/60 p-4 text-sm"
          data-review-id="final-terms"
        >
          <p className="font-medium">After you send this</p>
          <ul className="flex list-disc flex-col gap-1 pl-5 text-muted-foreground">
            <li>
              I make everything on this form in one pass and tell you when it’s
              up.
            </li>
            <li>
              Then the site moves onto kryshanrandel.com, and you get the guide
              to making changes yourself.
            </li>
            <li>
              Changes after this are a paid round: {FINAL_TERMS.smallRound} for
              a small one (text edits, swapping photos),{" "}
              {FINAL_TERMS.standardRound} for a standard one (new sections,
              layout changes, a new page). Mistakes of mine, like a wrong credit
              or a broken link, I fix free for {FINAL_TERMS.mistakesWindow}{" "}
              after it goes live.{" "}
              <a
                href={FINAL_TERMS.pricingUrl}
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline underline-offset-4"
              >
                The prices, in full
              </a>
            </li>
            <li>
              If you’d rather edit words and photos through a login than through
              the guide, the admin panel add-on ({FINAL_TERMS.adminPanel}) gives
              you one. Most people do fine with the guide. It’s listed on{" "}
              <a
                href={FINAL_TERMS.pricingUrl}
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline underline-offset-4"
              >
                the same page
              </a>
              ; tell me in the last box if you want it.
            </li>
          </ul>
        </div>
        <p className="text-muted-foreground">
          The links under each heading open that page in a new tab. Your answers
          are kept in this browser until you send, and you can come back and
          send a correction afterwards.
        </p>
      </header>
      <FeedbackForm sections={FINAL_SECTIONS} variant="final" />
    </main>
  );
}
