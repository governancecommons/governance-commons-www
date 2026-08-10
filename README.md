# Governance Commons Website

Astro site for [governancecommons.org](https://governancecommons.org), the umbrella home for Governance Commons standards and deployable adoption SKUs.

## Repository Structure

This repository separates website source code from published content:

- `site/` — Astro website code licensed under MIT (`site/LICENSE`).
- `content/` — governance content and schema assets licensed under CC BY 4.0 (`content/LICENSE`).

## Standards Represented

- Agent Dossier: per-agent identity, authority, handoff, telemetry, and audit contract.
- Agent Matrix: multi-agent capability, routing, trust, safety, and coordination model.
- Ontic Namespace Structure: naming grammar, namespace identity, collision rules, and validation rule IDs.
- Project Orchestrator Agent: runtime execution contract for project-level orchestrators.

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

Astro writes the static site to `dist/`.

## Deployment

- Code and build source: GitHub.
- Host: GitHub Pages, deployed by `.github/workflows/deploy-pages.yml`.
- Build command: `npm run build`.
- Publish artifact: `dist`.
- Custom domain: `governancecommons.org`.

The legacy `netlify.toml` is retained as a portable static-host configuration,
but it is not the production deployment path.
