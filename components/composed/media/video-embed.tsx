"use client";

import { useState } from "react";
import Image from "next/image";
import { Frame } from "@/components/composed/media/frame";
import { embedUrl, type VideoRef } from "@/lib/media/embed-url";

type VideoEmbedProps = {
  video: VideoRef;
  title: string;
  /** A chosen still, sized like the video. Lives in `public/` or a listed remote host. */
  poster: { src: string; width: number; height: number };
  /** True for the first frame on the page, so its poster is the LCP candidate. */
  priority?: boolean;
  ratio?: string;
  /**
   * Mount the player straight away. Only for a player that is itself created
   * by a tap (an expanding cell, a lightbox): that tap is the intent, so
   * asking for a second one would be friction, not restraint.
   */
  startPlaying?: boolean;
};

/**
 * Poster-first video. Nothing but an image and a button until the visitor
 * taps; then the host's iframe mounts with autoplay, which browsers allow
 * because the tap is the gesture. No iframe, no player script and no third
 * party request exist before intent (docs/PERFORMANCE.md §5).
 */
export function VideoEmbed({
  video,
  title,
  poster,
  priority = false,
  ratio = "16 / 9",
  startPlaying = false,
}: VideoEmbedProps) {
  const [playing, setPlaying] = useState(startPlaying);

  return (
    <Frame ratio={ratio}>
      {playing ? (
        <iframe
          src={embedUrl(video)}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <Image
            src={poster.src}
            alt=""
            width={poster.width}
            height={poster.height}
            priority={priority}
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-transform motion-safe:group-hover:scale-105">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="ml-1 size-7 fill-current"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </Frame>
  );
}
