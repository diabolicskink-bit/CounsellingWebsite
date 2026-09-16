import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { test } from "node:test";

const queriesUrl = new URL("../../../database/queries/", import.meta.url);

const queryFilenames = (await readdir(queriesUrl))
  .filter((filename) => filename.endsWith(".sql"))
  .sort();

function removeSqlComments(sql) {
  return sql.replaceAll(/^--.*$/gm, "");
}

test("saved visit queries remain read-only", async () => {
  for (const filename of queryFilenames) {
    const query = await readFile(new URL(filename, queriesUrl), "utf8");
    assert.doesNotMatch(
      removeSqlComments(query),
      /\b(?:ALTER|CREATE|DELETE|DROP|GRANT|INSERT|REVOKE|TRUNCATE|UPDATE)\b/i,
      filename + " must remain read-only",
    );
  }
});
