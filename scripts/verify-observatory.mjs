import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const data = readFileSync("site/src/data/observatoryCatalog.ts", "utf8");
const page = readFileSync("site/src/pages/observatory/[kind].astro", "utf8");
const home = readFileSync("site/src/pages/observatory.astro", "utf8");
const records = [...data.matchAll(/\{id:"([^"]+)",name:"([^"]+)",kind:"(models|agents|protocols)".*?sourceUrl:"([^"]+)".*?verifiedOn:(null|"[^"]+").*?status:"([^"]+)".*?evidence:"([^"]+)"/g)];
assert.ok(records.length >= 14, "Expected at least 14 catalog records");
const ids = new Set();
for (const [,id,name,kind,url,verified,status,evidence] of records) {
  assert.ok(!ids.has(id), `Duplicate record: ${id}`);
  ids.add(id);
  assert.ok(name.length > 0 && ["models","agents","protocols"].includes(kind));
  assert.ok(url.startsWith("https://"), `Non-HTTPS source: ${id}`);
  assert.ok(["source-linked","needs-review"].includes(status));
  assert.equal(evidence, "documentation-only");
  assert.equal(verified, "null", `Unsubstantiated independent verification: ${id}`);
}
for (const kind of ["models","agents","protocols"]) {
  assert.ok(records.some(r=>r[3]===kind), `No entries for ${kind}`);
  assert.ok(home.includes(`href="/observatory/${kind}"`), `Homepage link missing: ${kind}`);
}
for (const token of ['id="catalog-search"','id="catalog-status"','filterCatalog','latestSourceReview(entry.id)']) {
  assert.ok(page.includes(token), `Catalog UI missing: ${token}`);
}
console.log(`Observatory checks passed: ${records.length} records, unique IDs, source URLs, evidence labels, category navigation and filters.`);
