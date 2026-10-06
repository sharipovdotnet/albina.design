---
name: vanilla-web-standards
description: Code standards for a plain HTML, CSS, and TypeScript project with no framework — semantic markup, CSS custom properties and layers, fluid responsive layout, typed DOM access, and safe event handling. Use when writing or reviewing markup, stylesheets, or TypeScript modules.
whenToUse: При написании или правке любого HTML, CSS и TypeScript-файла в этом проекте.
---

# Vanilla HTML / CSS / TS standards

No framework. Everything below is checkable by reading the file or running one command.

## HTML

- `<html lang="ru">`; one `<h1>` per page; heading levels never skip.
- Landmarks: `<header>`, `<nav>`, `<main>`, `<section>` with an accessible name, `<footer>`. Skip link to `#main` as the first focusable element.
- `<a href>` for navigation, `<button type="button">` for actions. Never a click handler on `<div>`/`<span>`.
- `<meta name="viewport" content="width=device-width, initial-scale=1">` — never add `user-scalable=no` or `maximum-scale`.
- Every `<img>` has `alt` (empty for decorative), plus `width` and `height` or an `aspect-ratio` box. Below the fold: `loading="lazy"` and `decoding="async"`.
- Section anchors need `scroll-margin-top` so a sticky header does not cover the heading.
- No inline `onclick` / `oninput` attributes; bind in TypeScript.

## CSS

- Design tokens as custom properties in `:root` (`--space-*`, `--radius-*`, `--surface`, `--ink`, `--accent`, `--font-*`). No raw hex or magic pixel values inside component rules.
- Order with one `@layer` statement: `@layer reset, tokens, base, layout, components, utilities;` — no `!important` anywhere.
- Mobile-first: base styles for the narrow case, `@media (min-width: ...)` upward. Check 320px first — horizontal scrolling there is a bug, not a nuance.
- Fluid type and space with `clamp()` instead of a font-size per breakpoint. Keep only 2–3 breakpoints.
- Container queries (`container-type: inline-size`) for components that must work in two widths; media queries for page-level layout.
- Prefer grid/flex layout over JS measurement. Use logical properties (`margin-inline`, `padding-block`, `inset-inline`) for anything that may become RTL.
- `:focus-visible` with a visible ring on every interactive element — including on top of photos, where a thin outline disappears (add `outline-offset` or a contrast ring).
- `transition` lists properties explicitly; never `transition: all`.
- Naming: block-element style classes (`project-card__title`), no ID selectors for styling, no nesting deeper than two levels of native CSS nesting.

## TypeScript

- `"strict": true`, plus `noUncheckedIndexedAccess` where it does not fight the DOM types. No `any`; use `unknown` plus narrowing.
- Typed DOM access: a tiny helper that throws on a missing element is better than `!` assertions scattered around — `querySelector` returns `T | null` and every use must handle it.
- `querySelector<HTMLElement>` with a concrete element type (`HTMLDialogElement`, `HTMLFormElement`, `HTMLImageElement`), not bare `Element`, so `.showModal()`, `.checkValidity()`, `.currentSrc` type-check.
- Data lives in typed modules (`interface Project { … }` and an exported array), never as HTML strings assembled in JS.
- Never `innerHTML` with anything that could come from outside the file; use `textContent` and `createElement`/`replaceChildren`.
- No inline `onclick`; `addEventListener` with delegation on the container for repeated elements (a gallery of 20 cards gets one listener, not 20).
- Cache DOM lookups outside loops; never read layout (`offsetHeight`, `getBoundingClientRect`) inside a write loop.
- Modules: `<script type="module" src="…">`; no global namespace pollution, no `window.foo` handoffs.

## Verification (run before claiming done)

```powershell
npx tsc --noEmit          # types, no emit
npx vite build            # if a build step exists; otherwise open index.html directly
```

Then a browser pass at 320, 768, and 1440 px with the console open: no errors, no horizontal scrollbar, keyboard Tab reaches every interactive element in a sensible order.
