import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist");
const origin = "https://governancecommons.org";
const errors = [];
const index = new Map();

async function walk(directory) {
  const found = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...await walk(full));
    else if (entry.isFile() && entry.name.endsWith(".html")) found.push(full);
  }
  return found;
}

async function existsFile(relative) {
  const full = path.resolve(root, relative);
  if (full !== root && !full.startsWith(root + path.sep)) return false;
  try { return (await stat(full)).isFile(); } catch { return false; }
}

function attrs(html, attr) {
  const pattern = new RegExp("\\b" + attr + "\\s*=\\s*([\\\"'])(.*?)\\1", "gis");
  return [...html.matchAll(pattern)].map((match) => match[2]);
}

function decodeHtml(value) {
  return value.replace(/&amp;/gi, "&").replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'");
}

function routeForFile(relative) {
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) return "/" + relative.slice(0, -"index.html".length);
  return "/" + relative.replace(/\.html$/, "");
}

function outputCandidates(pathname) {
  const clean = decodeURIComponent(pathname).replace(/^\/+/, "");
  if (!clean) return ["index.html"];
  if (clean.endsWith("/")) return [clean + "index.html"];
  return [clean, clean + ".html", clean + "/index.html"];
}

const pages = await walk(root);
for (const full of pages) {
  const relative = path.relative(root, full).split(path.sep).join("/");
  const html = await readFile(full, "utf8");
  const ids = new Set([...attrs(html, "id"), ...attrs(html, "name")].map(decodeHtml));
  index.set(relative, { html, ids, route: routeForFile(relative) });
}

let inspected = 0;
for (const [relative, page] of index) {
  const base = new URL(page.route, origin);
  for (const rawHref of attrs(page.html, "href")) {
    const href = decodeHtml(rawHref).trim();
    if (!href || href.startsWith("//") || /^(mailto:|tel:|data:)/i.test(href)) continue;
    if (/^javascript:/i.test(href)) {
      errors.push(relative + ": prohibited javascript: navigation");
      continue;
    }
    let target;
    try { target = new URL(href, base); }
    catch { errors.push(relative + ": invalid href " + href); continue; }
    if (target.origin !== origin) continue;
    if (target.search) continue; // Search/filter parameters do not change the static route.
    inspected++;
    let located = null;
    try {
      for (const candidate of outputCandidates(target.pathname)) {
        if (await existsFile(candidate)) { located = candidate; break; }
      }
    } catch { errors.push(relative + ": invalid encoded path " + href); continue; }
    if (!located) {
      errors.push(relative + ": missing destination " + href);
      continue;
    }
    if (target.hash && index.has(located)) {
      let fragment;
      try { fragment = decodeURIComponent(target.hash.slice(1)); }
      catch { errors.push(relative + ": invalid fragment " + href); continue; }
      if (fragment && !index.get(located).ids.has(fragment)) {
        errors.push(relative + ": missing section #" + fragment + " at " + located);
      }
    }
  }
}

if (errors.length) {
  console.error("Internal navigation audit found " + errors.length + " problem(s):");
  for (const problem of errors) console.error(" - " + problem);
  process.exitCode = 1;
} else {
  console.log("Internal navigation verified: " + pages.length + " HTML files, " + inspected + " local links.");
}
