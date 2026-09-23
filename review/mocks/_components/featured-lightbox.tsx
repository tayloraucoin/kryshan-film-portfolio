"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, XIcon } from "lucide-react";
import { KitScope } from "@/components/composed/brand/kit-scope";
import { Frame } from "@/components/composed/media/frame";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/primitives/dialog";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";
import type { ReviewKit } from "@/review/kits/types";
import { FrameRibbon } from "@/review/mocks/_components/frame-ribbon";
import { ProjectPlayer } from "@/review/mocks/_components/project-player";

type FeaturedLightboxProps = {
  projects: ReadonlyArray<Project>;
  /**
   * The dialog portals to `<body>`, outside the page's kit scope, so it
   * re-applies the kit itself.
   */
  kit: ReviewKit;
  email: string;
  /** Prefix for `data-review-id`s, e.g. "home-b". */
  reviewPrefix: string;
};

const FRAME_SIZES = "(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw";
const BUTTON =
  "flex cursor-pointer items-center gap-1 rounded-(--radius) border border-border px-3 py-1.5 transition-colors hover:border-accent hover:text-accent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none";

/**
 * Layout B's featured frames and their lightbox. The frames sit on the dark
 * surface; hover washes a frame toward cream with the title (Roper). A tap
 * opens the vendored dialog over the dimmed page: focus is trapped, Escape
 * closes, focus returns to the frame. Inside, the player is poster-first
 * (the iframe mounts on its own play tap and unmounts on close or on
 * prev/next), then role · client · year, story, awards, prev/next within
 * these pieces, "Full page →" and the email line. Below 768 px it is a
 * full-screen sheet with the player on top and the meta scrolling beneath.
 */
export function FeaturedLightbox({
  projects,
  kit,
  email,
  reviewPrefix,
}: FeaturedLightboxProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const project = openIndex === null ? undefined : projects[openIndex];

  function go(step: 1 | -1) {
    setOpenIndex((index) =>
      index === null
        ? index
        : (index + step + projects.length) % projects.length,
    );
  }

  return (
    <>
      <ul className="grid gap-4 md:grid-cols-2 md:gap-6">
        {projects.map((item, index) => (
          <li
            key={item.slug}
            data-review-id={`${reviewPrefix}.featured.${item.slug}`}
          >
            <FeaturedFrame project={item} onOpen={() => setOpenIndex(index)} />
          </li>
        ))}
      </ul>

      <Dialog
        open={project !== undefined}
        onOpenChange={(open) => {
          if (!open) setOpenIndex(null);
        }}
      >
        <DialogContent
          showCloseButton={false}
          className={cn(
            "gap-0 overflow-hidden rounded-none bg-transparent p-0 ring-0",
            "max-md:inset-0 max-md:top-0 max-md:left-0 max-md:h-dvh max-md:max-w-none max-md:translate-x-0 max-md:translate-y-0",
            "md:w-[min(60rem,calc(100%-4rem))] md:max-w-none",
          )}
        >
          {project ? (
            <KitScope
              kit={kit}
              className="flex max-h-dvh flex-col overflow-y-auto rounded-(--radius) border border-border shadow-lg max-md:h-dvh max-md:rounded-none md:max-h-[calc(100dvh-4rem)]"
            >
              <div data-review-id={`${reviewPrefix}.lightbox`}>
                <ProjectPlayer
                  key={project.slug}
                  project={project}
                  posterFirst
                />
                <div className="flex flex-col gap-4 p-5 md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <DialogTitle className="font-heading text-[1.75rem] leading-tight font-bold">
                        {project.title}
                      </DialogTitle>
                      <p className="font-heading text-[0.8125rem] text-muted-foreground">
                        {[project.roleLabel, project.client, project.year]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                    <DialogClose className={BUTTON} aria-label="Close">
                      <XIcon className="size-4" aria-hidden="true" />
                    </DialogClose>
                  </div>
                  {project.story ? (
                    <p className="max-w-[66ch] leading-relaxed">
                      {project.story}
                    </p>
                  ) : null}
                  {project.awards?.length ? (
                    <ul className="flex flex-col gap-1 text-sm">
                      {project.awards.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      className={BUTTON}
                      aria-label="Previous featured film"
                    >
                      <ChevronLeft className="size-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      className={BUTTON}
                      aria-label="Next featured film"
                    >
                      <ChevronRight className="size-4" aria-hidden="true" />
                    </button>
                    <a
                      href="#"
                      aria-disabled="true"
                      onClick={(event) => event.preventDefault()}
                      className="ml-auto font-semibold text-accent underline-offset-4 hover:underline"
                    >
                      Full page →
                    </a>
                  </div>
                  <p className="border-t border-border pt-4 text-sm">
                    <a
                      href={`mailto:${email}`}
                      className="font-semibold text-accent underline-offset-4 hover:underline"
                    >
                      Email me about this kind of work
                    </a>
                  </p>
                </div>
              </div>
            </KitScope>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

function FeaturedFrame({
  project,
  onOpen,
}: Readonly<{ project: Project; onOpen: () => void }>) {
  const meta = [project.year, project.roleLabel].join(" · ");
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`Open ${project.title}, ${meta}`}
      className="group block w-full cursor-pointer text-left focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-(--surface-dark) focus-visible:outline-none"
    >
      <Frame className="rounded-(--radius) shadow-md">
        <Image
          src={project.poster.src}
          alt=""
          fill
          sizes={FRAME_SIZES}
          className="object-cover"
        />
        {project.posterStatus === "replace" ? (
          <FrameRibbon>Frame to be replaced</FrameRibbon>
        ) : null}
        {project.lane === "passion" || project.client ? (
          <span className="absolute top-2 left-2 max-w-[70%] truncate rounded-(--radius) bg-background px-1.5 py-1 font-heading text-[0.6875rem] leading-none tracking-[0.08em] uppercase">
            {project.lane === "passion" ? (
              <span className="text-accent">Passion project</span>
            ) : (
              <span className="text-muted-foreground">{project.client}</span>
            )}
          </span>
        ) : null}
        {/* Rest: title on the scrim. Hover/focus: the frame washes toward cream. */}
        <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-(--surface-dark)/90 to-transparent px-3 pt-10 pb-3 font-heading text-base font-bold text-background">
          {project.title}
        </span>
        <span
          className={cn(
            "absolute inset-0 flex flex-col items-start justify-end gap-1 bg-background/85 p-4 opacity-0",
            "transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100",
          )}
        >
          <span className="font-heading text-xl font-bold">
            {project.title}
          </span>
          <span className="font-heading text-[0.8125rem] text-muted-foreground">
            {meta}
          </span>
        </span>
      </Frame>
    </button>
  );
}
