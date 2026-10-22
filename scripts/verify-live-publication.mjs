import { writeFile } from "node:fs/promises";
const origin = "https://governancecommons.org";
const schemaRoot = "/agent-dossier/v/1.0.2/schemas/";
const schemas = [
  "agent-dossier-instance.schema.json",
  "agent-dossier.schema.json",
  "handoff-envelope.schema.json",
  "pass-changelog-entry.schema.json",
  "runtime-contract.schema.json",
];
const results = [];
const timestamp = new Date().toISOString();
async function check(label, pathname, verify) {
  const url = origin + pathname;
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(20000), headers: { "user-agent": "GovernanceCommons-Website-Verification/1.0" } });
    if (response.status !== 200) throw Error("HTTP " + response.status);
    if (response.url !== url) throw Error("redirected to " + response.url);
    const body = await response.text();
    await verify(body, response);
    results.push({ label, url, outcome: "PASS", detail: "HTTP 200; canonical URL; content verified" });
  } catch (error) {
    results.push({ label, url, outcome: "FAIL", detail: String(error.message || error) });
  }
}
await check("Homepage", "/", (body) => {
  if (!/<title>[^<]*Governance Commons/i.test(body)) throw Error("homepage title not found");
  if (!body.includes('rel="canonical" href="' + origin + '/"')) throw Error("canonical homepage link not found");
});
await check("Robots", "/robots.txt", (body) => {
  if (!body.includes("Sitemap: " + origin + "/sitemap.xml")) throw Error("canonical sitemap directive missing");
});
await check("Sitemap", "/sitemap.xml", (body) => {
  if (!body.includes("<urlset") || !body.includes("<loc>" + origin + "/</loc>")) throw Error("canonical homepage missing from sitemap");
  if (body.includes("<loc>" + origin + "/404</loc>")) throw Error("404 page included in sitemap");
});
for (const name of schemas) {
  const path = schemaRoot + name;
  await check("Schema " + name, path, (body) => {
    const document = JSON.parse(body);
    if (document.$id !== origin + path) throw Error("schema $id mismatch: " + String(document.$id));
  });
}
const succeeded = results.filter((r) => r.outcome === "PASS").length;
const report = {
  checked_at_utc: timestamp,
  target: origin,
  successful: succeeded,
  total: results.length,
  checks: results,
  notes: "Public HTTP fetch confirms transport and response content, not GitHub Pages ownership or RFC-0001 G-1 closure by itself. Review GitHub Pages custom-domain configuration and DNS records separately."
};
await writeFile("live-publication-report.json", JSON.stringify(report, null, 2) + "\n");
const lines = [
  "## Live website verification",
  "",
  "Checked (UTC): " + timestamp,
  "",
  "| Check | Result | Evidence |",
  "| --- | --- | --- |",
  ...results.map((r) => "| " + r.label + " | " + r.outcome + " | " + r.detail.replaceAll("|", "\\|").replaceAll("\n", " ") + " |"),
  "",
  succeeded + "/" + results.length + " URL/content checks passed.",
  "",
  "**Scope limit:** No independent verification of GitHub Pages settings, authoritative DNS configuration, browser accessibility, or full RFC-0001 G-1 activation."
];
const summary = lines.join("\n") + "\n";
if (process.env.GITHUB_STEP_SUMMARY) {
  const { appendFile } = await import("node:fs/promises");
  await appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
}
console.log(summary);
if (succeeded !== results.length) process.exitCode = 1;
