export const ACTIONS = Object.freeze({
  "submission:create": ["contributor", "reviewer", "editor", "governance_maintainer", "administrator", "owner"],
  "submission:review": ["reviewer", "editor", "governance_maintainer", "administrator", "owner"],
  "article:approve": ["editor", "administrator", "owner"],
  "governance:approve": ["governance_maintainer", "owner"],
  "membership:manage": ["administrator", "owner"],
  "audit:read": ["administrator", "owner"]
});
const highImpact = new Set(["article:approve", "governance:approve"]);
export function authorize({ actor, action, resource, now = new Date() }) {
  if (!actor?.authenticated || actor.disabled || !resource?.workspace_id) return { allowed: false, reason: "unauthenticated_or_invalid" };
  if (!Object.hasOwn(ACTIONS, action)) return { allowed: false, reason: "unknown_action" };
  const membership = actor.memberships?.find(m =>
    m.workspace_id === resource.workspace_id &&
    m.revoked_at == null &&
    (!m.expires_at || (Number.isFinite(Date.parse(m.expires_at)) && Date.parse(m.expires_at) > now.getTime())) &&
    ACTIONS[action].includes(m.role)
  );
  if (!membership) return { allowed: false, reason: "no_scoped_grant" };
  if (highImpact.has(action)) {
    if (!resource.revision_id || resource.author_id === actor.id) return { allowed: false, reason: "independent_review_required" };
    if (resource.reviewed_revision_id !== resource.revision_id) return { allowed: false, reason: "stale_or_missing_review" };
    if (resource.status !== "awaiting_approval") return { allowed: false, reason: "invalid_workflow_state" };
  }
  return { allowed: true, reason: "scoped_grant" };
}
