import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
} from "lucide-react";
import { isAnalyticsDateKey } from "../../contracts/analyticsContract";
import { parseDateKey, shiftDateKey, shiftMonthKey } from "./analyticsFormatters";

const millisecondsPerDay = 86_400_000;
const quickRanges = [
  { label: "Last 3 days", days: 3 },
  { label: "Last week", days: 7 },
  { label: "Last month", days: 30 },
  { label: "Last 3 months", days: 90 },
];

export function DateControls({
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
      <button
        aria-label="Previous day"
        onClick={() => onDateChange(shiftDateKey(dateKey, -1))}
        type="button"
      >
        <ArrowLeft aria-hidden="true" size={17} />
      </button>
      <label>
        <CalendarDays aria-hidden="true" size={15} />
        <span className="signal-visually-hidden">Report date</span>
        <input
          max={todayKey}
          onChange={(event) => onDateChange(event.target.value)}
          type="date"
          value={dateKey}
        />
      </label>
      <button
        aria-label="Next day"
        disabled={isToday}
        onClick={() => onDateChange(shiftDateKey(dateKey, 1))}
        type="button"
      >
        <ArrowRight aria-hidden="true" size={17} />
      </button>
      <button
        className="signal-date-controls__today"
        disabled={isToday}
        onClick={() => onDateChange(todayKey)}
        type="button"
      >
        Today
      </button>
    </div>
  );
}

export function MonthControls({
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
      <button
        aria-label="Previous month"
        onClick={() => onMonthChange(shiftMonthKey(monthKey, -1))}
        type="button"
      >
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

export function ReportDateRangeForm({
  endDate,
  onRangeChange,
  showQuickRanges = false,
  startDate,
  todayKey,
}: {
  endDate: string;
  onRangeChange: (startDate: string, endDate: string) => void;
  showQuickRanges?: boolean;
  startDate: string;
  todayKey: string;
}) {
  const [draftStartDate, setDraftStartDate] = useState(startDate);
  const [draftEndDate, setDraftEndDate] = useState(endDate);
  const hasDateKeys = isAnalyticsDateKey(draftStartDate) && isAnalyticsDateKey(draftEndDate);
  const rangeLength = hasDateKeys
    ? Math.round(
        (parseDateKey(draftEndDate).getTime() - parseDateKey(draftStartDate).getTime())
          / millisecondsPerDay,
      )
    : -1;
  const isRangeValid = hasDateKeys
    && rangeLength >= 0
    && rangeLength < 366
    && draftEndDate <= todayKey;

  useEffect(() => {
    setDraftStartDate(startDate);
    setDraftEndDate(endDate);
  }, [endDate, startDate]);

  return (
    <form
      className="page-view-report__range"
      onSubmit={(event) => {
        event.preventDefault();
        if (isRangeValid) onRangeChange(draftStartDate, draftEndDate);
      }}
    >
      {showQuickRanges ? (
        <div className="report-quick-ranges" role="group" aria-label="Quick date ranges">
          {quickRanges.map(({ label, days }) => {
            const rangeStart = shiftDateKey(todayKey, 1 - days);
            return (
              <button
                aria-pressed={startDate === rangeStart && endDate === todayKey
                  && draftStartDate === startDate && draftEndDate === endDate}
                key={days}
                onClick={() => {
                  setDraftStartDate(rangeStart);
                  setDraftEndDate(todayKey);
                  onRangeChange(rangeStart, todayKey);
                }}
                title={`${days} days including today`}
                type="button"
              >
                {label}
              </button>
            );
          })}
        </div>
      ) : null}
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
  );
}
