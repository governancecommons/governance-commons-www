# GC–ZT.02 — Supply chain and identity hardening

Status: **PARTIAL — OPEN**. This is not a ZTA attestation.

## Implemented in this change
- Website deploy checkout no longer persists the checkout credential.
- Added dependency review on PRs, rejecting introduced high/critical severity known vulnerabilities when GitHub dependency review is available.

## External administrator gates (must be evidenced)
1. Organization MFA enforced, privileged memberships and GitHub Apps reviewed.
2. Branch rules: required PR reviews and passing checks, no unauthorized bypass.
3. GitHub Pages environment restricts deployment to protected main; OIDC policy reviewed.
4. DNS registrar, GitHub and legacy Netlify accounts: MFA, role audit and recovery plan.
5. Verify actual live site HTTPS, CSP, HSTS and response headers; Netlify config is not a GitHub Pages security-header guarantee.
6. Enable dependency graph, Dependabot alerts and secret scanning where supported.
7. Pin GitHub Actions to verified upstream immutable commit SHAs after provenance review; tags remain mutable until then.
8. Test incident response, recovery, rollback, human publication approval attribution and audit logs.

## Evidence rules
For each gate record control ID, setting URL or redacted screenshot, verified timestamp, verifier, result, exception and retest. Never commit tokens, sensitive screenshots or internal credentials to a public repository. CI passing is not proof of external admin configuration.

## Closure
The full ZTA objective remains **open** until external administrator controls and actual deployed responses are verified. The website's static public read access is intentional and compatible with zero-trust principles.
