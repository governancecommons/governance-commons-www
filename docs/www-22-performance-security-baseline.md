# GC-WWW-22 — Performance and security baseline

Status: **measurement workflow proposed; no results claimed yet**.

## Method

The manual `Measure website performance and security baseline` workflow measures the **published** homepage using Lighthouse (Chromium) and collects read-only HTTP header responses from the homepage, About, Observatory and Conformance routes.

- Lighthouse JSON captures reproducible **lab** scores, network/device emulation and individual audit findings. Scores vary by runner, network and tool version; do not treat one run as a Service Level Objective or Core Web Vitals field sample.
- A Node-based collector stores HTTP status, fetch duration, content type, cache control, and presence/values of the following headers: HSTS, CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, Cross-Origin-Opener-Policy.
- Missing response headers warrant risk review; they **do not automatically prove an exploitable vulnerability**. Static GitHub Pages hosting may not support custom headers. Avoid modifying DNS/hosting or asserting zero-trust architecture on this evidence.
- This workflow does not perform dependency scanning, penetration tests, TLS configuration scoring, authentication, privacy review, or vulnerability exploitation. Existing dependency/CI workflows remain independent.

## Baseline run procedure

1. Merge the change after PR checks pass.
2. GitHub Actions → `Measure website performance and security baseline` → Run workflow on `main`.
3. Save the run URL, commit SHA, UTC timestamp and `www-22-performance-security-baseline` artifact.
4. Evaluate scores and missing headers as **findings**. Decide whether any warrant corrective PRs; adopt performance budgets only after baseline, repeat measurements and explicit agreement on thresholds.
5. Preserve any accepted exceptions with rationale, especially GitHub Pages limitations.

| Acceptance item | Status |
| --- | --- |
| Workflow code review | PENDING |
| First recorded Lighthouse audit | NOT RUN |
| First HTTP security-header sample | NOT RUN |
| Prioritized findings and severity review | NOT STARTED |
| Performance/security conformity claim | NONE |

No production deployment configuration is modified by this objective.
