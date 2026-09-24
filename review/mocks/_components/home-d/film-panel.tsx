"use client";

import { useEffect } from "react";
import { projectMetaLine, type Project } from "@/content/projects";
import {
  closeFilm,
  FILM_PANEL_ID,
} from "@/review/mocks/_components/home-d/open-film";
import { ProjectPlayer } from "@/review/mocks/_components/project-player";

/**
 * The open film (D-KRD-6, 7, 8): full width, on the line below the tile
 * that opened it. A 44 px strip carries the ✕ above the player, never over
 * it (YouTube's and Vimeo's own controls live in the video's corners).
 * Then the player, already playing because the tap was the gesture, and
 * the credits: title, genre line, the lane, the story and awards when
 * there are any, and his email alone as the last line. No "Full page", no
 * Close text.
 *
 * At ≥1280 the player and the credits sit side by side; below, stacked.
 * The player's width is capped (`--player-cap`, set by Home D) so the
 * whole frame fits under both sticky bars. Esc closes while focus is on
 * the page; inside the cross-origin player it can't, which is why the ✕
 * comes first in the tab order.
 */
export function FilmPanel({
  project,
  email,
  reviewPrefix,
}: Readonly<{ project: Project; email: string; reviewPrefix: string }>) {
  const titleId = `${FILM_PANEL_ID}-title`;

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeFilm();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      id={FILM_PANEL_ID}
      role="region"
      aria-labelledby={titleId}
      tabIndex={-1}
      data-review-id={`${reviewPrefix}.film`}
      className="flex scroll-mt-[calc(var(--review-bar-h,0px)+var(--demo-bar-h))] flex-col border border-border/40 bg-background pb-4 outline-none"
    >
      <div className="flex h-11 items-center justify-end">
        <button
          type="button"
          onClick={closeFilm}
          aria-label={`Close ${project.title}`}
          data-review-id={`${reviewPrefix}.film.close`}
          className="flex size-11 cursor-pointer items-center justify-center text-foreground transition-colors hover:text-(--link) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none active:text-(--link)"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:gap-6">
        <div
          data-film-player
          className="mx-auto w-[min(100%,var(--player-cap))] xl:mx-0 xl:w-[min(calc(100%_-_344px),var(--player-cap))] xl:shrink-0"
        >
          <ProjectPlayer project={project} />
        </div>
        <div className="flex min-w-0 flex-col gap-3 px-4 xl:min-w-80 xl:flex-1 xl:pl-0">
          <div className="flex flex-col gap-1.5">
            <h2
              id={titleId}
              className="font-heading text-[1.75rem] leading-[1.02] font-bold font-stretch-80%"
            >
              {project.title}
            </h2>
            <p className="text-[0.8125rem] font-medium font-stretch-90% tracking-[0.02em] text-muted-foreground">
              {projectMetaLine(project)}
            </p>
            {project.lane === "passion" ? (
              <p className="text-[0.6875rem] leading-none font-semibold font-stretch-88% tracking-[0.18em] text-(--link) uppercase">
                Passion project
              </p>
            ) : project.client ? (
              <p className="text-[0.8125rem] font-medium font-stretch-90% tracking-[0.02em] text-muted-foreground">
                {project.client}
              </p>
            ) : null}
          </div>
          {project.story ? (
            <p className="max-w-[68ch] text-sm leading-relaxed">
              {project.story}
            </p>
          ) : null}
          {project.awards?.length ? (
            <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
              {project.awards.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
          <p className="pt-1">
            <a
              href={`mailto:${email}`}
              data-review-id={`${reviewPrefix}.film.email`}
              className="text-sm text-(--link) underline-offset-4 hover:underline"
            >
              {email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
