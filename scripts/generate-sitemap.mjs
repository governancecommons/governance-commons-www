import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist");
const origin = "https://governancecommons.org";
async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const location = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(location));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(location);
  }
  return files;
}

const pages = (await walk(root)).filter((file) => path.relative(root, file).split(path.sep).join("/") !== "404.html");
const urls = new Set();
for (const page of pages) {
  const relative = path.relative(root, page).split(path.sep).join("/");
  const pathname = relative === "index.html"
    ? "/"
    : "/" + relative.replace(/\/index\.html$/, "").replace(/\.html$/, "");
  const html = await readFile(page, "utf8");
  // The canonical tag is defined by the shared Astro layout and must match each indexed page.
  const escaped = pathname.split("/").map(encodeURIComponent).join("/");
  const url = new URL(escaped, origin).href;
  if (!html.includes(`rel="canonical" href="${url}"`)) {
    throw new Error(`Canonical mismatch in ${relative}: expected ${url}`);
  }
  urls.add(url);
}
if (!urls.has(origin + "/")) throw new Error("Homepage missing from sitemap");
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...[...urls].sort().map((url) => `  <url><loc>${url.replace(/&/g, "&amp;")}</loc></url>`),
  '</urlset>',
  '',
].join("\n");
await writeFile(path.join(root, "sitemap.xml"), xml);
console.log(`Generated sitemap for ${urls.size} canonical HTML pages.`);
