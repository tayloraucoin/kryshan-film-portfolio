# Kryshan Randel — Review Round Synthesis

Vitrine · batch 8 · 2026-09-24 · input: the round's submission (`_direction/review-stage-feedback.md`, round `64e7b6d0`, sent 2026-09-23, 17 structured answers, 0 pinned comments) · reads with 02 (source of truth), 04 (pillars, amended today), 06-A (the chosen layout).

This is the revision triage the run sheet promised at the end of Phase 1: what he said, what it means, and which kind of change each comment is. It is the input to Demo D's UX handoff, `docs/specs/02-review-demo-d/demo-d-ux-handoff-v1.md`: A, revised, built beside A so the two can be compared. Consulted: Vesper (interaction), Mason (build), Drummer (conversion and scope), Tribune (the client and the visitor), Sage (behavioural evidence).

---

## 1. The verdict

**Kit A in Layout A, and it wasn't close.** He chose A for every question that let him: favourite demo, colour, type, voice, menu, what comes first on Home, how the two kinds of work sit together. His second-favourite demo was Layout B *in Kit A*, so the kit is fixed even when the layout changes. The direction is settled. Everything he flagged sits inside Layout A and is noise around the player, not a problem with the structure. The one thing he rejected outright is a word: **Generous**.

---

## 2. Takeaways

1. **The direction is converged; the work now is subtraction.** No fork survives. Kits B and C, Layouts B and C, and Kit C's coloured role dots are retired. What remains is fixing A, not choosing again.
2. **His edge is the brand, and he wants it assertive.** He rejected the one soft pillar ("sounds soft, people pleasing, under charging and not as assertive") and ranked the warmest voice, Kit B's, last for how it sounds. Warmth stays in the palette (bone, never white) and in the humour. It never goes into softer copy. Generous is replaced (see §5).
3. **Every flinch inside A is chrome crowding the work:** his name twice, a Close button below the player where he couldn't see it, a "Full page →" link with his email jammed beside it. The fix is to remove things, not restyle them. That is the site's thesis ("chrome quieter than the weakest frame") failing in three places, and he caught all three.
4. **He expects the film to get big.** "If videos go full screen" and his favourite reference (McKee: "a thumbnail expands to fill the screen") agree: when he taps a film, he pictures it taking over. The 2×2 half-width cell underdelivered on that.
5. **"Netflix, but simple and fast" is the brief for Phase 2.** Borrow how Netflix gets you browsing and watching. Refuse how Netflix holds your attention: autoplaying previews, the billboard hero, anything that loads before you ask.
6. **More of him, less of his name.** He wants himself strongly present on Home (5.9 of 7, close to "always there"), yet flinched at his name appearing twice and found Layout B, the "always there" layout, too noisy. So his presence comes through his voice, his face and a name that is always visible once, never through repetition.
7. **The paid work is named by its clients.** "Passion project" stays as the only lane label. Everything else carries the client's name and never "For hire". That turns a category word into proof (DGC BC, Sony Pictures, Theatre Under The Stars).
8. **Teaching earned the fifth page, and he's bringing material:** more photos, text, and testimonials he'll collect. That gives the fifth page real content, and it creates a consent process we have to run.
9. **He wants the domain email back.** `kryshan@kryshanrandel.com` is a professionalism signal to him. It only goes on the site after mail sent to it provably arrives.
10. **Words beat colour for roles.** "No, words are enough." Directing, Camera and Editing stay literal, in type.

---

## 3. What he said, triaged

Every comment is one of four kinds (Vitrine §5): a **defect** (we broke something), a **taste adjustment** inside the direction, a **direction change**, or a **scope change**.

