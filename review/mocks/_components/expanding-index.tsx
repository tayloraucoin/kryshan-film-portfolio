"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import Image from "next/image";
import { Frame } from "@/components/composed/media/frame";
import type { Project, ProjectRole } from "@/content/projects";
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

type ExpandingIndexProps = {
  projects: ReadonlyArray<Project>;
  /** The address the expanded row carries (layout C §2). */
  email: string;
  /** Prefix for `data-review-id`s and element ids, e.g. "home-c". */
  reviewPrefix: string;
};

const ROLE_LABEL: Record<ProjectRole, string> = {
  directing: "Directing",
  camera: "Camera",
  editing: "Editing",
};

/** The only place the tag colours are named (kit C's `--tag-*`). */
const ROLE_DOT: Record<ProjectRole, string> = {
  directing: "bg-(--tag-directing)",
  camera: "bg-(--tag-camera)",
  editing: "bg-(--tag-editing)",
};

const ROLE_VAR: Record<ProjectRole, string> = {
  directing: "var(--tag-directing)",
  camera: "var(--tag-camera)",
  editing: "var(--tag-editing)",
};

const LABEL = "text-xs font-medium tracking-[0.28em] uppercase";

function laneLabel(project: Project): string {
  return project.lane === "passion" ? "Passion project" : "For hire";
}

/**
 * Layout C's featured index: a real `<table>` (title, year, role, lane)
 * with a 160 × 90 frame per row, which becomes a stack of cards below
 * 768 px (frame full width with the title over it, year · role dots ·
 * client beneath). Each row's title is a button stretched over the row.
 *
 * Opening a row inserts a full-width row beneath it with the player (one
 * tap: the row tap is the intent, as in layout A), the credits and "Full
 * page →". One row open at a time; Escape or Close collapses it and focus
 * returns to the row. While a row is open its first role's tag colour
 * becomes the index's lit colour (the column labels and the open row's
 * labels); the wordmark stays green because it is not in here.
 */
