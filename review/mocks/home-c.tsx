import { findProject, PROJECTS, type Project } from "@/content/projects";
import { STRANDS } from "@/content/site";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/config";
import type { ReviewKit } from "@/review/kits/types";
import { ExpandingIndex } from "@/review/mocks/_components/expanding-index";

/**
 * Home C: kit C in layout C, "The Index" (docs/client/kryshan-06-layout-C.md
 * §4 Home, §6 breakpoints). One short statement over a ghost word, then the
 * work as a list: eight rows that expand into a player.
 *
 * The H1 and support line are kit C's voice (PDF C, prompt C); the strands
 * are 03 §8. Links to pages not yet built are inert; the email and his
 * profiles are real.
 */

const R = "home-c";

/** Layout C §4: Credits replaces Teaching as the fifth page (02 §14 Q7 open). */
const NAV_C = ["Work", "About", "Credits", "Contact"] as const;

const INDEX_SLUGS = [
  "just-watch-us",
  "directors-reel",
  "jack",
  "5rhythms",
  "tuts-2026-trailer",
  "the-wolf-of-west-georgia-street",
  "just-up-the-block",
  "dare",
] as const;

// Rights gate: NDA'd work never renders. The Bully Solution is not in this list.
const INDEX_PROJECTS: ReadonlyArray<Project> = INDEX_SLUGS.map((slug) =>
  findProject(slug),
).filter(
  (project): project is Project =>
    project !== undefined && project.rights !== "nda",
);

/** Kit C's support line: the roles line with IATSE 669 (PDF C voice). */
const SUPPORT =
  "Kryshan Randel. Director, camera operator, editor, and film instructor. IATSE 669. Vancouver, works anywhere.";

const inertLink = { href: "#", "aria-disabled": true } as const;

/** Kit C's wide label: Chivo 500, tracking 28%, uppercase (Airview). */
const LABEL = "text-xs font-medium tracking-[0.28em] uppercase";

export function HomeC({ kit }: Readonly<{ kit: ReviewKit }>) {
  return (
    <div data-kit-mock={kit.id} className="flex min-h-full flex-col">
      <Nav />
      <main id="main" className="flex flex-col gap-16 pb-16 md:gap-20">
        <Statement />
        <section aria-labelledby={`${R}-index-label`} className="px-4 md:px-8">
          <h2 id={`${R}-index-label`} className="sr-only">
            {kit.voice.work}
          </h2>
          <ExpandingIndex
            projects={INDEX_PROJECTS}
            email={SITE.email}
            reviewPrefix={R}
          />
        </section>
        <Strands />
        <p data-review-id={`${R}.all-work`} className="px-4 md:px-8">
          <a
            {...inertLink}
            className={cn(
              LABEL,
              "text-sm transition-colors hover:text-(--link)",
            )}
          >
            All {PROJECTS.length} →
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
      className="flex flex-col gap-3 border-b border-border px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8"
    >
      <a
        {...inertLink}
        data-review-id={`${R}.nav.wordmark`}
        className="text-xl leading-none font-black tracking-[-0.02em] text-primary"
      >
        {SITE.name}
      </a>
      <nav aria-label="Primary">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {NAV_C.map((label) => (
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

function Statement() {
  return (
    <section
      data-review-id={`${R}.statement`}
      className="relative isolate flex flex-col justify-center gap-5 overflow-hidden px-4 pt-12 pb-4 md:max-h-[60vh] md:px-8 md:pt-20"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-0 -z-10 -translate-y-1/2 text-[30vw] leading-none font-black tracking-[-0.03em] text-muted select-none max-md:hidden"
      >
        RANDEL
      </span>
      <h1 className="max-w-[20ch] text-[2rem] leading-[1.02] font-extrabold tracking-[-0.015em] md:text-[2.5rem] xl:text-[3.25rem]">
        Any story. Any budget.{" "}
        <span className="text-primary">Told properly.</span>
      </h1>
      <p className="max-w-[46ch] text-lg leading-snug font-light md:text-xl">
        {SUPPORT}
      </p>
    </section>
  );
}

function Strands() {
  return (
    <section
      data-review-id={`${R}.strands`}
      className="grid gap-10 px-4 md:grid-cols-3 md:gap-8 md:px-8"
    >
      {STRANDS.map((strand) => (
        <div
          key={strand.id}
          data-review-id={`${R}.strand.${strand.id}`}
          className="flex flex-col gap-3 border-t border-border pt-4"
        >
          {/* Teaching is the human strand: amber, never beside green (kit C). */}
          <h2
            className={cn(
              LABEL,
              strand.id === "teaching" ? "text-accent" : "text-foreground",
            )}
          >
            {strand.title}
          </h2>
          <p className="max-w-[60ch] leading-relaxed text-muted-foreground">
            {strand.body}
          </p>
          <a
            {...inertLink}
            className={cn(
              LABEL,
              "self-start text-foreground transition-colors hover:text-(--link)",
            )}
          >
            {strand.id === "teaching" ? "About" : "Work"} →
          </a>
        </div>
      ))}
    </section>
  );
}

function Footer() {
  const primary = SITE.social.filter((item) => !item.secondary);
  const secondary = SITE.social.filter((item) => item.secondary);

  return (
    <footer
      data-review-id={`${R}.footer`}
      className="mt-auto flex flex-col gap-4 border-t border-border px-4 py-8 md:px-8"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
        <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
          <a
            href={`mailto:${SITE.email}`}
            data-review-id={`${R}.footer.email`}
            className="text-base transition-colors hover:text-(--link)"
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
