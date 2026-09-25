import type { Metadata } from "next";
import { CopyButton } from "@/components/composed/site/copy-button";
import { SiteShell } from "@/components/composed/site/site-shell";
import { CONTACT } from "@/content/site";
import { SITE } from "@/lib/config";
import { mailtoHref } from "@/lib/mailto";
import { createPageMetadata } from "@/lib/metadata";
import { siteRoutes } from "@/lib/routes";

export const metadata: Metadata = createPageMetadata({
  title: CONTACT.title,
  description: CONTACT.description,
  path: siteRoutes.contact,
});

const ADDRESS_ID = "contact-address";

/**
 * Contact (spec §6.6, D-SITE-14): a courtesy page, since the email is on
 * every page already. One left-aligned block: the h1, his address very large
 * as a mailto, and a quiet Copy that says "Copied" only when it did (on
 * failure it selects the address and says so). No form, ever. The address
 * breaks before its `@`, whatever `CONTACT_EMAIL` holds, and anywhere as a
 * last resort, so a 320 px phone never scrolls sideways. The footer beneath
 * carries his place and socials. Static.
 */
export default function ContactPage() {
  const at = SITE.email.lastIndexOf("@");
  const local = SITE.email.slice(0, at);
  const domain = SITE.email.slice(at);

  return (
    <SiteShell current="contact">
      <section className="flex flex-col gap-6 px-3 pt-8 pb-16 md:px-6 md:pt-12 md:pb-20">
        <h1 className="max-w-[40rem] font-heading text-[2rem] leading-[1.02] font-bold font-stretch-80% md:text-[clamp(2rem,2.6vw,2.5rem)] xl:text-[2.5rem]">
          {CONTACT.h1}
        </h1>
        <p>
          <a
            id={ADDRESS_ID}
            href={mailtoHref(SITE.email)}
            className="rounded-(--radius) font-heading text-[clamp(2rem,7vw,4rem)] leading-[1.05] font-extrabold font-stretch-80% [overflow-wrap:anywhere] text-foreground transition-colors hover:text-(--link) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {local}
            <wbr />
            {domain}
          </a>
        </p>
        <div className="flex flex-wrap items-center">
          <CopyButton
            value={SITE.email}
            labels={CONTACT.copy}
            onFailure="select"
            selectTargetId={ADDRESS_ID}
            classes={{ button: "hover:text-(--link)" }}
          />
        </div>
        {CONTACT.teachingLine ? (
          <p className="max-w-[40rem] text-muted-foreground">
            {CONTACT.teachingLine}
          </p>
        ) : null}
      </section>
    </SiteShell>
  );
}
