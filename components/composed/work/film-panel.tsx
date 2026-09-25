"use client";

import { useEffect } from "react";
import { CopyButton } from "@/components/composed/site/copy-button";
import type { Film } from "@/components/composed/work/film";
import { FilmPlayer } from "@/components/composed/work/film-player";
import { closeFilm, FILM_PANEL_ID } from "@/components/composed/work/open-film";
import { FILM_COPY } from "@/content/site";
import { cn } from "@/lib/cn";
import { mailtoHref } from "@/lib/mailto";

/**
 * The open film (D-KRD-6, 7, 8; spec §4.3): full width, on the line below
 * the tile that opened it. The decision it carries: nothing sits between a
 * playing film and his email. A 44 px strip above the player (never over
 * it; YouTube's and Vimeo's controls live in the video's corners) holds
 * "Copy link" at its left end and the ✕ at its right, Copy link first in
 * the DOM so Shift+Tab out of the player reaches the ✕. Then the player,
 * already playing; then the title, genre line, lane, logline and short
 * awards; and his email alone and last, as a message already titled with
 * the film (D-SITE-23). No story (D-SITE-22), no "Full page", no Close text.
 *
 * At ≥1280 the player and the credits sit side by side; below, stacked.
 * The player's width is capped (`--player-cap`, app/globals.css) so the
 * whole frame fits under the bar. Esc closes while focus is on the page;
 * inside the cross-origin player it can't, which is why the ✕ is one
 * Shift+Tab away.
 */
export function FilmPanel({
  film,
  email,
  className,
}: Readonly<{ film: Film; email: string; className?: string }>) {
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
      className={cn(
        "flex scroll-mt-(--bar-h) flex-col border border-border/40 bg-background pb-4 outline-none",
        className,
      )}
    >
      <div className="flex min-h-11 flex-wrap items-center justify-between gap-x-4 pl-4">
        <CopyButton
          key={film.slug}
          value={film.shareUrl}
          labels={FILM_COPY.copyLink}
          onFailure="share-or-show"
          shareTitle={film.title}
          classes={{ fallback: "order-last pr-4 pb-2" }}
        />
        <button
          type="button"
          onClick={closeFilm}
          aria-label={FILM_COPY.close(film.title)}
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
          <FilmPlayer film={film} />
        </div>
        <div className="flex min-w-0 flex-col gap-3 px-4 xl:min-w-80 xl:flex-1 xl:pl-0">
          <div className="flex flex-col gap-1.5">
            <h2
              id={titleId}
              className="font-heading text-[1.75rem] leading-[1.02] font-bold font-stretch-80%"
            >
              {film.title}
            </h2>
            <p className="text-[0.8125rem] font-medium font-stretch-90% tracking-[0.02em] text-muted-foreground">
              {film.genreLine}
            </p>
            {film.passion ? (
              <p className="text-[0.6875rem] leading-none font-semibold font-stretch-88% tracking-[0.18em] text-(--link) uppercase">
                {FILM_COPY.passion}
              </p>
            ) : film.client ? (
              <p className="text-[0.8125rem] font-medium font-stretch-90% tracking-[0.02em] text-muted-foreground">
                {film.client}
              </p>
            ) : null}
          </div>
          <p className="max-w-[68ch] text-sm leading-relaxed">{film.logline}</p>
          {film.awards.length > 0 ? (
            <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
              {film.awards.slice(0, 3).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
          <p className="pt-1">
            <a
              href={mailtoHref(email, film.title)}
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
