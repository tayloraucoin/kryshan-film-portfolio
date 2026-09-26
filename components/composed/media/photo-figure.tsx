import Image from "next/image";
import { Frame } from "@/components/composed/media/frame";
import type { Photo } from "@/content/photo";
import { cn } from "@/lib/cn";

/**
 * One captioned photograph (spec §4.5): About's "On set" and Teaching's
 * "In the room" both render the `Photo` type. The decision it carries: the
 * frame is the file's own 3:2, cropped when the file was made, never by
 * CSS, so nothing on a person is cut off by a layout change; a blur holds
 * the space until the image arrives, and the caption stays if it never
 * does. Server component.
 */
export function PhotoFigure({
  photo,
  sizes = "(min-width: 768px) 33vw, 100vw",
  className,
}: Readonly<{ photo: Photo; sizes?: string; className?: string }>) {
  return (
    <figure className={cn("flex flex-col gap-2", className)}>
      <Frame ratio={`${photo.src.width} / ${photo.src.height}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          className="object-cover"
        />
      </Frame>
      <figcaption className="text-[0.8125rem] leading-snug font-medium font-stretch-90% tracking-[0.02em] text-muted-foreground">
        {photo.caption}
      </figcaption>
    </figure>
  );
}
