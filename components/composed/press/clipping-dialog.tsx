"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/primitives/dialog";
import type { PressSource } from "@/content/press";
import { PRESS_COPY } from "@/content/site";
import { cn } from "@/lib/cn";

const FOCUS =
  "rounded-(--radius) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/**
 * "See the clipping": the printed article behind a press quote, on intent
 * (docs/client/press/NEXT-STEPS.md, direction 5). The decision it carries:
 * the clipping is proof, not decoration, so nothing of it loads until it's
 * asked for. The popup mounts on open, so the image is requested then and
 * never with the page. The image is a tight crop (headline and the quoted
 * passage, never the whole page), shown at its native ratio, and its alt
 * text is the passage transcribed.
 */
export function ClippingDialog({
  source,
  className,
}: Readonly<{ source: PressSource; className?: string }>) {
  const { clip } = source;
  if (!clip) return null;
  // Without a headline (The Nerve's is profane), the outlet is the title.
  const title = source.headline ?? source.outlet;
  const meta = [
    source.headline ? source.outlet : undefined,
    source.published,
    source.author,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          // A 44 px target on touch screens that doesn't push the caption line apart.
          "-my-3 inline-flex min-h-11 items-center text-(--link) underline-offset-4 hover:underline md:my-0 md:min-h-0",
          FOCUS,
          className,
        )}
      >
        {PRESS_COPY.seeClipping}
        <span className="sr-only">
          {PRESS_COPY.clippingFrom(source.outlet)}
        </span>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100svh-2rem)] gap-3 overflow-y-auto rounded-(--radius) p-4 sm:max-w-[min(44rem,calc(100%-2rem))] md:p-6">
        <div className="flex flex-col gap-1 pr-8">
          <DialogTitle className="font-heading text-xl leading-tight font-semibold font-stretch-88%">
            {title}
          </DialogTitle>
          <DialogDescription>{meta}</DialogDescription>
        </div>
        <Image
          src={clip.src}
          alt={clip.alt}
          sizes="(min-width: 768px) 44rem, 100vw"
          className="h-auto w-full"
        />
      </DialogContent>
    </Dialog>
  );
}
