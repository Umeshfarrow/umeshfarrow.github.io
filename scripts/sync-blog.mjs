/**
 * blog:sync — fetch blog posts from a public GitHub repo into
 * src/generated/blog-posts.json so they get inlined into the Vite bundle.
 *
 * Config: blog.config.json at the repo root.
 *
 *   {
 *     "owner": "Umeshfarrow",
 *     "repo": "<content repo>",      // leave "" to publish an empty blog
 *     "postsDir": "posts",           // folder holding *.md posts
 *     "outputFile": "src/generated/blog-posts.json"
 *   }
 *
 * Post format (frontmatter at the top of each .md file):
 *
 *   ---
 *   title: "Some title"
 *   date: "2026-08-01"
 *   tags: ["terraform", "aws"]
 *   description: "One or two sentences shown in the post list."
 *   repo: "https://github.com/Umeshfarrow/xyz"   # optional → links the implementation
 *   ---
 *   ... markdown body ...
 *
 * Uses the GitHub REST API (not a git clone) so it stays cheap even for
 * huge repos, and authenticates with GITHUB_TOKEN (when present) to avoid
 * anonymous rate limiting on Actions runners.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG_PATH = resolve(ROOT, "blog.config.json");
const DEFAULT_OUTPUT = resolve(ROOT, "src/generated/blog-posts.json");

const API = "https://api.github.com";
const TOKEN = process.env.GITHUB_TOKEN || "";

function fail(message) {
  console.error(`[blog:sync] ERROR: ${message}`);
  process.exit(1);
}

async function gh(path) {
  const headers = { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

  const res = await fetch(`${API}${path}`, { headers });
  if (res.status === 404) return null;
  if (!res.ok) {
    const detail = (await res.text()).slice(0, 200);
    throw new Error(`GET ${path} -> ${res.status}: ${detail}`);
  }
  return res.json();
}

async function ghRaw(path) {
  const headers = { Accept: "application/vnd.github.raw+json", "X-GitHub-Api-Version": "2022-11-28" };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

  const res = await fetch(`${API}${path}`, { headers });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GET RAW ${path} -> ${res.status}`);
  return res.text();
}

/** Pull key: value lines out of a frontmatter block. */
function parseFrontmatter(raw) {
  const match = raw.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return null;

  const block = match[1];
  const fields = {};
  for (const line of block.split(/\r?\n/)) {
    const sep = line.indexOf(":");
    if (sep < 0) continue;
    const key = line.slice(0, sep).trim();
    let value = line.slice(sep + 1).trim();

    // Strip surrounding quotes.
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Comma-separated list.
    if (value.startsWith("[")) {
      fields[key] = value
        .slice(1, value.lastIndexOf("]")).trim()
        .split(",").map((t) => t.replace(/^["']|["']$/g, "").trim())
        .filter(Boolean);
    } else {
      fields[key] = value;
    }
  }

  return fields;
}

function stripMarkdown(md) {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function main() {
  const config = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
  const outputFile = resolve(ROOT, config.outputFile || DEFAULT_OUTPUT);

  if (!config.repo) {
    console.warn("[blog:sync] WARNING: blog.config.json has no repo set — publishing an empty blog.");
    writeFileSync(outputFile, JSON.stringify({ source: "", syncedAt: "", posts: [] }, null, 2));
    return;
  }

  const repoPath = `repos/${config.owner}/${config.repo}`;
  const postsDir = config.postsDir || "posts";

  let entries;
  try {
    entries = await gh(`/${repoPath}/contents/${postsDir}`);
  } catch (error) {
    fail(error.message);
  }

  if (!entries || !Array.isArray(entries)) {
    console.warn(`[blog:sync] WARNING: no "${postsDir}/" folder found in ${config.owner}/${config.repo} — publishing an empty blog.`);
    writeFileSync(outputFile, JSON.stringify({ source: `${config.owner}/${config.repo}`, syncedAt: "", posts: [] }, null, 2));
    return;
  }

  const files = entries.filter(
    (e) => e.type === "file" && e.name.endsWith(".md") && !/^README\.md$/i.test(e.name)
  );

  const posts = [];
  for (const file of files) {
    const raw = await ghRaw(`/${repoPath}/contents/${postsDir}/${encodeURIComponent(file.name)}`);
    if (!raw) {
      console.warn(`[blog:sync] skipped ${file.name} (unreadable)`);
      continue;
    }

    const fm = parseFrontmatter(raw);
    if (!fm || !fm.title || !fm.date) {
      console.warn(`[blog:sync] skipped ${file.name} — missing frontmatter (title/date required)`);
      continue;
    }

    const body = raw.replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
    const words = stripMarkdown(body).split(/\s+/).filter(Boolean).length;
    const tags = Array.isArray(fm.tags) ? fm.tags : String(fm.tags || "").split(",").map((t) => t.trim()).filter(Boolean);

    posts.push({
      slug: file.name.replace(/\.md$/i, ""),
      title: fm.title,
      date: fm.date,
      tags,
      description: fm.description || `${stripMarkdown(body).slice(0, 160)}…`,
      repo: fm.repo || "",
      readingMinutes: Math.max(1, Math.round(words / 220)),
      body,
    });
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  mkdirSync(dirname(outputFile), { recursive: true });
  writeFileSync(
    outputFile,
    JSON.stringify(
      {
        source: `${config.owner}/${config.repo}`,
        syncedAt: new Date().toISOString(),
        posts,
      },
      null,
      2
    )
  );

  console.log(`[blog:sync] ${posts.length} post(s) synced from ${config.owner}/${config.repo} → ${config.outputFile}`);
}

main().catch((error) => fail(error.message));