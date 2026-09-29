import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronRight,
  CircleCheck,
  CircleX,
  Mail,
  PhoneCall,
  Radio,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import {
  getPerthDateKey,
  getPerthMonthKey,
  isAnalyticsMonthKey,
  isEnquiryEventType,
  type AnalyticsVisit,
  type AnalyticsVisitEvent,
  type MonthlyAnalyticsReport,
} from "../../contracts/analyticsContract";
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

const defaultPaidVisitCostCents = 310;
const costFormatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});

const contactEnquiryOutcomes = {
  email_link_clicked: {
    detail: "Email address clicked",
    Icon: Mail,
    label: "Email enquiry",
    status: "email",
  },
  phone_link_clicked: {
    detail: "Phone number clicked",
    Icon: PhoneCall,
    label: "Phone enquiry",
    status: "phone",
  },
};

function EnquiryListItem({
  onOpenEnquiry,
  visit,
  visitEvent,
}: {
  onOpenEnquiry: (visit: AnalyticsVisit, visitEvent: AnalyticsVisitEvent) => void;
  visit: AnalyticsVisit;
  visitEvent: AnalyticsVisitEvent;
}) {
  const contactOutcome = visitEvent.eventType === "email_link_clicked"
    || visitEvent.eventType === "phone_link_clicked"
    ? contactEnquiryOutcomes[visitEvent.eventType]
    : null;
  const wasSent = visitEvent.eventType === "enquiry_sent";
  const Icon = contactOutcome?.Icon ?? (wasSent ? CircleCheck : CircleX);
  const status = contactOutcome?.status ?? (wasSent ? "sent" : "failed");
  const label = contactOutcome?.label ?? eventLabel(visitEvent);
  const detail = contactOutcome?.detail ?? (
    [enquiryOptionForEvent(visit, visitEvent), eventDetail(visitEvent)]
      .filter(Boolean).join(" \u00b7 ") || "Contact form"
  );
  const dateKey = getPerthDateKey(new Date(visitEvent.occurredAt));

  return (
    <li>
      <button
        aria-label={`${label} on ${formatDate(dateKey)} at ${formatTime(visitEvent.occurredAt)}. Open enquiry journey for ${visitorLabel(visit.visitorId)}`}
        className="signal-report__list-button"
        onClick={() => onOpenEnquiry(visit, visitEvent)}
        type="button"
      >
        <span className={`signal-report__status signal-report__status--${status}`}>
          <Icon aria-hidden="true" size={contactOutcome ? 18 : 19} />
        </span>
        <span className="monthly-enquiries__date">
          <strong>{formatDate(dateKey, true)}</strong>
          <time dateTime={visitEvent.occurredAt}>{formatTime(visitEvent.occurredAt)}</time>
        </span>
        <span className="monthly-enquiries__outcome">
          <strong>{label}</strong>
          <small>{detail}</small>
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
}

function MonthlyEnquiries({
  currentMonth,
  includeBots,
  onAdjustPaidVisitCost,
  onMonthChange,
  onOpenEnquiry,
  paidVisitCostCents,
  report,
}: {
  currentMonth: string;
  includeBots: boolean;
  onAdjustPaidVisitCost: (changeInCents: -1 | 1) => void;
  onMonthChange: (month: string) => void;
  onOpenEnquiry: (visit: AnalyticsVisit, visitEvent: AnalyticsVisitEvent) => void;
  paidVisitCostCents: number;
  report: MonthlyAnalyticsReport;
}) {
  const { month: monthKey, paidAttributedEnquiries, paidVisits, paidVisitsWithEnquiry, visits } = report;
  const enquiryEvents = useMemo(() => visits
    .filter((visit) => includeBots || visit.isBot !== true)
    .flatMap((visit) => visit.events
      .filter((visitEvent) => (
        isEnquiryEventType(visitEvent.eventType)
        || visitEvent.eventType === "enquiry_failed"
      ) && getPerthMonthKey(new Date(visitEvent.occurredAt)) === monthKey)
      .map((visitEvent) => ({ visit, visitEvent })))
    .sort((left, right) => new Date(right.visitEvent.occurredAt).getTime()
      - new Date(left.visitEvent.occurredAt).getTime()), [includeBots, monthKey, visits]);
  const summary = useMemo(() => ({
    enquiries: enquiryEvents.filter(({ visitEvent }) => isEnquiryEventType(visitEvent.eventType)).length,
    form: enquiryEvents.filter(({ visitEvent }) => visitEvent.eventType === "enquiry_sent").length,
    phone: enquiryEvents.filter(({ visitEvent }) => visitEvent.eventType === "phone_link_clicked").length,
    email: enquiryEvents.filter(({ visitEvent }) => visitEvent.eventType === "email_link_clicked").length,
  }), [enquiryEvents]);
  const paidVisitEnquiryRate = paidVisits > 0
    ? Math.round((paidVisitsWithEnquiry / paidVisits) * 1000) / 10
    : null;
  const paidVisitCost = paidVisitCostCents / 100;
  const formattedPaidVisitCost = costFormatter.format(paidVisitCost);
  const averageCostPerEnquiry = paidAttributedEnquiries > 0
    ? (paidVisits * paidVisitCost) / paidAttributedEnquiries
    : null;

  return (
    <>
      <section className="signal-report__overview" aria-labelledby="monthly-enquiries-title">
        <div className="signal-report__intro">
          <p className="signal-kicker">Calendar month</p>
          <h1 id="monthly-enquiries-title">{formatMonth(monthKey)}</h1>
          <p>Recorded phone and email enquiries and sent or failed contact-form outcomes in Australia/Perth time.</p>
        </div>
        <MonthControls currentMonth={currentMonth} monthKey={monthKey} onMonthChange={onMonthChange} />

        <dl
          className="signal-report__summary monthly-enquiries__summary"
          aria-label="Monthly enquiry summary"
        >
          {[
            { label: "Enquiries", count: summary.enquiries },
            { label: "Form Enquiries", count: summary.form },
            { label: "Phone Enquiries", count: summary.phone },
            { label: "Email Enquiries", count: summary.email },
          ].map(({ label, count }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{String(count).padStart(2, "0")}</dd>
            </div>
          ))}
        </dl>
        <dl
          className="signal-report__summary monthly-enquiries__paid-summary"
          aria-label="Paid visit enquiry summary"
        >
          <div><dt>Paid visits</dt><dd>{paidVisits}</dd></div>
          <div><dt>Enquiries with paid history</dt><dd>{paidAttributedEnquiries}</dd></div>
          <div>
            <dt>Paid visit enquiry rate</dt>
            <dd>{paidVisitEnquiryRate === null ? "N/A" : `${paidVisitEnquiryRate}%`}</dd>
          </div>
          <div className="monthly-enquiries__cost-card">
            <dt>Avg CPE</dt>
            <dd className="monthly-enquiries__cost-result">
              {averageCostPerEnquiry === null ? "N/A" : costFormatter.format(averageCostPerEnquiry)}
            </dd>
            <dt>Avg CPC</dt>
            <dd className="monthly-enquiries__cost-control">
              <strong className="monthly-enquiries__cost-value">{formattedPaidVisitCost}</strong>
              <span className="monthly-enquiries__cost-arrows">
                <button
                  onClick={() => onAdjustPaidVisitCost(1)}
                  title="Increase cost per paid visit by one cent"
                  type="button"
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  disabled={paidVisitCostCents === 0}
                  onClick={() => onAdjustPaidVisitCost(-1)}
                  title="Decrease cost per paid visit by one cent"
                  type="button"
                >
                  <ArrowDown size={16} />
                </button>
              </span>
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
            {enquiryEvents.map(({ visit, visitEvent }) => (
              <EnquiryListItem
                key={visitEvent.id}
                onOpenEnquiry={onOpenEnquiry}
                visit={visit}
                visitEvent={visitEvent}
              />
            ))}
          </ol>
        ) : (
          <div className="signal-stream__empty">
            <Radio aria-hidden="true" size={30} />
            <h3>No enquiries recorded</h3>
            <p>No phone or email enquiries or contact-form outcomes were recorded in {formatMonth(monthKey)}.</p>
          </div>
        )}
      </section>

      <p className="signal-footnote">
        Phone and email enquiries are recorded when their contact links are clicked; this does not confirm that a call was placed or an email was sent.
        Each form outcome appears as one row, so a failed submission followed by a retry appears twice.
        Paid visits started in the selected month. Enquiries with paid history occurred this month after a paid visit by the same browser, including visits from earlier months.
        The rate is the share of this month's paid visits credited with an enquiry this month; each enquiry credits the latest preceding paid visit by that browser.
        Average cost per enquiry is this month's paid visits at {formattedPaidVisitCost} each, divided by enquiries with paid history.
        {includeBots ? "Bot visits are included in this view." : "Visits identified as bots are excluded; unclassified records are treated as visits."}
      </p>
    </>
  );
}

