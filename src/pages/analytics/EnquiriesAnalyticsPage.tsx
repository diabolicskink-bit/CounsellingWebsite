import { useEffect, useMemo, useState } from "react";
import {
  ChevronRight,
  CircleCheck,
  CircleX,
  PhoneCall,
  Radio,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import {
  getPerthDateKey,
  getPerthMonthKey,
  isAnalyticsMonthKey,
  type AnalyticsVisit,
  type AnalyticsVisitEvent,
} from "../../data/analyticsContract";
import useDocumentMetadata from "../../hooks/useDocumentMetadata";
import { MonthControls } from "./AnalyticsControls";
import {
  enquiryOptionForEvent,
  eventDetail,
  eventLabel,
  formatDate,
  formatMonth,
  formatTime,
  visitLocationCompactLabel,
  visitorLabel,
} from "./analyticsFormatters";
import { AnalyticsShell, ReportState } from "./AnalyticsShell";
import VisitorHistory from "./VisitorHistory";
import useAnalyticsReport from "./useAnalyticsReport";

function MonthlyEnquiries({
  currentMonth,
  includeBots,
  monthKey,
  onMonthChange,
  onOpenEnquiry,
  visits,
}: {
  currentMonth: string;
  includeBots: boolean;
  monthKey: string;
  onMonthChange: (month: string) => void;
  onOpenEnquiry: (visit: AnalyticsVisit, visitEvent: AnalyticsVisitEvent) => void;
  visits: AnalyticsVisit[];
}) {
  const enquiryEvents = useMemo(() => visits
    .filter((visit) => includeBots || visit.isBot !== true)
    .flatMap((visit) => visit.events
      .filter((visitEvent) => (
        visitEvent.eventType === "enquiry_sent"
        || visitEvent.eventType === "enquiry_failed"
        || visitEvent.eventType === "phone_link_clicked"
      ) && getPerthMonthKey(new Date(visitEvent.occurredAt)) === monthKey)
      .map((visitEvent) => ({ visit, visitEvent })))
    .sort((left, right) => new Date(right.visitEvent.occurredAt).getTime()
      - new Date(left.visitEvent.occurredAt).getTime()), [includeBots, monthKey, visits]);
  const sentCount = enquiryEvents.filter(({ visitEvent }) => visitEvent.eventType === "enquiry_sent").length;
  const phoneCount = enquiryEvents.filter(({ visitEvent }) => visitEvent.eventType === "phone_link_clicked").length;
  const failedCount = enquiryEvents.length - sentCount - phoneCount;
  const completedEnquiries = enquiryEvents.filter(({ visitEvent }) => (
    visitEvent.eventType === "enquiry_sent"
    || visitEvent.eventType === "phone_link_clicked"
  ));
  const enquiryCount = completedEnquiries.length;
  const visitorCount = new Set(completedEnquiries.map(({ visit }) => visit.visitorId)).size;
  const formAttemptCount = sentCount + failedCount;
  const sendRate = formAttemptCount
    ? Math.round((sentCount / formAttemptCount) * 100)
    : null;

  return (
    <>
      <section className="signal-report__overview" aria-labelledby="monthly-enquiries-title">
        <div className="signal-report__intro">
          <p className="signal-kicker">Calendar month</p>
          <h1 id="monthly-enquiries-title">{formatMonth(monthKey)}</h1>
          <p>Recorded phone enquiries and sent or failed contact-form outcomes in Australia/Perth time.</p>
        </div>
        <MonthControls currentMonth={currentMonth} monthKey={monthKey} onMonthChange={onMonthChange} />

        <dl
          className="signal-report__summary monthly-enquiries__summary"
          aria-label="Monthly enquiry summary"
        >
          <div>
            <dt>Enquiries</dt>
            <dd>
              {String(enquiryCount).padStart(2, "0")}
              <small>{`${visitorCount} ${visitorCount === 1 ? "visitor" : "visitors"}`}</small>
            </dd>
          </div>
          <div><dt>Form sent</dt><dd>{String(sentCount).padStart(2, "0")}</dd></div>
          <div>
            <dt>Phone</dt>
            <dd>
              {String(phoneCount).padStart(2, "0")}
              <small>number clicks</small>
            </dd>
          </div>
          <div>
            <dt>Form send rate</dt>
            <dd>
              {sendRate === null ? "—" : `${sendRate}%`}
              <small>{`${failedCount} failed`}</small>
            </dd>
          </div>
        </dl>
      </section>

      <section className="signal-report__section" aria-labelledby="monthly-enquiry-list-title">
        <header className="signal-report__section-header">
          <div>
            <p className="signal-kicker">Newest first</p>
            <h2 id="monthly-enquiry-list-title">All enquiries</h2>
          </div>
          <span>{enquiryEvents.length} {enquiryEvents.length === 1 ? "record" : "records"}</span>
        </header>

        {enquiryEvents.length ? (
          <ol className="signal-report__list monthly-enquiries__list">
            {enquiryEvents.map(({ visit, visitEvent }) => {
              const wasSent = visitEvent.eventType === "enquiry_sent";
              const wasPhone = visitEvent.eventType === "phone_link_clicked";
              const option = wasPhone ? null : enquiryOptionForEvent(visit, visitEvent);
              const detail = wasPhone ? "Phone number clicked" : eventDetail(visitEvent);
              const dateKey = getPerthDateKey(new Date(visitEvent.occurredAt));
              const label = wasPhone ? "Phone enquiry" : eventLabel(visitEvent);

              return (
                <li key={visitEvent.id}>
                  <button
                    aria-label={`${label} on ${formatDate(dateKey)} at ${formatTime(visitEvent.occurredAt)}. Open enquiry journey for ${visitorLabel(visit.visitorId)}`}
                    className="signal-report__list-button"
                    onClick={() => onOpenEnquiry(visit, visitEvent)}
                    type="button"
                  >
                    <span className={wasSent
                      ? "signal-report__status signal-report__status--sent"
                      : wasPhone
                        ? "signal-report__status signal-report__status--phone"
                        : "signal-report__status signal-report__status--failed"}
                    >
                      {wasSent
                        ? <CircleCheck aria-hidden="true" size={19} />
                        : wasPhone
                          ? <PhoneCall aria-hidden="true" size={18} />
                          : <CircleX aria-hidden="true" size={19} />}
                    </span>
                    <span className="monthly-enquiries__date">
                      <strong>{formatDate(dateKey, true)}</strong>
                      <time dateTime={visitEvent.occurredAt}>{formatTime(visitEvent.occurredAt)}</time>
                    </span>
                    <span className="monthly-enquiries__outcome">
                      <strong>{label}</strong>
                      <small>{[option, detail].filter(Boolean).join(" · ") || "Contact form"}</small>
                    </span>
                    <span className="monthly-enquiries__visitor">
                      <strong>{visitorLabel(visit.visitorId)}</strong>
                      <small>
                        {visitLocationCompactLabel(visit)} {"\u00b7"} Visit {visit.visitNumber} of {visit.totalVisits}
                      </small>
                    </span>
                    <ChevronRight aria-hidden="true" size={18} />
                  </button>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="signal-stream__empty">
            <Radio aria-hidden="true" size={30} />
            <h3>No enquiries recorded</h3>
            <p>No phone enquiries or contact-form outcomes were recorded in {formatMonth(monthKey)}.</p>
          </div>
        )}
      </section>

      <p className="signal-footnote">
        A phone enquiry is recorded when the phone number is clicked; this does not confirm that a call was placed or answered. Each form outcome appears as one row, so a failed submission followed by a retry appears twice. {includeBots ? "Bot visits are included in this view." : "Visits identified as bots are excluded; unclassified records are treated as visits."}
      </p>
    </>
  );
}

export default function EnquiriesAnalyticsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [todayKey, setTodayKey] = useState(getPerthDateKey);
  const currentMonth = todayKey.slice(0, 7);
  const requestedMonth = searchParams.get("month");
  const monthKey = isAnalyticsMonthKey(requestedMonth) && requestedMonth <= currentMonth
    ? requestedMonth
    : currentMonth;
  const includeBots = searchParams.get("bots") === "include";
  const requestedVisitorId = searchParams.get("visitor");
  const focusedVisitId = searchParams.get("visit");
  const focusedEventId = searchParams.get("event");
  const expectedType = requestedVisitorId ? "visitor" : "monthly";
  const requestUrl = requestedVisitorId
    ? `/api/analytics?visitor=${encodeURIComponent(requestedVisitorId)}`
    : `/api/analytics?month=${encodeURIComponent(monthKey)}`;
  const { report, retry, status } = useAnalyticsReport(requestUrl, expectedType);

  useDocumentMetadata(
    "Enquiries | Vive Analytics",
    "Private monthly enquiry analytics for Vive Counselling.",
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [requestedVisitorId]);

  function refreshReport() {
    setTodayKey(getPerthDateKey());
    retry();
  }

  function updateIncludeBots(nextIncludeBots: boolean) {
    const nextParams = new URLSearchParams(searchParams);
    if (nextIncludeBots) nextParams.set("bots", "include");
    else nextParams.delete("bots");
    setSearchParams(nextParams);
  }

  function updateMonth(nextMonth: string) {
    if (!isAnalyticsMonthKey(nextMonth) || nextMonth > currentMonth) return;
    const nextParams = new URLSearchParams();
    if (includeBots) nextParams.set("bots", "include");
    if (nextMonth !== currentMonth) nextParams.set("month", nextMonth);
    setSearchParams(nextParams);
  }

  function enquiryContextParams() {
    const nextParams = new URLSearchParams();
    if (includeBots) nextParams.set("bots", "include");
    if (monthKey !== currentMonth) nextParams.set("month", monthKey);
    return nextParams;
  }

  function openEnquiry(visit: AnalyticsVisit, visitEvent: AnalyticsVisitEvent) {
    const nextParams = enquiryContextParams();
    nextParams.set("event", visitEvent.id);
    nextParams.set("visitor", visit.visitorId);
    nextParams.set("visit", visit.id);
    setSearchParams(nextParams);
  }

  function closeVisitor() {
    setSearchParams(enquiryContextParams());
  }

  const monthlyReport = report?.type === "monthly" ? report : null;
  const visitorReport = report?.type === "visitor" ? report : null;

  return (
    <AnalyticsShell
      detailTitle={requestedVisitorId
        ? (focusedEventId ? "Enquiry journey" : "Visitor history")
        : "Monthly enquiries"}
      includeBots={includeBots}
      onIncludeBotsChange={updateIncludeBots}
      onRefresh={refreshReport}
      showBotControl
      status={status}
    >
      {status !== "ready" ? <ReportState onRetry={refreshReport} status={status} /> : null}
      {status === "ready" && requestedVisitorId && visitorReport ? (
        <VisitorHistory
          backLabel={`${formatMonth(monthKey)} enquiries`}
          focusedEventId={focusedEventId}
          focusedVisitId={focusedVisitId}
          includeBots={includeBots}
          onBack={closeVisitor}
          report={visitorReport}
        />
      ) : null}
      {status === "ready" && !requestedVisitorId && monthlyReport ? (
        <MonthlyEnquiries
          currentMonth={currentMonth}
          includeBots={includeBots}
          monthKey={monthlyReport.month}
          onMonthChange={updateMonth}
          onOpenEnquiry={openEnquiry}
          visits={monthlyReport.visits}
        />
      ) : null}
    </AnalyticsShell>
  );
}
