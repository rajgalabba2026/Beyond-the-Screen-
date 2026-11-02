import React, { useState } from 'react';
import { 
  Sparkles, 
  Dices, 
  Timer, 
  Plus, 
  Check, 
  ArrowRight, 
  BookOpen, 
  Dumbbell, 
  Users, 
  Footprints, 
  Trophy, 
  GraduationCap, 
  Palette, 
  Heart,
  Clock,
  Tag
} from 'lucide-react';
import { OFFLINE_SUGGESTIONS } from '../data/offlineActivities';
import { CATEGORIES } from '../data/categories';
import { OfflineSuggestion, OfflineCategory } from '../types';
import { formatMinutes } from '../utils/calculations';
import { CopyrightNotice } from './CopyrightNotice';

interface SuggestionsViewProps {
  onStartTimerWithSuggestion: (suggestion: OfflineSuggestion) => void;
  onQuickLogSuggestion: (suggestion: OfflineSuggestion) => void;
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

export const SuggestionsView: React.FC<SuggestionsViewProps> = ({
  onStartTimerWithSuggestion,
  onQuickLogSuggestion
}) => {
  const [selectedDuration, setSelectedDuration] = useState<number | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<OfflineCategory | 'all'>('all');
  const [surpriseCard, setSurpriseCard] = useState<OfflineSuggestion | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  const filteredSuggestions = OFFLINE_SUGGESTIONS.filter((sug) => {
    const matchesDuration = selectedDuration === 'all' || sug.durationMinutes === selectedDuration;
    const matchesCategory = selectedCategory === 'all' || sug.category === selectedCategory;
    return matchesDuration && matchesCategory;
  });

  const handleSurpriseMe = () => {
    setIsSpinning(true);
    let counter = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * OFFLINE_SUGGESTIONS.length);
      setSurpriseCard(OFFLINE_SUGGESTIONS[randomIndex]);
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 90);
  };

  return (
    <div className="space-y-8">
      
      {/* Hero Header with "Surprise Me" Randomizer */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Beat Screen Habit Loops</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight">
            What will you do with saved time?
          </h2>

          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
            When you stop scrolling, don't stare at the wall. Pick an inspiring offline craft, workout, book chapter, or social moment to enrich your day.
          </p>
        </div>

        {/* Surprise Me Button */}
        <div className="shrink-0 w-full md:w-auto">
          <button
            onClick={handleSurpriseMe}
            disabled={isSpinning}
            className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 hover:from-emerald-700 hover:to-teal-800 text-white text-xs sm:text-sm font-semibold shadow-md transition-all active:scale-95 ${
              isSpinning ? 'opacity-80 animate-pulse' : ''
            }`}
          >
            <Dices className={`w-4 h-4 text-emerald-300 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'Shuffling...' : 'Surprise Me! (Random Idea)'}</span>
          </button>
        </div>
      </div>

      {/* Highlighted Surprise Idea Banner if generated */}
      {surpriseCard && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 rounded-3xl border border-emerald-200 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  Your Random Offline Quest ({surpriseCard.durationMinutes} min)
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-stone-900 mt-1">
                  {surpriseCard.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
                  {surpriseCard.description}
                </p>
                <div className="text-xs font-semibold text-emerald-800 mt-2">
                  🌱 Swap formula: {surpriseCard.digitalSwapExample}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
              <button
                onClick={() => onStartTimerWithSuggestion(surpriseCard)}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
              >
                <Timer className="w-3.5 h-3.5 text-emerald-300" />
                <span>Start {surpriseCard.durationMinutes}m Timer</span>
              </button>
              <button
                onClick={() => onQuickLogSuggestion(surpriseCard)}
                className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-colors"
              >
                Quick Log
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Row: By Duration & Category */}
      <div className="space-y-3">
        {/* Duration filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-semibold text-stone-500 mr-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Time Available:</span>
          </span>
          {[
            { id: 'all', label: 'Any Duration' },
            { id: 15, label: '15 min (Quick)' },
            { id: 30, label: '30 min (Medium)' },
            { id: 60, label: '1 Hour (Full)' },
            { id: 120, label: '2 Hours (Deep)' },
          ].map((dur) => (
            <button
              key={dur.id}
              onClick={() => setSelectedDuration(dur.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                selectedDuration === dur.id
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border-stone-200'
              }`}
            >
              {dur.label}
            </button>
          ))}
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-semibold text-stone-500 mr-1 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
              selectedCategory === 'all'
                ? 'bg-emerald-800 text-white border-emerald-800'
                : 'bg-white text-stone-600 hover:bg-stone-100 border-stone-200'
            }`}
          >
            All Categories
          </button>
          {Object.values(CATEGORIES).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-white border-emerald-800'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border-stone-200'
              }`}
            >
              {cat.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSuggestions.map((sug) => {
          const cat = CATEGORIES[sug.category];
          const Icon = CATEGORY_ICONS[sug.category] || BookOpen;

          return (
            <div
              key={sug.id}
              className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-6 flex flex-col justify-between hover:border-emerald-300 shadow-2xs hover:shadow-sm transition-all group"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center border"
                      style={{ backgroundColor: cat.bgColor, borderColor: cat.borderColor }}
                    >
                      <Icon className="w-4 h-4" style={{ color: cat.color }} />
                    </div>
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
                  </div>

                  <span className="font-num font-bold text-xs px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
                    {formatMinutes(sug.durationMinutes)}
                  </span>
                </div>

                <h4 className="font-bold text-base text-stone-900 group-hover:text-emerald-800 transition-colors mb-1.5">
                  {sug.title}
                </h4>

                <p className="text-xs text-stone-600 leading-relaxed mb-3">
                  {sug.description}
                </p>

                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100 text-xs text-stone-700 mb-4">
                  <span className="font-semibold text-emerald-800">Health impact: </span>
                  <span>{sug.benefit}</span>
                </div>

                <div className="text-[11px] font-medium text-stone-500 mb-4 flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span className="truncate">{sug.digitalSwapExample}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-stone-100">
                <button
                  onClick={() => onStartTimerWithSuggestion(sug)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all shadow-xs"
                >
                  <Timer className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Start {sug.durationMinutes}m Timer</span>
                </button>
                <button
                  onClick={() => onQuickLogSuggestion(sug)}
                  className="p-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 transition-colors"
                  title="Quick Log this activity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Copyright Notice for Tab 3 (Offline Ideas) */}
      <CopyrightNotice />
    </div>
  );
};
