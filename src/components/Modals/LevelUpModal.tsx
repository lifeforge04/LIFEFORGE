import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, ArrowRight } from 'lucide-react';
import { WorldMilestone } from '../../types';
import { WORLD_MILESTONES } from '../../utils/gameEngine';

interface LevelUpModalProps {
  level: number;
  isOpen: boolean;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({ level, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Fire confetti celebratory burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#38bdf8', '#10b981', '#ef4444', '#a855f7'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Find corresponding milestone if exists
  const milestone =
    WORLD_MILESTONES.find((m) => m.level === level) || {
      level,
      title: `Standing Tier ${level}`,
      description: 'Your world responds to consistent real-life discipline, growing deeper roots and vibrant greenery.',
      unlockedVisual: 'Expanded World Flora & Brighter Skies',
      icon: '🌿',
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-400/80 rounded-3xl shadow-[0_0_50px_rgba(245,158,11,0.35)] p-6 text-center relative overflow-hidden"
      >
        {/* Divine Ray Behind Badge */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-amber-500/20 to-transparent pointer-events-none" />

        {/* Milestone Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-4xl shadow-xl shadow-amber-500/30 mb-4 border-2 border-white/50"
        >
          {milestone.icon}
        </motion.div>

        <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400">
          World Milestone Reached
        </span>

        <h2 className="text-3xl font-['Fraunces',serif] font-bold text-slate-100 mt-1 mb-2">
          Standing Level {level}
        </h2>

        <h3 className="text-base font-semibold text-amber-300 mb-2">{milestone.title}</h3>

        <p className="text-xs text-slate-300 leading-relaxed mb-5 max-w-sm mx-auto">
          {milestone.description}
        </p>

        {/* Physical World Change Callout */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-left mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Physical World Transformation</span>
          </div>
          <p className="text-xs text-slate-200">
            A new structure has risen:{' '}
            <strong className="text-amber-200">{milestone.unlockedVisual}</strong>
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 hover:from-amber-400 hover:to-yellow-200 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>Witness the Evolved Realm</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
};
