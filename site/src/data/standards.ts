export type Standard = {
  slug: string;
  shortName: string;
  name: string;
  version: string;
  license: string;
  status: string;
  scope: string;
  summary: string;
  repo: string;
  validator: string;
  validatorLabel: string;
  schema?: string;
  capabilities: string[];
  adoption: string[];
};

export const standards: Standard[] = [
  {
    slug: "agent-dossier",
    shortName: "Dossier",
    name: "Agent Dossier",
    version: "1.1.0",
    license: "Apache-2.0",
    status: "Stable",
    scope: "Per-agent identity, authority, handoff, telemetry, and audit contracts.",
    summary:
      "Declare what an agent may do, how it hands work off, and which evidence it must preserve before execution begins.",
    repo: "https://github.com/governancecommons/agent-dossier",
    validator: "https://github.com/governancecommons/agent-dossier/tree/main/tools",
    validatorLabel: "agent-dossier-validator source",
    schema: "/agent-dossier/v/1.0.2/schemas/agent-dossier.schema.json",
    capabilities: [
      "Identity and authority boundaries",
      "Structured handoff envelopes",
      "Runtime constraints and failure handling",
      "Portable audit and telemetry declarations",
    ],
    adoption: [
      "Create a dossier document for each agent role.",
      "Validate it against the versioned schema.",
      "Reference the dossier from project governance and handoff records.",
    ],
  },
  {
    slug: "agent-matrix",
    shortName: "Matrix",
    name: "Agent Matrix",
    version: "1.4.0",
    license: "MIT",
    status: "Stable",
    scope: "Multi-agent capability, routing, trust, safety, and coordination.",
    summary:
      "Model how an agent fleet is selected, trusted, observed, recovered, and composed across a governed system.",
    repo: "https://github.com/governancecommons/agent-matrix",
    validator: "https://github.com/governancecommons/agent-matrix/tree/main/tools",
    validatorLabel: "governance-commons-agent-matrix source",
    schema: "/agent-matrix/v/1.4.0/schemas/agent-matrix.schema.json",
    capabilities: [
      "Capability and specialization profiles",
      "Routing, trust, and safety constraints",
      "Handoff, recovery, and escalation rules",
      "MCP, A2A, and CloudEvents bindings",
    ],
    adoption: [
      "Describe the agents available to the orchestrator.",
      "Declare routing, trust, safety, and recovery behavior.",
      "Run the reference validator against the matrix document.",
    ],
  },
  {
    slug: "ons",
    shortName: "ONS",
    name: "Ontic Namespace Structure",
    version: "1.3.0",
    license: "MIT",
    status: "Stable",
    scope: "Naming grammar, namespace identity, collision rules, and validation IDs.",
    summary:
      "Give repositories, governance records, tools, and runtime objects canonical names that remain legible across project boundaries.",
    repo: "https://github.com/governancecommons/ons",
    validator: "https://github.com/governancecommons/governance-commons-registry",
    validatorLabel: "Python and TypeScript validator source",
    schema: "/ons/v/1.2.0/schemas/ons.schema.json",
    capabilities: [
      "Canonical casing and separator contracts",
      "Namespace roots and qualification authority",
      "Collision scope and registry semantics",
      "Stable validation rule identifiers",
    ],
    adoption: [
      "Declare the ONS version and project namespace roots.",
      "Map local naming domains to the ONS grammar.",
      "Validate names with the reference SDK implementation.",
    ],
  },
  {
    slug: "agent-project-orchestrator",
    shortName: "APO",
    name: "Agent Project Orchestrator",
    version: "1.1.0",
    license: "MIT",
    status: "Stable",
    scope: "Runtime execution contracts for project-level orchestrators.",
    summary:
      "Turn governed goals into task graphs, dispatch, checks, handoffs, recovery, telemetry, and auditable outcomes.",
    repo: "https://github.com/governancecommons/agent-project-orchestrator",
    validator: "https://github.com/governancecommons/agent-project-orchestrator",
    validatorLabel: "agent-project-orchestrator reference package",
    schema: "https://github.com/governancecommons/agent-project-orchestrator/tree/main/schemas",
    capabilities: [
      "Goal intake and task graph compilation",
      "Governed dispatch and handoff controls",
      "Recovery and resource budget enforcement",
      "Structured telemetry and evidence output",
    ],
    adoption: [
      "Create a runtime contract for the project orchestrator.",
      "Validate task graphs and agent dossier references.",
      "Preserve telemetry and evidence for each governed run.",
    ],
  },
];

export const getStandard = (slug: string) =>
  standards.find((standard) => standard.slug === slug);
