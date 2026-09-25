import { findProject, PROJECTS, type Project } from "@/content/projects";
import { NAV_LABELS, STRANDS } from "@/content/site";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/config";
import type { ReviewKit } from "@/review/kits/types";
import { FeaturedGrid } from "@/review/mocks/_components/home-d/featured-grid";
import { FilmRow } from "@/review/mocks/_components/home-d/film-row";
import { UnbuiltLink } from "@/review/mocks/_components/home-d/unbuilt-link";

/**
 * Home D: Layout A revised after Kryshan's review, in kit D
 * (docs/specs/02-review-demo-d/demo-d-ux-handoff-v1.md §6; KR-8).
 *
 * His name once, in a bar that stays at the top (on phones the name and
 * Contact stay, the other links scroll away). His own line in a wider
 * first cell. Six films; a tapped one opens full width on the line below
 * its tile. Links to pages the demo doesn't have say so and never move the
 * page. The review page wraps this in kit D's `KitScope`.
 */

const R = "home-d";

/** His top five and his "lead with this" flags, in his order (D-KRD-5). */
const FEATURED_SLUGS = [
  "just-watch-us",
  "directors-reel",
  "jack",
  "5rhythms",
  "the-wolf-of-west-georgia-street",
  "just-up-the-block",
] as const;

function showable(slugs: ReadonlyArray<string>): ReadonlyArray<Project> {
  return slugs
    .map((slug) => findProject(slug))
    .filter(
      (project): project is Project =>
        project !== undefined && project.rights !== "nda",
    );
}

const FEATURED = showable(FEATURED_SLUGS);

/**
 * The two rows (D-KRD-13; handoff §6.6), curated and explicit. The rules
 * that produced them govern edits: nothing already featured; each piece in
 * one row, by its first role; no poster marked "replace", no baked-in title
 * card, no link-out, no pending link; at most eight; passion and paid work
 * mixed for range.
 */
const DIRECTING_ROW = showable([
  "contact-club",
  "born-to-be",
  "a-very-bc-production",
  "dare",
  "its-a-crazier-life",
  "be-reel-green",
  "artless",
  "united8s",
]);

const CAMERA_ROW = showable([
  "riverdale-ew-bts",
  "a-dogs-way-home-epk",
  "tuts-2026-trailer",
  "tuts-2025-season-teaser",
  "tradeswoman-exhibit",
  "digital-days",
  "rffc-were-in-this-together",
]);

