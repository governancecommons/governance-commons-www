# GC-ZT-12 — Governed publication authorization integration contract (v0.1)

**Status:** DRAFT INTEROPERABILITY CONTRACT — NOT ACTIVE ENFORCEMENT  
**Owner of this document:** Governance Commons website (consumer and GitHub publication boundary)  
**Proposed implementation owner:** `governance-commons-portal` (approval service / UI and GitHub App integration).  
**Scope:** Governance Commons website changes requiring governed approval, not public anonymous read access or the Portal's full workflow implementation.

## Boundary and authority

- **Human:** A currently authorized person decides whether a specific revision may publish. Human identity and allowed scope must be verified by the approval service, not inferred from a GitHub username string or free-form field.
- **Portal:** Collects review context and decision, issues revocations and exposes an auditable record. A decision is not valid merely because a UI displays "Approved".
- **GitHub App (future):** A narrowly scoped, separately protected enforcement integration obtains the authoritative decision, validates event/signature/repository/installation and publishes **one named check run** on the exact head commit. GitHub branch rules must require that check from the specific App integration; a text check name alone is insufficient.
- **GitHub Actions:** Builds and verifies artifacts, but cannot mint human approval or change the approval policy. The existing `verify` and `review` required checks remain distinct from any future authorization check.
- **GitHub Pages:** Publishes approved content only through the currently protected release path. Live byte-fidelity evidence demonstrates delivery of build outputs, not editorial consent.
- **Observatory Core:** Produces evidence/observations; it is **not** a human decision authority.

## Approval decision envelope — logical contract, not a self-authenticating token

An approval record MUST include:

| Field | Requirement |
| --- | --- |
| `decision_id` | Unique, immutable identifier with replay protection |
| `repository_id` | Immutable GitHub repository ID plus human-readable owner/name for context |
| `pull_request_number` | PR number bound to that repository |
| `head_sha` | Full 40-character Git commit that the decision reviewed |
| `mode` | Exactly `SOLO`, `PORTAL_GOVERNED`, or `INDEPENDENT`, derived from the authoritative policy |
| `policy_version` | Immutable identity/digest of the effective policy |
| `actor_id` | Authenticated identity reference; separate from user-provided display name |
| `actor_role` | Server-authorized role for this repository/operation |
| `decision` | `APPROVE`, `DENY`, or `REVOKE` |
| `decision_at` | Trusted UTC timestamp |
| `expires_at` | Non-null policy-bounded expiry |
| `scope` | Specific change category and publication target/environment |
| `build_digest` | Optional for PR review but mandatory for a separately defined artifact-authorization decision; must not be substituted silently |
| `evidence_ref` | Opaque reference to review evidence accessible to authorized users |
| `issuer` | Authenticated backend service identity, not an unverified field |
| `integrity_proof` | Cryptographic/signature or trusted database attestation with key rotation and validation specification |

A JSON document with these field names is **not authorization**. The decision verifier must establish authentic issuer, trusted identity, signature or database authority, current policy, commit binding, validity interval, revocation status, allowed scopes, and replay protection *from independently trusted state*.

## Enforcement protocol

1. GitHub PR event arrives over an authenticated webhook; verify delivery signature, freshness, installation, repository ID and PR head SHA. Fetch live PR state from GitHub rather than trusting the webhook body alone.
2. Approval backend authenticates the human and authorizes requested action against the current policy. In `SOLO`, the sole maintainer's own explicit approval is allowed **but is not independent review**. In `INDEPENDENT`, author and approving reviewer must be distinct approved principals.
3. Backend persists append-only decision and issues a new decision ID; denies and revocations remain visible in the audit trail.
4. Check issuer fetches current repository state and independently validates the decision for the current head SHA, policy version, allowed actor and scope, TTL and revocation state.
5. If all validations succeed, issue GitHub check `gc-publication-authorization` on the **exact approved head SHA**. Otherwise report a non-successful check (`action_required` or failure), never success.
6. On any head change, policy change, authorization revocation, actor deprovisioning, expiration, or changed artifact binding, invalidate the decision and update the check for the new/current SHA accordingly. GitHub must not accept a stale check run from an older commit.
7. GitHub ruleset requires `gc-publication-authorization` from the *specific verified App*. Do not enable this required check until the App installation, positive and negative tests, recovery plan and maintainers are verified.
8. Merge/deploy uses existing protected pipelines. For production artifact authorization, a separate attestation must bind a reviewed artifact digest to the deployable release. A PR approval on a source SHA is **not automatically approval of all subsequent build artifacts**.

