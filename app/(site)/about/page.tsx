import type { Metadata } from "next";
import Image from "next/image";
import { Frame } from "@/components/composed/media/frame";
import { PhotoFigure } from "@/components/composed/media/photo-figure";
import { PressQuote } from "@/components/composed/press/press-quote";
import { createLinker } from "@/components/composed/site/linked-text";
import { PersonJsonLd } from "@/components/composed/site/person-json-ld";
import { SiteShell } from "@/components/composed/site/site-shell";
import { Testimonial } from "@/components/composed/site/testimonial";
import { ABOUT } from "@/content/about";
import { NAME_LINKS } from "@/content/links";
import { resolvePressQuotes } from "@/content/press";
import { SHOWABLE_PROJECTS } from "@/content/projects";
import { TESTIMONIALS } from "@/content/testimonials";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/config";
import { createPageMetadata } from "@/lib/metadata";
import { siteRoutes } from "@/lib/routes";

export const metadata: Metadata = createPageMetadata({
  title: ABOUT.title,
  description: ABOUT.description,
  path: siteRoutes.about,
});

const H2 =
  "font-heading text-[1.75rem] leading-[1.15] font-semibold font-stretch-88%";

/** The Label step, for the h3s. */
const H3 =
  "text-[0.6875rem] leading-none font-semibold font-stretch-88% tracking-[0.18em] uppercase text-muted-foreground";

/**
 * About (spec §6.4): the person briefly, then the proof, skimmable in under
 * a minute. Recognition comes before the story (D-SITE-12); every section
 * whose content hasn't arrived (a portrait, press, testimonials) renders
 * nothing, not even its heading (D-SITE-20). Static, and no client
 * JavaScript beyond the chrome's.
 */
export default function AboutPage() {
  // Film titles (Jack, Contact Club) link to their pages on this site.
  const linkText = createLinker(
    NAME_LINKS,
    SHOWABLE_PROJECTS.map((project) => ({
      phrase: project.title,
      href: siteRoutes.project(project.slug),
    })),
  );
  // Picks from content/press.ts (validated at build). A held film's quote
  // may appear, since it's about him too; an NDA'd film's never does (§11).
  const press = resolvePressQuotes(ABOUT.pressPicks);
  const testimonials = TESTIMONIALS.filter(
    (testimonial) => testimonial.page === "about",
  ).slice(0, 3);
  const hasAwards = ABOUT.awards.length > 0;
  const hasRecognition = hasAwards || press.length > 0;
  const { portrait } = ABOUT;

  return (
    <SiteShell current="about">
      <PersonJsonLd />
      <div className="flex flex-col gap-16 px-3 pt-8 pb-16 md:gap-20 md:px-6 md:pt-12">
        <section
          className={cn(
            "grid gap-6",
            portrait
              ? "lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-12"
              : "max-w-[60ch]",
          )}
        >
          <h1 className="max-w-[24ch] font-heading text-[2rem] leading-[1.02] font-bold font-stretch-80% md:text-[clamp(2rem,2.6vw,2.5rem)] lg:col-start-1 lg:row-start-1 xl:text-[2.5rem]">
            {ABOUT.opener}
          </h1>
          {/* At ≥1024 the portrait starts on the same line as Recognition's
              second column and is sized to the H1 and bio beside it (24rem,
              4:5 ≈ the text's height), so the opener reads as one block. */}
          {portrait ? (
            <div className="w-full max-w-80 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-[24rem]">
              <Frame ratio="4 / 5">
                <Image
                  src={portrait.src}
                  alt={SITE.name}
                  fill
                  loading="eager"
                  sizes="(min-width: 1024px) 24rem, 20rem"
                  placeholder="blur"
                  className="object-cover"
                />
              </Frame>
            </div>
          ) : null}
          <div className="flex max-w-[68ch] flex-col gap-4 leading-relaxed lg:col-start-1 lg:row-start-2">
            {ABOUT.bio.map((paragraph) => (
              <p key={paragraph}>{linkText(paragraph)}</p>
            ))}
          </div>
        </section>

        {hasRecognition ? (
          <section
            aria-labelledby="recognition"
            className="flex flex-col gap-8"
          >
            <h2 id="recognition" className={H2}>
              {ABOUT.headings.recognition}
            </h2>
            {hasAwards ? (
              <div className="flex flex-col gap-3">
                <h3 className={H3}>{ABOUT.headings.awards}</h3>
                <ul className="flex max-w-[68ch] flex-col gap-2">
                  {ABOUT.awards.map((line) => (
                    <li key={line}>{linkText(line, { repeat: true })}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {press.length > 0 ? (
              <div className="flex flex-col gap-3">
                <h3 className={H3}>{ABOUT.headings.press}</h3>
                <ul className="grid gap-6 md:grid-cols-2">
                  {press.map((quote) => (
                    <li key={quote.id}>
                      <PressQuote item={quote} size="lead" showFilm />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        ) : null}

        {ABOUT.photos.length > 0 ? (
          <section aria-labelledby="on-set" className="flex flex-col gap-6">
            <h2 id="on-set" className={H2}>
              {ABOUT.headings.onSet}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {ABOUT.photos.map((photo) => (
                <PhotoFigure key={photo.caption} photo={photo} />
              ))}
            </div>
          </section>
        ) : null}

        {testimonials.length > 0 ? (
          <section
            aria-labelledby="testimonials"
            className="flex flex-col gap-6"
          >
            <h2 id="testimonials" className={H2}>
              {ABOUT.headings.testimonials}
            </h2>
            <ul className="flex flex-col gap-8">
              {testimonials.map((testimonial) => (
                <li key={testimonial.quote}>
                  <Testimonial testimonial={testimonial} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </SiteShell>
  );
}
