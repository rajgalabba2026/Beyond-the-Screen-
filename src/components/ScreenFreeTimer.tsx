import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  BookOpen, 
  Dumbbell, 
  Users, 
  Footprints, 
  Trophy, 
  GraduationCap, 
  Palette, 
  Heart,
  Flame,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { OfflineCategory, ActivityLog } from '../types';
import { CATEGORIES } from '../data/categories';
import { soundController } from '../utils/audio';
import { formatMinutes } from '../utils/calculations';
import { CopyrightNotice } from './CopyrightNotice';

interface ScreenFreeTimerProps {
  onLogCompletedSession: (log: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
  onNavigateToTab: (tab: string) => void;
  todaySavedMinutes: number;
  dailyGoalMinutes: number;
}

const PRESET_DURATIONS = [
  { label: '15 min', minutes: 15, desc: 'Quick chapter / core workout' },
  { label: '30 min', minutes: 30, desc: 'Reading or neighborhood jog' },
  { label: '45 min', minutes: 45, desc: 'Solid gym workout or study sprint' },
  { label: '60 min', minutes: 60, desc: '1-Hour total phone detox' },
  { label: '90 min', minutes: 90, desc: 'Deep book immersion or sport game' },
  { label: '120 min', minutes: 120, desc: 'Friends dinner or outdoor hike' }
];

const TARGET_ACTIVITIES: { category: OfflineCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { category: 'reading', label: 'Reading a Physical Book', icon: BookOpen },
  { category: 'fitness', label: 'Gym / Strength Workout', icon: Dumbbell },
  { category: 'nature', label: 'Going for a Jog / Walk', icon: Footprints },
  { category: 'social', label: 'Meeting Friends & Family', icon: Users },
  { category: 'sports', label: 'Playing Sports / Games', icon: Trophy },
  { category: 'learning', label: 'Studying & Deep Focus', icon: GraduationCap },
  { category: 'hobbies', label: 'Crafting / Hobbies / Cooking', icon: Palette },
  { category: 'mindfulness', label: 'Screen-Free Rest & Breath', icon: Heart },
];

export const ScreenFreeTimer: React.FC<ScreenFreeTimerProps> = ({
  onLogCompletedSession,
  onNavigateToTab,
  todaySavedMinutes,
  dailyGoalMinutes
}) => {
  const [targetMinutes, setTargetMinutes] = useState<number>(30);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<OfflineCategory>('reading');
  const [sessionTitle, setSessionTitle] = useState<string>('Reading physical book');
  const [ambientSound, setAmbientSound] = useState<'none' | 'rain' | 'forest' | 'bowl'>('none');
  const [isZenMode, setIsZenMode] = useState<boolean>(false);
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);
  const [completedMinutes, setCompletedMinutes] = useState<number>(0);
  const [reflectionNote, setReflectionNote] = useState<string>('');
  const [swappedApp, setSwappedApp] = useState<string>('Instagram');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync initial countdown with targetMinutes when not running
  const handleSelectPreset = (mins: number) => {
    if (isRunning) return;
    setTargetMinutes(mins);
    setSecondsRemaining(mins * 60);
  };

