import { useState } from "react";
import {
  Bot,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  CircleHelp,
  Copy,
  Monitor,
  Route,
  ScanSearch,
  Smartphone,
  Tablet,
} from "lucide-react";
import type { AnalyticsTrafficSource, AnalyticsVisit } from "../../data/analyticsContract";
import type { VisitDeviceType } from "../../data/visitClientEnvironment";
import {
  adNetworkDetail,
  botDetail,
  eventDetail,
  eventLabel,
  formatActiveTime,
  formatTime,
  keywordMatchDetail,
  sourceLabel,
  visitJourney,
  visitorLabel,
} from "./analyticsFormatters";

export const deviceLabels: Record<VisitDeviceType, string> = {
  desktop: "Desktop",
  mobile: "Mobile",
  tablet: "Tablet",
  unknown: "Unknown",
};

export function SourceMark({ source }: { source: AnalyticsTrafficSource }) {
  return (
    <span className={`signal-source signal-source--${source}`}>
      <i aria-hidden="true" />
      {sourceLabel(source)}
    </span>
  );
}

export function BotMark({ visit }: { visit: AnalyticsVisit }) {
  if (!visit.isBot) return null;

  return (
    <span className="signal-bot">
      <Bot aria-hidden="true" size={13} />
      {visit.botName ?? "Unknown bot"}
      {visit.botCategory ? <small>{visit.botCategory}</small> : null}
    </span>
  );
}

export function DeviceIcon({
  deviceType,
  size = 13,
}: {
  deviceType: VisitDeviceType;
  size?: number;
}) {
  if (deviceType === "desktop") return <Monitor aria-hidden="true" size={size} />;
  if (deviceType === "mobile") return <Smartphone aria-hidden="true" size={size} />;
  if (deviceType === "tablet") return <Tablet aria-hidden="true" size={size} />;
  return <CircleHelp aria-hidden="true" size={size} />;
}

export function DeviceMark({ visit }: { visit: AnalyticsVisit }) {
  return (
    <span className={`signal-device signal-device--${visit.deviceType}`}>
      <DeviceIcon deviceType={visit.deviceType} />
      {deviceLabels[visit.deviceType]}
    </span>
  );
}

export function WebDriverMark({ visit }: { visit: AnalyticsVisit }) {
  if (visit.isWebDriver !== true) return null;

  return (
    <span className="signal-webdriver">
      <ScanSearch aria-hidden="true" size={13} />
      WebDriver
    </span>
  );
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
    <ol>
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

const gclidCopyLabels = {
  copied: "GCLID copied",
  error: "Try copying again",
  idle: "Copy GCLID",
} as const;

type GclidCopyState = keyof typeof gclidCopyLabels;

function VisitRequestDetails({ visit }: { visit: AnalyticsVisit }) {
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
          <strong>Request details</strong>
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
      </div>
    </details>
  );
}

function visitJourneyCount(visit: AnalyticsVisit) {
  const count = visit.pageViews.length + visit.events.length;
  return `${count} ${count === 1 ? "moment" : "moments"} in order`;
}

export type VisitDetailPanelProps = {
  detailId: string;
  headingLevel: "h3" | "h4";
  onOpenVisitor?: (visit: AnalyticsVisit) => void;
  selectedEventId?: string | null;
  visit: AnalyticsVisit;
};

export function VisitDetailPanel({
  detailId,
  headingLevel,
  onOpenVisitor,
  selectedEventId,
  visit,
}: VisitDetailPanelProps) {
  const Heading = headingLevel;

  return (
    <div className="signal-event-detail" id={detailId}>
      <div className="signal-event-detail__main">
        <section className="signal-event-detail__journey" aria-labelledby={`${detailId}-journey`}>
          <header>
            <Heading id={`${detailId}-journey`}>Timeline</Heading>
            <span><Route aria-hidden="true" size={15} /> {visitJourneyCount(visit)}</span>
          </header>
          <JourneyTimeline selectedEventId={selectedEventId} visit={visit} />
        </section>

        <aside
          aria-labelledby={`${detailId}-attribution`}
          className="signal-event-detail__attribution"
        >
          <header>
            <Heading id={`${detailId}-attribution`}>Attribution</Heading>
          </header>
          <dl>
            <div><dt>Referrer</dt><dd>{visit.referrerUrl ?? "None recorded"}</dd></div>
            <div><dt>Ad / network</dt><dd>{adNetworkDetail(visit)}</dd></div>
            <div><dt>Keyword / match</dt><dd>{keywordMatchDetail(visit)}</dd></div>
            {visit.isBot ? <div><dt>Bot classification</dt><dd>{botDetail(visit)}</dd></div> : null}
          </dl>
        </aside>
      </div>

      <footer className="signal-event-detail__utilities">
        <VisitRequestDetails visit={visit} />
        {onOpenVisitor ? (
          <button
            aria-label={`View all visits from ${visitorLabel(visit.visitorId)}`}
            className="signal-event-detail__visitor-action"
            onClick={() => onOpenVisitor(visit)}
            type="button"
          >
            Visitor history
            <ChevronRight aria-hidden="true" size={17} />
          </button>
        ) : null}
      </footer>
    </div>
  );
}
