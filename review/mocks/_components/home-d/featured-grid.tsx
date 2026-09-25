"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import type { Project } from "@/content/projects";
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
 * the column count gives the same lines the browser draws.
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

/**
 * Demo D's featured grid (D-KRD-5, 6): his line in a two-column first
 * cell, then the films. A tapped film opens full width on the line below
 * the tapped tile's row, and the tile stays, marked; with one column the
 * film takes the tile's place. Tapping another tile on the same line swaps
 * the film in place; one on another line moves it. The insertion point is
 * recomputed whenever the column count changes.
 */
export function FeaturedGrid({
  titleCell,
  projects,
  email,
  reviewPrefix,
}: Readonly<{
  titleCell: ReactNode;
  projects: ReadonlyArray<Project>;
  email: string;
  reviewPrefix: string;
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

  // Item 0 is the title cell (two columns wide whenever there are two).
  const ends = lineEnds([2, ...projects.map(() => 1)], columns);
  /** Index of the last project on the same line as project `index`. */
  const lastOnLine = (index: number) => (ends[index + 1] ?? index + 1) - 1;

  const openIndex = projects.findIndex((project) => project.slug === open);
  const openProject = openIndex >= 0 ? projects[openIndex] : undefined;
  const insertAfter = openIndex >= 0 ? lastOnLine(openIndex) : -1;

  function activate(index: number, trigger: HTMLButtonElement) {
    const project = projects[index];
    if (!project) return;
    const current = getOpenFilm();
    if (current === project.slug) {
      closeFilm();
      return;
    }
    const currentIndex = projects.findIndex((p) => p.slug === current);
    const sameLine =
      currentIndex >= 0 &&
      columns > 1 &&
      lastOnLine(currentIndex) === lastOnLine(index);
    openFilm(project.slug, trigger, sameLine ? "swap" : "move");
  }

  return (
    <ul
      ref={list}
      className="grid grid-cols-1 gap-3 px-3 md:grid-cols-2 md:gap-4 md:px-6 xl:grid-cols-4"
    >
      <li data-review-id={`${reviewPrefix}.title`} className="md:col-span-2">
        {titleCell}
      </li>
      {projects.map((project, index) => {
        const isOpen = project.slug === open;
        return (
          <Fragment key={project.slug}>
            <li
              id={`${reviewPrefix}-${project.slug}`}
              data-review-id={`${reviewPrefix}.grid.${project.slug}`}
              hidden={isOpen && columns === 1}
              className="scroll-mt-[calc(var(--review-bar-h,0px)+var(--demo-bar-h)+1rem)]"
              style={{ viewTransitionName: `${reviewPrefix}-${project.slug}` }}
            >
              <FilmTile
                project={project}
                poster={DEMO_D_POSTERS[project.slug]}
                preload={index === 0}
                open={isOpen}
                panelId={FILM_PANEL_ID}
                onActivate={(trigger) => activate(index, trigger)}
              />
            </li>
            {index === insertAfter && openProject ? (
              <li
                className="col-span-full"
                style={{ viewTransitionName: `${reviewPrefix}-film` }}
              >
                <FilmPanel
                  project={openProject}
                  email={email}
                  reviewPrefix={reviewPrefix}
                />
              </li>
            ) : null}
          </Fragment>
        );
      })}
    </ul>
  );
}
