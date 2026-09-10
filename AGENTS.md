# AGENTS.md

Project conventions and operational details for AI agents working in this
repository. Read this file first.

## What this project is

A single-page portfolio for Umesh S (Senior DevOps Engineer). It is a
**React 19 + Vite 8** static site. There is no router and no backend —
the entire product is one scrolling page with scroll-snap sections
(Intro, Skills, Work, Projects, Blog, Contact).

Blog posts are **not** authored in this repo: they live as markdown in a
separate public GitHub repo (see "Blog" below) and are pulled into the
bundle at build time by `npm run blog:sync`.

Deployed to GitHub Pages at <https://umeshfarrow.github.io> from this
branch (`new-era-2026`).

## Repository layout

```
.
├── .github/workflows/deploy.yml   # Build, lint, audit & deploy to GitHub Pages (Actions)
├── .github/workflows/ci.yml       # Quality gates: lint, build, npm audit, CodeQL SAST
├── .opencode/                     # opencode project config (agents/commands/skills/plugin)
├── .oxlintrc.json                 # Lint config (oxlint)
├── AGENTS.md                      # This file
├── blog.config.json               # Blog content source repo + posts dir
├── index.html                     # Vite HTML entry (source of truth for dev)
├── opencode.json                  # opencode configuration
├── package.json                   # npm scripts + deps
├── public/                        # Static assets copied verbatim into the build
│   ├── favicon.svg
│   ├── icons.svg
│   ├── images/                    # portrait.jpg/png/webp
│   └── Umesh_S_Resume.pdf
├── scripts/
│   └── sync-blog.mjs              # Pull blog posts from the content repo (blog:sync)
├── src/
│   ├── components/
│   │   ├── Blog/                  # 0.4 Blog section (+ in-page reader overlay)
│   │   ├── Contact/               # 0.5 Contact section (phone/email/links/education)
│   │   ├── Header/                # Top nav (smooth-scrolls to section anchors)
│   │   ├── HoverFill/             # Reusable hover-fill UI wrapper
│   │   ├── Intro/                 # 0.0 Intro section (hero)
│   │   ├── Metrics/               # Metric cells inside Intro
│   │   ├── PageMeta/              # "number / label" meta header (uses TypingText)
│   │   ├── Projects/              # 0.3 Project log (Aicon/Enliven/Learning Cloud/Petzy)
│   │   ├── Skills/                # 0.1 Skills & certifications
│   │   ├── TypingText/            # Typewriter effect
│   │   └── Work/                  # 0.2 Experience log
│   ├── generated/
│   │   └── blog-posts.json        # Output of `npm run blog:sync` (committed, empty-only)
│   ├── styles/
│   │   ├── reset.css              # Global reset + cursor/focus/motion rules
│   │   └── variables.css          # Design tokens (colors, fonts, spacing)
│   ├── App.jsx                    # Section composition
│   └── main.jsx                   # React entry
└── vite.config.js
```

## Commands

All commands run from the repo root.

| Command           | Purpose                                        |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Start Vite dev server (host: true, polling)   |
| `npm run build`   | Production build → `dist/` (must pass)         |
| `npm run preview` | Serve the built `dist/` locally                |
| `npm run lint`    | Run oxlint (warnings ok, errors not ok)        |
| `npm run blog:sync` | Pull posts from the blog content repo → `src/generated/blog-posts.json` |

- Do **not** commit `dist/` (it is gitignored; CI builds it).
- `npm ci` must succeed for CI — keep `package-lock.json` in sync with
  `package.json`.
- AppSec/code-quality CI (`.github/workflows/ci.yml`) runs oxlint, the
  production build, `npm audit --omit=dev` and CodeQL SAST
  (`security-and-quality`) on every push/PR to `new-era-2026`. The deploy
  pipeline also runs lint + the same npm audit before publishing.

## Blog (content synced from a GitHub repo)

