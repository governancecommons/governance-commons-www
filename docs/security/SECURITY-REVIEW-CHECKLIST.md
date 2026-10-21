# GC–ZT.01 external configuration verification

These checks require organization/site administrator access and must not be inferred from a green CI run.

- [ ] GitHub organization enforces MFA for all privileged identities; recovery procedures documented
- [ ] Review members, outside collaborators, GitHub Apps and fine-grained token scopes
- [ ] Main branch requires PR review, passing checks, and prevents unauthorized bypass
- [ ] Pages deployment environment is restricted to main and protected as appropriate
- [ ] DNS registrar and hosting accounts use MFA; verify authoritative DNS and actual serving host
- [ ] Test production HTTPS/TLS, redirects and response headers (HSTS, CSP, X-Content-Type-Options, Referrer-Policy)
- [ ] Confirm no tokens/secrets in public build artifacts, commit history or workflow logs
- [ ] Confirm vulnerability reporting route and incident response ownership
- [ ] Verify approved evidence publication is attributable to authenticated human reviewer
- [ ] Capture evidence URL, reviewer, timestamp, scope, outcome, remediation and retest for each control

**Until verified:** mark each item unknown, not passed.
