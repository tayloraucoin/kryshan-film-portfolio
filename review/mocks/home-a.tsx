import { findProject, PROJECTS, type Project } from "@/content/projects";
import { NAV_LABELS, SOCIALS, STRANDS } from "@/content/site";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/config";
import type { ReviewKit } from "@/review/kits/types";
import { ExpandingGrid } from "@/review/mocks/_components/expanding-grid";

/**
 * Home A: kit A in layout A, "The Marquee" (docs/client/kryshan-06-layout-A.md
 * §4 Home, §6 breakpoints). No hero: the first screen is the grid, with his
 * name in the first cell. Real titles, real posters, copy from 03 §8.
 *
 * Every link that would go to a page not yet built is inert (`href="#"`,
 * `aria-disabled`); the email and his profiles are real. The review page
 * wraps this in kit A's `KitScope`.
 */

const R = "home-a";

/** Cells 2–9, in the layout's order: his top five, the lead flags, and three for range. */
const HOME_SLUGS = [
  "just-watch-us",
  "directors-reel",
  "jack",
  "5rhythms",
  "the-wolf-of-west-georgia-street",
  "just-up-the-block",
  "contact-club",
  "born-to-be",
] as const;

// Layout A §7: NDA'd work never renders. The Bully Solution is not in this list.
const HOME_PROJECTS: ReadonlyArray<Project> = HOME_SLUGS.map((slug) =>
  findProject(slug),
).filter(
  (project): project is Project =>
    project !== undefined && project.rights !== "nda",
);

const inertLink = {
  href: "#",
  "aria-disabled": true,
} as const;

/** Kit A's label voice: Archivo 600, width 88, tracking 18%, uppercase. */
const LABEL =
  "text-xs font-semibold font-stretch-88% tracking-[0.18em] uppercase";

export function HomeA({ kit }: Readonly<{ kit: ReviewKit }>) {
  return (
    <div data-kit-mock={kit.id} className="flex min-h-full flex-col">
      <Nav />
      <main id="main" className="flex flex-col gap-16 pb-16 md:gap-20">
        <ExpandingGrid
          reviewPrefix={R}
          titleCell={<TitleCell />}
          projects={HOME_PROJECTS}
          email={SITE.email}
        />
        <Strands />
        <p data-review-id={`${R}.all-work`} className="px-3 md:px-6">
          <a
            {...inertLink}
            className="font-heading text-[1.75rem] leading-none font-bold font-stretch-80% transition-colors hover:text-(--link)"
          >
            All {PROJECTS.length} pieces →
          </a>
        </p>
      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header
      data-review-id={`${R}.nav`}
      className={cn(
        "flex flex-col gap-2 border-b border-border/40 px-3 py-3",
        "md:flex-row md:items-center md:justify-between md:px-6 md:py-4",
      )}
    >
      <a
        {...inertLink}
        data-review-id={`${R}.nav.wordmark`}
        className="font-heading text-xl leading-none font-extrabold font-stretch-72% tracking-[0.01em] text-primary uppercase"
      >
        {SITE.name}
      </a>
      <nav aria-label="Primary">
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          {NAV_LABELS.map((label) => (
            <li key={label}>
              <a
                {...inertLink}
                data-review-id={`${R}.nav.${label.toLowerCase()}`}
                className={cn(LABEL, "transition-colors hover:text-(--link)")}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function TitleCell() {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-end gap-3 py-2",
        "max-md:min-h-[55svh] md:justify-between",
      )}
    >
      <h1 className="font-heading text-[clamp(3rem,4.2vw,4rem)] leading-[0.9] font-extrabold font-stretch-72% tracking-[0.01em] text-primary uppercase">
        Kryshan
        <br />
        Randel
      </h1>
      <p className="max-w-[34ch] text-sm leading-snug text-foreground xl:text-[0.8125rem]">
        {SITE.tagline} {SITE.place}
      </p>
      <a
        href={`#${R}-${HOME_SLUGS[0]}`}
        className={cn(LABEL, "text-(--link) md:hidden")}
      >
        Watch ↓
      </a>
    </div>
  );
}

function Strands() {
  return (
    <section
      data-review-id={`${R}.strands`}
      className="grid gap-10 px-3 md:px-6 xl:grid-cols-3 xl:gap-8"
    >
      {STRANDS.map((strand) => (
        <div
          key={strand.id}
          data-review-id={`${R}.strand.${strand.id}`}
          className="flex flex-col gap-3 border-t border-border/40 pt-4"
        >
          <h2 className="font-heading text-[1.75rem] leading-[1.15] font-semibold font-stretch-88%">
            {strand.title}
          </h2>
          <p className="max-w-[60ch] leading-relaxed text-muted-foreground">
            {strand.body}
          </p>
          <a
            {...inertLink}
            className="self-start text-sm font-semibold text-(--link) underline-offset-4 hover:underline"
          >
            {strand.id === "teaching" ? "Teaching" : "Work"} →
          </a>
        </div>
      ))}
    </section>
  );
}

function Footer() {
  const primary = SOCIALS.filter((item) => !item.secondary);
  const secondary = SOCIALS.filter((item) => item.secondary);

  return (
    <footer
      data-review-id={`${R}.footer`}
      className="mt-auto flex flex-col gap-4 border-t border-border/40 px-3 py-8 md:px-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
        <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
          <a
            href={`mailto:${SITE.email}`}
            data-review-id={`${R}.footer.email`}
            className="text-base text-foreground transition-colors hover:text-(--link)"
          >
            {SITE.email}
          </a>
          <span className="text-sm text-muted-foreground">{SITE.place}</span>
        </div>
        <SocialList items={primary} className="text-sm" />
      </div>
      <SocialList items={secondary} className="text-xs md:justify-end" />
    </footer>
  );
}

function SocialList({
  items,
  className,
}: Readonly<{
  items: ReadonlyArray<{ label: string; href: string }>;
  className?: string;
}>) {
  return (
    <ul className={cn("flex flex-wrap gap-x-4 gap-y-1", className)}>
      {items.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            target="_blank"
            rel="me noopener"
            data-review-id={`${R}.footer.${item.label.toLowerCase()}`}
            className="text-muted-foreground transition-colors hover:text-(--link)"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
