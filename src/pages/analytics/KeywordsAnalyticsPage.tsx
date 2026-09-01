import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Search,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import {
  getPerthDateKey,
  isAnalyticsDateKey,
  type KeywordAnalyticsReport,
  type KeywordAnalyticsSummary,
} from "../../data/analyticsContract";
import useDocumentMetadata from "../../hooks/useDocumentMetadata";
import { ReportDateRangeForm } from "./AnalyticsControls";
import { AnalyticsShell, ReportState } from "./AnalyticsShell";
import {
  formatActiveTime,
  formatDate,
  formatLongActiveTime,
  matchTypeLabel,
  parseDateKey,
  shiftDateKey,
} from "./analyticsFormatters";
import useAnalyticsReport from "./useAnalyticsReport";

type KeywordSortKey = "activeTime" | "enquiries" | "latest" | "pageDepth" | "visits";

type KeywordSortState = {
  direction: "ascending" | "descending";
  key: KeywordSortKey;
};

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
    startDate: hasValidRange && requestedStartDate
      ? requestedStartDate
      : shiftDateKey(todayKey, -29),
  };
}

function KeywordReport({
  includeBots,
  onRangeChange,
  report,
  todayKey,
}: {
  includeBots: boolean;
  onRangeChange: (startDate: string, endDate: string) => void;
  report: KeywordAnalyticsReport;
  todayKey: string;
}) {
  const [sort, setSort] = useState<KeywordSortState>({
    direction: "descending",
    key: "enquiries",
  });
  const attributionCoverage = report.totalPaidVisits
    ? Math.round((report.taggedVisits / report.totalPaidVisits) * 100)
    : 0;
  const pagesPerVisit = report.totalPaidVisits
    ? (report.totalPageViews / report.totalPaidVisits).toFixed(1)
    : "0.0";
  const activeTimePerVisit = report.totalPaidVisits
    ? Math.round(report.totalActiveSeconds / report.totalPaidVisits)
    : 0;
  const untaggedVisits = report.totalPaidVisits - report.taggedVisits;
  const sortedKeywords = useMemo(() => {
    const sortValue = (keyword: KeywordAnalyticsSummary) => {
      switch (sort.key) {
        case "activeTime":
          return keyword.visits ? keyword.activeSeconds / keyword.visits : 0;
        case "enquiries":
          return keyword.enquiryVisits;
        case "latest":
          return Date.parse(keyword.latestVisitAt);
        case "pageDepth":
          return keyword.visits ? keyword.pageViews / keyword.visits : 0;
        case "visits":
          return keyword.visits;
      }
    };
    const multiplier = sort.direction === "ascending" ? 1 : -1;

    return report.keywords
      .map((keyword, originalIndex) => ({ keyword, originalIndex }))
      .sort((left, right) => {
        const difference = sortValue(left.keyword) - sortValue(right.keyword);
        return difference ? difference * multiplier : left.originalIndex - right.originalIndex;
      })
      .map(({ keyword }) => keyword);
  }, [report.keywords, sort]);

  const changeSort = (key: KeywordSortKey) => {
    setSort((current) => ({
      direction: current.key === key && current.direction === "descending"
        ? "ascending"
        : "descending",
      key,
    }));
  };

  const sortableHeader = (key: KeywordSortKey, label: string) => {
    const isActive = sort.key === key;
    const SortIcon = !isActive
      ? ArrowUpDown
      : sort.direction === "ascending"
        ? ArrowUp
        : ArrowDown;

    return (
      <th aria-sort={isActive ? sort.direction : undefined} scope="col">
        <button
          className="keyword-report__sort"
          onClick={() => changeSort(key)}
          type="button"
        >
          <span>{label}</span>
          <SortIcon aria-hidden="true" size={13} strokeWidth={2} />
        </button>
      </th>
    );
  };

  return (
    <>
      <section
        className="signal-report__overview signal-report__overview--range"
        aria-labelledby="keyword-report-title"
      >
        <div className="signal-report__intro">
          <h1 id="keyword-report-title">Keywords</h1>
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

      <dl className="keyword-report__summary" aria-label="Paid keyword overview">
        <div className="keyword-report__coverage">
          <dt>Matched keyword coverage</dt>
          <dd>
            <strong>{attributionCoverage}%</strong>
            <progress aria-label="Matched keyword coverage" max="100" value={attributionCoverage}>
              {attributionCoverage}%
            </progress>
            <small>
              {report.taggedVisits} of {report.totalPaidVisits} paid visits had matched keyword data
              {untaggedVisits ? `; ${untaggedVisits} had none.` : "."}
            </small>
          </dd>
        </div>
        <div>
          <dt>Paid visits</dt>
          <dd><strong>{report.totalPaidVisits}</strong></dd>
        </div>
        <div>
          <dt>Page views</dt>
          <dd><strong>{report.totalPageViews}</strong><small>{pagesPerVisit} per visit</small></dd>
        </div>
        <div>
          <dt>Recorded active time</dt>
          <dd>
            <strong>{formatLongActiveTime(report.totalActiveSeconds)}</strong>
            <small>
              {activeTimePerVisit
                ? `${formatActiveTime(activeTimePerVisit)} per visit`
                : "No active time"}
            </small>
          </dd>
        </div>
        <div>
          <dt>Enquiry visits</dt>
          <dd>
            <strong>{report.totalEnquiryVisits}</strong>
            <small>{report.taggedEnquiryVisits} with matched keyword data</small>
          </dd>
        </div>
      </dl>

      <section className="signal-report__section" aria-label="Matched keywords">
        <header className="signal-report__section-header">
          <span>
            {report.keywords.length} matched {report.keywords.length === 1 ? "keyword" : "keywords"}
          </span>
        </header>

        {report.keywords.length ? (
          <div
            aria-label="Keyword ledger. Scroll horizontally to see every column."
            className="signal-report__table-wrap"
            role="region"
            tabIndex={0}
          >
            <table className="signal-report__table keyword-report__table">
              <caption className="signal-visually-hidden">
                Google Ads matched keywords with visits, page depth, active time, enquiries and latest visit
              </caption>
              <thead>
                <tr>
                  <th scope="col">Keyword</th>
                  {sortableHeader("visits", "Visits")}
                  {sortableHeader("pageDepth", "Page depth")}
                  {sortableHeader("activeTime", "Active / visit")}
                  {sortableHeader("enquiries", "Enquiries")}
                  {sortableHeader("latest", "Latest")}
                </tr>
              </thead>
              <tbody>
                {sortedKeywords.map((keyword) => {
                  const pagesPerKeywordVisit = keyword.visits
                    ? (keyword.pageViews / keyword.visits).toFixed(1)
                    : "0.0";
                  const averageActiveTime = keyword.visits
                    ? Math.round(keyword.activeSeconds / keyword.visits)
                    : 0;
                  const enquiryRate = keyword.visits
                    ? Math.round((keyword.enquiryVisits / keyword.visits) * 100)
                    : 0;

                  return (
                    <tr key={keyword.keyword}>
                      <th className="keyword-report__term" scope="row">
                        <strong>{keyword.keyword}</strong>
                        <span>
                          {keyword.matchTypes.length
                            ? keyword.matchTypes.map((type) => matchTypeLabel(type)).join(" \u00b7 ")
                            : "Match unavailable"}
                        </span>
                      </th>
                      <td className="keyword-report__number">
                        <strong>{keyword.visits}</strong>
                        <small>{keyword.returningVisits} returning</small>
                      </td>
                      <td className="keyword-report__number">
                        <strong>{pagesPerKeywordVisit}</strong>
                        <small>{keyword.pageViews} views</small>
                      </td>
                      <td className="keyword-report__number">
                        <strong>
                          {averageActiveTime ? formatActiveTime(averageActiveTime) : "\u2014"}
                        </strong>
                        <small>{formatLongActiveTime(keyword.activeSeconds)} total</small>
                      </td>
                      <td className="keyword-report__number keyword-report__number--enquiries">
                        <strong>{keyword.enquiryVisits}</strong>
                        <small>{enquiryRate}% of visits</small>
                      </td>
                      <td className="keyword-report__latest">
                        {formatDate(getPerthDateKey(new Date(keyword.latestVisitAt)), true)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="signal-stream__empty">
            <Search aria-hidden="true" size={30} />
            <h3>No matched keywords</h3>
            <p>
              {report.totalPaidVisits
                ? `There ${report.totalPaidVisits === 1 ? "was" : "were"} ${report.totalPaidVisits} paid ${report.totalPaidVisits === 1 ? "visit" : "visits"}, but none carried a keyword tag.`
                : "No paid visits began in this date range."}
            </p>
          </div>
        )}
      </section>

      <p className="signal-footnote keyword-report__footnote">
        Google Ads matched keywords are not visitors' search queries. A visit is counted once per
        matched keyword. Page depth and active time include the complete visit, not only its landing
        page. Enquiries count visits containing at least one successful send. {includeBots
          ? "Bot visits are included."
          : "Identified bot visits are excluded."}
      </p>
    </>
  );
}

export default function KeywordsAnalyticsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [todayKey, setTodayKey] = useState(getPerthDateKey);
  const includeBots = searchParams.get("bots") === "include";
  const { endDate, startDate } = getSelectedRange(searchParams, todayKey);
  const requestParams = new URLSearchParams({
    end: endDate,
    report: "keywords",
    start: startDate,
  });
  if (includeBots) requestParams.set("bots", "include");
  const { report, retry, status } = useAnalyticsReport(
    `/api/analytics?${requestParams.toString()}`,
    "keywords",
  );

  useDocumentMetadata(
    "Keywords | Vive Analytics",
    "Private paid keyword analytics for Vive Counselling.",
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
      detailTitle="Keywords"
      includeBots={includeBots}
      onIncludeBotsChange={updateIncludeBots}
      onRefresh={refreshReport}
      showBotControl
      status={status}
    >
      {status !== "ready" ? <ReportState onRetry={refreshReport} status={status} /> : null}
      {status === "ready" && report ? (
        <KeywordReport
          includeBots={includeBots}
          onRangeChange={updateRange}
          report={report}
          todayKey={todayKey}
        />
      ) : null}
    </AnalyticsShell>
  );
}
