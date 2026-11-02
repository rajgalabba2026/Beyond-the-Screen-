export type OfflineCategory = 
  | 'reading'
  | 'fitness'
  | 'social'
  | 'nature'
  | 'hobbies'
  | 'learning'
  | 'mindfulness'
  | 'sports';

export interface CategoryInfo {
  id: OfflineCategory;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  description: string;
  defaultSwapRatio?: string; // e.g., "1 hr screen time = 1 hr workout"
}

export interface ActivityLog {
  id: string;
  title: string;
  category: OfflineCategory;
  durationMinutes: number;
  timestamp: string; // ISO date string
  notes?: string;
  feeling?: 'energized' | 'calm' | 'accomplished' | 'connected' | 'inspired';
  swappedFromApp?: string; // e.g. "Instagram", "YouTube", "TikTok", "Endless scrolling"
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  badgeName: string;
  category: OfflineCategory;
  durationDays: number; // e.g., 7 days, 14 days, 30 days
  currentDaysCompleted: number;
  completedDates: string[]; // YYYY-MM-DD
  isJoined: boolean;
  isCompleted: boolean;
  dailyPrompt: string;
  tag: string;
}

export interface PersonalGoal {
  id: string;
  title: string;
  category: OfflineCategory;
  targetCount: number;
  currentCount: number;
  unit: string; // "books/month", "times/week", "hours/week"
  frequency: 'weekly' | 'monthly';
  deadlineDescription?: string;
}

export interface DayProgress {
  date: string; // YYYY-MM-DD
  screenTimeMinutes: number; // estimated screen time for the day
  screenTimeSavedMinutes: number; // time saved from screen
  offlineTimeReusedMinutes: number; // logged offline activities
  goalMet: boolean;
}

export interface UserPreferences {
  dailyGoalMinutes: number; // e.g. 60 or 90 mins
  baselineScreenTimeMinutes: number; // e.g. 300 mins (5 hrs) default baseline
  soundEnabled: boolean;
  ambientSound: 'none' | 'rain' | 'forest' | 'bowl';
  streakCount: number;
  lastActiveDate: string; // YYYY-MM-DD
}

export interface OfflineSuggestion {
  id: string;
  title: string;
  category: OfflineCategory;
  durationMinutes: number;
  description: string;
  benefit: string;
  digitalSwapExample: string;
  difficulty: 'Easy' | 'Moderate' | 'Engaging';
  tags: string[];
}
