"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import { Frame } from "@/components/composed/media/frame";
import type { Film } from "@/components/composed/work/film";
import { FILM_COPY } from "@/content/site";
import { cn } from "@/lib/cn";

const TILE_SIZES = "(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw";

/** The Label step: Archivo 600, 11 px, width 88, tracking 18%, uppercase. */
const LABEL =
  "text-[0.6875rem] leading-none font-semibold font-stretch-88% tracking-[0.18em] uppercase";

/** A click the page should handle: primary button, no modifier (D-SITE-3). */
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

/**
 * One film, in a grid or a row (D-KRD-6, 9–12; spec §4.3). The decision it
 * carries: the tile is a real link to the film's page, and only a plain
 * click is taken over to open the film in place. A Cmd, Ctrl, Shift or Alt
 * click, a middle click, "Open in new tab", a shared tile and a visitor
 * without JavaScript all get `/work/<slug>`. A plain anchor, not
 * `next/link`, so nothing is prefetched.
 *
 * A 16:9 poster that is never blank (a build-time blur, and a titled card
 * if the image fails), the lane label top-left ("Passion project", or the
 * client; never "For hire"), the title with the genre line over a scrim, a
 * play mark on hover and focus for mouse and trackpad users, and a red rule
 * along the bottom while its film is open.
 */
export function FilmTile({
  film,
  preload = false,
  open,
  panelId,
  sizes = TILE_SIZES,
  onActivate,
  className,
}: Readonly<{
  film: Film;
  preload?: boolean;
  open: boolean;
  panelId: string;
  sizes?: string;
  onActivate: (trigger: HTMLElement) => void;
  className?: string;
}>) {
  const [failed, setFailed] = useState(false);
  const playable =
    film.embed.provider === "youtube" || film.embed.provider === "vimeo";

  return (
    <a
      href={film.href}
      onClick={(event) => {
        if (!isPlainClick(event)) return;
        event.preventDefault();
        onActivate(event.currentTarget);
      }}
      aria-expanded={open}
      aria-controls={open ? panelId : undefined}
      aria-label={FILM_COPY.tileName(film.title, film.genreLine)}
      className={cn(
        "group block w-full cursor-pointer text-left",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
        className,
      )}
    >
      <Frame
        className={cn(
          "border border-border/40 transition-colors duration-(--dur-fast)",
          "group-hover:border-border group-focus-visible:border-ring",
          failed && "bg-card",
        )}
      >
        {failed ? null : (
          <Image
            src={film.poster}
            alt=""
            fill
            sizes={sizes}
            preload={preload}
            placeholder="blur"
            onError={() => setFailed(true)}
            className="object-cover"
          />
        )}
        {film.passion || film.client ? (
          <span
            className={cn(
              LABEL,
              "absolute top-2 left-2 max-w-[70%] truncate bg-background/85 px-1.5 py-1",
            )}
          >
            {film.passion ? (
              <span className="text-(--link)">{FILM_COPY.passion}</span>
            ) : (
              <span className="text-muted-foreground">{film.client}</span>
            )}
          </span>
        ) : null}
        <span className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-linear-to-t from-background/95 via-background/60 to-transparent px-3 pt-8 pr-14 pb-2.5">
          <span
            className={cn(
              "font-heading text-lg leading-tight font-semibold font-stretch-88%",
              "transition-transform duration-(--dur-fast)",
              "motion-safe:pointer-fine:group-hover:-translate-y-0.5",
            )}
          >
            {film.title}
          </span>
          <span
            className={cn(
              "text-[0.8125rem] leading-snug font-medium font-stretch-90% tracking-[0.02em] text-muted-foreground",
              "opacity-0 transition-opacity duration-(--dur-fast)",
              "group-hover:opacity-100 group-focus-visible:opacity-100",
              "max-md:opacity-100 pointer-coarse:opacity-100",
            )}
          >
            {film.genreLine}
          </span>
        </span>
        {playable && !open ? (
          <span
            aria-hidden="true"
            className={cn(
              "absolute right-3 bottom-3 flex size-8 items-center justify-center rounded-full bg-background/85 text-foreground",
              "opacity-0 transition-opacity duration-(--dur-fast)",
              "pointer-fine:group-hover:opacity-100 pointer-fine:group-focus-visible:opacity-100",
              "pointer-coarse:hidden",
            )}
          >
            <svg viewBox="0 0 24 24" className="ml-0.5 size-3.5 fill-current">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        ) : null}
        {open ? (
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-0.5 bg-(--link)"
          />
        ) : null}
      </Frame>
    </a>
  );
}
