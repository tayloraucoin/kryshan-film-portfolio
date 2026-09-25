"use client";

import { changeWorkFilter } from "@/app/(site)/work/_components/change-work-filter";
import { useWorkFilter } from "@/app/(site)/work/_components/work-filter-store";
import type { Film } from "@/components/composed/work/film";
import { FilmGrid } from "@/components/composed/work/film-grid";
import { WORK_COPY } from "@/content/site";
import {
  ALL_WORK,
  matchesWorkFilter,
  workFilterKey,
  type WorkFilter,
} from "@/lib/work-filter";

/**
 * Work's grid (spec §6.2): every showable film in `workOrder()`, in SITE-3's
 * `FilmGrid`. The decision it carries: filtering only hides. Every tile is
 * in the HTML; CSS hides the ones the `<html>` filter excludes
 * (`[data-work-grid]`, app/globals.css), and this leaf tells the grid which
 * tiles are visible, so an open film is inserted after the last *visible*
 * tile on its line (Vesper B4), and which tiles to name for the transition.
 *
 * The empty line is rendered only for the combinations that match nothing
 * (known at build) and shown by CSS for its own combination; "Show all"
 * hands focus to the "All" link, since it disappears when used.
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

  return (
    <div data-work-grid>
      <FilmGrid
        id="work"
        films={films}
        email={email}
        isVisible={(film) => matchesWorkFilter(film, filter)}
        isNamed={(film) => matchesWorkFilter(film, naming)}
        preloadFirst
      />
      {empty.map((combination) => (
        <div
          key={workFilterKey(combination)}
          data-work-empty={workFilterKey(combination)}
          className="px-3 md:px-6"
        >
          <p className="flex flex-wrap items-center gap-x-4 text-muted-foreground">
            {WORK_COPY.empty(combination.role)}
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
