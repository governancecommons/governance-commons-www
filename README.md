# Governance Commons Website

Astro site for [governancecommons.org](https://governancecommons.org), the public home of the maintainer-led Governance Commons sociotechnical governance project. The site distinguishes released specifications, emerging work, evidence contracts, reference tooling, publication infrastructure, and maintainer coordination while preserving external authority and provenance.

## Repository Structure

This repository separates website source code from published content:

- `site/` — Astro website code licensed under MIT (`site/LICENSE`).
- `content/` — governance content and schema assets licensed under CC BY 4.0 (`content/LICENSE`).

## Public Components Represented

- Released specifications: Agent Dossier, Agent Matrix, and Ontic Namespace Structure.
- Reference-runtime candidate: Agent Project Orchestrator.
- Emerging pre-release work: Agent Team Protocol.
- Evidence contracts: Governance Record and ConformanceReport.
- Reference tooling: GC Toolkit / Registry SDKs, validators, and CLIs.

The accepted RFC-0001 boundary remains inactive until gates G-1 through G-5 verify. The site must not describe Governance Commons as a certification authority or imply authority from ISO, NIST, IEEE, AAIF, or other external organizations.

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
