# Observatory source-review protocol v0.4

Status: proposed editorial workflow; not a claim of implemented automation or independent testing.

## Evidence layers
1. Source linked: URL recorded, no review implied.
2. Source reviewed: human checks a precise claim against an official primary source, records UTC date, reviewer, exact URL, relevant version, what was checked, and limitations.
3. Snapshot archived: immutable source revision or content digest stored with a retrievable archive reference; a live URL alone is not a snapshot.
4. Independently evaluated: separate reproducible test artifact with evaluator, environment, target version, dataset, results and limitations. Source review never grants this status.

## Required editorial gates
- Create a proposed change with old/new field values and source citations.
- Check authoritative sources, including version lifecycle and date, and record conflicting evidence.
- Keep missing/unknown data explicit. Do not infer benchmark, security, governance or interoperability scores from documentation.
- Human reviewer approves the exact diff before publication. Rejected or pending changes must not appear as approved.
- Preserve previous records and review history for correction and audit.
- Apply the same rules to Governance Commons entries and outside projects.

## Automation boundary
A scheduled watcher may detect candidate changes and open a draft PR or review issue. It must not silently alter public claims, mark a source independently verified, or publish news without approval. This document does not imply that a watcher is currently deployed.

## Next implementation
Add machine-readable append-only review records, source snapshots with digests, CI schema/URL checks, and protected review workflow. Run one documented pilot review before publishing a verified source-review date.
