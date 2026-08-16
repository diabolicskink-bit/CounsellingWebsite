import type {
  VisitEventProperties,
  VisitEventSource,
  VisitEventType,
} from "../../data/visitEventContract.ts";
import {
  getVisitDatabase,
  type VisitDatabase,
} from "../visits/repository.ts";

export type VisitEventObservation = {
  eventId: string;
  eventType: VisitEventType;
  pageViewId: string | null;
  properties: VisitEventProperties;
  source: VisitEventSource;
  visitId: string;
};

export type VisitEventResult = {
  eventInserted: boolean;
};

type VisitEventRow = {
  eventInserted: boolean;
  eventMatched: boolean;
  pageViewMatched: boolean;
  visitMatched: boolean;
};

export class VisitEventIdentityConflictError extends Error {
  constructor() {
    super("The event ID is already associated with another visit event.");
    this.name = "VisitEventIdentityConflictError";
  }
}

export class VisitEventVisitConflictError extends Error {
  constructor() {
    super("The event visit does not exist.");
    this.name = "VisitEventVisitConflictError";
  }
}

export class VisitEventPageViewConflictError extends Error {
  constructor() {
    super("The event page view does not belong to the supplied visit.");
    this.name = "VisitEventPageViewConflictError";
  }
}

export const recordVisitEventSql = `
WITH matched_visit AS (
  SELECT id
  FROM site_visits
  WHERE id = $2::UUID
),
matched_page_view AS (
  SELECT id
  FROM site_page_views
  WHERE id = $3::UUID
    AND visit_id = $2::UUID
),
inserted_event AS (
  INSERT INTO site_visit_events (
    id,
    visit_id,
    page_view_id,
    event_type,
    source,
    properties
  )
  SELECT
    $1::UUID,
    matched_visit.id,
    $3::UUID,
    $4,
    $5,
    $6::JSONB
  FROM matched_visit
  WHERE $3::UUID IS NULL
    OR EXISTS (SELECT 1 FROM matched_page_view)
  ON CONFLICT (id) DO NOTHING
  RETURNING id
),
matched_event AS (
  SELECT id FROM inserted_event
  UNION
  SELECT id
  FROM site_visit_events
  WHERE id = $1::UUID
    AND visit_id = $2::UUID
    AND page_view_id IS NOT DISTINCT FROM $3::UUID
    AND event_type = $4
    AND source = $5
    AND properties = $6::JSONB
)
SELECT
  EXISTS (SELECT 1 FROM matched_visit) AS "visitMatched",
  ($3::UUID IS NULL OR EXISTS (SELECT 1 FROM matched_page_view)) AS "pageViewMatched",
  EXISTS (SELECT 1 FROM matched_event) AS "eventMatched",
  EXISTS (SELECT 1 FROM inserted_event) AS "eventInserted";
`;

export async function recordVisitEvent(
  observation: VisitEventObservation,
  database: VisitDatabase = getVisitDatabase(),
): Promise<VisitEventResult> {
  const parameters = [
    observation.eventId,
    observation.visitId,
    observation.pageViewId,
    observation.eventType,
    observation.source,
    JSON.stringify(observation.properties),
  ];
  const readResult = async () => {
    const rows = (await database.query(recordVisitEventSql, parameters)) as VisitEventRow[];

    return rows[0];
  };
  const firstResult = await readResult();
  const shouldRetry = !firstResult?.visitMatched
    || !firstResult.pageViewMatched
    || !firstResult.eventMatched;
  const result = shouldRetry ? await readResult() : firstResult;

  if (!result?.visitMatched) {
    throw new VisitEventVisitConflictError();
  }

  if (!result.pageViewMatched) {
    throw new VisitEventPageViewConflictError();
  }

  if (!result.eventMatched) {
    throw new VisitEventIdentityConflictError();
  }

  return {
    eventInserted: Boolean(firstResult?.eventInserted || result.eventInserted),
  };
}
