# Governance Commons Intelligence editorial contract

Articles are JSON records stored under `content/intelligence/articles/`. Drafts remain outside public Astro pages.

Each article records a stable id, title, summary, body, author, channel, created_at, status, sources, claims, AI assistance disclosure, and eventual human approval. Each source has an HTTPS URL, title, publisher, access date, verification status, and verifier. Each material claim maps to source IDs and includes evidence excerpts, verifier identity, verification date, and status.

`node scripts/intelligence/validate.mjs <article.json>` validates draft structure. Use `--publish` for the stricter approval check.

A passing validator establishes *record completeness only*, not that a source actually supports the claim. Verification must inspect original material and compare it against each claim. A successful URL response is not evidence of truth.

Publication must never be triggered solely by AI draft generation, a scheduled job, or a self-asserted `approved` field. The publishing workflow must additionally enforce authenticated human authorization and a protected merge or equivalent trusted approval boundary. Until that workflow is implemented, no article is automatically published.
