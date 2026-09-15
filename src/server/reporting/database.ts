import {
  getVisitDatabase,
  VisitDatabaseConfigurationError,
  type VisitDatabase,
} from "../visits/repository.ts";

export class AnalyticsDataUnavailableError extends Error {
  constructor() {
    super("Analytics database configuration is unavailable.");
    this.name = "AnalyticsDataUnavailableError";
  }
}

export function resolveAnalyticsDatabase(database?: VisitDatabase): VisitDatabase {
  if (database) return database;

  try {
    return getVisitDatabase();
  } catch (error) {
    if (error instanceof VisitDatabaseConfigurationError) {
      throw new AnalyticsDataUnavailableError();
    }

    throw error;
  }
}
