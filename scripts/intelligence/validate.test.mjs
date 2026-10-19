import test from "node:test";
import assert from "node:assert/strict";
import { validateArticle } from "./validate.mjs";

const sample = () => ({
  id: "example-article", title: "Example", summary: "Summary", body: "Body", author: "GC Editorial",
  channel: "daily", status: "draft", created_at: "2026-10-19T00:00:00Z",
  sources: [{ id: "s1", url: "https://example.org/report", title: "Report", publisher: "Example", accessed_at: "2026-10-19T00:00:00Z", verification_status: "pending" }],
  claims: [{ id: "c1", text: "A test claim", source_ids: ["s1"], verification_status: "pending" }]
});
test("valid draft passes but cannot publish", () => {
  assert.equal(validateArticle(sample()), true);
  assert.throws(() => validateArticle(sample(), { publication: true }), /not approved/);
});
test("missing source mapping blocks draft", () => {
  const a = sample(); a.claims[0].source_ids = ["missing"];
  assert.throws(() => validateArticle(a), /unknown source/);
});
test("approved label alone cannot bypass verification", () => {
  const a = sample(); a.status = "approved"; a.approval = { human_reviewer: "editor", approved_at: "2026-10-19T00:00:00Z" }; a.published_at = "2026-10-19T00:00:00Z"; a.ai_assistance = "AI-assisted";
  assert.throws(() => validateArticle(a, { publication: true }), /Unverified source/);
});
test("verified evidence and human approval pass", () => {
  const a = sample(); a.status = "approved"; a.approval = { human_reviewer: "editor", approved_at: "2026-10-19T00:00:00Z" }; a.published_at = "2026-10-19T00:00:00Z"; a.ai_assistance = "AI-assisted";
  a.sources[0].verification_status = "verified"; a.sources[0].verified_by = "editor"; a.sources[0].verified_at = "2026-10-19T00:00:00Z";
  a.claims[0].verification_status = "supported"; a.claims[0].evidence_excerpt = "Supporting text"; a.claims[0].verified_by = "editor"; a.claims[0].verified_at = "2026-10-19T00:00:00Z";
  assert.equal(validateArticle(a, { publication: true }), true);
});
