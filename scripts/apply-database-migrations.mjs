import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { neon } from "@neondatabase/serverless";

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const migrationsDirectory = path.join(rootDirectory, "database", "migrations");
const migrationFilenamePattern = /^\d{4}_[a-z0-9_]+\.sql$/;

function getDollarQuoteDelimiter(sql, index) {
  const match = sql.slice(index).match(/^\$[A-Za-z_][A-Za-z0-9_]*\$|^\$\$/);

  return match?.[0];
}

export function splitSqlStatements(sql) {
  const statements = [];
  let currentStatement = "";
  let dollarQuoteDelimiter;
  let inBlockComment = false;
  let inDoubleQuote = false;
  let inLineComment = false;
  let inSingleQuote = false;

  for (let index = 0; index < sql.length; index += 1) {
    const character = sql[index];
    const nextCharacter = sql[index + 1];

    if (inLineComment) {
      currentStatement += character;

      if (character === "\n") {
        inLineComment = false;
      }

      continue;
    }

    if (inBlockComment) {
      currentStatement += character;

      if (character === "*" && nextCharacter === "/") {
        currentStatement += nextCharacter;
        index += 1;
        inBlockComment = false;
      }

      continue;
    }

    if (dollarQuoteDelimiter) {
      if (sql.startsWith(dollarQuoteDelimiter, index)) {
        currentStatement += dollarQuoteDelimiter;
        index += dollarQuoteDelimiter.length - 1;
        dollarQuoteDelimiter = undefined;
      } else {
        currentStatement += character;
      }

      continue;
    }

    if (inSingleQuote) {
      currentStatement += character;

      if (character === "'" && nextCharacter === "'") {
        currentStatement += nextCharacter;
        index += 1;
      } else if (character === "'") {
        inSingleQuote = false;
      }

      continue;
    }

    if (inDoubleQuote) {
      currentStatement += character;

      if (character === '"' && nextCharacter === '"') {
        currentStatement += nextCharacter;
        index += 1;
      } else if (character === '"') {
        inDoubleQuote = false;
      }

      continue;
    }

    if (character === "-" && nextCharacter === "-") {
      currentStatement += `${character}${nextCharacter}`;
      index += 1;
      inLineComment = true;
      continue;
    }

    if (character === "/" && nextCharacter === "*") {
      currentStatement += `${character}${nextCharacter}`;
      index += 1;
      inBlockComment = true;
      continue;
    }

    if (character === "'") {
      currentStatement += character;
      inSingleQuote = true;
      continue;
    }

    if (character === '"') {
      currentStatement += character;
      inDoubleQuote = true;
      continue;
    }

    if (character === "$") {
      const delimiter = getDollarQuoteDelimiter(sql, index);

      if (delimiter) {
        currentStatement += delimiter;
        index += delimiter.length - 1;
        dollarQuoteDelimiter = delimiter;
        continue;
      }
    }

    if (character === ";") {
      const statement = currentStatement.trim();

      if (statement) {
        statements.push(statement);
      }

      currentStatement = "";
      continue;
    }

    currentStatement += character;
  }

  const trailingStatement = currentStatement.trim();

  if (trailingStatement) {
    statements.push(trailingStatement);
  }

  if (inBlockComment || inDoubleQuote || inSingleQuote || dollarQuoteDelimiter) {
    throw new Error("Migration contains an unterminated SQL string, identifier, or comment.");
  }

  return statements;
}

function removeSqlComments(statement) {
  return statement
    .replaceAll(/--[^\r\n]*/g, "")
    .replaceAll(/\/\*[\s\S]*?\*\//g, "")
    .trim()
    .toUpperCase();
}

export function getTransactionalStatements(sql) {
  const statements = splitSqlStatements(sql);
  const normalizedStatements = statements.map((statement) => removeSqlComments(statement));

  if (
    normalizedStatements[0] !== "BEGIN"
    || normalizedStatements.at(-1) !== "COMMIT"
    || normalizedStatements.slice(1, -1).some((statement) => (
      statement === "BEGIN" || statement === "COMMIT"
    ))
  ) {
    throw new Error("Each migration must contain one BEGIN followed by one COMMIT.");
  }

  return statements.slice(1, -1);
}

export async function readMigrations(directory = migrationsDirectory) {
  const filenames = (await readdir(directory))
    .filter((filename) => filename.endsWith(".sql"))
    .sort();

  if (filenames.some((filename) => !migrationFilenamePattern.test(filename))) {
    throw new Error("Migration filenames must use the 0000_lowercase_name.sql format.");
  }

  return Promise.all(filenames.map(async (filename) => {
    const sql = await readFile(path.join(directory, filename), "utf8");

    return {
      checksum: createHash("sha256").update(sql).digest("hex"),
      filename,
      statements: getTransactionalStatements(sql),
    };
  }));
}

export async function applyDatabaseMigrations(databaseUrl = process.env.DATABASE_URL) {
  if (!databaseUrl?.trim()) {
    throw new Error("DATABASE_URL is required to apply database migrations.");
  }

  const sql = neon(databaseUrl.trim());
  const migrations = await readMigrations();

  await sql.query(`
    CREATE TABLE IF NOT EXISTS visit_schema_migrations (
      filename TEXT PRIMARY KEY,
      checksum TEXT NOT NULL,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `, []);

  const appliedRows = await sql.query(
    "SELECT filename, checksum FROM visit_schema_migrations ORDER BY filename",
    [],
  );
  const knownFilenames = new Set(migrations.map((migration) => migration.filename));
  const unknownAppliedMigration = appliedRows.find((row) => !knownFilenames.has(row.filename));

  if (unknownAppliedMigration) {
    throw new Error(`Database contains migration absent from this checkout: ${unknownAppliedMigration.filename}`);
  }

  const appliedChecksums = new Map(appliedRows.map((row) => [row.filename, row.checksum]));
  const changedMigration = migrations.find((migration) => {
    const appliedChecksum = appliedChecksums.get(migration.filename);

    return appliedChecksum && appliedChecksum !== migration.checksum;
  });

  if (changedMigration) {
    throw new Error(`Applied migration has changed: ${changedMigration.filename}`);
  }

  const pendingMigrations = migrations.filter((migration) => !appliedChecksums.has(migration.filename));

  for (const migration of pendingMigrations) {
    await sql.transaction((transaction) => [
      ...migration.statements.map((statement) => transaction.query(statement, [])),
      transaction.query(
        "INSERT INTO visit_schema_migrations (filename, checksum) VALUES ($1, $2)",
        [migration.filename, migration.checksum],
      ),
    ]);
  }

  return {
    applied: pendingMigrations.map((migration) => migration.filename),
    current: migrations.length,
  };
}

async function main() {
  const result = await applyDatabaseMigrations();

  if (result.applied.length === 0) {
    console.log(`Database schema is current (${result.current} migrations).`);
    return;
  }

  console.log(`Applied ${result.applied.length} migration(s): ${result.applied.join(", ")}`);
}

const invokedFile = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : undefined;

if (invokedFile === import.meta.url) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : "Database migration failed.");
    process.exitCode = 1;
  });
}
