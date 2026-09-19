# LUFI

LUFI is an independent creative studio in Colombo, Sri Lanka. The studio works across graphic design, photography, film and digital experiences. This website is an expression of LUFI's thinking and craft: its typography, visual language, motion and responsive behavior serve as the demonstration.

The site does not present concept art as commissioned client work. Its images and motion are labeled LUFI studies or studio experiments. There are no fictional case studies, client names, results or testimonials.

## Run locally

```bash
npm ci
npm run dev
```

`npm run build` checks Astro and TypeScript, then writes the static site to `dist`. `npm run preview` serves that build locally.

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds `dist` and deploys it to GitHub Pages when `main` is pushed. Set the repository's Pages source to **GitHub Actions**. `public/CNAME` declares the `lufi.lk` custom domain, and `astro.config.mjs` uses that origin for canonical and social URLs.

The repository root is source code; Pages must publish the `dist` artifact, not the root directory.

## Site structure

- `src/pages/index.astro` — single-page narrative and content
- `src/components/` — navigation, footer and hero material
- `src/styles/global.css` — layout, type, color and responsive behavior
- `public/img/` — logos and optimized LUFI studies
- `public/video/` — Higgsfield LUFI material loop
- `DESIGN.md` — art direction and interaction rules
- `PRODUCT.md` — product goals and truth boundaries

## Before launch

Replace the contact placeholder in `src/pages/index.astro` with LUFI's **verified** WhatsApp number and email. Do not invent them. Run `npm run build` after any content or asset change.

The private `brand/` directory is ignored and must stay out of the published repository. No open-source license has been assigned to the site or brand assets.
