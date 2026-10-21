import test from "node:test";
import assert from "node:assert/strict";
import { preparePackets } from "./prepare-packets.mjs";

test("candidate packets cannot be mistaken for approved articles", () => {
  const input = { candidates: [{ title: "Agent incident", url: "https://example.org/a", publisher: "Example", feed_id: "example", status: "unverified_candidate" }] };
  const result = preparePackets(input, { now: "2026-10-21T09:00:00Z" });
  assert.equal(result.status, "review_required");
  assert.equal(result.packets.length, 1);
  assert.equal(result.packets[0].publication_authorized, false);
  assert.equal(result.packets[0].evidence_status, "not_checked");
  assert.deepEqual(result.packets[0].factual_claims, []);
});
test("reject non-HTTPS and noncandidate feed entries", () => {
  const input = { candidates: [
    { title: "Bad", url: "http://example.org/a", publisher: "Example", status: "unverified_candidate" },
    { title: "Approved", url: "https://example.org/b", publisher: "Example", status: "approved" }
  ] };
  assert.equal(preparePackets(input).packets.length, 0);
});
test("deduplicate identical URLs", () => {
  const c = { title: "One", url: "https://example.org/a", publisher: "Example", status: "unverified_candidate" };
  assert.equal(preparePackets({ candidates: [c, c] }).packets.length, 1);
});
