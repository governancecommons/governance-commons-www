# Ecosystem Directory & AI Systems Observatory — implementation brief
Status: PROPOSED / implementation backlog (not released)
Recorded: 2026-10-19
Owner: Governance Commons website editorial workflow
Scope: public website content and evidence-backed comparison services; no changes to normative GC specifications.

## Outcomes
1. Publish a navigable, cited AI Governance Ecosystem Directory.
2. Publish an AI Models, Agents & Protocols Observatory with transparent, reproducible rankings where comparable evidence exists.
3. Reuse Agent Matrix and Agent Roster as *sources or governed concepts only after their current schemas, versions, publication permissions and update jobs are verified*. Do not conflate Agent Matrix specification status with a market-wide agent catalog.
4. Human review is required before public publication or any relationship/benchmark interpretation.

## Ecosystem directory
Landing page: /ecosystem (extend existing page). Profile pattern: /ecosystem/<slug>.
Prioritized source-backed profiles: OECD, NIST, ISO/IEC, IEEE, EU AI Act / relevant EU institutions, AAIF, MCP, A2A, W3C, IETF, OASIS, OWASP, C2PA, OpenTelemetry, Linux Foundation, CEN/CENELEC, ETSI, MLCommons.
Second wave: UNESCO, UN initiatives, Stanford CRFM, Frontier Model Forum, Algorithmic Justice League, Connected by Data, agent frameworks including AutoGen, Microsoft Agent Framework, Magentic-One, LangGraph, CrewAI.
AGF/AAP: identity and authoritative sources unresolved; do not publish a profile until verified.
Organization, legal instrument, specification, protocol, framework and software project are different entity types. Use explicit type labels.

Each profile requires: name, entity type, official URL, authoritative source links, remit and offerings, relevant standards/publications with exact version/date, scope and lifecycle, verified date, GC relevance, overlap vs difference, relationship classification, mapping citations, editorial reviewer, and update history. Relationship values: referenced, conceptual overlap, independent mapping, tested interoperability, contribution, formal affiliation (requires direct documentary proof). Never imply endorsement, equivalence, compliance, or certification from conceptual overlap.

## Observatory
Landing: /observatory; subviews /observatory/models, /observatory/agents, /observatory/protocols, /observatory/methodology, /observatory/changelog.
Model catalog: provider, exact model ID/version, release/retirement status, modalities, context and tool support, license/availability, sources and checked-at time.
Agent catalog: product/project, developer, implementation and model dependencies when disclosed, capabilities, tools, autonomy level, deployment mode, source/license, evidence status, last seen, relationship to GC Agent Roster records if schema-compatible.
Protocol catalog: owner, normative version, maturity, interoperability scope, governance capabilities, evidence claims, supported implementations, reference URLs, last verified.
Separate rankings: model capability, agent task performance, protocol conformance/interoperability, governance evidence completeness. NEVER collapse these into a single leaderboard. GC protocol proposals and GC implementations must be evaluated under the same published rules as external candidates and visibly labeled as first-party.
Only rank entries with comparable test conditions. Missing data = 'not evaluated', never zero. Label vendor-reported vs independently reproduced results. Track benchmark suite/version, dataset, sample size, task definition, hardware/runtime, model snapshot, temperature/settings, cost, latency, success metric, confidence intervals where appropriate, evaluator, date, code/data provenance, contamination limitations, and reproducibility.
Suggested measures: task success, reliability across repeats, latency percentiles, cost per successful task, security and boundary violations, delegation fidelity, revocation behavior, evidence completeness, and human-oversight interventions. Not all metrics apply to every subject. Explicitly separate capability, safety, governance, and interoperability.
Do not describe GC governance record completeness as regulatory compliance, certification, or model safety.

## Data pipeline & publication gates
Source registry -> fetch official primary sources -> normalize versioned entries -> deduplicate and detect changes -> run link/source checks -> draft factual changes -> independent claim checks -> reviewer approval -> publish versioned snapshot -> changelog and correction pathway.
Scheduled draft ingestion may run at 02:00 America/Los_Angeles with a target human approval window before 04:00; NO automatic publish before approval. If unreviewed, hold previous public snapshot and display freshness timestamp.
A scheduled fetch is not proof of a fresh catalog. Distinguish source release dates, observed dates, ingestion dates, and editorial publication dates.
For third-party benchmarks respect licenses, attribution, usage restrictions, API limits, and original methodology. Link to source rather than copy protected datasets or scores without permission.

## Initial delivery sequence
P0: verify site build/deployment, responsive navigation, existing /ecosystem and standards-landscape, Agent Matrix and Agent Roster schema and update jobs; inventory canonical authoritative URLs.
P1: publish directory landing and 5 high-quality source-verified profiles (OECD, NIST, ISO/IEC, AAIF, W3C) with clear status and citations.
P2: add MCP, A2A, OWASP, C2PA, OpenTelemetry, IEEE, EU AI Act, OASIS, IETF; expose relationship graph and corrections.
P3: publish observatory methodology and *unranked* source-backed catalogs with freshness indicators; ingest from verified Agent Roster/Matrix sources only after contract check.
P4: pilot a narrow reproducible benchmark (e.g. protocol governance evidence conformance) and publish results, datasets and caveats; expand to agent and model leaderboards only with comparable measurements.
P5: editorial automation with draft queue, review and publication controls, alerts for stale sources, benchmark drift and corrections.

## Acceptance gates
- Every material factual claim and external relationship cites authoritative sources.
- No invented benchmark values, versions, partnerships or rankings.
- Exact model and protocol versions; evaluation methods and limitations visible.
- Links, mobile navigation, accessibility and build pass.
- Editorial approval recorded before publication.
- Existing GC release and RFC-0001 boundary statements remain intact.
- Publish status clearly separates planned, beta, and released functionality.
