import type { Metadata } from "next";
import { PhotoFigure } from "@/components/composed/media/photo-figure";
import { EmailHandOff } from "@/components/composed/site/email-hand-off";
import { createLinker } from "@/components/composed/site/linked-text";
import { SiteShell } from "@/components/composed/site/site-shell";
import { Testimonial } from "@/components/composed/site/testimonial";
import { NAME_LINKS } from "@/content/links";
import { TEACHING } from "@/content/teaching";
import { TESTIMONIALS } from "@/content/testimonials";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/config";
import { createPageMetadata } from "@/lib/metadata";
import { siteRoutes } from "@/lib/routes";

export const metadata: Metadata = createPageMetadata({
  title: TEACHING.title,
  description: TEACHING.description,
  path: siteRoutes.teaching,
});

const H2 =
  "font-heading text-[1.75rem] leading-[1.15] font-semibold font-stretch-88%";

/**
 * A block spans the parent's three rows (heading · body · facts) on a
 * subgrid at ≥1024, so the three headings share a line and the three bodies
 * start on one line even when a heading wraps. Below, the blocks stack.
 */
const BLOCK =
  "flex flex-col gap-4 lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:gap-y-4";

/**
 * Teaching (spec §6.5): what a class with him produces, where he teaches,
 * the programs and camps he has run, how coaching starts, and who vouches
 * for him. Photos and testimonials appear only once he has sent them with
 * consent; until then their sections don't exist (D-SITE-20). Static.
 */
export default function TeachingPage() {
  const linkText = createLinker(NAME_LINKS);
  const { blocks, openerPhoto, roomPhotos } = TEACHING;
  const testimonials = TESTIMONIALS.filter(
    (testimonial) => testimonial.page === "teaching",
  ).slice(0, 4);

  return (
    <SiteShell current="teaching">
      <div className="flex flex-col gap-16 px-3 pt-8 pb-16 md:gap-20 md:px-6 md:pt-12">
        <section
          className={cn(
            "grid gap-6",
            openerPhoto &&
              "lg:grid-cols-[minmax(0,60ch)_minmax(0,1fr)] lg:items-start lg:gap-x-12",
          )}
        >
          <div className="flex max-w-[60ch] flex-col gap-4">
            <h1 className="font-heading text-[2rem] leading-[1.02] font-bold font-stretch-80% md:text-[clamp(2rem,2.6vw,2.5rem)] xl:text-[2.5rem]">
              {TEACHING.h1}
            </h1>
            {TEACHING.opener ? (
              <p className="leading-relaxed">{linkText(TEACHING.opener)}</p>
            ) : null}
          </div>
          {openerPhoto ? (
            <PhotoFigure
              photo={openerPhoto}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          ) : null}
        </section>

        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-3 lg:grid-rows-[auto_auto_auto] lg:gap-x-10 lg:gap-y-4">
          <section aria-labelledby="where-i-teach" className={BLOCK}>
            <h2 id="where-i-teach" className={H2}>
              {blocks.whereITeach.heading}
            </h2>
            <ul className="flex flex-col gap-2">
              {blocks.whereITeach.items.map((item) => (
                <li key={item}>{linkText(item, { repeat: true })}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="programs" className={BLOCK}>
            <h2 id="programs" className={H2}>
              {blocks.programs.heading}
            </h2>
            <ul className="flex flex-col gap-2">
              {blocks.programs.items.map((item) => (
                <li key={item}>{linkText(item, { repeat: true })}</li>
              ))}
            </ul>
            {blocks.programs.factsLine ? (
              <p className="text-sm text-muted-foreground">
                {blocks.programs.factsLine}
              </p>
            ) : null}
          </section>
          <section aria-labelledby="coaching" className={BLOCK}>
            <h2 id="coaching" className={H2}>
              {blocks.coaching.heading}
            </h2>
            <p className="max-w-[60ch] leading-relaxed">
              {blocks.coaching.body}
            </p>
          </section>
        </div>

        {roomPhotos.length > 0 ? (
          <section className="grid gap-6 md:grid-cols-3">
            {roomPhotos.map((photo) => (
              <PhotoFigure key={photo.caption} photo={photo} />
            ))}
          </section>
        ) : null}

        {testimonials.length > 0 ? (
          <section
            aria-labelledby="testimonials"
            className="flex flex-col gap-6"
          >
            <h2 id="testimonials" className={H2}>
              {TEACHING.testimonialsHeading}
            </h2>
            <ul className="grid gap-8 lg:grid-cols-2 lg:gap-x-12">
              {testimonials.map((testimonial) => (
                <li key={testimonial.quote}>
                  <Testimonial
                    testimonial={testimonial}
                    className="max-w-[52ch]"
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <EmailHandOff email={SITE.email} sentence={TEACHING.handOff} />
      </div>
    </SiteShell>
  );
}
