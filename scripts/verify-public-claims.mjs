import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const standards = read("site/src/data/standards.ts");
const release = read("site/src/pages/release.astro");
const conformance = read("site/src/pages/conformance.astro");
const readme = read("README.md");

assert.match(standards, /published Python governance-commons 0\.2\.0 package does not expose Agent Dossier validation/i);
assert.match(standards, /Agent Dossier validation in source only/);
assert.doesNotMatch(standards, /Python governance-commons 0\.2\.0 provides structural dossier validation/);
assert.match(release, /Published Python 0\.2\.0 does not expose the Dossier target/);
assert.match(conformance, /Published Python 0\.2\.0 does not expose the Dossier target/);
assert.match(readme, /historical evidence, \*\*not a current DNS/);
assert.match(release, /last recorded 2026-10-07 check/);
console.log("Public claims consistency checks passed.");
