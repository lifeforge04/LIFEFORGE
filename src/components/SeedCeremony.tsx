import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Sprout } from 'lucide-react';

interface SeedCeremonyProps {
  onPlantComplete: () => void;
  onCancel?: () => void;
  canCancel?: boolean;
}

export const SeedCeremony: React.FC<SeedCeremonyProps> = ({
  onPlantComplete,
  onCancel,
  canCancel = false,
}) => {
  const [phase, setPhase] = useState<'hovering' | 'dropping' | 'planted'>('hovering');

  const handleDrop = () => {
    if (phase !== 'hovering') return;
    setPhase('dropping');

    // Simulate physics drop, soil impact and sprout
    setTimeout(() => {
      setPhase('planted');
      setTimeout(() => {
        onPlantComplete();
      }, 1600);
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl select-none">
      {/* Background celestial particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-amber-400"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.4, 0.8],
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 2.5 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-lg text-center flex flex-col items-center">
        {/* Title & Lore */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            LIFEFORGE AWAKENING CEREMONY
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-['Fraunces',serif] text-slate-100 tracking-tight">
            Plant Your Seed of Potential
          </h1>
          <p className="text-sm text-slate-300 max-w-md mt-2 leading-relaxed">
            Your Life is a Living World. In LifeForge, fake checklists mean nothing.
            Drop your celestial seed into the soil — only genuine daily habits will physically grow its branches.
          </p>
        </motion.div>

        {/* ================= SEED & SOIL STAGE ================= */}
        <div className="relative w-80 h-72 flex flex-col items-center justify-between mb-8">
          {/* Glowing Aura Rings */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-amber-500/20 blur-2xl animate-pulse" />

          {/* Golden Seed Object */}
          <div className="relative z-20 w-full h-44 flex items-center justify-center">
            {phase === 'hovering' && (
              <motion.div
                animate={{
                  y: [-10, 8, -10],
                  rotate: [-4, 4, -4],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                onClick={handleDrop}
                className="cursor-pointer group flex flex-col items-center"
              >
                {/* Seed Sphere */}
                <div className="relative w-16 h-22 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-t from-amber-600 via-amber-400 to-yellow-200 shadow-[0_0_35px_rgba(245,158,11,0.85)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-6 h-10 rounded-full bg-yellow-100/50 blur-[2px]" />
                  {/* Magic rune glint */}
                  <span className="absolute text-amber-950 font-bold text-xs opacity-75">✦</span>
                </div>
                <span className="mt-3 text-xs font-bold text-amber-300/80 group-hover:text-amber-200">
                  Tap Seed to Release
                </span>
              </motion.div>
            )}

            {phase === 'dropping' && (
              <motion.div
                initial={{ y: 0, scale: 1 }}
                animate={{ y: 130, scale: 0.9 }}
                transition={{ duration: 0.9, ease: [0.55, 0.055, 0.675, 0.19] }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-22 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-t from-amber-600 via-amber-400 to-yellow-200 shadow-[0_0_45px_#fbbf24] flex items-center justify-center">
                  <div className="w-6 h-10 rounded-full bg-yellow-100/70 blur-[1px]" />
                </div>
                {/* Particle streak tail */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 60 }}
                  className="w-1 bg-gradient-to-t from-amber-400 to-transparent blur-[1px]"
                />
              </motion.div>
            )}

            {phase === 'planted' && (
              <motion.div
                initial={{ scale: 0.9, y: 130 }}
                animate={{ scale: 1, y: 125 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="flex flex-col items-center"
              >
                {/* Dormant Seed Nestled in Soil without Instant Roots */}
                <div className="relative flex flex-col items-center">
                  <div className="w-14 h-18 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-t from-amber-700 via-amber-500 to-yellow-300 shadow-[0_0_25px_rgba(245,158,11,0.6)] flex items-center justify-center">
                    <div className="w-5 h-8 rounded-full bg-yellow-100/60 blur-[1px]" />
                    <span className="absolute text-amber-950 font-bold text-[10px] opacity-80">✦</span>
                  </div>
                  <motion.div
                    animate={{ opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-4 rounded-full bg-amber-400/30 blur-sm -mt-1"
                  />
                  <span className="text-xs font-mono font-bold text-amber-300 mt-2">
                    🌱 Seed Nestled in Fertile Soil
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* ================= SOIL MOUND & PLANTER TRAY ================= */}
          <div className="relative w-72 flex flex-col items-center">
            {/* Impact Shockwave Ring */}
            {phase === 'planted' && (
              <motion.div
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute -top-4 w-36 h-12 rounded-full border-2 border-emerald-400/80 shadow-[0_0_25px_#34d399]"
              />
            )}

            {/* Earth Impact Dust Burst */}
            {phase === 'planted' && (
              <div className="absolute -top-8 flex gap-4">
                {[-30, -15, 0, 15, 30].map((deg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ y: 0, opacity: 1, scale: 0.6 }}
                    animate={{ y: -35, opacity: 0, scale: 1.3 }}
                    transition={{ duration: 0.8, delay: idx * 0.05 }}
                    className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_10px_#f59e0b]"
                    style={{ transform: `rotate(${deg}deg)` }}
                  />
                ))}
              </div>
            )}

            {/* Living Moss Mound */}
            <svg viewBox="0 0 300 80" className="w-full h-16 drop-shadow-xl overflow-visible">
              <path d="M 20,60 Q 150,10 280,60 Z" fill="#14532d" stroke="#166534" strokeWidth="2.5" />
              <ellipse cx="150" cy="62" rx="135" ry="12" fill="#1e293b" stroke="#475569" strokeWidth="2" />
              {/* Planter Lip */}
              <rect x="30" y="65" width="240" height="12" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Action Button */}
        {phase === 'hovering' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDrop}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-sm tracking-wide shadow-[0_0_30px_rgba(245,158,11,0.6)] flex items-center gap-2.5 hover:shadow-[0_0_45px_rgba(245,158,11,0.85)] transition-shadow cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Drop Seed into Fertile Soil</span>
          </motion.button>
        )}

        {phase === 'dropping' && (
          <div className="flex items-center gap-2 text-amber-300 font-mono text-xs animate-pulse">
            <span>✨ Seed descending into living earth...</span>
          </div>
        )}

        {phase === 'planted' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-amber-200 font-bold text-sm flex flex-col items-center gap-1"
          >
            <span>🌱 Seed nestled in fertile earth!</span>
            <span className="text-xs font-normal text-slate-300 max-w-sm">
              Roots do not appear immediately — water and complete real daily tasks to germinate and grow your plant naturally.
            </span>
          </motion.div>
        )}

        {canCancel && phase === 'hovering' && (
          <button
            onClick={onCancel}
            className="mt-4 text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer"
          >
            Return to Sanctuary
          </button>
        )}
      </div>
    </div>
  );
};
