# GC-ZT — Repository approval operating modes (v0.1 proposal)

Status: **PROPOSED POLICY; NOT AN ENFORCED PORTAL INTEGRATION**. Scope: Governance Commons website source changes and published content. Related application-level workflows in GC Portal require their own implementation, tests, and authorization review.

## Invariant controls in every mode

- Changes to protected `main` must follow pull-request and required-check rules; no direct-push or force-push bypass as a normal workflow.
- Record the actor, exact commit SHA, operation, timestamp, result, supporting checks/evidence, and decision rationale. A CI result is not human approval.
- Approval applies to an **exact commit SHA and declared change scope**. Any later push to the PR invalidates a previous approval; rerun relevant tests and reapprove.
- The same untrusted execution principal must not both generate a change and forge/issue its approval. Never treat a boolean in a manifest as sufficient evidence of authenticated human action.
- Privileged policy/authorization changes require a separately controlled administrative process. A Portal App must not give itself new permission, remove required checks, or approve changes to its own enforcement policy without an independent trusted review path.
- Audit evidence must be append-only or tamper-evident to the extent supported by the system, access-controlled when private, and retained with an explicit retention policy.
- **No change to GitHub branch rules or deployment permissions occurs solely because a mode label changes.** Activation requires a reviewed policy/settings change and a verified effective configuration.

## The three modes

| Mode | Intended use | Human decision | GitHub merge enforcement | Assurance limit |
| --- | --- | --- | --- | --- |
| **1. SOLO** (current operating target) | One accountable maintainer | Maintainer reviews and authorizes own work, recording rationale where practicable | Protected PRs + required CI checks; GitHub approving-review count may remain 0 | Not independent human review. Treat as a documented exception to separation of duties |
| **2. PORTAL-GOVERNED** (future) | Portal-managed, authenticated approval workflow | Authorized human explicitly approves the exact PR SHA and policy scope | A narrowly permissioned GitHub App reports a required status check only when valid approval exists | Human approval can still be by the sole maintainer; does not imply independent review |
| **3. INDEPENDENT** (future) | Changes requiring separation of duties | A qualified reviewer other than the change author must approve | GitHub required review and/or separate verified independent-review check, alongside required CI | Configure reviewers and recovery ahead of enforcement to avoid deadlock |

### SOLO safeguards and acceptance

- Maintain active protected `main`, required PRs, non-fast-forward/deletion restrictions and required status checks.
- Keep required approving-review count at 0 **only as an explicit temporary single-maintainer exception**, not as evidence of independent review.
- For security-critical, identity, ruleset, publication gate or workflow-permission changes, seek external review where feasible; if unavailable, document exception rationale and verification evidence.
- Do not ask CI/AI agents to impersonate a human approval. Required checks remain mandatory.
- Revisit the exception on a scheduled governance review and once a qualified independent reviewer becomes available.

### PORTAL-GOVERNED implementation contract

Portal owns UX, identity-bound decision collection, review evidence and revocation; **GitHub owns branch, required-check and merge enforcement**. Required design properties:

1. Authenticate the approver with a trusted identity source; authorize by operation, repo, environment and policy version; prevent a contributor or bot from manufacturing a successful approval.
2. Bind decision to GitHub repository, PR number, head SHA, approver identity, action, timestamp, policy version and relevant checks. Record denial/revocation distinctly.
3. On a new commit, dismissal, policy change or expiration, ensure prior approval cannot satisfy the required check. Reconciliation/replay handling must fail closed.
4. Use a GitHub App with minimal necessary permissions to create check runs/statuses, validate event signatures, and verify installation and repository scope. Do not use a broad personal access token or grant repository admin privileges for ordinary approvals.
5. Configure GitHub ruleset to require the exact App-produced check from its authorized source; do not rely on a freely spoofable status name.
6. Publish the public policy and redacted attestations where appropriate; keep member identity details, security event data, keys and other sensitive material private.
7. Test withholding, revocation, stale SHA, policy changes, App outage, tampering and recovery before enabling on production.
8. Maintain explicit recovery procedure for an unreachable Portal; never silently fall back to "approval optional."

### INDEPENDENT safeguards

- Require approval by another eligible person, not the PR author; verify Code Owners coverage when applied and determine how administrators cannot self-waive the requirement.
- Retain the Portal decision record if desired, but a self-approval within the Portal **must not** satisfy an independent review gate.
- Provide a tested reviewer unavailability and recovery mechanism that maintains accountability.

## Emergency recovery: controlled exception, NOT a fourth mode

- Available only for a documented incident or outage that prevents normal governance; not a convenience toggle.
- Require explicit human incident authority, time-limited scope, recorded reason, evidence retention, and independent retrospective review when feasible.
- Any temporary GitHub ruleset/admin change must be performed through authorized GitHub administration, tracked, automatically or manually reverted, and verified after the incident.
- Never implement an always-on "break glass" Portal control able to remove its own restrictions; prevent automated systems from granting themselves emergency authority.

## Proposed state machine

`SOLO → PORTAL_GOVERNED → INDEPENDENT` are target configurations, not an implied automatic upgrade path. Reverting to a weaker mode is a governance-sensitive policy decision, not an ordinary user toggle. Every change requires approval, effective-policy verification, and an audit record.

A future Portal UI may present these three policy choices, but **a UI selection by itself never relaxes GitHub controls**. The backend must validate authorization and complete the explicit policy change workflow.

## Current evidence and activation record

As of 2026-10-22, the GitHub ruleset `Protect main` (`25527454`) requires PRs and `verify`/`review` checks, blocks deletion and non-fast-forward, lists no bypass actors, and requires **0 approving reviews**. See [GC-ZT-01/02/04](gc-zt-01-02-04-admin-evidence.md).

- [x] Define the three approval modes and invariant controls.
- [ ] Formally accept SOLO exception with named policy owner, dated review horizon and recorded decision.
- [ ] Verify every required check is bound to the intended trusted publisher.
- [ ] Design, implement and independently validate Portal App approval enforcement.
- [ ] Recruit/authorize independent reviewer(s) and test required-review configuration before switching to INDEPENDENT.
- [ ] Exercise emergency recovery procedure and retain results.

**ZTA remains partial.** This document defines governance boundaries, not verified authentication, attribution or independent review.
