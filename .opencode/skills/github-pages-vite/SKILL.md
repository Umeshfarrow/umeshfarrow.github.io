---
name: github-pages-vite
description: Use when building or deploying this Vite portfolio to GitHub Pages, checking the live site, or debugging why the site shows raw source. Covers the Actions workflow, base path, dist artifact, and post-deploy verification.
---

# Deploying the portfolio to GitHub Pages

The portfolio is a Vite + React app deployed to
<https://umeshfarrow.github.io> (a GitHub Pages **user site**).

## How deployment works

`.github/workflows/deploy.yml` runs on push to `new-era-2026` (and on
`workflow_dispatch`). Pipeline:

1. `npm ci`
2. `npm run build` → `dist/`
3. `actions/upload-pages-artifact@v3` uploads `dist/`
4. `actions/deploy-pages@v4` publishes it

Requirements:

- GitHub Pages **build type must be `workflow`** (Settings → Pages →
  Source → GitHub Actions). Verified via:
  `GET /repos/Umeshfarrow/umeshfarrow.github.io/pages` → `build_type: workflow`.
- `vite.config.js` sets `base: "/"` — do not change (user site, root-absolute).
- `dist/` is gitignored; CI builds it. Never commit `dist/`.

## Post-deploy verification

Fetch the live site and confirm the HTML references a compiled bundle:

```
curl -s https://umeshfarrow.github.io/ | grep -o 'assets/index-[^"]*'
```

- `assets/index-*.js` → built bundle, healthy.
- `/src/main.jsx` → raw source is being served; the deploy did not take
  effect. Check: Pages build type = `workflow`, the latest workflow run
  succeeded, and the `deploy` job uploaded after the last source change.

## Common failure modes

| Symptom | Cause | Fix |
| --- | --- | --- |
| Site shows `src/main.jsx` | Pages still branch-managed, or deploy didn't run | Set build type to `workflow`; re-run the workflow |
| `[UNRESOLVED_IMPORT]` on Linux build | Case-mismatched CSS import (e.g. `./intro.css` vs `Intro.css`) | Match import casing to the real filename |
| dist missing assets | `base` changed or wrong path | Restore `base: "/"` in vite.config.js |
| `npm ci` fails in CI | package-lock.json out of sync | Run `npm install` and commit the lockfile |

## Local preview

```
npm run build && npm run preview
```

Then open the printed localhost URL to inspect the production bundle before
pushing.