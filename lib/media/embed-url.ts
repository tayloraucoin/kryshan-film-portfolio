/**
 * Embed URLs for the two video hosts a client site is allowed to use.
 *
 * Video is never hosted in the repo (docs/PERFORMANCE.md §5). These builders
 * are pure so the same URL logic serves the poster-first player and any
 * structured data that names the video.
 */
export type VideoProvider = "youtube" | "vimeo";

export type VideoRef = {
  provider: VideoProvider;
  /** The host's id: the `v=` value for YouTube, the numeric id for Vimeo. */
  id: string;
  /** Optional unlisted-video hash for Vimeo (`?h=`). */
  hash?: string;
};

/**
 * The iframe src. Autoplay is on by default because the iframe only ever
 * mounts after a tap; `{ autoplay: false }` gives the plain embed, for
 * structured data (`VideoObject.embedUrl`).
 */
export function embedUrl(
  video: VideoRef,
  { autoplay = true }: { autoplay?: boolean } = {},
): string {
  switch (video.provider) {
    case "youtube": {
      const params = new URLSearchParams({
        ...(autoplay ? { autoplay: "1" } : {}),
        rel: "0",
        modestbranding: "1",
        playsinline: "1",
      });
      return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.id)}?${params}`;
    }
    case "vimeo": {
      const params = new URLSearchParams({
        ...(autoplay ? { autoplay: "1" } : {}),
        dnt: "1",
        title: "0",
        byline: "0",
        portrait: "0",
      });
      if (video.hash) params.set("h", video.hash);
      return `https://player.vimeo.com/video/${encodeURIComponent(video.id)}?${params}`;
    }
  }
}

/** The public watch page, for links and structured data. */
export function watchUrl(video: VideoRef): string {
  switch (video.provider) {
    case "youtube":
      return `https://www.youtube.com/watch?v=${encodeURIComponent(video.id)}`;
    case "vimeo":
      return `https://vimeo.com/${encodeURIComponent(video.id)}`;
  }
}
