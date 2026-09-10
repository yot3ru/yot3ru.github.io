# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated, with one binding user requirement: the site must be animated.

Vite + vanilla JavaScript and CSS, with a hand-written WebGL2 material. No UI framework,
animation library, or scroll library. The procedural chrome uses an advected 112 × 72
velocity and density field for pointer disturbance. The original SVG fallback requires no GPU.

The user's earlier stated preference in this project was "Vite + React + TypeScript +
React Three Fiber + GSAP/Lenis"; they later accepted the move to vanilla after the payload
measurement, and on rebuild answered "i want animated website, please refer to everything
we talked about before." The animation requirement is theirs; the framework choice is
delegated.

## Users

Primary: owners and marketing leads at culture-first businesses in Sri Lanka — music,
fashion, food and beverage, nightlife, and independent creators. They arrive from Instagram
or a referral, usually on a phone, evaluating whether this studio can execute at the level
their brand needs. They are deciding who to talk to, not buying on the spot.

Their job on this site: work out fast what LUFI makes, whether the craft is good enough,
and how to start a conversation without filling in a form.

## Product Purpose

The site is the studio's sales surface. It exists to turn a visitor into a conversation on
WhatsApp. Success is a message received, not time on page.

This is explicitly not a brand guideline, manifesto, or internal reference. The user's
words: "this is a commercial website so this should serve as our portfolio or customer
grabbing website. not a guidebook nor our brand related thing."

## Positioning

Full-service creative production — graphic design, video editing, photography,
videography, UI/UX — sold as a point of view rather than as a discipline menu. There is no
single lead service; the front door is the thinking.

Priced at the top of the local market, which means the site must show rather than explain.

## Operating Context

Sri Lanka. WhatsApp is the dominant business channel, so it is the primary conversion path;
email is the formal fallback. Mobile-first traffic, frequently over constrained networks,
which constrains payload and makes the WebGL layer capability-gated rather than assumed.

## Capabilities and Constraints

- One page, six sections, no router.
- Six sections retain their order and destinations. The vertical gate advances one
  chapter at a time; the Work chapter borrows desktop/tablet wheel input for one
  horizontal project step and uses native horizontal swipes on mobile.
- A cursor effect is required, as augmentation only — the native cursor is never hidden.
- Must work at 320px with no unintended horizontal overflow, and under
  `prefers-reduced-motion`. The Work rail is the only intentional horizontal surface.
- No form, no third-party capture service, no backend.
- Contact details are undecided; the user will supply them. They stay `[TK]` until then.

## Brand Commitments

- Name: LUFI. Creative production studio.
- Art direction: editorial academia. Generous margins, fine rules, folios, asymmetric
  compositions, and one Zodiak quote. Existing copy and studio pieces remain intact.
- Colour: Bone `#EBE7E0`, Ink `#181715`, Cinnabar `#CD474C`.
- Type: Funnel Display (display and all numerals — it is natively tabular, DM Sans is not),
  DM Sans (body and labels), Zodiak (pull quote, used once). JetBrains Mono was explicitly
  dropped from the system by the user and must not return.
- Always keep Bone, Ink and Cinnabar, including the background shader. Reference
  images inform material behavior, never authorize palette changes. The background
  has slow reflective folds and a local, advected fluid disturbance with a diffusing trail;
  no travelling water ripples. White ink on Cinnabar remains allowed. The explicit chrome
  brief overrides the older matte material direction but retains its colour range.
- Logo is a combination lockup (mark + wordmark). Mark-only is reserved for the rail,
  favicon, and avatar, because an icon-only mark depends on recognition a year-one studio
  does not have.
- Logo is field-aware: on Bone the wordmark is `#A7383C` and the mark `#181715`; on Ink the
  wordmark is `#EBE7E0` and the mark `#D5C7B0`. The supplied single pairing works on
  neither field — the mark's `#D5C7B0` measures 1.35:1 on Bone.
- Tagline: "Every brand is stuck between two things." Short form: "Find the gap."
- Voice: culture-first, plain, no marketing inflation.

## Evidence on Hand

**There is no client work, and none may be invented.** No client names, testimonials, case
studies, awards, or statistics exist. Any of these appearing on the site would be
fabricated. The work section shows self-initiated capability pieces, described as studio
work rather than client work — the user's confirmed choice.

Copy gaps use `[PLACEHOLDER]`; contact details use `[TK]`.

The user supplied the current logo vectors on September 9, 2026. The hero uses the supplied
full lockup with the mark adapted to Ink for contrast on Bone. Fonts are locally served.

The private `brand/` folder must never be committed or published — anything deployed to
GitHub Pages is publicly readable.

## Product Principles

1. **The conversation is the conversion.** Every section either builds confidence or moves
   toward WhatsApp. Nothing on the page exists to describe the brand to itself.
2. **Show the craft, do not claim it.** With no client roster, demonstrated execution is
   the only available proof. Assertions of quality are worth nothing here.
3. **Honesty about stage is an asset.** A year-one studio that is straight about what it
   has built reads as more trustworthy than one implying a client list it lacks.
4. **It must hold together on a phone on a bad connection.** The audience arrives from
   Instagram. Motion and WebGL are enhancements that degrade cleanly, never requirements.
5. **Nothing on screen may be cut off.** The recurring failure of every previous attempt.
   Sections fit or they grow; they never clip.

## Accessibility & Inclusion

- Native cursor is never hidden or replaced; the cursor effect is additive and gated to
  `pointer: fine`.
- Full functionality under `prefers-reduced-motion: reduce`.
- WCAG 1.4.10 reflow at 320px with no horizontal scroll.
- Content is visible by default and never depends on JavaScript to un-hide.
- Snapping is never applied where a section can exceed the viewport, which would strand
  content and keyboard focus.