## Deny-by-default cases for the future implementation

| Case | Expected gate |
| --- | --- |
| Missing decision or service unavailable | Fail closed, no successful approval check |
| PR head changed after approval | Reject stale SHA |
| Revoked, expired, or replayed decision | Reject |
| Different repository / installation / environment | Reject |
| Contributor/bot impersonates approver | Reject |
| Producer pipeline attempts to issue its own approval | Reject |
| App is asked to approve its own authorization-policy or credential changes | Privileged independent/admin change-control path, not ordinary approval |
| INDEPENDENT mode with author self-approval | Reject |
| SOLO mode self-approval | Allowed only as explicit decision with active, unexpired exception; not independent review |
| Unknown signing key / unverifiable issuer | Reject |
| GitHub App loses permissions or goes offline | No check success; governed recovery procedure, not automatic downgrade |
| Evidence content or artifact digest changed | Re-review and new decision |

## Phased rollout and ownership

**Phase A — existing SOLO:** Current `SOLO-EXC-2026-10-22` remains a time-bounded governance exception reviewed by 2027-01-20. GitHub's current required `verify`/`review` checks continue as enforcement. This document does not activate the Portal App.

**Phase B — Portal sandbox:** In `governance-commons-portal`, implement identity integration, review UX, decision store, narrowly scoped GitHub App and isolated check issuance against a **non-required**, explicitly test-only check. Simulate all deny cases and a lost-Portal recovery scenario. Keep private credentials/identities out of `-www`.

**Phase C — controlled production:** After independent security review and explicit owner approval, update GitHub ruleset to require the verified App check from a specific trusted source. Confirm baseline checks still apply. Collect and retain evidence of at least one successful approval, denied change, revoked decision and changed-head invalidation. Ensure emergency recovery is explicitly authorized and rehearsed.

**Phase D — optional INDEPENDENT:** Only when another qualified reviewer exists, require true second-principal approval, independently verified; do not repurpose SOLO's self-approval as independence.

## Security and availability constraints

- The App should need at most the necessary read metadata/PR access and **checks write**. No permission to bypass rulesets, administer repositories, write arbitrary content or merge PRs as part of ordinary check issuance.
- A compromised publisher must be unable to change the expected approver, generate successful checks, or replace the authoritative policy in its own execution context.
- Keep public audit summaries redacted. Detailed identity, incident and decision evidence may be private/sensitive under the site's data-classification rules.
- Time-bounded failure recovery may require authorized GitHub administrators, but cannot be a silent self-service on/off toggle in Portal.
- Provide idempotency, webhook replay protection, revocation sequencing and concurrency control so approval is valid only for the *current* scope and revision.

## Acceptance and assurance

- [x] Document website/Portal/GitHub authority boundary and three-mode interoperability semantics.
- [x] Define decision envelope and fail-closed negative cases.
- [ ] Portal implementation and independent identity/authorization security test.
- [ ] GitHub App ownership and permission review.
- [ ] Check-name/source binding and protected-rule change approved by maintainer.
- [ ] Cross-repo integration tests (stale SHA, issuer compromise, revocation, expiry, denied publication and App outage).
- [ ] Provenance/builder trust for artifact-based approvals verified separately.
- [ ] Independent reviewer signs production activation and records recovery/rollback.

**Conclusion:** This is a consumer-side interface contract, not a working Portal authorization engine and not evidence that Governance Commons is fully zero-trust verified. The website repository must not absorb the reusable Portal approval service.
