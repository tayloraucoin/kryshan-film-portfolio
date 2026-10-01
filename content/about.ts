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

/**
 * Recognition › Press: at most four quote ids from content/press.ts, in the
 * order they show (2 × 2 from 768 px). Every quote on file is there; to
 * swap one, change its id here.
 */
// Copy row A-7: the range the spec asks for, the wicked (the two films) and
// the galvanizing (the contests he started). The Province pick is out: he
// couldn't find the quote in the clipping (the line breaks "quick-est").
const PRESS_PICKS: ReadonlyArray<string> = [
  "toronto-film-scene-2010-hilarious",
  "aicn-2006-wonderfully-wrong",
  "nerve-2002-inspire",
];

export const ABOUT = {
  /** The page's name, in the tab and the bar. */
  title: "About",
  /** The section headings (spec §3). */
  headings: {
    recognition: "Recognition",
    awards: "Awards",
    press: "Press",
    onSet: "On set",
    testimonials: "What people say",
  },
  /** The h1. Default A (O-SITE-3); B is offered to him. */
  // Copy row A-1
  opener:
    "Born and raised in BC, I’ve been making films for as long as I can remember.",

  /** The person before the résumé: his round-3 text, as sent. */
  // Copy row A-2
  bio: [
    "My career started with producing two fast film contests, The 24 Hour Film Contest and The Great Canadian Commercial Contest, where I met many of my favourite collaborators and started making short films on weekends with them.",
    "Two of these shorts, Jack and The Bully Solution, screened and won awards at many top genre festivals, including Sitges and Fantasia. I also received a DGC Kickstart award to make the short film Glimpse, which premiered at the Vancouver International Film Festival, and screened on the Sundance Channel and Movieola.",
    "These accolades led to me getting work as a director for hire, including PSAs for the Directors Guild of Canada, Creative BC, MPPIA and IATSE 669; social media ads for Zach Lipovsky’s Shotlister app; and four episodes of the web series Libelle later incorporated into the feature film Mission Ninety Two: Dragonfly. In recent years I’ve directed numerous stars including Ted Danson, Kevin Smith, Aubrey Plaza and Mary Steenburgen for various social media spots and PSAs.",
    "I’ve also shot and edited hundreds of news segments, corporate and behind the scenes work, and other non-fiction projects, often as a one-person crew. I’m a Leo-nominated editor, and a member of IATSE 669 in the EPK category.",
    "As a film instructor, I teach directing and cinematography at Vancouver Film School and LaSalle College, and do individual coaching and mentorship. Outside of the industry, I practice transcendental meditation, ski and play beach volleyball, DJ, and host large-scale invite-only immersive events. You’ll also find me out dancing nearly every Saturday night.",
  ],

  /** Recognition › Awards: award, film, festival. Only facts his sources agree on (02 §8.1, §13). */
  // Copy row A-4
  awards: [
    "Grand Jury Prize, Audience Choice Award, Best Script, Best Death, Jack, Bloodshots Film Festival. Also Silver Audience Choice Award, Fantasia Film Festival and Best Horror Film, Sharpcuts Indie Film and Music Festival",
    "Grand Jury Prize, Audience Choice Award, Best Acting, The Bully Solution, Bloodshots Film Festival",
    "A&E Short Filmmakers Award, Glimpse, National Screen Institute",
    "Best Actor (Riaan Smit), Contact Club, Vancouver Quarantine Performance Project",
    "Leo-nominated as an editor",
  ],

  /** Recognition › Press: quote ids from content/press.ts (≤4). */
  pressPicks: PRESS_PICKS,

  /** On set: two or three cleared photos (spec §11). */
  photos: ON_SET,

  /** His portrait (4:5), when he supplies one (O-SITE-2). None: no frame anywhere. */
  // Widened on purpose: the slot holds a Photo once he supplies one.
  portrait: PORTRAIT as Photo | undefined,

  /** The meta description (≤155 characters). */
  // Copy row A-11
  description:
    "Kryshan Randel directs, shoots and edits in Vancouver: dark comedy shorts, PSAs, music videos and studio EPKs. He teaches film at Vancouver Film School and LaSalle College.",
} as const;

/**
 * Clients, named in type (no logos until cleared, Q2). Not shown since his
 * round-3 notes took out "Directed and shot"; the page can list them again. Studios and networks
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
