import React, { useState } from 'react';
import { 
  Trophy, 
  Target, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Sparkles, 
  Flame, 
  BookOpen, 
  Dumbbell, 
  Users, 
  Sun, 
  Moon, 
  Utensils, 
  Footprints, 
  Palette,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Challenge, PersonalGoal, OfflineCategory } from '../types';
import { CATEGORIES } from '../data/categories';
import { soundController } from '../utils/audio';
import { CopyrightNotice } from './CopyrightNotice';

interface ChallengesAndGoalsViewProps {
  challenges: Challenge[];
  goals: PersonalGoal[];
  onToggleChallengeDay: (challengeId: string) => void;
  onJoinChallenge: (challengeId: string) => void;
  onUpdateGoalProgress: (goalId: string, increment: number) => void;
  onAddCustomGoal: (goal: Omit<PersonalGoal, 'id' | 'currentCount'>) => void;
}

const CHALLENGE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Utensils: Utensils,
  Moon: Moon,
  Sun: Sun,
  Users: Users,
  Footprints: Footprints,
  Palette: Palette,
  Trophy: Trophy,
  BookOpen: BookOpen
};

export const ChallengesAndGoalsView: React.FC<ChallengesAndGoalsViewProps> = ({
  challenges,
  goals,
  onToggleChallengeDay,
  onJoinChallenge,
  onUpdateGoalProgress,
  onAddCustomGoal
}) => {
  const [activeTab, setActiveTab] = useState<'challenges' | 'goals'>('challenges');
  const [showAddGoalModal, setShowAddGoalModal] = useState<boolean>(false);

  // New goal state
  const [newGoalTitle, setNewGoalTitle] = useState<string>('');
  const [newGoalCategory, setNewGoalCategory] = useState<OfflineCategory>('reading');
  const [newGoalTarget, setNewGoalTarget] = useState<number>(4);
  const [newGoalUnit, setNewGoalUnit] = useState<string>('sessions');
  const [newGoalFrequency, setNewGoalFrequency] = useState<'weekly' | 'monthly'>('weekly');

  const todayStr = '2026-10-12';

  const handleCheckInChallenge = (challengeId: string) => {
    onToggleChallengeDay(challengeId);
    soundController.playStartChime();
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 }
    });
  };

  const handleGoalIncrement = (goalId: string, amount: number) => {
    onUpdateGoalProgress(goalId, amount);
    soundController.playStartChime();
  };

  const handleCreateGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    onAddCustomGoal({
      title: newGoalTitle.trim(),
      category: newGoalCategory,
      targetCount: newGoalTarget,
      unit: newGoalUnit,
      frequency: newGoalFrequency,
      deadlineDescription: `${newGoalFrequency === 'weekly' ? 'Weekly' : 'Monthly'} Target`
    });

    setNewGoalTitle('');
    setShowAddGoalModal(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Tab Switcher & Header */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-2">
            <Trophy className="w-3.5 h-3.5 text-emerald-600" />
            <span>Habit Architecture</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight">
            Challenges & Personal Goals
          </h2>

          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
            Replace passive habits with active offline targets. Build lasting streaks and conquer screen-free life milestones.
          </p>
        </div>

        {/* Sub-tab Pill Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-2xl w-full sm:w-auto shrink-0">
          <button
            onClick={() => setActiveTab('challenges')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'challenges'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-emerald-700" />
            <span>Screen-Free Challenges</span>
          </button>

          <button
            onClick={() => setActiveTab('goals')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'goals'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-orange-600" />
            <span>Personal Offline Goals</span>
          </button>
        </div>
      </div>

      {/* 1. SCREEN-FREE CHALLENGES */}
      {activeTab === 'challenges' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-stone-900">
                Active & Available Detox Challenges
              </h3>
              <p className="text-xs text-stone-500">
                Check in each day you succeed in keeping the screen away.
              </p>
            </div>
            <span className="text-xs font-semibold text-stone-500">
              {challenges.filter(c => c.isJoined).length} active challenges joined
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {challenges.map((ch) => {
              const Icon = CHALLENGE_ICONS[ch.icon] || Trophy;
              const isCheckedInToday = ch.completedDates.includes(todayStr);
              const progressPercent = Math.min(Math.round((ch.currentDaysCompleted / ch.durationDays) * 100), 100);

              return (
                <div
                  key={ch.id}
                  className={`bg-white rounded-3xl border p-6 flex flex-col justify-between transition-all shadow-2xs hover:shadow-md ${
                    ch.isCompleted
                      ? 'border-emerald-300 bg-emerald-50/20'
                      : 'border-stone-200/90'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-emerald-800" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                            {ch.tag}
                          </span>
                          <h4 className="font-bold text-stone-900 text-base">
                            {ch.title}
                          </h4>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200 flex items-center gap-1">
                        <Flame className="w-3 h-3 text-orange-600 fill-orange-500" />
                        <span>{ch.currentDaysCompleted}/{ch.durationDays}d</span>
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 mb-3 leading-relaxed">
                      {ch.description}
                    </p>

                    <div className="p-2.5 rounded-xl bg-stone-50 text-[11px] text-stone-600 mb-4 border border-stone-100">
                      <strong>Daily Reminder:</strong> {ch.dailyPrompt}
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 mb-4">
                      <div className="flex justify-between text-xs text-stone-500 font-medium">
                        <span>Progress ({ch.currentDaysCompleted} of {ch.durationDays} days)</span>
                        <span className="font-num font-semibold text-emerald-800">{progressPercent}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                        <div
                          className="h-full bg-emerald-700 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div className="text-[11px] text-stone-500 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      <span>Unlocks: <strong>{ch.badgeName}</strong></span>
                    </div>

                    {ch.isJoined ? (
                      <button
                        onClick={() => handleCheckInChallenge(ch.id)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isCheckedInToday
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-emerald-900 hover:bg-emerald-800 text-white shadow-xs active:scale-95'
                        }`}
                      >
                        <CheckCircle2 className={`w-3.5 h-3.5 ${isCheckedInToday ? 'text-emerald-700' : 'text-emerald-300'}`} />
                        <span>{isCheckedInToday ? 'Checked in for Today' : 'Check In Today'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onJoinChallenge(ch.id)}
                        className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all"
                      >
                        Join Challenge
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. PERSONAL GOALS */}
      {activeTab === 'goals' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-stone-900">
                Personal Offline Targets
              </h3>
              <p className="text-xs text-stone-500">
                Clear tangible quotas: read physical books, hit the gym, and spend face-to-face time with friends.
              </p>
            </div>
            <button
              onClick={() => setShowAddGoalModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>Add Personal Goal</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {goals.map((goal) => {
              const cat = CATEGORIES[goal.category];
              const progressRatio = Math.min(goal.currentCount / goal.targetCount, 1);
              const progressPercent = Math.round(progressRatio * 100);
              const isAchieved = goal.currentCount >= goal.targetCount;

              return (
                <div
                  key={goal.id}
                  className={`bg-white rounded-3xl border p-6 flex flex-col justify-between transition-all shadow-2xs hover:border-emerald-300 ${
                    isAchieved ? 'border-emerald-300 bg-emerald-50/15' : 'border-stone-200/90'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                        style={{
                          backgroundColor: cat.bgColor,
                          color: cat.textColor,
                          borderColor: cat.borderColor
                        }}
                      >
                        {cat.name.split(' ')[0]} • {goal.frequency}
                      </span>
                      {isAchieved && (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          Target Reached! 🎉
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-base text-stone-900 mb-2">
                      {goal.title}
                    </h4>

                    {goal.deadlineDescription && (
                      <p className="text-xs text-stone-500 mb-4">
                        {goal.deadlineDescription}
                      </p>
                    )}

                    {/* Big count numbers */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="font-num font-bold text-3xl text-stone-900">
                        {goal.currentCount}
                      </span>
                      <span className="text-xs text-stone-400 font-medium">
                        / {goal.targetCount} {goal.unit}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden mb-5">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${progressPercent}%`,
                          backgroundColor: cat.color
                        }}
                      />
                    </div>
                  </div>

                  {/* Increment buttons */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <span className="text-xs text-stone-400 font-medium">
                      Update progress:
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleGoalIncrement(goal.id, 0.5)}
                        className="px-2.5 py-1.5 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition-colors"
                      >
                        +0.5
                      </button>
                      <button
                        onClick={() => handleGoalIncrement(goal.id, 1)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs transition-colors"
                      >
                        +1 {goal.unit.split('/')[0]}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Custom Goal Modal */}
      {showAddGoalModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateGoalSubmit} className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-display font-bold text-2xl text-stone-900 mb-1">
              Add Personal Offline Goal
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              Set an offline objective to hold yourself accountable outside the digital world.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Goal Title *
                </label>
                <input
                  type="text"
                  required
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  placeholder="e.g. Read 2 books/month, Gym 4× a week, Meet friends weekly"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Category
                </label>
                <select
                  value={newGoalCategory}
                  onChange={(e) => setNewGoalCategory(e.target.value as OfflineCategory)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 bg-white"
                >
                  {Object.values(CATEGORIES).map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Target Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={newGoalTarget}
                    onChange={(e) => setNewGoalTarget(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Frequency
                  </label>
                  <select
                    value={newGoalFrequency}
                    onChange={(e) => setNewGoalFrequency(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 bg-white"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Unit Label (e.g. books, workouts, gatherings)
                </label>
                <input
                  type="text"
                  required
                  value={newGoalUnit}
                  onChange={(e) => setNewGoalUnit(e.target.value)}
                  placeholder="e.g. books, sessions, walks"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddGoalModal(false)}
                  className="w-1/3 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
                >
                  Create Goal
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Copyright Notice for Tab 6 (Challenges and goals) */}
      <CopyrightNotice />
    </div>
  );
};
