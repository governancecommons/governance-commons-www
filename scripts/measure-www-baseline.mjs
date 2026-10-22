import {writeFile,appendFile,mkdir} from "node:fs/promises";
const origin="https://governancecommons.org";
const paths=["/","/about","/observatory","/conformance"];
const expected=["strict-transport-security","content-security-policy","x-content-type-options","referrer-policy","permissions-policy","cross-origin-opener-policy"];
const report={checked_at_utc:new Date().toISOString(),origin,scope:"read-only HTTPS response header and latency observations; not a penetration test or complete security audit",pages:[]};
await mkdir("baseline-evidence",{recursive:true});
for(const path of paths){
  const entry={path,url:origin+path};
  const start=performance.now();
  try{
    const res=await fetch(entry.url,{redirect:"manual",signal:AbortSignal.timeout(20000)});
    entry.http_status=res.status;
    entry.elapsed_ms=Math.round(performance.now()-start);
    entry.redirect_location=res.headers.get("location");
    entry.headers=Object.fromEntries(expected.map(k=>[k,res.headers.get(k)]));
    entry.missing_header_observations=expected.filter(k=>!entry.headers[k]);
    entry.content_type=res.headers.get("content-type");
    entry.server=res.headers.get("server");
    entry.cache_control=res.headers.get("cache-control");
    entry.result=res.status===200?"FETCH_OK":"REVIEW";
  }catch(e){entry.result="FETCH_ERROR";entry.error=String(e.message||e);}
  report.pages.push(entry);
  console.log(entry.path+": "+entry.result+" "+(entry.http_status??"")+" "+(entry.elapsed_ms??"")+"ms; missing observed security headers: "+(entry.missing_header_observations??[]).join(", "));
}
await writeFile("baseline-evidence/security-headers.json",JSON.stringify(report,null,2)+"\n");
const passed=report.pages.filter(p=>p.result==="FETCH_OK").length;
const lines=["## WWW-22 public HTTP baseline","",passed+"/"+report.pages.length+" pages fetched with HTTP 200.","",
"| Route | HTTP | Observed fetch duration | Missing header observations |",
"| --- | --- | --- | --- |",
...report.pages.map(p=>"| "+p.path+" | "+(p.http_status??p.result)+" | "+(p.elapsed_ms??"n/a")+" ms | "+(p.missing_header_observations??[]).join(", ")+" |"),
"","**Interpretation:** Header absence is an observation, not proof of vulnerability. GitHub Pages hosting may restrict custom headers. Fetch duration is runner/network dependent and not a Core Web Vital."].join("\n")+"\n";
if(process.env.GITHUB_STEP_SUMMARY)await appendFile(process.env.GITHUB_STEP_SUMMARY,lines);
console.log(lines);
if(passed!==report.pages.length)process.exitCode=1;
