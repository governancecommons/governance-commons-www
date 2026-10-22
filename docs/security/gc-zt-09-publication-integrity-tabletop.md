# GC-ZT-09 — Publication-integrity incident tabletop (desk exercise)

**Status:** **DESK WALKTHROUGH RECORDED — NOT AN OPERATIONAL RECOVERY TEST**  
**Date:** 2026-10-22 (UTC)  
**Exercise ID:** `GC-ZT-09-TT-20261022-01`  
**Scope:** `governancecommons/governance-commons-www`, GitHub PR/Actions/Pages pipeline and website publication integrity. No real incident, production fault injection, credential rotation, or live rollback occurred.

## Scenario and exercise rules

**Fictional inject:** A maintainer sees an unauthorized paragraph on the public homepage after a GitHub Pages deployment. The attacker *may* have modified source or a publication artifact; compromise is **not established**. The exercise asks how an authorized responder would triage, contain and restore the website without disabling `Protect main`.

**Exercise method:** desk walkthrough against the actual [GC-ZT-07 incident runbook](gc-zt-07-incident-recovery.md), [deployed workflow](../../.github/workflows/deploy-pages.yml), [live verification script](../../scripts/verify-live-publication.mjs), and public GitHub run evidence. Steps below are evaluated as **DESIGN PASS**, **GAP**, or **NOT TESTED**, not as real-world timing or effectiveness evidence. No actor impersonation, fake incident ticket, or simulated production event is entered into GitHub audit logs.

## Trust-boundary / fault-injection walkthrough

| Phase | Simulated inject / decision | Evaluation | Evidence / gap |
| --- | --- | --- | --- |
| Detect | Unexpected homepage paragraph appears, but the title and canonical link are unchanged | **GAP** | Current `verify-live-publication.mjs` homepage test checks only title and canonical URL. A malicious paragraph with those unchanged **could pass**. Successful 8/8 publication checks do not imply all content is authentic |
| Classify | Unknown modification source; alleged account compromise unconfirmed | **DESIGN PASS** | Runbook requires preserving facts and treats compromise as unproven until investigated. Treat as high-severity *suspected integrity* incident pending triage |
| Establish authority | Who may pause releases, review incident and authorize recovery? | **GAP** | Single-maintainer SOLO exception authorizes repository governance but a named incident commander/backup and trusted out-of-band recovery channel are not documented or verified |
| Preserve | Gather affected URL/body, current SHA, Actions/deployment logs, artifact digests, GitHub audit events, DNS/TLS observations | **DESIGN PASS / NOT TESTED** | Runbook preserves evidence before destructive action. No actual evidence capture test, access check or retention attestation performed |
| Contain | Suspend further publication *if* unauthorized release suspected, review identities/tokens and distinguish source vs DNS compromise | **DESIGN PASS / NOT TESTED** | Runbook calls for authorized admin decisions. No safe procedure validated for pausing the automatic `main` Pages workflow without relaxing branch rules |
| Recover | Identify clean baseline, inspect upstream workflows/dependencies, prepare revert PR, run `verify`/`review` and normal deployment | **DESIGN PASS / NOT TESTED** | [Main ruleset](https://github.com/governancecommons/governance-commons-www/rules/25527454) enforces PR + checks; deploy workflow builds and publishes on `main`. No revert was executed |
| Verify | Full affected-page content matches independently retained clean expected material; all 8 canonical URL checks pass; validate DNS/TLS if relevant | **GAP** | Existing live verifier proves URL/title/schema identity only. No independent signed content hash for homepage and no trustworthy known-good comparison tested |
| Close | Owner signs off, records incident timeline, containment efficacy, root cause, private evidence and retrospective | **NOT TESTED** | No incident commander, real timestamps, rotation receipt or independent approval. The exercise must not claim recovery succeeded |

## Concrete evidence in existing deployment system

- [Prior production deploy and post-deploy verification](https://github.com/governancecommons/governance-commons-www/actions/runs/39813716368) succeeded. This demonstrates a routine clean deployment path, **not** rollback under attack.
- Build job has `contents: read`; deploy job has `pages: write` and `id-token: write`; checkout disables persistent credentials.
- Production workflow concurrency uses `group: pages` with `cancel-in-progress: true`; this is **not** an incident-specific freeze switch. Emergency response must not assume turning off a workflow is available without governance and recovery implications.
- Live verifier checks homepage title/canonical, `robots.txt`, sitemap, and five Agent Dossier schema `$id` values. These checks can miss a malicious text change to an otherwise valid homepage.
- The accepted SOLO policy exception (`SOLO-EXC-2026-10-22`) is **not** independent approval and does not authorize routine override of required checks.

## Findings and remediation register

| ID | Priority | Finding | Action / owner | Closure evidence |
| --- | --- | --- | --- | --- |
| TT-01 | **P0** | Publication validation cannot assert full homepage integrity | Website owner: define content-integrity targets and immutable expected-digest source independent of the potentially compromised publisher; identify which pages/content require stronger checks | Targeted tests showing injected unauthorized content fails closed; no circular self-attestation |
| TT-02 | **P0** | Incident commander, alternate contact and credential-control authority unverified | Governance owner: designate incident decision-maker and emergency contact privately, including loss-of-account scenario | Privately reviewed response roster and access/recovery test |
| TT-03 | **P1** | No evidence-backed freeze / trusted recovery procedure demonstrated | Repository admin: design and **dry-run** a safe containment/restore procedure without bypassing the ruleset | Recorded test in controlled environment with evidence and manual sign-off |
| TT-04 | **P1** | Actual artifact/content recovery and independent post-recovery validation untested | Website owner: perform an authorized **nonproduction** rollback rehearsal with known-good and deliberately modified fixtures | Before/after SHA/digest comparison, PR checks, logs and reviewer decision |
| TT-05 | **P1** | Supply-chain and administrator credential-compromise recovery not exercised | Security/admin owner: run separate token compromise and GitHub App suspension tabletop; verify privately | Documented timeline and authority evidence, no exposed secrets |
| TT-06 | **P2** | No measured time to detect, contain or restore | Security/admin owner: measure during real controlled rehearsal | UTC timestamps and outcomes from a supervised test |

**Design-only positive observations:** The runbook explicitly distinguishes verified observations from incident hypotheses; requires evidence retention, PR-based recovery and post-deploy tests; and forbids assuming a green workflow proves trustworthy content. These are sound *documented procedures*, not operational PASS results.

## Suggested next safe test

Implement **a self-contained offline/nonproduction verification test** that supplies the homepage verifier with controlled clean and tampered HTML fixtures. Confirm that the current title/canonical-only verifier accepts both (exposing the gap) and that a proposed content-integrity mechanism rejects the tampered fixture; ensure expected hashes are pinned in separately governed evidence, not regenerated by the same compromised build. Do not attack the live site or mutate production.

## Acceptance boundary

- [x] Desk walkthrough performed and recorded against current repository source and historical CI evidence.
- [x] Fault scenario and expected response compared to documented controls.
- [x] Remediation priorities and owners-by-role recorded.
- [ ] Human incident commander / administrator tabletop conducted and signed.
- [ ] Recovery/rollback action tested safely in a controlled environment.
- [ ] Credential revocation and account recovery tested.
- [ ] Independent security reviewer validates findings and remediation.

**Conclusion:** GC-ZT-09 establishes a useful **first tabletop desk assessment** and exposes a substantive content-integrity detection gap. It does **not** justify changing GC-ZT-07/08 to "recovery verified," claiming incident response exercised operationally, or asserting complete Zero Trust Architecture.
