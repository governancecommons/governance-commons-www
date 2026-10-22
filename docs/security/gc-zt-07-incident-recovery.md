# GC-ZT-07 — Website incident response, containment and recovery

Status: **RUNBOOK DRAFTED; EXERCISES NOT YET TESTED**.
Scope: public static website and its GitHub repository/Actions/Pages publication chain.
This is an operational playbook, **not** proof of incident-response capability or ZTA compliance.

## 1. Detection and severity

Potential signals: failed deployment verification, unexpected site content or canonical schemas, compromised GitHub account or token, malicious dependency/action update, unauthorized ruleset/environment change, DNS/TLS anomalies, or confirmed disclosure of non-public material.

- **Critical:** verified credential compromise, unauthorized production publication, private data/secret exposure, or active supply-chain compromise. Treat as time-sensitive; restrict changes and invoke administrators.
- **High:** published content integrity failure, significant TLS/DNS compromise, or inability to prevent further unauthorized deployment.
- **Medium:** broken links/public pages, publication build failure, or bounded accessibility regression without demonstrated compromise.

Severity is provisional until evidence is examined. Security incidents require a human incident commander; don't infer an attacker solely from a failed test.

## 2. First response (human authorized, documented)

1. Record **UTC timestamp**, reporting channel, source URL/run ID, affected SHA and public impact. Store sensitive details privately.
2. Appoint incident commander and record who has authority to pause deployment, revoke tokens or revert content.
3. Preserve GitHub Actions logs, deployment SHAs, generated publication reports, relevant security events, DNS observations and private audit logs **before** destructive changes where safe.
4. If unauthorized publish/credential compromise is credible, authorized admins should **pause further releases**, revoke/rotate affected GitHub tokens and installed-app access, and require new trusted identities/MFA. Keep necessary emergency access for responders.
5. Distinguish **source compromise** from **serving/DNS compromise**. A successful Pages deploy doesn't fix a malicious DNS route or compromised registrar.
6. Follow disclosure/privacy policy and applicable legal requirements for any sensitive-information incident; do not publish personal data or investigation secrets in GitHub issues.

## 3. Recovery / rollback procedure

A rollback is a **new, reviewed change** that restores known-good content. GitHub Pages deployments are not assumed to offer an atomic rollback switch.

1. Identify last known-good commit **and** its associated passing build, deploy, public verification and (if relevant) schema/content digest evidence.
2. Assess whether that commit itself included compromised workflows, pinned Actions, secrets or dependencies. If so, first isolate the compromised execution path; do not blindly rerun it.
3. Have authorized maintainers prepare a **revert PR** to restore known-good source/content. Respect branch protections and any emergency procedure formally authorized by repository policy; avoid force pushes or blanket ruleset disabling.
4. Review diff, run required checks, merge with recorded approval/exception, and let the normal Pages workflow build, deploy and verify.
5. Verify live homepage, robots, sitemap, all canonical schemas and affected routes; record response statuses, timestamp and deployed SHA. For a content integrity incident, verify the affected canonical content, not just endpoint availability.
6. If DNS or TLS is involved, verify serving origin and certificate independently; publication checks alone are insufficient.
7. Announce recovery only when production state is verified. Record remaining risks, who approved restoration, and follow-up actions.

**Note:** The 8-endpoint live verifier checks URL/content expectations but is not a complete malicious-content integrity scan. For a tampering event, additional artifact and known-good content comparison is mandatory.

## 4. Scenarios and tabletop exercise

| Scenario | Authorized containment | Recovery evidence | Status |
| --- | --- | --- | --- |
| GitHub account or PAT compromised | Revoke/rotate, review sessions and permissions, limit deploy access | Token revocation attestation; clean reviewer; verified redeploy | NOT EXERCISED |
| Unexpected malicious homepage content | Pause affected publisher, capture old/current SHAs, revert reviewed content | Diff and independent content check on live host | NOT EXERCISED |
| Failing Pages deployment | Preserve job logs and artifact, fix in PR or revert | Build/deploy/verify-production all green | Prior successful repair exists; formal exercise NOT RECORDED |
| DNS/registrar compromise | Authorized registrar lock/recovery; establish DNS authority | Authoritative records + TLS/host confirmation | NOT EXERCISED |
| Third-party Action compromise | Stop triggering affected workflow, identify pinned SHA, update/review upstream source | Pinned source review and clean test evidence | NOT EXERCISED |
| Accidentally published sensitive data | Contain public exposure, privately determine scope, rotate secrets and follow disclosure policy | Confirm remediation and rotation; do not post sensitive evidence publicly | NOT EXERCISED |

## 5. Test exercise record

- Exercise ID / UTC date:
- Scenario and scope:
- Incident commander and approving administrator (record privately if sensitive):
- Last known-good commit / run:
- Simulated/real alert source:
- Containment decision and evidence:
- Revert PR and deployment run (use nonproduction or safe test artifact where possible):
- Time to detect / time to restore (observed, not guessed):
- Tests before/after:
- Outcomes: PASS / FAIL / BLOCKED / NOT TESTED:
- Gaps, owner and target review date:
- Reviewer sign-off:

**Safe first exercise:** A tabletop simulation using a hypothetical bad commit and existing successful workflow logs. Do not deliberately damage production or revoke real credentials just to complete the checklist.

## 6. Governance constraints

- Never commit credentials, backup secrets, private identity inventories or incident-response evidence containing personal data to the public repo.
- Human approval and attribution are required for production-impacting recovery choices. A GitHub workflow success does not prove a human approved.
- Coordinate with GC Portal/Observatory Core owners if an incident crosses their trust boundaries; this runbook grants no authority over their systems.
- Rehearse at least after material deployment/policy changes and record failures and remediations. No tested-recovery claim until an actual authorized exercise and evidence exist.
