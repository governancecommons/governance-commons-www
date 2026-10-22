import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const domain = "governancecommons.org";
const schemaRoot = "agent-dossier/v/1.0.2/schemas";
const schemas = [
  "agent-dossier-instance.schema.json",
  "agent-dossier.schema.json",
  "handoff-envelope.schema.json",
  "pass-changelog-entry.schema.json",
  "runtime-contract.schema.json",
];

async function requireFile(relativePath) {
  const absolutePath = path.resolve("dist", relativePath);
  const metadata = await stat(absolutePath);
  if (!metadata.isFile()) {
    throw new Error(`${relativePath} is not a file`);
  }
  return readFile(absolutePath, "utf8");
}

const cname = (await requireFile("CNAME")).trim();
if (cname !== domain) {
  throw new Error(`dist/CNAME must contain ${domain}; found ${JSON.stringify(cname)}`);
}

for (const filename of schemas) {
  const relativePath = `${schemaRoot}/${filename}`;
  const schema = JSON.parse(await requireFile(relativePath));
  const expectedId = `https://${domain}/${relativePath}`;
  if (schema.$id !== expectedId) {
    throw new Error(`${relativePath} has $id ${JSON.stringify(schema.$id)}; expected ${expectedId}`);
  }
}

console.log(`Verified CNAME and ${schemas.length} Agent Dossier schema artifacts in dist/.`);

const robots = await requireFile("robots.txt");
if (!robots.includes("Sitemap: https://governancecommons.org/sitemap.xml")) {
  throw new Error("robots.txt must advertise the canonical sitemap URL");
}
const sitemap = await requireFile("sitemap.xml");
if (!sitemap.includes("<loc>https://governancecommons.org/</loc>")) {
  throw new Error("sitemap.xml must include the canonical homepage");
}
if (sitemap.includes("/404</loc>")) {
  throw new Error("404 page must not be indexed in sitemap.xml");
}
const notFound = await requireFile("404.html");
if (!notFound.includes("Page not found") || !notFound.includes('href="/"')) {
  throw new Error("Custom 404 page is missing its title or homepage recovery link");
}
console.log("Verified discovery, sitemap, and 404 artifacts.");
