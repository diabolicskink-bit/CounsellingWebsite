import {
  neon,
  type NeonQueryFunction,
} from "@neondatabase/serverless";

export type VisitDatabase = Pick<NeonQueryFunction<false, false>, "query">;

export class VisitDatabaseConfigurationError extends Error {
  constructor() {
    super("Visit database configuration is missing.");
    this.name = "VisitDatabaseConfigurationError";
  }
}

let cachedDatabase: VisitDatabase | undefined;
let cachedDatabaseUrl: string | undefined;

export function getVisitDatabase(): VisitDatabase {
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (!databaseUrl) {
    throw new VisitDatabaseConfigurationError();
  }

  if (!cachedDatabase || cachedDatabaseUrl !== databaseUrl) {
    cachedDatabase = neon(databaseUrl);
    cachedDatabaseUrl = databaseUrl;
  }

  return cachedDatabase;
}
