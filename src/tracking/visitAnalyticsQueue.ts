let recordQueue: Promise<void> = Promise.resolve();

export function enqueueVisitAnalyticsRecord(record: () => Promise<void>) {
  recordQueue = recordQueue
    .catch(() => undefined)
    .then(record)
    .catch(() => undefined);

  return recordQueue;
}
