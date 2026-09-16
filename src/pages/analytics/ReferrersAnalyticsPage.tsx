import type { CSSProperties } from "react";
import { useState } from "react";
import {
  ArrowLeft,
  Radio,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import {
  getPerthDateKey,
  isAnalyticsDateKey,
  type ReferrersAnalyticsReport,
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

function ReferrersReport({
  includeBots,
  onRangeChange,
  report,
  todayKey,
}: {
  includeBots: boolean;
  onRangeChange: (startDate: string, endDate: string) => void;
  report: ReferrersAnalyticsReport;
  todayKey: string;
}) {
  const referrerPeak = Math.max(...report.referrers.map((referrer) => referrer.visits), 1);
  const externalReferrerGroupCount = report.referrers.filter(
    ({ referrer }) => referrer !== "Internal" && referrer !== "No referrer recorded",
  ).length;
  const dailyParams = new URLSearchParams();
  if (report.endDate !== todayKey) dailyParams.set("date", report.endDate);
  if (includeBots) dailyParams.set("bots", "include");
  const dailyQuery = dailyParams.toString();
  const dailyPath = `${privateRoutePaths.analytics}${dailyQuery ? `?${dailyQuery}` : ""}`;

  return (
    <>
      <section
        className="signal-report__overview signal-report__overview--range"
        aria-labelledby="referrer-report-title"
      >
        <div className="signal-report__intro">
          <Link className="page-view-report__back" to={dailyPath}>
            <ArrowLeft aria-hidden="true" size={16} /> Back to daily
          </Link>
          <p className="signal-kicker">Arrival breakdown</p>
          <h1 id="referrer-report-title">Referrers</h1>
          <p>
            {report.startDate === report.endDate
              ? formatDate(report.startDate)
              : `${formatDate(report.startDate, true)} to ${formatDate(report.endDate, true)}`}
          </p>
        </div>

        <ReportDateRangeForm
          endDate={report.endDate}
          onRangeChange={onRangeChange}
          showQuickRanges
          startDate={report.startDate}
          todayKey={todayKey}
        />
      </section>

      <section
        className="signal-report__summary page-view-report__summary"
        aria-label="Referrer totals"
      >
        <div><span>Visits</span><strong>{report.totalVisits}</strong></div>
        <div><span>Page views</span><strong>{report.totalPageViews}</strong></div>
        <div><span>Enquiry visits</span><strong>{report.totalEnquiryVisits}</strong></div>
        <div><span>External referrer groups</span><strong>{externalReferrerGroupCount}</strong></div>
      </section>

      <section className="signal-report__section" aria-labelledby="referrer-rows-title">
        <header className="signal-report__section-header">
          <div>
            <p className="signal-kicker">Most visits first</p>
            <h2 id="referrer-rows-title">All referrers</h2>
          </div>
          <span>{report.referrers.length} {report.referrers.length === 1 ? "group" : "groups"}</span>
        </header>

        {report.referrers.length ? (
          <div
            aria-label="Referrers. Scroll horizontally to see every column."
            className="signal-report__table-wrap"
            role="region"
            tabIndex={0}
          >
            <table className="signal-report__table page-view-report__table referrer-report__table">
              <caption className="signal-visually-hidden">
                Referrers ranked by visits, with visit share, average views per visit, average active time per visit and enquiry visits
              </caption>
              <thead>
                <tr>
                  <th aria-label="Rank" scope="col">#</th>
                  <th scope="col">Referrer</th>
                  <th scope="col">Visit share</th>
                  <th scope="col">Visits</th>
                  <th scope="col">Avg views per visit</th>
                  <th scope="col">Avg active per visit</th>
                  <th scope="col">Enquiry visits</th>
                </tr>
              </thead>
              <tbody>
                {report.referrers.map((referrer, index) => {
                  const share = report.totalVisits
                    ? Math.round((referrer.visits / report.totalVisits) * 100)
                    : 0;
                  const barStyle = {
                    "--page-view-route-width": `${(referrer.visits / referrerPeak) * 100}%`,
                  } as CSSProperties;

                  return (
                    <tr key={referrer.referrer}>
                      <td className="page-view-report__rank">
                        {String(index + 1).padStart(2, "0")}
                      </td>
                      <th className="page-view-report__route" scope="row">
                        <strong>{referrer.referrer}</strong>
                        <i aria-hidden="true"><b style={barStyle} /></i>
                      </th>
                      <td className="page-view-report__share">{share}%</td>
                      <td className="page-view-report__metric">{referrer.visits}</td>
                      <td className="page-view-report__metric">
                        {(referrer.pageViews / referrer.visits).toFixed(1)}
                      </td>
                      <td className="page-view-report__metric">
                        {referrer.activeSeconds
                          ? formatActiveTime(Math.round(referrer.activeSeconds / referrer.visits))
                          : "\u2014"}
                      </td>
                      <td className="page-view-report__metric">{referrer.enquiryVisits}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="signal-stream__empty">
            <Radio aria-hidden="true" size={30} />
            <h3>No visits recorded</h3>
            <p>No included visits began in this date range.</p>
          </div>
        )}
      </section>

      <p className="signal-footnote">
        Dates use Perth time. Enquiry visits contain a sent form or phone-link click. {includeBots
          ? "Bots included."
          : "Identified bots excluded."}
      </p>
    </>
  );
}

export default function ReferrersAnalyticsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [todayKey, setTodayKey] = useState(getPerthDateKey);
  const includeBots = searchParams.get("bots") === "include";
  const { endDate, startDate } = getSelectedRange(searchParams, todayKey);
  const requestParams = new URLSearchParams({ end: endDate, report: "referrers", start: startDate });
  if (includeBots) requestParams.set("bots", "include");
  const { report, retry, status } = useAnalyticsReport(
    `/api/analytics?${requestParams.toString()}`,
    "referrers",
  );

  useDocumentMetadata(
    "Referrers | Vive Analytics",
    "Private referrer reporting for Vive Counselling analytics.",
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
      detailTitle="Referrers"
      includeBots={includeBots}
      onIncludeBotsChange={updateIncludeBots}
      onRefresh={refreshReport}
      showBotControl
      status={status}
    >
      {status !== "ready" ? <ReportState onRetry={refreshReport} status={status} /> : null}
      {status === "ready" && report ? (
        <ReferrersReport
          includeBots={includeBots}
          onRangeChange={updateRange}
          report={report}
          todayKey={todayKey}
        />
      ) : null}
    </AnalyticsShell>
  );
}
