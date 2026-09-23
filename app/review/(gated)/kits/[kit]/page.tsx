import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlaceholderRibbon } from "@/app/review/_components/placeholder-ribbon";
import { KitScope } from "@/components/composed/brand/kit-scope";
import { reviewRoutes } from "@/lib/routes";
import { findKitLead, findPillar } from "@/review/brand";
import { findReviewKit, REVIEW_KITS } from "@/review/kits";
import { Palette } from "./_components/palette";
import { TypeScale } from "./_components/type-scale";

export async function generateMetadata({
  params,
}: PageProps<"/review/kits/[kit]">): Promise<Metadata> {
  const { kit: id } = await params;
  const kit = findReviewKit(id);
  return { title: kit ? `Kit ${kit.letter}` : "Kit" };
}

/**
 * One kit as a live style page: tokens, palette, contrast, type, voice, the
 * never list. Rendered inside the kit's own scope, so what the reviewer sees
 * is the kit itself and not a picture of it. One template for all three.
 */
export default async function ReviewKitPage({
  params,
}: PageProps<"/review/kits/[kit]">) {
  const { kit: id } = await params;
  const kit = findReviewKit(id);
  if (!kit) notFound();

  const others = REVIEW_KITS.filter((k) => k.id !== kit.id);
  const lead = findKitLead(kit.id);
  const pillar = lead ? findPillar(lead.leads) : undefined;

  return (
    <KitScope kit={kit} className="min-h-full">
      <PlaceholderRibbon placeholder={kit.placeholder} />
      <main className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-10 sm:px-6">
        <header
          className="flex flex-col gap-3"
          data-review-id={`kit-${kit.id}-header`}
        >
          <p className="text-xs tracking-widest text-muted-foreground uppercase">
            Kit {kit.letter} · {kit.name}
          </p>
          <h1 className="font-heading max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {kit.tagline}
          </h1>
          <p className="max-w-2xl text-muted-foreground">{kit.thesis}</p>
          {lead && pillar ? (
            <p className="max-w-2xl text-sm">
              <span className="font-medium">
                {pillar.name} leads: {lead.guardrail}
              </span>{" "}
              <Link
                href={reviewRoutes.brand}
                className="underline underline-offset-4"
              >
                What the pillars are
              </Link>
            </p>
          ) : null}
        </header>

        <section
          className="flex flex-col gap-4"
          data-review-id={`kit-${kit.id}-colour`}
        >
          <h2 className="text-xs tracking-widest text-muted-foreground uppercase">
            Colour
          </h2>
          <Palette kit={kit} />
        </section>

        <section
          className="flex flex-col gap-4"
          data-review-id={`kit-${kit.id}-type`}
        >
          <h2 className="text-xs tracking-widest text-muted-foreground uppercase">
            Type and voice
          </h2>
          <TypeScale kit={kit} />
        </section>

        <section
          className="flex flex-col gap-4"
          data-review-id={`kit-${kit.id}-never`}
        >
          <h2 className="text-xs tracking-widest text-muted-foreground uppercase">
            Never
          </h2>
          <ul className="max-w-2xl list-disc pl-5 text-sm text-muted-foreground">
            {kit.never.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <nav className="flex gap-4 border-t border-border pt-6 text-sm">
          {others.map((k) => (
            <a
              key={k.id}
              href={reviewRoutes.kit(k.id)}
              className="underline underline-offset-4"
            >
              Kit {k.letter}
            </a>
          ))}
        </nav>
      </main>
    </KitScope>
  );
}