  // Timer interval handling
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, targetMinutes]);

  // Handle ambient sound effect toggling
  useEffect(() => {
    if (isRunning && ambientSound !== 'none') {
      soundController.startAmbient(ambientSound);
    } else {
      soundController.stopAmbient();
    }

    return () => {
      soundController.stopAmbient();
    };
  }, [isRunning, ambientSound]);

  const handleStartTimer = () => {
    setIsRunning(true);
    soundController.playStartChime();
  };

  const handlePauseTimer = () => {
    setIsRunning(false);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setSecondsRemaining(targetMinutes * 60);
    soundController.stopAmbient();
  };

  const handleTimerComplete = () => {
    setIsRunning(false);
    soundController.stopAmbient();
    soundController.playCompletionGong();

    // Trigger celebratory confetti
    confetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#059669', '#E07A5F', '#D97706', '#10B981']
    });

    setCompletedMinutes(targetMinutes);
    setShowCompletionModal(true);
  };

  const handleFinishEarly = () => {
    const elapsedSeconds = (targetMinutes * 60) - secondsRemaining;
    const elapsedMinutes = Math.max(Math.round(elapsedSeconds / 60), 1);
    
    setIsRunning(false);
    soundController.stopAmbient();
    soundController.playCompletionGong();

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    setCompletedMinutes(elapsedMinutes);
    setShowCompletionModal(true);
  };

  const handleSaveToActivityLog = () => {
    onLogCompletedSession({
      title: sessionTitle || `Unplugged ${CATEGORIES[selectedCategory].name}`,
      category: selectedCategory,
      durationMinutes: completedMinutes,
      notes: reflectionNote || `Screen-free timer session completed instead of scrolling on ${swappedApp}.`,
      feeling: 'refreshed' as any,
      swappedFromApp: swappedApp
    });

    setShowCompletionModal(false);
    setReflectionNote('');
    setSecondsRemaining(targetMinutes * 60);
  };

  // Format MM:SS or HH:MM:SS
  const formatTimeDisplay = (totalSecs: number) => {
    const hours = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;

    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalSeconds = targetMinutes * 60;
  const progressPercent = totalSeconds > 0 
    ? Math.min(100, Math.round(((totalSeconds - secondsRemaining) / totalSeconds) * 100))
    : 0;

  const currentCat = CATEGORIES[selectedCategory];

  return (
    <div className={`transition-all duration-500 ${isZenMode ? 'fixed inset-0 z-50 bg-stone-950 text-stone-100 flex items-center justify-center p-6' : 'space-y-8'}`}>
      
      {/* Zen Mode Header when in full immersion */}
      {isZenMode && (
        <div className="absolute top-6 right-6 flex items-center gap-4">
          <button
            onClick={() => setIsZenMode(false)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800/90 text-stone-300 hover:text-white hover:bg-stone-700 text-xs font-semibold backdrop-blur-md transition-colors"
          >
            <Minimize2 className="w-4 h-4" />
            <span>Exit Zen Mode</span>
          </button>
        </div>
      )}

      {/* Main Timer Display Hero */}
      <div className={`relative overflow-hidden rounded-3xl ${isZenMode ? 'max-w-xl w-full' : 'bg-white border border-stone-200/90 shadow-sm p-6 sm:p-10'}`}>
        
        {/* Ambient background decoration */}
        {!isZenMode && (
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none" />
        )}

        <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* Header Tag / Goal Status */}
          {!isZenMode && (
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Screen-Free Focus Session
              </span>
              <span className="text-xs text-stone-500">
                Daily Goal: <strong className="text-stone-800 font-num">{formatMinutes(todaySavedMinutes)}</strong> of {formatMinutes(dailyGoalMinutes)}
              </span>
            </div>
          )}

          {/* Activity Category Selection Chips */}
          {!isZenMode && (
            <div className="w-full mb-6">
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2.5">
                What will you reuse this time for?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TARGET_ACTIVITIES.map((act) => {
                  const Icon = act.icon;
                  const isSelected = selectedCategory === act.category;
                  return (
                    <button
                      key={act.category}
                      onClick={() => {
                        setSelectedCategory(act.category);
                        setSessionTitle(act.label);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left border ${
                        isSelected
                          ? 'bg-emerald-900 text-white border-emerald-900 shadow-xs scale-[1.02]'
                          : 'bg-stone-50 hover:bg-stone-100/80 text-stone-700 border-stone-200/80'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-emerald-300' : 'text-stone-500'}`} />
                      <span className="truncate">{act.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Interactive Circular Progress Timer Display */}
          <div className="relative my-4 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <div className="w-64 h-64 sm:w-76 sm:h-76 relative flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  className={isZenMode ? "stroke-stone-800" : "stroke-stone-100"}
                  strokeWidth="6"
                  fill="none"
                />
                {/* Progress Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  stroke={currentCat.color}
                  strokeWidth="6"
                  strokeDasharray="276.46"
                  strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>

              {/* Inside Timer Center Info */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <span className={`text-[11px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full mb-1 ${
                  isZenMode ? 'bg-stone-800 text-stone-300' : 'bg-stone-100 text-stone-600'
                }`}>
                  {isRunning ? 'Screen Locked' : 'Ready to Reclaim'}
                </span>

                <div className={`font-num font-bold tracking-tight text-5xl sm:text-6xl ${
                  isZenMode ? 'text-stone-50' : 'text-stone-900'
                }`}>
                  {formatTimeDisplay(secondsRemaining)}
                </div>

                <div className={`text-xs mt-1 font-medium ${isZenMode ? 'text-stone-400' : 'text-stone-500'}`}>
                  {isRunning ? `${progressPercent}% complete` : `Target: ${targetMinutes} minutes`}
                </div>

                <div className="mt-2 text-xs font-semibold flex items-center gap-1.5" style={{ color: currentCat.color }}>
                  <span>{sessionTitle}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preset Buttons */}
          {!isRunning && !isZenMode && (
            <div className="w-full max-w-md my-4">
              <div className="flex items-center justify-between text-xs text-stone-500 font-semibold mb-2">
                <span>Choose Duration:</span>
                <span className="text-emerald-700 font-medium">Custom: {targetMinutes} min</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {PRESET_DURATIONS.map((preset) => (
                  <button
                    key={preset.minutes}
                    onClick={() => handleSelectPreset(preset.minutes)}
                    className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all border ${
                      targetMinutes === preset.minutes
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                        : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border-stone-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sound Atmosphere Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 my-3">
            <span className={`text-xs font-medium flex items-center gap-1 ${isZenMode ? 'text-stone-400' : 'text-stone-500'}`}>
              <Volume2 className="w-3.5 h-3.5" />
              <span>Ambient Sound:</span>
            </span>
            {(['none', 'rain', 'forest', 'bowl'] as const).map((sound) => (
              <button
                key={sound}
                onClick={() => setAmbientSound(sound)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${
                  ambientSound === sound
                    ? isZenMode
                      ? 'bg-emerald-700 text-white'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold'
                    : isZenMode
                      ? 'bg-stone-800 text-stone-400 hover:text-stone-200'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {sound === 'none' ? 'Silent' : sound === 'bowl' ? 'Tibetan Bowl' : `${sound} Sound`}
              </button>
            ))}
          </div>

          {/* Action Control Buttons */}
          <div className="flex items-center justify-center flex-wrap gap-3 mt-4">
            {!isRunning ? (
              <button
                onClick={handleStartTimer}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white font-semibold text-sm shadow-md hover:shadow-lg hover:from-emerald-700 hover:to-teal-800 transition-all active:scale-95 ring-2 ring-emerald-600/30"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Begin Screen-Free Time</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handlePauseTimer}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-stone-800 text-white font-semibold text-sm hover:bg-stone-700 transition-all active:scale-95"
                >
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Pause</span>
                </button>
                <button
                  onClick={handleFinishEarly}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-700 text-white font-semibold text-sm hover:bg-emerald-600 transition-all active:scale-95 shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Complete & Reuse</span>
                </button>
              </>
            )}

            {secondsRemaining !== targetMinutes * 60 && !isRunning && (
              <button
                onClick={handleResetTimer}
                className={`p-3 rounded-2xl border transition-colors ${
                  isZenMode 
                    ? 'border-stone-800 text-stone-400 hover:text-white hover:bg-stone-900' 
                    : 'border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            {!isZenMode && (
              <button
                onClick={() => setIsZenMode(true)}
                className="flex items-center gap-1.5 px-3.5 py-3 rounded-2xl border border-stone-200 text-stone-600 hover:bg-stone-100 text-xs font-semibold transition-colors"
                title="Open distraction-free Zen mode"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Zen Mode</span>
              </button>
            )}
          </div>

          {/* Mindful Breathing Prompt during running */}
          {isRunning && (
            <div className={`mt-6 p-3.5 rounded-2xl text-xs max-w-md animate-pulse ${
              isZenMode ? 'bg-stone-900/80 text-stone-400 border border-stone-800' : 'bg-emerald-50 text-emerald-900 border border-emerald-100'
            }`}>
              🌱 Place your phone facedown or in another room. Inhale deeply... Exhale the digital noise. Your mind is reclaiming real focus.
            </div>
          )}
        </div>
      </div>

      {/* Motivational Swap Highlights */}
      {!isZenMode && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            onClick={() => onNavigateToTab('swap')}
            className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:border-emerald-300 hover:shadow-sm cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">📖</span>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Swap 1
              </span>
            </div>
            <h4 className="font-bold text-stone-900 text-sm mb-1 group-hover:text-emerald-800 transition-colors">
              30 min less Instagram
            </h4>
            <div className="flex items-center gap-2 text-stone-600 text-xs font-medium">
              <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>30 min reading a physical book (≈ 20 pages)</span>
            </div>
          </div>

          <div 
            onClick={() => onNavigateToTab('swap')}
            className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:border-orange-300 hover:shadow-sm cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🏋️</span>
              <span className="text-xs font-semibold text-orange-800 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                Swap 2
              </span>
            </div>
            <h4 className="font-bold text-stone-900 text-sm mb-1 group-hover:text-orange-800 transition-colors">
              1 hour less YouTube
            </h4>
            <div className="flex items-center gap-2 text-stone-600 text-xs font-medium">
              <ArrowRight className="w-3.5 h-3.5 text-orange-600 shrink-0" />
              <span>1 solid gym workout session (burn 450 kcal)</span>
            </div>
          </div>

          <div 
            onClick={() => onNavigateToTab('swap')}
            className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:border-purple-300 hover:shadow-sm cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">👥</span>
              <span className="text-xs font-semibold text-purple-800 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                Swap 3
              </span>
            </div>
            <h4 className="font-bold text-stone-900 text-sm mb-1 group-hover:text-purple-800 transition-colors">
              2 hours less screen time
            </h4>
            <div className="flex items-center gap-2 text-stone-600 text-xs font-medium">
              <ArrowRight className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span>2 hours quality dinner with real friends</span>
            </div>
          </div>
        </div>
      )}

      {/* Completion & Reclaim Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Time Reclaimed!
              </span>
              <h3 className="font-display font-bold text-2xl text-stone-900 mt-2">
                You saved {formatMinutes(completedMinutes)} of screen time!
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Record what offline activity you invested this reclaimed time into:
              </p>
            </div>

            <div className="space-y-4">
              {/* Activity Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Offline Activity Title
                </label>
                <input
                  type="text"
                  value={sessionTitle}
                  onChange={(e) => setSessionTitle(e.target.value)}
                  placeholder="e.g. Read 20 pages of Dune, Dumbbell circuit"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>

              {/* Swapped App */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  What screen distraction did you substitute?
                </label>
                <select
                  value={swappedApp}
                  onChange={(e) => setSwappedApp(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 bg-white"
                >
                  <option value="Instagram">Instagram Feed & Stories</option>
                  <option value="YouTube">YouTube Videos & Shorts</option>
                  <option value="TikTok">TikTok Endless Scroll</option>
                  <option value="Twitter/X">Twitter / X Timeline</option>
                  <option value="Reddit">Reddit Threads</option>
                  <option value="News Feed">Doomscrolling News</option>
                  <option value="General Screen Time">General Screen Time</option>
                </select>
              </div>

              {/* Reflection Note */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  How did it feel offline? (Optional reflection)
                </label>
                <textarea
                  value={reflectionNote}
                  onChange={(e) => setReflectionNote(e.target.value)}
                  rows={2}
                  placeholder="e.g. My mind felt so calm, finished chapter 3 without any notification interruptions."
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCompletionModal(false)}
                  className="w-1/3 py-2.5 px-4 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold transition-colors"
                >
                  Skip
                </button>
                <button
                  type="button"
                  onClick={handleSaveToActivityLog}
                  className="w-2/3 py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md transition-all active:scale-98"
                >
                  Save to Activity Log
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Copyright Notice for Tab 1 (Screen free timer) */}
      {!isZenMode && <CopyrightNotice />}
    </div>
  );
};