| # | His words | Reading | Kind | Resolution (handoff ruling) |
|---|---|---|---|---|
| 1 | "My name twice" | Wordmark in the nav *and* the title cell's H1, stacked, on the first screen. | Defect | The name is set once, in the top bar, which stays on screen. The title cell becomes his voice, not his name. |
| 2 | "the 'close' button on option A … harder to see right away, maybe just an 'x' instead?" | The Close button sat under the player and meta, below the fold of the open cell. | Defect | An ✕ at the top right of the open film, in a slim strip above the player (not over it, where YouTube's own controls sit); opening another film or pressing Esc also closes it. |
| 3 | "the confusion over 'full page' and what it does" · "the 'full page' linking to my email address I assume is a temp element, but if videos go full screen it might not be needed? Looks too noisy/crowded." | He read the dead "Full page →" link (it went nowhere in the demo) and the email beside it as one confusing unit. His mental model is that "full" means the video gets big. | Defect (a dead link shown to the client) + taste | "Full page →" is gone. The film opens across the full width of the page, and fullscreen is the player's own button. The email stays as one line, alone. Detail pages still exist for sharing, search and old links, reached without a visible link. |
| 4 | "This option A Netflix model is great. Maybe there is even a few more elements to borrow … only in the spirit of keeping things simple and fast" | An invitation, not a demand, with a limit attached. Netflix is also one of his clients: borrow the behaviour, never the look. | Taste adjustment (capped) | Borrowings and refusals named one by one in the handoff; anything with motion beyond the one moment is out of scope. |
| 5 | "The Index layout, the Generous font, and most else re those two options" | Layout C and Kit B's type (Space Mono). "Those two options" is read as Layout C and Kit B. | Confirms direction | Nothing from C or B carries forward, including B's mono and serif faces. |
| 6 | "Layout B is too noisy, and layout C too timid and less image driven" | The two edges of his tolerance: noisier than A is too much; fewer images than A is too little. | Confirms direction | Every addition to A has to pass both tests: no noisier, no less image-led. |
| 7 | Generous: "sounds soft, people pleasing, under charging and not as assertive … I don't want to promote that" | He rejects the word as the one to promote, not the behaviour, which he half-concedes. | Direction change (brand) | Pillar replaced; Card A re-ranked Wicked · Resourceful · Galvanizing. 04 amended (§5 below). |
| 8 | "instead of For Hire, I like just the names of the clients implying they are for hire, like you already have in layout A" | Endorses A's tile labels; refuses the words "For hire" anywhere. | Taste adjustment | Work filter becomes role tabs plus a single "Passion projects" toggle; the other lane is never named. |
| 9 | Teaching as the fifth page; "I could send you more photos for teaching, and text. Maybe some testimonials" | Answers 02 §14 Q7; offers content. | Taste (content) | The Teaching page gets full structure, a content request to him, and a consent gate for testimonials that the build enforces. |
| 10 | kryshan@kryshanrandel.com "used to be redirected to my gmail … maybe looks more professional? Worth considering" | Answers 02 §14 Q5 with a new option; needs DNS work. | Scope change (small) | Taylor decides scope. The address is published only after a verified round trip; Gmail until then. |
| 11 | "No, words are enough" (coloured role dots) | Kit C's R/G/B idea is dead. | Confirms direction | Roles in type only. |
| 12 | "What should someone see first? My films, straight away. No banner." | Answers 02 §14 Q3. | Confirms direction | No hero and no featured player above the grid; the "one film big" fallback in 06-A §9 is closed. |
| 13 | "How much of you should be on Home? 5.9" | High, close to "always there", in tension with #1 and #6. | Taste adjustment | His voice (and a current portrait when he sends one) in a larger first cell; his name in the top bar; no rail. |

---

## 4. The numbers

| Question | His answer |
|---|---|
| Favourite demo | Layout A · The Marquee, in Kit A |
| Second | Layout B · The Study, in Kit A |
| Pillar lead | 1 Wicked · 2 Resourceful · 3 Generous |
| The three pillars sound like him | 5.0 / 7 |
| Colour | A · B · C |
| Type | A · B · C |
| How it sounds | A · C · B |
| Coloured role dots | No, words are enough |
| First on Home | My films, straight away. No banner. |
| Menu | Top bar: name left, pages right |
| Passion and paid work | One grid, passion projects labelled |
| Lane names | "Passion project" + client names (his own words, over the three offered) |
| Fifth page | Teaching |
| Him on Home | 5.9 / 7 |
| Pinned comments | 0 |

---

## 5. The pillar: Generous is replaced by **Galvanizing**

The full reasoning, candidate table and consult record are in 04, *Step 8*. In short:

- **What he rejected:** the word, not the behaviour ("which may also be true"). When a producer compares shortlisted hires, a warmth word gets traded against competence ("nice, probably cheaper"). His four flinch words describe exactly that trade.
- **What had to survive:** his second throughline, which is his and not ours: collaborators *"feel safe and trusted enough to deliver their best performance, film their best shot … learn from me as a teacher to discover their voice."* It also had to carry his own intake lines, "can come with great teams" and "I'm not passive".
- **The replacement: Galvanizing.** You get a room moving (a cast, a crew, a class), and people do their best work in it because they trust where you're taking them. Guardrail: ***"Galvanizing, but not domineering."*** The guardrail now carries the "safe and trusted" half, so it binds as hard as "wicked, but not nasty."
- **Why it wins:**
  - It passes all four flinch words outright. Nobody galvanizes by people-pleasing, and nobody hires the person who gets the set moving as the cheap option.
  - It traces to his own refusal of passivity.
  - It is independent of Wicked and Resourceful.
  - Its proof is checkable: the two fast-film contests he founded, actors in his shorts winning Best Actor and Best Acting, the Frames Film Project, twelve years at InFocus.
  - It was the only word in all three consultants' top two (Tribune 1st; Sage and Drummer 2nd).
- **Runner-up: Emboldening.** It keeps throughline 2 best, but reads as coach talk to a producer hiring camera, and sits close to "soft".
- **Third: Captain.** It gets department-head pricing, but any director could claim it.
- **Ruled out: Ringleader.** He'd grin at it, but it pulls toward the events life he keeps off the site, and it reads as "trouble" to a program director placing young people.
- **Resourceful, re-guarded:** *"but never cheap"* (was "not scrappy"). Drummer's catch: "$25", "any budget" and "on a shoestring" carried more of the under-charging risk than Generous did. Numbers are told as craft, never as price. "Any budget" never appears in a headline. The overlap *"slick on a shoestring"* becomes *"slick under pressure"*.
- **The cheap check:** the next message to him asks him to rank Galvanizing, Emboldening and Captain, each with one line of proof. Ranking, not rating: he gave the original three a polite 5.0. A different winner changes one file and one step; nothing downstream is built on the word, only on the proof.

---

## 6. Tensions, resolved

| Tension | Resolution |
|---|---|
| **5.9 "more of me" vs "name twice" vs "B too noisy"** | His name appears once and never leaves the screen (the top bar stays). The first grid cell carries *him*: a first-person line in his voice with one red phrase, his roles, and a current portrait when he supplies one. Presence through voice and face, not repetition or a rail. |
| **Intake "warm 6/7" vs ranking the warmest voice last** | They measure different things. Warm is a temperature: bone text, a red that glows, a set that feels safe. Soft is a register, and he refuses it. The palette stays warm; the copy stays dry and assertive. |
| **"More Netflix" vs "simple and fast"** | Borrow only the mechanics that remove a step or a pause: the top bar that stays put, rows you scroll across, the film that opens big where you tapped it, the genre line, no blank tiles. Refuse every mechanic that adds motion, loading or pressure. |
| **"Full screen" vs "never leave the page"** | The film opens across the full width of the page in place, which is as big as it gets without leaving. True fullscreen is one more tap on the player's own button, which every visitor already knows. |
| **"Too noisy" panel vs "nothing between a play button and the email" (02 §0)** | The noise was three things on one line: a dead "Full page →" link, the email, and a Close button. Two of them go. The email stays: one line, alone, the last thing in the open film. On its own it can't be confused with anything, and it keeps watch → email at one tap (Tribune and Vesper, against Drummer's "nothing else in the panel"). The top bar's Contact link and the footer email back it up. This is the one place we keep something he half-flagged; it will be named to him in the first look. |

