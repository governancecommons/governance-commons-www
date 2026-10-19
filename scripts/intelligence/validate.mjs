import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

export const channels = new Set(["daily", "perspectives", "weekly", "standards"]);
export const states = new Set(["draft", "needs_revision", "approved"]);
const validDate = (s) => typeof s === "string" && !Number.isNaN(Date.parse(s));
const fail = (message) => { throw new Error(message); };

export function validateArticle(article, { publication = false } = {}) {
  if (!article || typeof article !== "object") fail("Article must be an object");
  for (const key of ["id", "title", "summary", "body", "author"]) {
    if (typeof article[key] !== "string" || !article[key].trim()) fail("Missing " + key);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.id)) fail("Invalid article id");
  if (!channels.has(article.channel)) fail("Invalid channel");
  if (!states.has(article.status)) fail("Invalid status");
  if (!validDate(article.created_at)) fail("Invalid created_at");
  if (!Array.isArray(article.sources) || !article.sources.length) fail("Sources required");
  const sources = new Map();
  for (const s of article.sources) {
    if (!s || typeof s.id !== "string" || sources.has(s.id)) fail("Duplicate or missing source id");
    const url = (() => { try { return new URL(s.url); } catch { return null; } })();
    if (!url || url.protocol !== "https:") fail("Source requires HTTPS URL");
    if (!s.title || !s.publisher || !validDate(s.accessed_at)) fail("Incomplete source metadata");
    if (!["pending", "verified", "failed"].includes(s.verification_status)) fail("Invalid source verification status");
    sources.set(s.id, s);
  }
  if (!Array.isArray(article.claims) || !article.claims.length) fail("Claims required");
  const ids = new Set();
  for (const c of article.claims) {
    if (!c || !c.id || ids.has(c.id) || !c.text) fail("Invalid or duplicate claim");
    ids.add(c.id);
    if (!Array.isArray(c.source_ids) || !c.source_ids.length) fail("Claim has no sources");
    if (!c.source_ids.every((id) => sources.has(id))) fail("Claim cites unknown source");
    if (!["pending", "supported", "disputed", "unsupported"].includes(c.verification_status)) fail("Invalid claim verification status");
    if (c.verification_status === "supported" && (!c.evidence_excerpt || !c.verified_by || !validDate(c.verified_at))) fail("Supported claim missing verification evidence");
  }
  if (publication) {
    if (article.status !== "approved") fail("Article is not approved");
    if (!article.approval || !article.approval.human_reviewer || !validDate(article.approval.approved_at)) fail("Human approval record required");
    if (!article.sources.every((s) => s.verification_status === "verified" && s.verified_by && validDate(s.verified_at))) fail("Unverified source");
    if (!article.claims.every((c) => c.verification_status === "supported")) fail("Unverified claim");
    if (!article.ai_assistance || typeof article.ai_assistance !== "string") fail("AI assistance disclosure required");
    if (!validDate(article.published_at)) fail("Publication timestamp required");
  }
  return true;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const publish = process.argv.includes("--publish");
  const paths = process.argv.slice(2).filter((x) => x !== "--publish");
  if (!paths.length) fail("Provide article JSON file paths");
  for (const p of paths) {
    const article = JSON.parse(await readFile(p, "utf8"));
    validateArticle(article, { publication: publish });
    console.log("Validated " + p);
  }
}
