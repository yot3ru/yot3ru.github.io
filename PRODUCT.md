# LUFI website product brief

## Purpose

The website should make a visitor understand what LUFI makes, trust its design judgment, and start a conversation. LUFI is an independent creative studio in Colombo, Sri Lanka. The site itself is the strongest current evidence of its work.

## Audience

Potential clients arrive by referral, Instagram or WhatsApp, often on a phone. They need to see LUFI's taste, understand its capabilities and know how to make contact. The experience should work on constrained mobile networks.

## Truth boundaries

LUFI offers graphic design, video editing, photography, videography and UI/UX. Art direction connects these disciplines. There is no verified client roster, award history, testimonial set or project outcomes to publish. LUFI Lab displays graphic artwork supplied by the owner without claiming unverified client work. Generated imagery elsewhere is labeled LUFI Study or studio experiment. Contact values remain unlinked until the owner supplies real details.

## Information architecture

One static page: LUFI hero → point of view → capabilities → LUFI Lab → how we think → how we work → about → contact. There are no portfolio pages, project cards or case-study routes. Navigation uses anchors. `/404.html` and `/sitemap.xml` support the static site.

## Technical delivery

Astro + TypeScript + CSS, built to static files and deployed to GitHub Pages. No runtime backend, form or scroll library. Images are optimized WebP. The Lab gallery animates only near view and can be paused or browsed manually. The material shader runs through WebGL2 or WebGL1 when available; unsupported contexts show solid Ink.

## Brand

Bone `#EBE7E0`, Ink `#181715`, Cinnabar `#CD474C`. Funnel Display, DM Sans and Zodiak Italic. The user supplied the logo. The visual direction is premium editorial design with tactile material, controlled cropping and deliberate negative space.

## Quality gates

- Mobile first, readable at 320px without horizontal overflow.
- No cut-off content or forced section paging.
- Keyboard-accessible navigation and tabs, visible focus and semantic HTML.
- Reduced-motion control for text and galleries, no essential content hidden by JavaScript.
- Fast static HTML and an entry gate that decodes page imagery and fonts before reveal; no video in the critical path.
- Build must pass `npm run build` before publication.

## Pending owner input

Verified WhatsApp number and email address are needed to activate contact buttons. A real Instagram URL can be added if supplied.
