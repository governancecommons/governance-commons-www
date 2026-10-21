export const EVIDENCE_CLASSES = Object.freeze(["documentation","third-party-evaluation","gc-evaluation","governance-observation","conformance-result"]);
const RESULTS = new Set(["third-party-evaluation","gc-evaluation","conformance-result"]);
const date = x => typeof x === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(x) && !Number.isNaN(Date.parse(x));
const nonempty = x => typeof x === "string" && x.trim().length > 0;
const https = x => { try { const u = new URL(x); return u.protocol === "https:" && !!u.hostname && !u.username && !u.password; } catch { return false; } };
export function validateEvidence(record) {
  const errors = [];
  if (!record || typeof record !== "object" || Array.isArray(record)) return ["record must be an object"];
  for (const key of ["id","subjectId","subjectVersion","claim","evaluator","method","methodVersion","limitations"]) if (!nonempty(record[key])) errors.push(`missing ${key}`);
  if (!EVIDENCE_CLASSES.includes(record.evidenceClass)) errors.push("invalid evidenceClass");
  if (!https(record.sourceUrl)) errors.push("sourceUrl must be HTTPS");
  if (!date(record.capturedAt)) errors.push("capturedAt must be a valid UTC timestamp");
  if (!["pending","approved","rejected"].includes(record.publicationStatus)) errors.push("invalid publicationStatus");
  if (record.publicationStatus === "approved") {
    if (!record.approval || !nonempty(record.approval.reviewer) || !date(record.approval.approvedAt) || !nonempty(record.approval.recordId)) errors.push("approved evidence requires human approval record");
  }
  if (RESULTS.has(record.evidenceClass)) {
    const m = record.measurement;
    if (!m || !nonempty(m.task) || !Number.isInteger(m.sampleSize) || m.sampleSize <= 0 || !nonempty(m.conditions) || !nonempty(m.metric) || !nonempty(m.unit) || !nonempty(m.artifactUrl) || !https(m.artifactUrl)) errors.push("result requires task, positive sample size, conditions, metric, unit and HTTPS artifact");
    if (record.evidenceClass === "conformance-result" && (!nonempty(record.specificationId) || !nonempty(record.specificationVersion))) errors.push("conformance requires specification identity/version");
  }
  return errors;
}
export function canPublish(record) { return validateEvidence(record).length === 0 && record.publicationStatus === "approved"; }
export function validateCollection(records) {
  if (!Array.isArray(records)) return ["records must be an array"];
  const seen = new Set(), errors = [];
  for (const [index, record] of records.entries()) {
    for (const e of validateEvidence(record)) errors.push(`[${index}] ${e}`);
    if (record && seen.has(record.id)) errors.push(`[${index}] duplicate id`);
    if (record) seen.add(record.id);
  }
  return errors;
}
