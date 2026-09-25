"use client";

import { useLayoutEffect, type MouseEvent } from "react";
import {
  changeWorkFilter,
  clearWorkAttributes,
  writeWorkAttributes,
} from "@/app/(site)/work/_components/change-work-filter";
import {
  getWorkFilter,
  setWorkFilter,
  useWorkFilter,
} from "@/app/(site)/work/_components/work-filter-store";
import { WORK } from "@/content/work";
import { cn } from "@/lib/cn";
import { markJsReady } from "@/lib/pre-paint-script";
import { siteRoutes, WORK_ROLES, type WorkRole } from "@/lib/routes";
import {
  parseWorkFilter,
  sameWorkFilter,
  type WorkFilter,
} from "@/lib/work-filter";

/** The Label step: Archivo 600, 11 px, width 88, tracking 18%, uppercase. */
const LABEL =
  "text-[0.6875rem] leading-none font-semibold font-stretch-88% tracking-[0.18em] uppercase";

const FOCUS =
  "rounded-(--radius) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/** The SITE-3 tile test: a primary click with no modifier. */
function isPlainClick(event: MouseEvent<HTMLAnchorElement>): boolean {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey &&
    !event.defaultPrevented
  );
}

/** Bring the store and `<html>` in line with the URL, with no transition. */
function syncFromUrl(): void {
  const fromUrl = parseWorkFilter(window.location.search);
  writeWorkAttributes(fromUrl);
  if (!sameWorkFilter(fromUrl, getWorkFilter())) setWorkFilter(fromUrl);
}

/**
 * Work's controls (spec §6.2, D-SITE-5 as amended by SITE-4a): "Arrange
 * by" and the role links Featured · Directing · Camera · Editing, which
 * reorder and never hide, and one "Passion projects" chip, which filters.
 * Both are carried in the URL.
 * The decision it carries: what the visitor sees never waits for React.
 * The pre-paint script put the filter on `<html>` before the first paint,
 * and CSS draws the tiles, the count, the current link and the chip from
 * it; this leaf owns the state, the ARIA, the URL and the announcement.
 *
 * On mount (a layout effect, so before the browser paints) it reads the
 * URL again, which is the only thing that works after a client-side
 * arrival, where the script didn't run. It re-checks after every render,
 * because Next may reuse the page for a navigation to `/work` from
 * `/work?role=…`. On unmount it takes the filter off `<html>`.
 *
 * Links, not ARIA tabs: a Cmd-click opens that combination in a new tab,
 * which paints filtered. Hidden without JavaScript (`data-needs-js`),
 * because a link can't filter a static page without it.
 */
export function WorkFilters({
  counts,
  total,
  className,
}: Readonly<{
  counts: Readonly<Record<string, number>>;
  total: number;
  className?: string;
}>) {
  const { filter, announcement } = useWorkFilter();

  useLayoutEffect(() => {
    markJsReady();
    syncFromUrl();
    return clearWorkAttributes;
  }, []);

  useLayoutEffect(() => {
    const fromUrl = parseWorkFilter(window.location.search);
    if (!sameWorkFilter(fromUrl, getWorkFilter())) syncFromUrl();
  });

  function apply(next: WorkFilter, control: HTMLElement) {
    changeWorkFilter(next, { control, counts, total });
  }

  const roleLink = (role: WorkRole | undefined) => {
    const target: WorkFilter = {
      ...(role ? { role } : {}),
      passion: filter.passion,
    };
    const isCurrent = filter.role === role;
    return (
      <li key={role ?? "all"}>
        <a
          href={siteRoutes.work(target)}
          data-work-link={role ?? "all"}
          aria-current={isCurrent ? "true" : undefined}
          onClick={(event) => {
            if (!isPlainClick(event)) return;
            event.preventDefault();
            apply(target, event.currentTarget);
          }}
          className={cn(
            LABEL,
            "inline-flex min-h-11 items-center text-muted-foreground underline-offset-[6px] transition-colors hover:text-foreground",
            FOCUS,
          )}
        >
          {role ? WORK.filters[role] : WORK.filters.all}
        </a>
      </li>
    );
  };

  return (
    <nav
      aria-label={WORK.filters.label}
      data-needs-js
      className={cn(
        "flex flex-col gap-1 md:flex-row md:items-center md:gap-6",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-x-5">
        <span
          id="work-arrange-by"
          className="text-[0.8125rem] font-medium font-stretch-90% tracking-[0.02em] text-muted-foreground"
        >
          {WORK.arrange.lead}
        </span>
        <ul
          aria-labelledby="work-arrange-by"
          className="flex flex-wrap items-center gap-x-5"
        >
          {[undefined, ...WORK_ROLES].map(roleLink)}
        </ul>
      </div>
      <button
        type="button"
        data-work-chip
        aria-pressed={filter.passion}
        onClick={(event) =>
          apply({ ...filter, passion: !filter.passion }, event.currentTarget)
        }
        className={cn(
          "group inline-flex min-h-11 cursor-pointer items-center self-start md:self-auto",
          FOCUS,
        )}
      >
        <span
          className={cn(
            LABEL,
            "inline-flex h-8 items-center rounded-(--radius) border border-border/40 px-3 text-muted-foreground transition-colors group-hover:text-foreground",
          )}
        >
          {WORK.filters.passion}
        </span>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {announcement}
      </span>
    </nav>
  );
}
