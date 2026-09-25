import type { IsoDate } from "@/lib/iso-date";

/**
 * What people say, on About and Teaching (spec §6.4, §6.5, §11; D-SITE-13).
 *
 * Standing rules:
 * - Every quote has written consent, recorded below. A person can withdraw
 *   at any time; deleting their entry is the whole process.
 * - Nobody is ever described as "at-risk", or as a former "at-risk"
 *   participant.
 * - No quote from anyone who was a minor when he taught them, unless
 *   they're an adult now and give their own consent.
 * - About shows full names and roles only, at most three. Teaching shows at
 *   most four and also allows "first name and role" or "anonymous and role".
 *
 * The ask he sends (handoff Appendix D): "I'm adding a teaching page to my
 * website. Would you write two or three sentences about working with me:
 * what I taught, and one thing that changed for your students or program?
 * Tell me how you'd like your name and role shown. Replying means you're OK
 * with it appearing on my site."
 */

export type TestimonialConsent = {
  how: "written";
  /** Where the written OK is kept, e.g. "email, 2027-03-02". */
  record: string;
  date: IsoDate;
  attribution: "full" | "first-name-role" | "anonymous-role";
};

export type Testimonial = {
  quote: string;
  /** Always recorded; `attribution` decides what is shown. */
  name: string;
  role: string;
  /** No current-student value, on purpose. */
  relationship: "hirer" | "collaborator" | "graduate" | "program-director";
  consent: TestimonialConsent;
  page: "about" | "teaching";
};

export const TESTIMONIALS: ReadonlyArray<Testimonial> = [];
