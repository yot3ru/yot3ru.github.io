# LUFI UX and layout system

LUFI is a six-chapter commercial portfolio. The visitor should understand the
studio, see evidence of craft, decide whether the fit is right, and start a
WhatsApp conversation without hunting for the next action.

## Experience flow

1. **Start** establishes the point of view and gives two clear paths: brief LUFI
   or see the work.
2. **What we make** answers the service question in one readable ledger. The
   heading introduces the category; the rows carry the detail.
3. **How we work** removes delivery risk with three sequential moves.
4. **Studio pieces** proves the claim. Desktop and tablet advance one project
   per wheel step; mobile swipes one project per page. Each project is an
   editorial spread: a dominant image on the main column and a restrained
   marginal note separated by deliberate negative space. Mobile preserves the
   source artwork's 4:5 image ratio so the project is never cropped by a
   landscape box.
5. **Fit** lets a visitor self-qualify before starting a conversation.
6. **Brief us** closes with WhatsApp first and email as the fallback.

The order is deliberate: orientation → offer → process → proof → qualification
→ action. Section navigation exposes the same sequence, so the rail is both a
wayfinding aid and a progress indicator.

## Spacing and layout tokens

The system uses an 8px base rhythm. Values are expressed in `rem` so browser
text scaling also scales the composition.

| Token | Value | Use |
| --- | ---: | --- |
| `--space-1` | 8px | label-to-copy and tight inline groups |
| `--space-2` | 12px | metadata groups, tick rows |
| `--space-3` | 16px | standard control and list separation |
| `--space-4` | 24px | content groups and project metadata |
| `--space-5` | 32px | chapter sub-groups |
| `--space-6` | 48px | major composition gaps |
| `--page-block` | 28–64px | top breathing room inside a chapter |
| `--page-block-end` | page block + 58px | clearance for the navigation rail |

The inline page gutter is fluid and shared by every chapter, the work rail, and
the hero cue. The reading measure is capped at 68ch; display headings may be
wider, but explanatory copy does not stretch across the viewport. The fixed
mobile section rail has an explicit clearance token, and `scroll-padding` keeps
snap positions out from underneath it.

Every content chapter starts on the same baseline: the folio sits at the page
block inset and the main heading follows the same folio-to-heading gap. Hero
and closing chapters are intentional exceptions because they are entry and
conversion compositions; the four middle chapters share the editorial grid.

At widths above 900px, chapters that have two levels of information use a
heading column and a content column. At 900px and below, the hierarchy reflows
to one column so copy keeps a readable measure instead of becoming a narrow
strip. Touch layouts use content-led chapter heights with proximity snapping;
only wide desktop locks every chapter to one viewport. The work rail remains a
horizontal, one-page-per-swipe sequence on touch.

## Type roles

- **Display:** Funnel Display, used for the LUFI lockup, chapter headings, and
  project names.
- **Body:** DM Sans, `clamp(.875rem, .25vw + .8rem, 1rem)` with a 1.5 line-height.
- **Labels:** DM Sans, 11–12px, uppercase, used for folios, categories, and
  destinations.
- **Pull quote:** Zodiak, used once for the process statement.

Body copy, offer rows, process descriptions, fit lists, and project annotations
share the same body token. Only hierarchy changes size; content type no longer
creates unrelated scales.

## Accessibility and motion rules

Text stays on the Bone/Ink/Cinnabar palette. Secondary copy remains a tinted
Bone value rather than a new grey. Focus rings use Cinnabar and remain visible
on keyboard navigation. Reduced-motion users receive instant section and rail
changes; the native cursor is never removed.

The vertical gate moves one chapter at a time. The work rail moves one project
at a time and returns the wheel to the vertical gate at either edge. Motion is
used to explain where the visitor is going, not to hide content.

## Research basis

- [WCAG 2.2, Visual Presentation](https://www.w3.org/TR/WCAG22/#visual-presentation)
  supports the 1.5 line-height and paragraph-spacing target, readable measures,
  and reflow without a second reading axis.
- [WCAG 1.4.10, Reflow](https://www.w3.org/WAI/WCAG21/Understanding/reflow)
  requires content to remain usable at a 320px CSS width without loss of
  information or two-dimensional reading for ordinary text.
- [Apple HIG, Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
  supports safe areas, shared margins, aligned reading order, and testing the
  smallest and largest layouts for clipping.
- [Material responsive UI](https://m1.material.io/layout/responsive-ui.html)
  supports consistent margins/gutters, an 8dp baseline, and reflowing from a
  two-level layout to a single hierarchy on narrow screens.
- [Material metrics and keylines](https://m1.material.io/layout/metrics-keylines.html)
  supports the shared baseline grid and consistent keylines.
- [web.dev responsive design basics](https://web.dev/articles/responsive-web-design-basics)
  supports fluid media, content-driven breakpoints, max-width images, and
  starting from the smallest layout before expanding.
- [MDN scroll snap alignment](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-snap-align)
  supports explicit `start` snap positions; [MDN scroll snap concepts](https://developer.mozilla.org/docs/Web/CSS/CSS_Scroll_Snap/Basic_concepts)
  supports `scroll-padding` where fixed controls would otherwise cover content.
- [MDN container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries)
  supports binding component behavior to its available container instead of
  guessing from viewport classes alone.
- [Google: Making motion meaningful](https://design.google/library/making-motion-meaningful)
  supports using motion to preserve continuity, focus, and spatial direction.
- [Nielsen Norman Group: Progressive disclosure](https://www.nngroup.com/articles/progressive-disclosure/)
  supports showing the next useful level of information only when the visitor
  reaches that chapter, rather than cramming the whole sales story into one
  screen.
- [Adobe: Do's and don'ts of great print design](https://www.adobe.com/learn/indesign/web/standard-design-practices)
  supports anchoring elements to guides, using whitespace to establish a focal
  point, and repeating structural elements as a visual language.
- [USWDS typography](https://designsystem.digital.gov/components/typography/)
  supports using less space to group related items, more space between groups,
  and keeping headings closer to the content they introduce.
- [Android content structure](https://developer.android.com/design/ui/mobile/guides/layout-and-content/content-structure)
  supports choosing a hierarchical grid when a page has a dominant image and
  supporting detail, then adapting that grid across form factors.
