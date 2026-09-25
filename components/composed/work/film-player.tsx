import Image from "next/image";
import { Frame } from "@/components/composed/media/frame";
import { VideoEmbed } from "@/components/composed/media/video-embed";
import type { Film } from "@/components/composed/work/film";
import { CHROME, FILM_COPY } from "@/content/site";
import { cn } from "@/lib/cn";

const PLAYER_SIZES = "(min-width: 1280px) 50vw, 100vw";

/**
 * A film's media, for either kind of film (spec §4.3, D-SITE-9). The
 * decision it carries: YouTube and Vimeo play here; anything else is
 * watched where it really lives. A link-out shows the poster and "Watch on
 * {host} ↗", opening a new tab, and is never embedded and never pointed at
 * the old site.
 *
 * In the panel the player mounts already playing (`startPlaying`, the
 * default): the tap that opened it was the intent. The detail page (SITE-5)
 * passes `startPlaying={false}` for a poster-first player.
 */
export function FilmPlayer({
  film,
  startPlaying = true,
  preload = false,
  className,
}: Readonly<{
  film: Film;
  startPlaying?: boolean;
  /** The detail page's poster is its LCP element. */
  preload?: boolean;
  className?: string;
}>) {
  const { embed, poster, title } = film;

  if (embed.provider !== "linkout") {
    return (
      <div className={className}>
        <VideoEmbed
          video={embed}
          title={title}
          poster={poster}
          priority={preload}
          startPlaying={startPlaying}
        />
      </div>
    );
  }

  return (
    <Frame className={className}>
      <Image
        src={poster}
        alt=""
        fill
        sizes={PLAYER_SIZES}
        preload={preload}
        placeholder="blur"
        className="object-cover opacity-60"
      />
      <span className="absolute inset-0 flex items-center justify-center p-4">
        <a
          href={embed.url}
          target="_blank"
          rel="noopener"
          className={cn(
            "inline-flex min-h-11 items-center gap-1.5 rounded-(--radius) border border-border bg-background/90 px-4 text-sm font-semibold text-foreground transition-colors hover:text-(--link)",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          )}
        >
          {FILM_COPY.linkOut(embed.host)}
          <span aria-hidden="true">↗</span>
          <span className="sr-only">{CHROME.newTab}</span>
        </a>
      </span>
    </Frame>
  );
}
