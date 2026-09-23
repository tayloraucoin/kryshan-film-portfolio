import { Mail } from "lucide-react";
import { findProject, type Project } from "@/content/projects";
import { NAV_LABELS } from "@/content/site";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/config";
import type { ReviewKit } from "@/review/kits/types";
import { FeaturedLightbox } from "@/review/mocks/_components/featured-lightbox";
import { ReelStrip } from "@/review/mocks/_components/reel-strip";

/**
 * Home B: kit B in layout B, "The Study" (docs/client/kryshan-06-layout-B.md
 * §4 Home, §6 breakpoints). A persistent left rail carries him (≥1024);
 * below that it collapses to a header, the self-description moves to the
 * footer, and under 768 a fixed bottom bar keeps Email one tap away.
 *
 * Strings are the layout's own, verbatim (the rail's three lines, the names
 * block, the two press quotes, the teaching line); the hero line is kit B's
 * voice (PDF B) with its number pending (02 §13 #3). Links to pages not yet
 * built are inert; the email and his profiles are real.
 */

const R = "home-b";

const STRIP_SLUGS = ["just-watch-us", "directors-reel", "jack"] as const;
const FEATURED_SLUGS = [
  "5rhythms",
  "the-wolf-of-west-georgia-street",
  "just-up-the-block",
  "contact-club",
] as const;

// Layout A §7 / B §7 rights gate: NDA'd work never renders.
function pick(slugs: ReadonlyArray<string>): ReadonlyArray<Project> {
  return slugs
    .map((slug) => findProject(slug))
    .filter(
      (project): project is Project =>
        project !== undefined && project.rights !== "nda",
    );
}

/** Layout B §4, the rail's third line. */
const RAIL_LINE = "Stories that are hard to look away from.";

/** Layout B §4 Home 3, verbatim. Names he may state, never show (02 §8.3). */
const NAMES_LINE =
  "I've directed Ted Danson, Mary Steenbergen, Peter Gallagher, Kevin Smith, Tom Green and Aubrey Plaza for spots I'm not allowed to show you, and shot behind the scenes for Disney, Netflix, Sony, Paramount, Universal, CBS and the CW on sixty-odd productions.";

/** Layout B §4 Home 3; sources per 03 §5. Wording to be checked against the articles at build. */
const PRESS = [
  { id: "aicn", quote: "Wonderfully wrong.", source: "Ain't It Cool News" },
  {
    id: "citytv",
    quote: "Must-see… should send their filmmakers to the big leagues.",
    source: "CityTV News",
  },
] as const;

/** Layout B §4 Home 4, verbatim. */
const TEACHING_LINE =
  "I also teach. Directing, camera and editing at VFS and LaSalle; camps; coaching.";

const inertLink = { href: "#", "aria-disabled": true } as const;

const MONO_NAV =
  "font-heading text-[0.8125rem] transition-colors hover:text-(--link)";

