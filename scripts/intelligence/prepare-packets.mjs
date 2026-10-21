import { readFile, mkdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const slug = (value) => value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 72);
export function preparePackets(research, { now = new Date().toISOString() } = {}) {
  if (!research || !Array.isArray(research.candidates)) throw new Error("Research candidates required");
  const packets = [];
  const seen = new Set();
  for (const candidate of research.candidates) {
    if (candidate.status !== "unverified_candidate") continue;
    let url;
    try { url = new URL(candidate.url); } catch { continue; }
    if (url.protocol !== "https:" || !candidate.title || !candidate.publisher) continue;
    const id = slug(candidate.title) || "untitled";
    const key = url.href;
    if (seen.has(key)) continue;
    seen.add(key);
    packets.push({
      id: id + "-" + packets.length,
      headline: candidate.title,
      source: { url: url.href, publisher: candidate.publisher, feed_id: candidate.feed_id, published_at: candidate.published_at ?? null },
      collected_at: now,
      evidence_status: "not_checked",
      factual_claims: [],
      editorial_interpretation: "",
      reviewer_notes: "",
      editorial_status: "research_only",
      publication_authorized: false
    });
  }
  return { generated_at: now, status: "review_required", warning: "Feed headlines are unverified. These packets are NOT articles, source verification, or publication approval.", packets };
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const input = JSON.parse(await readFile("research/intelligence/candidates.json", "utf8"));
  const result = preparePackets(input);
  await mkdir("research/intelligence", { recursive: true });
  await writeFile("research/intelligence/review-packets.json", JSON.stringify(result, null, 2) + "\n");
  console.log("Prepared " + result.packets.length + " unverified review packets");
}
