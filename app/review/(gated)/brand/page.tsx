import type { Metadata } from "next";
import Link from "next/link";
import { reviewRoutes } from "@/lib/routes";
import {
  BRAND,
  findPillar,
  KIT_LEADS,
  OVERLAPS,
  PILLARS,
} from "@/review/brand";
import { findReviewMock, REVIEW_MOCKS } from "@/review/mocks";

export const metadata: Metadata = { title: "Your brand" };

/**
 * The brand in one page: essence, the three pillars with their proof, where
 * they meet, and which pillar each kit puts first. The kits are three ways
 * of saying the same brand; this page is what they share. Neutral chrome, no
 * kit, so no kit is favoured by the page that explains them.
 */
export default function ReviewBrandPage() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-14 px-4 py-10 sm:px-6">
      <header className="flex max-w-2xl flex-col gap-4">
        <p className="text-xs tracking-widest text-muted-foreground uppercase">
          Start here · your brand in one page
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {BRAND.essence}
        </h1>
        <p className="text-muted-foreground">{BRAND.essenceNote}</p>
      </header>

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
            Three pillars
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Every word, colour and layout choice should express at least one of
            these. Anything that expresses none of them is decoration.
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

      <section className="flex flex-col gap-5" data-review-id="brand-kits">
        <div className="flex flex-col gap-1">
          <h2 className="text-xs tracking-widest text-muted-foreground uppercase">
            Same brand, three leads
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            The three kits share everything above. What changes is which pillar
            goes first, and so where the design spends its energy. That is the
            real choice in front of you.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {KIT_LEADS.map((lead) => {
            const pillar = findPillar(lead.leads);
            const demo =
              REVIEW_MOCKS.find((mock) => mock.kitId === lead.kitId) ??
              findReviewMock("home-a");
            return (
              <article
                key={lead.kitId}
                data-review-id={`brand-kit-${lead.letter.toLowerCase()}`}
                className="flex flex-col gap-3 rounded-lg border border-border p-5"
              >
                <p className="text-xs tracking-widest text-muted-foreground uppercase">
                  Kit {lead.letter}
                </p>
                <h3 className="text-xl font-semibold tracking-tight">
                  {pillar?.name} leads
                </h3>
                <p className="font-medium">{lead.guardrail}</p>
                <p className="text-sm text-muted-foreground">{lead.tieBreak}</p>
                <p className="text-sm">{lead.bestFor}</p>
                <p className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-2 text-sm">
                  <Link
                    href={reviewRoutes.kit(lead.kitId)}
                    className="underline underline-offset-4"
                  >
                    See kit {lead.letter}
                  </Link>
                  {demo ? (
                    <Link
                      href={reviewRoutes.mock(demo.id, lead.kitId)}
                      className="underline underline-offset-4"
                    >
                      See it on a home page
                    </Link>
                  ) : null}
                </p>
              </article>
            );
          })}
        </div>
      </section>

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
