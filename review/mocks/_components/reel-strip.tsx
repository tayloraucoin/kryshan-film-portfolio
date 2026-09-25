"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VideoEmbed } from "@/components/composed/media/video-embed";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";
import { FrameRibbon } from "@/review/mocks/_components/frame-ribbon";
import {
  FRAME_TO_REPLACE,
  reviewPoster,
} from "@/review/mocks/_components/review-posters";

type ReelStripProps = {
  /** Playable pieces only (YouTube or Vimeo); the strip has no link-out state. */
  projects: ReadonlyArray<Project>;
  /** Prefix for `data-review-id`s, e.g. "home-b". */
  reviewPrefix: string;
};

/**
 * Layout B's reel strip: full-width players at 16:9 in a horizontal
 * scroller that snaps, so the first is fully in view on load and the next
 * one peeks (Betancourt). Arrows on desktop; swipe or scroll elsewhere.
 *
 * Each slide is the poster-first player (no iframe until its own play tap)
 * with the title beneath and an "Info" toggle that slides the piece's
 * details in from the right, over the frame. The first poster is the page's
 * LCP candidate; the others are lazy.
 */
export function ReelStrip({ projects, reviewPrefix }: ReelStripProps) {
  const scroller = useRef<HTMLUListElement>(null);
  const [infoOpen, setInfoOpen] = useState<string | null>(null);
  const [playing, setPlaying] = useState<ReadonlySet<string>>(new Set());

  function step(direction: 1 | -1) {
    const list = scroller.current;
    const slide = list?.firstElementChild as HTMLElement | null;
    if (!list || !slide) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    list.scrollBy({
      left: direction * (slide.offsetWidth + 16),
      behavior: reduce ? "auto" : "smooth",
    });
  }

  return (
    <div className="relative">
      <ul
        ref={scroller}
        className={cn(
          "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {projects.map((project, index) => {
          if (
            project.embed?.provider !== "youtube" &&
            project.embed?.provider !== "vimeo"
          ) {
            return null;
          }
          const infoId = `${reviewPrefix}-info-${project.slug}`;
          const showInfo = infoOpen === project.slug;
          const isPlaying = playing.has(project.slug);
          return (
            <li
              key={project.slug}
              data-review-id={`${reviewPrefix}.strip.${project.slug}`}
              className="w-[88%] shrink-0 snap-start md:w-full xl:w-[83%]"
            >
              <div className="relative overflow-hidden rounded-(--radius) border border-border shadow-sm">
                <VideoEmbed
                  video={project.embed}
                  title={project.title}
                  poster={reviewPoster(project.slug)}
                  priority={index === 0}
                  onPlay={() =>
                    setPlaying((current) => new Set(current).add(project.slug))
                  }
                />
                {FRAME_TO_REPLACE.has(project.slug) && !isPlaying ? (
                  <FrameRibbon>Frame to be replaced</FrameRibbon>
                ) : null}
                <div
                  id={infoId}
                  hidden={!showInfo}
                  className={cn(
                    "absolute inset-y-0 right-0 flex w-full max-w-sm flex-col justify-end gap-2 overflow-y-auto",
                    "bg-background/95 p-5 text-foreground",
                    "motion-safe:animate-in motion-safe:slide-in-from-right motion-safe:duration-200",
                  )}
                >
                  <p className="font-heading text-xl font-bold">
                    {project.title}
                  </p>
                  <p className="font-heading text-[0.8125rem] text-muted-foreground">
                    {[project.year, project.roleLabel, project.client]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  {project.story ? (
                    <p className="leading-relaxed">{project.story}</p>
                  ) : null}
                  {project.awards?.map((line) => (
                    <p key={line} className="text-sm">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex items-baseline justify-between gap-4 pt-3">
                <h2 className="font-heading text-lg font-bold">
                  {project.title}
                </h2>
                <button
                  type="button"
                  aria-expanded={showInfo}
                  aria-controls={infoId}
                  onClick={() => setInfoOpen(showInfo ? null : project.slug)}
                  className="cursor-pointer font-heading text-[0.8125rem] tracking-[0.08em] text-(--link) uppercase underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  {showInfo ? "Close info" : "Info"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="hidden justify-end gap-2 pt-2 lg:flex">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous film"
          className="flex size-10 cursor-pointer items-center justify-center rounded-(--radius) border border-border transition-colors hover:border-(--link) hover:text-(--link) focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next film"
          className="flex size-10 cursor-pointer items-center justify-center rounded-(--radius) border border-border transition-colors hover:border-(--link) hover:text-(--link) focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
