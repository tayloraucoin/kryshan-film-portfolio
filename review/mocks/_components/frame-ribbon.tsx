import type { ReactNode } from "react";

/**
 * A marker on one frame that says the media in it is not final ("Frame to
 * be replaced", "Link pending"). The page-level placeholder ribbon lives in
 * `app/review/` and marks a whole page; this one marks one piece, so the
 * client sees which frames are waiting on him without the page reading as
 * unfinished. Same amber as that ribbon so the two read as one convention.
 */
export function FrameRibbon({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <span className="pointer-events-none absolute top-2 right-2 z-10 rounded-sm border border-amber-500/50 bg-background/85 px-2 py-1 text-[0.6875rem] leading-none font-semibold tracking-wide text-amber-300">
      {children}
    </span>
  );
}
