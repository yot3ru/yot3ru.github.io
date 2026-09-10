# LUFI

LUFI is a creative production studio based in Colombo, Sri Lanka. We help
culture-first brands close the gap between a good idea and the work people
actually see, use, and remember.

The studio brings graphic design, video editing, photography, videography, and
UI/UX into one point of view. The site is a commercial portfolio: it explains
what LUFI makes, shows how the studio works, presents self-initiated studio
pieces, and moves visitors toward a conversation.

## Website direction

The interface uses an editorial-academia language built from:

- Bone, Ink, and Cinnabar as the complete color palette.
- Funnel Display for display type and numerals.
- DM Sans for body copy and interface labels.
- Zodiak for the single process pull quote.
- Ruled lists, folios, generous margins, and a responsive editorial grid.
- A dark liquid-metal material that stays within the LUFI palette.

The page is organized as six chapters:

1. Start
2. What we make
3. How we work
4. Studio pieces
5. Fit
6. Brief us

The work chapter advances one project per wheel step on desktop and tablet. On
mobile, each project is a landscape spread that advances with a horizontal
swipe.

## Stack

- Vite
- Vanilla JavaScript
- CSS
- WebGL2 material with a static SVG fallback
- Self-hosted WOFF2 fonts

There is no UI framework, scroll library, or animation dependency.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. The production build can be checked with:

```bash
npm run build
npm run preview
```

## GitHub Pages

The repository includes a GitHub Actions workflow at
`.github/workflows/static.yml`. Push the `main` branch, then set the
repository's Pages source to **GitHub Actions** under Settings → Pages. The
workflow builds `dist` and publishes that output; GitHub Pages must not publish
the repository root because the source `index.html` still points to Vite's
development entrypoint.

Vite uses relative production URLs, so the same build works at both a project
URL such as `https://name.github.io/lufi/` and a custom domain root.
The repository also includes `public/CNAME` for `lufi.lk`.

## Project structure

```text
index.html                 Six-section site markup and content
src/main.js                Section paging, project rail, cursor, material mount
src/chrome.js              Liquid-metal WebGL renderer
src/styles/tokens.css      Brand tokens, fonts, and motion curves
src/styles/app.css         Base layout and component styles
src/styles/redesign.css    Dark editorial system and responsive overrides
public/fonts               Self-hosted brand typefaces
public/img                 Logos, fallback material, and studio pieces
PRODUCT.md                 Product context and content constraints
DESIGN.md                  Visual direction
UX-SYSTEM.md               UX flow, spacing system, and research basis
```

## Before publishing

- Replace the `[TK]` WhatsApp, email, and Instagram placeholders in
  `index.html` with the final contact details.
- Confirm that every studio image and logo asset is cleared for publication.
- Run `npm run build` and test the final build at desktop, tablet, and 320px
  mobile widths.
- Keep `prefers-reduced-motion` and the static material fallback enabled.

The portfolio currently labels the five projects as self-initiated studio work.
No client names, testimonials, awards, or performance claims should be added
without real evidence.

## License

No open-source license has been assigned yet. Add the appropriate license and
copyright notice before distributing the repository publicly.
