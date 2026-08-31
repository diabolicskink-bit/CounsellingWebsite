import type { ReactNode } from "react";
import {
  Bot,
  Clock3,
  LockKeyhole,
  Radio,
  RefreshCw,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { privateRoutePaths } from "../../data/routes";
import "../../styles-analytics.css";

export type AnalyticsReportStatus = "error" | "loading" | "ready";

export type AnalyticsDetailTitle =
  | "Daily activity"
  | "Enquiry journey"
  | "Excluded visitors"
  | "Keywords"
  | "Monthly enquiries"
  | "Page views"
  | "Visitor history";

type SignalHeaderProps = {
  detailTitle: AnalyticsDetailTitle;
  includeBots: boolean;
  onRefresh: () => void;
  status: AnalyticsReportStatus;
} & (
  | {
      onIncludeBotsChange: (includeBots: boolean) => void;
      showBotControl: true;
    }
  | {
      onIncludeBotsChange?: never;
      showBotControl: false;
    }
);

function SignalHeader({
  detailTitle,
  includeBots,
  onIncludeBotsChange,
  onRefresh,
  showBotControl,
  status,
}: SignalHeaderProps) {
  return (
    <header className="signal-header">
      <div className="signal-header__inner">
        <Link className="signal-header__brand" to={privateRoutePaths.analytics}>
          <span>V</span>
          <strong>Vive</strong>
        </Link>
        <div className="signal-header__title">
          <small>Private analytics</small>
          <strong>{detailTitle}</strong>
        </div>
        <nav aria-label="Analytics views" className="signal-header__views">
          <NavLink end to={privateRoutePaths.analytics}>Daily</NavLink>
          <NavLink to={privateRoutePaths.analyticsPageViews}>Pages</NavLink>
          <NavLink to={privateRoutePaths.analyticsEnquiries}>Enquiries</NavLink>
          <NavLink to={privateRoutePaths.analyticsKeywords}>Keywords</NavLink>
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

export function AnalyticsShell({
  children,
  ...headerProps
}: SignalHeaderProps & { children: ReactNode }) {
  return (
    <main className="visit-dashboard">
      <SignalHeader {...headerProps} />
      <div className="visit-signal__field">{children}</div>
    </main>
  );
}

export function ReportState({
  onRetry,
  status,
}: {
  onRetry: () => void;
  status: "error" | "loading";
}) {
  return (
    <section className="signal-stream__empty signal-report-state" aria-live="polite">
      {status === "loading" ? (
        <span className="signal-report-state__spinner">
          <RefreshCw aria-hidden="true" size={30} />
        </span>
      ) : <Radio aria-hidden="true" size={30} />}
      <h1>{status === "loading" ? "Loading activity" : "Activity could not be loaded"}</h1>
      <p>
        {status === "loading"
          ? "Reading the latest retained visit data."
          : "The protected analytics API did not return a report."}
      </p>
      {status === "error" ? <button onClick={onRetry} type="button">Try again</button> : null}
    </section>
  );
}
