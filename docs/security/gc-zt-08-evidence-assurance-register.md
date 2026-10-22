# GC-ZT-08 — Website Zero Trust evidence and assurance register

**Status:** INITIAL WEBSITE HARDENING DEVELOPMENT PHASE CLOSED; ZERO TRUST ASSURANCE **OPEN**  
**Evidence cutoff:** 2026-10-22  
**Scope:** `governancecommons/governance-commons-www`, public website, GitHub PR/build/Pages publishing chain, and website-facing Observatory publication controls. **Not** GC Portal, Observatory Core, Registry as a whole, or the broader Governance Commons ecosystem.

This register separates implementation, observation, human acceptance and independent review. It is not a percentage-complete or NIST/CISA certification scorecard.

## Evidence interpretation

- **VERIFIED (bounded):** directly observed via source/configuration or successful named run; only the specific claim is verified.
- **PARTIAL:** at least one material component is in place, but effectiveness, deployment or authority evidence is incomplete.
- **DOCUMENTED ONLY:** policy/playbook exists; operating control or exercise not proven.
- **OPEN:** currently missing/observed absent, inaccessible to audit, or requires owner risk decision.
- **ACCEPTED EXCEPTION:** authority explicitly accepts and bounds a residual gap; the underlying technical gap **continues to exist**.

Source or GitHub run links are public; private identity, credential, membership and incident-response artifacts must be kept in an access-controlled evidence store with a public redacted pointer only.

## Control-by-control assessment

