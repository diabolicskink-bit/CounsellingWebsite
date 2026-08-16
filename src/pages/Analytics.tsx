import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  CircleX,
  Clock3,
  LockKeyhole,
  Radio,
  RefreshCw,
  Route,
} from "lucide-react";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import {
  getPerthDateKey,
  getPerthMonthKey,
  isAnalyticsDateKey,
  isAnalyticsMonthKey,
  type AnalyticsApiResponse,
  type AnalyticsReport,
  type AnalyticsTrafficSource,
  type AnalyticsVisit,
  type AnalyticsVisitEvent,
  type DailyAnalyticsReport,
  type MonthlyAnalyticsReport,
  type VisitorAnalyticsReport,
} from "../data/analyticsContract";
import { privateRoutePaths } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-analytics.css";

type AnalyticsLoadState =
  | { report: null; status: "error" | "loading" }
  | { report: AnalyticsReport; status: "ready" };

type VisitJourneyItem =
  | {
      id: string;
      kind: "event";
      occurredAt: string;
      visitEvent: AnalyticsVisitEvent;
    }
  | {
      id: string;
      kind: "page";
      occurredAt: string;
      path: string;
    };

const perthTimeFormatter = new Intl.DateTimeFormat("en-AU", {
  hour: "2-digit",
  hour12: false,
  minute: "2-digit",
  timeZone: "Australia/Perth",
});

const displayDateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  weekday: "long",
  year: "numeric",
});

const compactDateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});

const monthFormatter = new Intl.DateTimeFormat("en-AU", {
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12));
}

function shiftDateKey(dateKey: string, offset: number) {
  const shiftedDate = parseDateKey(dateKey);
  shiftedDate.setUTCDate(shiftedDate.getUTCDate() + offset);
  return shiftedDate.toISOString().slice(0, 10);
}

function formatDate(dateKey: string, compact = false) {
  return (compact ? compactDateFormatter : displayDateFormatter).format(parseDateKey(dateKey));
}

function formatTime(timestamp: string) {
  return perthTimeFormatter.format(new Date(timestamp));
}

function formatDuration(seconds: number) {
  if (seconds < 60) return "< 1 min";
  const minutes = Math.max(1, Math.round(seconds / 60));
  return `${minutes} min`;
}

function visitorLabel(visitorId: string) {
  const suffix = visitorId.replace(/-/g, "").slice(-6).toUpperCase();
  return `Browser ${suffix}`;
}

function sourceLabel(source: AnalyticsTrafficSource) {
  if (source === "paid") return "Paid";
  if (source === "referral") return "Referral";
  if (source === "internal") return "Internal";
  return "Direct";
}

function networkLabel(networkCode: string | null) {
  if (networkCode === "g") return "Google Search";
  if (networkCode === "s") return "Search partners";
  if (networkCode === "d") return "Google Display";
  return networkCode ?? "Network unavailable";
}

function matchTypeLabel(matchType: string | null) {
  if (matchType === "e") return "Exact";
  if (matchType === "p") return "Phrase";
  if (matchType === "b") return "Broad";
  return matchType ?? "Match unavailable";
}

function adNetworkDetail(visit: AnalyticsVisit) {
  const values = [
    visit.adCode,
    visit.networkCode ? networkLabel(visit.networkCode) : null,
  ].filter((value): value is string => Boolean(value));

  if (values.length) return values.join(" / ");
  return visit.trafficSource === "paid" ? "None recorded" : "Not a paid visit";
}

function keywordMatchDetail(visit: AnalyticsVisit) {
  const values = [
    visit.matchedKeyword,
    visit.matchType ? matchTypeLabel(visit.matchType) : null,
  ].filter((value): value is string => Boolean(value));

  return values.length ? values.join(" / ") : "None recorded";
}

function sourceDetail(visit: AnalyticsVisit) {
  if (visit.trafficSource === "paid") {
    return `${networkLabel(visit.networkCode)} · ${visit.matchedKeyword ?? "Keyword unavailable"} · ${matchTypeLabel(visit.matchType)}`;
  }

  if (visit.trafficSource === "referral" || visit.trafficSource === "internal") {
    return visit.referrerHost ?? "Referrer unavailable";
  }

  return "No referrer";
}

function parseMonthKey(monthKey: string) {
  return parseDateKey(`${monthKey}-01`);
}

function shiftMonthKey(monthKey: string, offset: number) {
  const shiftedMonth = parseMonthKey(monthKey);
  shiftedMonth.setUTCMonth(shiftedMonth.getUTCMonth() + offset);
  return shiftedMonth.toISOString().slice(0, 7);
}

function formatMonth(monthKey: string) {
  return monthFormatter.format(parseMonthKey(monthKey));
}

const eventLabels: Record<string, string> = {
  contact_option_selected: "Contact option selected",
  enquiry_failed: "Enquiry failed",
  enquiry_sent: "Enquiry sent",
  enquiry_started: "Enquiry started",
  enquiry_submit_attempted: "Enquiry submit attempted",
};

const contactOptionLabels: Record<string, string> = {
  appointment: "Make an appointment",
  consult: "Request a 15-minute consult",
  question: "General enquiry",
};

const failureReasonLabels: Record<string, string> = {
  configuration: "Configuration",
  email_provider: "Email provider",
  network: "Network",
  server: "Server",
};

function eventLabel(visitEvent: AnalyticsVisitEvent) {
  return eventLabels[visitEvent.eventType] ?? visitEvent.eventType.split("_").join(" ");
}

function eventProperty(visitEvent: AnalyticsVisitEvent, ...keys: string[]) {
  return keys.map((key) => visitEvent.properties[key]).find(Boolean) ?? null;
}

