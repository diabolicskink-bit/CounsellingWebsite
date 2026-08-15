import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Clock3,
  LockKeyhole,
  Radio,
  RefreshCw,
  Route,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import {
  getPerthDateKey,
  isAnalyticsDateKey,
  type AnalyticsApiResponse,
  type AnalyticsReport,
  type AnalyticsTrafficSource,
  type AnalyticsVisit,
  type DailyAnalyticsReport,
  type VisitorAnalyticsReport,
} from "../data/analyticsContract";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-analytics.css";

type AnalyticsLoadState =
  | { report: null; status: "error" | "loading" }
  | { report: AnalyticsReport; status: "ready" };

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

function isAnalyticsReport(value: unknown): value is AnalyticsReport {
  if (!value || typeof value !== "object") return false;
  const report = value as Partial<AnalyticsReport>;

  return (report.type === "daily" || report.type === "visitor")
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

function SignalHeader({
  isDetail,
  onHome,
  onRefresh,
  status,
}: {
  isDetail: boolean;
  onHome: () => void;
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
          <strong>{isDetail ? "Visitor history" : "Daily activity"}</strong>
        </div>
        <div className="signal-header__system">
          <span><Clock3 aria-hidden="true" size={14} /> Perth time</span>
          <span className="signal-header__warning">
            <LockKeyhole aria-hidden="true" size={14} />
            {import.meta.env.DEV ? "Auth bypassed locally" : "Protected"}
          </span>
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

function DailyObservatory({
  dateKey,
  expandedVisitId,
  onDateChange,
  onOpenVisitor,
  onToggleVisit,
  todayKey,
  visits,
}: {
  dateKey: string;
  expandedVisitId: string | null;
  onDateChange: (date: string) => void;
  onOpenVisitor: (visit: AnalyticsVisit) => void;
  onToggleVisit: (visitId: string) => void;
  todayKey: string;
  visits: AnalyticsVisit[];
}) {
  const summary = useMemo(() => ({
    direct: visits.filter((visit) => visit.trafficSource === "direct").length,
    internal: visits.filter((visit) => visit.trafficSource === "internal").length,
    pages: visits.reduce((total, visit) => total + visit.pageViews.length, 0),
    paid: visits.filter((visit) => visit.trafficSource === "paid").length,
    referral: visits.filter((visit) => visit.trafficSource === "referral").length,
    returning: visits.filter((visit) => visit.visitNumber > 1).length,
  }), [visits]);
  const isToday = dateKey === todayKey;
  const denominator = Math.max(visits.length, 1);
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

        <div className="signal-overview__count" aria-label={`${visits.length} recorded visits`}>
          <span>Visits</span>
          <strong>{String(visits.length).padStart(2, "0")}</strong>
          <small>Recorded on this day</small>
        </div>

        <div className="signal-spectrum">
          <div
            aria-label={`${summary.pages} page views across ${summary.paid} paid, ${summary.referral} referral, ${summary.internal} internal and ${summary.direct} direct visits`}
            className={visits.length ? "signal-spectrum__orbit" : "signal-spectrum__orbit signal-spectrum__orbit--empty"}
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
          <div><span>Returning</span><strong>{String(summary.returning).padStart(2, "0")}</strong><small>{visits.length ? Math.round((summary.returning / visits.length) * 100) : 0}% of visits</small></div>
          <div><span>Average pages</span><strong>{visits.length ? (summary.pages / visits.length).toFixed(1) : "0.0"}</strong><small>Per visit</small></div>
        </div>
      </section>

      <section className="signal-stream" aria-labelledby="signal-stream-title">
        <header className="signal-stream__header">
          <div>
            <p className="signal-kicker">Newest first</p>
            <h2 id="signal-stream-title">Visits on this day</h2>
          </div>
          <span>{visits.length} {visits.length === 1 ? "visit" : "visits"}</span>
        </header>

        {visits.length ? (
          <ol className="signal-stream__list">
            {visits.map((visit) => {
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
                      <span className="signal-event__beacon"><i aria-hidden="true" /></span>
                      <div>
                        <strong>{visitorLabel(visit.visitorId)}</strong>
                        <span>{visit.visitNumber > 1 ? `Returning · visit ${visit.visitNumber}` : "New visitor"}</span>
                      </div>
                    </div>

                    <div className="signal-event__trace">
                      <div className="signal-event__trace-meta">
                        <SourceMark source={visit.trafficSource} />
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
                            <h3 id={`${detailId}-journey`}>Page journey</h3>
                          </div>
                          <span><Route aria-hidden="true" size={15} /> {visit.pageViews.length} pages in order</span>
                        </header>
                        <ol>
                          {visit.pageViews.map((pageView, index) => (
                            <li key={pageView.id}>
                              <span>{String(index + 1).padStart(2, "0")}</span>
                              <time dateTime={pageView.viewedAt}>{formatTime(pageView.viewedAt)}</time>
                              <strong>{pageView.path}</strong>
                            </li>
                          ))}
                        </ol>
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
        Records page loads only. Elapsed spans run from the first to the last recorded page load; they do not include time spent on the final page. It does not show clicks, scrolling, reading time or form contents.
      </p>
    </>
  );
}

function VisitorHistory({
  contextDate,
  focusedVisitId,
  onBack,
  report,
}: {
  contextDate: string;
  focusedVisitId: string | null;
  onBack: () => void;
  report: VisitorAnalyticsReport;
}) {
  const focusedVisit = report.visits.find((visit) => visit.id === focusedVisitId)
    ?? report.visits[0]
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

  const firstVisit = report.visits[report.visits.length - 1] ?? focusedVisit;
  const latestVisit = report.visits[0] ?? focusedVisit;
  const label = visitorLabel(report.visitorId);

  return (
    <>
      <button className="signal-back" onClick={onBack} type="button">
        <ArrowLeft aria-hidden="true" size={16} />
        Back to {contextDate === getPerthDateKey() ? "today" : formatDate(contextDate, true)}
      </button>

      <section className="visitor-summary" aria-labelledby="visitor-history-title">
        <div className="visitor-summary__identity">
          <span aria-hidden="true">{label.replace("Browser ", "")}</span>
          <div>
            <p className="signal-kicker">Anonymous browser</p>
            <h1 id="visitor-history-title">{label}</h1>
            <p>This browser has {report.visits.length} recorded {report.visits.length === 1 ? "visit" : "visits"}.</p>
          </div>
        </div>
        <dl>
          <div><dt>First seen</dt><dd>{formatDate(firstVisit.dateKey, true)}</dd></div>
          <div><dt>Most recent</dt><dd>{formatDate(latestVisit.dateKey, true)}</dd></div>
          <div><dt>Total visits</dt><dd>{String(report.visits.length).padStart(2, "0")}</dd></div>
        </dl>
      </section>

      <section className="visitor-history" aria-labelledby="all-visits-title">
        <header className="visitor-history__header">
          <div>
            <p className="signal-kicker">Complete history</p>
            <h2 id="all-visits-title">All visits</h2>
          </div>
          <p>Every retained page load and the attribution stored when each visit began.</p>
        </header>

        <div className="visitor-history__list">
          {report.visits.map((visit) => {
            const isFocused = visit.id === focusedVisit.id;

            return (
              <article className={isFocused ? "visitor-visit visitor-visit--focused" : "visitor-visit"} key={visit.id}>
                <header className="visitor-visit__summary">
                  <span className="visitor-visit__number">{String(visit.visitNumber).padStart(2, "0")}</span>
                  <div>
                    <p>{isFocused ? "Opened from daily activity" : `Visit ${visit.visitNumber}`}</p>
                    <h3>{formatDate(visit.dateKey, true)} at {formatTime(visit.startedAt)}</h3>
                    <SourceMark source={visit.trafficSource} />
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
                      <h4 id={`${visit.id}-journey`}>Page journey</h4>
                      <span>{visit.pageViews.length} in order</span>
                    </header>
                    <ol>
                      {visit.pageViews.map((pageView, index) => (
                        <li key={pageView.id}>
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <time dateTime={pageView.viewedAt}>{formatTime(pageView.viewedAt)}</time>
                          <strong>{pageView.path}</strong>
                        </li>
                      ))}
                    </ol>
                  </section>

                  <section className="visitor-visit__attribution" aria-labelledby={`${visit.id}-attribution`}>
                    <header><h4 id={`${visit.id}-attribution`}>Attribution</h4></header>
                    <dl>
                      <div><dt>Referrer</dt><dd>{visit.referrerUrl ?? "None recorded"}</dd></div>
                      <div><dt>Ad / network</dt><dd>{adNetworkDetail(visit)}</dd></div>
                      <div><dt>Keyword / match</dt><dd>{keywordMatchDetail(visit)}</dd></div>
                      <div><dt>GCLID</dt><dd>{visit.gclid ?? "None recorded"}</dd></div>
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [todayKey, setTodayKey] = useState(getPerthDateKey);
  const requestedDate = searchParams.get("date");
  const dateKey = isAnalyticsDateKey(requestedDate) && requestedDate <= todayKey ? requestedDate : todayKey;
  const expandedVisitId = searchParams.get("expanded");
  const requestedVisitorId = searchParams.get("visitor");
  const focusedVisitId = searchParams.get("visit");
  const requestQuery = requestedVisitorId
    ? `visitor=${encodeURIComponent(requestedVisitorId)}`
    : `date=${encodeURIComponent(dateKey)}`;
  const { report, retry, status } = useAnalyticsReport(requestQuery);

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

  function updateDate(nextDate: string) {
    if (!isAnalyticsDateKey(nextDate) || nextDate > todayKey) return;
    const nextParams = new URLSearchParams();
    if (nextDate !== todayKey) nextParams.set("date", nextDate);
    setSearchParams(nextParams);
  }

  function toggleVisit(visitId: string) {
    const nextParams = new URLSearchParams(searchParams);
    if (dateKey !== todayKey) nextParams.set("date", dateKey);
    if (expandedVisitId === visitId) nextParams.delete("expanded");
    else nextParams.set("expanded", visitId);
    setSearchParams(nextParams);
  }

  function openVisitor(visit: AnalyticsVisit) {
    const nextParams = new URLSearchParams(searchParams);
    if (dateKey !== todayKey) nextParams.set("date", dateKey);
    nextParams.delete("expanded");
    nextParams.set("visitor", visit.visitorId);
    nextParams.set("visit", visit.id);
    setSearchParams(nextParams);
  }

  function closeVisitor() {
    const nextParams = new URLSearchParams(searchParams);
    if (dateKey !== todayKey) nextParams.set("date", dateKey);
    else nextParams.delete("date");
    nextParams.delete("expanded");
    nextParams.delete("visit");
    nextParams.delete("visitor");
    setSearchParams(nextParams);
  }

  const dailyReport = report?.type === "daily" ? report as DailyAnalyticsReport : null;
  const visitorReport = report?.type === "visitor" ? report as VisitorAnalyticsReport : null;

  return (
    <main className="visit-dashboard">
      <SignalHeader
        isDetail={Boolean(requestedVisitorId)}
        onHome={closeVisitor}
        onRefresh={refreshReport}
        status={status}
      />
      <div className="visit-signal__field">
        {status !== "ready" ? <ReportState onRetry={refreshReport} status={status} /> : null}
        {status === "ready" && requestedVisitorId && visitorReport ? (
          <VisitorHistory
            contextDate={dateKey}
            focusedVisitId={focusedVisitId}
            onBack={closeVisitor}
            report={visitorReport}
          />
        ) : null}
        {status === "ready" && !requestedVisitorId && dailyReport ? (
          <DailyObservatory
            dateKey={dailyReport.date}
            expandedVisitId={expandedVisitId}
            onDateChange={updateDate}
            onOpenVisitor={openVisitor}
            onToggleVisit={toggleVisit}
            todayKey={todayKey}
            visits={dailyReport.visits}
          />
        ) : null}
        {status === "ready" && ((requestedVisitorId && !visitorReport) || (!requestedVisitorId && !dailyReport)) ? (
          <ReportState onRetry={refreshReport} status="error" />
        ) : null}
      </div>
    </main>
  );
}
