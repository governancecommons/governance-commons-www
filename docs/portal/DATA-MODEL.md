# GC Portal data model (proposed)

- **Identity**: id, github_subject, display_name, state, created_at, last_seen_at
- **Invitation**: id, email_or_github_subject, invited_by, workspace_id, expires_at, state
- **Membership**: identity_id, workspace_id, role, capabilities, granted_by, expires_at, revoked_at
- **Workspace**: id, type (intelligence/editorial/governance/project), policy_version
- **Submission**: id, type (article/research/correction/proposal/code), workspace_id, author_id, status, current_revision_id
- **Revision**: id, submission_id, parent_revision_id, content_hash, created_by, created_at, content_ref
- **SourceEvidence**: id, revision_id, source_url, publisher, accessed_at, snapshot_ref, snapshot_hash, verification_status, verifier_id
- **ClaimEvidence**: id, revision_id, claim_text, source_evidence_ids, excerpt, assessment, verifier_id, verified_at
- **Review**: id, revision_id, reviewer_id, scope, decision, rationale, created_at
- **AdoptionIntake**: id, source_development_ids, gc_component, gap_hypothesis, disposition, rationale, owner_id, tracking_url
- **ReleaseAuthorization**: id, revision_id, approved_by, check_run_refs, commit_sha, authorized_at, published_at, publication_url
- **AuditEvent**: id, actor_id, event_type, object_type, object_id, revision_id, timestamp, request_id, metadata_redacted

All foreign keys, uniqueness, tenant/workspace isolation, retention and immutability constraints must be enforced by the production datastore, not just the UI. Revision approvals become invalid when content changes.
