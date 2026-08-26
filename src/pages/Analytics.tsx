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
  CircleHelp,
  CircleX,
  Clock3,
  Copy,
  EyeOff,
  LockKeyhole,
  Monitor,
  MousePointerClick,
  Radio,
  RefreshCw,
  Route,
  ScanSearch,
  Smartphone,
  Tablet,
} from "lucide-react";
import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
import {
  getPerthDateKey,
  getPerthMonthKey,
  isAnalyticsDateKey,
  isAnalyticsMonthKey,
  type AnalyticsApiResponse,
  type AnalyticsExclusionUpdateResponse,
  type AnalyticsReport,
  type AnalyticsTrafficSource,
  type AnalyticsVisit,
  type AnalyticsVisitEvent,
  type DailyAnalyticsReport,
  type ExcludedVisitorSummary,
  type ExcludedVisitorsReport,
  type MonthlyAnalyticsReport,
  type PageViewsAnalyticsReport,
  type VisitorAnalyticsReport,
} from "../data/analyticsContract";
import type { VisitDeviceType } from "../data/visitClientEnvironment";
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
      activeSeconds: number;
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

function formatActiveTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

function visitActiveSeconds(visit: AnalyticsVisit) {
  return visit.pageViews.reduce((total, pageView) => total + pageView.activeSeconds, 0);
}

