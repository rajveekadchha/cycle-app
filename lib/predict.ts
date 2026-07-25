export function predictNextPeriod(lastPeriodDate: string, cycleLength: number) {
  const last = new Date(lastPeriodDate);
  const next = new Date(last);
  next.setDate(last.getDate() + cycleLength);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  next.setHours(0, 0, 0, 0);

  const daysUntil = Math.round((next.getTime() - today.getTime()) / 86400000);

  return { next, daysUntil };
}
