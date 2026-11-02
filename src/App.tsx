/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ScreenFreeTimer } from './components/ScreenFreeTimer';
import { DigitalSwapView } from './components/DigitalSwapView';
import { ActivityLogView } from './components/ActivityLogView';
import { SuggestionsView } from './components/SuggestionsView';
import { WeeklyProgressView } from './components/WeeklyProgressView';
import { ChallengesAndGoalsView } from './components/ChallengesAndGoalsView';
import { GetInTouchView } from './components/GetInTouchView';
import { QuickLogModal } from './components/QuickLogModal';
import { ActivityLog, Challenge, PersonalGoal, DayProgress, UserPreferences, OfflineSuggestion } from './types';
import { INITIAL_ACTIVITY_LOGS, INITIAL_DAY_HISTORY, INITIAL_PREFERENCES } from './data/initialData';
import { INITIAL_CHALLENGES } from './data/challenges';
import { INITIAL_PERSONAL_GOALS } from './data/personalGoals';
import { getTodaySavedMinutes, getTodayDateString } from './utils/calculations';

import { Logo } from './components/Logo';

// Helper to update any previously stored activity titles to the new names requested
function normalizeActivities(acts: ActivityLog[]): ActivityLog[] {
  const titleReplacements: Record<string, string> = {
    'Reading "Klara and the Sun" in Armchair': 'Reading a book in Arm Chair',
    'Evening Coffee & Walk with Marcus': 'Evening Coffee and Walk with Family / Friends',
    'Badminton Rally with Sarah': 'Badminton Rally with Friends',
    'Acoustic Guitar Fingerpicking Practice': 'Practice of a Musical Instrument',
    'Cooked Homemade Creamy Mushroom Risotto': 'Cooking Homemade Food',
    'Physical Spanish Grammar Workbook & Flashcards': 'learning a new Language'
  };

  return acts.map((act) => {
    if (titleReplacements[act.title]) {
      return { ...act, title: titleReplacements[act.title] };
    }
    return act;
  });
}