export default function EnquiriesAnalyticsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentMonth, setCurrentMonth] = useState(getPerthMonthKey);
  const [paidVisitCostCents, setPaidVisitCostCents] = useState(defaultPaidVisitCostCents);
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
    : `/api/analytics?month=${encodeURIComponent(monthKey)}${includeBots ? "&bots=include" : ""}`;
  const { report, retry, status } = useAnalyticsReport(requestUrl, expectedType);

  useDocumentMetadata(
    "Enquiries | Vive Analytics",
    "Private monthly enquiry analytics for Vive Counselling.",
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [requestedVisitorId]);

  function adjustPaidVisitCost(changeInCents: -1 | 1) {
    setPaidVisitCostCents((costInCents) => Math.max(0, costInCents + changeInCents));
  }

  function refreshReport() {
    setCurrentMonth(getPerthMonthKey());
    retry();
  }

  function updateIncludeBots(nextIncludeBots: boolean) {
    const nextParams = new URLSearchParams(searchParams);
    if (nextIncludeBots) nextParams.set("bots", "include");
    else nextParams.delete("bots");
    setSearchParams(nextParams);
  }

  function enquiryContextParams(selectedMonth = monthKey) {
    const nextParams = new URLSearchParams();
    if (includeBots) nextParams.set("bots", "include");
    if (selectedMonth !== currentMonth) nextParams.set("month", selectedMonth);
    return nextParams;
  }

  function updateMonth(nextMonth: string) {
    if (!isAnalyticsMonthKey(nextMonth) || nextMonth > currentMonth) return;
    setSearchParams(enquiryContextParams(nextMonth));
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
      {status !== "ready" ? (
        <ReportState onRetry={refreshReport} status={status} />
      ) : report?.type === "visitor" ? (
        <VisitorHistory
          backLabel={`${formatMonth(monthKey)} enquiries`}
          focusedEventId={focusedEventId}
          focusedVisitId={focusedVisitId}
          includeBots={includeBots}
          onBack={closeVisitor}
          report={report}
        />
      ) : report?.type === "monthly" ? (
        <MonthlyEnquiries
          currentMonth={currentMonth}
          includeBots={includeBots}
          onAdjustPaidVisitCost={adjustPaidVisitCost}
          onMonthChange={updateMonth}
          onOpenEnquiry={openEnquiry}
          paidVisitCostCents={paidVisitCostCents}
          report={report}
        />
      ) : null}
    </AnalyticsShell>
  );
}
