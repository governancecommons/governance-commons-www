import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";

const base = "http://127.0.0.1:4321";
const routes = ["/", "/about", "/ecosystem", "/observatory", "/conformance", "/standards/agent-dossier"];
const widths = [375, 768, 1280];
const report = { checked_at_utc: new Date().toISOString(), scope: "Chromium + axe-core automated checks; not full WCAG certification", cases: [], failures: [] };
await mkdir("accessibility-evidence", {recursive:true});
const browser = await chromium.launch({headless:true});
try {
  for (const width of widths) {
    const context = await browser.newContext({viewport:{width,height:850},reducedMotion:"reduce"});
    const page = await context.newPage();
    for (const route of routes) {
      const label = (route === "/" ? "home" : route.slice(1).replaceAll("/","-")) + "-" + width;
      const entry = {route,width,violations:[],notes:[]};
      try {
        const response = await page.goto(base + route, {waitUntil:"networkidle",timeout:30000});
        if (!response?.ok()) throw Error("HTTP " + (response?.status() ?? "unavailable"));
        const structural = await page.evaluate(() => ({
          lang: document.documentElement.lang,
          mainCount: document.querySelectorAll("main").length,
          skipLink: !!document.querySelector('a.skip-to-content[href="#main-content"]'),
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: document.documentElement.clientWidth
        }));
        if (!structural.lang || structural.mainCount !== 1 || !structural.skipLink) entry.notes.push("Missing language/main/skip-link landmark");
        if (structural.documentWidth > structural.viewportWidth + 2) entry.notes.push("Horizontal overflow " + structural.documentWidth + "px > " + structural.viewportWidth + "px");
        const axe = await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
        entry.violations = axe.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.slice(0,5).map(n=>({target:n.target,summary:n.failureSummary}))}));
        await page.screenshot({path:"accessibility-evidence/"+label+".png",fullPage:true});
        if (width === 375 && route === "/") {
          await page.keyboard.press("Tab");
          const first = await page.evaluate(() => document.activeElement?.classList.contains("skip-to-content"));
          if (!first) entry.notes.push("Skip link is not first keyboard focus target");
        }
      } catch (error) {
        entry.notes.push("Audit error: " + String(error.message || error));
      }
      if (entry.notes.length || entry.violations.some(v=>v.impact==="serious"||v.impact==="critical")) report.failures.push({route,width,notes:entry.notes,serious:entry.violations.filter(v=>v.impact==="serious"||v.impact==="critical").map(v=>v.id)});
      report.cases.push(entry);
      console.log(label + ": " + entry.violations.length + " axe findings; " + entry.notes.length + " structural findings");
      for (const violation of entry.violations) {
        console.log("  " + violation.impact + " " + violation.id + ": " + violation.nodes.length + " representative nodes");
        for (const node of violation.nodes) console.log("    " + JSON.stringify(node.target) + ": " + String(node.summary).replaceAll("\\n", " ").slice(0,350));
      }
      for (const note of entry.notes) console.log("  NOTE: " + note);
    }
    await context.close();
  }
} finally {
  await browser.close();
  await writeFile("accessibility-evidence/report.json",JSON.stringify(report,null,2)+"\n");
}
console.log("Cases: " + report.cases.length + "; cases requiring review: " + report.failures.length);
if (process.env.GITHUB_STEP_SUMMARY) {
  const {appendFile}=await import("node:fs/promises");
  await appendFile(process.env.GITHUB_STEP_SUMMARY,"## GC-WWW-18 automated browser audit\n\n"+report.cases.length+" route/viewport cases; "+report.failures.length+" flagged. Download screenshots and JSON from the workflow artifact. Automated checks do not establish full WCAG conformance.\n");
}
if (report.failures.length) process.exitCode=1;
