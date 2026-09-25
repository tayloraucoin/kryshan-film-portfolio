"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Route } from "next";
import type { Film } from "@/components/composed/work/film";
import { FilmPanel } from "@/components/composed/work/film-panel";
import { FilmTile } from "@/components/composed/work/film-tile";
import {
  closeFilm,
  FILM_PANEL_ID,
  getOpenFilm,
  openFilm,
} from "@/components/composed/work/open-film";
import { prefersReducedMotion } from "@/components/composed/work/transition";
import { useOpenFilm } from "@/components/composed/work/use-open-film";
import { cn } from "@/lib/cn";

const ROW_SIZES = "(min-width: 1280px) 22vw, (min-width: 768px) 40vw, 85vw";

/** A row item's width: 4.5 visible at ≥1280, 2.5 at 768–1279, one and a peek below. */
const ITEM_WIDTH =
  "w-[85%] shrink-0 snap-start md:w-[calc((100%_-_2rem)/2.5)] xl:w-[calc((100%_-_4rem)/4.5)]";

type Edges = { overflow: boolean; atStart: boolean; atEnd: boolean };

/**
 * A row of films to swipe or scroll across (D-KRD-13, KR-9; spec §6.1).
 * The decision it carries: a row is a slice of the work, so it ends in a
 * tile that leads to that slice of Work (`end`), a plain link so Work's
 * before-paint filter runs on arrival. The part-visible tile says there is
 * more; scroll-snap does the scrolling; the arrows are a convenience for
 * mouse and trackpad users, shown only when there is more that way, and
 * hidden from keyboard and assistive tech (Tab walks the tiles, and a
 * focused tile scrolls fully into view).
 *
 * A film opens exactly as in the grid (the same tile, panel and open-film
 * store), full width directly beneath the track; the row keeps its scroll
 * position. A row with no films renders nothing, end tile included.
 */