---

## 7. What his answers settle in 02 §14, and what they don't

**Settled:** Q3 (no hero; films first) · Q7 (Teaching is the fifth page) · Q8 (lane naming: "Passion project" + client names) · Kit C's coloured tags (no) · Q5 partly (he'd like the domain address back; publishing it waits on DNS).

**Still open** (the handoff carries each as a labelled default, and the ones that block launch go to him in one message): Q1 testimonials (now a live workstream) · Q2 logos · Q4 events (default off) · Q6 form (default email only) · Q9 The Bully Solution embed · Q10 Shotlister and VANDU · Q11 socials · Q12 names he may state · Q13 Wolf clearance · Q14 set photos · Q15–21 facts · Q22–28 nice-to-haves. Plus two new ones: a current portrait for the title cell, and the replacement poster frames (Q27) before anyone sees the grid again.

---

## 8. What this round can't tell us

- **It is one person's stated preference.** Kryshan is the client, not the visitor. A producer on a phone hasn't seen any of this. The strongest behaviour-side evidence we have is still his own diagnosis of the old site ("one or two clicks too many for people to actually watch"). Every ruling that follows is checked against that visitor, not only against his taste.
- **The silent customer is the repeat camera hire.** A unit publicist or EPK producer checks his camera credits on a phone. He has about sixty productions of this work, so this is probably his most frequent paying visitor, and nothing in this round speaks for them: no comments on Work, on the Camera filter, or on the path for a returning client who only wants the email. The Work page's Camera tab and the credits line are built for them. Two cheap ways to hear from them (Tribune): ask for the old site's analytics (GTM-TP2KD9B) on the domain call, or have him ask two or three recent hirers how they used his old site.
- **Zero pinned comments.** The structured form carried the whole round. Worth knowing for the boilerplate: for this client, typing specifics into questions beat pointing at pixels.
- **Forced rankings hide how much.** B came second on colour and type because it had to come somewhere. Read the flinch box, not the rank, to see how far from A he's willing to go: not far.

---

## Sign-off

Produced: this synthesis; the amended pillars (04 v2); Demo D's UX→dev handoff (`docs/specs/02-review-demo-d/demo-d-ux-handoff-v1.md`).
Assumptions: `[ASSUMPTION: "the Generous font" means Kit B's typography (Space Mono wordmark, Work Sans, Fraunces), not the pillar]` · `[ASSUMPTION: "those two options" means Layout C and Kit B]`.
