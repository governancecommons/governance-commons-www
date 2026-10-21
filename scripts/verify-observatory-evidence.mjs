import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const catalog = readFileSync("site/src/data/observatoryCatalog.ts", "utf8");
const page = readFileSync("site/src/pages/observatory.astro", "utf8");
const records = [...catalog.matchAll(/\{id:"([^"]+)",name:"([^"]+)",kind:"(models|agents|protocols)".*?sourceUrl:"([^"]+)".*?verifiedOn:(null|"[^"]+").*?status:"([^"]+)".*?evidence:"([^"]+)"/g)];
assert.ok(records.length >= 14, "Catalog records must not disappear");
assert.equal(new Set(records.map(r => r[1])).size, records.length, "Duplicate catalog identifiers");
for (const [, id, , , url, verified, status, evidence] of records) {
  assert.ok(url.startsWith("https://"), `Invalid source URL: ${id}`);
  assert.ok(["source-linked", "needs-review"].includes(status));
  assert.equal(evidence, "documentation-only", `Unapproved evidence promotion: ${id}`);
  assert.equal(verified, "null", `Independent verification needs review evidence: ${id}`);
}
const version = catalog.match(/export const catalogVersion = "([^"]+)"/)?.[1];
assert.ok(version, "Catalog version missing");
assert.ok(page.includes(`Catalog v${version}`), "Homepage version does not match catalog");
assert.ok(catalog.includes("export const sourceReviews: ObservatoryReview[] = [];"), "Source reviews require explicit publication gate");
console.log(`Evidence publication gate passed for ${records.length} catalog records at v${version}`);
