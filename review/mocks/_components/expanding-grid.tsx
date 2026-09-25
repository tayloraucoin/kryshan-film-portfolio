"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import Image from "next/image";
import { Frame } from "@/components/composed/media/frame";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";
import { FrameRibbon } from "@/review/mocks/_components/frame-ribbon";
import { ProjectPlayer } from "@/review/mocks/_components/project-player";
import {
  FRAME_TO_REPLACE,
  reviewPoster,
} from "@/review/mocks/_components/review-posters";
import {
  changeWithTransition,
  prefersReducedMotion,
  VIEW_TRANSITION_CSS,
} from "@/review/mocks/_components/view-transition";

type ExpandingGridProps = {
  /** The first cell: server-rendered, never expands. */
  titleCell: ReactNode;
  projects: ReadonlyArray<Project>;
  /** The address the opened cell offers beside the player (layout A §2). */
  email: string;
  /** Prefix for `data-review-id`s and element ids, e.g. "home-a". */
  reviewPrefix: string;
};

const CELL_SIZES = "(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw";

/** "2019 · Director / Co-writer · DGC BC": year · role · for whom. */
function metaLine(project: Project): string {
  return [project.year, project.roleLabel, project.client]
    .filter(Boolean)
    .join(" · ");
}

/**
 * Layout A's grid: poster frames at 16:9, one of which can be open at a
 * time. Opening a cell grows it in place (2 × 2 on desktop, full width
 * below) and starts its player; the other cells reflow around it. The
 * growth is a view transition, so it starts from the tapped cell and closes
 * back into it; with reduced motion (or no view-transition support) the
 * change is instant and the layout is the same.
 *
 * Keyboard: every cell is a button; Enter or Space opens, Escape or Close
 * closes, and focus returns to the cell that was opened.
 */
export function ExpandingGrid({
  titleCell,
  projects,
  email,
  reviewPrefix,
}: ExpandingGridProps) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const triggers = useRef(new Map<string, HTMLButtonElement>());
  const closeButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const lastOpened = useRef<string | null>(null);

  const change = useCallback(
    (next: string | null) => changeWithTransition(() => setOpenSlug(next)),
    [],
  );

  // Move focus in on open, back to the cell on close.
  useEffect(() => {
    if (openSlug) {
      lastOpened.current = openSlug;
      closeButton.current?.focus({ preventScroll: true });
      panel.current?.scrollIntoView({
        block: "nearest",
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    } else if (lastOpened.current) {
      triggers.current.get(lastOpened.current)?.focus();
      lastOpened.current = null;
    }
  }, [openSlug]);

  useEffect(() => {
    if (!openSlug) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") change(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openSlug, change]);

  const panelId = `${reviewPrefix}-expanded`;

  return (
    <>
      {/* The one deliberate moment (kit A, motion): 220 ms, out-eased. */}
      <style>{VIEW_TRANSITION_CSS}</style>
      <ul
        className={cn(
          "grid grid-flow-row-dense grid-cols-1 gap-3 px-3",
          "md:grid-cols-2 md:gap-4 md:px-6 xl:grid-cols-4",
        )}
      >
        <li data-review-id={`${reviewPrefix}.title`}>{titleCell}</li>
        {projects.map((project, index) => {
          const open = project.slug === openSlug;
          return (
            <li
              key={project.slug}
              id={`${reviewPrefix}-${project.slug}`}
              data-review-id={`${reviewPrefix}.grid.${project.slug}`}
              className={cn(
                "scroll-mt-4",
                open && "md:col-span-2 xl:row-span-2",
              )}
              style={{ viewTransitionName: `${reviewPrefix}-${project.slug}` }}
            >
              {open ? (
                <div
                  ref={panel}
                  id={panelId}
                  role="region"
                  aria-label={project.title}
                  data-review-id={`${reviewPrefix}.expanded`}
                  className="flex flex-col gap-4 border border-border/40 bg-background pb-4"
                >
                  <ProjectPlayer project={project} />
                  <ExpandedMeta
                    project={project}
                    email={email}
                    closeRef={closeButton}
                    onClose={() => change(null)}
                  />
                </div>
              ) : (
                <GridCell
                  project={project}
                  preload={index === 0}
                  onOpen={() => change(project.slug)}
                  buttonRef={(node) => {
                    if (node) triggers.current.set(project.slug, node);
                    else triggers.current.delete(project.slug);
                  }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

function GridCell({
  project,
  preload,
  onOpen,
  buttonRef,
}: Readonly<{
  project: Project;
  preload: boolean;
  onOpen: () => void;
  buttonRef: (node: HTMLButtonElement | null) => void;
}>) {
  const playable =
    project.embed?.provider === "youtube" ||
    project.embed?.provider === "vimeo";

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onOpen}
      aria-label={`${playable ? "Play" : "Open"} ${project.title}, ${metaLine(project)}`}
      className="group block w-full cursor-pointer text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
    >
      <Frame
        className={cn(
          "border border-border/40 transition-colors duration-(--dur-fast)",
          "group-hover:border-border group-focus-visible:border-ring",
        )}
      >
        <Image
          src={reviewPoster(project.slug).src}
          alt=""
          fill
          sizes={CELL_SIZES}
          preload={preload}
          className="object-cover"
        />
        {FRAME_TO_REPLACE.has(project.slug) ? (
          <FrameRibbon>Frame to be replaced</FrameRibbon>
        ) : null}
        {project.lane === "passion" || project.client ? (
          <span className="absolute top-2 left-2 max-w-[70%] truncate bg-background/85 px-1.5 py-1 text-[0.6875rem] leading-none font-semibold font-stretch-88% tracking-[0.18em] uppercase">
            {project.lane === "passion" ? (
              <span className="text-(--link)">Passion project</span>
            ) : (
              <span className="text-muted-foreground">{project.client}</span>
            )}
          </span>
        ) : null}
        <span className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-linear-to-t from-background/95 via-background/60 to-transparent px-3 pt-8 pb-2.5">
          <span
            className={cn(
              "font-heading text-lg leading-tight font-semibold font-stretch-88%",
              "transition-transform duration-(--dur-fast)",
              "motion-safe:group-hover:-translate-y-0.5",
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
            {metaLine(project)}
          </span>
        </span>
      </Frame>
    </button>
  );
}

function ExpandedMeta({
  project,
  email,
  closeRef,
  onClose,
}: Readonly<{
  project: Project;
  email: string;
  closeRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}>) {
  return (
    <div className="grid gap-4 px-4 xl:grid-cols-[1fr_1.4fr] xl:gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-[1.75rem] leading-[1.02] font-bold font-stretch-80%">
          {project.title}
        </h2>
        <p className="text-[0.8125rem] font-medium font-stretch-90% tracking-[0.02em] text-muted-foreground">
          {metaLine(project)}
        </p>
      </div>
      <div className="flex flex-col gap-3 text-sm">
        {project.story ? (
          <p className="max-w-[68ch] leading-relaxed">{project.story}</p>
        ) : null}
        {project.awards?.length ? (
          <ul className="flex flex-col gap-1 text-muted-foreground">
            {project.awards.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : null}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
          <a
            href="#"
            aria-disabled="true"
            onClick={(event) => event.preventDefault()}
            className="font-semibold text-(--link) underline-offset-4 hover:underline"
          >
            Full page →
          </a>
          <a
            href={`mailto:${email}`}
            className="text-foreground transition-colors hover:text-(--link)"
          >
            {email}
          </a>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="ml-auto cursor-pointer rounded-sm border border-border px-3 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase transition-colors hover:border-(--link) hover:text-(--link) focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
