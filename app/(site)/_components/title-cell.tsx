import { HOME_H1, HOME_LINKS } from "@/content/home";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/config";

/** The Label step: Archivo 600, 11 px, width 88, tracking 18%, uppercase. */
const LABEL =
  "text-[0.6875rem] leading-none font-semibold font-stretch-88% tracking-[0.18em] uppercase";

/**
 * Home's first cell (D-KRD-3, D-KRD-5; handoff §6.3): him, in his voice,
 * never his name. The page's only h1, with its one red phrase, then the
 * roles line and, on phones, "Watch ↓" to the first film. No portrait and
 * no empty frame until he supplies one (D-SITE-16).
 */
export function TitleCell({ firstFilmId }: Readonly<{ firstFilmId: string }>) {
  const [before = "", after = ""] = HOME_H1.text.split(HOME_H1.red);

  return (
    <div className="flex h-full flex-col justify-end gap-3 pt-6 pb-4 md:py-6 xl:py-2">
      <h1 className="font-heading text-[2rem] leading-[1.02] font-bold font-stretch-80% md:text-[clamp(2rem,2.6vw,2.5rem)] xl:text-[2.5rem]">
        {before}
        <span className="text-primary">{HOME_H1.red}</span>
        {after}
      </h1>
      <p className="max-w-[48ch] text-base leading-[1.4] md:text-xl">
        {SITE.tagline}{" "}
        <span className="text-muted-foreground">{SITE.place}</span>
      </p>
      <a
        href={`#${firstFilmId}`}
        className={cn(
          LABEL,
          "inline-flex min-h-11 items-center gap-1.5 self-start text-(--link) md:hidden",
        )}
      >
        {HOME_LINKS.watch}
        <span aria-hidden="true">↓</span>
      </a>
    </div>
  );
}
