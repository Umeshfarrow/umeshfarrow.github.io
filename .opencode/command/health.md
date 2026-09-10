---
description: Check the health of the repo, the local build, and the live GitHub Pages site.
---

Check project health and report a compact status summary:

1. Git: current branch (`git branch --show-current`), short SHA
   (`git rev-parse --short HEAD`), and `git status` (uncommitted files).
2. Locale: whether `node_modules/` exists and `npm run lint` passes.
3. Build: whether `dist/` exists and how old it is (minutes since file mtime).
4. Live site: fetch https://umeshfarrow.github.io/ and report whether it
   serves `/assets/index-*.js` (healthy) or `/src/main.jsx` (raw source —
   deploy problem).
5. CI: if possible, check the latest workflow run conclusion via the GitHub
   Actions API for Umeshfarrow/umeshfarrow.github.io.

Present results as a bulleted status report. Flag anything that looks
broken and suggest the next action.