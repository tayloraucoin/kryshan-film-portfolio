import type { Testimonial as TestimonialEntry } from "@/content/testimonials";
import { cn } from "@/lib/cn";

/**
 * One quote and who said it (spec §6.4, §6.5; D-SITE-13), on About and
 * Teaching. The decision it carries: the attribution comes from the
 * person's own consent, never from the page. "full" and "first-name-role"
 * show "{name}, {role}"; "anonymous-role" shows the role alone, and the name
 * never reaches the HTML. The relationship is never shown. Roman type:
 * italic is for press quotes. Server component.
 */
export function Testimonial({
  testimonial,
  className,
}: Readonly<{ testimonial: TestimonialEntry; className?: string }>) {
  const attribution =
    testimonial.consent.attribution === "anonymous-role"
      ? testimonial.role
      : `${testimonial.name}, ${testimonial.role}`;

  return (
    <figure className={cn("flex max-w-[68ch] flex-col gap-2", className)}>
      <blockquote className="text-lg leading-relaxed">
        {testimonial.quote}
      </blockquote>
      <figcaption className="text-sm text-muted-foreground">
        {attribution}
      </figcaption>
    </figure>
  );
}
