import React from 'react';
import { motion } from 'motion/react';

interface CelestialSkyProps {
  timeOfDay: 'day' | 'dusk' | 'night';
}

export const CelestialSky: React.FC<CelestialSkyProps> = ({ timeOfDay }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden transition-all duration-1000 ease-in-out">
      {/* Background Gradient Layers */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          timeOfDay === 'day' ? 'opacity-100' : 'opacity-0'
        } bg-gradient-to-b from-[#38bdf8] via-[#7dd3fc] to-[#e0f2fe]`}
      />

      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          timeOfDay === 'dusk' ? 'opacity-100' : 'opacity-0'
        } bg-gradient-to-b from-[#1e1b4b] via-[#831843] via-[#ea580c] to-[#fed7aa]`}
      />

      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          timeOfDay === 'night' ? 'opacity-100' : 'opacity-0'
        } bg-gradient-to-b from-[#020617] via-[#0b1329] to-[#0f172a]`}
      />

      {/* ================= DAY: RADIANT SUN & DRIFTING CLOUDS ================= */}
      {timeOfDay === 'day' && (
        <div className="absolute inset-0">
          {/* Sun Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute top-12 left-1/2 -translate-x-1/2 sm:left-24 sm:translate-x-0 w-36 h-36 flex items-center justify-center"
          >
            {/* Ambient Sunlight Glow */}
            <div className="absolute inset-0 rounded-full bg-amber-300/40 blur-3xl animate-pulse" />
            <div className="absolute -inset-8 rounded-full bg-yellow-400/25 blur-2xl" />

            {/* Rotating Solar Corona Rays */}
            <svg
              viewBox="0 0 200 200"
              className="w-48 h-48 absolute animate-[spin_40s_linear_infinite]"
            >
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
                <line
                  key={angle}
                  x1="100"
                  y1="25"
                  x2="100"
                  y2="5"
                  stroke="#fbbf24"
                  strokeWidth="4"
                  strokeLinecap="round"
                  transform={`rotate(${angle} 100 100)`}
                  opacity="0.8"
                />
              ))}
            </svg>

            {/* Glowing Sun Core */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-100 shadow-[0_0_50px_rgba(251,191,36,0.9)] flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100/60 blur-[2px]" />
            </div>
          </motion.div>

          {/* Drifting Translucent Clouds */}
          <motion.div
            initial={{ x: -200 }}
            animate={{ x: '100vw' }}
            transition={{ duration: 65, repeat: Infinity, ease: 'linear' }}
            className="absolute top-20 left-0 opacity-70"
          >
            <div className="w-56 h-16 bg-white/70 rounded-full blur-[3px] relative shadow-lg">
              <div className="w-24 h-24 bg-white/80 rounded-full absolute -top-8 left-10" />
              <div className="w-20 h-20 bg-white/75 rounded-full absolute -top-6 left-28" />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -150 }}
            animate={{ x: '100vw' }}
            transition={{ duration: 85, repeat: Infinity, ease: 'linear', delay: 25 }}
            className="absolute top-36 left-0 opacity-55"
          >
            <div className="w-44 h-12 bg-white/60 rounded-full blur-[3px] relative">
              <div className="w-18 h-18 bg-white/70 rounded-full absolute -top-6 left-8" />
              <div className="w-14 h-14 bg-white/65 rounded-full absolute -top-4 left-22" />
            </div>
          </motion.div>

          {/* Gentle Flying Bird Silhouettes */}
          <motion.div
            initial={{ x: -50, y: 120 }}
            animate={{ x: '110vw', y: 80 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
            className="absolute text-sky-800/40 text-xs font-mono font-bold tracking-widest"
          >
            v &nbsp; &nbsp; v &nbsp; v
          </motion.div>
        </div>
      )}

      {/* ================= SUNSET / DUSK: SINKING SUN & TWILIGHT FIREFLIES ================= */}
      {timeOfDay === 'dusk' && (
        <div className="absolute inset-0">
          {/* Sinking Sunset Sun */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute bottom-24 right-1/4 w-44 h-44 flex items-center justify-center pointer-events-none"
          >
            <div className="absolute inset-0 rounded-full bg-rose-500/35 blur-3xl" />
            <div className="w-28 h-28 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-rose-400 shadow-[0_0_60px_rgba(249,115,22,0.85)]" />
            {/* Horizon Refraction Glow */}
            <div className="w-80 h-16 bg-gradient-to-t from-amber-400/30 to-transparent blur-xl absolute bottom-0" />
          </motion.div>

          {/* Dusk Sunset Clouds */}
          <div className="absolute top-28 left-12 w-64 h-14 bg-rose-950/40 rounded-full blur-[2px]" />
          <div className="absolute top-44 right-16 w-80 h-16 bg-indigo-950/40 rounded-full blur-[3px]" />

          {/* Twilight Fireflies */}
          {[
            { top: '35%', left: '20%', delay: 0 },
            { top: '55%', left: '75%', delay: 1.2 },
            { top: '40%', left: '60%', delay: 0.7 },
            { top: '65%', left: '30%', delay: 2.1 },
            { top: '48%', left: '85%', delay: 1.8 },
            { top: '30%', left: '45%', delay: 2.5 },
          ].map((f, i) => (
            <motion.div
              key={`firefly-${i}`}
              style={{ top: f.top, left: f.left }}
              animate={{
                y: [-8, 8, -8],
                x: [-6, 6, -6],
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: 3 + (i % 2),
                repeat: Infinity,
                delay: f.delay,
                ease: 'easeInOut',
              }}
              className="absolute w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#fde047]"
            />
          ))}
        </div>
      )}

      {/* ================= NIGHT: MIDNIGHT STARS, MOON & SHOOTING STARS ================= */}
      {timeOfDay === 'night' && (
        <div className="absolute inset-0">
          {/* Twinkling Constellation Stars */}
          <div className="absolute inset-0">
            {[
              { t: '12%', l: '18%', s: 2, d: 1.8 },
              { t: '8%', l: '42%', s: 3, d: 2.4 },
              { t: '15%', l: '68%', s: 2, d: 1.5 },
              { t: '22%', l: '85%', s: 2.5, d: 3.1 },
              { t: '32%', l: '12%', s: 2, d: 2.0 },
              { t: '28%', l: '35%', s: 3.5, d: 1.2 },
              { t: '42%', l: '78%', s: 2, d: 2.7 },
              { t: '18%', l: '54%', s: 1.5, d: 1.9 },
              { t: '38%', l: '24%', s: 2.5, d: 2.2 },
              { t: '50%', l: '90%', s: 3, d: 1.7 },
              { t: '10%', l: '92%', s: 2, d: 2.9 },
              { t: '25%', l: '4%', s: 2.5, d: 2.1 },
              { t: '45%', l: '15%', s: 1.8, d: 1.4 },
              { t: '14%', l: '30%', s: 3, d: 2.6 },
              { t: '30%', l: '62%', s: 2, d: 3.3 },
            ].map((star, i) => (
              <motion.div
                key={`star-${i}`}
                style={{
                  top: star.t,
                  left: star.l,
                  width: star.s,
                  height: star.s,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.8, 1.4, 0.8],
                }}
                transition={{
                  duration: 2 + star.d,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: star.d,
                }}
                className="absolute rounded-full bg-white shadow-[0_0_8px_#ffffff]"
              />
            ))}
          </div>

          {/* Glowing Crescent / Silver Moon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute top-10 right-1/4 sm:right-28 w-32 h-32 flex items-center justify-center pointer-events-none"
          >
            {/* Lunar Aura Glow */}
            <div className="absolute inset-0 rounded-full bg-indigo-300/20 blur-2xl animate-pulse" />
            <div className="absolute -inset-6 rounded-full bg-blue-400/15 blur-3xl" />

            {/* Crescent Moon Visual */}
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-slate-200 via-indigo-100 to-amber-50 shadow-[0_0_35px_rgba(224,231,255,0.75)] overflow-hidden">
              {/* Moon craters */}
              <div className="absolute top-4 left-5 w-4 h-4 rounded-full bg-indigo-200/40" />
              <div className="absolute top-10 left-8 w-6 h-6 rounded-full bg-indigo-200/35" />
              <div className="absolute top-7 left-12 w-3 h-3 rounded-full bg-indigo-200/30" />
              {/* Shadow disc creating crescent depth */}
              <div className="absolute -top-1 -right-3 w-18 h-18 rounded-full bg-indigo-950/70 blur-[1px]" />
            </div>
          </motion.div>

          {/* Shooting Star Animation */}
          <motion.div
            initial={{ x: -100, y: -50, opacity: 0 }}
            animate={{
              x: [0, 450],
              y: [0, 260],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              repeatDelay: 9,
              ease: 'easeOut',
            }}
            className="absolute top-12 left-1/3 w-32 h-[2px] bg-gradient-to-r from-transparent via-cyan-200 to-white -rotate-30 shadow-[0_0_12px_#38bdf8]"
          />
        </div>
      )}
    </div>
  );
};
