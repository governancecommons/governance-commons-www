import {resolve4,resolve6,resolveCname} from "node:dns/promises";
import tls from "node:tls";
import {writeFile, appendFile} from "node:fs/promises";

const host="governancecommons.org";
const origin="https://"+host;
const prefix="/agent-dossier/v/1.0.2/schemas/";
const files=[
"agent-dossier-instance.schema.json","agent-dossier.schema.json",
"handoff-envelope.schema.json","pass-changelog-entry.schema.json","runtime-contract.schema.json"
];
const report={
  checked_at_utc:new Date().toISOString(),
  rfc:"RFC-0001",gate:"G-1",
  normative_condition:"Agent Dossier canonical schema URLs resolve",
  site:origin, source:"GitHub Actions runner",
  dns:{},tls:{},schemas:[],scope_limits:[
    "Public DNS observations do not prove authoritative zone ownership or GitHub Pages settings.",
    "TLS certificate observation does not independently establish GitHub Pages custom-domain control.",
    "G-1 completion does not activate RFC-0001: G-2 through G-5 must also verify."
  ]
};
for(const [type,fn] of [["A",resolve4],["AAAA",resolve6],["CNAME",resolveCname]]) {
  try {report.dns[type]=await fn(host);}catch(e){report.dns[type]={error:e.code||String(e)};}
}
try{
  report.tls=await new Promise((resolve,reject)=>{
    const socket=tls.connect({host,port:443,servername:host,rejectUnauthorized:true,timeout:15000},()=>{
      const c=socket.getPeerCertificate();
      const result={authorized:socket.authorized,authorizationError:socket.authorizationError??null,
        subject:c.subject,issuer:c.issuer,subjectaltname:c.subjectaltname,
        valid_from:c.valid_from,valid_to:c.valid_to,fingerprint256:c.fingerprint256,
        protocol:socket.getProtocol()};
      socket.end();resolve(result);
    });
    socket.on("error",reject);
    socket.on("timeout",()=>socket.destroy(Error("TLS timeout")));
  });
}catch(e){report.tls={error:String(e.message||e)};}
for(const file of files) {
  const path=prefix+file,url=origin+path;
  const entry={file,url,result:"FAIL"};
  try{
    const response=await fetch(url,{signal:AbortSignal.timeout(20000),redirect:"manual"});
    entry.status=response.status;
    entry.content_type=response.headers.get("content-type");
    if(response.status!==200)throw Error("HTTP "+response.status);
    const payload=await response.json();
    entry.schema_id=payload.$id??null;
    if(payload.$id!==url)throw Error("$id mismatch: "+String(payload.$id));
    entry.result="PASS";
  }catch(e){entry.error=String(e.message||e);}
  report.schemas.push(entry);
}
report.schema_passed=report.schemas.filter(x=>x.result==="PASS").length;
report.schema_total=files.length;
report.g1_observation=report.schema_passed===files.length?"ALL_CANONICAL_SCHEMAS_VERIFIED":"INCOMPLETE";
await writeFile("g1-publication-evidence.json",JSON.stringify(report,null,2)+"\n");
const summary=[
  "## RFC-0001 G-1 — Canonical schema evidence",
  "", "Checked UTC: "+report.checked_at_utc,
  "Canonical schemas: **"+report.schema_passed+"/"+report.schema_total+"**",
  "", "| Canonical schema | Result | HTTP |",
  "| --- | --- | --- |",
  ...report.schemas.map(s=>"| "+s.file+" | "+s.result+" | "+(s.status??"n/a")+" |"),
  "", "DNS A: "+JSON.stringify(report.dns.A),
  "", "DNS AAAA: "+JSON.stringify(report.dns.AAAA),
  "", "DNS CNAME: "+JSON.stringify(report.dns.CNAME),
  "", "TLS: "+(report.tls.error??"certificate inspected; see JSON artifact"),
  "", "Scope: HTTPS schema retrieval from this runner supports G-1 only; it does not verify GitHub Pages settings, authoritative DNS ownership, or activation gates G-2–G-5."
].join("\n")+"\n";
if(process.env.GITHUB_STEP_SUMMARY)await appendFile(process.env.GITHUB_STEP_SUMMARY,summary);
console.log(summary);
if(report.schema_passed!==files.length)process.exitCode=1;
