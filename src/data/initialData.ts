import { ActivityLog, DayProgress, UserPreferences } from '../types';

export const INITIAL_PREFERENCES: UserPreferences = {
  dailyGoalMinutes: 60, // 1 hour daily reduction goal
  baselineScreenTimeMinutes: 270, // 4.5 hours baseline screen time
  soundEnabled: true,
  ambientSound: 'none',
  streakCount: 6,
  lastActiveDate: '2026-10-12'
};

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    title: 'Bench Press & Dumbbell Workout',
    category: 'fitness',
    durationMinutes: 45,
    timestamp: '2026-10-12T17:30:00.000Z',
    notes: 'Upper body hypertrophy session instead of sitting on YouTube shorts. Felt energized and pumped!',
    feeling: 'energized',
    swappedFromApp: 'YouTube'
  },
  {
    id: 'act-2',
    title: 'Reading a book in Arm Chair',
    category: 'reading',
    durationMinutes: 35,
    timestamp: '2026-10-12T20:00:00.000Z',
    notes: '35 quiet minutes with a warm mug of chamomile. Finished 22 pages without checking notifications.',
    feeling: 'calm',
    swappedFromApp: 'Instagram'
  },
  {
    id: 'act-3',
    title: 'Evening Coffee and Walk with Family / Friends',
    category: 'social',
    durationMinutes: 60,
    timestamp: '2026-10-11T16:00:00.000Z',
    notes: 'Talked about life goals and laughed together. Put phones completely away.',
    feeling: 'connected',
    swappedFromApp: 'TikTok'
  },
  {
    id: 'act-4',
    title: '5km Sunset Jog Around Lake',
    category: 'nature',
    durationMinutes: 30,
    timestamp: '2026-10-11T10:15:00.000Z',
    notes: 'Crisp autumn breeze, yellow maple leaves. Breathing was smooth.',
    feeling: 'energized',
    swappedFromApp: 'Twitter/X'
  },
  {
    id: 'act-5',
    title: 'Badminton Rally with Friends',
    category: 'sports',
    durationMinutes: 45,
    timestamp: '2026-10-10T15:30:00.000Z',
    notes: 'Played 3 fast sets. Sweating and laughing so hard.',
    feeling: 'accomplished',
    swappedFromApp: 'Reddit'
  },
  {
    id: 'act-6',
    title: 'Practice of a Musical Instrument',
    category: 'hobbies',
    durationMinutes: 40,
    timestamp: '2026-10-10T19:00:00.000Z',
    notes: 'Practiced acoustic fingerpicking patterns and rhythm until muscle memory took over.',
    feeling: 'inspired',
    swappedFromApp: 'YouTube'
  },
  {
    id: 'act-7',
    title: 'Cooking Homemade Food',
    category: 'hobbies',
    durationMinutes: 50,
    timestamp: '2026-10-09T18:45:00.000Z',
    notes: 'Prepared fresh wholesome dinner from scratch with fresh herbs and spices.',
    feeling: 'calm',
    swappedFromApp: 'Instagram'
  },
  {
    id: 'act-8',
    title: 'learning a new Language',
    category: 'learning',
    durationMinutes: 45,
    timestamp: '2026-10-08T20:15:00.000Z',
    notes: 'Studied vocabulary flashcards and grammar exercises with pen and paper.',
    feeling: 'accomplished',
    swappedFromApp: 'Shorts'
  }
];

export const INITIAL_DAY_HISTORY: DayProgress[] = [
  // Last week
  { date: '2026-10-05', screenTimeMinutes: 210, screenTimeSavedMinutes: 60, offlineTimeReusedMinutes: 60, goalMet: true },
  { date: '2026-10-06', screenTimeMinutes: 230, screenTimeSavedMinutes: 45, offlineTimeReusedMinutes: 45, goalMet: false },
  { date: '2026-10-07', screenTimeMinutes: 190, screenTimeSavedMinutes: 80, offlineTimeReusedMinutes: 80, goalMet: true },
  { date: '2026-10-08', screenTimeMinutes: 200, screenTimeSavedMinutes: 70, offlineTimeReusedMinutes: 70, goalMet: true },
  { date: '2026-10-09', screenTimeMinutes: 180, screenTimeSavedMinutes: 90, offlineTimeReusedMinutes: 90, goalMet: true },
  { date: '2026-10-10', screenTimeMinutes: 170, screenTimeSavedMinutes: 100, offlineTimeReusedMinutes: 85, goalMet: true },
  { date: '2026-10-11', screenTimeMinutes: 160, screenTimeSavedMinutes: 115, offlineTimeReusedMinutes: 90, goalMet: true },
  // This week (starts Oct 12)
  { date: '2026-10-12', screenTimeMinutes: 140, screenTimeSavedMinutes: 80, offlineTimeReusedMinutes: 80, goalMet: true }
];
