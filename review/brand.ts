/**
 * The brand in one page, for the client: the plain-language cut of
 * docs/client/kryshan-04-brand-pillars.md (Vitrine, batch 4). Rendered by
 * `/review/brand` and linked from the index and each kit page.
 *
 * Every idea here is in 04; the words are shortened for a first read. His
 * own words and his press are quoted as they appear in 02, 03 and 04.
 */

export type Pillar = {
  id: "wicked" | "generous" | "resourceful";
  name: string;
  /** What it means for him, in a sentence. */
  meaning: string;
  /** The proof: things he has done or has been called. */
  proof: ReadonlyArray<string>;
};

export type KitLead = {
  kitId: string;
  letter: string;
  leads: Pillar["id"];
  /** The pillar's guardrail as this kit words it ("… but not …"). */
  guardrail: string;
  /** The tie-break rule when pillars pull against each other. */
  tieBreak: string;
  /** Who this version is most for, in a line. */
  bestFor: string;
};

export const BRAND = {
  essence: "A tale well told, and a good time telling it.",
  essenceNote:
    "“A tale well told” is your phrase. “A good time” is the audience’s and the crew’s. Every kit shares this; it is a line to steer by, not a tagline to print.",
  why: "To make any story land on screen, whatever the genre or budget, and to make the people around you better while it happens.",
  whyNote: "Your two sentences from the intake, said shorter.",
  whereYouSit:
    "Friendly, reserved in how the site looks, expressive in the work. Not a faceless rep roster, not a wordy video shop: a specific, funny, generous person with sixty-odd productions behind you.",
  notYou: [
    "Nasty",
    "Scrappy",
    "Precious",
    "Packaged",
    "Anonymous",
    "Corporate-safe",
    "A template reel",
  ],
} as const;

export const PILLARS: ReadonlyArray<Pillar> = [
  {
    id: "wicked",
    name: "Wicked",
    meaning:
      "Funny and dark at once, and very good at it. The joke lands last and is never announced.",
    proof: [
      "Press: “wonderfully wrong,” “hysterically mean,” “slickly-made”",
      "Robert Rodriguez judged The Bully Solution; Dan O’Bannon judged Jack",
      "“Best Death,” Bloodshots",
    ],
  },
  {
    id: "generous",
    name: "Generous",
    meaning:
      "You make the people around you their best selves, and you credit them by name.",
    proof: [
      "Rewrote Glimpse around an actor’s audition",
      "Actors in your shorts have won Best Actor and Best Acting",
      "Founded the Frames Film Project with Frog Hollow; teach at LaSalle College",
    ],
  },
  {
    id: "resourceful",
    name: "Resourceful",
    meaning:
      "Any genre, any budget, and it still comes out slick. Fast is common; fast and slick at these numbers is yours.",
    proof: [
      "Contact Club, made for $25",
      "Sixty-odd productions as a behind-the-scenes crew of one",
      "IATSE 669; a one-person camera unit",
    ],
  },
];

/** Where two pillars meet (04, step 4). */
export const OVERLAPS: ReadonlyArray<{ pair: string; line: string }> = [
  { pair: "Wicked + Generous", line: "Safe enough to go dark." },
  { pair: "Generous + Resourceful", line: "Makes the most of everyone." },
  { pair: "Wicked + Resourceful", line: "Slick on a shoestring." },
];

/** The same three pillars in every kit; what changes is which one leads. */
export const KIT_LEADS: ReadonlyArray<KitLead> = [
  {
    kitId: "kryshan-a",
    letter: "A",
    leads: "wicked",
    guardrail: "Wicked, but not nasty.",
    tieBreak:
      "When the wicked choice and the safe choice conflict, wicked wins, and the design pays for it with precision.",
    bestFor:
      "The version only you could have. It is how the press already describes you.",
  },
  {
    kitId: "kryshan-b",
    letter: "B",
    leads: "generous",
    guardrail: "Generous, but not sentimental.",
    tieBreak:
      "When warmth and edge conflict, warmth wins; the edge lives in the work, not in the design.",
    bestFor:
      "The version a credit union, a cohousing board and a nervous student trust on sight.",
  },
  {
    kitId: "kryshan-c",
    letter: "C",
    leads: "resourceful",
    guardrail: "Resourceful, but not utilitarian.",
    tieBreak:
      "When craft and charm conflict, craft wins; charm is proven by the credits list.",
    bestFor:
      "The version that sells camera and editing first. The credits list and the Leo nomination lead.",
  },
];

export function findKitLead(kitId: string): KitLead | undefined {
  return KIT_LEADS.find((lead) => lead.kitId === kitId);
}

export function findPillar(id: Pillar["id"]): Pillar | undefined {
  return PILLARS.find((pillar) => pillar.id === id);
}
