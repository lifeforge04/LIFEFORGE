import React, { useState } from 'react';
import { Sparkles, Flame, Coins, Calendar, ChevronDown, Award, Globe, Compass, BarChart3, Store, History } from 'lucide-react';
import { UserGameState } from '../../types';
import { getLevelProgress, xpForLevel } from '../../utils/gameEngine';

interface TopHUDProps {
  gameState: UserGameState;
  activeTab: 'world' | 'quests' | 'analytics' | 'sanctuary' | 'timeline';
  setActiveTab: (tab: 'world' | 'quests' | 'analytics' | 'sanctuary' | 'timeline') => void;
  onAdvanceDay: () => void;
  onApplyPreset: (level: number) => void;
}

export const TopHUD: React.FC<TopHUDProps> = ({
  gameState,
  activeTab,
  setActiveTab,
  onAdvanceDay,
  onApplyPreset,
}) => {
  const [showPresetMenu, setShowPresetMenu] = useState(false);

  const progress = getLevelProgress(gameState.totalXP, gameState.level);
  const nextXP = xpForLevel(gameState.level);

  return (
    <header className="w-full mb-3 flex flex-col gap-2.5 z-40">
      {/* Top Banner Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl">
        {/* Left: Brand & Standing */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              V
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Fraunces',serif] font-bold text-lg text-slate-100 tracking-tight leading-none">
                  VITALE
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Living World
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Your life physically changes this realm</p>
            </div>
          </div>

          {/* Standing Level Badge & XP Track */}
          <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-slate-800">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-semibold text-slate-400 leading-none">Standing</span>
              <span className="font-['Fraunces',serif] font-bold text-2xl text-amber-300 leading-tight">
                Level {gameState.level}
              </span>
            </div>

            <div className="flex flex-col w-36">
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                <span>{progress.currentXPInLevel} XP</span>
                <span>{progress.neededForNextLevel} XP needed</span>
              </div>
              <div className="w-full h-2 bg-slate-800/90 rounded-full overflow-hidden border border-slate-700/50">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 transition-all duration-700 ease-out shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Center: Quick Presets for Judges/Demo */}
        <div className="relative">
          <button
            onClick={() => setShowPresetMenu(!showPresetMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs text-slate-200 transition-all"
            title="Inspect world stages instantly for demonstration"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium">Demo World Stage</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showPresetMenu && (
            <div className="absolute top-full mt-2 left-0 w-56 p-1.5 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl z-50 flex flex-col gap-1">
              <div className="text-[10px] font-mono text-slate-400 px-2 py-1 uppercase tracking-wider">
                Jump to Visual Era
              </div>
              <button
                onClick={() => {
                  onApplyPreset(1);
                  setShowPresetMenu(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-800 flex items-center justify-between text-slate-200"
              >
                <span>🌱 Lvl 1: Pioneer Sprout</span>
                <span className="text-[10px] font-mono text-slate-500">Early Camp</span>
              </button>
              <button
                onClick={() => {
                  onApplyPreset(5);
                  setShowPresetMenu(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-800 flex items-center justify-between text-slate-200"
              >
                <span>🏡 Lvl 5: Settlement & Mill</span>
                <span className="text-[10px] font-mono text-slate-500">1,420 XP</span>
              </button>
              <button
                onClick={() => {
                  onApplyPreset(8);
                  setShowPresetMenu(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-800 flex items-center justify-between text-slate-200"
              >
                <span>🏛️ Lvl 8: Athenaeum Dome</span>
                <span className="text-[10px] font-mono text-slate-500">3,110 XP</span>
              </button>
              <button
                onClick={() => {
                  onApplyPreset(15);
                  setShowPresetMenu(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-800 flex items-center justify-between text-slate-200"
              >
                <span>💎 Lvl 15: Sanctuary Monolith</span>
                <span className="text-[10px] font-mono text-slate-500">8,820 XP</span>
              </button>
              <button
                onClick={() => {
                  onApplyPreset(20);
                  setShowPresetMenu(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-800 flex items-center justify-between text-amber-300 font-semibold"
              >
                <span>👑 Lvl 20: Citadel & World Tree</span>
                <span className="text-[10px] font-mono text-amber-500">13,995 XP</span>
              </button>
            </div>
          )}
        </div>

        {/* Right: Currency, Streak & Close-Out-Day */}
        <div className="flex items-center gap-3">
          {/* Streak Indicator */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-950/40 border border-orange-800/50 text-orange-300 shadow-sm"
            title={`${gameState.streak} consecutive active days! Streaks unlock fireflies, lush forests, and the grand viaduct.`}
          >
            <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
            <span className="font-bold text-sm">{gameState.streak}d</span>
            <span className="hidden sm:inline text-xs text-orange-400/80 font-medium">Streak</span>
          </div>

          {/* Essence Currency */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/40 border border-amber-800/50 text-amber-300 shadow-sm"
            title="Essence earned from tasks. Spend in Sanctuary Shop to upgrade the world."
          >
            <Coins className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-sm font-mono">{gameState.essence}</span>
            <span className="hidden sm:inline text-xs text-amber-400/80 font-medium">Essence</span>
          </div>

          {/* Close out the day button */}
          <button
            onClick={onAdvanceDay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-md hover:shadow-emerald-500/20 active:scale-95 transition-all"
            title="Log the completion of today to advance your streak and watch nature respond"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Close Out Day</span>
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <nav className="flex items-center justify-between overflow-x-auto gap-1 p-1 bg-slate-900/60 border border-slate-800 rounded-xl backdrop-blur-md">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('world')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'world'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Living World</span>
          </button>

          <button
            onClick={() => setActiveTab('quests')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'quests'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Quests & Tasks</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-950/40">
              {gameState.tasks.filter((t) => !t.completed).length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Life Radar & Curve</span>
          </button>

          <button
            onClick={() => setActiveTab('sanctuary')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'sanctuary'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>World Investments</span>
            {gameState.upgrades.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500 text-slate-950 font-bold">
                {gameState.upgrades.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'timeline'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>World Timeline</span>
          </button>
        </div>

        {/* Mobile Standing indicator */}
        <div className="flex sm:hidden items-center gap-2 pr-2 text-xs font-mono">
          <span className="text-amber-400 font-bold">Lvl {gameState.level}</span>
          <span className="text-slate-500">{gameState.totalXP} XP</span>
        </div>
      </nav>
    </header>
  );
};
