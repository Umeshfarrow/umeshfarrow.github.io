---
description: Build the production bundle into dist/ and list the output.
agent: pages
---

Run `npm run build` from the repo root. Then list the contents of `dist/`
and read `dist/index.html` to confirm it references `/assets/index-*.js`
(a compiled bundle), not `/src/main.jsx`.

Report:
1. Build result (pass/fail).
2. dist/index.html script tag.
3. Any `[UNRESOLVED_IMPORT]` errors (check component CSS import casing:
   e.g. `./Intro.css` matches the real file, never `./intro.css`).

If the build fails, fix the cause, then rebuild and confirm it passes.