function contactOptionLabel(value: string | null) {
  if (!value) return null;
  return contactOptionLabels[value] ?? value.split("_").join(" ");
}

function eventDetail(visitEvent: AnalyticsVisitEvent) {
  if (visitEvent.eventType === "contact_option_selected") {
    return contactOptionLabel(eventProperty(visitEvent, "option", "contactOption", "contact_option"));
  }

  if (visitEvent.eventType === "enquiry_failed") {
    const reason = eventProperty(visitEvent, "reason", "failureReason", "failure_reason");
    return reason ? (failureReasonLabels[reason] ?? reason.split("_").join(" ")) : null;
  }

  return null;
}

function visitJourney(visit: AnalyticsVisit): VisitJourneyItem[] {
  return [
    ...visit.pageViews.map((pageView) => ({
      id: pageView.id,
      kind: "page" as const,
      occurredAt: pageView.viewedAt,
      path: pageView.path,
    })),
    ...(visit.events ?? []).map((visitEvent) => ({
      id: visitEvent.id,
      kind: "event" as const,
      occurredAt: visitEvent.occurredAt,
      visitEvent,
    })),
  ].sort((left, right) => {
    const timeDifference = new Date(left.occurredAt).getTime() - new Date(right.occurredAt).getTime();
    if (timeDifference !== 0) return timeDifference;
    if (left.kind !== right.kind) return left.kind === "page" ? -1 : 1;
    return left.id.localeCompare(right.id);
  });
}

function enquiryOptionForEvent(visit: AnalyticsVisit, targetEvent: AnalyticsVisitEvent) {
  const ownOption = contactOptionLabel(eventProperty(targetEvent, "option", "contactOption", "contact_option"));
  if (ownOption) return ownOption;

  const targetTime = new Date(targetEvent.occurredAt).getTime();
  const selectedOption = [...(visit.events ?? [])]
    .filter((visitEvent) => visitEvent.eventType === "contact_option_selected"
      && new Date(visitEvent.occurredAt).getTime() <= targetTime)
    .sort((left, right) => new Date(right.occurredAt).getTime() - new Date(left.occurredAt).getTime())[0];

  return selectedOption ? eventDetail(selectedOption) : null;
}

