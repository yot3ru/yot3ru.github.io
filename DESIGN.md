# LUFI — Living proof

LUFI's website is the studio's current demonstration of taste. It does not imitate a client portfolio. Typography, composition, visual experiments and interaction show the studio's point of view, while the copy states what LUFI actually offers.

## Visual system

- **Palette:** Ink `#181715`, Bone `#EBE7E0`, Cinnabar `#CD474C` throughout. Large Cinnabar fields include 15% Ink for readable Bone labels.
- **Type:** Funnel Display for statements and capability selection; DM Sans for reading and interface; Zodiak Italic for a restrained editorial accent. All fonts are self-hosted.
- **Grid:** Mobile-first single column with `clamp(1.25rem, 5vw, 5.5rem)` outer gutters. At 700px, selected sections become asymmetric two-column spreads. Content can grow naturally; no section clips to the viewport.
- **Rhythm:** Loud Ink hero, quiet Bone point of view, assertive Cinnabar capabilities, Ink Lab, quiet Bone thinking, Ink process and a strong Cinnabar contact finish.
- **Motif:** Bone paper, Ink reflective material and Cinnabar fabric or pigment. The same responsive WebGL material animates in the hero and behind the studio mark; the lower instance initializes only near view. Higgsfield-generated stills and a short loop develop the same matter in LUFI Lab.

## Interaction

- Native scrolling; no scroll interception or snap.
- First entry begins as a clean Ink field at true zero. The LUFI mark behaves as a flat vessel: a Bone liquid level rises from below while its Cinnabar surface changes through irregular Bézier contours, then settles above the mask before the finished mark dissolves into the already-painted hero. The level itself stays on a compositor transform; only the small bounded surface repaints. Cold entry resolves within roughly 2.5 seconds, warm reloads in roughly 1.5 seconds, and internal navigation never replays it. Reduced motion uses a short static fill, and a 5.2-second fail-safe releases the page with a fade.
- One primary interactive moment: the folded chrome material from LUFI's earlier live site, with a slow jelly-like response to pointer movement. A long, gradual horizontal mask leaves the headline on Ink while the metal comes forward on the right. The original chrome still appears if WebGL2 is unavailable or motion is reduced.
- The hero keeps “Make something” fixed and rotates 22 short endings. Each cycle is shuffled; endings with the same starting letter have at least two other endings between them. Reduced-motion visitors see the original static line.
- Capability titles are real tabs, work by click, touch and arrow keys, and update a labeled LUFI study. All content remains available without hover.
- The Lab loop loads only when near view and pauses offscreen. Reduced-motion users see the poster.
- Fine-pointer devices use a LUFI precision cursor: a tightly tracked 6px core and a 24px follower with slight inertia. It replaces the native arrow only after successful initialization. Ink and Bone are the default section-aware colors; Cinnabar appears for action states, while Cinnabar surfaces use Ink for contrast.
- Link, CTA and media states come from one delegated state system. Presses compress by a few percent, fast movement introduces a maximum 6% directional stretch, and the single animation loop stops once the follower settles. Text restores the native I-beam. Touch, coarse-pointer and reduced-motion devices retain their native cursor.

## Motion language

- Motion uses soft deceleration, controlled inertia, short travel and clean settling. The primary curves are `cubic-bezier(.22, 1, .36, 1)` and `cubic-bezier(.16, 1, .3, 1)`.
- Timings and distances are centralized as CSS tokens. Hero motion is strongest; headings and media use measured reveals; body copy, labels and frequent controls move less and finish sooner.
- Once the entry overlay begins to clear, the hero resolves in one short sequence: navigation, label, two display lines, then secondary controls and material. The two sequences overlap so the site is already alive as it appears.
- Section motion runs once and begins near the lower edge of the viewport. Editorial rules draw across, display lines rise inside masks, copy settles by a few pixels and media is uncovered with a restrained scale correction.
- Mobile uses shorter travel, no staggered lists and no pointer behavior. Capability changes, menu actions and touch feedback remain immediate.
- Reduced motion removes continuous, pointer-led and translated movement. Text, images and controls remain visible in their final state, while WebGL and the Lab video use their static fallbacks.

## Asset truth

The four new visual studies and the loop were generated through Higgsfield under one material brief. Every illustration is a LUFI study, not a client commission. No invented client names, metrics, testimonials or outcomes appear.

## Content and accessibility rules

Use short, specific language. Keep a generous reading measure, visible focus states, semantic headings and controlled contrast. At 320px, every line and image must reflow within the viewport. No reveal animation may be required to see content. The contact section awaits real WhatsApp and email details; it must not invent either one.
