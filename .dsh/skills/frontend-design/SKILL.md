---
name: frontend-design
description: Design direction for the Albina Design interior-designer landing page — typography with Cyrillic coverage, photo-led layout, cohesive palette, restrained motion, and avoiding generic AI aesthetics. Use when building or restyling any visible section, choosing fonts or colors, or judging whether a design looks like a real studio rather than a template.
whenToUse: Перед версткой любой секции, при выборе шрифтов/палитры/анимаций и при оценке того, выглядит ли страница как работа студии, а не как шаблон.
---

# Frontend Design — interior designer landing page

Goal: a page that reads as a **real studio's portfolio**, not as a generated template. The photographs of interiors are the hero; the interface is the frame around them.

## Choose a direction before writing code

State the direction in one sentence, then implement it consistently. This project's default register is **refined editorial**: warm neutral base, generous negative space, one accent, quiet confidence. Deviate only if the user asks for a different register (bold, moody, art-deco, minimal-industrial), and then commit fully instead of averaging two directions.

Write down: tone (one sentence), type pairing, base/accent colors, the single memorable detail. Every later decision must trace back to it.

## Typography

- **Verify Cyrillic coverage before committing to a font.** The site is in Russian; a font without Cyrillic silently falls back and the design collapses. Check the font's subsets, then look at the rendered `Й`, `Ж`, `Д`, `б` — not just the specimen page.
- Reliable Cyrillic-capable choices: display — Playfair Display, Cormorant Garamond, Unbounded; text — PT Serif, Lora, Golos Text, Onest, Manrope, Inter, Commissioner, Rubik, Montserrat.
- Two families maximum (one display, one text), 3–4 weights total. Self-host `woff2`, `font-display: swap`, preload only the primary face.
- Set a real type scale with `clamp()` (fluid between 320px and 1440px); body measure 60–75 characters; `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.
- Small caps or letter-spaced uppercase for eyebrow labels and captions; never letter-space lowercase Cyrillic.

## Color and surface

- Warm neutrals (paper, clay, sand, graphite) rather than pure `#fff`/`#000` on a photography-led page; pure white makes interior photos look grey.
- One accent, used sparingly (links, active state, one line of emphasis). Dominant surface + sharp accent beats evenly distributed palettes.
- All colors as CSS custom properties in `:root` with semantic names (`--surface`, `--ink`, `--ink-muted`, `--accent`).
- Check contrast: AA for body text (4.5:1) and large text (3:1). Muted greys on warm beige is where these designs usually fail.
- Give the page depth with intent — a subtle grain overlay, a soft shadow, a hairline rule — instead of defaulting to flat white cards.

## Photography

- Never fight the images. The palette should come from the interiors, not compete with them.
- One consistent aspect ratio per section (`aspect-ratio` in CSS, `object-fit: cover`), and never a mixed grid of random ratios.
- Always explicit `width`/`height` or `aspect-ratio` so the layout does not jump while loading.
- Full-bleed image sections with text over them need a gradient or solid scrim for contrast — check the text against the lightest part of the photo.

## Motion

- One orchestrated page-load reveal with staggered delays reads as expensive; scattered micro-interactions read as a template.
- Scroll reveals via `IntersectionObserver` in TypeScript, not by re-measuring on every `scroll` event.
- Animate `transform` and `opacity` only; 200–600 ms; ease-out for entrances.
- Honor `prefers-reduced-motion: reduce` by removing transforms and keeping content instantly visible.
- Hover states should reveal something (image zoom within its frame, rule that extends, caption that fades in), not just change a background color.

## Avoid — the generic AI look

Purple-to-blue gradients on white, three identical icon-plus-heading feature cards, everything center-aligned, emoji as icons, glassmorphism as the only texture, stock illustrations of plants, a hero with two equal-weight buttons, "Lorem ipsum"-length placeholder copy, and identical spacing between every element. Each of these is a tell that no design decision was made.

## Boundaries

Aesthetics and copy **are** the deliverable here — spending effort on typography and spacing is in scope, not over-engineering. Architecture minimalism still applies: no CMS, no build-time framework, no filtering/search, no animations library, and no component abstraction for a page that renders once. When in doubt, do less in JS and more in CSS.
