# Intelligence-to-Governance Change Intake v0.1

**Purpose:** Turn verified daily intelligence into reviewable opportunities to improve Governance Commons specifications, implementations, tests, and documentation.

**Authority boundary:** News is an observation, not a normative requirement. A vendor announcement, benchmark, incident report, draft regulation, or proposed standard cannot directly change GC canon or claim external endorsement. Human review and the applicable repository governance process remain mandatory.

## Required intake fields

- `intake_id`: unique identifier
- `observed_at`: timestamp of GC observation
- `development`: short factual description, separate from interpretation
- `source_links`: original source URLs and relevant evidence
- `source_status`: pending / verified / disputed
- `source_type`: primary_standard / policy / incident / research / vendor / reporting
- `relevance`: specific GC component, document, or process affected
- `current_gc_behavior`: evidence-linked description of existing behavior (or unknown)
- `gap_hypothesis`: proposed gap; explicitly provisional
- `impact`: safety, accountability, interoperability, security, legal, performance, or documentation
- `urgency`: critical / high / normal / low with rationale
- `disposition`: adopt / adapt / investigate / monitor / no_change
- `proposed_action`: concrete change or investigation with owner and acceptance criteria
- `compatibility_risks`: versioning, interoperability, conformance, backward compatibility
- `reviewer`, `reviewed_at`, `decision_rationale`: required before accepted change
- `tracking_link`: GitHub issue/PR or governance record reference

## Processing gates

1. **Detect:** identify potentially relevant changes from the daily brief and record provenance.
2. **Verify:** read original material and distinguish confirmed fact from interpretation; reject unsupported claims.
3. **Map:** identify affected GC assets (Agent Dossier, Agent Matrix, Governance Record, Observatory, conformance, SDK, editorial operations).
4. **Compare:** inspect actual GC contract, implementation and test coverage; do not infer gaps from news alone.
5. **Decide:** propose one of the five dispositions with rationale. No-change is a valid outcome.
6. **Implement:** create an issue/RFC or change PR with testable acceptance criteria; require human authorization through existing governance.
7. **Validate and trace:** record conformance results, migration impacts, decision, release version, and source-to-change traceability.

## Daily editorial output

Add a separate **GC Adoption Watch** section to each daily brief with 0–5 prioritized candidates. Each entry states the external trigger, GC relevance, tentative disposition, required evidence, and next decision. Do not turn speculative ideas into approved requirements. If no credible candidates are found, say so.

## Example candidates for October 21, 2026 — unverified intake, not adoption decisions

- **Agent disables its own monitoring:** investigate whether GC authority records distinguish task permissions from permissions to modify oversight controls; review relevant incident primary source first.
- **Hardware-enforced agent isolation:** investigate how an external runtime enforcement attestation could be represented in GC evidence without implying hardware dependence or vendor endorsement.
- **Government agent workflows:** examine provenance of legal/institutional delegation, human approval, and appeal/recourse; compare against current Dossier and Governance Record schemas before proposing changes.

All three examples are **research prompts only**. They are not verified gaps, accepted requirements, or approved changes.
