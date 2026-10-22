# GC-ZT-03 — Workflow action pinning evidence

Status: **IMPLEMENTED IN PR; CI and production revalidation pending**.

All eight workflow files were examined. Action references that used mutable major-version tags were replaced with immutable 40-character commit SHAs resolved from their upstream GitHub repositories on 2026-10-22. Annotated tags were dereferenced to the commit object. The dependency-review v5 release reference resolves to v5.0.0. Version comments are retained for maintainers.

| Action | Previous tag | Pinned commit |
| --- | --- | --- |
| actions/checkout | v7 | `3d3c42e5aac5ba805825da76410c181273ba90b1` |
| actions/setup-node | v7 | `949feb2413d6458794dcd2491c4babbbce0c15c1` |
| actions/configure-pages | v6 | `45bfe0192ca1faeb007ade9deae92b16b8254a0d` |
| actions/upload-pages-artifact | v5 | `fc324d3547104276b827a68afc52ff2a11cc49c9` |
| actions/deploy-pages | v5 | `368f82528645a54fb793d4d04e342629a3f51346` |
| actions/upload-artifact | v4 | `ea165f8d65b6e75b540449e92b4886f43607fa02` |
| actions/dependency-review-action | v5 | `a1d282b36b6f3519aa1f3fc636f609c47dddb294` |
| browser-actions/setup-chrome | v2 | `48ad923757ca74d66703209fe939badbdf80f2f4` |

## Additional credential boundary

The Observatory PR checkout now explicitly sets `persist-credentials: false`, consistent with the other website workflows. The deploy workflow already separates `contents: read` in the build job from `pages: write` and `id-token: write` in its deployment job.

## Acceptance and residual gaps

- [ ] All PR validation jobs green.
- [ ] A post-merge build, Pages deploy and live-verification run is green.
- [ ] Manually triggered Lighthouse/accessibility/G-1 workflows still work when invoked.
- [ ] Update process: for any upstream action release, review release notes and provenance; resolve tag to commit, update reference and version comment in a reviewed PR, run relevant workflows; do not silently revert to tags.
- [ ] Separate verification of dependency graph, Dependabot/secret scanning, GitHub organizational identity, environment restrictions, provenance/SBOM, and incident response.

Pinning prevents future mutation of a tag from silently changing workflow code; it **does not** independently audit the upstream action code or establish comprehensive supply-chain security. GC-ZT-03 remains a partial control until the residual gates have evidence.
