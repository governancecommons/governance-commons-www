export type ComponentResource = {
  label: string;
  href: string;
};

export type Component = {
  slug: string;
  shortName: string;
  name: string;
  category: string;
  role: string;
  version: string;
  license: string;
  maturity: string;
  baseline: string;
  scope: string;
  summary: string;
  repo: string;
  resources: ComponentResource[];
  capabilities: string[];
  adoption: string[];
  conformance: string;
};

export const components: Component[] = [
  {
    slug: "agent-dossier",
    shortName: "Dossier",
    name: "Agent Dossier",
    category: "Released specifications",
    role: "Per-agent governance specification",
    version: "1.1.0",
    license: "Apache-2.0",
    maturity: "Released",
    baseline: "Pinned in GC v1.2.0",
    scope: "Per-agent identity, authority, handoff, telemetry, and audit contracts.",
    summary: "Declare what an agent may do, how it hands work off, and which evidence it must preserve before execution begins.",
    repo: "https://github.com/governancecommons/agent-dossier",
    resources: [
      { label: "v1.1.0 instance schema", href: "https://github.com/governancecommons/agent-dossier/blob/v1.1.0/schemas/agent-dossier-instance.schema.json" },
    ],
    capabilities: ["Identity and authority boundaries", "Structured handoff envelopes", "Runtime constraints and failure handling", "Portable audit and telemetry declarations"],
    adoption: ["Pin Agent Dossier v1.1.0 or another explicitly selected release.", "Create a dossier document for each governed agent role.", "Use the published Python toolkit only for versions it explicitly supports; otherwise document manual checks."],
    conformance: "Python governance-commons 0.2.0 provides structural dossier validation. This is self-reported conformance, not certification.",
  },
  {
    slug: "agent-matrix",
    shortName: "Matrix",
    name: "Agent Matrix",
    category: "Released specifications",
    role: "Multi-agent governance specification",
    version: "1.4.0",
    license: "MIT",
    maturity: "Released",
    baseline: "Pinned in GC v1.2.0",
    scope: "Multi-agent capability, routing, trust, safety, and coordination.",
    summary: "Model how an agent fleet is selected, trusted, observed, recovered, and composed across a governed system.",
    repo: "https://github.com/governancecommons/agent-matrix",
    resources: [
      { label: "v1.4.0 root schema", href: "https://github.com/governancecommons/agent-matrix/blob/v1.4.0/schemas/agent-matrix.schema.json" },
    ],
    capabilities: ["Capability and specialization profiles", "Routing, trust, and safety constraints", "Handoff, recovery, and escalation rules", "MCP, A2A, and CloudEvents bindings"],
    adoption: ["Pin Agent Matrix v1.4.0 or another explicitly selected release.", "Describe the governed agents, routing policy, and trust constraints.", "Use the repository validator for development checks and label public evidence manual or provisional."],
    conformance: "The shared published gc-validate tool does not currently expose Agent Matrix validation. Repository tests are implementation evidence, not independent certification.",
  },
  {
    slug: "ons",
    shortName: "ONS",
    name: "Ontic Namespace Structure",
    category: "Released specifications",
    role: "Naming and namespace specification",
    version: "1.3.0",
    license: "MIT",
    maturity: "Released",
    baseline: "Pinned in GC v1.2.0",
    scope: "Naming grammar, namespace identity, collision rules, and validation IDs.",
    summary: "Give repositories, governance records, tools, and runtime objects canonical names that remain legible across project boundaries.",
    repo: "https://github.com/governancecommons/ons",
    resources: [
      { label: "v1.3.0 root schema", href: "https://github.com/governancecommons/ons/blob/v1.3.0/schemas/ons.schema.json" },
    ],
    capabilities: ["Canonical casing and separator contracts", "Namespace roots and qualification authority", "Collision scope and registry semantics", "Stable validation rule identifiers"],
    adoption: ["Pin ONS v1.3.0 or another explicitly selected release.", "Declare project namespace roots and collision scope.", "Record the exact validator and ruleset version used; current toolkit/release version alignment still needs reconciliation."],
    conformance: "Automated ONS validation exists, but the current toolkit reports ONS v1.4.0 while the latest ONS repository release is v1.3.0. Do not use that mismatch as proof of v1.3.0 conformance.",
  },
  {
    slug: "agent-project-orchestrator",
    shortName: "APO",
    name: "Agent Project Orchestrator",
    category: "Reference runtime",
    role: "Execution runtime candidate",
    version: "1.1.0",
    license: "Undeclared in repository",
    maturity: "Candidate",
    baseline: "Historically pinned in GC v1.2.0",
    scope: "Project-level task graphs, dispatch, handoffs, recovery, telemetry, and audit.",
    summary: "APO is not a specification. Under RFC-0001 it remains a reference-runtime candidate until its vendored Agent Dossier schemas have release provenance and automated drift detection.",
    repo: "https://github.com/governancecommons/agent-project-orchestrator",
    resources: [],
    capabilities: ["Goal intake and task graph compilation", "Governed dispatch and handoff controls", "Recovery and resource-budget enforcement", "Structured telemetry and evidence output"],
    adoption: ["Treat APO as an implementation choice, not a GC conformance target.", "Inspect its runtime and packaging limitations before use.", "Do not claim reference-runtime status until RFC-0001 A-1 is satisfied."],
    conformance: "No umbrella conformance badge is available for APO. Runtime tests demonstrate behavior in the repository; they do not certify an adopter.",
  },
  {
    slug: "agent-team-protocol",
    shortName: "ATP",
    name: "Agent Team Protocol",
    category: "Emerging work",
    role: "Fleet delegation governance specification",
    version: "0.1.0",
    license: "Undeclared in repository",
    maturity: "Pre-release",
    baseline: "Not in GC v1.2.0",
    scope: "Delegation, trust topology, shared audit, escalation, and team lifecycle.",
    summary: "ATP is active pre-release work for bounded delegation and human-agent team governance. It is not part of the released three-spec family.",
    repo: "https://github.com/governancecommons/agent-team-protocol",
    resources: [],
    capabilities: ["Delegation grants and revocation", "Delegation-tier topology", "Shared fleet audit semantics", "Fleet escalation and dissolution"],
    adoption: ["Evaluate as pre-release material only.", "Do not claim GC v1.2.0 inclusion.", "Do not publish a conformance badge until a release and public criteria exist."],
    conformance: "No public conformance profile is available.",
  },
  {
    slug: "governance-record",
    shortName: "Record",
    name: "Governance Record",
    category: "Evidence contracts",
    role: "Durable governance evidence contract",
    version: "1.0.0",
    license: "MIT toolkit implementation",
    maturity: "Evolving contract",
    baseline: "Implemented in Python toolkit 0.2.0",
    scope: "Durable evidence for authority, approval, action, handoff, lifecycle, and provenance.",
    summary: "Governance Record is a distinct evidence boundary owned by the Registry/toolkit implementation. It records evidence; it does not issue runtime authority or execute work.",
    repo: "https://github.com/governancecommons/governance-commons-registry",
    resources: [
      { label: "Governance Record schema", href: "https://github.com/governancecommons/governance-commons-registry/blob/main/governance_commons/schemas/governance-record.schema.json" },
    ],
    capabilities: ["Provenance-bearing evidence records", "Authority and approval references", "Action and handoff evidence", "Lifecycle and revocation evidence"],
    adoption: ["Use it as an evidence format, not an authority source.", "Validate records with the Python toolkit 0.2.0.", "Preserve source-system authority and provenance references."],
    conformance: "Python governance-commons 0.2.0 validates Governance Record documents and emits the shared ConformanceReport format.",
  },
  {
    slug: "conformance-report",
    shortName: "Report",
    name: "ConformanceReport",
    category: "Evidence contracts",
    role: "Validation result contract",
    version: "1.0.0",
    license: "Apache-2.0 umbrella repository",
    maturity: "Implemented contract",
    baseline: "Shared validator output format",
    scope: "Machine-readable rule results, summary counts, target version, profile, and overall outcome.",
    summary: "ConformanceReport standardizes what validators report. It does not make unsupported validators exist and does not turn self-reported evidence into certification.",
    repo: "https://github.com/governancecommons/governance-commons",
    resources: [
      { label: "ConformanceReport schema", href: "https://github.com/governancecommons/governance-commons/blob/main/docs/conformance/conformance-report.schema.json" },
    ],
    capabilities: ["Named target specification and version", "Per-rule pass, fail, or skip results", "Profile and aggregate result", "Portable validation evidence"],
    adoption: ["Capture the exact validator name and version.", "Retain the report with the validated artifact.", "Describe manual checks separately; do not encode them as automated passes."],
    conformance: "This is the result format used by supported validators, not an independent certification service.",
  },
  {
    slug: "gc-toolkit",
    shortName: "Toolkit",
    name: "GC Toolkit / Registry",
    category: "Reference tooling",
    role: "SDK, validators, CLIs, and evidence utilities",
    version: "0.2.0",
    license: "MIT",
    maturity: "Alpha",
    baseline: "Python 0.2.0 published; npm 0.2.0 pending",
    scope: "Reference implementation for supported validation, conformance reporting, discovery, and evidence contracts.",
    summary: "The toolkit implements selected contracts. It is tooling, not a specification, registry authority, certification body, or promise of full cross-language parity.",
    repo: "https://github.com/governancecommons/governance-commons-registry",
    resources: [
      { label: "Python package", href: "https://pypi.org/project/governance-commons/0.2.0/" },
      { label: "Toolkit source", href: "https://github.com/governancecommons/governance-commons-registry" },
    ],
    capabilities: ["ONS and Agent Dossier validation in Python", "Governance Record validation in Python", "Capability-contract validation and discovery", "ConformanceReport output"],
    adoption: ["Install a specific published package version.", "Check the language-specific support matrix before relying on a validator.", "Do not claim npm 0.2.0 availability until it is present in the registry."],
    conformance: "Python and JavaScript surfaces are not at feature parity. npm currently exposes 0.1.1; the 0.2.0 source and Trusted Publishing workflow do not prove publication.",
  },
];

export const getComponent = (slug: string) => components.find((component) => component.slug === slug);
