import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyButton } from "@/components/composed/site/copy-button";
import { EmailHandOff } from "@/components/composed/site/email-hand-off";
import { JsonLd } from "@/components/composed/site/json-ld";
import { SiteShell } from "@/components/composed/site/site-shell";
import { toFilm } from "@/components/composed/work/film";
import { FilmPlayer } from "@/components/composed/work/film-player";
import { posterFor } from "@/content/posters";
import {
  findShowableProject,
  SHOWABLE_PROJECTS,
  workOrder,
  type ShowableProject,
} from "@/content/projects";
import { CHROME, DETAIL_COPY, FILM_COPY } from "@/content/site";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/config";
import { mailtoHref } from "@/lib/mailto";
import { embedUrl } from "@/lib/media/embed-url";
import { absoluteUrl, createPageMetadata } from "@/lib/metadata";
import { siteRoutes } from "@/lib/routes";
import { videoObjectJsonLd } from "@/lib/structured-data";

/** Only the films `SHOWABLE_PROJECTS` lists have a page; every other slug is the site's 404 (D-SITE-8). */
export const dynamicParams = false;

export function generateStaticParams() {
  return SHOWABLE_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = findShowableProject(slug);
  if (!project) return {};
  const poster = posterFor(slug);
  return createPageMetadata({
    title: `${project.title} (${project.year})`,
    description: project.logline,
    path: siteRoutes.project(slug),
    image: {
      url: poster.src,
      width: poster.width,
      height: poster.height,
      alt: FILM_COPY.ogAlt(project.title),
    },
  });
}

/** The Label step: Archivo 600, 11 px, width 88, tracking 18%, uppercase. */
const LABEL =
  "text-[0.6875rem] leading-none font-semibold font-stretch-88% tracking-[0.18em] uppercase";

const FOCUS =
  "rounded-(--radius) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/** The films either side in `workOrder()`, wrapping at both ends (D-SITE-26: never the Work filter). */
function neighbours(slug: string) {
  const order = workOrder();
  const index = order.findIndex((project) => project.slug === slug);
  const at = (i: number) => order[(i + order.length) % order.length];
  return { previous: at(index - 1), next: at(index + 1) };
}

function videoObject(project: ShowableProject) {
  const { embed } = project;
  return videoObjectJsonLd({
    name: project.title,
    description: project.logline,
    thumbnailUrl: absoluteUrl(posterFor(project.slug).src),
    ...(embed.provider === "linkout"
      ? { url: embed.url }
      : { embedUrl: embedUrl(embed, { autoplay: false }) }),
    ...(project.videoPublished ? { uploadDate: project.videoPublished } : {}),
  });
}

/**
 * One film as a page he can send (spec §6.3): the poster with one play
 * button (one tap plays; nothing loads before it, D-SITE-10), the title,
 * genre line, lane and logline, "Copy link", his email titled with the
 * film, then the story and facts where they exist, and the films either
 * side in `workOrder()`. Held and NDA'd films have no page. Static.
 */
