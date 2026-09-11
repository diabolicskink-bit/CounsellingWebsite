import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, EyeOff, Radio } from "lucide-react";
import type {
  AnalyticsExclusionUpdateResponse,
  VisitorAnalyticsReport,
} from "../../data/analyticsContract";
import {
  eventLabel,
  formatActiveTime,
  formatDate,
  formatTime,
  visitActiveSeconds,
  visitorLabel,
} from "./analyticsFormatters";
import {
  BotMark,
  DeviceMark,
  LocationMark,
  SourceMark,
  VisitDetailPanel,
  WebDriverMark,
} from "./VisitDetails";

export type VisitorHistoryProps = {
  backLabel: string;
  focusedEventId: string | null;
  focusedVisitId: string | null;
  includeBots: boolean;
  onBack: () => void;
  report: VisitorAnalyticsReport;
};

export default function VisitorHistory({
  backLabel,
  focusedEventId,
  focusedVisitId,
  includeBots,
  onBack,
  report,
}: VisitorHistoryProps) {
  const [isExcluded, setIsExcluded] = useState(report.isExcluded);
  const [exclusionStatus, setExclusionStatus] = useState<"error" | "idle" | "saving">("idle");
  const includedVisits = useMemo(
    () => includeBots ? report.visits : report.visits.filter((visit) => visit.isBot !== true),
    [includeBots, report.visits],
  );
  const focusedEventContext = includedVisits
    .flatMap((visit) => visit.events.map((visitEvent) => ({ visit, visitEvent })))
    .find(({ visitEvent }) => visitEvent.id === focusedEventId)
    ?? null;
  const focusedVisit = focusedEventContext?.visit
    ?? includedVisits.find((visit) => visit.id === focusedVisitId)
    ?? includedVisits[0]
    ?? null;

  useEffect(() => {
    setIsExcluded(report.isExcluded);
    setExclusionStatus("idle");
  }, [report.isExcluded, report.visitorId]);

  async function updateExclusion() {
    const nextIsExcluded = !isExcluded;
    setExclusionStatus("saving");

    try {
      const response = await fetch("/api/analytics/exclusions", {
        body: JSON.stringify({ excluded: nextIsExcluded, visitorId: report.visitorId }),
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PUT",
      });
      const body = await response.json() as Partial<AnalyticsExclusionUpdateResponse>;

      if (
        !response.ok
        || body.data?.visitorId !== report.visitorId
        || body.data.isExcluded !== nextIsExcluded
      ) {
        throw new Error("Analytics exclusion update failed.");
      }

      setIsExcluded(nextIsExcluded);
      setExclusionStatus("idle");
    } catch (error) {
      console.error(
        "Analytics exclusion update failed:",
        error instanceof Error ? error.name : "UnknownError",
      );
      setExclusionStatus("error");
    }
  }

  if (!focusedVisit) {
    return (
      <section className="signal-missing">
        <Radio aria-hidden="true" size={34} />
        <p className="signal-kicker">Visitor not found</p>
        <h1>This visitor has no retained visits</h1>
        <button onClick={onBack} type="button"><ArrowLeft aria-hidden="true" size={17} /> Back to visits</button>
      </section>
    );
  }

  const firstVisit = includedVisits[includedVisits.length - 1] ?? focusedVisit;
  const latestVisit = includedVisits[0] ?? focusedVisit;
  const label = visitorLabel(report.visitorId);
  const isEnquiryJourney = Boolean(focusedEventContext);
  const selectedEvent = focusedEventContext?.visitEvent ?? null;

  return (
    <>
      <button className="signal-back" onClick={onBack} type="button">
        <ArrowLeft aria-hidden="true" size={16} />
        Back to {backLabel}
      </button>

      <section className="visitor-summary" aria-labelledby="visitor-history-title">
        <div className="visitor-summary__identity">
          <span aria-hidden="true">{label.replace("Visitor ", "")}</span>
          <div>
            <p className="signal-kicker">
              {isEnquiryJourney && selectedEvent
                ? `${eventLabel(selectedEvent)} · ${label}`
                : "Visitor history"}
            </p>
            <h1 id="visitor-history-title">{isEnquiryJourney ? "Enquiry journey" : label}</h1>
            <p>
              {isEnquiryJourney && selectedEvent
                ? `The selected ${eventLabel(selectedEvent).toLowerCase()} is highlighted within ${includedVisits.length} retained ${includedVisits.length === 1 ? "visit" : "visits"}.`
                : `This visitor has ${includedVisits.length} recorded ${includedVisits.length === 1 ? "visit" : "visits"}.`}
            </p>
            <div className="visitor-summary__exclusion">
              <button
                aria-label={isExcluded ? `Include ${label} in reports` : `Exclude ${label} from reports`}
                aria-pressed={isExcluded}
                disabled={exclusionStatus === "saving"}
                onClick={() => void updateExclusion()}
                type="button"
              >
                <span aria-hidden="true"><i /></span>
                <EyeOff aria-hidden="true" size={15} />
                <strong>{isExcluded ? "Excluded from reports" : "Exclude from reports"}</strong>
                {exclusionStatus === "saving" ? <small>Saving</small> : null}
              </button>
              {exclusionStatus === "error" ? (
                <p role="alert">Could not update this visitor. Try again.</p>
              ) : null}
            </div>
          </div>
        </div>
        <dl>
          <div><dt>First seen</dt><dd>{formatDate(firstVisit.dateKey, true)}</dd></div>
          <div><dt>Most recent</dt><dd>{formatDate(latestVisit.dateKey, true)}</dd></div>
          <div><dt>Total visits</dt><dd>{String(includedVisits.length).padStart(2, "0")}</dd></div>
        </dl>
      </section>

      <section className="visitor-history" aria-labelledby="all-visits-title">
        <header className="signal-report__section-header">
          <div>
            <p className="signal-kicker">{isEnquiryJourney ? "Journey to this outcome" : "Complete history"}</p>
            <h2 id="all-visits-title">{isEnquiryJourney ? "Visits and enquiry activity" : "All visits"}</h2>
          </div>
          <p>Every retained page load and recorded action, with the attribution and coarse location stored when each visit began.</p>
        </header>

        <div className="visitor-history__list">
          {includedVisits.map((visit) => {
            const isFocused = visit.id === focusedVisit.id;
            const activeSeconds = visitActiveSeconds(visit);

            return (
              <article className={isFocused ? "visitor-visit visitor-visit--focused" : "visitor-visit"} key={visit.id}>
                <header className="visitor-visit__summary">
                  <span className="visitor-visit__number">{String(visit.visitNumber).padStart(2, "0")}</span>
                  <div>
                    <p>
                      {isFocused
                        ? (isEnquiryJourney
                            ? "Selected enquiry visit"
                            : focusedVisitId === visit.id
                              ? "Selected visit"
                              : "Most recent visit")
                        : "Visit history"}
                      {` · Visit ${visit.visitNumber} of ${visit.totalVisits}`}
                    </p>
                    <h3>{formatDate(visit.dateKey, true)} at {formatTime(visit.startedAt)}</h3>
                    <div className="visitor-visit__markers">
                      <SourceMark source={visit.trafficSource} />
                      <BotMark visit={visit} />
                      <DeviceMark visit={visit} />
                      <LocationMark visit={visit} />
                      <WebDriverMark visit={visit} />
                    </div>
                  </div>
                  <dl>
                    <div><dt>Landing page</dt><dd>{visit.landingPath}</dd></div>
                    <div><dt>Pages</dt><dd>{visit.pageViews.length}</dd></div>
                    <div><dt>Active time</dt><dd>{activeSeconds ? formatActiveTime(activeSeconds) : "Not recorded"}</dd></div>
                  </dl>
                </header>

                <VisitDetailPanel
                  detailId={`visitor-visit-detail-${visit.id}`}
                  headingLevel="h4"
                  selectedEventId={isFocused ? selectedEvent?.id : null}
                  visit={visit}
                />
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
