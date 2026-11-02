import React from 'react';
import { 
  Hourglass, 
  Flame, 
  Clock, 
  Plus, 
  Timer, 
  ArrowLeftRight, 
  Sparkles, 
  BookOpen, 
  BarChart3, 
  Trophy,
  Target,
  Mail
} from 'lucide-react';
import { formatMinutes } from '../utils/calculations';

import { Logo } from './Logo';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  todaySavedMinutes: number;
  dailyGoalMinutes: number;
  streakCount: number;
  onOpenQuickLog: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  todaySavedMinutes,
  dailyGoalMinutes,
  streakCount,
  onOpenQuickLog
}) => {
  const goalProgress = Math.min(Math.round((todaySavedMinutes / dailyGoalMinutes) * 100), 100);

  const navItems = [
    { id: 'timer', label: 'Screen-Free Timer', icon: Timer },
    { id: 'swap', label: 'Digital Swap', icon: ArrowLeftRight },
    { id: 'suggestions', label: 'Offline Ideas', icon: Sparkles },
    { id: 'journal', label: 'Activity Log', icon: BookOpen },
    { id: 'progress', label: 'Weekly Progress', icon: BarChart3 },
    { id: 'challenges', label: 'Challenges & Goals', icon: Trophy },
    { id: 'contact', label: 'Get in Touch', icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top brand & quick counters row */}
        <div className="py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Logo and brand name */}
          <div className="flex items-center cursor-pointer hover:opacity-95 transition-opacity" onClick={() => setActiveTab('timer')}>
            <Logo size="md" />
          </div>

          {/* Quick Counters & Action */}
          <div className="flex items-center flex-wrap gap-2.5 sm:gap-4">
            {/* Streak Counter */}
            <div 
              onClick={() => setActiveTab('progress')}
              title="Consecutive days meeting your reduction goal"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-800 cursor-pointer hover:bg-orange-100/80 transition-colors shadow-2xs"
            >
              <Flame className="w-4 h-4 text-orange-600 fill-orange-500 animate-bounce" />
              <div className="text-xs">
                <span className="font-num font-bold text-orange-900">{streakCount}</span>
                <span className="font-medium text-orange-700 ml-1">Day Streak</span>
              </div>
            </div>

            {/* Today's Saved Counter */}
            <div 
              onClick={() => setActiveTab('journal')}
              title="Time saved from screens today"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/90 text-emerald-900 cursor-pointer hover:bg-emerald-100/80 transition-colors shadow-2xs"
            >
              <Clock className="w-4 h-4 text-emerald-600" />
              <div className="text-xs">
                <span className="text-stone-500">Saved today:</span>{' '}
                <span className="font-num font-bold text-emerald-800 text-sm">
                  {formatMinutes(todaySavedMinutes)}
                </span>
              </div>
              {/* Mini goal circle indicator */}
              <div className="relative w-5 h-5 flex items-center justify-center ml-0.5" title={`${goalProgress}% of daily goal`}>
                <svg className="w-5 h-5 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-emerald-200 stroke-current"
                    strokeWidth="3.5"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-emerald-600 stroke-current transition-all duration-500"
                    strokeDasharray={`${goalProgress}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
            </div>

            {/* Log Offline Time Button */}
            <button
              onClick={onOpenQuickLog}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-semibold shadow-xs hover:shadow-md transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>Log Reused Time</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-1 -mb-px">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                  isActive
                    ? 'border-emerald-700 text-emerald-900 bg-emerald-50/70 font-semibold'
                    : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-stone-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
