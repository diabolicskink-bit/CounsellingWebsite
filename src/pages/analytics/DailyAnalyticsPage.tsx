import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  CircleCheck,
  CircleX,
  Clock3,
  MapPin,
  MousePointerClick,
  Radio,
  RefreshCw,
  TextCursorInput,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import {
  getPerthDateKey,
  isAnalyticsDateKey,
  type AnalyticsVisit,
} from "../../data/analyticsContract";
import type { VisitDeviceType } from "../../data/visitClientEnvironment";
import { privateRoutePaths } from "../../data/routes";
import useDocumentMetadata from "../../hooks/useDocumentMetadata";
import { DateControls } from "./AnalyticsControls";
import {
  contactSelectionLabel,
  formatActiveTime,
  formatDate,
  formatTime,
  sourceDetail,
  visitActiveSeconds,
  visitLocationCompactLabel,
  visitLocationLabel,
  visitorLabel,
} from "./analyticsFormatters";
import { AnalyticsShell, ReportState } from "./AnalyticsShell";
import {
  BotMark,
  DeviceIcon,
  DeviceMark,
  deviceLabels,
  LocationMark,
  OutboundActionMark,
  SourceMark,
  VisitDetailPanel,
  WebDriverMark,
} from "./VisitDetails";
import VisitorHistory from "./VisitorHistory";
import useAnalyticsReport from "./useAnalyticsReport";

type VisitContactProgress = {
  kind: "attempted" | "failed" | "selected" | "sent" | "started";
  label: string;
};

