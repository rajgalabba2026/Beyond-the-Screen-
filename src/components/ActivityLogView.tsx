import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Clock, 
  Calendar, 
  Sparkles, 
  Smile, 
  TrendingUp, 
  BookOpen, 
  Dumbbell, 
  Users, 
  Footprints, 
  Trophy, 
  GraduationCap, 
  Palette, 
  Heart,
  CheckCircle,
  Filter
} from 'lucide-react';
import { ActivityLog, OfflineCategory } from '../types';
import { CATEGORIES } from '../data/categories';
import { formatMinutes, getTodaySavedMinutes, getTodayActivities } from '../utils/calculations';
import { CopyrightNotice } from './CopyrightNotice';

interface ActivityLogViewProps {
  activities: ActivityLog[];
  todaySavedMinutes: number;
  dailyGoalMinutes: number;
  onAddActivity: (activity: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
  onDeleteActivity: (id: string) => void;
}

const CATEGORY_ICONS: Record<OfflineCategory, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  reading: BookOpen,
  fitness: Dumbbell,
  social: Users,
  nature: Footprints,
  sports: Trophy,
  learning: GraduationCap,
  hobbies: Palette,
  mindfulness: Heart
};

export const ActivityLogView: React.FC<ActivityLogViewProps> = ({
  activities,
  todaySavedMinutes,
  dailyGoalMinutes,
  onAddActivity,
  onDeleteActivity
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // New entry form state
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<OfflineCategory>('reading');
  const [durationMinutes, setDurationMinutes] = useState<number>(30);
  const [swappedFromApp, setSwappedFromApp] = useState<string>('Instagram');
  const [notes, setNotes] = useState<string>('');
  const [feeling, setFeeling] = useState<'energized' | 'calm' | 'accomplished' | 'connected' | 'inspired'>('calm');

  const todayActivities = getTodayActivities(activities);
  const totalLifetimeMinutes = activities.reduce((sum, act) => sum + act.durationMinutes, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddActivity({
      title: title.trim(),
      category,
      durationMinutes,
      swappedFromApp,
      notes: notes.trim(),
      feeling
    });

    // Reset form
    setTitle('');
    setNotes('');
    setShowAddForm(false);
  };

  const filteredActivities = activities.filter((act) => {
    const matchesFilter = selectedFilter === 'all' || act.category === selectedFilter;
    const matchesQuery = act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (act.notes && act.notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (act.swappedFromApp && act.swappedFromApp.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesQuery;
  });

  const goalReached = todaySavedMinutes >= dailyGoalMinutes;

  return (
    <div className="space-y-8">
      
      {/* Today's Saved Summary Banner */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Time Saved Counter</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight">
            You saved {formatMinutes(todaySavedMinutes)} today.
          </h2>

          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
            {goalReached 
              ? `🎉 Outstanding! You reached your daily reduction goal of ${formatMinutes(dailyGoalMinutes)} and reclaimed life hours.`
              : `You are ${formatMinutes(dailyGoalMinutes - todaySavedMinutes)} away from reaching your ${formatMinutes(dailyGoalMinutes)} daily goal.`
            }
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex-1 md:flex-initial p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center min-w-[120px]">
            <div className="text-xs text-stone-500 font-medium">Today's Entries</div>
            <div className="font-num font-bold text-xl text-stone-900 mt-0.5">
              {todayActivities.length}
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
              {formatMinutes(todaySavedMinutes)} total
            </div>
          </div>

          <div className="flex-1 md:flex-initial p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center min-w-[120px]">
            <div className="text-xs text-stone-500 font-medium">All-Time Saved</div>
            <div className="font-num font-bold text-xl text-stone-900 mt-0.5">
              {formatMinutes(totalLifetimeMinutes)}
            </div>
            <div className="text-[10px] text-stone-500 font-semibold mt-0.5">
              {activities.length} sessions
            </div>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-emerald-900 hover:bg-emerald-800 text-white transition-all shadow-xs active:scale-95 min-w-[100px]"
          >
            <Plus className="w-5 h-5 text-emerald-300 mb-0.5" />
            <span className="text-xs font-semibold">New Entry</span>
          </button>
        </div>
      </div>

      {/* Manual Activity Logging Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-emerald-50/60 rounded-3xl border border-emerald-200/80 p-6 sm:p-8 animate-in fade-in duration-200 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display font-bold text-xl text-stone-900">
                Log Reused Offline Time
              </h3>
              <p className="text-xs text-stone-500">
                Record how you invested your saved screen time into real life.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-stone-400 hover:text-stone-600 text-xs font-medium"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Activity Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Gym 45 min, Reading 30 min, Friends 1 hr, 5km jog"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 bg-white"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as OfflineCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 bg-white"
              >
                {Object.values(CATEGORIES).map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Duration (minutes) *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="5"
                  max="480"
                  required
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 bg-white"
                />
                <span className="text-xs font-medium text-stone-500 whitespace-nowrap">
                  ({formatMinutes(durationMinutes)})
                </span>
              </div>
            </div>

            {/* Swapped from App */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Substituted Distraction
              </label>
              <select
                value={swappedFromApp}
                onChange={(e) => setSwappedFromApp(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 bg-white"
              >
                <option value="Instagram">Instagram</option>
                <option value="YouTube">YouTube</option>
                <option value="TikTok">TikTok</option>
                <option value="Twitter/X">Twitter / X</option>
                <option value="Reddit">Reddit</option>
                <option value="Gaming">Mobile Gaming</option>
                <option value="General Scrolling">Mindless Scrolling</option>
              </select>
            </div>

            {/* Feeling / Emotion */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                How did you feel after?
              </label>
              <select
                value={feeling}
                onChange={(e) => setFeeling(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 bg-white"
              >
                <option value="calm">😌 Calm & Peaceful</option>
                <option value="energized">⚡ Energized & Pumped</option>
                <option value="accomplished">🏆 Accomplished</option>
                <option value="connected">❤️ Deeply Connected</option>
                <option value="inspired">🎨 Creative & Inspired</option>
              </select>
            </div>

            {/* Notes */}
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Reflections & Notes
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Read chapter 4 in the sun; left phone completely in backpack."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 bg-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl text-stone-600 hover:bg-emerald-100/50 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
            >
              Save Activity Entry
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
              selectedFilter === 'all'
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-600 hover:bg-stone-100 border-stone-200'
            }`}
          >
            All ({activities.length})
          </button>
          {Object.values(CATEGORIES).map((cat) => {
            const count = activities.filter(a => a.category === cat.id).length;
            if (count === 0 && selectedFilter !== cat.id) return null;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                  selectedFilter === cat.id
                    ? 'bg-emerald-800 text-white border-emerald-800'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border-stone-200'
                }`}
              >
                {cat.name.split(' ')[0]} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search activities, notes..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
          />
        </div>
      </div>

      {/* Activities Timeline Feed */}
      <div className="space-y-3">
        {filteredActivities.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-stone-800 text-sm">No activity records found</h4>
            <p className="text-xs text-stone-500 mt-1">
              Start a screen-free timer session or log how you reused your time today!
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
            >
              Log Offline Activity
            </button>
          </div>
        ) : (
          filteredActivities.map((act) => {
            const cat = CATEGORIES[act.category];
            const Icon = CATEGORY_ICONS[act.category] || BookOpen;
            const actDate = new Date(act.timestamp);
            const dateStr = actDate.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              weekday: 'short'
            });
            const timeStr = actDate.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={act.id}
                className="bg-white rounded-2xl border border-stone-200/80 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-emerald-300 shadow-2xs group"
              >
                {/* Left icon & details */}
                <div className="flex items-start sm:items-center gap-3.5">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border"
                    style={{ backgroundColor: cat.bgColor, borderColor: cat.borderColor }}
                  >
                    <Icon className="w-5 h-5" style={{ color: cat.color }} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-bold text-stone-900 text-sm">
                        {act.title}
                      </h4>
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                        style={{
                          backgroundColor: cat.bgColor,
                          color: cat.textColor,
                          borderColor: cat.borderColor
                        }}
                      >
                        {cat.name.split(' ')[0]}
                      </span>
                      {act.swappedFromApp && (
                        <span className="text-[10px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                          Swapped from {act.swappedFromApp}
                        </span>
                      )}
                    </div>

                    {act.notes && (
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                        {act.notes}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-[11px] text-stone-400 mt-1.5 font-medium">
                      <span>{dateStr} at {timeStr}</span>
                      {act.feeling && (
                        <>
                          <span>•</span>
                          <span className="capitalize text-stone-600">
                            Felt {act.feeling}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right duration badge & delete */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  <div className="text-right">
                    <span className="font-num font-bold text-emerald-800 text-base">
                      {formatMinutes(act.durationMinutes)}
                    </span>
                    <div className="text-[10px] text-stone-400 uppercase tracking-wider">
                      Reclaimed
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteActivity(act.id)}
                    className="text-stone-300 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete log"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Copyright Notice for Tab 4 (Activity Log) */}
      <CopyrightNotice />
    </div>
  );
};
