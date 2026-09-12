import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Droplets } from 'lucide-react';
import { DomainType } from '../types';

interface WateringCanAnimationProps {
  isActive: boolean;
  targetDomain?: DomainType | null;
  onWateringComplete: () => void;
  domainLabel?: string;
}

interface WaterDrop {
  id: number;
  xOffset: number;
  delay: number;
  duration: number;
  size: number;
}

export const WateringCanAnimation: React.FC<WateringCanAnimationProps> = ({
  isActive,
  targetDomain = 'mind',
  onWateringComplete,
  domainLabel = 'Study & Mind',
}) => {
  const [phase, setPhase] = useState<'entering' | 'pouring' | 'absorbing' | 'done'>('entering');
  const [ripples, setRipples] = useState<number[]>([1, 2, 3]);

  // Generate water stream droplets
  const droplets: WaterDrop[] = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    xOffset: (Math.random() - 0.5) * 28,
    delay: (i * 0.08) % 0.8,
    duration: 0.5 + Math.random() * 0.25,
    size: 4 + Math.random() * 4,
  }));

  useEffect(() => {
    if (!isActive) {
      setPhase('entering');
      return;
    }

    // Step 1: Entering and positioning
    setPhase('entering');

    // Step 2: Tilting and pouring water
    const pourTimer = setTimeout(() => {
      setPhase('pouring');
    }, 450);

    // Step 3: Absorbing into soil
    const absorbTimer = setTimeout(() => {
      setPhase('absorbing');
    }, 2100);

    // Step 4: Completion trigger -> plant growth begins
    const completeTimer = setTimeout(() => {
      setPhase('done');
      onWateringComplete();
    }, 2800);

    return () => {
      clearTimeout(pourTimer);
      clearTimeout(absorbTimer);
      clearTimeout(completeTimer);
    };
  }, [isActive, onWateringComplete]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden flex items-center justify-center select-none">
      {/* Cinematic dimming spotlight behind the pouring scene */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]"
      />

      {/* Floating Status Notification Pill */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute top-24 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-slate-900/95 border border-sky-400/50 shadow-[0_0_30px_rgba(56,189,248,0.4)] backdrop-blur-xl flex items-center gap-2.5 z-50 text-xs font-bold text-sky-200"
      >
        <Droplets className="w-4 h-4 text-sky-400 animate-bounce" />
        <span>Nourishing {domainLabel} with Living Water...</span>
      </motion.div>

      {/* ================= WATERING CAN STAGE ================= */}
      <div className="relative w-full max-w-2xl h-[580px] flex items-center justify-center">
        {/* The Animated Watering Can */}
        <motion.div
          initial={{ x: 260, y: -180, rotate: 0, opacity: 0, scale: 0.8 }}
          animate={
            phase === 'entering'
              ? { x: 90, y: -70, rotate: -5, opacity: 1, scale: 1 }
              : phase === 'pouring'
              ? { x: 75, y: -65, rotate: -38, opacity: 1, scale: 1 }
              : phase === 'absorbing'
              ? { x: 100, y: -80, rotate: -10, opacity: 0.9, scale: 1 }
              : { x: 280, y: -200, rotate: 15, opacity: 0, scale: 0.7 }
          }
          transition={{
            duration: phase === 'pouring' ? 0.6 : 0.7,
            ease: phase === 'pouring' ? 'easeOut' : 'easeInOut',
          }}
          className="absolute z-40 origin-[80px_140px]"
          style={{ top: '130px', left: '260px' }}
        >
          {/* Detailed SVG Artisan Watering Can */}
          <svg
            width="220"
            height="180"
            viewBox="0 0 220 180"
            className="drop-shadow-[0_15px_25px_rgba(0,0,0,0.65)]"
          >
            <defs>
              {/* Metallic Sage & Bronze Gradients */}
              <linearGradient id="canBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="35%" stopColor="#0284c7" />
                <stop offset="70%" stopColor="#0369a1" />
                <stop offset="100%" stopColor="#0c4a6e" />
              </linearGradient>

              <linearGradient id="canAccentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#a16207" />
              </linearGradient>

              <linearGradient id="waterGleam" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
              </linearGradient>

              <filter id="waterGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Back Handle */}
            <path
              d="M 170,95 C 205,95 210,50 180,35 C 160,25 140,40 140,55"
              fill="none"
              stroke="#075985"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 170,95 C 205,95 210,50 180,35 C 160,25 140,40 140,55"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.7"
            />

            {/* Top Loop Carrying Handle */}
            <path
              d="M 90,45 C 90,15 150,15 150,45"
              fill="none"
              stroke="#0369a1"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M 90,45 C 90,15 150,15 150,45"
              fill="none"
              stroke="#7dd3fc"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Long Pouring Spout */}
            <path
              d="M 75,100 L 15,45 L 5,42 L 5,30 L 18,34 L 85,75 Z"
              fill="url(#canBodyGrad)"
              stroke="#0369a1"
              strokeWidth="2"
            />

            {/* Spout Rose / Sprinkler Head with Holes */}
            <g transform="translate(6, 36) rotate(-28)">
              <ellipse cx="0" cy="0" rx="14" ry="8" fill="url(#canAccentGrad)" stroke="#713f12" strokeWidth="1.5" />
              {/* Sprinkler perforated holes */}
              <circle cx="-5" cy="-2" r="1.5" fill="#451a03" />
              <circle cx="0" cy="-2" r="1.5" fill="#451a03" />
              <circle cx="5" cy="-2" r="1.5" fill="#451a03" />
              <circle cx="-3" cy="2" r="1.5" fill="#451a03" />
              <circle cx="3" cy="2" r="1.5" fill="#451a03" />
            </g>

            {/* Main Can Barrel */}
            <rect
              x="80"
              y="45"
              width="85"
              height="80"
              rx="16"
              fill="url(#canBodyGrad)"
              stroke="#0284c7"
              strokeWidth="2"
            />

            {/* Metallic Highlights & Brass Bands */}
            <path
              d="M 82,65 Q 122,70 163,65"
              fill="none"
              stroke="url(#canAccentGrad)"
              strokeWidth="3.5"
            />
            <path
              d="M 82,105 Q 122,110 163,105"
              fill="none"
              stroke="url(#canAccentGrad)"
              strokeWidth="3.5"
            />
            <path
              d="M 90,52 L 90,118"
              fill="none"
              stroke="#e0f2fe"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Golden Emblem on the Can Body */}
            <circle cx="122" cy="85" r="12" fill="url(#canAccentGrad)" stroke="#713f12" strokeWidth="1" />
            <text
              x="122"
              y="89"
              textAnchor="middle"
              fontSize="10"
              fontWeight="bold"
              fill="#451a03"
              fontFamily="serif"
            >
              ✦
            </text>
          </svg>
        </motion.div>

        {/* ================= WATER STREAM & POURING DROPLETS ================= */}
        {phase === 'pouring' && (
          <div className="absolute top-[200px] left-[265px] w-[140px] h-[210px] pointer-events-none z-30">
            {/* Continuous Primary Water Jet Stream */}
            <motion.svg
              width="130"
              height="210"
              viewBox="0 0 130 210"
              className="overflow-visible"
            >
              {/* Arcing water jet stream from spout to pot soil */}
              <motion.path
                d="M 12,10 Q 30,80 48,195"
                fill="none"
                stroke="url(#waterGleam)"
                strokeWidth="7"
                strokeLinecap="round"
                filter="url(#waterGlow)"
                initial={{ pathLength: 0, opacity: 0.3 }}
                animate={{ pathLength: 1, opacity: [0.85, 1, 0.85] }}
                transition={{
                  pathLength: { duration: 0.35, ease: 'easeOut' },
                  opacity: { repeat: Infinity, duration: 0.4 },
                }}
              />
              <motion.path
                d="M 10,12 Q 22,85 44,198"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35 }}
                opacity="0.9"
              />
              <motion.path
                d="M 18,12 Q 38,85 54,196"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.6"
              />
            </motion.svg>

            {/* Cascading individual droplets that fall with gravity */}
            {droplets.map((drop) => (
              <motion.div
                key={drop.id}
                className="absolute rounded-full bg-gradient-to-b from-white via-sky-200 to-sky-400 shadow-[0_0_8px_#38bdf8]"
                style={{
                  width: `${drop.size}px`,
                  height: `${drop.size * 1.6}px`,
                  left: `${20 + drop.xOffset}px`,
                  top: '15px',
                }}
                animate={{
                  y: [0, 185],
                  x: [0, drop.xOffset * 1.3],
                  opacity: [0, 1, 1, 0.3],
                  scale: [0.6, 1, 0.8],
                }}
                transition={{
                  duration: drop.duration,
                  repeat: Infinity,
                  delay: drop.delay,
                  ease: 'easeIn',
                }}
              />
            ))}
          </div>
        )}

        {/* ================= SOIL IMPACT, RIPPLES & HYDRATION GLOW ================= */}
        {(phase === 'pouring' || phase === 'absorbing') && (
          <div
            className="absolute pointer-events-none z-20 flex flex-col items-center justify-center"
            style={{ top: '390px', left: '290px', transform: 'translate(-50%, -50%)' }}
          >
            {/* Glowing Hydration Pool on Soil */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{
                scale: phase === 'absorbing' ? [1.2, 1.4, 0.9] : [1, 1.15, 1],
                opacity: phase === 'absorbing' ? [0.9, 0.5, 0] : 0.85,
              }}
              transition={{ duration: 1.2, repeat: phase === 'pouring' ? Infinity : 0 }}
              className="w-36 h-12 rounded-full bg-gradient-to-r from-sky-500/40 via-cyan-400/50 to-sky-500/40 blur-md border border-cyan-300/40 shadow-[0_0_25px_rgba(56,189,248,0.7)]"
            />

            {/* Concentric Water Impact Ripples */}
            {ripples.map((r) => (
              <motion.div
                key={r}
                className="absolute w-24 h-8 rounded-full border border-sky-300/70"
                initial={{ scale: 0.2, opacity: 0.9 }}
                animate={{ scale: 2.3, opacity: 0 }}
                transition={{
                  duration: 1.2,
                  repeat: phase === 'pouring' ? Infinity : 1,
                  delay: r * 0.35,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* Splashing Micro-Mist Droplets */}
            {[-25, -12, 0, 14, 26].map((deg, i) => (
              <motion.div
                key={`splash-${i}`}
                className="absolute w-1.5 h-1.5 rounded-full bg-sky-200 shadow-[0_0_6px_#38bdf8]"
                animate={{
                  y: [0, -28 - (i % 2) * 10],
                  x: [0, deg * 1.2],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.2],
                }}
                transition={{
                  duration: 0.55,
                  repeat: Infinity,
                  delay: i * 0.12,
                }}
              />
            ))}

            {/* Shimmering moisture absorption sparkles */}
            {phase === 'absorbing' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1.2 }}
                exit={{ opacity: 0 }}
                className="absolute -top-10 flex items-center gap-1 text-sky-200 font-mono text-[11px] font-bold"
              >
                <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" />
                <span>Moisture Absorbed • Sprouting Nourishment</span>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
