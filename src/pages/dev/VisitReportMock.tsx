import type { CSSProperties } from "react";
import { useEffect, useMemo } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Clock3,
  LockKeyhole,
  Radio,
  Route,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import useDocumentMetadata from "../../hooks/useDocumentMetadata";
import "../../styles-visit-report.css";

type TrafficSource = "direct" | "paid" | "referral";

type PageView = {
  path: string;
  time: string;
};

type MockVisit = {
  adCode?: string;
  dateKey: string;
  durationMinutes: number;
  gclid?: string;
  id: string;
  landingPath: string;
  matchType?: string;
  matchedKeyword?: string;
  networkCode?: string;
  pageViews: PageView[];
  referrerUrl: string | null;
  startedAt: string;
  trafficSource: TrafficSource;
  visitNumber: number;
  visitorId: string;
  visitorLabel: string;
};

type VisitFixture = Omit<MockVisit, "dateKey" | "landingPath" | "pageViews"> & {
  dayOffset?: number;
  pages: Array<[time: string, path: string]>;
};

const perthDateFormatter = new Intl.DateTimeFormat("en-CA", {
  day: "2-digit",
  month: "2-digit",
  timeZone: "Australia/Perth",
  year: "numeric",
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

function getPerthDateKey() {
  const parts = perthDateFormatter.formatToParts(new Date());
  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${getPart("year")}-${getPart("month")}-${getPart("day")}`;
}

function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12));
}

function isDateKey(value: string | null): value is string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const parsed = parseDateKey(value);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function shiftDateKey(dateKey: string, offset: number) {
  const shiftedDate = parseDateKey(dateKey);
  shiftedDate.setUTCDate(shiftedDate.getUTCDate() + offset);
  return shiftedDate.toISOString().slice(0, 10);
}

function formatDate(dateKey: string, compact = false) {
  return (compact ? compactDateFormatter : displayDateFormatter).format(parseDateKey(dateKey));
}

function formatDuration(minutes: number) {
  return minutes < 1 ? "< 1 min" : `${minutes} min`;
}

function sourceLabel(source: TrafficSource) {
  if (source === "paid") return "Paid search";
  if (source === "referral") return "Referral";
  return "Direct";
}

function networkLabel(networkCode?: string) {
  if (networkCode === "g") return "Google Search";
  if (networkCode === "s") return "Search partners";
  return networkCode ?? "Network unavailable";
}

function sourceDetail(visit: MockVisit) {
  if (visit.trafficSource === "paid") {
    return `${networkLabel(visit.networkCode)} · ${visit.matchedKeyword ?? "Keyword unavailable"} · ${visit.matchType ?? "Match unavailable"}`;
  }

  if (visit.trafficSource === "referral") {
    try {
      return new URL(visit.referrerUrl ?? "").hostname.replace(/^www\./, "");
    } catch {
      return "Referrer unavailable";
    }
  }

  return "No referrer";
}

function createMockVisits(todayKey: string): MockVisit[] {
  const fixtures: VisitFixture[] = [
    {
      id: "visit-7a2f-4", visitorId: "mock-visitor-7a2f", visitorLabel: "Browser 7A2F",
      startedAt: "10:54", durationMinutes: 17, visitNumber: 4, trafficSource: "paid",
      referrerUrl: "https://www.google.com/", adCode: "enm", networkCode: "g",
      matchedKeyword: "polyamory therapy", matchType: "Phrase", gclid: "CjwKCA-demo-7a2f-visit-04",
      pages: [
        ["10:54", "/polyamory-enm-counselling"],
        ["10:56", "/working-with-joel"],
        ["10:58", "/inclusive-counselling"],
        ["11:00", "/kink-bdsm-counselling"],
        ["11:02", "/polyamory-enm-counselling"],
        ["11:04", "/lgbtqia-affirming-counselling"],
        ["11:06", "/contact"],
        ["11:08", "/crisis-support"],
        ["11:11", "/contact"],
      ],
    },
    {
      id: "visit-31bc-2", visitorId: "mock-visitor-31bc", visitorLabel: "Browser 31BC",
      startedAt: "10:17", durationMinutes: 5, visitNumber: 2, trafficSource: "paid",
      referrerUrl: "https://www.google.com/", adCode: "kink", networkCode: "s",
      matchedKeyword: "kink aware therapist", matchType: "Exact", gclid: "CjwKCA-demo-31bc-visit-02",
      pages: [["10:17", "/kink-bdsm-counselling"], ["10:19", "/inclusive-counselling"], ["10:22", "/contact"]],
    },
    {
      id: "visit-982d-1", visitorId: "mock-visitor-982d", visitorLabel: "Browser 982D",
      startedAt: "09:42", durationMinutes: 6, visitNumber: 1, trafficSource: "referral",
      referrerUrl: "https://www.psychologytoday.com/au/counselling/western-australia?category=lgbtq",
      pages: [["09:42", "/lgbtqia-affirming-counselling"], ["09:45", "/working-with-joel"], ["09:48", "/contact"]],
    },
    {
      id: "visit-b04e-3", visitorId: "mock-visitor-b04e", visitorLabel: "Browser B04E",
      startedAt: "08:56", durationMinutes: 3, visitNumber: 3, trafficSource: "direct", referrerUrl: null,
      pages: [["08:56", "/"], ["08:59", "/contact"]],
    },
    {
      id: "visit-51ad-1", visitorId: "mock-visitor-51ad", visitorLabel: "Browser 51AD",
      startedAt: "08:31", durationMinutes: 4, visitNumber: 1, trafficSource: "referral",
      referrerUrl: "https://www.bing.com/search?q=online+counselling+perth",
      pages: [["08:31", "/working-with-joel"], ["08:35", "/contact"]],
    },
    {
      id: "visit-c887-1", visitorId: "mock-visitor-c887", visitorLabel: "Browser C887",
      startedAt: "07:48", durationMinutes: 0, visitNumber: 1, trafficSource: "direct", referrerUrl: null,
      pages: [["07:48", "/inclusive-counselling"]],
    },
    {
      id: "visit-ee19-1", visitorId: "mock-visitor-ee19", visitorLabel: "Browser EE19",
      startedAt: "07:12", durationMinutes: 2, visitNumber: 1, trafficSource: "direct", referrerUrl: null,
      pages: [["07:12", "/"], ["07:14", "/working-with-joel"]],
    },
    {
      id: "visit-7a2f-3", visitorId: "mock-visitor-7a2f", visitorLabel: "Browser 7A2F", dayOffset: -1,
      startedAt: "19:26", durationMinutes: 7, visitNumber: 3, trafficSource: "direct", referrerUrl: null,
      pages: [["19:26", "/"], ["19:29", "/polyamory-enm-counselling"], ["19:33", "/contact"]],
    },
    {
      id: "visit-7a2f-2", visitorId: "mock-visitor-7a2f", visitorLabel: "Browser 7A2F", dayOffset: -5,
      startedAt: "12:08", durationMinutes: 4, visitNumber: 2, trafficSource: "referral",
      referrerUrl: "https://directory.example.org.au/affirming-counsellors/perth-online",
      pages: [["12:08", "/inclusive-counselling"], ["12:12", "/polyamory-enm-counselling"]],
    },
    {
      id: "visit-7a2f-1", visitorId: "mock-visitor-7a2f", visitorLabel: "Browser 7A2F", dayOffset: -12,
      startedAt: "21:41", durationMinutes: 1, visitNumber: 1, trafficSource: "paid",
      referrerUrl: "https://www.google.com/", adCode: "enm", networkCode: "g",
      matchedKeyword: "enm counselling perth", matchType: "Broad", gclid: "CjwKCA-demo-7a2f-visit-01",
      pages: [["21:41", "/polyamory-enm-counselling"]],
    },
    {
      id: "visit-31bc-1", visitorId: "mock-visitor-31bc", visitorLabel: "Browser 31BC", dayOffset: -8,
      startedAt: "16:03", durationMinutes: 3, visitNumber: 1, trafficSource: "paid",
      referrerUrl: "https://www.google.com/", adCode: "kink", networkCode: "g",
      matchedKeyword: "bdsm friendly counselling", matchType: "Phrase", gclid: "CjwKCA-demo-31bc-visit-01",
      pages: [["16:03", "/kink-bdsm-counselling"], ["16:06", "/working-with-joel"]],
    },
    {
      id: "visit-b04e-2", visitorId: "mock-visitor-b04e", visitorLabel: "Browser B04E", dayOffset: -2,
      startedAt: "07:18", durationMinutes: 2, visitNumber: 2, trafficSource: "direct", referrerUrl: null,
      pages: [["07:18", "/contact"]],
    },
    {
      id: "visit-b04e-1", visitorId: "mock-visitor-b04e", visitorLabel: "Browser B04E", dayOffset: -27,
      startedAt: "18:32", durationMinutes: 5, visitNumber: 1, trafficSource: "referral",
      referrerUrl: "https://www.instagram.com/",
      pages: [["18:32", "/"], ["18:34", "/working-with-joel"], ["18:37", "/contact"]],
    },
  ];

  return fixtures.map(({ dayOffset = 0, pages, ...visit }) => ({
    ...visit,
    dateKey: shiftDateKey(todayKey, dayOffset),
    landingPath: pages[0]?.[1] ?? "/",
    pageViews: pages.map(([time, path]) => ({ time, path })),
  }));
}

function SourceMark({ source }: { source: TrafficSource }) {
  return (
    <span className={`signal-source signal-source--${source}`}>
      <i aria-hidden="true" />
      {sourceLabel(source)}
    </span>
  );
}

function SignalHeader({ isDetail, onHome }: { isDetail: boolean; onHome: () => void }) {
  return (
    <header className="signal-header">
      <div className="signal-header__inner">
        <button className="signal-header__brand" onClick={onHome} type="button">
          <span>V</span>
          <strong>Vive</strong>
        </button>
        <div className="signal-header__title">
          <small>Private reporting</small>
          <strong>{isDetail ? "Visitor history" : "Daily activity"}</strong>
        </div>
        <div className="signal-header__system">
          <span><Clock3 aria-hidden="true" size={14} /> Perth time</span>
          <span className="signal-header__warning"><LockKeyhole aria-hidden="true" size={14} /> Authentication off</span>
          <span className="signal-header__mock"><i aria-hidden="true" /> Fictional data</span>
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
  onOpenVisitor: (visitId: string) => void;
  onToggleVisit: (visitId: string) => void;
  todayKey: string;
  visits: MockVisit[];
}) {
  const summary = useMemo(() => ({
    direct: visits.filter((visit) => visit.trafficSource === "direct").length,
    pages: visits.reduce((total, visit) => total + visit.pageViews.length, 0),
    paid: visits.filter((visit) => visit.trafficSource === "paid").length,
    referral: visits.filter((visit) => visit.trafficSource === "referral").length,
    returning: visits.filter((visit) => visit.visitNumber > 1).length,
  }), [visits]);
  const isToday = dateKey === todayKey;
  const denominator = Math.max(visits.length, 1);
  const paidEnd = (summary.paid / denominator) * 360;
  const referralEnd = paidEnd + (summary.referral / denominator) * 360;
  const spectrumStyle = {
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
          <small>Recorded today</small>
        </div>

        <div className="signal-spectrum">
          <div
            aria-label={`${summary.paid} paid, ${summary.referral} referral and ${summary.direct} direct visits`}
            className="signal-spectrum__orbit"
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
            <span className="signal-spectrum__direct"><i />{summary.direct} direct</span>
          </div>
        </div>

        <div className="signal-telemetry" aria-label="Daily summary">
          <div><span>Returning</span><strong>{String(summary.returning).padStart(2, "0")}</strong><small>{visits.length ? Math.round((summary.returning / visits.length) * 100) : 0}% of visits</small></div>
          <div><span>Average pages</span><strong>{visits.length ? (summary.pages / visits.length).toFixed(1) : "0.0"}</strong><small>Per visit</small></div>
          <div><span>Data</span><strong className="signal-telemetry__status">Mock</strong><small>Fictional records</small></div>
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
                    <time className="signal-event__time" dateTime={`${visit.dateKey}T${visit.startedAt}:00+08:00`}>
                      {visit.startedAt}
                    </time>

                    <div className="signal-event__identity">
                      <span className="signal-event__beacon"><i aria-hidden="true" /></span>
                      <div>
                        <strong>{visit.visitorLabel}</strong>
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
                          <span key={`${visit.id}-${pageView.time}`}>
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
                      <span>{visit.pageViews.length === 1 ? "page" : "pages"} · {formatDuration(visit.durationMinutes)}</span>
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
                            <li key={`${visit.id}-detail-${pageView.time}`}>
                              <span>{String(index + 1).padStart(2, "0")}</span>
                              <time dateTime={`${visit.dateKey}T${pageView.time}:00+08:00`}>{pageView.time}</time>
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
                          <div><dt>Ad / network</dt><dd>{visit.adCode ? `${visit.adCode} / ${networkLabel(visit.networkCode)}` : "Not an ad visit"}</dd></div>
                          <div><dt>Keyword / match</dt><dd>{visit.matchedKeyword ? `${visit.matchedKeyword} / ${visit.matchType ?? "—"}` : "None recorded"}</dd></div>
                          <div><dt>GCLID</dt><dd>{visit.gclid ?? "None recorded"}</dd></div>
                        </dl>
                        <button onClick={() => onOpenVisitor(visit.id)} type="button">
                          View all visits from {visit.visitorLabel}
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
            <p>No fictional visits exist on this date. Choose another date to continue.</p>
          </div>
        )}
      </section>

      <p className="signal-footnote">
        Records page loads only. It does not show clicks, scrolling, reading time or form contents.
      </p>
    </>
  );
}

function VisitorHistory({
  allVisits,
  contextDate,
  onBack,
  visit,
}: {
  allVisits: MockVisit[];
  contextDate: string;
  onBack: () => void;
  visit: MockVisit | null;
}) {
  if (!visit) {
    return (
      <section className="signal-missing">
        <Radio aria-hidden="true" size={34} />
        <p className="signal-kicker">Visitor not found</p>
        <h1>This visitor is unavailable</h1>
        <button onClick={onBack} type="button"><ArrowLeft aria-hidden="true" size={17} /> Back to visits</button>
      </section>
    );
  }

  const visitorHistory = allVisits
    .filter((candidate) => candidate.visitorId === visit.visitorId)
    .sort((a, b) => `${b.dateKey}T${b.startedAt}`.localeCompare(`${a.dateKey}T${a.startedAt}`));
  const firstVisit = visitorHistory[visitorHistory.length - 1] ?? visit;
  const latestVisit = visitorHistory[0] ?? visit;

  return (
    <>
      <button className="signal-back" onClick={onBack} type="button">
        <ArrowLeft aria-hidden="true" size={16} />
        Back to {contextDate === getPerthDateKey() ? "today" : formatDate(contextDate, true)}
      </button>

      <section className="visitor-summary" aria-labelledby="visitor-history-title">
        <div className="visitor-summary__identity">
          <span aria-hidden="true">{visit.visitorLabel.replace("Browser ", "")}</span>
          <div>
            <p className="signal-kicker">Anonymous browser</p>
            <h1 id="visitor-history-title">{visit.visitorLabel}</h1>
            <p>This browser has {visitorHistory.length} recorded {visitorHistory.length === 1 ? "visit" : "visits"}.</p>
          </div>
        </div>
        <dl>
          <div><dt>First seen</dt><dd>{formatDate(firstVisit.dateKey, true)}</dd></div>
          <div><dt>Most recent</dt><dd>{formatDate(latestVisit.dateKey, true)}</dd></div>
          <div><dt>Total visits</dt><dd>{String(visitorHistory.length).padStart(2, "0")}</dd></div>
        </dl>
      </section>

      <section className="visitor-history" aria-labelledby="all-visits-title">
        <header className="visitor-history__header">
          <div>
            <p className="signal-kicker">Complete history</p>
            <h2 id="all-visits-title">All visits</h2>
          </div>
          <p>Each visit shows every recorded page load and the information stored when the visit began.</p>
        </header>

        <div className="visitor-history__list">
          {visitorHistory.map((historyVisit) => {
            const isFocused = historyVisit.id === visit.id;

            return (
              <article className={isFocused ? "visitor-visit visitor-visit--focused" : "visitor-visit"} key={historyVisit.id}>
                <header className="visitor-visit__summary">
                  <span className="visitor-visit__number">{String(historyVisit.visitNumber).padStart(2, "0")}</span>
                  <div>
                    <p>{isFocused ? "Opened from daily activity" : `Visit ${historyVisit.visitNumber}`}</p>
                    <h3>{formatDate(historyVisit.dateKey, true)} at {historyVisit.startedAt}</h3>
                    <SourceMark source={historyVisit.trafficSource} />
                  </div>
                  <dl>
                    <div><dt>Landing page</dt><dd>{historyVisit.landingPath}</dd></div>
                    <div><dt>Pages</dt><dd>{historyVisit.pageViews.length}</dd></div>
                    <div><dt>Duration</dt><dd>{formatDuration(historyVisit.durationMinutes)}</dd></div>
                  </dl>
                </header>

                <div className="visitor-visit__detail">
                  <section className="visitor-visit__journey" aria-labelledby={`${historyVisit.id}-journey`}>
                    <header>
                      <h4 id={`${historyVisit.id}-journey`}>Page journey</h4>
                      <span>{historyVisit.pageViews.length} in order</span>
                    </header>
                    <ol>
                      {historyVisit.pageViews.map((pageView, index) => (
                        <li key={`${historyVisit.id}-${pageView.time}`}>
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <time dateTime={`${historyVisit.dateKey}T${pageView.time}:00+08:00`}>{pageView.time}</time>
                          <strong>{pageView.path}</strong>
                        </li>
                      ))}
                    </ol>
                  </section>

                  <section className="visitor-visit__attribution" aria-labelledby={`${historyVisit.id}-attribution`}>
                    <header><h4 id={`${historyVisit.id}-attribution`}>Attribution</h4></header>
                    <dl>
                      <div><dt>Referrer</dt><dd>{historyVisit.referrerUrl ?? "None recorded"}</dd></div>
                      <div><dt>Ad / network</dt><dd>{historyVisit.adCode ? `${historyVisit.adCode} / ${networkLabel(historyVisit.networkCode)}` : "Not an ad visit"}</dd></div>
                      <div><dt>Keyword / match</dt><dd>{historyVisit.matchedKeyword ? `${historyVisit.matchedKeyword} / ${historyVisit.matchType ?? "—"}` : "None recorded"}</dd></div>
                      <div><dt>GCLID</dt><dd>{historyVisit.gclid ?? "None recorded"}</dd></div>
                    </dl>
                  </section>
                </div>
              </article>
            );
          })}
        </div>

        <p className="visitor-history__note">
          This is one anonymous browser identifier, not a known person. A different device or cleared browser storage starts a separate history.
        </p>
      </section>
    </>
  );
}

export default function VisitReportMock() {
  const [searchParams, setSearchParams] = useSearchParams();
  const todayKey = useMemo(() => getPerthDateKey(), []);
  const allVisits = useMemo(() => createMockVisits(todayKey), [todayKey]);
  const requestedDate = searchParams.get("date");
  const dateKey = isDateKey(requestedDate) && requestedDate <= todayKey ? requestedDate : todayKey;
  const expandedVisitId = searchParams.get("expanded");
  const selectedVisitId = searchParams.get("visit");
  const selectedVisit = selectedVisitId ? allVisits.find((visit) => visit.id === selectedVisitId) ?? null : null;
  const dailyVisits = allVisits
    .filter((visit) => visit.dateKey === dateKey)
    .sort((a, b) => b.startedAt.localeCompare(a.startedAt));

  useDocumentMetadata(
    "Visit reporting mock | Vive Counselling",
    "Development-only interface mock for fictional visit activity and anonymous browser history.",
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [selectedVisitId]);

  function updateDate(nextDate: string) {
    if (!isDateKey(nextDate) || nextDate > todayKey) return;
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

  function openVisitor(visitId: string) {
    const nextParams = new URLSearchParams(searchParams);
    if (dateKey !== todayKey) nextParams.set("date", dateKey);
    nextParams.set("visit", visitId);
    setSearchParams(nextParams);
  }

  function closeVisitor() {
    const nextParams = new URLSearchParams(searchParams);
    if (dateKey !== todayKey) nextParams.set("date", dateKey);
    else nextParams.delete("date");
    nextParams.delete("visit");
    setSearchParams(nextParams);
  }

  return (
    <main className="visit-dashboard">
      <SignalHeader isDetail={Boolean(selectedVisitId)} onHome={closeVisitor} />
      <div className="visit-signal__field">
        {selectedVisitId ? (
          <VisitorHistory
            allVisits={allVisits}
            contextDate={dateKey}
            onBack={closeVisitor}
            visit={selectedVisit}
          />
        ) : (
          <DailyObservatory
            dateKey={dateKey}
            expandedVisitId={expandedVisitId}
            onDateChange={updateDate}
            onOpenVisitor={openVisitor}
            onToggleVisit={toggleVisit}
            todayKey={todayKey}
            visits={dailyVisits}
          />
        )}
      </div>
    </main>
  );
}