function JourneyTimeline({
  selectedEventId,
  visit,
}: {
  selectedEventId?: string | null;
  visit: AnalyticsVisit;
}) {
  const pagePathById = new Map(visit.pageViews.map((pageView) => [pageView.id, pageView.path]));

  return (
    <ol className="signal-journey">
      {visitJourney(visit).map((item, index) => {
        if (item.kind === "page") {
          return (
            <li className="signal-journey__page" key={`page-${item.id}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <time dateTime={item.occurredAt}>{formatTime(item.occurredAt)}</time>
              <strong>{item.path}</strong>
            </li>
          );
        }

        const isSelected = item.id === selectedEventId;
        const detail = eventDetail(item.visitEvent);
        const pagePath = item.visitEvent.pageViewId
          ? pagePathById.get(item.visitEvent.pageViewId)
          : null;

        return (
          <li
            aria-current={isSelected ? "true" : undefined}
            className={isSelected
              ? "signal-journey__event signal-journey__event--selected"
              : "signal-journey__event"}
            id={isSelected ? `selected-event-${item.id}` : undefined}
            key={`event-${item.id}`}
          >
            <span>EV</span>
            <time dateTime={item.occurredAt}>{formatTime(item.occurredAt)}</time>
            <div>
              <strong>{eventLabel(item.visitEvent)}</strong>
              {detail || pagePath ? (
                <small>{[detail, pagePath].filter(Boolean).join(" · ")}</small>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function botDetail(visit: AnalyticsVisit) {
  return [visit.botName ?? "Unknown bot", visit.botCategory]
    .filter((value): value is string => Boolean(value))
    .join(" · ");
}

function isAnalyticsReport(value: unknown): value is AnalyticsReport {
  if (!value || typeof value !== "object") return false;
  const report = value as Partial<AnalyticsReport>;

  return (report.type === "daily" || report.type === "monthly" || report.type === "visitor")
    && Array.isArray(report.visits);
}

function useAnalyticsReport(query: string) {
  const [requestVersion, setRequestVersion] = useState(0);
  const [state, setState] = useState<AnalyticsLoadState>({ report: null, status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    setState({ report: null, status: "loading" });

    async function loadReport() {
      try {
        const response = await fetch(`/api/analytics?${query}`, {
          credentials: "same-origin",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        const body = await response.json() as Partial<AnalyticsApiResponse>;

        if (!response.ok || !isAnalyticsReport(body.data)) {
          throw new Error("Analytics request failed.");
        }

        setState({ report: body.data, status: "ready" });
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Analytics request failed:", error instanceof Error ? error.name : "UnknownError");
        setState({ report: null, status: "error" });
      }
    }

    void loadReport();
    return () => controller.abort();
  }, [query, requestVersion]);

  return {
    ...state,
    retry: () => setRequestVersion((version) => version + 1),
  };
}

function SourceMark({ source }: { source: AnalyticsTrafficSource }) {
  return (
    <span className={`signal-source signal-source--${source}`}>
      <i aria-hidden="true" />
      {sourceLabel(source)}
    </span>
  );
}

function BotMark({ visit }: { visit: AnalyticsVisit }) {
  if (!visit.isBot) return null;

  return (
    <span className="signal-bot">
      <Bot aria-hidden="true" size={13} />
      {visit.botName ?? "Unknown bot"}
      {visit.botCategory ? <small>{visit.botCategory}</small> : null}
    </span>
  );
}

function SignalHeader({
  detailTitle,
  includeBots,
  onHome,
  onIncludeBotsChange,
  onRefresh,
  status,
}: {
  detailTitle: "Daily activity" | "Enquiry journey" | "Monthly enquiries" | "Visitor history";
  includeBots: boolean;
  onHome: () => void;
  onIncludeBotsChange: (includeBots: boolean) => void;
  onRefresh: () => void;
  status: AnalyticsLoadState["status"];
}) {
  return (
    <header className="signal-header">
      <div className="signal-header__inner">
        <button className="signal-header__brand" onClick={onHome} type="button">
          <span>V</span>
          <strong>Vive</strong>
        </button>
        <div className="signal-header__title">
          <small>Private analytics</small>
          <strong>{detailTitle}</strong>
        </div>
        <nav aria-label="Analytics views" className="signal-header__views">
          <NavLink end to={privateRoutePaths.analytics}>Daily</NavLink>
          <NavLink to={privateRoutePaths.analyticsEnquiries}>Enquiries</NavLink>
        </nav>
        <div className="signal-header__system">
          <span><Clock3 aria-hidden="true" size={14} /> Perth time</span>
          <span className="signal-header__warning">
            <LockKeyhole aria-hidden="true" size={14} />
            {import.meta.env.DEV ? "Auth bypassed locally" : "Protected"}
          </span>
          <button
            aria-pressed={includeBots}
            className="signal-header__bots"
            onClick={() => onIncludeBotsChange(!includeBots)}
            type="button"
          >
            <Bot aria-hidden="true" size={14} />
            {includeBots ? "Bots included" : "Include bots"}
          </button>
          <button
            className="signal-header__refresh"
            disabled={status === "loading"}
            onClick={onRefresh}
            type="button"
          >
            <RefreshCw aria-hidden="true" size={14} />
            {status === "loading" ? "Loading" : "Refresh data"}
          </button>
        </div>
      </div>
    </header>
  );
}

function DateControls({
  dateKey,
  isToday,
  onDateChange,
  todayKey,
}: {
  dateKey: string;
  isToday: boolean;
  onDateChange: (date: string) => void;
  todayKey: string;
}) {
  return (
    <div className="signal-date-controls" aria-label="Choose report date">
      <button aria-label="Previous day" onClick={() => onDateChange(shiftDateKey(dateKey, -1))} type="button">
        <ArrowLeft aria-hidden="true" size={17} />
      </button>
      <label>
        <CalendarDays aria-hidden="true" size={15} />
        <span className="signal-visually-hidden">Report date</span>
        <input max={todayKey} onChange={(event) => onDateChange(event.target.value)} type="date" value={dateKey} />
      </label>
      <button aria-label="Next day" disabled={isToday} onClick={() => onDateChange(shiftDateKey(dateKey, 1))} type="button">
        <ArrowRight aria-hidden="true" size={17} />
      </button>
      <button className="signal-date-controls__today" disabled={isToday} onClick={() => onDateChange(todayKey)} type="button">
        Today
      </button>
    </div>
  );
}

function MonthControls({
  currentMonth,
  monthKey,
  onMonthChange,
}: {
  currentMonth: string;
  monthKey: string;
  onMonthChange: (month: string) => void;
}) {
  const isCurrentMonth = monthKey === currentMonth;

  return (
    <div className="signal-date-controls signal-month-controls" aria-label="Choose enquiry month">
      <button aria-label="Previous month" onClick={() => onMonthChange(shiftMonthKey(monthKey, -1))} type="button">
        <ArrowLeft aria-hidden="true" size={17} />
      </button>
      <label>
        <CalendarDays aria-hidden="true" size={15} />
        <span className="signal-visually-hidden">Enquiry month</span>
        <input
          max={currentMonth}
          onChange={(event) => onMonthChange(event.target.value)}
          type="month"
          value={monthKey}
        />
      </label>
      <button
        aria-label="Next month"
        disabled={isCurrentMonth}
        onClick={() => onMonthChange(shiftMonthKey(monthKey, 1))}
        type="button"
      >
        <ArrowRight aria-hidden="true" size={17} />
      </button>
      <button
        className="signal-date-controls__today"
        disabled={isCurrentMonth}
        onClick={() => onMonthChange(currentMonth)}
        type="button"
      >
        This month
      </button>
    </div>
  );
}

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
  const enquiryOutcomes = useMemo(() => visits
    .filter((visit) => includeBots || visit.isBot !== true)
    .flatMap((visit) => visit.events
      .filter((visitEvent) => (
        visitEvent.eventType === "enquiry_sent"
        || visitEvent.eventType === "enquiry_failed"
      ) && getPerthMonthKey(new Date(visitEvent.occurredAt)) === monthKey)
      .map((visitEvent) => ({ visit, visitEvent })))
    .sort((left, right) => new Date(right.visitEvent.occurredAt).getTime()
      - new Date(left.visitEvent.occurredAt).getTime()), [includeBots, monthKey, visits]);
  const sentCount = enquiryOutcomes.filter(({ visitEvent }) => visitEvent.eventType === "enquiry_sent").length;
  const failedCount = enquiryOutcomes.length - sentCount;
  const browserCount = new Set(enquiryOutcomes.map(({ visit }) => visit.visitorId)).size;
  const successRate = enquiryOutcomes.length
    ? Math.round((sentCount / enquiryOutcomes.length) * 100)
    : 0;

  return (
    <>
      <section className="monthly-enquiries__overview" aria-labelledby="monthly-enquiries-title">
        <div className="monthly-enquiries__intro">
          <p className="signal-kicker">Calendar month</p>
          <h1 id="monthly-enquiries-title">{formatMonth(monthKey)}</h1>
          <p>Every recorded sent or failed contact-form outcome in Australia/Perth time.</p>
        </div>
        <MonthControls currentMonth={currentMonth} monthKey={monthKey} onMonthChange={onMonthChange} />

        <dl className="monthly-enquiries__summary" aria-label="Monthly enquiry summary">
          <div><dt>Enquiries</dt><dd>{String(enquiryOutcomes.length).padStart(2, "0")}</dd></div>
          <div><dt>Sent</dt><dd>{String(sentCount).padStart(2, "0")}</dd></div>
          <div><dt>Failed</dt><dd>{String(failedCount).padStart(2, "0")}</dd></div>
          <div>
            <dt>Send rate</dt>
            <dd>
              {successRate}%
              <small>{`${browserCount} ${browserCount === 1 ? "browser" : "browsers"}`}</small>
            </dd>
          </div>
        </dl>
      </section>

      <section className="monthly-enquiries__ledger" aria-labelledby="monthly-enquiry-list-title">
        <header className="monthly-enquiries__ledger-header">
          <div>
            <p className="signal-kicker">Newest first</p>
            <h2 id="monthly-enquiry-list-title">All enquiries</h2>
          </div>
          <span>{enquiryOutcomes.length} {enquiryOutcomes.length === 1 ? "outcome" : "outcomes"}</span>
        </header>

        {enquiryOutcomes.length ? (
          <ol className="monthly-enquiries__list">
            {enquiryOutcomes.map(({ visit, visitEvent }) => {
              const wasSent = visitEvent.eventType === "enquiry_sent";
              const option = enquiryOptionForEvent(visit, visitEvent);
              const failure = eventDetail(visitEvent);
              const dateKey = getPerthDateKey(new Date(visitEvent.occurredAt));

              return (
                <li key={visitEvent.id}>
                  <button
                    aria-label={`${eventLabel(visitEvent)} on ${formatDate(dateKey)} at ${formatTime(visitEvent.occurredAt)}. Open enquiry journey for ${visitorLabel(visit.visitorId)}`}
                    onClick={() => onOpenEnquiry(visit, visitEvent)}
                    type="button"
                  >
                    <span className={wasSent
                      ? "enquiry-activity__status enquiry-activity__status--sent"
                      : "enquiry-activity__status enquiry-activity__status--failed"}
                    >
                      {wasSent
                        ? <CircleCheck aria-hidden="true" size={19} />
                        : <CircleX aria-hidden="true" size={19} />}
                    </span>
                    <span className="monthly-enquiries__date">
                      <strong>{formatDate(dateKey, true)}</strong>
                      <time dateTime={visitEvent.occurredAt}>{formatTime(visitEvent.occurredAt)}</time>
                    </span>
                    <span className="enquiry-activity__outcome">
                      <strong>{eventLabel(visitEvent)}</strong>
                      <small>{[option, failure].filter(Boolean).join(" · ") || "Contact form"}</small>
                    </span>
                    <span className="enquiry-activity__visitor">
                      <strong>{visitorLabel(visit.visitorId)}</strong>
                      <small>Visit {visit.visitNumber} of {visit.totalVisits}</small>
                    </span>
                    <ChevronRight aria-hidden="true" size={18} />
                  </button>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="signal-stream__empty monthly-enquiries__empty">
            <Radio aria-hidden="true" size={30} />
            <h3>No enquiries recorded</h3>
            <p>No sent or failed contact-form outcomes were recorded in {formatMonth(monthKey)}.</p>
          </div>
        )}
      </section>

      <p className="signal-footnote">
        Each sent or failed submission outcome appears as one row, so a failed submission followed by a retry appears twice. {includeBots ? "Bot visits are included in this view." : "Visits identified as bots are excluded; unclassified records are treated as visits."}
      </p>
    </>
  );
}

function DailyObservatory({
  dateKey,
  expandedVisitId,
  includeBots,
  onDateChange,
  onOpenEnquiry,
  onOpenVisitor,
  onToggleVisit,
  todayKey,
  visits,
}: {
  dateKey: string;
  expandedVisitId: string | null;
  includeBots: boolean;
  onDateChange: (date: string) => void;
  onOpenEnquiry: (visit: AnalyticsVisit, visitEvent: AnalyticsVisitEvent) => void;
  onOpenVisitor: (visit: AnalyticsVisit) => void;
  onToggleVisit: (visitId: string) => void;
  todayKey: string;
  visits: AnalyticsVisit[];
}) {
  const includedVisits = useMemo(
    () => includeBots ? visits : visits.filter((visit) => visit.isBot !== true),
    [includeBots, visits],
  );
  const summary = useMemo(() => {
    return {
      direct: includedVisits.filter((visit) => visit.trafficSource === "direct").length,
      internal: includedVisits.filter((visit) => visit.trafficSource === "internal").length,
      pages: includedVisits.reduce((total, visit) => total + visit.pageViews.length, 0),
      paid: includedVisits.filter((visit) => visit.trafficSource === "paid").length,
      referral: includedVisits.filter((visit) => visit.trafficSource === "referral").length,
      returning: includedVisits.filter((visit) => visit.visitNumber > 1).length,
      visits: includedVisits.length,
    };
  }, [includedVisits]);
  const enquiryActivity = useMemo(() => includedVisits
    .flatMap((visit) => (visit.events ?? [])
      .filter((visitEvent) => visitEvent.eventType === "enquiry_sent"
        || visitEvent.eventType === "enquiry_failed")
      .map((visitEvent) => ({ visit, visitEvent })))
    .sort((left, right) => new Date(right.visitEvent.occurredAt).getTime()
      - new Date(left.visitEvent.occurredAt).getTime()), [includedVisits]);
  const isToday = dateKey === todayKey;
  const denominator = Math.max(summary.visits, 1);
  const paidEnd = (summary.paid / denominator) * 360;
  const referralEnd = paidEnd + (summary.referral / denominator) * 360;
  const internalEnd = referralEnd + (summary.internal / denominator) * 360;
  const spectrumStyle = {
    "--signal-internal-end": `${internalEnd}deg`,
    "--signal-paid-end": `${paidEnd}deg`,
    "--signal-referral-end": `${referralEnd}deg`,
  } as CSSProperties;

  return (
    <>
      <section className="signal-overview" aria-labelledby="daily-signal-title">
        <div className="signal-overview__intro">
          <p className="signal-kicker">Daily activity · {isToday ? "Today" : "Past date"}</p>
          <h1 id="daily-signal-title">{isToday ? "Today" : formatDate(dateKey, true)}</h1>
          <p>{formatDate(dateKey)} <span>·</span> Australia/Perth</p>
          <DateControls dateKey={dateKey} isToday={isToday} onDateChange={onDateChange} todayKey={todayKey} />
        </div>

        <div className="signal-overview__count" aria-label={`${summary.visits} visits`}>
          <span>Visits</span>
          <strong>{String(summary.visits).padStart(2, "0")}</strong>
        </div>

        <div className="signal-spectrum">
          <div
            aria-label={`${summary.pages} page views across ${summary.paid} paid, ${summary.referral} referral, ${summary.internal} internal and ${summary.direct} direct visits`}
            className={summary.visits ? "signal-spectrum__orbit" : "signal-spectrum__orbit signal-spectrum__orbit--empty"}
            role="img"
            style={spectrumStyle}
          >
            <div>
              <strong>{String(summary.pages).padStart(2, "0")}</strong>
              <span>Views</span>
            </div>
          </div>
          <div className="signal-spectrum__legend">
            <span className="signal-spectrum__paid"><i />{summary.paid} paid</span>
            <span className="signal-spectrum__referral"><i />{summary.referral} referral</span>
            <span className="signal-spectrum__internal"><i />{summary.internal} internal</span>
            <span className="signal-spectrum__direct"><i />{summary.direct} direct</span>
          </div>
        </div>

        <div className="signal-telemetry" aria-label="Daily summary">
          <div><span>Returning</span><strong>{String(summary.returning).padStart(2, "0")}</strong><small>{summary.visits ? Math.round((summary.returning / summary.visits) * 100) : 0}% of visits</small></div>
          <div><span>Average pages</span><strong>{summary.visits ? (summary.pages / summary.visits).toFixed(1) : "0.0"}</strong><small>Per visit</small></div>
        </div>
      </section>

      <section className="enquiry-activity" aria-labelledby="enquiry-activity-title">
        <header className="enquiry-activity__header">
          <div>
            <p className="signal-kicker">Form outcomes</p>
            <h2 id="enquiry-activity-title">Enquiry activity</h2>
          </div>
          <span>{enquiryActivity.length} {enquiryActivity.length === 1 ? "event" : "events"}</span>
        </header>

        {enquiryActivity.length ? (
          <ol className="enquiry-activity__list">
            {enquiryActivity.map(({ visit, visitEvent }) => {
              const wasSent = visitEvent.eventType === "enquiry_sent";
              const option = enquiryOptionForEvent(visit, visitEvent);
              const failure = eventDetail(visitEvent);

              return (
                <li key={visitEvent.id}>
                  <button
                    aria-label={`${eventLabel(visitEvent)} at ${formatTime(visitEvent.occurredAt)}. Open enquiry journey for ${visitorLabel(visit.visitorId)}`}
                    onClick={() => onOpenEnquiry(visit, visitEvent)}
                    type="button"
                  >
                    <span className={wasSent
                      ? "enquiry-activity__status enquiry-activity__status--sent"
                      : "enquiry-activity__status enquiry-activity__status--failed"}
                    >
                      {wasSent
                        ? <CircleCheck aria-hidden="true" size={19} />
                        : <CircleX aria-hidden="true" size={19} />}
                    </span>
                    <span className="enquiry-activity__outcome">
                      <strong>{eventLabel(visitEvent)}</strong>
                      <small>{[option, failure].filter(Boolean).join(" · ") || "Contact form"}</small>
                    </span>
                    <span className="enquiry-activity__visitor">
                      <strong>{visitorLabel(visit.visitorId)}</strong>
                      <small>Visit {visit.visitNumber} of {visit.totalVisits}</small>
                    </span>
                    <time dateTime={visitEvent.occurredAt}>{formatTime(visitEvent.occurredAt)}</time>
                    <ChevronRight aria-hidden="true" size={18} />
                  </button>
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="enquiry-activity__empty">No sent or failed enquiries were recorded on this day.</p>
        )}
      </section>

      <section className="signal-stream" aria-labelledby="signal-stream-title">
        <header className="signal-stream__header">
          <div>
            <p className="signal-kicker">Newest first</p>
            <h2 id="signal-stream-title">Visits on this day</h2>
          </div>
          <span>{includedVisits.length} {includedVisits.length === 1 ? "record" : "records"}</span>
        </header>

        {includedVisits.length ? (
          <ol className="signal-stream__list">
            {includedVisits.map((visit) => {
              const isExpanded = visit.id === expandedVisitId;
              const detailId = `visit-detail-${visit.id}`;
              const previewPages = visit.pageViews.slice(0, 2);

              return (
                <li className={isExpanded ? "signal-visit-card signal-visit-card--expanded" : "signal-visit-card"} key={visit.id}>
                  <button
                    aria-controls={detailId}
                    aria-expanded={isExpanded}
                    className="signal-event"
                    onClick={() => onToggleVisit(visit.id)}
                    type="button"
                  >
                    <time className="signal-event__time" dateTime={visit.startedAt}>
                      {formatTime(visit.startedAt)}
                    </time>

                    <div className="signal-event__identity">
                      <span
                        className={visit.visitNumber > 1
                          ? "signal-event__beacon signal-event__beacon--returning"
                          : "signal-event__beacon"}
                      >
                        <i aria-hidden="true" />
                      </span>
                      <div>
                        <strong>{visitorLabel(visit.visitorId)}</strong>
                        <span>
                          {visit.visitNumber > 1 ? "Returning" : "New visitor"}
                          {` · Visit ${visit.visitNumber} of ${visit.totalVisits}`}
                        </span>
                      </div>
                    </div>

                    <div className="signal-event__trace">
                      <div className="signal-event__trace-meta">
                        <SourceMark source={visit.trafficSource} />
                        <BotMark visit={visit} />
                        <span>{sourceDetail(visit)}</span>
                      </div>
                      <div className="signal-event__path" aria-label={`Journey preview from ${visit.landingPath}`}>
                        {previewPages.map((pageView, index) => (
                          <span key={pageView.id}>
                            <b>{pageView.path}</b>
                            {index < previewPages.length - 1 ? <em aria-hidden="true" /> : null}
                          </span>
                        ))}
                        {visit.pageViews.length > previewPages.length ? (
                          <span className="signal-event__more">+{visit.pageViews.length - previewPages.length} more</span>
                        ) : null}
                      </div>
                    </div>

                    <div className="signal-event__readout">
                      <strong>{visit.pageViews.length}</strong>
                      <span>{visit.pageViews.length === 1 ? "page" : "pages"} · {formatDuration(visit.durationSeconds)}</span>
                    </div>
                    <span className="signal-event__toggle">
                      {isExpanded ? "Hide" : "Details"}
                      <ChevronDown aria-hidden="true" size={17} />
                    </span>
                  </button>

                  {isExpanded ? (
                    <div className="signal-event-detail" id={detailId}>
                      <section className="signal-event-detail__journey" aria-labelledby={`${detailId}-journey`}>
                        <header>
                          <div>
                            <p className="signal-kicker">This visit</p>
                            <h3 id={`${detailId}-journey`}>Visit timeline</h3>
                          </div>
                          <span><Route aria-hidden="true" size={15} /> {visitJourney(visit).length} moments in order</span>
                        </header>
                        <JourneyTimeline visit={visit} />
                      </section>

                      <aside className="signal-event-detail__attribution">
                        <header>
                          <p className="signal-kicker">How they arrived</p>
                          <h3>Attribution</h3>
                        </header>
                        <dl>
                          <div><dt>Referrer</dt><dd>{visit.referrerUrl ?? "None recorded"}</dd></div>
                          <div><dt>Ad / network</dt><dd>{adNetworkDetail(visit)}</dd></div>
                          <div><dt>Keyword / match</dt><dd>{keywordMatchDetail(visit)}</dd></div>
                          <div><dt>GCLID</dt><dd>{visit.gclid ?? "None recorded"}</dd></div>
                          {visit.isBot ? <div><dt>Bot classification</dt><dd>{botDetail(visit)}</dd></div> : null}
                        </dl>
                        <button onClick={() => onOpenVisitor(visit)} type="button">
                          View all visits from {visitorLabel(visit.visitorId)}
                          <ChevronRight aria-hidden="true" size={17} />
                        </button>
                      </aside>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="signal-stream__empty">
            <Radio aria-hidden="true" size={30} />
            <h3>No visits recorded</h3>
            <p>No page loads were recorded on this date.</p>
          </div>
        )}
      </section>

      <p className="signal-footnote">
        Records page loads and the five enquiry lifecycle events shown here. {includeBots ? "Bot visits are included in this view." : "Visits identified by BotID as bots are excluded; unclassified records are treated as visits."} Elapsed spans run from the first to the last recorded page load; they do not include time spent on the final page. Form contents are not included in this report.
      </p>
    </>
  );
}

function VisitorHistory({
  backLabel,
  focusedEventId,
  focusedVisitId,
  includeBots,
  onBack,
  report,
}: {
  backLabel: string;
  focusedEventId: string | null;
  focusedVisitId: string | null;
  includeBots: boolean;
  onBack: () => void;
  report: VisitorAnalyticsReport;
}) {
  const includedVisits = useMemo(
    () => includeBots ? report.visits : report.visits.filter((visit) => visit.isBot !== true),
    [includeBots, report.visits],
  );
  const focusedEventContext = includedVisits
    .flatMap((visit) => (visit.events ?? []).map((visitEvent) => ({ visit, visitEvent })))
    .find(({ visitEvent }) => visitEvent.id === focusedEventId)
    ?? null;
  const focusedVisit = focusedEventContext?.visit
    ?? includedVisits.find((visit) => visit.id === focusedVisitId)
    ?? includedVisits[0]
    ?? null;

  if (!focusedVisit) {
    return (
      <section className="signal-missing">
        <Radio aria-hidden="true" size={34} />
        <p className="signal-kicker">Visitor not found</p>
        <h1>This browser has no retained visits</h1>
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
          <span aria-hidden="true">{label.replace("Browser ", "")}</span>
          <div>
            <p className="signal-kicker">
              {isEnquiryJourney && selectedEvent
                ? `${eventLabel(selectedEvent)} · ${label}`
                : "Anonymous browser"}
            </p>
            <h1 id="visitor-history-title">{isEnquiryJourney ? "Enquiry journey" : label}</h1>
            <p>
              {isEnquiryJourney && selectedEvent
                ? `The selected ${eventLabel(selectedEvent).toLowerCase()} is highlighted within ${includedVisits.length} retained ${includedVisits.length === 1 ? "visit" : "visits"}.`
                : `This browser has ${includedVisits.length} recorded ${includedVisits.length === 1 ? "visit" : "visits"}.`}
            </p>
          </div>
        </div>
        <dl>
          <div><dt>First seen</dt><dd>{formatDate(firstVisit.dateKey, true)}</dd></div>
          <div><dt>Most recent</dt><dd>{formatDate(latestVisit.dateKey, true)}</dd></div>
          <div><dt>Total visits</dt><dd>{String(includedVisits.length).padStart(2, "0")}</dd></div>
        </dl>
      </section>

      <section className="visitor-history" aria-labelledby="all-visits-title">
        <header className="visitor-history__header">
          <div>
            <p className="signal-kicker">{isEnquiryJourney ? "Journey to this outcome" : "Complete history"}</p>
            <h2 id="all-visits-title">{isEnquiryJourney ? "Visits and enquiry activity" : "All visits"}</h2>
          </div>
          <p>Every retained page load and enquiry event, with the attribution stored when each visit began.</p>
        </header>

        <div className="visitor-history__list">
          {includedVisits.map((visit) => {
            const isFocused = visit.id === focusedVisit.id;

            return (
              <article className={isFocused ? "visitor-visit visitor-visit--focused" : "visitor-visit"} key={visit.id}>
                <header className="visitor-visit__summary">
                  <span className="visitor-visit__number">{String(visit.visitNumber).padStart(2, "0")}</span>
                  <div>
                    <p>
                      {isFocused
                        ? (isEnquiryJourney ? "Selected enquiry visit" : "Opened from daily activity")
                        : "Visit history"}
                      {` · Visit ${visit.visitNumber} of ${visit.totalVisits}`}
                    </p>
                    <h3>{formatDate(visit.dateKey, true)} at {formatTime(visit.startedAt)}</h3>
                    <SourceMark source={visit.trafficSource} />
                    <BotMark visit={visit} />
                  </div>
                  <dl>
                    <div><dt>Landing page</dt><dd>{visit.landingPath}</dd></div>
                    <div><dt>Pages</dt><dd>{visit.pageViews.length}</dd></div>
                    <div><dt>Elapsed to last page</dt><dd>{formatDuration(visit.durationSeconds)}</dd></div>
                  </dl>
                </header>

                <div className="visitor-visit__detail">
                  <section className="visitor-visit__journey" aria-labelledby={`${visit.id}-journey`}>
                    <header>
                      <h4 id={`${visit.id}-journey`}>Visit timeline</h4>
                      <span>{visitJourney(visit).length} moments in order</span>
                    </header>
                    <JourneyTimeline
                      selectedEventId={isFocused ? selectedEvent?.id : null}
                      visit={visit}
                    />
                  </section>

                  <section className="visitor-visit__attribution" aria-labelledby={`${visit.id}-attribution`}>
                    <header><h4 id={`${visit.id}-attribution`}>Attribution</h4></header>
                    <dl>
                      <div><dt>Referrer</dt><dd>{visit.referrerUrl ?? "None recorded"}</dd></div>
                      <div><dt>Ad / network</dt><dd>{adNetworkDetail(visit)}</dd></div>
                      <div><dt>Keyword / match</dt><dd>{keywordMatchDetail(visit)}</dd></div>
                      <div><dt>GCLID</dt><dd>{visit.gclid ?? "None recorded"}</dd></div>
                      {visit.isBot ? <div><dt>Bot classification</dt><dd>{botDetail(visit)}</dd></div> : null}
                    </dl>
                  </section>
                </div>
              </article>
            );
          })}
        </div>

        <p className="visitor-history__note">
          This is one anonymous browser identifier, not a known person. Another device or cleared browser storage starts a separate history.
        </p>
      </section>
    </>
  );
}

function ReportState({ onRetry, status }: { onRetry: () => void; status: "error" | "loading" }) {
  return (
    <section className="signal-stream__empty signal-report-state" aria-live="polite">
      {status === "loading" ? (
        <span className="signal-report-state__spinner">
          <RefreshCw aria-hidden="true" size={30} />
        </span>
      ) : <Radio aria-hidden="true" size={30} />}
      <h1>{status === "loading" ? "Loading activity" : "Activity could not be loaded"}</h1>
      <p>{status === "loading" ? "Reading the latest retained visit data." : "The protected analytics API did not return a report."}</p>
      {status === "error" ? <button onClick={onRetry} type="button">Try again</button> : null}
    </section>
  );
}

export default function Analytics() {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [todayKey, setTodayKey] = useState(getPerthDateKey);
  const currentMonth = todayKey.slice(0, 7);
  const isMonthlyView = pathname === privateRoutePaths.analyticsEnquiries;
  const requestedDate = searchParams.get("date");
  const dateKey = isAnalyticsDateKey(requestedDate) && requestedDate <= todayKey ? requestedDate : todayKey;
  const requestedMonth = searchParams.get("month");
  const monthKey = isAnalyticsMonthKey(requestedMonth) && requestedMonth <= currentMonth
    ? requestedMonth
    : currentMonth;
  const expandedVisitId = searchParams.get("expanded");
  const includeBots = searchParams.get("bots") === "include";
  const requestedVisitorId = searchParams.get("visitor");
  const focusedVisitId = searchParams.get("visit");
  const focusedEventId = searchParams.get("event");
  const requestQuery = requestedVisitorId
    ? `visitor=${encodeURIComponent(requestedVisitorId)}`
    : isMonthlyView
      ? `month=${encodeURIComponent(monthKey)}`
      : `date=${encodeURIComponent(dateKey)}`;
  const { report, retry, status } = useAnalyticsReport(requestQuery);

  useDocumentMetadata(
    isMonthlyView ? "Enquiries | Vive Analytics" : "Analytics | Vive Counselling",
    isMonthlyView
      ? "Private monthly enquiry analytics for Vive Counselling."
      : "Private first-party visit analytics for Vive Counselling.",
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, requestedVisitorId]);

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

  function updateDate(nextDate: string) {
    if (!isAnalyticsDateKey(nextDate) || nextDate > todayKey) return;
    const nextParams = new URLSearchParams();
    if (includeBots) nextParams.set("bots", "include");
    if (nextDate !== todayKey) nextParams.set("date", nextDate);
    setSearchParams(nextParams);
  }

  function updateMonth(nextMonth: string) {
    if (!isAnalyticsMonthKey(nextMonth) || nextMonth > currentMonth) return;
    const nextParams = new URLSearchParams();
    if (includeBots) nextParams.set("bots", "include");
    if (nextMonth !== currentMonth) nextParams.set("month", nextMonth);
    setSearchParams(nextParams);
  }

  function getReportContextParams() {
    const nextParams = new URLSearchParams();
    if (includeBots) nextParams.set("bots", "include");
    if (isMonthlyView) {
      if (monthKey !== currentMonth) nextParams.set("month", monthKey);
    } else if (dateKey !== todayKey) {
      nextParams.set("date", dateKey);
    }
    return nextParams;
  }

  function toggleVisit(visitId: string) {
    const nextParams = new URLSearchParams(searchParams);
    if (dateKey !== todayKey) nextParams.set("date", dateKey);
    if (expandedVisitId === visitId) nextParams.delete("expanded");
    else nextParams.set("expanded", visitId);
    setSearchParams(nextParams);
  }

  function openVisitor(visit: AnalyticsVisit) {
    const nextParams = getReportContextParams();
    nextParams.set("visitor", visit.visitorId);
    nextParams.set("visit", visit.id);
    setSearchParams(nextParams);
  }

  function openEnquiry(visit: AnalyticsVisit, visitEvent: AnalyticsVisitEvent) {
    const nextParams = getReportContextParams();
    nextParams.set("event", visitEvent.id);
    nextParams.set("visitor", visit.visitorId);
    nextParams.set("visit", visit.id);
    setSearchParams(nextParams);
  }

  function closeVisitor() {
    setSearchParams(getReportContextParams());
  }

  const dailyReport = report?.type === "daily" ? report as DailyAnalyticsReport : null;
  const monthlyReport = report?.type === "monthly" ? report as MonthlyAnalyticsReport : null;
  const visitorReport = report?.type === "visitor" ? report as VisitorAnalyticsReport : null;

  return (
    <main className="visit-dashboard">
      <SignalHeader
        detailTitle={requestedVisitorId
          ? (focusedEventId ? "Enquiry journey" : "Visitor history")
          : isMonthlyView ? "Monthly enquiries" : "Daily activity"}
        includeBots={includeBots}
        onHome={closeVisitor}
        onIncludeBotsChange={updateIncludeBots}
        onRefresh={refreshReport}
        status={status}
      />
      <div className="visit-signal__field">
        {status !== "ready" ? <ReportState onRetry={refreshReport} status={status} /> : null}
        {status === "ready" && requestedVisitorId && visitorReport ? (
          <VisitorHistory
            backLabel={isMonthlyView
              ? `${formatMonth(monthKey)} enquiries`
              : dateKey === todayKey ? "today" : formatDate(dateKey, true)}
            focusedEventId={focusedEventId}
            focusedVisitId={focusedVisitId}
            includeBots={includeBots}
            onBack={closeVisitor}
            report={visitorReport}
          />
        ) : null}
        {status === "ready" && !requestedVisitorId && !isMonthlyView && dailyReport ? (
          <DailyObservatory
            dateKey={dailyReport.date}
            expandedVisitId={expandedVisitId}
            includeBots={includeBots}
            onDateChange={updateDate}
            onOpenEnquiry={openEnquiry}
            onOpenVisitor={openVisitor}
            onToggleVisit={toggleVisit}
            todayKey={todayKey}
            visits={dailyReport.visits}
          />
        ) : null}
        {status === "ready" && !requestedVisitorId && isMonthlyView && monthlyReport ? (
          <MonthlyEnquiries
            currentMonth={currentMonth}
            includeBots={includeBots}
            monthKey={monthlyReport.month}
            onMonthChange={updateMonth}
            onOpenEnquiry={openEnquiry}
            visits={monthlyReport.visits}
          />
        ) : null}
        {status === "ready" && (
          (requestedVisitorId && !visitorReport)
          || (!requestedVisitorId && isMonthlyView && !monthlyReport)
          || (!requestedVisitorId && !isMonthlyView && !dailyReport)
        ) ? (
          <ReportState onRetry={refreshReport} status="error" />
        ) : null}
      </div>
    </main>
  );
}
