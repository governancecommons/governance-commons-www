# GC-ZT-05 — Live HTTP security posture and hosting constraint decision

Status: **ASSESSMENT RECORDED / HEADER REMEDIATION NOT VERIFIED**.
Scope: public read-only static website at https://governancecommons.org on GitHub Pages. This is **not** a zero-trust attestation.

## Observed evidence

- [Production HTTP/Lighthouse baseline — run 39808911181](https://github.com/governancecommons/governance-commons-www/actions/runs/39808911181), 2026-10-22, source commit `57bc386ee64bb17605a15925ae6b3f5434408aea`.
- Four routes fetched HTTP 200 at final canonical URLs; slashless secondary routes return a normal 301 trailing-slash redirect.
- On the **final HTML response**, the collector did not observe `Strict-Transport-Security`, `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, or `Cross-Origin-Opener-Policy`.
- Lighthouse baseline: performance 75, accessibility 100, best practices 100, SEO 100. These are lab scores, not security assurance.
- HTTPS and canonical schema responses were observed passing. Missing HSTS is not proof that HTTPS itself is broken.

## Control decisions and limitations

| Control | Why it matters | Current evidence | Next step |
| --- | --- | --- | --- |
| CSP response header | Restrict script/style/resource sources and defend in depth against injections | Missing; inline scripts and style exist in Astro pages | Inventory inline scripts, external resources and existing runtime behavior; design and **test** policy before rollout |
| HSTS | Request browsers use HTTPS on subsequent visits | Missing from observed response | Needs serving-edge response-header control; consider HSTS only after checking subdomain/redirect implications; no blind preload or includeSubDomains |
| X-Content-Type-Options | Restrict MIME sniffing | Missing | Needs actual server/CDN header support |
| Referrer-Policy | Bound outgoing referrer information | Missing | Evaluate `strict-origin-when-cross-origin` or stricter policy; document intended privacy behavior |
| Permissions-Policy | Limit use of selected browser APIs | Missing | Scope APIs used by site; set a minimal policy if edge delivery becomes available |
| COOP | Process/window isolation boundary | Missing | Evaluate cross-origin interaction impact before setting |
| Clickjacking protection | Frame embedding restrictions | Not measured by initial six-header collector | Review `frame-ancestors` in response CSP; meta CSP **cannot** enforce this directive |

GitHub Pages has historically lacked site-owner custom response-header configuration. A GitHub community staff response confirmed the limitation; this should be re-checked before any infrastructure decision. The legacy `netlify.toml` is **not** authoritative for a GitHub Pages deployment, and creating a `_headers` file alone will not make GitHub Pages emit response headers.

## Deployment-safe options

**Option A — retain GitHub Pages (current default):** continue TLS and published-content checks; inventory content-security risks and implement app-level controls that can be verified. A carefully tested HTML `meta http-equiv="Content-Security-Policy"` can enforce *some* resource restrictions, but it is **not equivalent** to a CSP response header: notably it does not implement `frame-ancestors`, report-only CSP or some other header-only capabilities. It cannot supply HSTS or the other missing response headers. Do not add a guessed policy that could break the homepage and Observatory.

**Option B — add a controllable edge or hosting layer (separate, explicitly approved change):** a reverse proxy/CDN or alternate static host could attach HSTS, CSP, MIME and other headers. This changes DNS, TLS termination, deployment and operational trust boundaries and demands an owner-approved threat model, migration/rollback plan and post-cutover verification. **Not authorized by this assessment.**

## Actions required before closure

- [ ] Verify actual production serving host, authoritative DNS and GitHub Pages settings with administrator evidence.
- [ ] Test resource inventory and CSP in a staging or deliberately scoped browser test, including Observatory interactions.
- [ ] Decide whether the inability to send headers is an accepted static-host limitation or requires a consciously approved hosting-edge change.
- [ ] Record security-control owners, exceptions, dates, compensating controls and retest intervals.
- [ ] Test HTML response headers on canonical final responses after remediation.
- [ ] Do not claim complete ZTA or security-header hardening from successful TLS, Lighthouse 100 or a missing-header inventory.

## External platform references

- GitHub community discussion: https://github.com/orgs/community/discussions/54257 (staff stated custom response headers were unsupported as of 2023; current support must be revalidated).
- GitHub Pages custom deployment docs: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- Cloudflare Pages custom header documentation is an **alternative hosting precedent**, not evidence the current site uses Cloudflare: https://developers.cloudflare.com/pages/configuration/headers/
