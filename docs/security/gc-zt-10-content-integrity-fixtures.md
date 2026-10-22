# GC-ZT-10 — Content integrity gap reproduction and control design

Status: **OFFLINE FIXTURE TEST; PRODUCTION ENFORCEMENT NOT ENABLED**. 2026-10-22.

## Reproduction

`node scripts/test-publication-integrity.mjs` builds clean and tampered **synthetic** homepage fixtures. Both preserve the title and canonical link checked by `verify-live-publication.mjs`. The test confirms both pass the current two basic assertions. Against a fixed, preapproved SHA-256 digest derived from the clean fixture, the tampered version is rejected.

This proves **only** that the existing homepage checks do not detect a certain class of text tampering, and that a separately trusted digest would distinguish the two fixtures. It does **not** establish that production content has been tampered with or is now fully protected.

## Production trust model before enabling a gate

A checksum computed during the same build being verified is **not an independent approval**: a compromised source/build can modify both content and checksum. If a post-deploy byte-for-byte comparison to the uploaded build is introduced, describe it as **deployment fidelity**, not content authenticity.

A stronger governance-integrity gate needs an *independently approved expected version* bound to the exact commit/content scope, held under a different authorization boundary than the publishing workflow, plus an authenticated decision, expiry and revocation behavior. Verify stale SHA, replay, missing approval, tampering, independent publisher, and edge/caching differences. Do not add a fragile hardcoded homepage digest to production without a versioned update workflow and rollback plan.

## Acceptance

- [x] Synthetic positive and tampered fixtures reproducibly demonstrate current detection blind spot.
- [x] Rejection against a fixed expected digest tested.
- [ ] Separate trusted approval/digest store chosen and threat modeled.
- [ ] Digest provenance and exact commit authorization implemented.
- [ ] Controlled preproduction deploy fidelity + fail-closed negative tests completed.
- [ ] Independent security review and production enablement approval completed.

This fixture is a non-disruptive first step toward closing tabletop finding TT-01 (GC-ZT-09). It does not modify deployed website checks or claim ZTA verification.
