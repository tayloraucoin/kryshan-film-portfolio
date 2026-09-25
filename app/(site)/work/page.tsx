import type { Metadata } from "next";
import { CreditsList } from "@/app/(site)/work/_components/credits-list";
import { WorkFilters } from "@/app/(site)/work/_components/work-filters";
import { WorkGrid } from "@/app/(site)/work/_components/work-grid";
import { EmailHandOff } from "@/components/composed/site/email-hand-off";
import { SiteShell } from "@/components/composed/site/site-shell";
import { toFilm } from "@/components/composed/work/film";
import { RELEASED_CREDITS } from "@/content/credits";
import { workOrder } from "@/content/projects";
import { CHROME, SOCIALS, WORK_COPY } from "@/content/site";
import { WORK } from "@/content/work";
import { SITE } from "@/lib/config";
import { createPageMetadata } from "@/lib/metadata";
import { siteRoutes } from "@/lib/routes";
import {
  matchesWorkFilter,
  WORK_FILTERS,
  workFilterKey,
} from "@/lib/work-filter";

export const metadata: Metadata = createPageMetadata({
  title: WORK.h1,
  description: WORK.description || SITE.description,
  // The canonical never carries the filter.
  path: siteRoutes.work(),
});

const H2 =
  "font-heading text-[1.75rem] leading-[1.15] font-semibold font-stretch-88%";

/**
 * Work (spec §6.2): every showable film, arranged by role and filterable
 * by passion work (SITE-4a), then the credits he can't show as films, then
 * his email. One static page: the query is never read on the server. The
 * arrangement and filter are drawn before first paint from `<html>`
 * attributes the pre-paint script sets (SITE-4, M-SITE-5, M-SITE-8).
 */
export default function WorkPage() {
  const films = workOrder().map(toFilm);
  const total = films.length;
  const counts = Object.fromEntries(
    WORK_FILTERS.map((filter) => [
      workFilterKey(filter),
      films.filter((film) => matchesWorkFilter(film, filter)).length,
    ]),
  );
  const empty = WORK_FILTERS.filter(
    (filter) => counts[workFilterKey(filter)] === 0,
  );
  const imdb = SOCIALS.find((social) => social.label === "IMDb");
  const context = WORK.credits.context?.(RELEASED_CREDITS.length);
  const hasCredits = RELEASED_CREDITS.length > 0;

  return (
    <SiteShell current="work" skipTo="work">
      <div className="flex flex-col gap-16 pt-6 pb-16 md:gap-20 md:pt-8">
        <div className="flex flex-col gap-6">
          <header className="flex flex-col gap-3 px-3 md:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <div className="flex items-baseline gap-4">
              <h1 className="font-heading text-[2rem] leading-[1.02] font-bold font-stretch-80% md:text-[clamp(2rem,2.6vw,2.5rem)] xl:text-[2.5rem]">
                {WORK.h1}
              </h1>
              <p className="text-[0.8125rem] font-medium font-stretch-90% tracking-[0.02em] text-muted-foreground">
                {WORK_FILTERS.map((filter) => {
                  const key = workFilterKey(filter);
                  const shown = counts[key] ?? 0;
                  return (
                    <span key={key} data-work-count={key}>
                      {filter.passion
                        ? WORK.count.filtered(shown, total)
                        : WORK.count.all(total)}
                    </span>
                  );
                })}
              </p>
            </div>
            <WorkFilters counts={counts} total={total} />
          </header>
          {hasCredits ? (
            <p className="-mt-3 px-3 md:px-6">
              <a
                href="#credits"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-(--radius) text-[0.6875rem] leading-none font-semibold font-stretch-88% tracking-[0.18em] text-(--link) uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {WORK_COPY.credits.jump}
                <span aria-hidden="true">↓</span>
              </a>
            </p>
          ) : null}
          <WorkGrid
            films={films}
            email={SITE.email}
            counts={counts}
            total={total}
            empty={empty}
          />
        </div>

        {WORK.cantShow.body ? (
          <section
            aria-labelledby="cant-show"
            className="flex flex-col gap-3 px-3 md:px-6"
          >
            <h2 id="cant-show" className={H2}>
              {WORK.cantShow.heading}
            </h2>
            <p className="max-w-[60ch] leading-relaxed">{WORK.cantShow.body}</p>
          </section>
        ) : null}

        <div className="flex flex-col gap-10 px-3 md:px-6">
          {hasCredits ? (
            <section
              id="credits"
              aria-labelledby="credits-heading"
              className="flex scroll-mt-[calc(var(--bar-h)+1rem)] flex-col gap-4"
            >
              <h2 id="credits-heading" className={H2}>
                {WORK.credits.heading}
              </h2>
              {context ? (
                <p className="max-w-[60ch] leading-relaxed text-muted-foreground">
                  {context}
                </p>
              ) : null}
              <CreditsList
                credits={RELEASED_CREDITS}
                summary={WORK_COPY.credits.all(RELEASED_CREDITS.length)}
              />
              {imdb ? (
                <p>
                  <a
                    href={imdb.href}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex min-h-11 items-center rounded-(--radius) text-sm font-semibold text-(--link) underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {WORK_COPY.credits.imdb}
                    <span className="sr-only">{CHROME.newTab}</span>
                  </a>
                </p>
              ) : null}
            </section>
          ) : null}
          <EmailHandOff
            email={SITE.email}
            sentence={WORK.handOff || undefined}
          />
        </div>
      </div>
    </SiteShell>
  );
}