| ID | Control / trust boundary | Assessment | Evidence | Outstanding assurance / owner action |
| --- | --- | --- | --- | --- |
| ZT-01 | GitHub organization MFA, role review, app/token access, recovery | **OPEN** | [Admin evidence record](gc-zt-01-02-04-admin-evidence.md) flags inaccessible configuration | Organization administrator must privately confirm enforced MFA, app scope and least privilege, audit date and recovery |
| ZT-02a | Protected default branch and required PR checks | **VERIFIED (bounded)** | [Active ruleset 25527454](https://github.com/governancecommons/governance-commons-www/rules/25527454) requires PR, `verify`/`review` checks; blocks deletion/non-fast-forward, lists no bypass actors | Confirm check-source binding and any other applicable org rules; periodically re-read effective rule evaluation |
| ZT-02b | Independent human PR approval | **ACCEPTED EXCEPTION; NOT IMPLEMENTED** | [Approval operating modes](gc-zt-approval-operating-modes.md), decision `SOLO-EXC-2026-10-22`; GitHub ruleset requires zero approving reviews | Next review **2027-01-20**; reassess upon reviewer availability, Portal enforcement readiness, incident or significant scope change. This is **not** independent review |
| ZT-03a | Least-privilege job tokens and checkout credential persistence | **VERIFIED IN SOURCE** | [Deploy workflow](../../.github/workflows/deploy-pages.yml) separates build `contents: read` and deployment `pages: write`/`id-token: write`; [pinning record](gc-zt-03-actions-pinning.md) | Prove effective runtime permissions and OIDC audience/claims in a scoped independent admin review |
| ZT-03b | Immutable third-party/official workflow Actions | **VERIFIED IN SOURCE AND DEPLOY** | [GC-ZT-03 pins](gc-zt-03-actions-pinning.md), merged PR #28; [successful build/deploy/live check](https://github.com/governancecommons/governance-commons-www/actions/runs/39811260332) | Upstream provenance/security audit, update procedure validation, specialized dispatch workflows re-test |
| ZT-03c | Dependency scanning, SBOM and build provenance | **PARTIAL** | [Dependency review workflow](../../.github/workflows/dependency-review.yml) enforces high/critical PR gate; PR CI passed | Independently verify dependency graph/alerts/secret scanning; evaluate SLSA provenance, SBOM creation and artifact integrity |
| ZT-04 | Pages deployment restriction and OIDC trust boundary | **PARTIAL** | Job-scoped OIDC permissions in workflow; [live deployment run](https://github.com/governancecommons/governance-commons-www/actions/runs/39813716368) passed | Administrator must inspect `github-pages` environment deployment branch/source restrictions and workflow provenance; do not infer policy from CI success |
| ZT-05a | Live HTTPS, redirect and publication availability | **VERIFIED (BOUNDED)** | [Baseline run 39808911181](https://github.com/governancecommons/governance-commons-www/actions/runs/39808911181): 4/4 final HTTP 200, expected canonical 301→200; earlier G-1 DNS/TLS run 39806896658 | Independently verify DNS registrar/host ownership and monitor TLS/redirect behavior |
| ZT-05b | Defense-in-depth HTTP security headers | **OPEN — HOSTING DECISION** | [GC-ZT-05 assessment](gc-zt-05-live-header-assessment.md) records six headers absent in measured final HTML responses | Risk-owner decision: accept Pages constraint with compensating controls or explicitly authorize and test a controllable edge; CSP compatibility and HSTS subdomains must be tested before any rollout |
| ZT-06a | Public Observatory evidence publication validation | **PARTIAL** | [Publication verification workflow](../../.github/workflows/deploy-pages.yml) runs Observatory evidence/publication checks; post-deploy checks green | Verify semantic accuracy, provenance, immutable versioned content and producer/publisher segregation beyond pass/fail schema gates |
| ZT-06b | Authenticated independent human publication approval | **OPEN** | [Approval modes](gc-zt-approval-operating-modes.md) specifies future Portal GitHub-App check; no live implementation verified | GC Portal team must build identity-bound, commit-SHA-specific approval with fail-closed check; scope outside website. Solo exception doesn't mean approval exists |
| ZT-07a | Incident response and recovery procedures | **DESK WALKTHROUGH ONLY; OPERATIONS NOT EXERCISED** | [GC-ZT-07 runbook](gc-zt-07-incident-recovery.md); [GC-ZT-09 desk exercise](gc-zt-09-publication-integrity-tabletop.md) | Appoint commander/backup, define private incident contact/evidence, conduct authorized operational tabletop and verify authority |
| ZT-07b | Tested rollback, credential rotation, DNS recovery | **OPEN — NOT EXERCISED** | GC-ZT-09 was a source-backed desk walkthrough, not a live or sandbox rollback exercise | Conduct authorized operational tabletop and controlled recovery practice without breaking public availability; record measured results |
| ZT-08 | Independent security assurance and control closure | **OPEN** | This evidence register and linked technical runs | Independent reviewer must examine underlying configs, confirm exceptions, perform targeted abuse-case testing, sign dated findings and remediation ownership |

## Initial website hardening phase closure — 2026-10-22

**Decision:** The website's initial ZTA-oriented **development phase is CLOSED** at the owner's explicit direction. This is a **phase and handoff decision**, not a claim that ZT-01–ZT-08 controls are fully remediated or that independent Zero Trust assurance has passed.

**Production reference:** [Run 39820709771](https://github.com/governancecommons/governance-commons-www/actions/runs/39820709771) completed successfully after GC-ZT-12 contract PR #39. The closure PR requires its own CI and post-merge deployment evidence; do not infer its deployment in advance.

**Delivered technical and governance work:** PRs #28–#39: pinned workflow actions, header/hosting risk inventory, main ruleset inspection, incident runbook, three-mode governance with [time-bounded SOLO exception](gc-zt-approval-operating-modes.md), evidence register, publication-integrity desk exercise and fixtures, observational build-to-live digest comparisons and bounded transient error retries, and a [Portal publication authorization consumer contract](gc-zt-12-publication-authorization-contract.md). The [GC-ZT-11 fidelity evidence](gc-zt-11-publication-fidelity.md) includes a production run with seven exact matches and one HTTP 503; transient retries were merged, but a **subsequent checked observation is needed** before any hard gate.

### Preserved residual security and assurance backlog

The following is **open**, not implicitly accepted. Store redacted public summaries here and private administrative evidence in access-controlled storage. Record owners and acceptance decisions in future dated PRs or governance records.

| Residual ID | Priority | Outstanding action / acceptance evidence | Ownership boundary |
| --- | --- | --- | --- |
| R-01 | P0 | Privately verify org MFA/passkeys, privileged accounts, external collaborators, installed Apps, secrets scanning/alerts and recovery; retain verifier/date | GC organization administrator |
| R-02 | P0 | Confirm actual effective `main` check source binding and `github-pages` environment source restrictions; verify OIDC runtime claims and registrar access | GC repository/hosting administrator |
| R-03 | P0 | Maintain `SOLO-EXC-2026-10-22` with required CI and no independent-approval claim; **review by 2027-01-20** or upon triggering event | Governance owner |
| R-04 | P0 | Verify publication authorization against current commit and authenticated identity; implement sandbox-only Portal decision engine/GitHub App with fail-closed negative tests **outside website repo** | `governance-commons-portal`; GitHub admin for later enforcement |
| R-05 | P1 | Decide accept/risk-mitigate the six missing security headers or approve separately tested hosting-edge change; do not alter DNS/TLS without explicit approval | Website risk/hosting owner |
| R-06 | P1 | Exercise incident commander authority, private contact route, controlled rollback, compromised-token handling and DNS recovery; record dated results and retest | GC security administrator |
| R-07 | P1 | Recheck GC-ZT-11 production fidelity after bounded retries. Evaluate cache/edge variability, then separately approve any **scoped** blocking digest gate; build manifest is not independent editorial authorization | Website build/publishing owner |
| R-08 | P1 | Validate dependency graph/Dependabot and secret scanning, upstream action provenance, SBOM/SLSA strategy, and manually dispatched specialized workflows after action pinning | Website supply-chain maintainer |
| R-09 | P1 | Independently test Observatory source provenance, producer/publisher separation, semantic content integrity and approval attribution | Website/Observatory boundary owners |
| R-10 | P2 | Arrange independent external ZTA-focused assurance, document findings, exceptions, verifier, date, retest, and final scope-limited conclusion | Independent reviewer / governance owner |
| R-11 | P2 | Finish manual accessibility acceptance, review Lighthouse performance 75/100, and obtain applicable RFC-0001 G-1 reviewer acceptance; these are separate website quality/governance tasks | Website maintainer / RFC owner |

**Non-closure rules:** No automatic mode downgrade; no weakening GitHub branch protections; no claim of independently reviewed PRs under SOLO; no claim that measured byte equality authenticates content; no ZTA-compliant/verified claim; no claim that a desk exercise proved operational recovery.

**Reopen triggers:** A security incident, failed required publishing gate, critical new threat, changed GitHub/Pages/DNS trust boundary, Portal integration that expands publication privileges, expired SOLO decision or explicit owner request. Otherwise handle remaining work as tracked security-closure tasks rather than continuing the original website development milestone.

**Handoff:** Website public presentation and post-deploy checks remain in `governance-commons-www`. Implement future identity-bound approval engine and UI in `governance-commons-portal` under [GC-ZT-12](gc-zt-12-publication-authorization-contract.md). This is a contract/handoff, **not** a claim that Portal implementation exists.

### Related acceptance outside ZTA core

- Automated accessibility: [18/18 passing browser/axe cases](https://github.com/governancecommons/governance-commons-www/actions/runs/39805523903), **bounded**; [manual accessibility acceptance](../www-20-accessibility-acceptance.md) remains outstanding.
- G-1 canonical schema: [5/5 endpoint evidence run](https://github.com/governancecommons/governance-commons-www/actions/runs/39806896658); RFC-0001 G-1 formal independent reviewer acceptance not yet established.
- Lighthouse: [baseline run](https://github.com/governancecommons/governance-commons-www/actions/runs/39808911181) performance **75**, accessibility **100**, best practices **100**, SEO **100**. Lighthouse is not a security or field-performance attestation.

## NIST / CISA alignment: directional mapping, NOT maturity certification

| Trust area | Relevant ZT control evidence | Qualifier |
| --- | --- | --- |
| Identity | ZT-01, ZT-02b, ZT-06b | Privileged access and authenticated approval are incomplete |
| Devices | GitHub-hosted runner and maintainer endpoints | Managed maintainer-device posture not evidenced; runner environment != proof of device trust |
| Networks/environments | ZT-04, ZT-05 | TLS evidenced within scope, header/edge and environment settings not fully verified |
| Applications and workloads | ZT-02, ZT-03, ZT-06 | CI gates/pinned Actions; no Portal enforcement or independent semantic source verification |
| Data | ZT-05, ZT-06 | Public data by design; classification, provenance and sensitive-data release controls need independent tests |
| Visibility, analytics and governance | ZT-07, ZT-08 | Logs/evidence workflows available; incident exercise, periodic access review and independent assurance open |

See NIST SP 800-207 and CISA Zero Trust Maturity Model for reference definitions. This mapping does not establish attainment of maturity levels, certification, or organizational conformance.

## Required closure evidence

Each future assurance claim must include: `control_id`, exact trust boundary, test/inspection method, source configuration or run URL, timestamp, verifier (privately if needed), outcome `PASS/FAIL/UNKNOWN/EXCEPTION`, limitations, evidence retention location, remediation owner and retest date. Never convert **UNKNOWN** to PASS merely because repository source is available.

Prioritized closure sequence:

1. **P0:** Validate organization MFA and privileged access privately; verify Pages branch restrictions and status-check source binding; confirm SOLO decision implementation and review ownership.
2. **P0:** Verify publication authority and supply-chain secret exposure pathways before giving Portal write/merge authority; design fail-closed actor/commit binding.
3. **P1:** Conduct safe rollback/credential compromise tabletop, retain evidence, and validate incident contact/recovery authority.
4. **P1:** Record decision on missing headers: documented acceptable residual risk or separately approved edge remediation. Avoid untested DNS/CDN changes.
5. **P1:** SBOM/provenance strategy and independent source/action review; retest specialized manual workflows after SHA pinning.
6. **P2:** Conduct formal independent ZTA-focused review with documented exceptions, signed decisions, findings and target dates.

## Assurance conclusion

**The website is operational and several specific security controls are technically verified. The public website is not independently verified as a complete Zero Trust Architecture.** The accepted SOLO exception preserves an honest account of human-review limitations; GC Portal future controls are not treated as implemented. Any external claim must stay bounded to the cited observation.
