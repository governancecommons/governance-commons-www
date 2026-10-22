import { strict as assert } from "node:assert";
import { createHash } from "node:crypto";

// Controlled source-only tabletop fixtures. No network, credentials, or production mutation.
const origin = "https://governancecommons.org";
const clean = '<!doctype html><html><head><title>Governance Commons — Standards</title><link rel="canonical" href="'+origin+'/"></head><body><main><h1>Governance Commons</h1><p>Public standards.</p></main></body></html>';
const tampered = clean.replace("Public standards.", "Unauthorized content. Public standards.");
function currentHomepageAssertions(body) {
  if (!/<title>[^<]*Governance Commons/i.test(body)) throw Error("homepage title not found");
  if (!body.includes('rel="canonical" href="'+origin+'/"')) throw Error("canonical homepage link not found");
}
function sha256(bytes) { return createHash("sha256").update(bytes).digest("hex"); }
function verifyAgainstExternallyApprovedDigest(body, approvedDigest) {
  const actual = sha256(body);
  if (actual !== approvedDigest) throw Error("homepage digest mismatch");
}
currentHomepageAssertions(clean);
currentHomepageAssertions(tampered); // Demonstrates the detected gap, not a security pass.
const approvedDigest = sha256(clean); // Simulates a separately approved reference.
verifyAgainstExternallyApprovedDigest(clean, approvedDigest);
assert.throws(() => verifyAgainstExternallyApprovedDigest(tampered, approvedDigest), /digest mismatch/);
assert.notEqual(sha256(clean), sha256(tampered));
console.log("GC-ZT-10 controlled fixtures PASS: current title/canonical checks accept tampered text; fixed approved digest rejects it.");
console.log("LIMIT: approved digest is simulated in this test. Build-generated self-attestation would not detect malicious edits already present in a compromised build.");
