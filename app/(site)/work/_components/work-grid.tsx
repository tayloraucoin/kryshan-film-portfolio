"use client";

import { useLayoutEffect } from "react";
import { changeWorkFilter } from "@/app/(site)/work/_components/change-work-filter";
import { useWorkFilter } from "@/app/(site)/work/_components/work-filter-store";
import type { Film } from "@/components/composed/work/film";
import { FilmGrid } from "@/components/composed/work/film-grid";
import { WORK_COPY } from "@/content/site";
import { WORK } from "@/content/work";
import {
  ALL_WORK,
  arrangeWork,
  matchesWorkFilter,
  workFilterKey,
  type WorkFilter,
} from "@/lib/work-filter";

/** The Label step: Archivo 600, 11 px, width 88, tracking 18%, uppercase. */
const LABEL =
  "text-[0.6875rem] leading-none font-semibold font-stretch-88% tracking-[0.18em] uppercase";

/**
 * Work's grid (spec §6.2, SITE-4a): every showable film, arranged by the
 * chosen role (its films first, then "The rest", each in `workOrder()`),
 * in SITE-3's `FilmGrid`. Only the passion chip hides tiles.
 *
 * The decision it carries: the first paint is arranged, and after that the
 * DOM *is* the arrangement. The server renders `workOrder()`; before
 * hydration, CSS draws the arrangement from `<html data-work-role>` with
 * `order` (app/globals.css). Once this leaf has rendered the films in
 * arranged order it sets `<html data-work-arranged>`, which switches the
 * `order` rules off, so focus order, reading order and the open-film
 * panel's line walk all follow what is on screen (M-SITE-8).
 *
 * The empty line exists only if no passion work exists at all (known at
 * build); "Show all" hands focus to the "Featured" link.
 */
export function WorkGrid({
  films,
  email,
  counts,
  total,
  empty,
}: Readonly<{
  films: ReadonlyArray<Film>;
  email: string;
  counts: Readonly<Record<string, number>>;
  total: number;
  /** The combinations with no match. */
  empty: ReadonlyArray<WorkFilter>;
}>) {
  const { filter, naming } = useWorkFilter();
  const { first, rest } = arrangeWork(films, filter.role);
  const isVisible = (film: Film) => matchesWorkFilter(film, filter);
  const showDivider =
    first.some(isVisible) && rest.some(isVisible) && Boolean(filter.role);

  // The DOM now matches the arrangement `<html>` asks for: hand over from CSS order.
  useLayoutEffect(() => {
    const root = document.documentElement;
    const asked = root.getAttribute("data-work-role") ?? undefined;
    if (asked === filter.role) root.setAttribute("data-work-arranged", "");
  });

  return (
    <div data-work-grid>
      <FilmGrid
        id="work"
        films={[...first, ...rest]}
        email={email}
        isVisible={isVisible}
        isNamed={(film) => matchesWorkFilter(film, naming)}
        divider={{
          ...(filter.role ? { after: first[first.length - 1]?.slug } : {}),
          show: showDivider,
          node: (
            <p className="flex items-center gap-4 pt-4 pb-1">
              <span className={`${LABEL} text-muted-foreground`}>
                {WORK.arrange.rest}
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-border/40" />
            </p>
          ),
        }}
        preloadFirst
      />
      {empty.map((combination) => (
        <div
          key={workFilterKey(combination)}
          data-work-empty={workFilterKey(combination)}
          className="px-3 md:px-6"
        >
          <p className="flex flex-wrap items-center gap-x-4 text-muted-foreground">
            {WORK_COPY.empty()}
            <button
              type="button"
              onClick={(event) =>
                changeWorkFilter(ALL_WORK, {
                  control: event.currentTarget,
                  focusTarget: document.querySelector<HTMLElement>(
                    '[data-work-link="all"]',
                  ),
                  counts,
                  total,
                })
              }
              className="inline-flex min-h-11 cursor-pointer items-center rounded-(--radius) text-(--link) underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {WORK_COPY.showAll}
            </button>
          </p>
        </div>
      ))}
    </div>
  );
}
