import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Sun, Moon, Sunrise, Sunset, Sparkles, CloudRain, Flame, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';
import { AttributeType, TimeOfDay, WeatherType, UserGameState } from '../../types';
import { ATTRIBUTE_CONFIG } from '../../utils/gameEngine';
import { WorldParticles } from './WorldParticles';
import {
  CentralLandmark,
  KnowledgeDistrictSVG,
  TechDistrictSVG,
  VitalityDistrictSVG,
  CommunityDistrictSVG,
  SanctuaryDistrictSVG,
  WorldPathways,
} from './WorldIllustrations';

interface FloatingFeedback {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  subtext?: string;
}

interface WorldMapProps {
  gameState: UserGameState;
  timeOfDay: TimeOfDay;
  weather: WeatherType;
  setTimeOfDay: (time: TimeOfDay) => void;
  setWeather: (weather: WeatherType) => void;
  onSelectDistrict: (attr: AttributeType) => void;
  floatingFeedbacks: FloatingFeedback[];
}

export const WorldMap: React.FC<WorldMapProps> = ({
  gameState,
  timeOfDay,
  weather,
  setTimeOfDay,
  setWeather,
  onSelectDistrict,
  floatingFeedbacks,
}) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<AttributeType | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Time of day skies
  const skyGradients: Record<TimeOfDay, string> = {
    dawn: 'from-[#1e1b2e] via-[#633b48] to-[#f97316]',
    day: 'from-[#0369a1] via-[#0284c7] to-[#38bdf8]',
    dusk: 'from-[#1e1b4b] via-[#701a75] to-[#ea580c]',
    night: 'from-[#050811] via-[#0b1329] to-[#1e293b]',
  };

  const sunMoonConfig: Record<TimeOfDay, { isSun: boolean; cx: number; cy: number; color: string; glow: string }> = {
    dawn: { isSun: true, cx: 320, cy: 110, color: '#fed7aa', glow: '#fb923c' },
    day: { isSun: true, cx: 500, cy: 75, color: '#fef08a', glow: '#facc15' },
    dusk: { isSun: true, cx: 680, cy: 110, color: '#fdba74', glow: '#ea580c' },
    night: { isSun: false, cx: 500, cy: 80, color: '#f1f5f9', glow: '#cbd5e1' },
  };

  const currentSunMoon = sunMoonConfig[timeOfDay];

  // District positions for overlay tags
  const districtBadges: Record<AttributeType, { x: string; y: string; align: string }> = {
    balance: { x: '26%', y: '33%', align: 'items-start' },
    mind: { x: '71%', y: '32%', align: 'items-end' },
    craft: { x: '78%', y: '58%', align: 'items-end' },
    body: { x: '67%', y: '78%', align: 'items-end' },
    social: { x: '32%', y: '78%', align: 'items-start' },
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(1.4, Math.max(0.85, Number((prev + delta).toFixed(2)))));
  };

  return (
    <div
      id="living-world-canvas-container"
      className="relative w-full h-full min-h-[580px] lg:min-h-[720px] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-950 select-none group"
      aria-label="Interactive Living World of Vitale"
    >
      {/* Sky Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${skyGradients[timeOfDay]} transition-colors duration-1000`}
      />

      {/* Atmospheric Particles (Fireflies, Blossoms, Rain, Aurora) */}
      <WorldParticles weather={weather} timeOfDay={timeOfDay} streak={gameState.streak} />

      {/* Interactive World Map SVG */}
      <div
        className="w-full h-full flex items-center justify-center transition-transform duration-500 ease-out"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <svg
          viewBox="0 0 1000 700"
          className="w-full h-full max-h-[850px] object-contain drop-shadow-md"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Sun / Moon Radial Glow */}
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={currentSunMoon.color} stopOpacity="1" />
              <stop offset="40%" stopColor={currentSunMoon.glow} stopOpacity="0.8" />
              <stop offset="100%" stopColor={currentSunMoon.glow} stopOpacity="0" />
            </radialGradient>

            {/* Monolith & Crystal Gradients */}
            <linearGradient id="crystalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>

            <radialGradient id="monolithGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(52, 211, 153, 0.45)" />
              <stop offset="100%" stopColor="rgba(52, 211, 153, 0)" />
            </radialGradient>

            {/* Golden Tree Aura & Leaves */}
            <radialGradient id="goldAuraGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(254, 240, 138, 0.7)" />
              <stop offset="60%" stopColor="rgba(234, 179, 8, 0.3)" />
              <stop offset="100%" stopColor="rgba(234, 179, 8, 0)" />
            </radialGradient>

            <linearGradient id="goldenTreeLeaves" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>

            {/* River Gradient */}
            <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>

            {/* Terrain Land Gradients */}
            <linearGradient id="hillFar" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            <linearGradient id="islandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3f6212" />
              <stop offset="40%" stopColor="#2e4c19" />
              <stop offset="100%" stopColor="#1e3215" />
            </linearGradient>
          </defs>

          {/* Stars (Night / Dusk) */}
          {(timeOfDay === 'night' || timeOfDay === 'dusk') && (
            <g id="stars-layer" opacity={timeOfDay === 'night' ? '0.85' : '0.4'}>
              <circle cx="120" cy="60" r="1.5" fill="#ffffff" />
              <circle cx="210" cy="40" r="1" fill="#ffffff" />
              <circle cx="340" cy="70" r="2" fill="#ffffff" className="animate-pulse" />
              <circle cx="480" cy="30" r="1.5" fill="#ffffff" />
              <circle cx="620" cy="50" r="2" fill="#ffffff" className="animate-pulse" />
              <circle cx="780" cy="35" r="1" fill="#ffffff" />
              <circle cx="890" cy="65" r="1.8" fill="#ffffff" />
              <circle cx="940" cy="90" r="1.2" fill="#ffffff" />
              <circle cx="180" cy="110" r="1" fill="#ffffff" />
              <circle cx="820" cy="95" r="1.4" fill="#ffffff" />
            </g>
          )}

          {/* Celestial Sun / Moon */}
          <g id="celestial-body" className="transition-all duration-1000">
            <circle cx={currentSunMoon.cx} cy={currentSunMoon.cy} r="65" fill="url(#sunGlow)" />
            <circle
              cx={currentSunMoon.cx}
              cy={currentSunMoon.cy}
              r="22"
              fill={currentSunMoon.color}
              stroke={currentSunMoon.glow}
              strokeWidth="2"
            />
            {/* Moon craters if night */}
            {!currentSunMoon.isSun && (
              <g opacity="0.25">
                <circle cx={currentSunMoon.cx - 5} cy={currentSunMoon.cy - 4} r="4" fill="#64748b" />
                <circle cx={currentSunMoon.cx + 6} cy={currentSunMoon.cy + 3} r="3" fill="#64748b" />
                <circle cx={currentSunMoon.cx - 2} cy={currentSunMoon.cy + 8} r="2.5" fill="#64748b" />
              </g>
            )}
          </g>

          {/* Drifting Clouds */}
          <g id="clouds" opacity="0.35" className="pointer-events-none">
            <path
              d="M100,90 Q120,70 150,85 Q170,60 210,80 Q240,75 250,95 L100,95 Z"
              fill="#ffffff"
              className="animate-wave-water"
            />
            <path
              d="M720,70 Q740,55 770,65 Q790,45 830,60 Q860,55 870,75 L720,75 Z"
              fill="#ffffff"
              className="animate-wave-water"
              style={{ animationDelay: '2s' }}
            />
          </g>

          {/* Distant Mountain Silhouettes */}
          <g id="distant-mountains">
            <polygon points="0,320 180,180 340,320" fill="url(#hillFar)" opacity="0.65" />
            <polygon points="260,320 460,150 640,320" fill="url(#hillFar)" opacity="0.7" />
            <polygon points="560,320 760,160 960,320" fill="url(#hillFar)" opacity="0.65" />
            <polygon points="780,320 920,200 1000,300 1000,350 780,350" fill="url(#hillFar)" opacity="0.6" />
          </g>

          {/* Midground Rolling Hills */}
          <g id="midground-hills">
            <path
              d="M0,380 C150,310 280,390 450,350 C620,310 780,370 1000,330 L1000,700 L0,700 Z"
              fill="#223925"
              stroke="#18291b"
              strokeWidth="2"
            />
          </g>

          {/* Meandering Life River */}
          <g id="river-layer">
            <path
              d="M480,240 C520,300 440,360 490,420 C540,480 620,530 650,700 L600,700 C560,550 490,500 450,440 C400,380 470,320 440,240 Z"
              fill="url(#riverGrad)"
              stroke="#38bdf8"
              strokeWidth="1.5"
            />
            {/* Water Ripple Waves */}
            <path
              d="M470,310 Q490,315 500,308 M455,390 Q475,395 485,388 M530,480 Q550,485 560,478 M590,580 Q610,585 620,578"
              fill="none"
              stroke="#e0f2fe"
              strokeWidth="2"
              strokeLinecap="round"
              className="animate-wave-water"
              opacity="0.7"
            />
          </g>

          {/* Main Verdant Plateau (The Living Island) */}
          <g id="main-plateau">
            <ellipse cx="500" cy="460" rx="420" ry="190" fill="url(#islandGrad)" stroke="#1a2e16" strokeWidth="4" />
            <ellipse cx="500" cy="455" rx="380" ry="160" fill="#365314" opacity="0.35" />
          </g>

          {/* Streak Evergreen Foliage (7+ day streak) */}
          {gameState.streak >= 7 && (
            <g id="streak-trees" className="transition-opacity duration-700">
              {/* Forest Clusters */}
              <polygon points="170,420 185,380 200,420" fill="#14532d" />
              <polygon points="190,430 205,390 220,430" fill="#166534" />
              <polygon points="800,380 815,340 830,380" fill="#14532d" />
              <polygon points="820,390 835,350 850,390" fill="#166534" />
              <polygon points="410,580 425,540 440,580" fill="#14532d" />
              <polygon points="570,580 585,540 600,580" fill="#166534" />
            </g>
          )}

          {/* Connecting Pathways & Bridges */}
          <WorldPathways streak={gameState.streak} />

          {/* Five Interactive Districts (SVG Visuals) */}
          {/* 1. Sanctuary District (Balance) - North West */}
          <g
            onClick={() => onSelectDistrict('balance')}
            onMouseEnter={() => setHoveredDistrict('balance')}
            onMouseLeave={() => setHoveredDistrict(null)}
          >
            <SanctuaryDistrictSVG
              xp={gameState.attributes.balance}
              isHovered={hoveredDistrict === 'balance'}
              hasUpgrade={gameState.upgrades.includes('upgrade-lotus')}
              timeOfDay={timeOfDay}
            />
          </g>

          {/* 2. Knowledge District (Mind) - North East */}
          <g
            onClick={() => onSelectDistrict('mind')}
            onMouseEnter={() => setHoveredDistrict('mind')}
            onMouseLeave={() => setHoveredDistrict(null)}
          >
            <KnowledgeDistrictSVG
              xp={gameState.attributes.mind}
              isHovered={hoveredDistrict === 'mind'}
              hasUpgrade={gameState.upgrades.includes('upgrade-library')}
              timeOfDay={timeOfDay}
            />
          </g>

          {/* 3. Tech District (Craft) - East */}
          <g
            onClick={() => onSelectDistrict('craft')}
            onMouseEnter={() => setHoveredDistrict('craft')}
            onMouseLeave={() => setHoveredDistrict(null)}
          >
            <TechDistrictSVG
              xp={gameState.attributes.craft}
              isHovered={hoveredDistrict === 'craft'}
              hasUpgrade={gameState.upgrades.includes('upgrade-forge')}
              timeOfDay={timeOfDay}
            />
          </g>

          {/* 4. Vitality District (Body) - South East */}
          <g
            onClick={() => onSelectDistrict('body')}
            onMouseEnter={() => setHoveredDistrict('body')}
            onMouseLeave={() => setHoveredDistrict(null)}
          >
            <VitalityDistrictSVG
              xp={gameState.attributes.body}
              isHovered={hoveredDistrict === 'body'}
              hasUpgrade={gameState.upgrades.includes('upgrade-training')}
              timeOfDay={timeOfDay}
            />
          </g>

          {/* 5. Community District (Social) - South West */}
          <g
            onClick={() => onSelectDistrict('social')}
            onMouseEnter={() => setHoveredDistrict('social')}
            onMouseLeave={() => setHoveredDistrict(null)}
          >
            <CommunityDistrictSVG
              xp={gameState.attributes.social}
              isHovered={hoveredDistrict === 'social'}
              hasUpgrade={gameState.upgrades.includes('upgrade-agora')}
              timeOfDay={timeOfDay}
            />
          </g>

          {/* Central Evolving World Landmark */}
          <g id="central-world-hearth">
            <CentralLandmark level={gameState.level} timeOfDay={timeOfDay} />
          </g>

          {/* World Tree Beacon Upgrade (Central Pillar of Light) */}
          {gameState.upgrades.includes('upgrade-beacon') && (
            <g>
              <line x1="500" y1="450" x2="500" y2="50" stroke="#facc15" strokeWidth="4" strokeDasharray="6 4" className="animate-pulse" />
              <circle cx="500" cy="50" r="8" fill="#ffffff" className="animate-ping" />
            </g>
          )}
        </svg>
      </div>

      {/* Interactive HTML District Floating Badges & Tooltips */}
      {(Object.keys(districtBadges) as AttributeType[]).map((attr) => {
        const conf = ATTRIBUTE_CONFIG[attr];
        const pos = districtBadges[attr];
        const isHovered = hoveredDistrict === attr;
        const currentXP = gameState.attributes[attr] || 0;

        return (
          <div
            key={`badge-${attr}`}
            id={`district-badge-${attr}`}
            style={{ left: pos.x, top: pos.y }}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer z-30 transition-transform duration-300 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            onClick={() => onSelectDistrict(attr)}
            onMouseEnter={() => setHoveredDistrict(attr)}
            onMouseLeave={() => setHoveredDistrict(null)}
          >
            {/* Pill Badge */}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full shadow-lg border backdrop-blur-md transition-all duration-200 ${
                isHovered
                  ? 'bg-slate-900/95 border-amber-400 ring-2 ring-amber-400/40'
                  : 'bg-slate-900/80 border-slate-700/80 hover:border-slate-500'
              }`}
            >
              <span className="text-base">{conf.icon}</span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold tracking-wide text-slate-100 leading-none">
                  {conf.districtName}
                </span>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                  {currentXP} XP • {conf.name}
                </span>
              </div>
            </div>

            {/* Hover Tooltip Card */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 p-3 rounded-xl bg-slate-900/95 border border-slate-700 shadow-2xl backdrop-blur-md z-40 text-left pointer-events-none"
              >
                <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                    <span>{conf.icon}</span> {conf.name} Domain
                  </span>
                  <span className="text-[10px] font-mono font-medium text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/60">
                    Click to View
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">{conf.description}</p>
                <p className="text-[10px] text-slate-400 mt-1 italic">Fueled by: {conf.realWorldTasks}</p>
              </motion.div>
            )}
          </div>
        );
      })}

      {/* Floating XP & Essence Popups */}
      <AnimatePresence>
        {floatingFeedbacks.map((fb) => (
          <motion.div
            key={fb.id}
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -80, scale: 1.15 }}
            exit={{ opacity: 0, y: -120, scale: 0.9 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ left: `${fb.x}%`, top: `${fb.y}%` }}
            className="absolute z-50 pointer-events-none font-bold text-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 backdrop-blur-md text-center"
          >
            <span style={{ color: fb.color }}>{fb.text}</span>
            {fb.subtext && <div className="text-xs text-amber-300 font-mono mt-0.5">{fb.subtext}</div>}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* World Map Floating Action Toolbar (Bottom Right) */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 z-30 bg-slate-900/85 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-700/80 shadow-lg">
        {/* Time of Day Cycle */}
        <div className="flex items-center gap-1 border-r border-slate-700 pr-2">
          <button
            onClick={() => setTimeOfDay('dawn')}
            title="Dawn Light"
            className={`p-1.5 rounded-lg transition-colors ${
              timeOfDay === 'dawn' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sunrise className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTimeOfDay('day')}
            title="Midday Sun"
            className={`p-1.5 rounded-lg transition-colors ${
              timeOfDay === 'day' ? 'bg-sky-500/20 text-sky-300' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sun className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTimeOfDay('dusk')}
            title="Dusk Twilight"
            className={`p-1.5 rounded-lg transition-colors ${
              timeOfDay === 'dusk' ? 'bg-orange-500/20 text-orange-300' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sunset className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTimeOfDay('night')}
            title="Starlight Night"
            className={`p-1.5 rounded-lg transition-colors ${
              timeOfDay === 'night' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Moon className="w-4 h-4" />
          </button>
        </div>

        {/* Weather Effects */}
        <div className="flex items-center gap-1 border-r border-slate-700 pr-2">
          <button
            onClick={() => setWeather(weather === 'blossoms' ? 'clear' : 'blossoms')}
            title="Cherry Blossom Petals"
            className={`p-1.5 rounded-lg transition-colors ${
              weather === 'blossoms' ? 'bg-pink-500/20 text-pink-300' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
          </button>
          <button
            onClick={() => setWeather(weather === 'gentle_rain' ? 'clear' : 'gentle_rain')}
            title="Gentle Spring Rain"
            className={`p-1.5 rounded-lg transition-colors ${
              weather === 'gentle_rain' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CloudRain className="w-4 h-4" />
          </button>
          <button
            onClick={() => setWeather(weather === 'fireflies' ? 'clear' : 'fireflies')}
            title="Firefly Reeds"
            className={`p-1.5 rounded-lg transition-colors ${
              weather === 'fireflies' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleZoom(0.1)}
            title="Zoom In"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom(-0.1)}
            title="Zoom Out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            title="Reset Zoom"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