export function FilmRow({
  id,
  title,
  caption,
  films,
  email,
  end,
  className,
}: Readonly<{
  id: string;
  title: string;
  caption: string;
  films: ReadonlyArray<Film>;
  email: string;
  end?: Readonly<{ label: string; href: Route }>;
  className?: string;
}>) {
  const open = useOpenFilm();
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState<Edges>({
    overflow: false,
    atStart: true,
    atEnd: true,
  });

  const measure = useCallback(() => {
    const node = track.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setEdges({
      overflow: max > 1,
      atStart: node.scrollLeft <= 1,
      atEnd: node.scrollLeft >= max - 1,
    });
  }, []);

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    measure();
    node.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => {
      node.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [measure]);

  function page(direction: 1 | -1) {
    const node = track.current;
    if (!node) return;
    const tile = node.firstElementChild as HTMLElement | null;
    const step = node.clientWidth - (tile?.offsetWidth ?? 0);
    node.scrollBy({
      left: direction * Math.max(step, node.clientWidth / 2),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }

  /**
   * Bring a focused item fully into view. Browsers leave a partly visible
   * focused tile clipped, and a plain scroll-into-view lands between snap
   * points and gets pulled back. So scroll to the snap position (an item's
   * start) that shows the focused item whole, as far left as possible.
   */
  function reveal(index: number) {
    const node = track.current;
    if (!node) return;
    const items = Array.from(node.children) as HTMLElement[];
    const item = items[index];
    if (!item) return;
    const style = getComputedStyle(node);
    const padStart = Number.parseFloat(style.scrollPaddingLeft) || 0;
    const padEnd = Number.parseFloat(style.scrollPaddingRight) || 0;
    const origin = node.getBoundingClientRect().left - node.scrollLeft;
    const start = (el: HTMLElement) => el.getBoundingClientRect().left - origin;
    const stop = (el: HTMLElement) => el.getBoundingClientRect().right - origin;
    const room = node.clientWidth - padStart - padEnd;
    const viewStart = node.scrollLeft + padStart;
    if (start(item) >= viewStart - 1 && stop(item) <= viewStart + room + 1) {
      return;
    }
    let first = index;
    while (first > 0) {
      const previous = items[first - 1];
      if (!previous || stop(item) - start(previous) > room) break;
      first -= 1;
    }
    const anchor = items[first] ?? item;
    node.scrollTo({
      left: start(anchor) - padStart,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }

  function activate(film: Film, trigger: HTMLElement) {
    const current = getOpenFilm();
    if (current === film.slug) {
      closeFilm();
      return;
    }
    const sameRow = films.some((f) => f.slug === current);
    openFilm(film.slug, trigger, sameRow ? "swap" : "move");
  }

  if (films.length === 0) return null;

  const openFilmData = films.find((film) => film.slug === open);
  const headingId = `row-${id}`;

  return (
    <section
      aria-labelledby={headingId}
      className={cn("flex flex-col gap-4", className)}
    >
      <div className="flex items-end justify-between gap-6 px-3 md:px-6">
        <div className="flex flex-col gap-2">
          <h2
            id={headingId}
            className="font-heading text-[1.75rem] leading-[1.15] font-semibold font-stretch-88%"
          >
            {title}
          </h2>
          <p className="max-w-[60ch] leading-relaxed text-muted-foreground">
            {caption}
          </p>
        </div>
        {edges.overflow ? (
          <div className="flex shrink-0 gap-2 max-md:hidden pointer-coarse:hidden">
            <RowArrow
              direction={-1}
              hidden={edges.atStart}
              onClick={() => page(-1)}
            />
            <RowArrow
              direction={1}
              hidden={edges.atEnd}
              onClick={() => page(1)}
            />
          </div>
        ) : null}
      </div>
      <ul
        ref={track}
        className={cn(
          "flex snap-x snap-proximity gap-3 overflow-x-auto px-3 scroll-px-3",
          "md:gap-4 md:px-6 md:scroll-px-6",
          "pointer-fine:[scrollbar-width:none]",
        )}
      >
        {films.map((film, index) => (
          <li
            key={film.slug}
            id={`film-${film.slug}`}
            data-roles={film.roles.join(" ")}
            data-lane={film.passion ? "passion" : undefined}
            className={ITEM_WIDTH}
            onFocus={() => reveal(index)}
          >
            <FilmTile
              film={film}
              open={film.slug === open}
              panelId={FILM_PANEL_ID}
              sizes={ROW_SIZES}
              onActivate={(trigger) => activate(film, trigger)}
            />
          </li>
        ))}
        {end ? (
          <li className={ITEM_WIDTH} onFocus={() => reveal(films.length)}>
            <a
              href={end.href}
              className={cn(
                "flex aspect-video w-full items-center justify-center gap-1.5 bg-card px-3 text-center",
                "text-[0.6875rem] leading-none font-semibold font-stretch-88% tracking-[0.18em] text-foreground uppercase transition-colors hover:text-(--link)",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
              )}
            >
              {end.label}
              <span aria-hidden="true">→</span>
            </a>
          </li>
        ) : null}
      </ul>
      {openFilmData ? (
        <div
          className="px-3 md:px-6"
          style={{ viewTransitionName: "film-open" }}
        >
          <FilmPanel film={openFilmData} email={email} />
        </div>
      ) : null}
    </section>
  );
}

function RowArrow({
  direction,
  hidden,
  onClick,
}: Readonly<{ direction: 1 | -1; hidden: boolean; onClick: () => void }>) {
  return (
    <button
      type="button"
      aria-hidden="true"
      tabIndex={-1}
      onClick={onClick}
      className={cn(
        "flex size-11 cursor-pointer items-center justify-center bg-card text-foreground transition-colors hover:text-(--link)",
        hidden && "invisible",
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={direction === 1 ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"} />
      </svg>
    </button>
  );
}
