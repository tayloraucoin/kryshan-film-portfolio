import Link from "next/link";
import { SiteShell } from "@/components/composed/site/site-shell";
import { NOT_FOUND } from "@/content/site";
import { siteRoutes } from "@/lib/routes";

/**
 * The 404 (spec §6.7): send a lost visitor to the work. It sits outside
 * `(site)`, so it renders the chrome itself, with no current nav item.
 */
export default function NotFound() {
  return (
    <SiteShell>
      <section className="flex flex-col gap-6 px-3 py-16 md:px-6 md:py-20">
        <h1 className="max-w-[24ch] font-heading text-[2rem] leading-[1.02] font-bold font-stretch-80% md:text-[clamp(2rem,2.6vw,2.5rem)] xl:text-[2.5rem]">
          {NOT_FOUND.h1}
        </h1>
        <p>
          <Link
            href={siteRoutes.work()}
            className="inline-flex min-h-11 items-center rounded-(--radius) text-xl leading-[1.4] text-(--link) underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {NOT_FOUND.link}
          </Link>
        </p>
      </section>
    </SiteShell>
  );
}
