# GC-WWW-21 — RFC-0001 G-1 evidence register

Status: **G-1 CANONICAL URL TEST VERIFIED; FORMAL GATE SIGN-OFF PENDING**.

Authoritative definition: [RFC-0001 §3.3](https://github.com/governancecommons/governance-commons/blob/main/rfcs/RFC-0001-public-boundary-model.md):
**G-1: Agent Dossier canonical schema URLs resolve.** This is one of five independent activation gates (G-1–G-5); completing G-1 alone does not activate the RFC.

## Existing independently observed evidence

- On 2026-10-22 an earlier [live website verification](https://github.com/governancecommons/governance-commons-www/actions/runs/39805263627) completed build, Pages deploy and the eight-endpoint production verifier successfully, including the five Agent Dossier URLs.
- The run verifies HTTP status and JSON `$id` for each canonical schema; it does **not** verify domain settings or domain ownership.

## Dedicated verification evidence (2026-10-22)

- [G-1 evidence run 39806896658](https://github.com/governancecommons/governance-commons-www/actions/runs/39806896658) at source commit `7deba95c47789ac9ac93d103ccd6ee3c1296b895` completed successfully.
- Each of the five canonical Agent Dossier schema URLs returned HTTP `200` with expected canonical JSON `$id`.
- Runner-observed DNS A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`. Runner returned `ENODATA` for apex AAAA and CNAME queries; that is not a failed G-1 URL test.
- Runner inspected the TLS certificate. The certificate fields, exact check time and per-schema records are retained in artifact `rfc0001-g1-evidence`.
- This is sufficient technical evidence that the normative **G-1 URL-resolution condition** was satisfied at that time. Human acceptance and recording of the decision remains separate; it does not declare G-2–G-5 complete or activate RFC-0001.

## Reproducible G-1 collection

1. GitHub Actions → **Collect RFC-0001 G-1 evidence** → **Run workflow** on `main`.
2. Inspect the five schema rows, timestamp and source SHA in the workflow run. Download the `rfc0001-g1-evidence` JSON artifact.
3. Preserve the run URL and SHA, check that all five are HTTP 200 with matching JSON `$id`; record who reviewed the evidence and the decision.
4. DNS A, AAAA, CNAME and TLS details are supporting public observations, not independent proof of DNS administrative control or GitHub Pages settings.
5. If external configuration must be attested, separately record an authorized review of GitHub Pages custom domain / HTTPS and authoritative DNS management. Do not describe them as proven by a public HTTP request.

## Gate decision record (test verified; formal sign-off pending)

| Field | Value |
| --- | --- |
| G-1 normative requirement | Five canonical Agent Dossier schema URLs resolve |
| Repeatable test | `scripts/verify-g1-evidence.mjs` + manual workflow |
| Current decision | **Technical G-1 test PASSED**, 5/5 canonical schema responses; formal gate acceptance not recorded |
| Reviewer / UTC / workflow URL | GitHub Actions automated verifier, 2026-10-22 15:39 UTC, [run 39806896658](https://github.com/governancecommons/governance-commons-www/actions/runs/39806896658); human sign-off NOT RECORDED |
| GitHub Pages settings independently attested | NOT VERIFIED |
| Authoritative DNS administration independently attested | NOT VERIFIED |
| TLS chain observed in new run | Certificate inspection completed in run; detailed certificate stored in JSON artifact, not independently attested |
| G-2 through G-5 | SEPARATE / NOT ASSESSED HERE |
| RFC-0001 activation | **NOT ESTABLISHED** |

This document does not redefine or expand the normative G-1 gate. Its independent hosting checks are additional operational assurance, not RFC acceptance predicates.
