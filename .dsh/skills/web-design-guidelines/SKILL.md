---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance — accessibility, focus states, forms, animation, typography, images, performance, touch, safe areas, theming, i18n. Use when asked to review the UI, check accessibility, audit design or UX, or to verify a section against best practices before calling it done.
whenToUse: Аудит-проход после сборки или правки любой секции или страницы, перед сдачей задачи.
metadata:
  author: vercel-labs (adapted for local use)
  version: "1.0.0"
  argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Review UI code for compliance with the Web Interface Guidelines.

## How it works

1. **Read the ruleset first, in full:** `.dsh/skills/web-design-guidelines/references/web-interface-guidelines.md`. It is the source of truth both for the rules and for the required output format.
2. **Determine the target files:** the files changed in this task, or the file/pattern the user named. If nothing is named and nothing was changed, ask which files to review instead of guessing.
3. **Check every rule against every target file.** Do not skim. The ruleset covers Accessibility, Focus States, Forms, Animation, Typography, Content Handling, Images, Performance, Navigation & State, Touch & Interaction, Safe Areas, Dark Mode & Theming, Locale & i18n, Hover States, and Content & Copy.
4. **Report** grouped by file, in `file:line - issue` form, most severe first. State issue plus location; skip the explanation when the fix is obvious. Write `✓ pass` for a file with no findings.

## Scope notes for this project

- The stack is plain HTML, CSS, and TypeScript — no framework. Ignore framework-specific spellings of a rule (`htmlFor`, `spellCheck`, `next/link`, `priority`, hydration warnings) and apply the underlying intent with vanilla DOM APIs instead.
- Report only real violations. Never invent findings to make the report look thorough.
- Prefer the local ruleset over fetching anything from the network: the review must be deterministic and reproducible offline.

**Provenance:** adapted from [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) (MIT), with the ruleset inlined from [`vercel-labs/web-interface-guidelines`](https://github.com/vercel-labs/web-interface-guidelines) (MIT, Copyright (c) 2025 Vercel Labs) so that review needs no network access. See `.dsh/THIRD-PARTY.md`.
