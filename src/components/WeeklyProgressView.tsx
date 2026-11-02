import React from 'react';
import { 
  BarChart3, 
  Flame, 
  TrendingDown, 
  TrendingUp, 
  Sparkles, 
  BookOpen, 
  Dumbbell, 
  Footprints, 
  Users, 
  Award, 
  Calendar,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { ActivityLog, DayProgress } from '../types';
import { CATEGORIES } from '../data/categories';
import { 
  formatMinutes, 
  calculateWeeklyComparison, 
  calculateEquivalents, 
  getMotivationalMessage 
} from '../utils/calculations';
import { CopyrightNotice } from './CopyrightNotice';

interface WeeklyProgressViewProps {
  history: DayProgress[];
  activities: ActivityLog[];
  streakCount: number;
  dailyGoalMinutes: number;
}

export const WeeklyProgressView: React.FC<WeeklyProgressViewProps> = ({
  history,
  activities,
  streakCount,
  dailyGoalMinutes
}) => {
  const comparison = calculateWeeklyComparison(history);
  
  // Calculate category distribution of reclaimed hours
  const totalCategoryMinutes: Record<string, number> = {};
  activities.forEach((act) => {
    totalCategoryMinutes[act.category] = (totalCategoryMinutes[act.category] || 0) + act.durationMinutes;
  });

  const totalAllTimeReusedMinutes = activities.reduce((sum, act) => sum + act.durationMinutes, 0);

  // Equivalents of all reclaimed time
  const equivalents = calculateEquivalents(totalAllTimeReusedMinutes);

  // Motivational message
  const motivationalMessage = getMotivationalMessage(comparison.thisWeekSavedMins, comparison.dailyAverageSavedThisWeek);

  // Days of week for visual comparison
  const daysOfWeek = [
    { day: 'Mon', lastWeek: 210, thisWeek: 140, savedLast: 60, savedThis: 80 },
    { day: 'Tue', lastWeek: 230, thisWeek: 155, savedLast: 45, savedThis: 75 },
    { day: 'Wed', lastWeek: 190, thisWeek: 145, savedLast: 80, savedThis: 90 },
    { day: 'Thu', lastWeek: 200, thisWeek: 160, savedLast: 70, savedThis: 85 },
    { day: 'Fri', lastWeek: 180, thisWeek: 150, savedLast: 90, savedThis: 95 },
    { day: 'Sat', lastWeek: 170, thisWeek: 135, savedLast: 100, savedThis: 110 },
    { day: 'Sun', lastWeek: 160, thisWeek: 130, savedLast: 115, savedThis: 120 },
  ];

  const maxScreenMinutes = 250;

  return (
    <div className="space-y-8">
      
      {/* Motivational Message Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-stone-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
        <div className="absolute right-0 top-0 -mr-10 -mt-10 w-64 h-64 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Weekly Real-Life Impact</span>
            </div>
            
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              {motivationalMessage}
            </h3>

            <p className="text-xs text-stone-300">
              Based on your logged time reductions compared to previous screen consumption patterns.
            </p>
          </div>

          {/* Streak pill highlight */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-white/15 shrink-0">
            <Flame className="w-8 h-8 text-orange-400 fill-orange-400 animate-pulse" />
            <div>
              <div className="font-num font-bold text-2xl text-white">{streakCount} Days</div>
              <div className="text-[11px] text-stone-300">Consecutive Goal Met</div>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-side Weekly Screen Time Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Screen Time Cut */}
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Screen Time Comparison
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>-28% Screen Time</span>
            </span>
          </div>

          <div className="space-y-4 my-2">
            <div>
              <div className="flex justify-between text-xs font-medium text-stone-600 mb-1">
                <span>This Week (Daily Avg)</span>
                <span className="font-num font-bold text-emerald-800">2h 20m / day</span>
              </div>
              <div className="w-full h-3 rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: '48%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-stone-500 mb-1">
                <span>Last Week (Daily Avg)</span>
                <span className="font-num text-stone-600">3h 40m / day</span>
              </div>
              <div className="w-full h-3 rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-stone-400 rounded-full" style={{ width: '74%' }} />
              </div>
            </div>
          </div>

          <p className="text-xs text-stone-500 mt-4 pt-3 border-t border-stone-100">
            You cut an average of <strong className="text-stone-800">1 hr 20 min</strong> of screen time per day compared to last week!
          </p>
        </div>

        {/* Life Reclaimed This Week */}
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Time Reclaimed & Reused
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+34% Reused</span>
            </span>
          </div>

          <div className="space-y-4 my-2">
            <div>
              <div className="flex justify-between text-xs font-medium text-stone-600 mb-1">
                <span>This Week's Reused Time</span>
                <span className="font-num font-bold text-stone-900">10h 50m</span>
              </div>
              <div className="w-full h-3 rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-teal-600 rounded-full" style={{ width: '82%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-stone-500 mb-1">
                <span>Last Week's Reused Time</span>
                <span className="font-num text-stone-600">8h 05m</span>
              </div>
              <div className="w-full h-3 rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-stone-400 rounded-full" style={{ width: '60%' }} />
              </div>
            </div>
          </div>

          <p className="text-xs text-stone-500 mt-4 pt-3 border-t border-stone-100">
            You have repurposed <strong className="text-stone-800">2h 45m more</strong> into offline passions than last week.
          </p>
        </div>

        {/* Daily Consistency & Streaks */}
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Reduction Streak
              </span>
              <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                Active Streak
              </span>
            </div>

            <div className="flex items-center gap-3 my-2">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-num font-bold text-2xl">
                {streakCount}
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-sm">Consecutive Days</h4>
                <p className="text-xs text-stone-500">Meeting your {formatMinutes(dailyGoalMinutes)} daily goal</p>
              </div>
            </div>

            {/* Streak Day Badges */}
            <div className="flex items-center justify-between gap-1.5 mt-3 pt-3 border-t border-stone-100">
              {['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'].map((dayName, idx) => (
                <div key={dayName} className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold mb-1 ${
                    idx < streakCount 
                      ? 'bg-orange-500 text-white shadow-2xs' 
                      : 'bg-stone-100 text-stone-400'
                  }`}>
                    {idx < streakCount ? '✓' : '•'}
                  </div>
                  <span className="text-[10px] text-stone-400">{dayName}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-stone-400 mt-3">
            Longest streak on record: <strong>14 days</strong>
          </div>
        </div>

      </div>

      {/* Day by Day Screen Time vs Reused Time Chart */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-display font-bold text-xl text-stone-900">
              Day-by-Day Screen Time Reduction Chart
            </h3>
            <p className="text-xs text-stone-500">
              Comparing daily screen hours with reclaimed offline life hours this week vs last week.
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-700"></span>
              <span className="text-stone-700 font-medium">Reused Time (This Week)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-stone-300"></span>
              <span className="text-stone-500">Last Week Screen Time</span>
            </div>
          </div>
        </div>

        {/* Bar chart representation */}
        <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-56 pt-8 pb-2 border-b border-stone-200">
          {daysOfWeek.map((item, idx) => {
            const screenHeightPercent = (item.lastWeek / maxScreenMinutes) * 100;
            const savedHeightPercent = (item.savedThis / maxScreenMinutes) * 100;

            return (
              <div key={item.day} className="flex flex-col items-center h-full justify-end group relative">
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-stone-900 text-white text-[10px] py-1 px-2 rounded-lg whitespace-nowrap pointer-events-none z-20 shadow-md">
                  Saved: {item.savedThis}m | Screen: {item.thisWeek}m
                </div>

                <div className="flex items-end gap-1.5 w-full justify-center h-full">
                  {/* Last week screen bar */}
                  <div
                    className="w-3 sm:w-5 bg-stone-200 rounded-t-md transition-all group-hover:bg-stone-300"
                    style={{ height: `${screenHeightPercent}%` }}
                    title={`Last week: ${item.lastWeek} min`}
                  />
                  {/* This week saved/reused bar */}
                  <div
                    className="w-3 sm:w-5 bg-emerald-700 rounded-t-md transition-all group-hover:bg-emerald-600"
                    style={{ height: `${savedHeightPercent}%` }}
                    title={`Reused: ${item.savedThis} min`}
                  />
                </div>
                <span className="text-xs font-semibold text-stone-600 mt-2 font-num">
                  {item.day}
                </span>
                <span className="text-[10px] text-emerald-700 font-bold font-num">
                  +{item.savedThis}m
                </span>
              </div>
            );
          })}
        </div>
        <div className="text-center text-xs text-stone-400 mt-2">
          Weekly aggregate: Total screen time reduced by 9 hours across 7 days.
        </div>
      </div>

      {/* Offline Categories Breakdown & Equivalent Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Offline Breakdown */}
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-xs">
          <h4 className="font-display font-bold text-lg text-stone-900 mb-1">
            Where Your Saved Time Went
          </h4>
          <p className="text-xs text-stone-500 mb-4">
            Distribution of all {formatMinutes(totalAllTimeReusedMinutes)} reclaimed across offline passions.
          </p>

          <div className="space-y-3">
            {Object.keys(totalCategoryMinutes).map((catKey) => {
              const cat = CATEGORIES[catKey as keyof typeof CATEGORIES];
              const mins = totalCategoryMinutes[catKey];
              const percentage = Math.round((mins / Math.max(totalAllTimeReusedMinutes, 1)) * 100);

              if (!cat || mins === 0) return null;

              return (
                <div key={catKey}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span>{cat.name}</span>
                    </span>
                    <span className="font-num text-stone-600">
                      <strong>{formatMinutes(mins)}</strong> ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${percentage}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real World Impact Equivalents */}
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-xs">
          <h4 className="font-display font-bold text-lg text-stone-900 mb-1">
            What You Gained In Return
          </h4>
          <p className="text-xs text-stone-500 mb-4">
            Tangible real-world achievements made possible by your screen time reduction.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-100">
              <BookOpen className="w-5 h-5 text-emerald-700 mb-1" />
              <div className="font-num font-bold text-xl text-stone-900">{equivalents.bookPages}</div>
              <div className="text-[11px] text-stone-600">Physical book pages read</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-orange-50/80 border border-orange-100">
              <Dumbbell className="w-5 h-5 text-orange-700 mb-1" />
              <div className="font-num font-bold text-xl text-stone-900">{equivalents.workoutsPossible}</div>
              <div className="text-[11px] text-stone-600">Complete gym sessions</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-teal-50/80 border border-teal-100">
              <Footprints className="w-5 h-5 text-teal-700 mb-1" />
              <div className="font-num font-bold text-xl text-stone-900">{equivalents.kilometersJogged} km</div>
              <div className="text-[11px] text-stone-600">Outdoor jogs & walks</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-100">
              <Users className="w-5 h-5 text-purple-700 mb-1" />
              <div className="font-num font-bold text-xl text-stone-900">{equivalents.cupsOfTeaWithFriends}</div>
              <div className="text-[11px] text-stone-600">Undivided social catchups</div>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Notice for Tab 5 (Weekly Progress) */}
      <CopyrightNotice />
    </div>
  );
};
