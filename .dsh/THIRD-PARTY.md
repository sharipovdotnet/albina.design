# Third-party notices

Files under `.dsh/skills/` that are not original to this project, with their provenance and license. Keep this file accurate when a skill is added, updated, or removed.

## karpathy-guidelines

- **File:** `.dsh/skills/karpathy-guidelines/SKILL.md`
- **Source:** <https://github.com/forrestchang/andrej-karpathy-skills> — `skills/karpathy-guidelines/SKILL.md`
- **Retrieved:** 2026-10-06
- **License:** MIT, as declared in the skill's own frontmatter (`license: MIT`). No standalone `LICENSE` file was present at the repository root at the time of retrieval; the MIT declaration in the skill frontmatter is the upstream grant.
- **Modifications:** body reproduced verbatim; a `whenToUse` frontmatter key and a provenance footer were added.
- **Note:** this is community packaging of behavioral guidelines derived from Andrej Karpathy's public observations. It is not authored or endorsed by him.

## web-design-guidelines

- **Files:**
  - `.dsh/skills/web-design-guidelines/SKILL.md`
  - `.dsh/skills/web-design-guidelines/references/web-interface-guidelines.md`
- **Sources:**
  - <https://github.com/vercel-labs/agent-skills> — `skills/web-design-guidelines/SKILL.md` (MIT, per the repository README)
  - <https://github.com/vercel-labs/web-interface-guidelines> — `command.md`, inlined as the local ruleset
- **Retrieved:** 2026-10-06
- **License:** MIT — Copyright (c) 2025 Vercel Labs
- **Modifications:** the wrapper no longer fetches the ruleset from the network; the rules are vendored locally so review is deterministic and offline. Framework-specific spellings were noted as out of scope for this plain HTML/CSS/TS project. `whenToUse` and `metadata` frontmatter keys were added, and the output-format examples were localised to this repository's file names.

---

## MIT License (web-interface-guidelines)

```text
MIT License

Copyright (c) 2025 Vercel Labs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Original skills

`frontend-design` and `vanilla-web-standards` were written for this project and carry no third-party license.
