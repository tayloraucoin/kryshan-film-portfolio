import { cn } from "@/lib/cn";
import { mailtoHref } from "@/lib/mailto";

/**
 * The end of a page's content (spec §4.3, Vesper C6): one sentence in the
 * Lead step, specific to the page, then his address in `--link` as a
 * mailto. The decision it carries: every page ends on the email, never on
 * an exit off-site. Without a sentence it renders the address alone (the
 * panel and Contact use that form, and a page whose sentence SITE-C hasn't
 * written yet). Server component; the address arrives as a prop.
 */
export function EmailHandOff({
  email,
  sentence,
  subject,
  className,
}: Readonly<{
  email: string;
  sentence?: string;
  subject?: string;
  className?: string;
}>) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {sentence ? (
        <p className="max-w-[68ch] text-xl leading-[1.4]">{sentence}</p>
      ) : null}
      <p>
        <a
          href={mailtoHref(email, subject)}
          className="inline-flex min-h-11 items-center rounded-(--radius) text-xl leading-[1.4] text-(--link) underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {email}
        </a>
      </p>
    </div>
  );
}
