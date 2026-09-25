"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import type { Film } from "@/components/composed/work/film";
import { FilmPanel } from "@/components/composed/work/film-panel";
import { FilmTile } from "@/components/composed/work/film-tile";
import {
  closeFilm,
  FILM_PANEL_ID,
  getOpenFilm,
  openFilm,
} from "@/components/composed/work/open-film";
import { useOpenFilm } from "@/components/composed/work/use-open-film";
import { cn } from "@/lib/cn";

/** The grid's live column count, read from the computed template. */
function columnCount(list: HTMLElement): number {
  return (
    getComputedStyle(list).gridTemplateColumns.split(" ").filter(Boolean)
      .length || 1
  );
}

/**
 * For each item, the index of the last item on its visual line. Items are
 * placed in DOM order (no `dense` packing), so walking their spans against
 * the column count gives the same lines the browser draws (M-KR-6).
 */
function lineEnds(spans: ReadonlyArray<number>, columns: number): number[] {
  const ends: number[] = [];
  let lineStart = 0;
  let used = 0;
  spans.forEach((span, index) => {
    const width = Math.min(span, columns);
    if (used + width > columns) {
      for (let i = lineStart; i < index; i++) ends[i] = index - 1;
      lineStart = index;
      used = 0;
    }
    used += width;
  });
  for (let i = lineStart; i < spans.length; i++) ends[i] = spans.length - 1;
  return ends;
}

const ALL_VISIBLE = () => true;

/**
 * A grid of films that open in place (D-KRD-6, M-KR-6; spec §4.3). The
 * decision it carries: a tapped film opens full width on the line below
 * the tapped tile's row, and the tile stays, marked; nothing reorders, so
 * DOM order stays visual order and focus order. With one column the film
 * takes the tile's place. Another tile on the same line swaps the film in
 * place; one on another line moves it. The insertion point is recomputed
 * from the grid's live columns whenever they change, over visible tiles
 * only (`isVisible`, which Work's filters pass).
 *
 * `leading` is an optional first cell two columns wide from 768 (Home's
 * title cell). Each tile's `<li>` carries `id="film-<slug>"`, `data-roles`
 * and, for passion work only, `data-lane="passion"` (Work filters on them).
 */
export function FilmGrid({
  films,
  email,
  leading,
  isVisible = ALL_VISIBLE,
  preloadFirst = false,
  id,
  className,
}: Readonly<{
  films: ReadonlyArray<Film>;
  email: string;
  leading?: ReactNode;
  isVisible?: (film: Film) => boolean;
  preloadFirst?: boolean;
  /** Home and Work pass "work", the skip link's target (it is focusable). */
  id?: string;
  className?: string;
}>) {
  const open = useOpenFilm();
  const list = useRef<HTMLUListElement>(null);
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const node = list.current;
    if (!node) return;
    const read = () => setColumns(columnCount(node));
    read();
    const observer = new ResizeObserver(read);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const visible = films.filter(isVisible);
  const offset = leading ? 1 : 0;
  const ends = lineEnds(
    [...(leading ? [2] : []), ...visible.map(() => 1)],
    columns,
  );
  /** The slug of the last visible film on the same line as visible film `index`. */
  const lastOnLine = (index: number): string | undefined => {
    const end = ends[index + offset] ?? index + offset;
    return visible[end - offset]?.slug;
  };

  const openIndex = visible.findIndex((film) => film.slug === open);
  const openFilmData = openIndex >= 0 ? visible[openIndex] : undefined;
  const insertAfter = openIndex >= 0 ? lastOnLine(openIndex) : undefined;

  function activate(film: Film, trigger: HTMLElement) {
    const current = getOpenFilm();
    if (current === film.slug) {
      closeFilm();
      return;
    }
    const index = visible.findIndex((f) => f.slug === film.slug);
    const currentIndex = visible.findIndex((f) => f.slug === current);
    const sameLine =
      currentIndex >= 0 &&
      columns > 1 &&
      lastOnLine(currentIndex) === lastOnLine(index);
    openFilm(film.slug, trigger, sameLine ? "swap" : "move");
  }

  return (
    <ul
      ref={list}
      id={id}
      tabIndex={id ? -1 : undefined}
      className={cn(
        "grid grid-cols-1 gap-3 px-3 outline-none md:grid-cols-2 md:gap-4 md:px-6 xl:grid-cols-4",
        className,
      )}
    >
      {leading ? <li className="md:col-span-2">{leading}</li> : null}
      {films.map((film, index) => {
        const isOpen = film.slug === open;
        return (
          <Fragment key={film.slug}>
            <li
              id={`film-${film.slug}`}
              data-roles={film.roles.join(" ")}
              data-lane={film.passion ? "passion" : undefined}
              hidden={isOpen && columns === 1}
              className="scroll-mt-[calc(var(--bar-h)+1rem)]"
              style={{ viewTransitionName: `film-${film.slug}` }}
            >
              <FilmTile
                film={film}
                preload={preloadFirst && index === 0}
                open={isOpen}
                panelId={FILM_PANEL_ID}
                onActivate={(trigger) => activate(film, trigger)}
              />
            </li>
            {film.slug === insertAfter && openFilmData ? (
              <li
                className="col-span-full"
                style={{ viewTransitionName: "film-open" }}
              >
                <FilmPanel film={openFilmData} email={email} />
              </li>
            ) : null}
          </Fragment>
        );
      })}
    </ul>
  );
}
