# GC–OBS.02 — Observatory Core / Website Separation

**Status:** Proposed architecture, implemented as a reviewable documentation change. No Core repository or migration is claimed.

## Decision
The public Astro website is a presentation and distribution consumer, **not** the authority for evidence, evaluations, benchmark rankings, or publication approvals. A separate `governancecommons/observatory-core` repository is proposed as the future authority for the Observatory evidence pipeline and versioned publication exports. Repository creation requires a separate implementation step.

## Ownership boundaries

| System | Owns | Observatory relationship |
| --- | --- | --- |
| Observatory Core (proposed) | Source snapshots, ingestion adapters, evidence ledger, benchmark execution metadata, approval decisions, immutable published exports | Publishes validated public artifacts |
| GC Website (`governance-commons-www`) | Navigation, accessible presentation, catalog filtering, charts and download links | Consumes approved exports only |
| GC Registry | Normative governance specifications, schemas and conformance contracts | Core references pinned releases |
| Agent Matrix | Agent capability, trust, coordination and classification definitions | Core references pinned versions |
| Agent Dossier | Agent identity, authority, constraints and provenance declarations | Core references approved/public records |
| Agent Roster | Curated selections and their editorial review history | Core ingests permitted, versioned records |

No system silently assumes authority over another's claims. Public data must not expose private source records.

## Data flow

```text
Official sources / published Matrix, Dossier, Roster, Registry versions
                |
                v
Core intake -> immutable source capture -> evidence validation
                |                         |
                v                         v
         reviewer decision       evaluation / conformance metadata
                |                         |
                +-----------+-------------+
                            v
              approved publication manifest
                            |
                versioned JSON export
                            |
                            v
                 GC Astro website
             (read-only presentation)
```

## Publication export contract (proposed v1)

An export directory is immutable once published, with a versioned `manifest.json` and one or more record files. Minimum manifest fields:
- `schemaVersion`: `1.0.0` (contract version; distinct from catalog version)
- `publicationId`: stable unique release identifier
- `generatedAt`: UTC ISO 8601 timestamp
- `recordsUrl`: HTTPS URL for a JSON record bundle
- `recordsSha256`: lowercase SHA-256 of exact published bundle bytes
- `recordCount`: nonnegative integer
- `approvedBy`: human reviewer identifier
- `approvalRecordId`: immutable review reference
- `sourceCommit`: full Core commit SHA
- `methodologyVersion`: version of evaluation/publication methodology

Each published record must include a stable subject identity and version, evidence class, source URL, source capture timestamp, limitations, and an approval reference. Evaluation measurements additionally identify test conditions, sample size, evaluator, metric units, and reproducibility artifacts. Unknown measurements remain absent/null, never zero.

The website must reject unsupported schema versions, checksum mismatches, missing approvals, and unrecognized evidence classes. It must show publication date and methodology and must not convert documentation-only entries into benchmark rankings.

## Migration without downtime

1. **OBS.02A — contract and fixtures:** Document ownership, export shape and failure behavior; keep existing Astro catalog live. (This document.)
2. **OBS.02B — Core bootstrap:** Create separate repository with schema, validation, positive/negative fixtures, and CI. No website integration yet.
3. **OBS.02C — publication pipeline:** Produce deterministic, approved, checksum-pinned exports. Backfill existing 14 documentation-only catalog entries without claiming independent verification.
4. **OBS.02D — dual-read verification:** Website fetches a pinned export at build time; compare counts, IDs, links, labels, and navigation against existing catalog. Fail closed on invalid export; keep last approved release available.
5. **OBS.02E — authority cutover:** Remove website-owned authoritative evidence data only after parity checks, CI, accessibility, rollback tests and human approval. Retain UI fallback to last approved bundle.
6. **OBS.02F — source review and evaluation:** Add periodic source freshness review, historic snapshots, and later reproducible benchmark runs under independent methodologies.

## Required release gates

- Deterministic schema validation, negative fixtures and checksum tests
- Immutable source and approval provenance
- Independent versioning of Core schema, export contract and UI
- CI checks on Core and Website; publication requires human approval
- No rankings, certifications or external endorsements without measured evidence
- Public/private data separation and provenance audit
- Rollback to previous approved export on ingest/build failure

## Current state and limitations

The website currently holds a 14-record editorial documentation-only catalog, source-review placeholders and initial publication validation scripts. OBS.01A passed its PR CI and was merged. This proposal **does not** create the Core repository, migrate the data, publish a new export, or change the deployed site. The first engineering implementation should be OBS.02B after this architecture review.
