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
    const initial=await fetch(entry.url,{redirect:"manual",signal:AbortSignal.timeout(20000)});
    entry.initial_status=initial.status;
    entry.redirect_location=initial.headers.get("location");
    let res=initial;
    if(initial.status===301||initial.status===302||initial.status===307||initial.status===308){
      const target=new URL(entry.redirect_location??"",entry.url);
      const allowed=new URL(entry.url);
      // Static-site canonical slash redirects are expected; never follow arbitrary origins.
      if(target.origin!==allowed.origin||target.pathname!==allowed.pathname.replace(/\\/$/,"")+"/"){
        throw Error("Unexpected redirect target: "+target.href);
      }
      res=await fetch(target.href,{redirect:"manual",signal:AbortSignal.timeout(20000)});
    }
    entry.final_url=res.url;
    entry.http_status=res.status;
    entry.elapsed_ms=Math.round(performance.now()-start);
    entry.headers=Object.fromEntries(expected.map(k=>[k,res.headers.get(k)]));
    entry.missing_header_observations=expected.filter(k=>!entry.headers[k]);
    entry.content_type=res.headers.get("content-type");
    entry.server=res.headers.get("server");
    entry.cache_control=res.headers.get("cache-control");
    entry.result=res.status===200?"FETCH_OK":"REVIEW";
  }catch(e){entry.result="FETCH_ERROR";entry.error=String(e.message||e);}
  report.pages.push(entry);
  console.log(entry.path+": "+entry.result+" "+(entry.initial_status??"n/a")+" -> "+(entry.http_status??"n/a")+" "+(entry.elapsed_ms??"")+"ms; final "+(entry.final_url??"n/a")+"; missing observed security headers: "+(entry.missing_header_observations??[]).join(", "));
}
await writeFile("baseline-evidence/security-headers.json",JSON.stringify(report,null,2)+"\n");
const passed=report.pages.filter(p=>p.result==="FETCH_OK").length;
const lines=["## WWW-22 public HTTP baseline","",passed+"/"+report.pages.length+" pages fetched with HTTP 200.","",
"| Route | Initial → Final HTTP | Observed fetch duration | Missing header observations |",
"| --- | --- | --- | --- |",
...report.pages.map(p=>"| "+p.path+" | "+(p.initial_status??"n/a")+" → "+(p.http_status??p.result)+" | "+(p.elapsed_ms??"n/a")+" ms | "+(p.missing_header_observations??[]).join(", ")+" |"),
"","**Interpretation:** Header absence is an observation, not proof of vulnerability. GitHub Pages hosting may restrict custom headers. Fetch duration is runner/network dependent and not a Core Web Vital."].join("\n")+"\n";
if(process.env.GITHUB_STEP_SUMMARY)await appendFile(process.env.GITHUB_STEP_SUMMARY,lines);
console.log(lines);
if(passed!==report.pages.length)process.exitCode=1;
