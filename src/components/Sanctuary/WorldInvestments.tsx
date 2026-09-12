import React from 'react';
import { Coins, Check, Sparkles, ArrowUpRight } from 'lucide-react';
import { WorldUpgrade, AttributeType } from '../../types';
import { WORLD_UPGRADES, ATTRIBUTE_CONFIG } from '../../utils/gameEngine';

interface WorldInvestmentsProps {
  essence: number;
  purchasedUpgrades: string[];
  onPurchaseUpgrade: (upgradeId: string) => void;
  onSelectDistrict?: (attr: AttributeType) => void;
}

export const WorldInvestments: React.FC<WorldInvestmentsProps> = ({
  essence,
  purchasedUpgrades,
  onPurchaseUpgrade,
  onSelectDistrict,
}) => {
  return (
    <div className="w-full flex flex-col gap-4 text-left">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-100">Sanctuary World Investments</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-medium border border-amber-500/20">
              Permanent Boosts & Architecture
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Spend Essence harvested from life habits to physically erect architectural monuments that permanently accelerate your XP.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-950/40 border border-amber-800/50 text-amber-300 shadow-md">
          <Coins className="w-4 h-4 text-amber-400" />
          <div className="flex flex-col text-right">
            <span className="text-[10px] text-amber-400/75 uppercase font-mono">Available Balance</span>
            <span className="text-sm font-bold font-mono">{essence} Essence</span>
          </div>
        </div>
      </div>

      {/* Upgrades Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {WORLD_UPGRADES.map((upgrade) => {
          const isPurchased = purchasedUpgrades.includes(upgrade.id);
          const canAfford = essence >= upgrade.costEssence;
          const conf = upgrade.district !== 'world' ? ATTRIBUTE_CONFIG[upgrade.district] : null;

          return (
            <div
              key={upgrade.id}
              className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                isPurchased
                  ? 'bg-slate-900/40 border-emerald-500/40 shadow-sm'
                  : canAfford
                  ? 'bg-slate-900/80 border-slate-700 hover:border-amber-400/60 hover:shadow-xl'
                  : 'bg-slate-900/60 border-slate-800 opacity-80'
              }`}
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                    <span className="text-lg">{upgrade.icon}</span>
                    <span>{conf ? conf.districtName : 'World Core'}</span>
                  </div>

                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    +{upgrade.xpBonusPercent}% {upgrade.bonusAttribute.toUpperCase()} XP
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-100">{upgrade.title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{upgrade.description}</p>

                <div className="mt-3 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>Unlocks on map: <strong className="text-slate-100">{upgrade.visualUnlocked}</strong></span>
                </div>
              </div>

              {/* Purchase / Status button */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                {isPurchased ? (
                  <div className="w-full py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-600/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Constructed in World</span>
                  </div>
                ) : (
                  <button
                    disabled={!canAfford}
                    onClick={() => onPurchaseUpgrade(upgrade.id)}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      canAfford
                        ? 'bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-md shadow-amber-500/20 active:scale-95'
                        : 'bg-slate-800/80 text-slate-500 cursor-not-allowed border border-slate-700/50'
                    }`}
                  >
                    <Coins className="w-3.5 h-3.5" />
                    <span>Invest {upgrade.costEssence} Essence</span>
                    {!canAfford && <span className="text-[10px] font-normal">({upgrade.costEssence - essence} needed)</span>}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
