import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, X, Sparkles, Clock, Target } from 'lucide-react';
import { AttributeType, Task } from '../../types';
import { ATTRIBUTE_CONFIG } from '../../utils/gameEngine';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: Omit<Task, 'id' | 'completed'>) => void;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({ isOpen, onClose, onCreateTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attribute, setAttribute] = useState<AttributeType>('mind');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [durationMinutes, setDurationMinutes] = useState<number>(30);

  if (!isOpen) return null;

  // Non-linear reward calculation based on duration and difficulty
  const calculateRewards = (diff: 'easy' | 'medium' | 'hard', mins: number) => {
    const diffMultiplier = diff === 'hard' ? 1.4 : diff === 'medium' ? 1.0 : 0.7;
    const baseXP = Math.round((mins * 1.1 + 15) * diffMultiplier);
    const baseEssence = Math.round(baseXP * 0.38);
    return { xp: Math.max(15, baseXP), essence: Math.max(5, baseEssence) };
  };

  const rewards = calculateRewards(difficulty, durationMinutes);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreateTask({
      title: title.trim(),
      description: description.trim() || `Real-life ${ATTRIBUTE_CONFIG[attribute].name} quest.`,
      attribute,
      difficulty,
      durationMinutes,
      xpReward: rewards.xp,
      essenceReward: rewards.essence,
      isCustom: true,
    });

    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Plus className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Manifest New Quest</h3>
            <p className="text-xs text-slate-400">Define a real-world activity to shape your world</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Quest Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Read 30 pages of System Design, 5km Morning Run..."
              className="w-full text-xs p-2.5 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 text-slate-100 placeholder:text-slate-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description / Goal</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What specifically will you do or achieve?"
              className="w-full text-xs p-2.5 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 text-slate-100 placeholder:text-slate-600 outline-none"
            />
          </div>

          {/* Domain Attribute Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Life Domain</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.keys(ATTRIBUTE_CONFIG) as AttributeType[]).map((attr) => {
                const conf = ATTRIBUTE_CONFIG[attr];
                const isSelected = attribute === attr;
                return (
                  <button
                    key={attr}
                    type="button"
                    onClick={() => setAttribute(attr)}
                    className={`flex items-center gap-2 p-2 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-slate-800 border-amber-400 text-slate-100 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-base">{conf.icon}</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold">{conf.name}</span>
                      <span className="text-[9px] text-slate-500 truncate">{conf.districtName}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty & Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-slate-400" />
                Intensity / Effort
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full text-xs p-2 rounded-xl bg-slate-950/80 border border-slate-700 text-slate-100 outline-none"
              >
                <option value="easy">Easy (Routine habit)</option>
                <option value="medium">Medium (Moderate focus)</option>
                <option value="hard">Hard (Deep challenge)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Planned Duration
              </label>
              <select
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full text-xs p-2 rounded-xl bg-slate-950/80 border border-slate-700 text-slate-100 outline-none"
              >
                <option value={15}>15 Minutes</option>
                <option value={30}>30 Minutes</option>
                <option value={45}>45 Minutes</option>
                <option value={60}>60 Minutes</option>
                <option value={90}>90 Minutes</option>
              </select>
            </div>
          </div>

          {/* Dynamic Server Reward Preview */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold text-slate-200">Server Reward Preview</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">
                +{rewards.xp} XP
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                +{rewards.essence} Essence
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            >
              Add Quest to World
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
