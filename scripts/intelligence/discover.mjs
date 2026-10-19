import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

export const feeds = [
  { id: "nist-ai", publisher: "NIST", url: "https://www.nist.gov/news-events/news/rss.xml" },
  { id: "oecd-ai", publisher: "OECD", url: "https://www.oecd.org/en/about/news/rss.xml" },
  { id: "arxiv-ai", publisher: "arXiv", url: "https://export.arxiv.org/rss/cs.AI" },
];
const decode = (s) => s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const tag = (xml, name) => decode(xml.match(new RegExp("<" + name + "(?:\\s[^>]*)?>([\\s\\S]*?)<\\/" + name + ">", "i"))?.[1]?.trim() ?? "");
export function parseFeed(xml, feed) {
  const blocks = [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].map((m) => m[1]);
  if (!blocks.length) throw new Error("No RSS items found");
  return blocks.slice(0, 25).flatMap((item) => {
    const title = tag(item, "title"), link = tag(item, "link"), published = tag(item, "pubDate");
    try {
      const u = new URL(link);
      if (u.protocol !== "https:" || !title) return [];
      return [{ title, url: u.href, publisher: feed.publisher, published_at: published || null, feed_id: feed.id, status: "unverified_candidate" }];
    } catch { return []; }
  });
}
export async function discover({ sources = feeds, fetcher = fetch } = {}) {
  const results = await Promise.all(sources.map(async (source) => {
    try {
      const response = await fetcher(source.url, { signal: AbortSignal.timeout(12000), headers: { "User-Agent": "GovernanceCommonsIntelligence/0.1 (+https://governancecommons.org)" } });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const xml = await response.text();
      if (xml.length > 2_000_000) throw new Error("Feed too large");
      return { source: source.id, candidates: parseFeed(xml, source), error: null };
    } catch (error) { return { source: source.id, candidates: [], error: String(error.message ?? error) }; }
  }));
  const unique = new Map();
  for (const r of results) for (const c of r.candidates) unique.set(c.url, c);
  return { generated_at: new Date().toISOString(), editorial_status: "research_only", candidates: [...unique.values()], feed_results: results.map(({ source, error, candidates }) => ({ source, error, count: candidates.length })) };
}
if (process.argv[1] && import.meta.url === new URL("file://" + fileURLToPath(import.meta.url)).href) {
  // Entry point comparison below is deliberately not used: execute via main module detection.
}
const invoked = process.argv[1] && fileURLToPath(import.meta.url) === (await import("node:path")).resolve(process.argv[1]);
if (invoked) {
  const result = await discover();
  await mkdir("research/intelligence", { recursive: true });
  await writeFile("research/intelligence/candidates.json", JSON.stringify(result, null, 2) + "\n");
  console.log(JSON.stringify({ candidates: result.candidates.length, feeds: result.feed_results }, null, 2));
  if (result.feed_results.every((r) => r.error)) process.exitCode = 1;
}