Blog posts are plain markdown files living in a **separate public GitHub
repo** (the "content repo"), read via the GitHub REST API by
`scripts/sync-blog.mjs` during CI and inlined into the bundle
(`src/generated/blog-posts.json` → rendered client-side with `marked`).

- Content repo + posts dir are configured in `blog.config.json`
  (`owner`, `repo`, `postsDir` — default `posts`).
- Post files need frontmatter at the top:
  ```
  ---
  title: "My post"
  date: "2026-08-01"
  tags: ["terraform", "aws"]
  description: "Shown in the post list."
  repo: "https://github.com/Umeshfarrow/xyz"   # optional → implementation link
  ---
  ```
- Files without `title`/`date` are skipped with a warning. Posts sort by
  `date` descending. `blog:sync` uses the workflow's `GITHUB_TOKEN`
  (rate-limit safe) and 404s/empty posts dirs publish an empty blog
  rather than failing the build.
- **Publishing flow (manual):** push a post to the content repo → run the
  `Deploy to GitHub Pages` workflow via `workflow_dispatch` (GitHub →
  Actions → Deploy → Run workflow). The deploy's Stage 1 syncs content
  before building. Pushing to `new-era-2026` also triggers the same sync.
- `src/generated/blog-posts.json` is committed as an **empty** placeholder
  so `npm run build` works locally without network access; CI overwrites it.

## Deployment (GitHub Pages)

- Live URL: <https://umeshfarrow.github.io>
- Source: **GitHub Actions** workflow — `.github/workflows/deploy.yml`
  triggers on push to `new-era-2026` (and via manual `workflow_dispatch`).
- Pipeline: `npm ci` → `npm run lint` → `npm audit --omit=dev` →
  `npm run blog:sync` → `npm run build` → upload `dist/` with
  `actions/upload-pages-artifact@v3` → `actions/deploy-pages@v4`.
- `vite.config.js` sets `base: "/"` (user site — served from root).
- Pages is a user site (`https://umeshfarrow.github.io`), so paths are
  absolute from root; do not change `base` unless the repo moves.
- **Verification after a deploy:** fetch `https://umeshfarrow.github.io/`
  and confirm the HTML references `/assets/index-*.js` (a built bundle).
  If it references `/src/main.jsx`, the raw source is being served and
  something is wrong with the deploy.

## Conventions

### CSS imports are case-sensitive (critical)

Linux/CI filesystems are case-sensitive. Component imports must match the
real filename exactly:

- `src/components/Intro/Intro.jsx` imports `./Intro.css` (capital I).
- Do not use lowercase guesses like `./intro.css` — the production build
  fails with `[UNRESOLVED_IMPORT]`.

### Styling

- Design tokens live in `src/styles/variables.css` (colors, fonts,
  `--page-padding`, `--header-height`).
  - Colors: `--color-bg: #f4f4f1`, `--color-text: #111`, `--color-blue:
    #2117ff`, `--color-orange: #FFA500`, `--color-border: #111`.
  - Fonts are self-hosted mono families (Geist, Kode, Sometype, B612) —
    also imported via Google Fonts in `variables.css`.
- Components use a `block__element`-style naming (e.g., `work__header`,
  `metrics__value`). Reuse existing classes; avoid reshuffling layout
  structure without reason.
- Global cursor is `crosshair` (set in `reset.css`) — deliberate design.

### React

- No TypeScript; plain `.jsx` function components.
- Hooks rules enforced by oxlint (`react/rules-of-hooks` = error).
- Watch the `eslint(no-unused-vars)` warning (react/only-export-components)
  — keep imports clean.

## Workflow for agents

1. Read `AGENTS.md`, `package.json`, and `vite.config.js` before editing.
2. Make small, incremental edits; run `npm run lint` and `npm run build`
   after any change to `src/` or config.
3. Never commit build output or local state (see `.gitignore`).
4. After deployment-affecting changes, verify the live site as described
   under Deployment.

## Secrets / credentials

- No secrets in this repo. Pushing to `origin` uses a credential store on
  the dev machine; never print or commit tokens.