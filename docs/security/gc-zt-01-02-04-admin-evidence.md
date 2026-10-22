# GC-ZT-01/02/04 — Identity, branch policy, and deployment authority evidence

Status: **PARTIAL / NOT ZERO-TRUST VERIFIED**.
Evidence collected 2026-10-22 via repository-level GitHub API and repository source. This is a public-safe record: no member names, private tokens, recovery codes or privileged screenshots.

## Observed repository and main ruleset

| Control | Observed result | Evidence / qualification |
| --- | --- | --- |
| Repository visibility | PUBLIC | GitHub repository API for `governancecommons/governance-commons-www` |
| Default branch | `main` | GitHub repository API |
| Pages enabled | `has_pages: true` | Repository API; not proof of Pages environment policy |
| Ruleset | `Protect main`, active, ID `25527454` | [Public ruleset](https://github.com/governancecommons/governance-commons-www/rules/25527454), API `/repos/governancecommons/governance-commons-www/rulesets/25527454` |
| Scope | Default branch | Ruleset includes `~DEFAULT_BRANCH` |
| Deletion / non-fast-forward | Both prohibited | Ruleset `deletion`, `non_fast_forward` |
| Required checks | `verify` and `review` | Required-status-check contexts reported by GitHub; verify their mapping to current workflows before claiming sufficiency |
| Required pull request | Yes | Ruleset `pull_request` |
| **Required approving reviews** | **0** | GitHub ruleset `required_approving_review_count: 0`; automated CI success is not human review |
| CODEOWNERS approval | Not required | `require_code_owner_review: false` |
| Bypass actors | Empty array | No bypass actors listed in this ruleset; other administrative paths/policies need independent evaluation |
| User bypass for this ruleset | Never | API `current_user_can_bypass: never` |
| Branch protection endpoint | Inaccessible to connected integration (403) | Does not establish absence of other rules |
| Pages environment restrictions | Not independently observed | Administrator screenshot/settings or scoped read-only API access required |
| Organization MFA requirement | Not independently observed | Administrator screenshot/settings or scoped read-only API access required |
| Privileged users, apps and tokens | Not independently reviewed | Review **privately**; do not publish names or access inventory |

## Governance decision required

The live ruleset requires **zero** approving reviews. A one-review minimum strengthens independent approval, but can block a sole-maintainer repository if no qualified second reviewer exists. Until a real independent reviewer is available, **do not claim independent PR approval**. Decide explicitly between:

- Enforce one qualified review (after verifying reviewer access and a recovery mechanism); or
- Retain zero required reviews as a **documented temporary single-maintainer exception** with required CI, no ruleset bypass, periodic review, and an expiration/trigger to revisit when an independent reviewer is available.

No setting is changed by this record. The owner must make and evidence that decision.

## Private administrative verification checklist

Capture the date, authorized verifier, setting location, outcome (PASS/FAIL/UNKNOWN), evidence reference and next review. Keep screenshots with private membership/identity information outside the public repository.

- [ ] Organization MFA/passkeys enforced for all members; secure recovery verified
- [ ] Role/membership and outside collaborator access reviewed; stale accounts removed
- [ ] App installs and token scopes audited; least-privilege verified
- [ ] Main ruleset required checks match current job names and enforce merge safety
- [ ] Approval policy chosen explicitly; if 0 reviews, exception owner and review date recorded
- [ ] Pages environment restricts source to protected `main` and requires appropriate deployment permissions
- [ ] OIDC/job permission boundary verified; deploy uses `pages: write` / `id-token: write` only in deploy job
- [ ] Registrar/DNS and any legacy Netlify/admin account recovery and MFA checked separately
- [ ] Public and private evidence stored in appropriately classified repositories/locations

## Technical evidence already available

- [Latest production deployment](https://github.com/governancecommons/governance-commons-www/actions): build, Pages deploy and live checks recorded on GitHub.
- SHA-pinned Actions and job-scoped deployment permissions recorded in [GC-ZT-03](gc-zt-03-actions-pinning.md).
- Production header limitations in [GC-ZT-05](gc-zt-05-live-header-assessment.md).

**Closure rule:** Each external administrative control must have verified evidence or an approved, time-bounded exception. A public GitHub ruleset does not prove organization MFA, user identity assurances, deployment environment policy or zero trust.
