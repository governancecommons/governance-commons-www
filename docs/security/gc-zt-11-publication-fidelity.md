# GC-ZT-11 — Deployment fidelity baseline and Portal approval boundary

Status: **PROPOSED OBSERVATIONAL CONTROL; PR VALIDATION PENDING**.

## What changes

Build job generates a deterministic SHA-256 manifest **outside** `dist/` for eight selected public artifacts (homepage, robots, sitemap, five canonical schemas) after build. It uploads the manifest as a CI artifact; the post-deploy verification job downloads it, fetches each exact canonical URL without redirects and records byte counts and SHA-256 comparisons in an additional retained JSON artifact. The existing eight-endpoint semantic production gate remains in place.

The initial live-byte comparison is **observational** (nonblocking) because GitHub Pages serving transformations and rollout/caching differences have not yet been characterized. Test fixtures cover exact match, modified homepage and HTTP error. A non-match must be investigated and, when justified, converted to a scoped blocking gate in a separate reviewed change. This comparison is not a cryptographic signature or an independent publisher authorization.

## Threat boundaries

1. **Build-to-live fidelity:** compares emitted build bytes with bytes served on the public host. It can detect post-build modification or wrong-version delivery when stable bytes are expected. It cannot prove the build was safe.
2. **Governed publication authenticity:** requires an authenticated human approval of the exact content/commit with an independent trust boundary. **Not implemented in this PR.**
3. **Portal integration contract (future):** Portal may present approvals and evidence, but GitHub enforces an App-issued required check bound to repo, PR, head SHA, published artifact digest, approver, policy version, timestamp, expiration and revocation. The publisher cannot issue its own approval. App identity/authenticity and replay resistance must be tested. Do not grant broad GitHub administrator tokens.
4. **Recovery:** changed commit or artifact invalidates old approval; App unavailable means fail-closed until explicitly authorized recovery. The SOLO exception is not independent human review.

## Acceptance

- [ ] PR fixture tests and existing website verification pass.
- [ ] Manifest transfers correctly from build to post-deploy job without entering public `dist/`.
- [ ] Live comparison artifact and log show observed matches/mismatches for all eight paths.
- [ ] Determine if served HTML has byte transformations and whether strict byte matching is appropriate.
- [ ] Scoped fail-closed rollout + independent authorization requires separate PR, owner approval and negative testing.

**Evidence classification:** This proves neither complete content integrity nor ZTA compliance. A manifest produced by an attacker-controlled build cannot authenticate the underlying editorial content.