function TrafficDiagnostics({ visits }: { visits: AnalyticsVisit[] }) {
  const deviceCounts = visits.reduce<Record<VisitDeviceType, number>>(
    (counts, visit) => ({
      ...counts,
      [visit.deviceType]: counts[visit.deviceType] + 1,
    }),
    { desktop: 0, mobile: 0, tablet: 0, unknown: 0 },
  );
  const denominator = Math.max(visits.length, 1);
  const deviceTypes = Object.keys(deviceLabels) as VisitDeviceType[];
  const locationCounts = [...visits.reduce((counts, visit) => {
    const key = visitLocationCompactLabel(visit);
    const current = counts.get(key);
    counts.set(key, {
      count: (current?.count ?? 0) + 1,
      key,
      label: visitLocationLabel(visit),
    });
    return counts;
  }, new Map<string, { count: number; key: string; label: string }>()).values()]
    .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label));
  const displayedLocations = locationCounts.slice(0, 4);
  const otherLocationCount = locationCounts
    .slice(displayedLocations.length)
    .reduce((total, location) => total + location.count, 0);

  return (
    <section className="signal-diagnostics" aria-label="Location and device mix">
      <div className="signal-diagnostics__body">
        <div className="signal-location-mix">
          <h3><MapPin aria-hidden="true" size={15} /> Location mix</h3>
          {displayedLocations.length ? (
            <dl>
              {displayedLocations.map((location) => (
                <div key={location.key}>
                  <dt title={location.label}>{location.label}</dt>
                  <i aria-hidden="true">
                    <b
                      style={{
                        "--signal-location-width": `${(location.count / denominator) * 100}%`,
                      } as CSSProperties}
                    />
                  </i>
                  <dd>
                    <strong>{location.count}</strong>
                    <small>{Math.round((location.count / denominator) * 100)}%</small>
                  </dd>
                </div>
              ))}
              {otherLocationCount ? (
                <div>
                  <dt>Other locations</dt>
                  <i aria-hidden="true">
                    <b
                      style={{
                        "--signal-location-width": `${(otherLocationCount / denominator) * 100}%`,
                      } as CSSProperties}
                    />
                  </i>
                  <dd>
                    <strong>{otherLocationCount}</strong>
                    <small>{Math.round((otherLocationCount / denominator) * 100)}%</small>
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : <p>No location data</p>}
        </div>

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

      </div>
    </section>
  );
}

function visitContactProgress(events: AnalyticsVisit["events"]): VisitContactProgress | null {
  if (events.some((visitEvent) => visitEvent.eventType === "enquiry_sent")) {
    return { kind: "sent", label: "Enquiry sent" };
  }

  if (events.some((visitEvent) => visitEvent.eventType === "enquiry_failed")) {
    return { kind: "failed", label: "Send failed" };
  }

  if (events.some((visitEvent) => visitEvent.eventType === "enquiry_submit_attempted")) {
    return { kind: "attempted", label: "Submission attempted" };
  }

  const selectedContactEvent = [...events]
    .filter((visitEvent) => visitEvent.eventType === "contact_option_selected")
    .sort((left, right) =>
      new Date(right.occurredAt).getTime() - new Date(left.occurredAt).getTime()
    )[0];
  const selectedContact = selectedContactEvent
    ? contactSelectionLabel(selectedContactEvent)
    : null;

  if (selectedContact) {
    return { kind: "selected", label: selectedContact };
  }

  if (events.some((visitEvent) => visitEvent.eventType === "enquiry_started")) {
    return { kind: "started", label: "Enquiry started" };
  }

  return null;
}

function ContactProgressSignal({ progress }: { progress: VisitContactProgress | null }) {
  if (!progress) return null;

  let className = "signal-contact-signal";
  let icon = <Clock3 aria-hidden="true" size={14} />;

  if (progress.kind === "sent") {
    className = "signal-enquiry-signal signal-enquiry-signal--sent";
    icon = <CircleCheck aria-hidden="true" size={15} />;
  } else if (progress.kind === "failed") {
    className = "signal-enquiry-signal signal-enquiry-signal--failed";
    icon = <CircleX aria-hidden="true" size={15} />;
  } else if (progress.kind === "selected") {
    icon = <MousePointerClick aria-hidden="true" size={14} />;
  } else if (progress.kind === "started") {
    icon = <TextCursorInput aria-hidden="true" size={14} />;
  }

  return <span className={className}>{icon} {progress.label}</span>;
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
  const summary = useMemo(() => ({
    direct: includedVisits.filter((visit) => visit.trafficSource === "direct").length,
    internal: includedVisits.filter((visit) => visit.trafficSource === "internal").length,
    pages: includedVisits.reduce((total, visit) => total + visit.pageViews.length, 0),
    paid: includedVisits.filter((visit) => visit.trafficSource === "paid").length,
    referral: includedVisits.filter((visit) => visit.trafficSource === "referral").length,
    returning: includedVisits.filter((visit) => visit.visitNumber > 1).length,
    visits: includedVisits.length,
  }), [includedVisits]);
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
            <Link
              aria-label={`View full page-view breakdown for ${formatDate(dateKey, true)}`}
              className="signal-pages__count"
              to={pageViewReportPath}
            >
              <strong>{String(summary.pages).padStart(2, "0")}</strong>
            </Link>
            <small>{summary.visits ? (summary.pages / summary.visits).toFixed(1) : "0.0"} avg per visit</small>
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

      <section className="signal-report__section" aria-labelledby="signal-stream-title">
        <header className="signal-report__section-header">
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
              const events = visit.events;
              const contactProgress = visitContactProgress(events);
              const activeSeconds = visitActiveSeconds(visit);
              const cardClassName = [
                "signal-visit-card",
                isExpanded ? "signal-visit-card--expanded" : null,
                contactProgress?.kind === "sent" ? "signal-visit-card--enquiry-sent" : null,
                contactProgress?.kind === "failed" ? "signal-visit-card--enquiry-failed" : null,
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
                        <LocationMark visit={visit} />
                        <WebDriverMark visit={visit} />
                        <OutboundActionMark visit={visit} />
                        <ContactProgressSignal progress={contactProgress} />
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
                    <VisitDetailPanel
                      detailId={detailId}
                      headingLevel="h3"
                      onOpenVisitor={onOpenVisitor}
                      visit={visit}
                    />
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
        Records page loads, visible active time, outbound link clicks and enquiry lifecycle events shown here. {includeBots ? "Bot visits are included in this view." : "Visits identified by BotID as bots are excluded; unclassified records are treated as visits."} Form contents are not included in this report.
      </p>
    </>
  );
}

export default function DailyAnalyticsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [todayKey, setTodayKey] = useState(getPerthDateKey);
  const requestedDate = searchParams.get("date");
  const dateKey = isAnalyticsDateKey(requestedDate) && requestedDate <= todayKey
    ? requestedDate
    : todayKey;
  const expandedVisitId = searchParams.get("expanded");
  const includeBots = searchParams.get("bots") === "include";
  const requestedVisitorId = searchParams.get("visitor");
  const focusedVisitId = searchParams.get("visit");
  const focusedEventId = searchParams.get("event");
  const expectedType = requestedVisitorId ? "visitor" : "daily";
  const requestUrl = requestedVisitorId
    ? `/api/analytics?visitor=${encodeURIComponent(requestedVisitorId)}`
    : `/api/analytics?date=${encodeURIComponent(dateKey)}`;
  const { report, retry, status } = useAnalyticsReport(requestUrl, expectedType);

  useDocumentMetadata(
    "Analytics | Vive Counselling",
    "Private first-party visit analytics for Vive Counselling.",
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

  function updateDate(nextDate: string) {
    if (!isAnalyticsDateKey(nextDate) || nextDate > todayKey) return;
    const nextParams = new URLSearchParams();
    if (includeBots) nextParams.set("bots", "include");
    if (nextDate !== todayKey) nextParams.set("date", nextDate);
    setSearchParams(nextParams);
  }

  function dailyContextParams() {
    const nextParams = new URLSearchParams();
    if (includeBots) nextParams.set("bots", "include");
    if (dateKey !== todayKey) nextParams.set("date", dateKey);
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
    const nextParams = dailyContextParams();
    nextParams.set("visitor", visit.visitorId);
    nextParams.set("visit", visit.id);
    setSearchParams(nextParams);
  }

  function closeVisitor() {
    setSearchParams(dailyContextParams());
  }

  const dailyReport = report?.type === "daily" ? report : null;
  const visitorReport = report?.type === "visitor" ? report : null;

  return (
    <AnalyticsShell
      detailTitle={requestedVisitorId
        ? (focusedEventId ? "Enquiry journey" : "Visitor history")
        : "Daily activity"}
      includeBots={includeBots}
      onIncludeBotsChange={updateIncludeBots}
      onRefresh={refreshReport}
      showBotControl
      status={status}
    >
      {status !== "ready" ? <ReportState onRetry={refreshReport} status={status} /> : null}
      {status === "ready" && requestedVisitorId && visitorReport ? (
        <VisitorHistory
          backLabel={dateKey === todayKey ? "today" : formatDate(dateKey, true)}
          focusedEventId={focusedEventId}
          focusedVisitId={focusedVisitId}
          includeBots={includeBots}
          onBack={closeVisitor}
          report={visitorReport}
        />
      ) : null}
      {status === "ready" && !requestedVisitorId && dailyReport ? (
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
    </AnalyticsShell>
  );
}
