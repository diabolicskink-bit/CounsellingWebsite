import {
  getVisitDatabase,
  type VisitDatabase,
} from "../visits/repository.ts";
import type { PageEngagementObservation } from "./validation.ts";

type PageEngagementRow = {
  activeSeconds: number;
};

export class PageEngagementIdentityConflictError extends Error {
  constructor() {
    super("The page view does not belong to the supplied visit and visitor.");
    this.name = "PageEngagementIdentityConflictError";
  }
}

export const recordPageEngagementSql = `
UPDATE site_page_views AS page_views
SET active_seconds = GREATEST(page_views.active_seconds, $4::INTEGER)
FROM site_visits AS visits
WHERE page_views.id = $3::UUID
  AND page_views.visit_id = $2::UUID
  AND visits.id = page_views.visit_id
  AND visits.visitor_id = $1::UUID
RETURNING page_views.active_seconds AS "activeSeconds";
`;

export async function recordPageEngagement(
  observation: PageEngagementObservation,
  database: VisitDatabase = getVisitDatabase(),
) {
  const rows = await database.query(recordPageEngagementSql, [
    observation.visitorId,
    observation.visitId,
    observation.pageViewId,
    observation.activeSeconds,
  ]) as PageEngagementRow[];

  if (!rows[0]) {
    throw new PageEngagementIdentityConflictError();
  }

  return { activeSeconds: Number(rows[0].activeSeconds) };
}
