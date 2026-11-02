import { ActivityLog, DayProgress } from '../types';

export function formatMinutes(mins: number): string {
  if (mins <= 0) return '0 min';
  const hours = Math.floor(mins / 60);
  const remainingMins = Math.round(mins % 60);

  if (hours === 0) {
    return `${remainingMins} min`;
  }
  if (remainingMins === 0) {
    return `${hours} hr${hours > 1 ? 's' : ''}`;
  }
  return `${hours} hr ${remainingMins} min`;
}

export function formatMinutesShort(mins: number): string {
  if (mins <= 0) return '0m';
  const hours = Math.floor(mins / 60);
  const remainingMins = Math.round(mins % 60);

  if (hours === 0) return `${remainingMins}m`;
  if (remainingMins === 0) return `${hours}h`;
  return `${hours}h ${remainingMins}m`;
}

export function getTodayDateString(): string {
  return '2026-10-12';
}

export function getTodayActivities(activities: ActivityLog[]): ActivityLog[] {
  const today = getTodayDateString();
  return activities.filter(act => act.timestamp.startsWith(today));
}

export function getTodaySavedMinutes(activities: ActivityLog[]): number {
  const todayActs = getTodayActivities(activities);
  return todayActs.reduce((acc, curr) => acc + curr.durationMinutes, 0);
}

export interface WeeklyComparison {
  thisWeekSavedMins: number;
  lastWeekSavedMins: number;
  thisWeekScreenMins: number;
  lastWeekScreenMins: number;
  screenTimeDiffMins: number; // negative means reduced screen time (great!)
  savedDiffMins: number; // positive means saved more (great!)
  screenTimePercentChange: number;
  dailyAverageSavedThisWeek: number;
  dailyAverageSavedLastWeek: number;
}

export function calculateWeeklyComparison(history: DayProgress[]): WeeklyComparison {
  // Last week: Oct 05 to Oct 11 (7 days)
  // This week: Oct 12 onwards
  const lastWeekDates = [
    '2026-10-05', '2026-10-06', '2026-10-07', '2026-10-08',
    '2026-10-09', '2026-10-10', '2026-10-11'
  ];
  
  const lastWeekDays = history.filter(d => lastWeekDates.includes(d.date));
  const thisWeekDays = history.filter(d => !lastWeekDates.includes(d.date));

  const lastWeekSavedMins = lastWeekDays.reduce((sum, d) => sum + (d.screenTimeSavedMinutes || 0), 0);
  const lastWeekScreenMins = lastWeekDays.reduce((sum, d) => sum + (d.screenTimeMinutes || 0), 0);

  const thisWeekSavedMins = thisWeekDays.reduce((sum, d) => sum + (d.screenTimeSavedMinutes || 0), 0);
  const thisWeekScreenMins = thisWeekDays.reduce((sum, d) => sum + (d.screenTimeMinutes || 0), 0);

  // Compare on average daily basis since this week is in progress
  const thisWeekCount = Math.max(thisWeekDays.length, 1);
  const lastWeekCount = Math.max(lastWeekDays.length, 1);

  const dailyAverageSavedThisWeek = Math.round(thisWeekSavedMins / thisWeekCount);
  const dailyAverageSavedLastWeek = Math.round(lastWeekSavedMins / lastWeekCount);

  const avgScreenThisWeek = Math.round(thisWeekScreenMins / thisWeekCount);
  const avgScreenLastWeek = Math.round(lastWeekScreenMins / lastWeekCount);

  const screenTimeDiffMins = avgScreenThisWeek - avgScreenLastWeek;
  const savedDiffMins = thisWeekSavedMins - lastWeekSavedMins;

  const screenTimePercentChange = avgScreenLastWeek > 0 
    ? Math.round(((avgScreenThisWeek - avgScreenLastWeek) / avgScreenLastWeek) * 100)
    : 0;

  return {
    thisWeekSavedMins,
    lastWeekSavedMins,
    thisWeekScreenMins,
    lastWeekScreenMins,
    screenTimeDiffMins,
    savedDiffMins,
    screenTimePercentChange,
    dailyAverageSavedThisWeek,
    dailyAverageSavedLastWeek
  };
}

export function getMotivationalMessage(totalSavedMins: number, todaySavedMins: number): string {
  const hours = totalSavedMins / 60;
  
  if (hours >= 10) {
    return `Incredible! You reclaimed ${formatMinutes(totalSavedMins)} of life. That's enough to read 2 complete novels or conquer 10 fitness sessions!`;
  }
  if (hours >= 5) {
    return `You saved ${formatMinutes(totalSavedMins)} this week. That's enough time for 5 workouts or reading 150 book pages!`;
  }
  if (todaySavedMins >= 60) {
    return `You saved ${formatMinutes(todaySavedMins)} today! That's enough time for an energizing gym session or catching up with a friend in person.`;
  }
  if (todaySavedMins > 0) {
    return `Great momentum! ${formatMinutes(todaySavedMins)} reclaimed from mindless scrolling and invested into real life.`;
  }
  return 'Every 30 minutes cut from screens is 30 minutes of real offline life reclaimed.';
}

export interface ImpactEquivalents {
  bookPages: number;
  workoutsPossible: number;
  walkSteps: number;
  cupsOfTeaWithFriends: number;
  booksFinished: number;
  kilometersJogged: number;
}

export function calculateEquivalents(savedMinutes: number): ImpactEquivalents {
  return {
    bookPages: Math.round(savedMinutes * 0.7), // ~0.7 pages per min for focused reading
    workoutsPossible: Math.floor(savedMinutes / 45), // 45 min per gym session
    walkSteps: Math.round(savedMinutes * 100), // ~100 steps per min brisk walk
    cupsOfTeaWithFriends: Math.floor(savedMinutes / 30),
    booksFinished: Number((savedMinutes / (60 * 5.5)).toFixed(1)), // ~5.5 hrs to read average book
    kilometersJogged: Number((savedMinutes * 0.12).toFixed(1)) // ~6 min per km jog
  };
}
