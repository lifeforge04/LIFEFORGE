import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Flame, ShieldAlert, ShieldCheck, X, Clock, Award, Sparkles, ChevronRight } from 'lucide-react';
import { DomainType } from './SanctuaryBonsai';

interface StreakDrawerProps {
  streakDays: number;
  isProtectedToday: boolean;
  todayCompletedCount: number;
  onClose: () => void;
  onOpenHabitModal: (domain: DomainType) => void;
}

export const StreakDrawer: React.FC<StreakDrawerProps> = ({
  streakDays,
  isProtectedToday,
  todayCompletedCount,
  onClose,
  onOpenHabitModal,
}) => {
  // Real-time countdown to local midnight
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 6,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = Math.max(0, midnight.getTime() - now.getTime());

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDigits = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl select-none">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg rounded-3xl bg-slate-900/95 border border-white/15 p-6 shadow-2xl overflow-hidden text-slate-100"
      >
        {/* Rising fiery background embers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-orange-500 blur-[1px]"
              style={{
                left: `${10 + (i * 8)}%`,
                bottom: '-10px',
              }}
              animate={{
                y: [-20, -320],
                opacity: [1, 0],
                scale: [1, 0.4],
              }}
              transition={{
                duration: 2.5 + (i % 3),
                repeat: Infinity,
                delay: i * 0.25,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-100 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Flame Icon */}
        <div className="flex flex-col items-center text-center mt-2 mb-6">
          <div className="relative mb-3">
            {/* Pulsing flame corona */}
            <div
              className={`absolute inset-0 rounded-full blur-2xl animate-pulse ${
                isProtectedToday ? 'bg-emerald-500/30' : 'bg-orange-600/40'
              }`}
            />
            <div
              className={`w-20 h-20 rounded-2xl flex items-center justify-center border shadow-xl relative ${
                isProtectedToday
                  ? 'bg-gradient-to-tr from-emerald-950 to-emerald-900/80 border-emerald-500/60 shadow-emerald-500/20'
                  : 'bg-gradient-to-tr from-orange-950 to-amber-900/80 border-orange-500/60 shadow-orange-500/30'
              }`}
            >
              <Flame
                className={`w-12 h-12 ${
                  isProtectedToday
                    ? 'text-emerald-400 drop-shadow-[0_0_12px_#34d399]'
                    : 'text-orange-400 drop-shadow-[0_0_15px_#f97316] animate-bounce'
                }`}
              />
            </div>
            {/* Day badge */}
            <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black font-mono shadow-md">
              {streakDays}d
            </span>
          </div>

          <h2 className="text-2xl font-black font-['Fraunces',serif] tracking-tight">
            {streakDays}-Day LifeForge Flame
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            Consistency is your supernatural power. Missing a day causes the flame to extinguish and your tree to freeze in time.
          </p>
        </div>

        {/* ================= SNAPCHAT FOMO URGENCY CARD ================= */}
        <div
          className={`p-4 rounded-2xl border mb-6 relative overflow-hidden transition-all ${
            isProtectedToday
              ? 'bg-emerald-950/40 border-emerald-500/40'
              : 'bg-gradient-to-r from-orange-950/70 via-red-950/50 to-orange-950/70 border-red-500/60 shadow-[0_0_25px_rgba(239,68,68,0.2)]'
          }`}
        >
          <div className="flex items-start gap-3">
            {isProtectedToday ? (
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <ShieldAlert className="w-6 h-6 text-red-400 shrink-0 mt-0.5 animate-pulse" />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3
                  className={`text-sm font-bold tracking-wide uppercase font-mono ${
                    isProtectedToday ? 'text-emerald-300' : 'text-red-400'
                  }`}
                >
                  {isProtectedToday ? 'Streak Protected for Today!' : '⚠️ Streak at Risk — Expiring Soon!'}
                </h3>
                {!isProtectedToday && (
                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                    <Clock className="w-3 h-3" />
                    <span>
                      {formatDigits(timeLeft.hours)}:{formatDigits(timeLeft.minutes)}:{formatDigits(timeLeft.seconds)}
                    </span>
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {isProtectedToday
                  ? `You submitted verified photo proof today (${todayCompletedCount}/4 disciplines). Your flame burns hot and bright until tomorrow!`
                  : `You have NOT verified any discipline yet today. Submit real proof of study, gym, code, or social connection before midnight or your ${streakDays}-day streak resets to zero!`}
              </p>
            </div>
          </div>
        </div>

        {/* ================= MILESTONE LADDER ================= */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            <span>Discipline Milestones</span>
            <span className="text-amber-400 font-mono">Next at 7 Days</span>
          </div>

          <div className="space-y-2">
            {[
              {
                day: 3,
                title: 'Ember Spark',
                reward: '+10% XP Multiplier on all habits',
                unlocked: streakDays >= 3,
              },
              {
                day: 7,
                title: 'Blazing Forge',
                reward: 'Golden Bonsai Pot & Solar Corona',
                unlocked: streakDays >= 7,
              },
              {
                day: 14,
                title: 'Unyielding Will',
                reward: 'Luminous Cherry Blossom Canopy',
                unlocked: streakDays >= 14,
              },
              {
                day: 30,
                title: 'Solar Forge Master',
                reward: 'Mythic Celestial Floating Island',
                unlocked: streakDays >= 30,
              },
            ].map((m) => (
              <div
                key={m.day}
                className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${
                  m.unlocked
                    ? 'bg-slate-800/80 border-amber-500/40 text-slate-200'
                    : 'bg-slate-900/40 border-white/5 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${
                      m.unlocked
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {m.day}d
                  </div>
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <span>{m.title}</span>
                      {m.unlocked && <Sparkles className="w-3 h-3 text-amber-400" />}
                    </div>
                    <div className="text-[11px] text-slate-400">{m.reward}</div>
                  </div>
                </div>

                <span className="text-[10px] font-mono uppercase font-bold">
                  {m.unlocked ? (
                    <span className="text-emerald-400">Claimed</span>
                  ) : (
                    <span className="text-slate-500">Locked</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action to Verify Habit */}
        {!isProtectedToday && (
          <div className="pt-2 border-t border-white/10">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
              Quick Verify Proof to Save Streak:
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onOpenHabitModal('body')}
                className="p-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-500/40 text-rose-200 text-xs font-bold flex items-center justify-between cursor-pointer"
              >
                <span>🏋️ Gym / Workout</span>
                <ChevronRight className="w-4 h-4 text-rose-400" />
              </button>
              <button
                onClick={() => onOpenHabitModal('mind')}
                className="p-2.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-500/40 text-blue-200 text-xs font-bold flex items-center justify-between cursor-pointer"
              >
                <span>📖 Study / Notes</span>
                <ChevronRight className="w-4 h-4 text-blue-400" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
