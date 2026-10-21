# GC–ZT.01 — Zero Trust Architecture security baseline

Status: **IN PROGRESS / NOT VERIFIED**. Scope: public website, source control, build and publication supply chain, DNS, administrative identities, Observatory publication interfaces.

## Trust boundaries

1. **Anonymous visitor → static public website:** public GET access is intentional. No authentication required to read public content. Browser content must not contain secrets or privileged tokens.
2. **Contributor → GitHub repository:** all changes untrusted until reviewed and validated. Repository role permissions, MFA, branch rules, CODEOWNERS and bypass controls require external verification.
3. **GitHub Actions → Pages:** build job requires only source read; deployment job needs Pages write and OIDC identity token. No persistent deploy credential should be introduced.
4. **Evidence source → Observatory Core:** untrusted records must pass contract, provenance, classification, approval, and checksum checks before eligible publication. An approval *field* is not proof of authenticated human review.
5. **Publication artifact → website:** immutable, pinned bytes and fail-closed verification required before any future ingestion. Do not allow remote manifests to silently replace published content.

## Evidence-backed findings (repository inspection, 2026-10-20)

| Control | Observed | Status |
| --- | --- | --- |
| Static Astro build | README and deploy workflow identify GitHub Pages | observed |
| Deployment permissions | Workflow grants `contents: read`, `pages: write`, `id-token: write` at workflow level | hardening candidate: move to job scopes |
| OIDC | Deployment has access to short-lived OIDC token | observed, not independent identity-policy audit |
| Build gates | Observatory catalog/evidence checks, build and artifact verification | observed |
| Dependencies | npm ci, Actions tagged versions, no dependency integrity audit in this review | incomplete |
| Production host | README states GitHub Pages; Netlify configuration described as legacy | verify external DNS/host settings |
| Security headers | legacy Netlify headers are not proof of production GitHub Pages response headers | unknown |
| MFA, branch protection, environments, DNS registrar | Not inspectable from these files | unknown |
| External penetration testing / ZTA conformance | No supporting evidence | not verified |

## Required gates before asserting a verified zero-trust posture

- ZT-01: Confirm GitHub organization MFA/passkeys, privileged members, repository visibility, least-privilege roles and periodic access review.
- ZT-02: Enforce protected main, required checks, approvals, CODEOWNERS and no uncontrolled bypass.
- ZT-03: Scope Actions permissions per job; pin actions to reviewed commit SHAs; add dependency and supply-chain scanning, SBOM/provenance strategy.
- ZT-04: Confirm Pages environment restrictions, branch/source and OIDC trust boundary; disallow persistent deployment tokens.
- ZT-05: Verify live DNS, HTTPS, redirects, security headers and browser CSP compatibility at the *actual* host.
- ZT-06: Ensure Observatory human approval is authenticated, traceable and separate from producer execution.
- ZT-07: Add incident response, secret rotation, audit logging and documented recovery/rollback.
- ZT-08: Independently validate and record evidence for each implemented control; map to NIST SP 800-207 and CISA ZT maturity pillars without claiming certification.

## Policy

**Never describe the website, Registry, Observatory Core, or the ecosystem as 'zero-trust verified' or 'ZTA compliant' until each applicable gate is supported by evidence.** Zero trust is a continuous architecture and operating practice, not a single checklist or badge. Public read access is not a violation of zero trust.
