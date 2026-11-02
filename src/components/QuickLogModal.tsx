import React, { useState } from 'react';
import { X, Sparkles, Clock, BookOpen } from 'lucide-react';
import { OfflineCategory, ActivityLog } from '../types';
import { CATEGORIES } from '../data/categories';
import { formatMinutes } from '../utils/calculations';

interface QuickLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (log: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
}

export const QuickLogModal: React.FC<QuickLogModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [title, setTitle] = useState<string>('Physical Reading');
  const [category, setCategory] = useState<OfflineCategory>('reading');
  const [durationMinutes, setDurationMinutes] = useState<number>(30);
  const [swappedFromApp, setSwappedFromApp] = useState<string>('Instagram');
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      category,
      durationMinutes,
      swappedFromApp,
      notes: notes.trim(),
      feeling: 'refreshed' as any
    });

    onClose();
  };

  const PRESETS = [15, 30, 45, 60, 90, 120];

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-xl text-stone-900">
              Record Reused Time
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Offline Activity *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Gym workout, Reading 25 pages, Walk with friend"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
            />
          </div>

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

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-stone-700">
                Duration: <strong className="font-num text-emerald-800">{formatMinutes(durationMinutes)}</strong>
              </label>
            </div>
            <div className="grid grid-cols-6 gap-1.5 mb-2">
              {PRESETS.map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setDurationMinutes(m)}
                  className={`py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                    durationMinutes === m
                      ? 'bg-emerald-800 text-white border-emerald-800'
                      : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border-stone-200'
                  }`}
                >
                  {m}m
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              What screen distraction did you substitute?
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
              <option value="Mobile Gaming">Mobile Gaming</option>
              <option value="Mindless Scrolling">Mindless Scrolling</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Notes (optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Left phone in airplane mode, felt very centered."
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
            />
          </div>

          <div className="flex items-center gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
            >
              Add to Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
