import type { Photo } from "@/content/photo";
import adIngYukon from "@/public/media/photos/ad-ing-yukon.jpg";
import mpiaaPsaShoot from "@/public/media/photos/mpiaa-psa-shoot.jpg";
import portrait from "@/public/media/photos/portrait.jpg";

/**
 * About (spec §6.4): the person, then the proof. His own words, cut.
 *
 * Every string is his own text, cut (SITE-C). A "Copy row" comment names
 * its row in docs/client/kryshan-09-copy-for-approval.md, the one record of
 * what he has approved; change a string there and here together.
 *
 * To change a photo: put a 3:2 JPEG (at most 1600 px wide, with its
 * metadata stripped) in public/media/photos/, import it here, and give it
 * alt text, a caption and who is in it. Only cleared photos go here
 * (spec §11): no studio sets, no Ted Danson, nothing from the events life.
 */
/**
 * On set: two or three cleared photos (spec §11). Typed as `Photo`, so a
 * photo without `people` doesn't compile; content/validate.ts checks again.
 */
const ON_SET: ReadonlyArray<Photo> = [
  {
    src: mpiaaPsaShoot,
    // Copy row A-8 (alt 1)
    alt: "Kryshan Randel, masked, directing an actor on an LED-wall stage, with a camera crew in the foreground.",
    caption: "Directing A Very B.C. Production on an LED-wall stage.",
    people: "adults",
  },
  {
    src: adIngYukon,
    // Copy row A-8 (alt 2)
    alt: "Kryshan Randel on a walkie-talkie by a lake while two actors kneel for a take, with boom and camera beside them.",
    caption: "Assistant directing in the Yukon.",
    people: "adults",
  },
];

/**
 * His portrait (4:5). Until he sends a head-and-shoulders one (O-SITE-2),
 * this is the music-video street shoot at its own 4:5, uncropped: him at
 * work (Vitrine, SITE-C round 2). The page reads his name as its alt text
 * and shows no caption; these two are kept for anywhere else it's used.
 */
// Copy row A-8.3
const PORTRAIT: Photo | undefined = {
  src: portrait,
  alt: "Kryshan Randel holding a handheld camera rig overhead on a city street while a crew member lights the shot.",
  caption: "Shooting a music video on a city street.",
  people: "adults",
};

/** Press quotes for Recognition: picks of verified quotes in content/projects.ts (≤4). */
const PRESS_PICKS: ReadonlyArray<{ slug: string; source: string }> = [];

export const ABOUT = {
  /** The page's name, in the tab and the bar. */
  title: "About",
  /** The section headings (spec §3). */
  headings: {
    recognition: "Recognition",
    awards: "Awards",
    directed: "Directed and shot",
    press: "Press",
    onSet: "On set",
    testimonials: "What people say",
    /** Over the Glimpse paragraph, so it reads as how he works, not a stray quote. */
    // Copy row A-12
    glimpse: "Working with actors",
  },
  /** Before the client names under "Directed and shot". */
  clientsLead: "Clients include",
  /** The h1. Default A (O-SITE-3); B is offered to him. */
  // Copy row A-1
  opener:
    "Born and raised in BC, I’ve been making films for as long as I can remember.",

  /** ≤3 paragraphs, ≤200 words, the first ≤60. The person before the résumé. */
  // Copy row A-2
  bio: [
    "I directed two horror shorts for the Bloodshots Film Festival, Jack and The Bully Solution. I’ve shot and edited hundreds of news segments, behind-the-scenes work and other non-fiction projects, often as a one-person crew. I’m a member of the IATSE 669 camera union in the EPK category.",
    "My career started with producing two fast film contests, The 24 Hour Film Contest and The Great Canadian Commercial Contest. Through these events, I met many of my favourite collaborators and started making short films on weekends with them. Outside of the industry, I practise transcendental meditation, ski and play beach volleyball, DJ, and host large-scale immersive events.",
    "As a film instructor I teach directing, shooting and editing at LaSalle College, and do individual coaching and mentorship.",
  ],

  /** Between hairlines, no heading: how an audition rewrote Glimpse. ≤70 words. */
  // Copy row A-3 (from his 2017 talent-lab application)
  glimpse:
    "My lead actress Justine Warrington was so strong in her casting sessions for my short film Glimpse that I rewrote the script around the character she portrayed. She included all the layers implied in my previous draft, and then some, so the script had to rise to the level of her more multi-dimensional performance.",

  /** Recognition › Directed and shot: the people he may name but not show (02 §8.3). */
  // Copy row A-5. Aubrey Plaza waits on Q12 (SITE-C ruling 6).
  namesLine:
    "I’ve directed Ted Danson, Mary Steenburgen and Peter Gallagher in Ted on Set, and Kevin Smith and Tom Green in the Rio Theatre PSAs: work I’m not allowed to show you.",

  /** Recognition › Awards: award, film, festival. Only facts his sources agree on (02 §8.1, §13). */
  // Copy row A-4. The Bully Solution waits on Q18, the nomination's film on O-SITE-4.
  awards: [
    "Grand Jury Prize and Best Death, Jack, Bloodshots Film Festival",
    "A&E Short Filmmakers Award, Glimpse, National Screen Institute",
    "Best Actor (Riaan Smit), Contact Club, Vancouver Quarantine Performance Project",
    "Leo-nominated as an editor",
  ],

  /** Recognition › Press: picks of verified quotes in content/projects.ts. Empty until SITE-C verifies them (§11). */
  pressPicks: PRESS_PICKS,

  /** One quiet line (spec §6.4). */
  // Copy row A-9
  credentials:
    "IATSE 669 (EPK) · Capilano College · American Academy of Dramatic Arts · Motion Picture Orientation, WHMIS, ActSafe",

  /** On set: two or three cleared photos (spec §11). */
  photos: ON_SET,

  /** His portrait (4:5), when he supplies one (O-SITE-2). None: no frame anywhere. */
  // Widened on purpose: the slot holds a Photo once he supplies one.
  portrait: PORTRAIT as Photo | undefined,

  /**
   * The page's closing sentence. Plain, because the names line keeps the
   * page's one dry turn (spec §6.4).
   */
  // Copy row A-10
  handOff: "If you’re making something, email me.",

  /** The meta description (≤155 characters). */
  // Copy row A-11
  description:
    "Kryshan Randel directs, shoots and edits in Vancouver: dark comedy shorts, PSAs, music videos and studio EPKs. He teaches film at LaSalle College.",
} as const;

/**
 * Clients, named in type (no logos until cleared, Q2). Studios and networks
 * first, then the rest in 02 §4's order. Not Legendary Pictures (02 §13 #10).
 */
// Copy row A-6 (from 02 §4)
export const CLIENTS: ReadonlyArray<string> = [
  "Disney",
  "Netflix",
  "Paramount Pictures",
  "Universal Studios",
  "Sony Pictures",
  "The CW",
  "BBC America",
  "CBS",
  "CTV",
  "Hallmark",
  "VanCity",
  "Vancouver Symphony Orchestra",
  "VIFF",
  "Creative BC",
  "Theatre Under the Stars",
  "Bard on the Beach",
  "The Rio Theatre",
  "SFU Creative Studios",
  "former Mayor Gregor Robertson",
  "IATSE 669",
  "Pulling Together Canoe Journey",
  "DGC BC",
  "Shotlister / Zach Lipovsky",
  "Richmond City Hall",
  "MPPIA",
  "Crazy8s",
];