function visitorLabel(visitorId: string) {
  const suffix = visitorId.replace(/-/g, "").slice(-6).toUpperCase();
  return `Visitor ${suffix}`;
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
    const adLabel = visit.adCode ? `Ad ${visit.adCode}` : "Ad unavailable";
    return `${adLabel} · ${networkLabel(visit.networkCode)} · ${visit.matchedKeyword ?? "Keyword unavailable"} · ${matchTypeLabel(visit.matchType)}`;
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

const contactSelectionLabels: Record<string, string> = {
  appointment: "Appointment selected",
  consult: "Consult selected",
  question: "Question selected",
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

function contactSelectionLabel(visitEvent: AnalyticsVisitEvent) {
  const value = eventProperty(visitEvent, "option", "contactOption", "contact_option");
  if (!value) return null;
  return contactSelectionLabels[value] ?? `${value.split("_").join(" ")} selected`;
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
      activeSeconds: pageView.activeSeconds,
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
              <div>
                <strong>{item.path}</strong>
                <small>{item.activeSeconds ? `${formatActiveTime(item.activeSeconds)} active` : "Active time not recorded"}</small>
              </div>
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

  if (report.type === "excluded") {
    return Array.isArray(report.visitors);
  }

  if (report.type === "pageViews") {
    return Array.isArray(report.routes)
      && typeof report.startDate === "string"
      && typeof report.endDate === "string"
      && typeof report.totalActiveSeconds === "number"
      && typeof report.totalPageViews === "number"
      && typeof report.totalVisits === "number";
  }

  return (report.type === "daily" || report.type === "monthly" || report.type === "visitor")
    && Array.isArray(report.visits)
    && (report.type !== "visitor" || typeof report.isExcluded === "boolean");
}

function useAnalyticsReport(requestUrl: string) {
  const [requestVersion, setRequestVersion] = useState(0);
  const [state, setState] = useState<AnalyticsLoadState>({ report: null, status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    setState({ report: null, status: "loading" });

    async function loadReport() {
      try {
        const response = await fetch(requestUrl, {
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
  }, [requestUrl, requestVersion]);

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

const deviceLabels: Record<VisitDeviceType, string> = {
  desktop: "Desktop",
  mobile: "Mobile",
  tablet: "Tablet",
  unknown: "Unknown",
};

function DeviceIcon({ deviceType, size = 13 }: { deviceType: VisitDeviceType; size?: number }) {
  if (deviceType === "desktop") return <Monitor aria-hidden="true" size={size} />;
  if (deviceType === "mobile") return <Smartphone aria-hidden="true" size={size} />;
  if (deviceType === "tablet") return <Tablet aria-hidden="true" size={size} />;
  return <CircleHelp aria-hidden="true" size={size} />;
}

function DeviceMark({ visit }: { visit: AnalyticsVisit }) {
  return (
    <span className={`signal-device signal-device--${visit.deviceType}`}>
      <DeviceIcon deviceType={visit.deviceType} />
      {deviceLabels[visit.deviceType]}
    </span>
  );
}

function WebDriverMark({ visit }: { visit: AnalyticsVisit }) {
  if (visit.isWebDriver !== true) return null;

  return (
    <span className="signal-webdriver">
      <ScanSearch aria-hidden="true" size={13} />
      WebDriver
    </span>
  );
}

const gclidCopyLabels = {
  copied: "GCLID copied",
  error: "Try copying again",
  idle: "Copy GCLID",
} as const;

type GclidCopyState = keyof typeof gclidCopyLabels;

function VisitRequestDetails({
  includeGclidCopy = false,
  visit,
}: {
  includeGclidCopy?: boolean;
  visit: AnalyticsVisit;
}) {
  const [gclidCopyState, setGclidCopyState] = useState<GclidCopyState>("idle");

  const copyGclid = async () => {
    if (!visit.gclid) return;

    try {
      if (!navigator.clipboard) throw new Error("Clipboard access is unavailable.");
      await navigator.clipboard.writeText(visit.gclid);
      setGclidCopyState("copied");
    } catch {
      setGclidCopyState("error");
    }
  };

  const gclidCopyLabel = visit.gclid ? gclidCopyLabels[gclidCopyState] : "No GCLID recorded";

  return (
    <details
      className="signal-request-details"
      onToggle={(event) => {
        if (!event.currentTarget.open) setGclidCopyState("idle");
      }}
    >
      <summary>
        <span>
          <ScanSearch aria-hidden="true" size={16} />
          <span>
            <strong>Investigation tools</strong>
            <small>Device and request diagnostics</small>
          </span>
        </span>
        <ChevronDown aria-hidden="true" size={17} />
      </summary>
      <div className="signal-request-details__body">
        <dl>
          <div><dt>Device</dt><dd>{deviceLabels[visit.deviceType]}</dd></div>
          <div>
            <dt>navigator.webdriver</dt>
            <dd>{visit.isWebDriver === null ? "Not reported" : String(visit.isWebDriver)}</dd>
          </div>
          <div className="signal-request-details__agent">
            <dt>User-Agent</dt>
            <dd><code>{visit.userAgent ?? "Not recorded"}</code></dd>
          </div>
        </dl>
        {includeGclidCopy ? (
          <div className="signal-request-details__gclid">
            <span>
              <strong>Google click ID</strong>
              <small>{visit.gclid ? "Copy the stored ID for troubleshooting or lookup." : "This visit has no stored GCLID."}</small>
            </span>
            <button disabled={!visit.gclid} onClick={copyGclid} type="button">
              {gclidCopyState === "copied"
                ? <CircleCheck aria-hidden="true" size={16} />
                : <Copy aria-hidden="true" size={16} />}
              <span aria-live="polite">{gclidCopyLabel}</span>
            </button>
          </div>
        ) : null}
      </div>
    </details>
  );
}

function visitJourneyCount(visit: AnalyticsVisit) {
  const count = visit.pageViews.length + (visit.events ?? []).length;
  return `${count} ${count === 1 ? "moment" : "moments"} in order`;
}

function TrafficDiagnostics({ visits }: { visits: AnalyticsVisit[] }) {
  const deviceCounts = visits.reduce<Record<VisitDeviceType, number>>(
    (counts, visit) => ({
      ...counts,
      [visit.deviceType]: counts[visit.deviceType] + 1,
    }),
    { desktop: 0, mobile: 0, tablet: 0, unknown: 0 },
  );
  const webDriverTrue = visits.filter((visit) => visit.isWebDriver === true).length;
  const webDriverFalse = visits.filter((visit) => visit.isWebDriver === false).length;
  const webDriverUnreported = visits.length - webDriverTrue - webDriverFalse;
  const denominator = Math.max(visits.length, 1);
  const deviceTypes = Object.keys(deviceLabels) as VisitDeviceType[];

  return (
    <section className="signal-diagnostics" aria-labelledby="traffic-diagnostics-title">
      <header>
        <div>
          <p className="signal-kicker">Traffic signature</p>
          <h2 id="traffic-diagnostics-title">Device and automation signals</h2>
        </div>
        <p>Visit-level request data for the records shown below.</p>
      </header>

      <div className="signal-diagnostics__body">
        <div className="signal-device-mix">
          <h3>Device mix</h3>
          <dl>
            {deviceTypes.map((deviceType) => (
              <div key={deviceType}>
                <dt><DeviceIcon deviceType={deviceType} size={15} /> {deviceLabels[deviceType]}</dt>
                <dd>
                  <strong>{deviceCounts[deviceType]}</strong>
                  <small>{Math.round((deviceCounts[deviceType] / denominator) * 100)}%</small>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={webDriverTrue
          ? "signal-webdriver-summary signal-webdriver-summary--detected"
          : "signal-webdriver-summary"}
        >
          <ScanSearch aria-hidden="true" size={24} />
          <div>
            <span>navigator.webdriver</span>
            <strong>{webDriverTrue}</strong>
            <small>reported true</small>
          </div>
          <dl>
            <div><dt>False</dt><dd>{webDriverFalse}</dd></div>
            <div><dt>No data</dt><dd>{webDriverUnreported}</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function SignalHeader({
  detailTitle,
  includeBots,
  onHome,
  onIncludeBotsChange,
  onRefresh,
  showBotControl,
  status,
}: {
  detailTitle: "Daily activity" | "Enquiry journey" | "Excluded visitors" | "Monthly enquiries" | "Page views" | "Visitor history";
  includeBots: boolean;
  onHome: () => void;
  onIncludeBotsChange: (includeBots: boolean) => void;
  onRefresh: () => void;
  showBotControl: boolean;
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
          <NavLink to={privateRoutePaths.analyticsExcluded}>Excluded</NavLink>
        </nav>
        <div className="signal-header__system">
          <span><Clock3 aria-hidden="true" size={14} /> Perth time</span>
          <span className="signal-header__warning">
            <LockKeyhole aria-hidden="true" size={14} />
            {import.meta.env.DEV ? "Auth bypassed locally" : "Protected"}
          </span>
          {showBotControl ? (
            <button
              aria-pressed={includeBots}
              className="signal-header__bots"
              onClick={() => onIncludeBotsChange(!includeBots)}
              type="button"
            >
              <Bot aria-hidden="true" size={14} />
              {includeBots ? "Bots included" : "Include bots"}
            </button>
          ) : null}
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
  const visitorCount = new Set(enquiryOutcomes.map(({ visit }) => visit.visitorId)).size;
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
              <small>{`${visitorCount} ${visitorCount === 1 ? "visitor" : "visitors"}`}</small>
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
          <p>These visitors are retained but kept out of daily activity and monthly enquiry reports.</p>
        </div>
        <div className="excluded-visitors__count" aria-label={`${visitors.length} excluded ${visitors.length === 1 ? "visitor" : "visitors"}`}>
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
                    <span className="excluded-visitors__mark"><EyeOff aria-hidden="true" size={18} /></span>
                    <span className="excluded-visitors__identity">
                      <strong>{visitorLabel(visitor.visitorId)}</strong>
                      <small>Excluded {formatDate(excludedDate, true)} at {formatTime(visitor.excludedAt)}</small>
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

function DailyObservatory({
  dateKey,
  expandedVisitId,
  includeBots,
  onDateChange,
  onOpenVisitor,
  onToggleVisit,
  todayKey,
  visits,
}: {
  dateKey: string;
  expandedVisitId: string | null;
  includeBots: boolean;
  onDateChange: (date: string) => void;
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
  const topPages = useMemo(() => {
    const pageCounts = new Map<string, number>();

    includedVisits.forEach((visit) => {
      visit.pageViews.forEach((pageView) => {
        pageCounts.set(pageView.path, (pageCounts.get(pageView.path) ?? 0) + 1);
      });
    });

    return [...pageCounts.entries()]
      .map(([path, count]) => ({ count, path }))
      .sort((left, right) => right.count - left.count || left.path.localeCompare(right.path))
      .slice(0, 4);
  }, [includedVisits]);
  const pagePeak = Math.max(...topPages.map((page) => page.count), 1);
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
  const returningPercentage = summary.visits
    ? Math.round((summary.returning / summary.visits) * 100)
    : 0;
  const returningStyle = {
    "--signal-returning-end": `${returningPercentage * 3.6}deg`,
  } as CSSProperties;
  const pageViewParams = new URLSearchParams({ end: dateKey, start: dateKey });
  if (includeBots) pageViewParams.set("bots", "include");
  const pageViewReportPath = `${privateRoutePaths.analyticsPageViews}?${pageViewParams.toString()}`;

  return (
    <>
      <section className="signal-overview" aria-labelledby="daily-signal-title">
        <div className="signal-overview__intro">
          <p className="signal-kicker">Daily activity · {isToday ? "Today" : "Past date"}</p>
          <h1 id="daily-signal-title">{isToday ? "Today" : formatDate(dateKey, true)}</h1>
          <p>{formatDate(dateKey)} <span>·</span> Australia/Perth</p>
          <DateControls dateKey={dateKey} isToday={isToday} onDateChange={onDateChange} todayKey={todayKey} />
        </div>

        <div className="signal-visits">
          <div
            aria-label={`${summary.visits} visits: ${summary.paid} paid, ${summary.referral} referral, ${summary.internal} internal and ${summary.direct} direct`}
            className={summary.visits ? "signal-spectrum__orbit" : "signal-spectrum__orbit signal-spectrum__orbit--empty"}
            role="img"
            style={spectrumStyle}
          >
            <div>
              <strong>{String(summary.visits).padStart(2, "0")}</strong>
              <span>Visits</span>
            </div>
          </div>
          <div className="signal-spectrum__legend">
            <span className="signal-spectrum__paid"><i />{summary.paid} paid</span>
            <span className="signal-spectrum__referral"><i />{summary.referral} referral</span>
            <span className="signal-spectrum__internal"><i />{summary.internal} internal</span>
            <span className="signal-spectrum__direct"><i />{summary.direct} direct</span>
          </div>
        </div>

        <div
          className="signal-returning"
          aria-label={`${summary.returning} returning visits, ${returningPercentage}% of visits`}
          style={returningStyle}
        >
          <div className="signal-returning__summary">
            <span>Returning</span>
            <strong>{String(summary.returning).padStart(2, "0")}</strong>
            <small>{returningPercentage}% of visits</small>
          </div>
          <span className={summary.visits
            ? "signal-returning__orbit"
            : "signal-returning__orbit signal-returning__orbit--empty"}
            aria-hidden="true"
          >
            <RefreshCw size={19} strokeWidth={2.2} />
          </span>
        </div>

        <div className="signal-pages" aria-label={`${summary.pages} page views, ${summary.visits ? (summary.pages / summary.visits).toFixed(1) : "0.0"} average pages per visit`}>
          <div className="signal-pages__summary">
            <span>Page views</span>
            <strong>{String(summary.pages).padStart(2, "0")}</strong>
            <small>{summary.visits ? (summary.pages / summary.visits).toFixed(1) : "0.0"} avg per visit</small>
            <Link
              aria-label={`View full page-view breakdown for ${formatDate(dateKey, true)}`}
              className="signal-pages__open"
              to={pageViewReportPath}
            >
              Full breakdown <ArrowRight aria-hidden="true" size={14} />
            </Link>
          </div>
          <div className="signal-pages__ranking" aria-label="Most-viewed routes">
            {topPages.length ? topPages.map((page) => (
              <div className="signal-pages__route" key={page.path}>
                <span title={page.path}>{page.path}</span>
                <i aria-hidden="true">
                  <b style={{ "--signal-page-width": `${(page.count / pagePeak) * 100}%` } as CSSProperties} />
                </i>
                <strong>{page.count}</strong>
              </div>
            )) : <p>No routes viewed</p>}
          </div>
        </div>
      </section>

      <TrafficDiagnostics visits={includedVisits} />

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
              const events = visit.events ?? [];
              const hasSuccessfulEnquiry = events.some((visitEvent) => visitEvent.eventType === "enquiry_sent");
              const hasFailedEnquiry = !hasSuccessfulEnquiry
                && events.some((visitEvent) => visitEvent.eventType === "enquiry_failed");
              const selectedContactEvent = [...events]
                .filter((visitEvent) => visitEvent.eventType === "contact_option_selected")
                .sort((left, right) => new Date(right.occurredAt).getTime() - new Date(left.occurredAt).getTime())[0];
              const selectedContact = selectedContactEvent ? contactSelectionLabel(selectedContactEvent) : null;
              const activeSeconds = visitActiveSeconds(visit);
              const cardClassName = [
                "signal-visit-card",
                isExpanded ? "signal-visit-card--expanded" : null,
                hasSuccessfulEnquiry ? "signal-visit-card--enquiry-sent" : null,
                hasFailedEnquiry ? "signal-visit-card--enquiry-failed" : null,
              ].filter(Boolean).join(" ");

              return (
                <li className={cardClassName} key={visit.id}>
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
                      <div className="signal-event__signals">
                        <DeviceMark visit={visit} />
                        <WebDriverMark visit={visit} />
                        {hasSuccessfulEnquiry ? (
                          <span className="signal-enquiry-signal signal-enquiry-signal--sent">
                            <CircleCheck aria-hidden="true" size={15} /> Enquiry sent
                          </span>
                        ) : null}
                        {hasFailedEnquiry ? (
                          <span className="signal-enquiry-signal signal-enquiry-signal--failed">
                            <CircleX aria-hidden="true" size={15} /> Send failed
                          </span>
                        ) : null}
                        {selectedContact ? (
                          <span className="signal-contact-signal">
                            <MousePointerClick aria-hidden="true" size={14} /> {selectedContact}
                          </span>
                        ) : null}
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
                      <span>
                        <strong>{visit.pageViews.length}</strong>
                        <small>{visit.pageViews.length === 1 ? "page" : "pages"}</small>
                      </span>
                      <span>
                        <strong>{activeSeconds ? formatActiveTime(activeSeconds) : "–"}</strong>
                        <small>active</small>
                      </span>
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
                          <span><Route aria-hidden="true" size={15} /> {visitJourneyCount(visit)}</span>
                        </header>
                        <JourneyTimeline visit={visit} />
                      </section>

                      <aside
                        aria-labelledby={`${detailId}-attribution`}
                        className="signal-event-detail__attribution"
                      >
                        <header>
                          <p className="signal-kicker">Arrival context</p>
                          <h3 id={`${detailId}-attribution`}>How they arrived</h3>
                        </header>
                        <dl>
                          <div><dt>Referrer</dt><dd>{visit.referrerUrl ?? "None recorded"}</dd></div>
                          <div><dt>Ad / network</dt><dd>{adNetworkDetail(visit)}</dd></div>
                          <div><dt>Keyword / match</dt><dd>{keywordMatchDetail(visit)}</dd></div>
                          {visit.isBot ? <div><dt>Bot classification</dt><dd>{botDetail(visit)}</dd></div> : null}
                        </dl>
                        <div className="signal-event-detail__utilities">
                          <VisitRequestDetails includeGclidCopy visit={visit} />
                          <button
                            className="signal-event-detail__visitor-action"
                            onClick={() => onOpenVisitor(visit)}
                            type="button"
                          >
                            <span>
                              <small>{visitorLabel(visit.visitorId)}</small>
                              <strong>View visit history</strong>
                            </span>
                            <ChevronRight aria-hidden="true" size={17} />
                          </button>
                        </div>
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
        Records page loads, visible active time and the five enquiry lifecycle events shown here. {includeBots ? "Bot visits are included in this view." : "Visits identified by BotID as bots are excluded; unclassified records are treated as visits."} Form contents are not included in this report.
      </p>
    </>
  );
}

function PageViewsBreakdown({
  includeBots,
  onRangeChange,
  report,
  todayKey,
}: {
  includeBots: boolean;
  onRangeChange: (startDate: string, endDate: string) => void;
  report: PageViewsAnalyticsReport;
  todayKey: string;
}) {
  const [draftStartDate, setDraftStartDate] = useState(report.startDate);
  const [draftEndDate, setDraftEndDate] = useState(report.endDate);
  const hasDateKeys = isAnalyticsDateKey(draftStartDate) && isAnalyticsDateKey(draftEndDate);
  const rangeLength = hasDateKeys
    ? Math.round((parseDateKey(draftEndDate).getTime() - parseDateKey(draftStartDate).getTime()) / 86_400_000)
    : -1;
  const isRangeValid = hasDateKeys
    && rangeLength >= 0
    && rangeLength < 366
    && draftEndDate <= todayKey;
  const routePeak = Math.max(...report.routes.map((route) => route.pageViews), 1);
  const averagePages = report.totalVisits
    ? (report.totalPageViews / report.totalVisits).toFixed(1)
    : "0.0";
  const dailyParams = new URLSearchParams();
  if (report.endDate !== todayKey) dailyParams.set("date", report.endDate);
  if (includeBots) dailyParams.set("bots", "include");
  const dailyQuery = dailyParams.toString();
  const dailyPath = `${privateRoutePaths.analytics}${dailyQuery ? `?${dailyQuery}` : ""}`;

  useEffect(() => {
    setDraftStartDate(report.startDate);
    setDraftEndDate(report.endDate);
  }, [report.endDate, report.startDate]);

  return (
    <>
      <section className="page-view-report__overview" aria-labelledby="page-view-report-title">
        <div className="page-view-report__intro">
          <Link className="page-view-report__back" to={dailyPath}>
            <ArrowLeft aria-hidden="true" size={16} /> Back to daily
          </Link>
          <p className="signal-kicker">Route breakdown</p>
          <h1 id="page-view-report-title">Page views</h1>
          <p>
            {report.startDate === report.endDate
              ? formatDate(report.startDate)
              : `${formatDate(report.startDate, true)} to ${formatDate(report.endDate, true)}`}
          </p>
        </div>

        <form
          className="page-view-report__range"
          onSubmit={(event) => {
            event.preventDefault();
            if (isRangeValid) onRangeChange(draftStartDate, draftEndDate);
          }}
        >
          <label>
            <span>Start date</span>
            <input
              max={draftEndDate < todayKey ? draftEndDate : todayKey}
              onChange={(event) => setDraftStartDate(event.target.value)}
              type="date"
              value={draftStartDate}
            />
          </label>
          <label>
            <span>End date</span>
            <input
              max={todayKey}
              min={draftStartDate}
              onChange={(event) => setDraftEndDate(event.target.value)}
              type="date"
              value={draftEndDate}
            />
          </label>
          <button disabled={!isRangeValid} type="submit">Apply range</button>
          <small>Select up to 366 days.</small>
        </form>
      </section>

      <section className="page-view-report__summary" aria-label="Page-view totals">
        <div><span>Page views</span><strong>{report.totalPageViews}</strong></div>
        <div><span>Visits</span><strong>{report.totalVisits}</strong></div>
        <div><span>Avg per visit</span><strong>{averagePages}</strong></div>
        <div><span>Active time</span><strong>{formatActiveTime(report.totalActiveSeconds)}</strong></div>
      </section>

      <section className="page-view-report__routes" aria-labelledby="page-view-routes-title">
        <header>
          <div>
            <p className="signal-kicker">Most viewed first</p>
            <h2 id="page-view-routes-title">All viewed routes</h2>
          </div>
          <span>{report.routes.length} {report.routes.length === 1 ? "route" : "routes"}</span>
        </header>

        {report.routes.length ? (
          <div className="page-view-report__table-wrap">
            <table className="page-view-report__table">
              <caption className="signal-visually-hidden">
                Routes ranked by page views, including share of views, visits and average active time
              </caption>
              <thead>
                <tr>
                  <th aria-label="Rank" scope="col">#</th>
                  <th scope="col">Route</th>
                  <th scope="col">Share</th>
                  <th scope="col">Views</th>
                  <th scope="col">Visits</th>
                  <th scope="col">Avg active</th>
                </tr>
              </thead>
              <tbody>
                {report.routes.map((route, index) => {
                  const share = report.totalPageViews
                    ? Math.round((route.pageViews / report.totalPageViews) * 100)
                    : 0;
                  const barStyle = {
                    "--page-view-route-width": `${(route.pageViews / routePeak) * 100}%`,
                  } as CSSProperties;

                  return (
                    <tr key={route.path}>
                      <td className="page-view-report__rank">{String(index + 1).padStart(2, "0")}</td>
                      <th className="page-view-report__route" scope="row">
                        <strong>{route.path}</strong>
                        <i aria-hidden="true"><b style={barStyle} /></i>
                      </th>
                      <td className="page-view-report__share">{share}%</td>
                      <td className="page-view-report__metric">{route.pageViews}</td>
                      <td className="page-view-report__metric">{route.visits}</td>
                      <td className="page-view-report__metric">
                        {route.activeSeconds ? formatActiveTime(Math.round(route.activeSeconds / route.pageViews)) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="signal-stream__empty page-view-report__empty">
            <Radio aria-hidden="true" size={30} />
            <h3>No page views recorded</h3>
            <p>No routes were viewed in this date range.</p>
          </div>
        )}
      </section>

      <p className="signal-footnote">
        Totals use visits that began in the selected Australia/Perth date range. Active time counts seconds while a page is visible. {includeBots ? "Bot visits are included." : "Identified bot visits are excluded."}
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
  const [isExcluded, setIsExcluded] = useState(report.isExcluded);
  const [exclusionStatus, setExclusionStatus] = useState<"error" | "idle" | "saving">("idle");
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
            const activeSeconds = visitActiveSeconds(visit);

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
                    <div className="visitor-visit__markers">
                      <SourceMark source={visit.trafficSource} />
                      <BotMark visit={visit} />
                      <DeviceMark visit={visit} />
                      <WebDriverMark visit={visit} />
                    </div>
                  </div>
                  <dl>
                    <div><dt>Landing page</dt><dd>{visit.landingPath}</dd></div>
                    <div><dt>Pages</dt><dd>{visit.pageViews.length}</dd></div>
                    <div><dt>Active time</dt><dd>{activeSeconds ? formatActiveTime(activeSeconds) : "Not recorded"}</dd></div>
                  </dl>
                </header>

                <div className="visitor-visit__detail">
                  <section className="visitor-visit__journey" aria-labelledby={`${visit.id}-journey`}>
                    <header>
                      <h4 id={`${visit.id}-journey`}>Visit timeline</h4>
                      <span>{visitJourneyCount(visit)}</span>
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
                      {visit.isBot ? <div><dt>Bot classification</dt><dd>{botDetail(visit)}</dd></div> : null}
                    </dl>
                    <VisitRequestDetails visit={visit} />
                  </section>
                </div>
              </article>
            );
          })}
        </div>
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
  const isExcludedView = pathname === privateRoutePaths.analyticsExcluded;
  const isPageViewsView = pathname === privateRoutePaths.analyticsPageViews;
  const requestedDate = searchParams.get("date");
  const dateKey = isAnalyticsDateKey(requestedDate) && requestedDate <= todayKey ? requestedDate : todayKey;
  const requestedMonth = searchParams.get("month");
  const monthKey = isAnalyticsMonthKey(requestedMonth) && requestedMonth <= currentMonth
    ? requestedMonth
    : currentMonth;
  const requestedStartDate = searchParams.get("start");
  const requestedEndDate = searchParams.get("end");
  const requestedRangeLength = isAnalyticsDateKey(requestedStartDate)
    && isAnalyticsDateKey(requestedEndDate)
    ? Math.round((parseDateKey(requestedEndDate).getTime() - parseDateKey(requestedStartDate).getTime()) / 86_400_000)
    : -1;
  const hasValidPageViewRange = requestedRangeLength >= 0
    && requestedRangeLength < 366
    && requestedEndDate !== null
    && requestedEndDate <= todayKey;
  const pageViewStartDate = hasValidPageViewRange && requestedStartDate ? requestedStartDate : todayKey;
  const pageViewEndDate = hasValidPageViewRange && requestedEndDate ? requestedEndDate : todayKey;
  const expandedVisitId = searchParams.get("expanded");
  const includeBots = searchParams.get("bots") === "include";
  const requestedVisitorId = searchParams.get("visitor");
  const focusedVisitId = searchParams.get("visit");
  const focusedEventId = searchParams.get("event");
  const pageViewRequestParams = new URLSearchParams({
    end: pageViewEndDate,
    start: pageViewStartDate,
  });
  if (includeBots) pageViewRequestParams.set("bots", "include");
  const requestUrl = requestedVisitorId
    ? `/api/analytics?visitor=${encodeURIComponent(requestedVisitorId)}`
    : isExcludedView
      ? "/api/analytics/exclusions"
      : isMonthlyView
        ? `/api/analytics?month=${encodeURIComponent(monthKey)}`
        : isPageViewsView
          ? `/api/analytics?${pageViewRequestParams.toString()}`
          : `/api/analytics?date=${encodeURIComponent(dateKey)}`;
  const { report, retry, status } = useAnalyticsReport(requestUrl);

  useDocumentMetadata(
    isExcludedView
      ? "Excluded Visitors | Vive Analytics"
      : isMonthlyView
        ? "Enquiries | Vive Analytics"
        : isPageViewsView ? "Page Views | Vive Analytics" : "Analytics | Vive Counselling",
    isExcludedView
      ? "Private excluded visitor management for Vive Counselling analytics."
      : isMonthlyView
        ? "Private monthly enquiry analytics for Vive Counselling."
        : isPageViewsView
          ? "Private page-view breakdown for Vive Counselling analytics."
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

  function updatePageViewRange(startDate: string, endDate: string) {
    if (!isAnalyticsDateKey(startDate) || !isAnalyticsDateKey(endDate)) return;
    const rangeLength = Math.round(
      (parseDateKey(endDate).getTime() - parseDateKey(startDate).getTime()) / 86_400_000,
    );
    if (rangeLength < 0 || rangeLength >= 366 || endDate > todayKey) return;

    const nextParams = new URLSearchParams({ end: endDate, start: startDate });
    if (includeBots) nextParams.set("bots", "include");
    setSearchParams(nextParams);
  }

  function getReportContextParams() {
    const nextParams = new URLSearchParams();
    if (includeBots) nextParams.set("bots", "include");
    if (isExcludedView) {
      return nextParams;
    }

    if (isPageViewsView) {
      nextParams.set("end", pageViewEndDate);
      nextParams.set("start", pageViewStartDate);
    } else if (isMonthlyView) {
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

  function openExcludedVisitor(visitorId: string) {
    const nextParams = new URLSearchParams();
    nextParams.set("visitor", visitorId);
    setSearchParams(nextParams);
  }

  function closeVisitor() {
    setSearchParams(getReportContextParams());
  }

  const dailyReport = report?.type === "daily" ? report as DailyAnalyticsReport : null;
  const excludedReport = report?.type === "excluded" ? report as ExcludedVisitorsReport : null;
  const monthlyReport = report?.type === "monthly" ? report as MonthlyAnalyticsReport : null;
  const pageViewsReport = report?.type === "pageViews" ? report as PageViewsAnalyticsReport : null;
  const visitorReport = report?.type === "visitor" ? report as VisitorAnalyticsReport : null;

  return (
    <main className="visit-dashboard">
      <SignalHeader
        detailTitle={requestedVisitorId
          ? (focusedEventId ? "Enquiry journey" : "Visitor history")
          : isExcludedView
            ? "Excluded visitors"
            : isMonthlyView
              ? "Monthly enquiries"
              : isPageViewsView ? "Page views" : "Daily activity"}
        includeBots={includeBots}
        onHome={closeVisitor}
        onIncludeBotsChange={updateIncludeBots}
        onRefresh={refreshReport}
        showBotControl={!isExcludedView}
        status={status}
      />
      <div className="visit-signal__field">
        {status !== "ready" ? <ReportState onRetry={refreshReport} status={status} /> : null}
        {status === "ready" && requestedVisitorId && visitorReport ? (
          <VisitorHistory
            backLabel={isExcludedView
              ? "excluded visitors"
              : isPageViewsView
                ? "page views"
                : isMonthlyView
                  ? `${formatMonth(monthKey)} enquiries`
                  : dateKey === todayKey ? "today" : formatDate(dateKey, true)}
            focusedEventId={focusedEventId}
            focusedVisitId={focusedVisitId}
            includeBots={isExcludedView || includeBots}
            onBack={closeVisitor}
            report={visitorReport}
          />
        ) : null}
        {status === "ready" && !requestedVisitorId && !isMonthlyView && !isExcludedView && !isPageViewsView && dailyReport ? (
          <DailyObservatory
            dateKey={dailyReport.date}
            expandedVisitId={expandedVisitId}
            includeBots={includeBots}
            onDateChange={updateDate}
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
        {status === "ready" && !requestedVisitorId && isPageViewsView && pageViewsReport ? (
          <PageViewsBreakdown
            includeBots={includeBots}
            onRangeChange={updatePageViewRange}
            report={pageViewsReport}
            todayKey={todayKey}
          />
        ) : null}
        {status === "ready" && !requestedVisitorId && isExcludedView && excludedReport ? (
          <ExcludedVisitors
            onOpenVisitor={openExcludedVisitor}
            visitors={excludedReport.visitors}
          />
        ) : null}
        {status === "ready" && (
          (requestedVisitorId && !visitorReport)
          || (!requestedVisitorId && isExcludedView && !excludedReport)
          || (!requestedVisitorId && isMonthlyView && !monthlyReport)
          || (!requestedVisitorId && isPageViewsView && !pageViewsReport)
          || (!requestedVisitorId && !isMonthlyView && !isExcludedView && !isPageViewsView && !dailyReport)
        ) ? (
          <ReportState onRetry={refreshReport} status="error" />
        ) : null}
      </div>
    </main>
  );
}
