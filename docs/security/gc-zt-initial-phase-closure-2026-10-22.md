# GC-ZT — Initial website hardening phase closure record

**Decision date:** 2026-10-22  
**Decision:** CLOSE initial website security-hardening development phase  
**Approval authority:** Governance Commons sole maintainer, explicit direction in project conversation  
**Scope:** Public website repository `governancecommons/governance-commons-www`; does **not** include Portal, App, Registry or Observatory Core implementations  
**Assurance:** OPEN — no full Zero Trust verification/certification or external audit attested

## Closure basis

- Protected `main` PR and CI workflow and production build/deploy/live verification operational.
- GitHub Actions referenced by immutable full commit SHA; job-scoped permissions and non-persistent checkout credentials are present.
- Accessibility and live content checks have bounded passing evidence.
- HTTP security header gaps, administrative trust boundaries and ongoing exception are explicitly identified rather than hidden.
- Three-mode approval governance policy (SOLO / PORTAL-GOVERNED / INDEPENDENT) and single-maintainer exception accepted, with review due **2027-01-20**.
- Recovery runbook, non-disruptive desk tabletop and publication integrity fixture tests documented, with live operational recovery **not exercised**.
- Observational deployment fidelity manifest and byte comparisons added; first live observation recorded seven matches and one HTTP 503. Three-attempt transient retry follow-up merged, with next observation still required.
- GC Portal publication authorization consumer contract defined in GC-ZT-12; implementation is a separate Portal project responsibility.

## Authoritative reference

[GC-ZT-08 evidence and assurance register](gc-zt-08-evidence-assurance-register.md), **Initial website hardening phase closure**, contains the prioritized **R-01 through R-11 residual backlog** with ownership boundaries and reopening criteria. This closure record must not be used to overwrite or waive any open issue. Each future item requires dated evidence and an explicit disposition.

## Deployment evidence

[Successful production workflow following GC-ZT-12](https://github.com/governancecommons/governance-commons-www/actions/runs/39820709771), commit `5550d273312c0227c9320b2a121cb261ca5ae045`. Production verification of this particular closure change is pending its post-merge workflow; update evidence only once observed.

## Release and authority boundaries

The website remains publicly served with established PR/CI protections; no DNS, hosting, production security rules, credentials or Portal authorities are changed by this closure. Remaining assurance work is tracked in the register, not described as completed. A future Portal approval implementation cannot be silently substituted for existing GitHub checks.

**Final determination:** Initial website ZTA-oriented hardening **development phase CLOSED**; security assurance, risk acceptance for missing headers, operational recovery exercises, external administrator checks and independent review **NOT CLOSED**.
