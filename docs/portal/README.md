# GC Portal — product and implementation charter (v0.1)

**Status:** proposed implementation; NOT a deployed, authenticated service.

## Mission

Private, permission-controlled workspace for GC research, editorial work, adoption intake, standards proposals, code contributions and evidence review. Public website remains a separate publication surface.

**Proposed URL:** portal.governancecommons.org (DNS and hosting not configured).

## MVP acceptance criteria

1. Invite-only sign-in with GitHub OAuth/OIDC, server-side session validation, CSRF protection, secure cookies, logout and revocation.
2. Deny by default. Every resource and action has organization, workspace, role, ownership and state checks enforced by server; browser UI is never the authorization boundary.
3. Roles: owner, administrator, governance_maintainer, editor, reviewer, contributor, observer. Role assignment is explicit and audited. Roles are capabilities, not automatic blanket access.
4. Contributor submits an article, research packet, evidence, correction or governance proposal; can see own submissions and authorized workspaces.
5. Editor/reviewer can annotate and request revisions; only designated authorities can approve within their scope. High-impact governance changes require independent review and no self-approval.
6. Editorial evidence model links claims to sources, verification records, snapshots/hashes, decisions and revision IDs. Submission never means approval.
7. A news-to-adoption queue records Adopt / Adapt / Investigate / Monitor / No Change, evidence, current-GC comparison, rationale, owner, and linked issue/PR.
8. Publishing/merge operations require an authenticated reviewer approval tied to the exact revision and verified CI checks. No automatic release from self-asserted JSON.
9. Audit log is append-only at the application level and externally backed up; events include actor, action, object, revision, decision, time and request correlation.
10. Public-facing data is explicitly selected for publication; private draft records, identities, credentials and unapproved evidence never enter static site artifacts.

## MVP views

- Overview: research status, pending decisions, review deadlines, blocked work.
- Intelligence: feed discoveries, source verification, editorial packets.
- Editorial: submit, edit, review, approve/reject with revision history.
- Adoption: candidate → evidence → impact analysis → disposition → issue/PR.
- Contributions: submissions and technical review assignments.
- Administration: invitations, role grants/revocation, workspace policies, audit search.

## Phases

**P0 (this PR):** architecture, requirements, policy-as-code prototype, tests and acceptance gates; no authentication claims.

**P1:** independent private portal service and datastore; GitHub OAuth; invite-only accounts; read-only dashboard and audited roles.

**P2:** submissions, evidence records, revision-aware review, assignment and comment workflows.

**P3:** scoped approvals, authenticated publishing PR integration, independent review, observability, operational runbooks.

**P4:** external collaborator onboarding, delegation expiry, standards/adoption RFC workflow, audit exports and recovery drills.

## Non-goals in v0.1

No public self-registration; no AI autonomous adoption of GC standards; no certification or regulatory compliance claims; no direct write access from research jobs to production; no embedding private portal secrets in the Astro static site.

## Decisions pending

Hosting and datastore provider; GitHub OAuth app ownership; identity lifecycle and collaborator invitation policy; retention/privacy and jurisdiction; security review and backup strategy; exact deployment separation from public site.

## Definition of production-ready

Threat model reviewed; authorization tests passing; invitation and revocation verified; protected deployments and secrets configured; encrypted transport/storage; backup restore tested; audit integrity reviewed; independent penetration/security review proportionate to exposure; DNS/TLS checked; owner explicitly authorizes launch.
