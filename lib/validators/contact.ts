import { z } from "zod";

/** Field limits, shared by the form's `maxLength`s and the schema. */
export const CONTACT_LIMITS = {
  name: 120,
  email: 254,
  message: 5000,
} as const;

/**
 * Contact's form, as the server action receives it. `website` is the
 * honeypot: hidden from people, filled by bots, so any value refuses the
 * message. The name goes into the subject line, so it may not carry a line
 * break.
 */
export const contactMessageInput = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(CONTACT_LIMITS.name)
    .refine((value) => !/[\r\n]/.test(value)),
  email: z.string().trim().max(CONTACT_LIMITS.email).pipe(z.email()),
  message: z.string().trim().min(1).max(CONTACT_LIMITS.message),
  website: z.string().max(0).optional(),
});

export type ContactMessageInput = z.infer<typeof contactMessageInput>;

/** The fields a visitor can get wrong, for per-field messages. */
export type ContactField = "name" | "email" | "message";

/**
 * What the action returns. `invalid` names the fields to fix; `failed`
 * means the send didn't happen, and the page offers the address instead.
 */
export type ContactMessageResult =
  | { ok: true }
  | { ok: false; reason: "invalid"; fields: ContactField[] }
  | { ok: false; reason: "failed" };
