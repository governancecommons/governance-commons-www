import { createHash } from "node:crypto";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export const origin = "https://governancecommons.org";
export const paths = Object.freeze([
  ["index.html", "/"],
  ["robots.txt", "/robots.txt"],
  ["sitemap.xml", "/sitemap.xml"],
  ...["agent-dossier-instance.schema.json", "agent-dossier.schema.json", "handoff-envelope.schema.json", "pass-changelog-entry.schema.json", "runtime-contract.schema.json"].map(name => [`agent-dossier/v/1.0.2/schemas/${name}`, `/agent-dossier/v/1.0.2/schemas/${name}`]),
]);
export const digest = bytes => createHash("sha256").update(bytes).digest("hex");

export async function createManifest(root = "dist", read = readFile) {
  const files = [];
  for (const [source, urlPath] of paths) {
    const bytes = await read(path.join(root, source));
    files.push({ source, path: urlPath, bytes: bytes.length, sha256: digest(bytes) });
  }
  return { schema_version: 1, purpose: "build-to-live deployment fidelity ONLY; not human authorization", files };
}
const transientStatuses = new Set([429, 500, 502, 503, 504]);
export async function inspectLive(manifest, fetcher = fetch, wait = ms => new Promise(resolve => setTimeout(resolve, ms))) {
  if (manifest?.schema_version !== 1 || !Array.isArray(manifest.files) || manifest.files.length !== paths.length) throw Error("invalid manifest");
  const expected = new Map(paths.map(([source, urlPath]) => [urlPath, source]));
  const results = [];
  for (const item of manifest.files) {
    if (expected.get(item.path) !== item.source || !/^[0-9a-f]{64}$/.test(item.sha256) || !Number.isSafeInteger(item.bytes)) throw Error("unsafe or malformed manifest item");
    const url = origin + item.path;
    let result;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await fetcher(url, { redirect: "manual", signal: AbortSignal.timeout(20000), headers: { "user-agent": "GC-Publication-Fidelity/1.0" } });
        if (response.status !== 200 || response.url !== url) {
          if (transientStatuses.has(response.status) && response.url === url && attempt < 3) {
            await wait(500 * attempt);
            continue;
          }
          throw Error(`unexpected HTTP ${response.status} or redirect: ${response.url}`);
        }
        const bytes = Buffer.from(await response.arrayBuffer());
        const actual = digest(bytes);
        result = { path: item.path, status: actual === item.sha256 && bytes.length === item.bytes ? "MATCH" : "MISMATCH", attempts: attempt, expected_sha256: item.sha256, observed_sha256: actual, expected_bytes: item.bytes, observed_bytes: bytes.length };
        break; // Actual content mismatches are never retried or masked.
      } catch (error) {
        // Network failures may be intermittent. Redirects and non-transient HTTP failures are not retried.
        const message = String(error.message || error);
        const retryable = !(message.startsWith("unexpected HTTP"));
        if (retryable && attempt < 3) {
          await wait(500 * attempt);
          continue;
        }
        result = { path: item.path, status: "ERROR", attempts: attempt, error: message };
        break;
      }
    }
    results.push(result);
  }
  return { checked_at_utc: new Date().toISOString(), target: origin, purpose: "deployment fidelity; not provenance or human approval", results };
}
const action = process.argv[2];
if (action === "generate") {
  const output = process.argv[3] || "fidelity-evidence/build-manifest.json";
  const manifest = await createManifest();
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`Generated ${manifest.files.length}-file build fidelity manifest: ${output}`);
} else if (action === "verify") {
  const input = process.argv[3] || "fidelity-evidence/build-manifest.json";
  const output = process.argv[4] || "fidelity-evidence/live-comparison.json";
  const manifest = JSON.parse(await readFile(input, "utf8"));
  const report = await inspectLive(manifest);
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, JSON.stringify(report, null, 2) + "\n");
  for (const item of report.results) console.log(`${item.path}: ${item.status} (attempts: ${item.attempts})${item.error ? " (" + item.error + ")" : ""}`);
  const matches = report.results.filter(x => x.status === "MATCH").length;
  const message = `Build-to-live byte fidelity: ${matches}/${report.results.length} exact matches. Observational only; this is not a human approval or a production gate.\n`;
  console.log(message);
  if (process.env.GITHUB_STEP_SUMMARY) {
    const { appendFile } = await import("node:fs/promises");
    await appendFile(process.env.GITHUB_STEP_SUMMARY, "\n## Publication fidelity (observational)\n\n" + message + "\n");
  }
  // Observe during rollout; do not make an unproven byte-equality assumption a production outage.
} else if (action !== undefined) {
  throw Error("Usage: node scripts/publication-fidelity.mjs generate|verify [paths]");
}
