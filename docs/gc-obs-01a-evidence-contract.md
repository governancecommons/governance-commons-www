# GC–OBS.01A — Evidence and Publication Contract

Status: research implementation; not a certification program.

## Evidence classes
- `documentation`: a claim sourced from provider or standards documentation, not independently tested.
- `third-party-evaluation`: an externally reported measurement with identified evaluator and methodology.
- `gc-evaluation`: a GC-executed reproducible measurement with pinned test inputs and runtime.
- `governance-observation`: recorded governance properties, not proof of conformance.
- `conformance-result`: a versioned validator report tied to an explicit specification and subject.

No evidence class implies endorsement by a standards body.

## Publication rule
New comparative or conformance claims MUST include an immutable subject/version identifier, exact source URL, captured timestamp, evaluator, method/version, limitations, and a human approval record. Measurement records additionally require task, sample size, conditions, metric units, and reproducibility artifact. Unknown is never zero. A source-linked catalog entry is not an independently verified claim.

## Initial acceptance
1. Preserve the existing 14-entry editorial catalog and its filters.
2. Validate identity, source URLs, evidence classification, and unique IDs.
3. Reject benchmark or certification language without corresponding evidence and approval.
4. Keep model performance, agent performance, interoperability and governance as separate dimensions.
5. Block publication of pending-review evidence as verified results.
6. Verify in CI and retain historical evidence instead of overwriting prior results.

## Integration boundaries
Agent Matrix owns agent capability and orchestration contracts; Agent Dossier owns per-agent declarations; Agent Roster owns curated selections; Registry owns governance/conformance contracts. Observatory references these versioned sources and does not silently import private records.

## Increment sequence
A: evidence schema and publication tests; B: reviewed source snapshots; C: versioned identity ingestion; D: benchmark result contract and historical comparison. Do not publish rankings before D passes.
