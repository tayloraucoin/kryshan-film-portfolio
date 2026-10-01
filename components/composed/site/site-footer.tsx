import Link from "next/link";
import { CHROME, EMAIL_PAUSED_COPY, SOCIALS } from "@/content/site";
import { cn } from "@/lib/cn";
import { PUBLIC_EMAIL, SITE } from "@/lib/config";
import { siteRoutes } from "@/lib/routes";

/** A visible ring for keyboard focus, in the kit's `ring` (red 300). */
const FOCUS =
  "rounded-(--radius) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const EMAIL_LINK = cn(
  "self-start text-base text-foreground transition-colors hover:text-(--link) md:self-baseline",
  FOCUS,
);

/**
 * The footer, on every page (spec §4.2): the email alone, where he works,
 * and his profiles. The decision it carries: nothing else. No copyright
 * line, no X/Twitter, no second call to action; the email is the one action
 * (CONVENTIONS §8) and it is the first thing here. Instagram and Facebook
 * sit on a quieter second line (02 §14 Q11). TEMPORARY: while the address
 * is paused (`PUBLIC_EMAIL` null), the same spot links to Contact.
 *
 * Server component.
 */
export function SiteFooter() {
  const primary = SOCIALS.filter((item) => !item.secondary);
  const secondary = SOCIALS.filter((item) => item.secondary);

  return (
    <footer
      data-review-id="site-footer"
      className="mt-auto flex flex-col gap-4 border-t border-border/40 px-3 py-8 md:flex-row md:items-start md:justify-between md:px-6"
    >
      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
        {PUBLIC_EMAIL ? (
          <a href={`mailto:${PUBLIC_EMAIL}`} className={EMAIL_LINK}>
            {PUBLIC_EMAIL}
          </a>
        ) : (
          <Link href={siteRoutes.contact} className={EMAIL_LINK}>
            {EMAIL_PAUSED_COPY.link}
          </Link>
        )}
        <span className="text-sm text-muted-foreground">{SITE.place}</span>
      </div>
      <nav
        aria-label={CHROME.landmarks.social}
        className="flex flex-col gap-1 md:items-end"
      >
        <SocialList items={primary} className="text-sm" />
        <SocialList items={secondary} className="text-xs" />
      </nav>
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
  if (items.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-x-4", className)}>
      {items.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            target="_blank"
            rel="me noopener"
            className={cn(
              "inline-flex min-h-6 items-center text-muted-foreground transition-colors hover:text-(--link)",
              FOCUS,
            )}
          >
            {item.label}
            <span className="sr-only">{CHROME.newTab}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
