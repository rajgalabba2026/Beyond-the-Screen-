import React, { useState } from 'react';
import { 
  ArrowRight, 
  BookOpen, 
  Dumbbell, 
  Users, 
  Sparkles, 
  Timer, 
  Flame, 
  Zap, 
  Check, 
  Footprints,
  Coffee,
  Heart,
  Palette
} from 'lucide-react';
import { formatMinutes } from '../utils/calculations';
import { CopyrightNotice } from './CopyrightNotice';

interface DigitalSwapViewProps {
  onStartSwapTimer: (minutes: number, title: string, category: string) => void;
  onQuickLogSwap: (minutes: number, title: string, app: string, category: string) => void;
}

export const DigitalSwapView: React.FC<DigitalSwapViewProps> = ({
  onStartSwapTimer,
  onQuickLogSwap
}) => {
  const [sliderMinutes, setSliderMinutes] = useState<number>(60);
  const [selectedApp, setSelectedApp] = useState<string>('instagram');

  // Signature Swap Cards based on user's exact specification
  const signatureSwaps = [
    {
      id: 'swap-1',
      screenApp: 'Instagram Reels & Feeds',
      screenTime: 30,
      iconEmoji: '📖',
      offlineTitle: '30 Minutes Reading a Physical Book',
      offlineCategory: 'reading',
      categoryTag: 'Literature & Calm',
      color: 'border-emerald-200 bg-emerald-50/50 hover:border-emerald-300',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      statLabel: '≈ 20 pages read',
      details: 'Swapping mindless story swipes for tactile paper pages lowers heart rate and expands vocabulary.',
      samplePrompt: 'Read 20 pages of fiction or nonfiction with phone in another room.'
    },
    {
      id: 'swap-2',
      screenApp: 'YouTube Shorts & Auto-play',
      screenTime: 60,
      iconEmoji: '🏋️',
      offlineTitle: '1 Hour at the Gym / Strength Workout',
      offlineCategory: 'fitness',
      categoryTag: 'Strength & Vitality',
      color: 'border-orange-200 bg-orange-50/50 hover:border-orange-300',
      badgeColor: 'bg-orange-100 text-orange-800',
      statLabel: '≈ 450 calories burned',
      details: 'Channel the time lost in recommended video rabbit holes into compound lifts, dumbbell presses, and endorphins.',
      samplePrompt: '1 hour solid lifting routine with water bottle and notebook.'
    },
    {
      id: 'swap-3',
      screenApp: 'Endless Mobile Screen Time',
      screenTime: 120,
      iconEmoji: '👥',
      offlineTitle: '2 Hours With Friends & Family',
      offlineCategory: 'social',
      categoryTag: 'Human Bond & Heart',
      color: 'border-purple-200 bg-purple-50/50 hover:border-purple-300',
      badgeColor: 'bg-purple-100 text-purple-800',
      statLabel: '≈ 120 min shared presence',
      details: 'Two hours of blue light replaced with shared laughs, heartfelt conversations, and lifelong memory building.',
      samplePrompt: 'Meet friends for coffee, board games, or dinner with phones tucked away.'
    }
  ];

  // App Temptation Swap Directory
  const appSwaps: Record<string, { appName: string; icon: string; offlineOptions: { title: string; category: string; mins: number; impact: string }[] }> = {
    instagram: {
      appName: 'Instagram',
      icon: '📸',
      offlineOptions: [
        { title: 'Read 20 pages of a physical book', category: 'reading', mins: 30, impact: 'Escape algorithmic comparison & rest your eyes' },
        { title: 'Sketch a plant or sketch from memory', category: 'hobbies', mins: 25, impact: 'Create real art instead of consuming filtered photos' },
        { title: 'Brisk 2km neighborhood jog', category: 'nature', mins: 20, impact: 'Boost mood endorphins naturally' }
      ]
    },
    youtube: {
      appName: 'YouTube',
      icon: '▶️',
      offlineOptions: [
        { title: '1-Hour gym session or calisthenics', category: 'fitness', mins: 60, impact: 'Build physical power and muscle tone' },
        { title: 'Cook a fresh 3-course dinner from scratch', category: 'hobbies', mins: 45, impact: 'Sensory gratification with real flavors' },
        { title: 'Learn acoustic guitar or piano chords', category: 'hobbies', mins: 40, impact: 'Build real-world tactile mastery' }
      ]
    },
    tiktok: {
      appName: 'TikTok',
      icon: '🎵',
      offlineOptions: [
        { title: 'Full-body stretch & foam rolling', category: 'mindfulness', mins: 20, impact: 'Un-kink neck & spine posture' },
        { title: 'Call a childhood friend or family member', category: 'social', mins: 25, impact: 'True emotional connection beats short clips' },
        { title: 'Handwritten gratitude journaling', category: 'mindfulness', mins: 15, impact: 'Dopamine baseline reset' }
      ]
    },
    reddit: {
      appName: 'Reddit & Twitter/X',
      icon: '💬',
      offlineOptions: [
        { title: 'Study physical textbook or foreign language', category: 'learning', mins: 45, impact: 'Deep knowledge retention without comment arguments' },
        { title: 'Casual walk without headphones', category: 'nature', mins: 30, impact: 'Observe real people and ambient outdoor sounds' },
        { title: 'Board game or puzzle session', category: 'sports', mins: 40, impact: 'Engage tactile problem solving' }
      ]
    }
  };

  // Dynamic slider equivalents
  const pagesRead = Math.round(sliderMinutes * 0.7);
  const workoutSets = Math.floor(sliderMinutes / 4);
  const stepsWalked = sliderMinutes * 105;
  const friendTalkTime = sliderMinutes;

  return (
    <div className="space-y-10">
      
      {/* Intro banner */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-950 to-stone-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-4 border border-emerald-500/30">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>The Screen-to-Life Currency</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white mb-3">
            Digital Swap Studio
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Every minute you refuse to surrender to a screen is a minute you can invest directly into the things that make life rich: physical books, athletic fitness, and deep conversations with people you love.
          </p>
        </div>
      </div>

      {/* The 3 Signature Swaps Requested */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display font-bold text-xl text-stone-900">
              Core Digital Swaps
            </h3>
            <p className="text-xs text-stone-500">
              Pick a proven substitute to trade empty screen time for tangible living.
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 hidden sm:inline">
            Direct 1:1 Life Trade
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {signatureSwaps.map((swap) => (
            <div
              key={swap.id}
              className={`rounded-3xl border p-6 flex flex-col justify-between transition-all duration-200 shadow-2xs hover:shadow-md ${swap.color}`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{swap.iconEmoji}</span>
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${swap.badgeColor}`}>
                    {swap.categoryTag}
                  </span>
                </div>

                {/* Swap Formula Equation */}
                <div className="space-y-2 mb-4">
                  <div className="text-xs font-medium text-stone-500 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400"></span>
                    <span>{swap.screenTime} min less {swap.screenApp}</span>
                  </div>

                  <div className="flex items-center gap-2 text-stone-400 text-xs font-bold pl-3">
                    <ArrowRight className="w-3.5 h-3.5 text-stone-600" />
                    <span className="text-stone-700">converts directly into</span>
                  </div>

                  <h4 className="font-bold text-lg text-stone-900 leading-snug">
                    {swap.offlineTitle}
                  </h4>
                </div>

                <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                  {swap.details}
                </p>

                <div className="p-2.5 rounded-xl bg-white/80 border border-stone-200/80 text-xs font-semibold text-stone-800 flex items-center justify-between mb-5">
                  <span className="text-stone-500 font-normal">Offline Return:</span>
                  <span className="font-num text-emerald-800">{swap.statLabel}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2 pt-2 border-t border-stone-200/60">
                <button
                  onClick={() => onStartSwapTimer(swap.screenTime, swap.offlineTitle, swap.offlineCategory)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all shadow-xs"
                >
                  <Timer className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Start {swap.screenTime}-Min Swap Timer</span>
                </button>

                <button
                  onClick={() => onQuickLogSwap(swap.screenTime, swap.offlineTitle, swap.screenApp, swap.offlineCategory)}
                  className="w-full py-2 px-3 rounded-xl border border-stone-300 hover:bg-white text-stone-700 text-xs font-medium transition-colors"
                >
                  Already did this? Quick Log
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Time Swap Calculator */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Interactive Time Reclaim Calculator
            </span>
            <h3 className="font-display font-bold text-2xl text-stone-900 mt-2">
              What if you cut screen time by {formatMinutes(sliderMinutes)} today?
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Drag the slider to see what you could achieve offline instead of scrolling.
            </p>
          </div>

          {/* Slider */}
          <div className="my-8">
            <input
              type="range"
              min="15"
              max="180"
              step="15"
              value={sliderMinutes}
              onChange={(e) => setSliderMinutes(Number(e.target.value))}
              className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-800"
            />
            <div className="flex justify-between text-xs text-stone-400 font-num mt-2 font-medium">
              <span>15 min</span>
              <span>30 min</span>
              <span>1 hour</span>
              <span>1 hr 30m</span>
              <span>2 hours</span>
              <span>3 hours</span>
            </div>
          </div>

          {/* Reclaimed Achievements Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
              <BookOpen className="w-5 h-5 text-emerald-700 mx-auto mb-1.5" />
              <div className="font-num font-bold text-lg text-emerald-900">{pagesRead} pages</div>
              <div className="text-[11px] text-emerald-700">of physical book read</div>
            </div>

            <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-100 text-center">
              <Dumbbell className="w-5 h-5 text-orange-700 mx-auto mb-1.5" />
              <div className="font-num font-bold text-lg text-orange-900">{workoutSets} sets</div>
              <div className="text-[11px] text-orange-700">of gym lifting or reps</div>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 text-center">
              <Footprints className="w-5 h-5 text-teal-700 mx-auto mb-1.5" />
              <div className="font-num font-bold text-lg text-teal-900">{stepsWalked.toLocaleString()}</div>
              <div className="text-[11px] text-teal-700">fresh air walking steps</div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 text-center">
              <Users className="w-5 h-5 text-purple-700 mx-auto mb-1.5" />
              <div className="font-num font-bold text-lg text-purple-900">{friendTalkTime} min</div>
              <div className="text-[11px] text-purple-700">undivided friend catchup</div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => onStartSwapTimer(sliderMinutes, `${formatMinutes(sliderMinutes)} Offline Life Reclaim`, 'reading')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold shadow-md transition-all active:scale-95"
            >
              <Timer className="w-4 h-4 text-emerald-300" />
              <span>Launch {formatMinutes(sliderMinutes)} Screen-Free Timer</span>
            </button>
          </div>
        </div>
      </div>

      {/* App Temptation Breaker */}
      <div className="bg-stone-50 rounded-3xl border border-stone-200/90 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-display font-bold text-xl text-stone-900">
              App Temptation Breaker
            </h3>
            <p className="text-xs text-stone-500">
              Feeling the urge to open a distracting app? Pick it below and take an instant healthy offline exit.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-stone-200">
            {Object.keys(appSwaps).map((appKey) => (
              <button
                key={appKey}
                onClick={() => setSelectedApp(appKey)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  selectedApp === appKey
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {appSwaps[appKey].appName}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {appSwaps[selectedApp].offlineOptions.map((opt, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-stone-200/80 flex flex-col justify-between shadow-2xs hover:border-emerald-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-num font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {opt.mins} min
                  </span>
                  <span className="text-[11px] text-stone-400 capitalize">{opt.category}</span>
                </div>
                <h5 className="font-bold text-sm text-stone-900 mb-1">
                  {opt.title}
                </h5>
                <p className="text-xs text-stone-500 mb-3">
                  {opt.impact}
                </p>
              </div>

              <button
                onClick={() => onStartSwapTimer(opt.mins, opt.title, opt.category)}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-100 hover:bg-emerald-800 hover:text-white text-stone-700 text-xs font-semibold transition-all group"
              >
                <span>Swap Now</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-300 transition-colors" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright Notice for Tab 2 (Digital Swap) */}
      <CopyrightNotice />
    </div>
  );
};
