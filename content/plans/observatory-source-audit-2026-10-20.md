# Observatory source audit — 2026-10-20
Status: evidence audit; no ranking publication authorized

## Agent Roster
Repository: governancecommons/agent-roster (private at inspection).
Canonical data: roster.yaml, meta.version 1.3.0; meta.last_verified 2026-08-07; 16 paid + 16 free entries described in README.
Taxonomy: planning, scaffolding, coding, review_audit. README's generated top-four lists are editorial selections, not independently reproduced benchmarks.
Workflow .github/workflows/monthly-review.yml schedules an issue on the first of each month; it does not validate provider APIs, update records, benchmark systems or approve changes. .github/workflows/validate.yml validates YAML/schema and generated README on changes; it does not substantiate ranking accuracy.
Source includes health_status: unverifiable for some entries, model pricing and benchmark references with older as_of dates. All public market facts require independent primary-source re-verification. Private repository content must not be copied to the public website without explicit publication review.

## Agent Matrix
Repository: governancecommons/agent-matrix (private at inspection).
README labels v1.4.0 Stable; describes a versioned capability, trust, routing, handoff, recovery and observability governance standard, not an agent product catalog or benchmark dataset.
Its schema and compatibility profiles need a version pin and separate mapping before reuse. Do not infer public runtime interoperability from schema coverage.

## Registry
governancecommons/governance-commons-registry README: alpha reference implementation, Python and npm SDK 0.2.0, with distinct feature surfaces. No evidence of an automated market catalog or comparative benchmark feed from the README.

## Publication decision
- Publish only source provenance, methodology and integration status for now.
- Do not publish the 32 roster entries, vendor price figures or ranking tables until authorization and fresh provider/benchmark verification.
- Model, agent product and governance profile are distinct entity types.
- Add a public Observatory source-status page describing these boundaries.
- Next implementation: a publication-safe curated manifest (explicit license and review) and a verified external model/protocol source registry, then data normalization and independent benchmark ingestion.
