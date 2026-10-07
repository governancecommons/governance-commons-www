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