export default async function FilmPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = findShowableProject(slug);
  if (!project) notFound();

  const film = toFilm(project);
  const { previous, next } = neighbours(slug);
  const paragraphs =
    project.story
      ?.split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean) ?? [];
  const awards = project.awardsFull ?? [];
  const press = project.press ?? [];
  const articles = project.articles ?? [];
  const hasFacts = awards.length + press.length + articles.length > 0;

  return (
    <SiteShell current="work" currentKind="true">
      <JsonLd data={videoObject(project)} />
      <article className="flex flex-col gap-8 pt-2 pb-16 md:gap-10">
        <p className="px-3 md:px-6">
          <Link
            href={siteRoutes.work()}
            className={cn(
              LABEL,
              "inline-flex min-h-11 items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground",
              FOCUS,
            )}
          >
            <span aria-hidden="true">←</span>
            {DETAIL_COPY.back}
          </Link>
        </p>

        <div className="px-3 md:px-6">
          <FilmPlayer
            film={film}
            startPlaying={false}
            preload
            className="w-[min(100%,calc((100svh_-_var(--bar-h)_-_2rem)*16/9))]"
          />
        </div>

        <div className="flex flex-col gap-4 px-3 md:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-[2rem] leading-[1.02] font-bold font-stretch-80% md:text-[clamp(2rem,2.6vw,2.5rem)] xl:text-[2.5rem]">
              {project.title}
            </h1>
            <p className="text-[0.8125rem] font-medium font-stretch-90% tracking-[0.02em] text-muted-foreground">
              {film.genreLine}
            </p>
            {film.passion ? (
              <p className={cn(LABEL, "text-(--link)")}>{FILM_COPY.passion}</p>
            ) : film.client ? (
              <p className="text-[0.8125rem] font-medium font-stretch-90% tracking-[0.02em] text-muted-foreground">
                {film.client}
              </p>
            ) : null}
          </div>
          <p className="max-w-[60ch] text-xl leading-[1.4]">
            {project.logline}
          </p>
          <div className="flex flex-wrap items-center">
            <CopyButton
              value={film.shareUrl}
              labels={FILM_COPY.copyLink}
              onFailure="share-or-show"
              shareTitle={project.title}
            />
          </div>
          <p>
            <a
              href={mailtoHref(SITE.email, project.title)}
              className={cn(
                "inline-flex min-h-11 items-center text-(--link) underline-offset-4 hover:underline",
                FOCUS,
              )}
            >
              {SITE.email}
            </a>
          </p>
        </div>

        {paragraphs.length > 0 || hasFacts ? (
          <div className="grid gap-10 px-3 md:px-6 lg:grid-cols-[minmax(0,68ch)_minmax(16rem,1fr)] lg:gap-16">
            {paragraphs.length > 0 ? (
              <div className="flex max-w-[68ch] flex-col gap-4 leading-relaxed">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}
            {hasFacts ? (
              <div className="flex flex-col gap-8">
                {awards.length > 0 ? (
                  <section className="flex flex-col gap-3">
                    <h2 className={cn(LABEL, "text-muted-foreground")}>
                      {DETAIL_COPY.facts.awards}
                    </h2>
                    <ul className="flex flex-col gap-1.5">
                      {awards.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </section>
                ) : null}
                {press.length > 0 ? (
                  <section className="flex flex-col gap-3">
                    <h2 className={cn(LABEL, "text-muted-foreground")}>
                      {DETAIL_COPY.facts.press}
                    </h2>
                    <ul className="flex flex-col gap-4">
                      {press.map((item) => (
                        <li key={item.quote} className="flex flex-col gap-1">
                          <blockquote className="font-(family-name:--font-quote) italic">
                            {item.quote}
                          </blockquote>
                          <p className="text-sm text-muted-foreground">
                            {item.url ? (
                              <ExternalLink href={item.url}>
                                {item.source}
                              </ExternalLink>
                            ) : (
                              item.source
                            )}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}
                {articles.length > 0 ? (
                  <section className="flex flex-col gap-3">
                    <h2 className={cn(LABEL, "text-muted-foreground")}>
                      {DETAIL_COPY.facts.articles}
                    </h2>
                    <ul className="flex flex-col gap-2">
                      {articles.map((article) => (
                        <li key={article.url}>
                          <ExternalLink href={article.url}>
                            {article.outlet}: {article.title}
                          </ExternalLink>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}

        {previous && next ? (
          <ul className="grid gap-3 border-t border-border/40 px-3 pt-6 md:grid-cols-2 md:px-6">
            <li>
              <NeighbourLink label={DETAIL_COPY.previous} project={previous} />
            </li>
            <li className="md:text-right">
              <NeighbourLink label={DETAIL_COPY.next} project={next} />
            </li>
          </ul>
        ) : null}

        {DETAIL_COPY.handOff ? (
          <EmailHandOff
            email={SITE.email}
            sentence={DETAIL_COPY.handOff}
            subject={project.title}
            className="px-3 md:px-6"
          />
        ) : null}
      </article>
    </SiteShell>
  );
}

function NeighbourLink({
  label,
  project,
}: Readonly<{ label: string; project: ShowableProject }>) {
  return (
    <Link
      href={siteRoutes.project(project.slug)}
      aria-label={`${label}: ${project.title}`}
      className={cn(
        "inline-flex min-h-11 flex-col gap-1.5 py-1 transition-colors hover:text-(--link)",
        FOCUS,
      )}
    >
      <span className={cn(LABEL, "text-muted-foreground")}>{label}</span>
      <span className="text-xl leading-[1.4]">{project.title}</span>
    </Link>
  );
}

function ExternalLink({
  href,
  children,
}: Readonly<{ href: string; children: ReactNode }>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={cn("text-(--link) underline-offset-4 hover:underline", FOCUS)}
    >
      {children}
      <span className="sr-only">{CHROME.newTab}</span>
    </a>
  );
}
