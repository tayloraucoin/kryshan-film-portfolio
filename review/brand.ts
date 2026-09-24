/**
 * The brand in one page, for the client: the plain-language cut of
 * docs/client/kryshan-04-brand-pillars.md (Vitrine, batch 4). Rendered by
 * `/review/brand` and linked from the index and each kit page.
 *
 * Every idea here is in 04; the words are shortened for a first read. His
 * own words and his press are quoted as they appear in 02, 03 and 04.
 *
 * Amended after the review round (04 Step 8, 2026-09-24): he chose kit A
 * and ranked the pillars Wicked · Resourceful · Generous, and Generous is
 * replaced by Galvanizing. The pillars are listed in his order. Kits B and
 * C stay in the round as the record of what he was shown.
 */

export type Pillar = {
  id: "wicked" | "resourceful" | "galvanizing";
  name: string;
  /** Its "… but not …" line from Card A v2 (04 Step 8). */
  guardrail: string;
  /** What it means for him, in a sentence. */
  meaning: string;
  /** The proof: things he has done or has been called. */
  proof: ReadonlyArray<string>;
};

export type KitLead = {
  kitId: string;
  letter: string;
  /** The pillar this kit put first, by name, as the round showed it. */
  lead: string;
  /** The lead pillar's guardrail as this kit words it ("… but not …"). */
  guardrail: string;
  /** The tie-break rule when pillars pull against each other. */
  tieBreak: string;
  /** Who this version is most for, in a line. */
  bestFor: string;
  /** The kit he chose in the round (kit A). */
  chosen: boolean;
};

export const BRAND = {
  essence: "A tale well told, and a good time telling it.",
  essenceNote:
    "“A tale well told” is your phrase. “A good time” is the audience’s and the crew’s. It is a line to steer by, not a tagline to print.",
  amendment: {
    title: "Changed after your review",
    body: "You said Generous sounds “soft, people pleasing, under charging and not as assertive,” and that you’re wicked and resourceful for certain. So Generous is gone. In its place is Galvanizing: you get a room moving, and people do their best work in it because they trust you. The pillars are now in your order, and Resourceful carries a new rule: never cheap. Numbers like $25 and 48 hours tell how a film was made, never what you cost.",
  },
  why: "To make any story land on screen, whatever the genre or budget, and to get the people around you doing their best work while it happens.",
  whyNote: "Your two sentences from the intake, said shorter.",
  whereYouSit:
    "Friendly, reserved in how the site looks, expressive in the work. Not a faceless rep roster, not a wordy video shop: a specific, funny person who gets a set moving, with sixty-odd productions behind you.",
  notYou: [
    "Nasty",
    "Scrappy",
    "Cheap",
    "Domineering",
    "Precious",
    "Packaged",
    "Anonymous",
    "Corporate-safe",
    "A template reel",
  ],
} as const;

/** Card A v2 (04 Step 8), in his order. */
export const PILLARS: ReadonlyArray<Pillar> = [
  {
    id: "wicked",
    name: "Wicked",
    guardrail: "Wicked, but not nasty.",
    meaning:
      "Funny and dark at once, and very good at it. The joke lands last and is never announced.",
    proof: [
      "Press: “wonderfully wrong,” “hysterically mean,” “slickly-made”",
      "Robert Rodriguez judged The Bully Solution; Dan O’Bannon judged Jack",
      "“Best Death,” Bloodshots",
    ],
  },
  {
    id: "resourceful",
    name: "Resourceful",
    guardrail: "Resourceful, but never cheap.",
    meaning:
      "Any genre, any constraint, and it still comes out slick. Fast is common; fast and slick under this much pressure is yours.",
    proof: [
      "Jack and The Bully Solution: written, shot and edited in 48 hours",
      "Sixty-odd productions as a behind-the-scenes crew of one",
      "IATSE 669; a one-person camera unit",
    ],
  },
  {
    id: "galvanizing",
    name: "Galvanizing",
    guardrail: "Galvanizing, but not domineering.",
    meaning:
      "You get a room moving: a cast, a crew, a class. People do their best work in it because they trust where you’re taking them.",
    proof: [
      "Founded two fast-film contests, where you met most of the people you still make films with",
      "Actors in your shorts have won Best Actor and Best Acting",
      "Founded the Frames Film Project with Frog Hollow; twelve years teaching at InFocus",
    ],
  },
];

/** Where two pillars meet (04, Step 8). */
export const OVERLAPS: ReadonlyArray<{ pair: string; line: string }> = [
  { pair: "Wicked + Galvanizing", line: "Safe enough to go dark." },
  { pair: "Resourceful + Galvanizing", line: "Makes the most of everyone." },
  { pair: "Wicked + Resourceful", line: "Slick under pressure." },
];

/**
 * Which pillar each kit put first in the round. Kit A is his choice and
 * carries Card A v2; B and C are kept as they were shown, so their kit pages
 * still say what they were.
 */
export const KIT_LEADS: ReadonlyArray<KitLead> = [
  {
    kitId: "kryshan-a",
    letter: "A",
    lead: "Wicked",
    guardrail: "Wicked, but not nasty.",
    tieBreak:
      "When the wicked choice and the safe choice conflict, wicked wins, and the design pays for it with precision. When a line could be read as a discount or a plea, it gets rewritten.",
    bestFor:
      "The version only you could have. It is how the press already describes you.",
    chosen: true,
  },
  {
    kitId: "kryshan-b",
    letter: "B",
    lead: "Generous",
    guardrail: "Generous, but not sentimental.",
    tieBreak:
      "When warmth and edge conflict, warmth wins; the edge lives in the work, not in the design.",
    bestFor:
      "The version a credit union, a cohousing board and a nervous student trust on sight.",
    chosen: false,
  },
  {
    kitId: "kryshan-c",
    letter: "C",
    lead: "Resourceful",
    guardrail: "Resourceful, but not utilitarian.",
    tieBreak:
      "When craft and charm conflict, craft wins; charm is proven by the credits list.",
    bestFor:
      "The version that sells camera and editing first. The credits list and the Leo nomination lead.",
    chosen: false,
  },
];

export function findKitLead(kitId: string): KitLead | undefined {
  return KIT_LEADS.find((lead) => lead.kitId === kitId);
}

/** The kit he chose in the round. */
export const CHOSEN_KIT_LEAD: KitLead | undefined = KIT_LEADS.find(
  (lead) => lead.chosen,
);
