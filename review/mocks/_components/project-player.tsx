import Image from "next/image";
import { Frame } from "@/components/composed/media/frame";
import { VideoEmbed } from "@/components/composed/media/video-embed";
import type { Project } from "@/content/projects";
import { FrameRibbon } from "@/review/mocks/_components/frame-ribbon";

const PLAYER_SIZES = "(min-width: 1280px) 50vw, 100vw";

/**
 * The media half of an opened project, for every provider a project can
 * have. Rendered only after a tap, so a YouTube or Vimeo piece mounts its
 * player already playing: the tap that opened it was the intent.
 *
 * - `youtube` / `vimeo`: the poster-first player, started.
 * - `linkout`: the poster and a "Watch on the old site →" card; nothing is
 *   embedded (The Bully Solution, Shotlister).
 * - `none`: the poster with a "Link pending" ribbon (VANDU).
 *
 * A poster marked `posterStatus: "replace"` carries its ribbon wherever the
 * poster is still visible.
 */
export function ProjectPlayer({ project }: Readonly<{ project: Project }>) {
  const { embed, poster, title } = project;

  if (embed.provider === "youtube" || embed.provider === "vimeo") {
    return (
      <VideoEmbed video={embed} title={title} poster={poster} startPlaying />
    );
  }

  return (
    <Frame>
      <Image
        src={poster.src}
        alt=""
        fill
        sizes={PLAYER_SIZES}
        className="object-cover opacity-60"
      />
      {project.posterStatus === "replace" ? (
        <FrameRibbon>Frame to be replaced</FrameRibbon>
      ) : null}
      {embed.provider === "linkout" ? (
        <span className="absolute inset-0 flex items-center justify-center p-4">
          <a
            href={embed.url}
            target="_blank"
            rel="noopener"
            className="rounded-sm border border-border bg-background/90 px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:text-accent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            Watch on the old site →
          </a>
        </span>
      ) : (
        <FrameRibbon>Link pending</FrameRibbon>
      )}
    </Frame>
  );
}