export function ExpandingIndex({
  projects,
  email,
  reviewPrefix,
}: ExpandingIndexProps) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const triggers = useRef(new Map<string, HTMLButtonElement>());
  const closeButton = useRef<HTMLButtonElement>(null);
  const lastOpened = useRef<string | null>(null);

  const change = useCallback(
    (next: string | null) => changeWithTransition(() => setOpenSlug(next)),
    [],
  );

  useEffect(() => {
    if (openSlug) {
      lastOpened.current = openSlug;
      closeButton.current?.focus({ preventScroll: true });
      document
        .getElementById(`${reviewPrefix}-expanded-${openSlug}`)
        ?.scrollIntoView({
          block: "nearest",
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
    } else if (lastOpened.current) {
      triggers.current.get(lastOpened.current)?.focus();
      lastOpened.current = null;
    }
  }, [openSlug, reviewPrefix]);

  useEffect(() => {
    if (!openSlug) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") change(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openSlug, change]);

  const open = projects.find((project) => project.slug === openSlug);
  const litRole = open?.roles[0];
  const lit = {
    "--lit": litRole ? ROLE_VAR[litRole] : undefined,
  } as CSSProperties;
  const labelTone = litRole ? "text-(--lit)" : "text-muted-foreground";

  return (
    <div style={lit}>
      <style>{VIEW_TRANSITION_CSS}</style>
      <table className="w-full border-collapse text-left max-md:block">
        <thead className="max-md:hidden">
          <tr className={cn(LABEL, labelTone, "transition-colors")}>
            <th scope="col" className="w-44 pb-3 font-medium">
              <span className="sr-only">Frame</span>
            </th>
            <th scope="col" className="pb-3 font-medium">
              Title
            </th>
            <th scope="col" className="w-20 pb-3 font-medium">
              Year
            </th>
            <th scope="col" className="w-64 pb-3 font-medium">
              Role
            </th>
            <th scope="col" className="w-40 pb-3 font-medium max-xl:hidden">
              Lane
            </th>
          </tr>
        </thead>
        <tbody className="max-md:flex max-md:flex-col max-md:gap-8">
          {projects.map((project, index) => {
            const isOpen = project.slug === openSlug;
            const panelId = `${reviewPrefix}-expanded-${project.slug}`;
            return (
              <Fragment key={project.slug}>
                <tr
                  data-review-id={`${reviewPrefix}.index.${project.slug}`}
                  className={cn(
                    "group relative border-t border-border align-middle",
                    "max-md:flex max-md:flex-wrap max-md:items-center max-md:gap-x-2 max-md:gap-y-2 max-md:border-0",
                  )}
                  style={{
                    viewTransitionName: `${reviewPrefix}-row-${project.slug}`,
                  }}
                >
                  <td className="py-3 pr-4 max-md:w-full max-md:p-0">
                    <Frame className="w-40 border border-border/30 max-md:w-full">
                      <Image
                        src={reviewPoster(project.slug).src}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 160px, 100vw"
                        preload={index === 0}
                        loading={index === 1 ? "eager" : undefined}
                        className="object-cover opacity-75 transition-opacity duration-(--dur-fast) group-hover:opacity-100 group-focus-within:opacity-100"
                      />
                      {FRAME_TO_REPLACE.has(project.slug) ? (
                        <FrameRibbon>Frame to be replaced</FrameRibbon>
                      ) : null}
                    </Frame>
                  </td>
                  <td
                    className={cn(
                      "py-3 pr-4",
                      "max-md:pointer-events-none max-md:absolute max-md:inset-x-0 max-md:top-0 max-md:flex max-md:aspect-video max-md:items-end",
                      "max-md:bg-linear-to-t max-md:from-background/90 max-md:to-transparent max-md:p-3",
                    )}
                  >
                    <div className="flex flex-col gap-0.5">
                      <button
                        ref={(node) => {
                          if (node) triggers.current.set(project.slug, node);
                          else triggers.current.delete(project.slug);
                        }}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={isOpen ? panelId : undefined}
                        onClick={() => change(isOpen ? null : project.slug)}
                        className={cn(
                          "cursor-pointer text-left text-lg leading-tight font-bold underline-offset-4",
                          "after:absolute after:inset-0 after:content-[''] max-md:pointer-events-auto",
                          "group-hover:underline focus-visible:underline focus-visible:outline-none",
                          "focus-visible:after:outline-2 focus-visible:after:outline-ring",
                        )}
                      >
                        {project.title}
                      </button>
                      <span className="text-sm text-muted-foreground max-md:hidden">
                        {project.client}
                        <span className="xl:hidden">
                          {project.client ? " · " : ""}
                          {laneLabel(project)}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-sm text-muted-foreground tabular-nums max-md:p-0">
                    {project.year}
                  </td>
                  <td className="py-3 pr-4 max-md:p-0">
                    <RoleTags roles={project.roles} />
                  </td>
                  <td className="py-3 text-sm text-muted-foreground max-xl:hidden">
                    {laneLabel(project)}
                  </td>
                  {project.client ? (
                    <td className="text-sm text-muted-foreground md:hidden">
                      <span aria-hidden="true">· </span>
                      {project.client}
                    </td>
                  ) : null}
                </tr>
                {isOpen ? (
                  <tr
                    id={panelId}
                    data-review-id={`${reviewPrefix}.expanded`}
                    className="max-md:block"
                    style={{
                      viewTransitionName: `${reviewPrefix}-expanded`,
                    }}
                  >
                    <td colSpan={5} className="pb-8 max-md:block">
                      <ExpandedRow
                        project={project}
                        email={email}
                        labelTone={labelTone}
                        closeRef={closeButton}
                        onClose={() => change(null)}
                      />
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function RoleTags({ roles }: Readonly<{ roles: ReadonlyArray<ProjectRole> }>) {
  return (
    <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {roles.slice(0, 3).map((role) => (
        <li key={role} className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className={cn("size-2 rounded-full", ROLE_DOT[role])}
          />
          <span className="text-xs tracking-[0.12em] text-muted-foreground uppercase max-md:sr-only">
            {ROLE_LABEL[role]}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ExpandedRow({
  project,
  email,
  labelTone,
  closeRef,
  onClose,
}: Readonly<{
  project: Project;
  email: string;
  labelTone: string;
  closeRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}>) {
  return (
    <div className="grid gap-5 pt-2 xl:grid-cols-[2fr_1fr] xl:gap-8">
      <ProjectPlayer project={project} />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className={cn(LABEL, labelTone)}>
            {project.roles.map((role) => ROLE_LABEL[role]).join(" · ")}
          </p>
          <p className="text-[1.75rem] leading-[1.05] font-extrabold tracking-[-0.015em]">
            {project.title}
          </p>
          <p className="text-sm text-muted-foreground">
            {[project.year, project.roleLabel, project.client]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
        {project.story ? (
          <p className="max-w-[68ch] leading-relaxed">{project.story}</p>
        ) : null}
        {project.awards?.length ? (
          <ul className="flex flex-col gap-1 text-sm">
            {project.awards.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : null}
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
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
            className="transition-colors hover:text-(--link)"
          >
            {email}
          </a>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className={cn(
              LABEL,
              "ml-auto cursor-pointer border border-border px-3 py-1.5 transition-colors hover:border-(--link) hover:text-(--link)",
              "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
            )}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
