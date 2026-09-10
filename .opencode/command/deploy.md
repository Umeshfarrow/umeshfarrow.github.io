---
description: Build the site, commit changes, push to new-era-2026, and trigger the GitHub Pages deploy.
agent: pages
---

Deploy the portfolio to GitHub Pages (https://umeshfarrow.github.io).

Steps:

1. Verify the build passes: `npm run build`. Fix failures first (watch for
   case-sensitive CSS imports on Linux/CI).
2. Run `npm run lint` and resolve errors (warnings ok).
3. Check `git status` — never commit `dist/` (gitignored), `.opencode/`
   local state (db files, node_modules), or secrets.
4. Stage source changes and commit with a clear message.
5. Push to `new-era-2026` (Pages deploys on push to this branch via
   `.github/workflows/deploy.yml`). Optionally trigger manually with the
   `workflow_dispatch` event.
6. Verify the live site: fetch https://umeshfarrow.github.io/ and confirm
   the HTML references `/assets/index-*.js`, not `/src/main.jsx`. Also check
   the latest workflow run succeeded (Actions API).
7. Report: commit SHA, workflow run status, live URL check result.

Prerequisite: GitHub Pages build type must be `workflow` (Set in
Settings → Pages → Source → GitHub Actions).