export function HomeB({ kit }: Readonly<{ kit: ReviewKit }>) {
  return (
    <div
      data-kit-mock={kit.id}
      className={cn(
        "min-h-full max-md:pb-16",
        "lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10 lg:px-10",
        "xl:grid-cols-[260px_minmax(0,1fr)]",
      )}
    >
      <Rail />
      <Header />
      <div className="flex min-w-0 flex-col">
        <main
          id="main"
          className="flex flex-col gap-14 px-4 pt-6 pb-16 md:px-6 lg:px-0 lg:pt-10"
        >
          <section className="flex flex-col gap-6">
            <h1
              data-review-id={`${R}.hero-line`}
              className="max-w-[22ch] font-sans text-[2rem] leading-[1.08] font-medium tracking-[-0.01em] md:text-[2.5rem]"
            >
              Twenty-seven years of stories, and{" "}
              <span className="text-primary">a good time telling them.</span>
            </h1>
            <ReelStrip projects={pick(STRIP_SLUGS)} reviewPrefix={R} />
          </section>

          <section
            data-review-id={`${R}.featured`}
            className="rounded-(--radius) bg-(--surface-dark) p-4 md:p-6"
          >
            <FeaturedLightbox
              projects={pick(FEATURED_SLUGS)}
              kit={kit}
              email={SITE.email}
              reviewPrefix={R}
            />
          </section>

          <section
            data-review-id={`${R}.names`}
            className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:gap-10"
          >
            <p className="text-xl leading-snug">{NAMES_LINE}</p>
            <div className="flex flex-col gap-6">
              {PRESS.map((item) => (
                <figure
                  key={item.id}
                  data-review-id={`${R}.quote.${item.id}`}
                  className="flex flex-col gap-2"
                >
                  <blockquote className="font-(family-name:--font-quote) text-[1.375rem] leading-[1.35] italic">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="font-heading text-[0.8125rem] text-muted-foreground">
                    {item.source}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <p
            data-review-id={`${R}.teaser`}
            className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-border pt-6 text-lg"
          >
            <span>{TEACHING_LINE}</span>
            <a
              {...inertLink}
              className="font-heading text-sm text-(--link) underline-offset-4 hover:underline"
            >
              Teaching →
            </a>
          </p>
        </main>
        <Footer />
      </div>
      <BottomBar />
    </div>
  );
}

function Rail() {
  return (
    <aside
      data-review-id={`${R}.rail`}
      className="hidden lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:gap-6 lg:overflow-y-auto lg:py-10"
    >
      <p className="font-heading text-[2rem] leading-none font-bold tracking-[-0.02em] text-primary">
        Kryshan
        <br />
        Randel
      </p>
      <nav aria-label="Primary">
        <ul className="flex flex-col gap-1.5">
          {NAV_LABELS.map((label) => (
            <li key={label}>
              <a
                {...inertLink}
                data-review-id={`${R}.rail.${label.toLowerCase()}`}
                className={MONO_NAV}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <hr className="border-border" />
      <SelfDescription />
      <a
        href={`mailto:${SITE.email}`}
        data-review-id={`${R}.rail.email`}
        className="text-sm font-medium break-all text-(--link) underline-offset-4 hover:underline"
      >
        {SITE.email}
      </a>
      <Socials where="rail" />
    </aside>
  );
}

function SelfDescription({ className }: Readonly<{ className?: string }>) {
  return (
    <p className={cn("text-sm leading-relaxed", className)}>
      {SITE.tagline} {SITE.place} {RAIL_LINE}
    </p>
  );
}

function Socials({ where }: Readonly<{ where: "rail" | "footer" }>) {
  const primary = SITE.social.filter((item) => !item.secondary);
  const secondary = SITE.social.filter((item) => item.secondary);
  return (
    <div className="flex flex-col gap-1.5 font-heading">
      <SocialRow items={primary} where={where} className="text-xs" />
      <SocialRow items={secondary} where={where} className="text-[0.6875rem]" />
    </div>
  );
}

function SocialRow({
  items,
  where,
  className,
}: Readonly<{
  items: ReadonlyArray<{ label: string; href: string }>;
  where: "rail" | "footer";
  className?: string;
}>) {
  return (
    <ul className={cn("flex flex-wrap gap-x-3 gap-y-1", className)}>
      {items.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            target="_blank"
            rel="me noopener"
            data-review-id={`${R}.${where}.${item.label.toLowerCase()}`}
            className="text-muted-foreground transition-colors hover:text-(--link)"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Header() {
  return (
    <header
      data-review-id={`${R}.header`}
      className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-border px-4 py-3 md:px-6 lg:hidden"
    >
      <p className="font-heading text-2xl leading-none font-bold tracking-[-0.02em] text-primary">
        Kryshan Randel
      </p>
      <div className="flex items-center gap-5">
        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {NAV_LABELS.map((label) => (
              <li key={label}>
                <a
                  {...inertLink}
                  data-review-id={`${R}.header.${label.toLowerCase()}`}
                  className={MONO_NAV}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={`mailto:${SITE.email}`}
          aria-label={`Email ${SITE.email}`}
          data-review-id={`${R}.header.email`}
          className="flex size-9 items-center justify-center rounded-(--radius) text-(--link) transition-colors hover:bg-muted"
        >
          <Mail className="size-5" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer
      data-review-id={`${R}.footer`}
      className="mt-auto flex flex-col gap-4 border-t border-border px-4 py-8 md:px-6 lg:px-0"
    >
      <SelfDescription className="max-w-[48ch] lg:hidden" />
      <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
        <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
          <a
            href={`mailto:${SITE.email}`}
            data-review-id={`${R}.footer.email`}
            className="font-medium text-(--link) underline-offset-4 hover:underline"
          >
            {SITE.email}
          </a>
          <span className="text-sm text-muted-foreground">{SITE.place}</span>
        </div>
        <Socials where="footer" />
      </div>
    </footer>
  );
}

function BottomBar() {
  return (
    <nav
      aria-label="Email and work"
      data-review-id={`${R}.bottom-bar`}
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-background font-heading text-sm md:hidden"
    >
      <a
        href={`mailto:${SITE.email}`}
        className="flex h-14 items-center justify-center font-bold text-(--link)"
      >
        Email
      </a>
      <a
        {...inertLink}
        className="flex h-14 items-center justify-center border-l border-border"
      >
        Work
      </a>
    </nav>
  );
}
