# GC-WWW-21 — RFC-0001 G-1 evidence register

Status: **EVIDENCE COLLECTION READY; NEW RUN NOT YET RECORDED**.

Authoritative definition: [RFC-0001 §3.3](https://github.com/governancecommons/governance-commons/blob/main/rfcs/RFC-0001-public-boundary-model.md):
**G-1: Agent Dossier canonical schema URLs resolve.** This is one of five independent activation gates (G-1–G-5); completing G-1 alone does not activate the RFC.

## Existing independently observed evidence

- On 2026-10-22 an earlier [live website verification](https://github.com/governancecommons/governance-commons-www/actions/runs/39805263627) completed build, Pages deploy and the eight-endpoint production verifier successfully, including the five Agent Dossier URLs.
- The run verifies HTTP status and JSON `$id` for each canonical schema; it does **not** verify domain settings or domain ownership.

## Reproducible G-1 collection

1. GitHub Actions → **Collect RFC-0001 G-1 evidence** → **Run workflow** on `main`.
2. Inspect the five schema rows, timestamp and source SHA in the workflow run. Download the `rfc0001-g1-evidence` JSON artifact.
3. Preserve the run URL and SHA, check that all five are HTTP 200 with matching JSON `$id`; record who reviewed the evidence and the decision.
4. DNS A, AAAA, CNAME and TLS details are supporting public observations, not independent proof of DNS administrative control or GitHub Pages settings.
5. If external configuration must be attested, separately record an authorized review of GitHub Pages custom domain / HTTPS and authoritative DNS management. Do not describe them as proven by a public HTTP request.

## Gate decision record (pending)

| Field | Value |
| --- | --- |
| G-1 normative requirement | Five canonical Agent Dossier schema URLs resolve |
| Repeatable test | `scripts/verify-g1-evidence.mjs` + manual workflow |
| Current decision | PENDING REVIEW of a new G-1-specific run |
| Reviewer / UTC / workflow URL | NOT RECORDED |
| GitHub Pages settings independently attested | NOT VERIFIED |
| Authoritative DNS administration independently attested | NOT VERIFIED |
| TLS chain observed in new run | NOT YET RECORDED |
| G-2 through G-5 | SEPARATE / NOT ASSESSED HERE |
| RFC-0001 activation | **NOT ESTABLISHED** |

This document does not redefine or expand the normative G-1 gate. Its independent hosting checks are additional operational assurance, not RFC acceptance predicates.
