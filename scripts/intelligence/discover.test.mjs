import test from "node:test";
import assert from "node:assert/strict";
import { parseFeed, discover } from "./discover.mjs";
const feed = { id: "test", publisher: "Test", url: "https://example.org/rss" };
const xml = '<rss><channel><item><title>Governance &amp; safety</title><link>https://example.org/news</link><pubDate>Mon, 19 Oct 2026 10:00:00 GMT</pubDate></item></channel></rss>';
test("RSS candidates are explicitly unverified", () => {
  const [item] = parseFeed(xml, feed);
  assert.equal(item.title, "Governance & safety");
  assert.equal(item.status, "unverified_candidate");
});
test("feed failures are recorded, not invented", async () => {
  const result = await discover({ sources: [feed], fetcher: async () => { throw Error("offline"); } });
  assert.equal(result.candidates.length, 0);
  assert.match(result.feed_results[0].error, /offline/);
});
test("duplicate URLs are deduplicated", async () => {
  const result = await discover({ sources: [feed, { ...feed, id: "test2" }], fetcher: async () => ({ ok: true, text: async () => xml }) });
  assert.equal(result.candidates.length, 1);
});
