"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Frame } from "@/components/composed/media/frame";
import { projectMetaLine, type Project } from "@/content/projects";
import { cn } from "@/lib/cn";
import { FrameRibbon } from "@/review/mocks/_components/frame-ribbon";
import {
  FRAME_TO_REPLACE,
  reviewPoster,
} from "@/review/mocks/_components/review-posters";

const TILE_SIZES = "(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw";

/** Kit A's label voice: Archivo 600, width 88, tracking 18%, uppercase. */
const LABEL =
  "text-[0.6875rem] leading-none font-semibold font-stretch-88% tracking-[0.18em] uppercase";

/**
 * One film on Demo D's home, in the grid or in a row (D-KRD-6, 9–12). A
 * 16:9 poster that is never blank (a build-time blur, and a titled card if
 * the image fails), the lane label top-left ("Passion project", or the
 * client, never "For hire"), the title with the genre line over a scrim,
 * a play mark on hover and focus for mouse and trackpad users, and a red
 * rule along the bottom while its film is open.
 *
 * It is a button: the demo has no detail pages. The container decides
 * what a tap does; the tile reports which element was tapped so focus can
 * come back to it.
 */
export function FilmTile({
  project,
  poster,
  preload = false,
  open,
  panelId,
  sizes = TILE_SIZES,
  onActivate,
}: Readonly<{
  project: Project;
  /** Static import with blur data; without it the project's own path is used. */
  poster?: StaticImageData;
  preload?: boolean;
  open: boolean;
  panelId: string;
  sizes?: string;
  onActivate: (trigger: HTMLButtonElement) => void;
}>) {
  const [failed, setFailed] = useState(false);
  const playable =
    project.embed?.provider === "youtube" ||
    project.embed?.provider === "vimeo";
  const meta = projectMetaLine(project);

  return (
    <button
      type="button"
      onClick={(event) => onActivate(event.currentTarget)}
      aria-expanded={open}
      aria-controls={open ? panelId : undefined}
      aria-label={`${playable ? "Play" : "Open"} ${project.title}, ${meta}`}
      className="group block w-full cursor-pointer text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
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
            src={poster ?? reviewPoster(project.slug).src}
            alt=""
            fill
            sizes={sizes}
            preload={preload}
            placeholder={poster ? "blur" : "empty"}
            onError={() => setFailed(true)}
            className="object-cover"
          />
        )}
        {FRAME_TO_REPLACE.has(project.slug) && !failed ? (
          <FrameRibbon>Frame to be replaced</FrameRibbon>
        ) : null}
        {project.lane === "passion" || project.client ? (
          <span
            className={cn(
              LABEL,
              "absolute top-2 left-2 max-w-[70%] truncate bg-background/85 px-1.5 py-1",
            )}
          >
            {project.lane === "passion" ? (
              <span className="text-(--link)">Passion project</span>
            ) : (
              <span className="text-muted-foreground">{project.client}</span>
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
            {project.title}
          </span>
          <span
            className={cn(
              "text-[0.8125rem] leading-snug font-medium font-stretch-90% tracking-[0.02em] text-muted-foreground",
              "opacity-0 transition-opacity duration-(--dur-fast)",
              "group-hover:opacity-100 group-focus-visible:opacity-100",
              "max-md:opacity-100 pointer-coarse:opacity-100",
            )}
          >
            {meta}
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
    </button>
  );
}
