import { strict as assert } from "node:assert";
import { createManifest, inspectLive, paths, digest, origin } from "./publication-fidelity.mjs";
const fixture = new Map(paths.map(([source, urlPath], i) => [source, Buffer.from(`fixture:${urlPath}:${i}`)]));
const manifest = await createManifest("fixture", async source => {
  const key = source.slice("fixture/".length);
  if (!fixture.has(key)) throw Error("unknown fixture " + key);
  return fixture.get(key);
});
assert.equal(manifest.files.length, 8);
const mock = (mutate = null, breakPath = null) => async url => {
  const item = paths.find(x => origin + x[1] === url);
  if (url === breakPath) return { status: 500, url, arrayBuffer: async () => new ArrayBuffer(0) };
  let bytes = fixture.get(item[0]);
  if (url === mutate) bytes = Buffer.concat([bytes, Buffer.from("TAMPERED")]);
  return { status: 200, url, arrayBuffer: async () => bytes };
};
const good = await inspectLive(manifest, mock());
assert(good.results.every(x => x.status === "MATCH"));
const modified = await inspectLive(manifest, mock(origin + "/"));
assert.equal(modified.results[0].status, "MISMATCH");
assert(modified.results.slice(1).every(x => x.status === "MATCH"));
const broken = await inspectLive(manifest, mock(null, origin + "/robots.txt"));
assert.equal(broken.results[1].status, "ERROR");
assert.equal(broken.results[1].attempts, 3);
let calls = 0;
const flaky = async (url, options) => {
  if (url === origin + "/") {
    calls++;
    if (calls < 3) return { status: 503, url };
  }
  return mock()(url, options);
};
const recovered = await inspectLive(manifest, flaky, async () => {});
assert.equal(recovered.results[0].status, "MATCH");
assert.equal(recovered.results[0].attempts, 3);
assert.equal(calls, 3);
let tamperedCalls = 0;
const tamperFetch = async (url, options) => {
  if (url === origin + "/") tamperedCalls++;
  return mock(origin + "/")(url, options);
};
const tamperReport = await inspectLive(manifest, tamperFetch, async () => {});
assert.equal(tamperReport.results[0].status, "MISMATCH");
assert.equal(tamperReport.results[0].attempts, 1);
assert.equal(tamperedCalls, 1);
let redirects = 0;
const redirectFetch = async (url, options) => {
  if (url === origin + "/") { redirects++; return { status: 301, url }; }
  return mock()(url, options);
};
const redirectReport = await inspectLive(manifest, redirectFetch, async () => {});
assert.equal(redirectReport.results[0].status, "ERROR");
assert.equal(redirectReport.results[0].attempts, 1);
assert.equal(redirects, 1);
await assert.rejects(inspectLive({}), /invalid manifest/);
assert.equal(digest(Buffer.from("x")).length, 64);
console.log("GC-ZT-11 fixture tests: matches, tampering, persistent failure, transient 503 recovery, redirect rejection PASS.");
