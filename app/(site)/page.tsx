import type { Metadata } from "next";
import { HOME } from "@/content/home";
import { SITE } from "@/lib/config";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: SITE.name,
  description: SITE.description,
  path: "/",
  absoluteTitle: true,
});

/**
 * Home. Static, server-rendered, and deliberately empty of pattern: no
 * centred hero with three cards. The client's layout deliverable decides
 * what goes here; this page proves the chrome, the tokens and the type.
 */
export default function HomePage() {
  return (
    <section
      className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 sm:py-24"
      data-review-id="home-hero"
    >
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
        {HOME.headline}
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground">{HOME.support}</p>
      <p>
        <a
          href={HOME.action.href}
          className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
        >
          {HOME.action.label}
        </a>
      </p>
    </section>
  );
}
