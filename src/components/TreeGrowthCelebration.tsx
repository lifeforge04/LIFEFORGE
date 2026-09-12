import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  CheckCircle2,
  Sprout,
  ArrowUpRight,
  TrendingUp,
  X,
  Flame
} from 'lucide-react';
import { DomainType, VerificationResult } from '../types';

interface TreeGrowthCelebrationProps {
  growthEvent: {
    domain: DomainType;
    result: VerificationResult;
    imageUrl: string;
    oldXP: number;
    newXP: number;
    oldLeaves: number;
    newLeaves: number;
    branchName: string;
  } | null;
  onDismiss: () => void;
}

export const TreeGrowthCelebration: React.FC<TreeGrowthCelebrationProps> = ({
  growthEvent,
  onDismiss,
}) => {
  useEffect(() => {
    if (!growthEvent) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 7000);
    return () => clearTimeout(timer);
  }, [growthEvent, onDismiss]);

  if (!growthEvent) return null;

  const domainColors: Record<DomainType, { border: string; bg: string; text: string; glow: string }> = {
    mind: {
      border: 'border-blue-400',
      bg: 'from-blue-950/95 via-slate-900/95 to-blue-950/95',
      text: 'text-blue-300',
      glow: 'rgba(96, 165, 250, 0.4)',
    },
    body: {
      border: 'border-rose-400',
      bg: 'from-rose-950/95 via-slate-900/95 to-rose-950/95',
      text: 'text-rose-300',
      glow: 'rgba(248, 113, 113, 0.4)',
    },
    craft: {
      border: 'border-amber-400',
      bg: 'from-amber-950/95 via-slate-900/95 to-amber-950/95',
      text: 'text-amber-300',
      glow: 'rgba(251, 191, 36, 0.4)',
    },
    social: {
      border: 'border-orange-400',
      bg: 'from-orange-950/95 via-slate-900/95 to-orange-950/95',
      text: 'text-orange-300',
      glow: 'rgba(251, 146, 60, 0.4)',
    },
  };

  const style = domainColors[growthEvent.domain];

  return (
    <div className="fixed top-20 right-4 md:right-8 z-40 max-w-md w-[calc(100%-32px)] pointer-events-auto">
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -15, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className={`rounded-3xl border-2 ${style.border} bg-gradient-to-br ${style.bg} p-4 shadow-2xl backdrop-blur-xl relative overflow-hidden`}
        style={{
          boxShadow: `0 0 30px ${style.glow}, 0 20px 40px rgba(0,0,0,0.6)`,
        }}
      >
        {/* Shimmer line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse" />

        {/* Close Button */}
        <button
          onClick={onDismiss}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-100 p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3.5">
          {/* Uploaded image thumbnail with verified checkmark badge */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/30 shadow-md bg-black">
              <img
                src={growthEvent.imageUrl}
                alt="Verified Proof"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg border-2 border-slate-900">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          {/* Growth Details */}
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-0.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Growth Verified!</span>
            </div>

            <h4 className="text-base font-black text-slate-100 leading-tight">
              {growthEvent.branchName} Expanded
            </h4>

            <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
              {growthEvent.result.reason}
            </p>

            {/* Growth Metrics Row */}
            <div className="mt-2.5 grid grid-cols-2 gap-2 bg-slate-950/60 rounded-xl p-2 border border-white/10 text-xs">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block">Branch Progress</span>
                <div className="font-bold text-slate-200 flex items-center gap-1">
                  <span>{growthEvent.oldXP} XP</span>
                  <span className="text-emerald-400 font-mono">&rarr; {growthEvent.newXP} XP</span>
                  <span className="text-[10px] text-emerald-300 font-bold">(+35)</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-400 block">Foliage Canopy</span>
                <div className="font-bold text-slate-200 flex items-center gap-1">
                  <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{growthEvent.newLeaves} Leaves</span>
                  {growthEvent.newLeaves > growthEvent.oldLeaves && (
                    <span className="text-[10px] text-emerald-300 font-mono font-bold">+1 Sprouted!</span>
                  )}
                </div>
              </div>
            </div>

            {/* Flame Protected Pill */}
            <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono font-bold text-amber-300">
              <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              <span>Daily Flame Protected • Tree Trunk Thickened</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
