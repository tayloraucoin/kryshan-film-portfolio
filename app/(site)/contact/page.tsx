import type { Metadata } from "next";
import { ContactForm } from "@/app/(site)/contact/_components/contact-form";
import { CopyButton } from "@/components/composed/site/copy-button";
import { SiteShell } from "@/components/composed/site/site-shell";
import { CONTACT, EMAIL_PAUSED_COPY } from "@/content/site";
import { PUBLIC_EMAIL } from "@/lib/config";
import { mailtoHref } from "@/lib/mailto";
import { createPageMetadata } from "@/lib/metadata";
import { siteRoutes } from "@/lib/routes";

export const metadata: Metadata = createPageMetadata({
  title: CONTACT.title,
  description: PUBLIC_EMAIL
    ? CONTACT.description
    : EMAIL_PAUSED_COPY.contactDescription,
  path: siteRoutes.contact,
});

const ADDRESS_ID = "contact-address";

const H1 =
  "max-w-[40rem] font-heading text-[2rem] leading-[1.02] font-bold font-stretch-80% md:text-[clamp(2rem,2.6vw,2.5rem)] xl:text-[2.5rem]";

/**
 * Contact (spec §6.6): the email is on every page already. One left-aligned
 * block: the h1, his address very large as a mailto, and a quiet Copy that
 * says "Copied" only when it did (on failure it selects the address and says
 * so). Beneath it, the form (D-SITE-14 reversed, M-SITE-10): the second
 * route in, sent through a server action, so the page itself stays static.
 * The address breaks before its `@`, whatever `CONTACT_EMAIL` holds, and
 * anywhere as a last resort, so a 320 px phone never scrolls sideways. The
 * footer beneath carries his place and socials.
 *
 * TEMPORARY: while `PUBLIC_EMAIL` is null, the page is the h1, the teaching
 * line and the form, with no address, Copy or "Or write here".
 */
export default function ContactPage() {
  if (!PUBLIC_EMAIL) {
    return (
      <SiteShell current="contact">
        <section
          data-review-id="contact-form"
          className="flex flex-col gap-6 px-3 pt-8 pb-16 md:px-6 md:pt-12 md:pb-20"
        >
          <h1 className={H1}>{CONTACT.h1}</h1>
          <p className="max-w-[40rem] text-muted-foreground">
            {EMAIL_PAUSED_COPY.teachingLine}
          </p>
          <ContactForm email={null} />
        </section>
      </SiteShell>
    );
  }

  const at = PUBLIC_EMAIL.lastIndexOf("@");
  const local = PUBLIC_EMAIL.slice(0, at);
  const domain = PUBLIC_EMAIL.slice(at);

  return (
    <SiteShell current="contact">
      <section className="flex flex-col gap-6 px-3 pt-8 pb-12 md:px-6 md:pt-12 md:pb-14">
        <h1 className={H1}>{CONTACT.h1}</h1>
        <p>
          <a
            id={ADDRESS_ID}
            href={mailtoHref(PUBLIC_EMAIL)}
            className="rounded-(--radius) font-heading text-[clamp(2rem,7vw,4rem)] leading-[1.05] font-extrabold font-stretch-80% [overflow-wrap:anywhere] text-foreground transition-colors hover:text-(--link) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {local}
            <wbr />
            {domain}
          </a>
        </p>
        <div className="flex flex-wrap items-center">
          <CopyButton
            value={PUBLIC_EMAIL}
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
      <section
        aria-labelledby="contact-form-heading"
        data-review-id="contact-form"
        data-needs-js
        className="flex flex-col gap-6 border-t border-border/40 px-3 pt-10 pb-16 md:px-6 md:pt-12 md:pb-20"
      >
        <h2
          id="contact-form-heading"
          className="font-heading text-[1.75rem] leading-[1.15] font-semibold font-stretch-88%"
        >
          {CONTACT.form.heading}
        </h2>
        <ContactForm email={PUBLIC_EMAIL} />
      </section>
    </SiteShell>
  );
}
