import type { Metadata } from "next";
import Link from "next/link";
import { reviewRoutes } from "@/lib/routes";
import {
  BRAND,
  CHOSEN_KIT_LEAD,
  KIT_LEADS,
  OVERLAPS,
  PILLARS,
} from "@/review/brand";
import { REVIEW_MOCKS } from "@/review/mocks";

export const metadata: Metadata = { title: "Your brand" };

/**
 * The brand in one page: essence, what changed after his review, the three
 * pillars in his order with their proof, where they meet, and the kit he
 * chose (04 Step 8). Kits B and C are listed as what the round showed.
 * Neutral chrome, no kit, so the page that explains the brand is not itself
 * a kit.
 */
export default function ReviewBrandPage() {
  const chosenKitId = CHOSEN_KIT_LEAD?.kitId;
  const chosenDemo = REVIEW_MOCKS.find((mock) => mock.kitId === chosenKitId);

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-14 px-4 py-10 sm:px-6">
      <header className="flex max-w-2xl flex-col gap-4">
        <p className="text-xs tracking-widest text-muted-foreground uppercase">
          Your brand in one page
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {BRAND.essence}
        </h1>
        <p className="text-muted-foreground">{BRAND.essenceNote}</p>
      </header>

      <section
        className="flex max-w-3xl flex-col gap-2 rounded-lg border border-border bg-muted p-5"
        data-review-id="brand-amendment"
      >
        <h2 className="text-xs tracking-widest text-muted-foreground uppercase">
          {BRAND.amendment.title}
        </h2>
        <p>{BRAND.amendment.body}</p>
      </section>

      <section className="flex flex-col gap-3" data-review-id="brand-why">
        <h2 className="text-xs tracking-widest text-muted-foreground uppercase">
          Why you, to someone hiring
        </h2>
        <p className="max-w-3xl text-xl leading-snug">{BRAND.why}</p>
        <p className="text-sm text-muted-foreground">{BRAND.whyNote}</p>
      </section>

      <section className="flex flex-col gap-5" data-review-id="brand-pillars">
        <div className="flex flex-col gap-1">
          <h2 className="text-xs tracking-widest text-muted-foreground uppercase">
            Three pillars, in your order
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Every word, colour and layout choice should express at least one of
            these. Anything that expresses none of them is decoration. Anything
            that breaks a “but not” is a mistake.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.id}
              data-review-id={`brand-pillar-${pillar.id}`}
              className="flex flex-col gap-3 rounded-lg border border-border p-5"
            >
              <h3 className="text-2xl font-semibold tracking-tight">
                {pillar.name}
              </h3>
              <p className="text-sm font-medium">{pillar.guardrail}</p>
              <p>{pillar.meaning}</p>
              <ul className="mt-auto flex flex-col gap-1.5 border-t border-border pt-3 text-sm text-muted-foreground">
                {pillar.proof.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <ul className="grid gap-2 text-sm sm:grid-cols-3">
          {OVERLAPS.map((overlap) => (
            <li key={overlap.pair} className="rounded-md bg-muted px-3 py-2">
              <span className="text-muted-foreground">{overlap.pair}: </span>
              <span className="font-medium">{overlap.line}</span>
            </li>
          ))}
        </ul>
      </section>

      {CHOSEN_KIT_LEAD ? (
        <section className="flex flex-col gap-5" data-review-id="brand-kits">
          <div className="flex flex-col gap-1">
            <h2 className="text-xs tracking-widest text-muted-foreground uppercase">
              Your kit
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              The three kits shared everything above and put a different pillar
              first. You chose kit {CHOSEN_KIT_LEAD.letter}.
            </p>
          </div>
          <article
            data-review-id={`brand-kit-${CHOSEN_KIT_LEAD.letter.toLowerCase()}`}
            className="flex max-w-2xl flex-col gap-3 rounded-lg border border-border p-5"
          >
            <p className="text-xs tracking-widest text-muted-foreground uppercase">
              Kit {CHOSEN_KIT_LEAD.letter}
            </p>
            <h3 className="text-xl font-semibold tracking-tight">
              {CHOSEN_KIT_LEAD.lead} leads
            </h3>
            <p className="font-medium">{CHOSEN_KIT_LEAD.guardrail}</p>
            <p className="text-sm text-muted-foreground">
              {CHOSEN_KIT_LEAD.tieBreak}
            </p>
            <p className="text-sm">{CHOSEN_KIT_LEAD.bestFor}</p>
            <p className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-2 text-sm">
              <Link
                href={reviewRoutes.kit(CHOSEN_KIT_LEAD.kitId)}
                className="underline underline-offset-4"
              >
                See kit {CHOSEN_KIT_LEAD.letter}
              </Link>
              {chosenDemo ? (
                <Link
                  href={reviewRoutes.mock(chosenDemo.id, CHOSEN_KIT_LEAD.kitId)}
                  className="underline underline-offset-4"
                >
                  See it on a home page
                </Link>
              ) : null}
            </p>
          </article>
          <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>Also shown in the round:</span>
            {KIT_LEADS.filter((lead) => !lead.chosen).map((lead) => (
              <Link
                key={lead.kitId}
                href={reviewRoutes.kit(lead.kitId)}
                className="underline underline-offset-4"
              >
                Kit {lead.letter} ({lead.lead} led)
              </Link>
            ))}
          </p>
        </section>
      ) : null}

      <section
        className="grid gap-8 border-t border-border pt-8 md:grid-cols-2"
        data-review-id="brand-position"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-xs tracking-widest text-muted-foreground uppercase">
            Where you sit
          </h2>
          <p>{BRAND.whereYouSit}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xs tracking-widest text-muted-foreground uppercase">
            Never
          </h2>
          <ul className="flex flex-wrap gap-2 text-sm">
            {BRAND.notYou.map((word) => (
              <li
                key={word}
                className="rounded-full border border-border px-3 py-1"
              >
                {word}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <p className="flex flex-wrap gap-4 border-t border-border pt-6 text-sm">
        <Link
          href={reviewRoutes.index}
          className="underline underline-offset-4"
        >
          Back to the three options
        </Link>
      </p>
    </main>
  );
}
