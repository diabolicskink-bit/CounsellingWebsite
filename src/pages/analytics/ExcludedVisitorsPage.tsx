import { useEffect } from "react";
import {
  ChevronRight,
  CircleCheck,
  EyeOff,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import {
  getPerthDateKey,
  type ExcludedVisitorSummary,
} from "../../data/analyticsContract";
import useDocumentMetadata from "../../hooks/useDocumentMetadata";
import {
  formatDate,
  formatTime,
  visitorLabel,
} from "./analyticsFormatters";
import { AnalyticsShell, ReportState } from "./AnalyticsShell";
import useAnalyticsReport from "./useAnalyticsReport";
import VisitorHistory from "./VisitorHistory";

function ExcludedVisitors({
  onOpenVisitor,
  visitors,
}: {
  onOpenVisitor: (visitorId: string) => void;
  visitors: ExcludedVisitorSummary[];
}) {
  return (
    <>
      <section className="excluded-visitors__overview" aria-labelledby="excluded-visitors-title">
        <div>
          <p className="signal-kicker">Report filter</p>
          <h1 id="excluded-visitors-title">Excluded visitors</h1>
          <p>
            These visitors are retained but kept out of daily, enquiry, page-view, and keyword reports.
          </p>
        </div>
        <div
          className="excluded-visitors__count"
          aria-label={`${visitors.length} excluded ${visitors.length === 1 ? "visitor" : "visitors"}`}
        >
          <EyeOff aria-hidden="true" size={20} />
          <strong>{String(visitors.length).padStart(2, "0")}</strong>
          <span>{visitors.length === 1 ? "visitor" : "visitors"}</span>
        </div>
      </section>

      <section className="excluded-visitors__directory" aria-labelledby="excluded-visitors-list-title">
        <header>
          <div>
            <p className="signal-kicker">Newest exclusion first</p>
            <h2 id="excluded-visitors-list-title">Manage exclusions</h2>
          </div>
          <p>Open a visitor to review their retained history or include them in reports again.</p>
        </header>

        {visitors.length ? (
          <ol className="excluded-visitors__list">
            {visitors.map((visitor) => {
              const excludedDate = getPerthDateKey(new Date(visitor.excludedAt));
              const firstSeenDate = getPerthDateKey(new Date(visitor.firstSeenAt));
              const latestSeenDate = getPerthDateKey(new Date(visitor.latestSeenAt));

              return (
                <li key={visitor.visitorId}>
                  <button
                    aria-label={`Open ${visitorLabel(visitor.visitorId)}, excluded ${formatDate(excludedDate, true)}`}
                    onClick={() => onOpenVisitor(visitor.visitorId)}
                    type="button"
                  >
                    <span className="excluded-visitors__mark">
                      <EyeOff aria-hidden="true" size={18} />
                    </span>
                    <span className="excluded-visitors__identity">
                      <strong>{visitorLabel(visitor.visitorId)}</strong>
                      <small>
                        Excluded {formatDate(excludedDate, true)} at {formatTime(visitor.excludedAt)}
                      </small>
                    </span>
                    <span className="excluded-visitors__history excluded-visitors__history--first">
                      <small>First seen</small>
                      <strong>{formatDate(firstSeenDate, true)}</strong>
                    </span>
                    <span className="excluded-visitors__history excluded-visitors__history--latest">
                      <small>Most recent</small>
                      <strong>{formatDate(latestSeenDate, true)}</strong>
                    </span>
                    <span className="excluded-visitors__visits">
                      <strong>{String(visitor.totalVisits).padStart(2, "0")}</strong>
                      <small>{visitor.totalVisits === 1 ? "visit" : "visits"}</small>
                    </span>
                    <ChevronRight aria-hidden="true" size={18} />
                  </button>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="signal-stream__empty excluded-visitors__empty">
            <CircleCheck aria-hidden="true" size={30} />
            <h3>No excluded visitors</h3>
            <p>Visitors excluded from their history page will appear here.</p>
          </div>
        )}
      </section>
    </>
  );
}

export default function ExcludedVisitorsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedVisitorId = searchParams.get("visitor");
  const focusedVisitId = searchParams.get("visit");
  const focusedEventId = searchParams.get("event");
  const expectedType = requestedVisitorId ? "visitor" : "excluded";
  const requestUrl = requestedVisitorId
    ? `/api/analytics?visitor=${encodeURIComponent(requestedVisitorId)}`
    : "/api/analytics/exclusions";
  const { report, retry, status } = useAnalyticsReport(requestUrl, expectedType);

  useDocumentMetadata(
    "Excluded Visitors | Vive Analytics",
    "Private excluded visitor management for Vive Counselling analytics.",
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [requestedVisitorId]);

  function openVisitor(visitorId: string) {
    setSearchParams({ visitor: visitorId });
  }

  function closeVisitor() {
    setSearchParams({});
  }

  return (
    <AnalyticsShell
      detailTitle={requestedVisitorId
        ? (focusedEventId ? "Enquiry journey" : "Visitor history")
        : "Excluded visitors"}
      includeBots={false}
      onRefresh={retry}
      showBotControl={false}
      status={status}
    >
      {status !== "ready" ? <ReportState onRetry={retry} status={status} /> : null}
      {status === "ready" && report?.type === "visitor" ? (
        <VisitorHistory
          backLabel="excluded visitors"
          focusedEventId={focusedEventId}
          focusedVisitId={focusedVisitId}
          includeBots
          onBack={closeVisitor}
          report={report}
        />
      ) : null}
      {status === "ready" && report?.type === "excluded" ? (
        <ExcludedVisitors onOpenVisitor={openVisitor} visitors={report.visitors} />
      ) : null}
    </AnalyticsShell>
  );
}