/** A strand's words, by id; the rows are captioned with them. */
function strand(id: (typeof STRANDS)[number]["id"]) {
  const found = STRANDS.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown strand: ${id}`);
  return found;
}

/** Kit A's label voice: Archivo 600, width 88, tracking 18%, uppercase. */
const LABEL =
  "text-xs font-semibold font-stretch-88% tracking-[0.18em] uppercase";

/** Nav items, each at least 44 px tall. */
const NAV_ITEM = cn(
  LABEL,
  "inline-flex min-h-11 items-center transition-colors hover:text-(--link)",
);

/**
 * Page-level CSS while Home D is mounted:
 * - the bar heights, and the focus offset that keeps a tabbed-to element
 *   clear of both sticky bars (WCAG 2.4.11)
 * - the player's width cap, so the whole frame fits under the bars
 * - the bar's hairline, drawn once the page has scrolled 8 px (CSS scroll
 *   timeline; always shown where that isn't supported)
 * - the transition timing (handoff §9)
 */
const PAGE_CSS = [
  ":root{--demo-bar-h:44px}",
  "@media (min-width:768px){:root{--demo-bar-h:56px}}",
  "html{scroll-padding-top:calc(var(--review-bar-h,0px) + var(--demo-bar-h) + 1rem)}",
  "[data-demo-d]{--player-cap:calc((100svh - var(--review-bar-h,0px) - var(--demo-bar-h) - 76px) * 16 / 9)}",
  "[data-demo-bar]{border-bottom:1px solid transparent}",
  "@keyframes demo-bar-line{from{border-bottom-color:transparent}to{border-bottom-color:color-mix(in oklab,var(--border) 40%,transparent)}}",
  "@supports (animation-timeline: scroll()){[data-demo-bar]{animation:demo-bar-line linear both;animation-timeline:scroll(root);animation-range:0 8px}}",
  "@supports not (animation-timeline: scroll()){[data-demo-bar]{border-bottom-color:color-mix(in oklab,var(--border) 40%,transparent)}}",
  // Transition timing (handoff §9): 220 ms out-eased for a move, 150 ms for
  // a swap in place (`runTransition` sets `data-demo-vt`).
  "::view-transition-group(*){animation-duration:220ms;animation-timing-function:cubic-bezier(0.2,0.8,0.2,1)}",
  "html[data-demo-vt=swap]::view-transition-group(*){animation-duration:150ms}",
].join("");

export function HomeD({ kit }: Readonly<{ kit: ReviewKit }>) {
  return (
    <div
      id={`${R}-top`}
      data-kit-mock={kit.id}
      data-demo-d
      className="flex min-h-full flex-col"
    >
      <style>{PAGE_CSS}</style>
      <Bar />
      <main
        id="main"
        className="flex flex-col gap-16 pt-3 pb-16 md:gap-20 md:pt-4"
      >
        <FeaturedGrid
          reviewPrefix={R}
          titleCell={<TitleCell />}
          projects={FEATURED}
          email={SITE.email}
        />
        <FilmRow
          id="directing"
          title={strand("directing").title}
          caption={strand("directing").body}
          projects={DIRECTING_ROW}
          email={SITE.email}
          reviewPrefix={R}
        />
        <FilmRow
          id="camera-editing"
          title={strand("camera-editing").title}
          caption={strand("camera-editing").body}
          projects={CAMERA_ROW}
          email={SITE.email}
          reviewPrefix={R}
        />
        <TeachingStrand />
        <p data-review-id={`${R}.all-work`} className="px-3 md:px-6">
          <UnbuiltLink className="font-heading text-[1.75rem] leading-none font-bold font-stretch-80% transition-colors hover:text-(--link)">
            All {PROJECTS.length} pieces →
          </UnbuiltLink>
        </p>
      </main>
      <Footer />
    </div>
  );
}

/**
 * The one place his name is set (D-KRD-3, 4). Sticky under the review bar.
 * At ≥768 one line: the name, then Work · About · Teaching · Contact. Below
 * 768 the sticky line holds the name and Contact, and Work · About ·
 * Teaching sit in a row beneath it that scrolls away.
 */
function Bar() {
  const pages = NAV_LABELS.filter((label) => label !== "Contact");

  return (
    <>
      <header
        data-demo-bar
        data-review-id={`${R}.bar`}
        className="sticky top-[var(--review-bar-h,0px)] z-30 flex h-[var(--demo-bar-h)] items-center justify-between gap-4 bg-background px-3 md:px-6"
        style={{ viewTransitionName: "demo-bar" }}
      >
        <a
          href={`#${R}-top`}
          aria-label={`${SITE.name}, back to top`}
          data-review-id={`${R}.bar.wordmark`}
          className="font-heading text-xl leading-none font-extrabold font-stretch-72% tracking-[0.01em] text-primary uppercase"
        >
          {SITE.name}
        </a>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-x-5">
            {pages.map((label) => (
              <li key={label} className="max-md:hidden">
                <UnbuiltLink
                  reviewId={`${R}.nav.${label.toLowerCase()}`}
                  className={NAV_ITEM}
                >
                  {label}
                </UnbuiltLink>
              </li>
            ))}
            <li>
              <UnbuiltLink reviewId={`${R}.nav.contact`} className={NAV_ITEM}>
                Contact
              </UnbuiltLink>
            </li>
          </ul>
        </nav>
      </header>
      <nav
        aria-label="More pages"
        data-review-id={`${R}.nav-row`}
        className="border-b border-border/40 px-3 md:hidden"
      >
        <ul className="flex gap-x-5">
          {pages.map((label) => (
            <li key={label}>
              <UnbuiltLink className={NAV_ITEM}>{label}</UnbuiltLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

/** Him, in his voice, never his name (D-KRD-3, 5; handoff §6.3). */
function TitleCell() {
  return (
    <div className="flex h-full flex-col justify-end gap-3 pt-6 pb-4 md:py-6 xl:py-2">
      <h1 className="font-heading text-[2rem] leading-[1.02] font-bold font-stretch-80% md:text-[clamp(2rem,2.6vw,2.5rem)] xl:text-[2.5rem]">
        I direct, shoot and edit stories that are{" "}
        <span className="text-primary">hard to look away from.</span>
      </h1>
      <p className="max-w-[48ch] text-base leading-[1.4] md:text-xl">
        {SITE.tagline} {SITE.place}
      </p>
      <a
        href={`#${R}-${FEATURED_SLUGS[0]}`}
        className={cn(LABEL, "self-start py-2 text-(--link) md:hidden")}
      >
        Watch ↓
      </a>
    </div>
  );
}

/** Teaching stays as text: it has no films to put in a row (handoff §6.7). */
function TeachingStrand() {
  const teaching = strand("teaching");
  return (
    <section
      data-review-id={`${R}.strand.teaching`}
      className="mx-3 flex flex-col gap-3 border-t border-border/40 pt-4 md:mx-6"
    >
      <h2 className="font-heading text-[1.75rem] leading-[1.15] font-semibold font-stretch-88%">
        {teaching.title}
      </h2>
      <p className="max-w-[60ch] leading-relaxed text-muted-foreground">
        {teaching.body}
      </p>
      <UnbuiltLink className="self-start text-sm font-semibold text-(--link) underline-offset-4 hover:underline">
        Teaching →
      </UnbuiltLink>
    </section>
  );
}

function Footer() {
  const primary = SITE.social.filter((item) => !item.secondary);
  const secondary = SITE.social.filter((item) => item.secondary);

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
