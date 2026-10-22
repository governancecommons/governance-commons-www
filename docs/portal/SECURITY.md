# GC Portal security and authorization contract

**Fail closed** on missing session, missing role, mismatched workspace, invalid state, stale revision or unavailable policy data.

## Security boundaries

- Public Astro site: published read-only artifacts; never trust it with portal session cookies or privileged tokens.
- Private portal server: verifies GitHub identity, invitation status, session, workspace grants and object permissions for every request.
- Backend: least-privilege datastore access; separate service identities for research, review and publication.
- GitHub integration: GitHub App with minimal repository permissions; short-lived tokens; approvals checked against protected branches and exact commit.
- Research pipeline: untrusted input. Sanitize HTML, prevent SSRF, bound payloads and rates, never execute feed content.

## Required controls

Use HTTP-only Secure SameSite cookies, CSRF defense, session expiry, rate limiting, login auditing, secret rotation, encrypted backups, secure upload scanning and output encoding. Prevent IDOR, privilege escalation, forged reviewer identity, mass assignment, webhook replay and self-approval. Require stronger authentication for high-impact actions where supported.

## Separation of duties

Submission author cannot approve the same revision. A reviewer cannot authorize actions outside assigned workspace and approval scope. Governance specification adoption requires a separately authorized maintainer decision and passing checks. Any override must be narrowly scoped, logged and independently reviewed.

## Audit events

invitation.created / accepted / revoked; grant.created / revoked; submission.created / revised; evidence.attached / verified; review.requested / completed; decision.recorded; publication.requested / completed / failed; access.denied. Record actor, target, revision, timestamp, request ID and justification; redact sensitive data.

## Release gates

No portal login or publication UI should be labeled functional until deployed and end-to-end verified. The policy prototype in this repository is not an authentication service.
