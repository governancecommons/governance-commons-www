import assert from "node:assert/strict";
import { validateEvidence, validateCollection, canPublish } from "./observatory-evidence-contract.mjs";
const base = {
 id:"obs-001",subjectId:"model.example",subjectVersion:"snapshot-2026-10",claim:"Documentation identifies model capabilities",
 evaluator:"GC editorial",method:"primary-source review",methodVersion:"1.0.0",
 limitations:"No independent execution",sourceUrl:"https://example.org/models",
 capturedAt:"2026-10-20T12:00:00Z",evidenceClass:"documentation",publicationStatus:"pending"
};
const approved = {...base,publicationStatus:"approved",approval:{reviewer:"human-reviewer",approvedAt:"2026-10-20T13:00:00Z",recordId:"review-001"}};
const measured = {...approved,id:"obs-002",evidenceClass:"gc-evaluation",measurement:{task:"task A",sampleSize:20,conditions:"runtime pinned",metric:"accuracy",unit:"fraction",artifactUrl:"https://example.org/artifact"}};
assert.deepEqual(validateEvidence(base),[]);
assert.equal(canPublish(base),false);
assert.equal(canPublish(approved),true);
assert.equal(canPublish(measured),true);
const reject = (record,label) => assert.ok(validateEvidence(record).length,label);
reject({...approved,approval:null},"approval required");
reject({...approved,sourceUrl:"http://example.org"},"HTTPS required");
reject({...approved,capturedAt:"yesterday"},"timestamp required");
reject({...approved,evidenceClass:"certified"},"unsupported class rejected");
reject({...measured,measurement:{...measured.measurement,sampleSize:0}},"positive sample size");
reject({...measured,measurement:null},"measurement required");
reject({...measured,evidenceClass:"conformance-result"},"specification required");
assert.ok(validateCollection([approved,approved]).some(x=>x.includes("duplicate")));
assert.deepEqual(validateCollection([approved,measured]),[]);
console.log("Evidence contract: positive and negative acceptance fixtures passed");
