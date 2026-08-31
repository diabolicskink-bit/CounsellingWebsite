import type { CSSProperties } from "react";
import { useState } from "react";
import { ArrowLeft, Radio } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import {
  getPerthDateKey,
  isAnalyticsDateKey,
  type PageViewsAnalyticsReport,
} from "../../data/analyticsContract";
import { privateRoutePaths } from "../../data/routes";
import useDocumentMetadata from "../../hooks/useDocumentMetadata";
import { ReportDateRangeForm } from "./AnalyticsControls";
import { AnalyticsShell, ReportState } from "./AnalyticsShell";
import {
  formatActiveTime,
  formatDate,
  parseDateKey,
} from "./analyticsFormatters";
import useAnalyticsReport from "./useAnalyticsReport";

const millisecondsPerDay = 86_400_000;

function getSelectedRange(searchParams: URLSearchParams, todayKey: string) {
  const requestedStartDate = searchParams.get("start");
  const requestedEndDate = searchParams.get("end");
  const requestedRangeLength = isAnalyticsDateKey(requestedStartDate)
    && isAnalyticsDateKey(requestedEndDate)
    ? Math.round(
        (parseDateKey(requestedEndDate).getTime() - parseDateKey(requestedStartDate).getTime())
          / millisecondsPerDay,
      )
    : -1;
  const hasValidRange = requestedRangeLength >= 0
    && requestedRangeLength < 366
    && requestedEndDate !== null
    && requestedEndDate <= todayKey;

  return {
    endDate: hasValidRange && requestedEndDate ? requestedEndDate : todayKey,
    startDate: hasValidRange && requestedStartDate ? requestedStartDate : todayKey,
  };
}

function PageViewsReport({
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
  const routePeak = Math.max(...report.routes.map((route) => route.pageViews), 1);
  const averagePages = report.totalVisits
    ? (report.totalPageViews / report.totalVisits).toFixed(1)
    : "0.0";
  const dailyParams = new URLSearchParams();
  if (report.endDate !== todayKey) dailyParams.set("date", report.endDate);
  if (includeBots) dailyParams.set("bots", "include");
  const dailyQuery = dailyParams.toString();
  const dailyPath = `${privateRoutePaths.analytics}${dailyQuery ? `?${dailyQuery}` : ""}`;

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

        <ReportDateRangeForm
          endDate={report.endDate}
          onRangeChange={onRangeChange}
          startDate={report.startDate}
          todayKey={todayKey}
        />
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
          <div
            aria-label="Page-view routes. Scroll horizontally to see every column."
            className="page-view-report__table-wrap"
            role="region"
            tabIndex={0}
          >
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
                      <td className="page-view-report__rank">
                        {String(index + 1).padStart(2, "0")}
                      </td>
                      <th className="page-view-report__route" scope="row">
                        <strong>{route.path}</strong>
                        <i aria-hidden="true"><b style={barStyle} /></i>
                      </th>
                      <td className="page-view-report__share">{share}%</td>
                      <td className="page-view-report__metric">{route.pageViews}</td>
                      <td className="page-view-report__metric">{route.visits}</td>
                      <td className="page-view-report__metric">
                        {route.activeSeconds
                          ? formatActiveTime(Math.round(route.activeSeconds / route.pageViews))
                          : "\u2014"}
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
        Totals use visits that began in the selected Australia/Perth date range. Active time counts
        seconds while a page is visible. {includeBots
          ? "Bot visits are included."
          : "Identified bot visits are excluded."}
      </p>
    </>
  );
}

export default function PageViewsAnalyticsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [todayKey, setTodayKey] = useState(getPerthDateKey);
  const includeBots = searchParams.get("bots") === "include";
  const { endDate, startDate } = getSelectedRange(searchParams, todayKey);
  const requestParams = new URLSearchParams({ end: endDate, start: startDate });
  if (includeBots) requestParams.set("bots", "include");
  const { report, retry, status } = useAnalyticsReport(
    `/api/analytics?${requestParams.toString()}`,
    "pageViews",
  );

  useDocumentMetadata(
    "Page Views | Vive Analytics",
    "Private page-view breakdown for Vive Counselling analytics.",
  );

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

  function updateRange(nextStartDate: string, nextEndDate: string) {
    if (!isAnalyticsDateKey(nextStartDate) || !isAnalyticsDateKey(nextEndDate)) return;
    const rangeLength = Math.round(
      (parseDateKey(nextEndDate).getTime() - parseDateKey(nextStartDate).getTime())
        / millisecondsPerDay,
    );
    if (rangeLength < 0 || rangeLength >= 366 || nextEndDate > todayKey) return;

    const nextParams = new URLSearchParams({ end: nextEndDate, start: nextStartDate });
    if (includeBots) nextParams.set("bots", "include");
    setSearchParams(nextParams);
  }

  return (
    <AnalyticsShell
      detailTitle="Page views"
      includeBots={includeBots}
      onIncludeBotsChange={updateIncludeBots}
      onRefresh={refreshReport}
      showBotControl
      status={status}
    >
      {status !== "ready" ? <ReportState onRetry={refreshReport} status={status} /> : null}
      {status === "ready" && report ? (
        <PageViewsReport
          includeBots={includeBots}
          onRangeChange={updateRange}
          report={report}
          todayKey={todayKey}
        />
      ) : null}
    </AnalyticsShell>
  );
}
