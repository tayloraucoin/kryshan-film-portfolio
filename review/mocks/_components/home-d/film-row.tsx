"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";
import { FilmPanel } from "@/review/mocks/_components/home-d/film-panel";
import { FilmTile } from "@/review/mocks/_components/home-d/film-tile";
import {
  closeFilm,
  FILM_PANEL_ID,
  getOpenFilm,
  openFilm,
} from "@/review/mocks/_components/home-d/open-film";
import { DEMO_D_POSTERS } from "@/review/mocks/_components/home-d/posters";
import { useOpenFilm } from "@/review/mocks/_components/home-d/use-open-film";
import { prefersReducedMotion } from "@/review/mocks/_components/view-transition";

const ROW_SIZES = "(min-width: 1280px) 22vw, (min-width: 768px) 40vw, 85vw";

type Edges = { overflow: boolean; atStart: boolean; atEnd: boolean };

/**
 * One of Demo D's rows (D-KRD-13, KR-9): a heading with its strand line,
 * then films to swipe or scroll across. 4.5 tiles show at ≥1280 and 2.5 at
 * 768–1279, so the part-visible tile says there is more; on a phone one
 * tile and a peek of the next. Scroll-snap does the scrolling; the arrows
 * are a convenience for mouse and trackpad users, shown only when there is
 * more that way, and hidden from keyboard and assistive tech (Tab walks the
 * tiles, and a focused tile scrolls into view on its own).
 *
 * A film opens exactly as in the grid (the same tile, panel and open-film
 * store), full width directly beneath the row's track; the row keeps its
 * scroll position.
 */
export function FilmRow({
  id,
  title,
  caption,
  projects,
  email,
  reviewPrefix,
}: Readonly<{
  id: string;
  title: string;
  caption: string;
  projects: ReadonlyArray<Project>;
  email: string;
  reviewPrefix: string;
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
   * Bring a focused tile fully into view. Browsers leave a partly visible
   * focused tile clipped, and a plain scroll-into-view lands between snap
   * points and gets pulled back. So scroll to the snap position (a tile's
   * start) that shows the focused tile whole, as far left as possible.
   */
  function reveal(index: number) {
    const node = track.current;
    if (!node) return;
    const items = Array.from(node.children) as HTMLElement[];
    const tile = items[index];
    if (!tile) return;
    const style = getComputedStyle(node);
    const padStart = Number.parseFloat(style.scrollPaddingLeft) || 0;
    const padEnd = Number.parseFloat(style.scrollPaddingRight) || 0;
    const origin = node.getBoundingClientRect().left - node.scrollLeft;
    const start = (el: HTMLElement) => el.getBoundingClientRect().left - origin;
    const end = (el: HTMLElement) => el.getBoundingClientRect().right - origin;
    const room = node.clientWidth - padStart - padEnd;
    const viewStart = node.scrollLeft + padStart;
    if (start(tile) >= viewStart - 1 && end(tile) <= viewStart + room + 1) {
      return;
    }
    let first = index;
    while (first > 0) {
      const previous = items[first - 1];
      if (!previous || end(tile) - start(previous) > room) break;
      first -= 1;
    }
    const anchor = items[first] ?? tile;
    node.scrollTo({
      left: start(anchor) - padStart,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }

  function activate(project: Project, trigger: HTMLButtonElement) {
    const current = getOpenFilm();
    if (current === project.slug) {
      closeFilm();
      return;
    }
    const sameRow = projects.some((p) => p.slug === current);
    openFilm(project.slug, trigger, sameRow ? "swap" : "move");
  }

  if (projects.length === 0) return null;

  const openProject = projects.find((project) => project.slug === open);
  const headingId = `${reviewPrefix}-row-${id}`;

  return (
    <section
      aria-labelledby={headingId}
      data-review-id={`${reviewPrefix}.row.${id}`}
      className="flex flex-col gap-4"
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
        {projects.map((project, index) => (
          <li
            key={project.slug}
            id={`${reviewPrefix}-${project.slug}`}
            data-review-id={`${reviewPrefix}.row.${id}.${project.slug}`}
            className="w-[85%] shrink-0 snap-start md:w-[calc((100%_-_2rem)/2.5)] xl:w-[calc((100%_-_4rem)/4.5)]"
            onFocus={() => reveal(index)}
          >
            <FilmTile
              project={project}
              poster={DEMO_D_POSTERS[project.slug]}
              open={project.slug === open}
              panelId={FILM_PANEL_ID}
              sizes={ROW_SIZES}
              onActivate={(trigger) => activate(project, trigger)}
            />
          </li>
        ))}
      </ul>
      {openProject ? (
        <div
          className="px-3 md:px-6"
          style={{ viewTransitionName: `${reviewPrefix}-film` }}
        >
          <FilmPanel
            project={openProject}
            email={email}
            reviewPrefix={reviewPrefix}
          />
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