export default function App() {
  // Initialize state with local storage or defaults
  const [activities, setActivities] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('rr_activities');
    const parsed = saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOGS;
    return normalizeActivities(parsed);
  });

  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    const saved = localStorage.getItem('rr_challenges');
    return saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
  });

  const [personalGoals, setPersonalGoals] = useState<PersonalGoal[]>(() => {
    const saved = localStorage.getItem('rr_goals');
    return saved ? JSON.parse(saved) : INITIAL_PERSONAL_GOALS;
  });

  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('rr_preferences');
    return saved ? JSON.parse(saved) : INITIAL_PREFERENCES;
  });

  const [history, setHistory] = useState<DayProgress[]>(() => {
    const saved = localStorage.getItem('rr_history');
    return saved ? JSON.parse(saved) : INITIAL_DAY_HISTORY;
  });

  const [activeTab, setActiveTab] = useState<string>('timer');
  const [isQuickLogOpen, setIsQuickLogOpen] = useState<boolean>(false);

  // Sync to local storage on changes
  useEffect(() => {
    localStorage.setItem('rr_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('rr_challenges', JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem('rr_goals', JSON.stringify(personalGoals));
  }, [personalGoals]);

  useEffect(() => {
    localStorage.setItem('rr_preferences', JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem('rr_history', JSON.stringify(history));
  }, [history]);

  // Derived calculations
  const todaySavedMinutes = getTodaySavedMinutes(activities);

  // Add activity log handler
  const handleAddActivity = (newLog: Omit<ActivityLog, 'id' | 'timestamp'>) => {
    const today = getTodayDateString();
    const entry: ActivityLog = {
      ...newLog,
      id: `act-${Date.now()}`,
      timestamp: `${today}T${new Date().toTimeString().slice(0, 8)}.000Z`
    };

    setActivities((prev) => [entry, ...prev]);

    // Update day history
    setHistory((prev) => {
      const existingToday = prev.find(d => d.date === today);
      if (existingToday) {
        return prev.map(d => d.date === today ? {
          ...d,
          screenTimeSavedMinutes: d.screenTimeSavedMinutes + newLog.durationMinutes,
          offlineTimeReusedMinutes: d.offlineTimeReusedMinutes + newLog.durationMinutes,
          goalMet: (d.screenTimeSavedMinutes + newLog.durationMinutes) >= preferences.dailyGoalMinutes
        } : d);
      } else {
        return [...prev, {
          date: today,
          screenTimeMinutes: Math.max(preferences.baselineScreenTimeMinutes - newLog.durationMinutes, 60),
          screenTimeSavedMinutes: newLog.durationMinutes,
          offlineTimeReusedMinutes: newLog.durationMinutes,
          goalMet: newLog.durationMinutes >= preferences.dailyGoalMinutes
        }];
      }
    });
  };

  // Challenge check-in toggle
  const handleToggleChallengeDay = (challengeId: string) => {
    const today = getTodayDateString();
    setChallenges((prev) => prev.map((ch) => {
      if (ch.id === challengeId) {
        const isCompletedToday = ch.completedDates.includes(today);
        const newDates = isCompletedToday
          ? ch.completedDates.filter(d => d !== today)
          : [...ch.completedDates, today];
        const newCount = newDates.length;
        return {
          ...ch,
          completedDates: newDates,
          currentDaysCompleted: newCount,
          isCompleted: newCount >= ch.durationDays
        };
      }
      return ch;
    }));
  };

  const handleJoinChallenge = (challengeId: string) => {
    setChallenges((prev) => prev.map(ch => ch.id === challengeId ? { ...ch, isJoined: true } : ch));
  };

  const handleUpdateGoalProgress = (goalId: string, amount: number) => {
    setPersonalGoals((prev) => prev.map((g) => {
      if (g.id === goalId) {
        return {
          ...g,
          currentCount: Number((g.currentCount + amount).toFixed(1))
        };
      }
      return g;
    }));
  };

  const handleAddCustomGoal = (newGoal: Omit<PersonalGoal, 'id' | 'currentCount'>) => {
    const entry: PersonalGoal = {
      ...newGoal,
      id: `pg-${Date.now()}`,
      currentCount: 0
    };
    setPersonalGoals(prev => [...prev, entry]);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(prev => prev.filter(act => act.id !== id));
  };

  // Cross-component handlers:
  // When user clicks "Start Swap Timer" from Swap view or Suggestions view
  const handleStartSwapTimer = (minutes: number, title: string, category: string) => {
    setActiveTab('timer');
  };

  const handleQuickLogSwap = (minutes: number, title: string, app: string, category: string) => {
    handleAddActivity({
      title,
      category: category as any,
      durationMinutes: minutes,
      swappedFromApp: app,
      feeling: 'accomplished' as any,
      notes: `Direct digital swap: reduced ${app} time and reused for offline life.`
    });
    setActiveTab('journal');
  };

  const handleStartTimerWithSuggestion = (sug: OfflineSuggestion) => {
    setActiveTab('timer');
  };

  const handleQuickLogSuggestion = (sug: OfflineSuggestion) => {
    handleAddActivity({
      title: sug.title,
      category: sug.category,
      durationMinutes: sug.durationMinutes,
      swappedFromApp: 'Instagram',
      feeling: 'refreshed' as any,
      notes: `${sug.description} (${sug.benefit})`
    });
    setActiveTab('journal');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-stone-900">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        todaySavedMinutes={todaySavedMinutes}
        dailyGoalMinutes={preferences.dailyGoalMinutes}
        streakCount={preferences.streakCount}
        onOpenQuickLog={() => setIsQuickLogOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {activeTab === 'timer' && (
          <ScreenFreeTimer
            onLogCompletedSession={handleAddActivity}
            onNavigateToTab={setActiveTab}
            todaySavedMinutes={todaySavedMinutes}
            dailyGoalMinutes={preferences.dailyGoalMinutes}
          />
        )}

        {activeTab === 'swap' && (
          <DigitalSwapView
            onStartSwapTimer={handleStartSwapTimer}
            onQuickLogSwap={handleQuickLogSwap}
          />
        )}

        {activeTab === 'suggestions' && (
          <SuggestionsView
            onStartTimerWithSuggestion={handleStartTimerWithSuggestion}
            onQuickLogSuggestion={handleQuickLogSuggestion}
          />
        )}

        {activeTab === 'journal' && (
          <ActivityLogView
            activities={activities}
            todaySavedMinutes={todaySavedMinutes}
            dailyGoalMinutes={preferences.dailyGoalMinutes}
            onAddActivity={handleAddActivity}
            onDeleteActivity={handleDeleteActivity}
          />
        )}

        {activeTab === 'progress' && (
          <WeeklyProgressView
            history={history}
            activities={activities}
            streakCount={preferences.streakCount}
            dailyGoalMinutes={preferences.dailyGoalMinutes}
          />
        )}

        {activeTab === 'challenges' && (
          <ChallengesAndGoalsView
            challenges={challenges}
            goals={personalGoals}
            onToggleChallengeDay={handleToggleChallengeDay}
            onJoinChallenge={handleJoinChallenge}
            onUpdateGoalProgress={handleUpdateGoalProgress}
            onAddCustomGoal={handleAddCustomGoal}
          />
        )}

        {activeTab === 'contact' && (
          <GetInTouchView />
        )}

      </main>

      {/* Quick Log Modal */}
      <QuickLogModal
        isOpen={isQuickLogOpen}
        onClose={() => setIsQuickLogOpen(false)}
        onSave={handleAddActivity}
      />

      {/* Beyond the Screen Footer */}
      <footer className="border-t border-stone-200/80 bg-stone-100/60 py-8 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center space-y-3">
          <Logo size="sm" />
          <p className="max-w-md mx-auto text-stone-500 text-[11px] leading-relaxed">
            Every screen hour converted is an hour of real touch, real movement, reading physical books, and authentic human connection reclaimed.
          </p>
          <div className="pt-1 text-[11px] text-stone-600 font-medium">
            Copyright © Beyond the screen, All rights Reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
