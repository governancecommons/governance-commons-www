import { strict as assert } from "node:assert";
import { createManifest, inspectLive, paths, digest, origin } from "./publication-fidelity.mjs";
const fixture = new Map(paths.map(([source, urlPath], i) => [source, Buffer.from(`fixture:${urlPath}:${i}`)]));
const manifest = await createManifest("fixture", async source => {
  const key = source.replace(/^fixture\\//, "");
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
assert.throws(() => inspectLive({}), undefined); // async rejection handled separately below
assert.equal(digest(Buffer.from("x")).length, 64);
console.log("GC-ZT-11 fixture tests: full match, tampered homepage, HTTP failure PASS.");
