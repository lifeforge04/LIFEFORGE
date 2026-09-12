import React from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, Plus, ArrowRight, Check } from 'lucide-react';
import { AttributeType, Task } from '../../types';
import { ATTRIBUTE_CONFIG } from '../../utils/gameEngine';

interface DistrictDetailModalProps {
  attribute: AttributeType | null;
  currentXP: number;
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  onCompleteTask: (taskId: string) => void;
  onOpenNewTaskModal: (defaultAttr: AttributeType) => void;
  hasUpgrade: boolean;
}

export const DistrictDetailModal: React.FC<DistrictDetailModalProps> = ({
  attribute,
  currentXP,
  isOpen,
  onClose,
  tasks,
  onCompleteTask,
  onOpenNewTaskModal,
  hasUpgrade,
}) => {
  if (!isOpen || !attribute) return null;

  const conf = ATTRIBUTE_CONFIG[attribute];
  const stage = currentXP >= 150 ? 3 : currentXP >= 50 ? 2 : 1;

  // District specific architecture progression details
  const stageDescriptions: Record<AttributeType, { s1: string; s2: string; s3: string }> = {
    mind: {
      s1: 'Ancient Reading Gazebo & Stone Columns',
      s2: 'Great Athenaeum Hall & Scroll Archive',
      s3: 'Astrolabe Telescope Spire (Star Observation)',
    },
    craft: {
      s1: 'Artisan Workshop & Iron Anvil',
      s2: 'Clockwork Foundry & Steam Kiln',
      s3: 'Industrial Waterwheel & Brass Gearworks',
    },
    body: {
      s1: 'Alpine Running Trail & Red Pennants',
      s2: 'Colosseum Pavilion & Strength Benches',
      s3: 'Roaring Waterfall & Mountain Summit Arena',
    },
    social: {
      s1: 'Village Homesteads & Hearth Fire',
      s2: 'Agora Amphitheatre & Market Stalls',
      s3: 'Festive Paper Lantern Canopies & Gathering Arch',
    },
    balance: {
      s1: 'Bamboo Forest & Moss Stepping Stones',
      s2: 'Vermilion Torii Shrine Gate',
      s3: 'Sakura Blossom Tree & Floating Levitation Shard',
    },
  };

  const districtTasks = tasks.filter((t) => !t.completed && t.attribute === attribute);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 relative text-left max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* District Title */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg border"
            style={{
              backgroundColor: `${conf.accentHex}20`,
              borderColor: `${conf.accentHex}50`,
              color: conf.accentHex,
            }}
          >
            {conf.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                {conf.name} Domain
              </span>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${conf.accentHex}25`, color: conf.accentHex }}
              >
                Stage {stage} of 3
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-100">{conf.districtName}</h2>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">{conf.description}</p>

        {/* Real-world Activities that grow this district */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 mb-4">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">
            Real-Life Activities that Fuel this Realm:
          </span>
          <p className="text-xs text-amber-300 font-medium">{conf.realWorldTasks}</p>
        </div>

        {/* Architectural Evolution Stages */}
        <div className="mb-5">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Physical District Progression
          </h4>

          <div className="space-y-2">
            {[1, 2, 3].map((s) => {
              const desc = (stageDescriptions[attribute] as any)[`s${s}`];
              const isCurrent = stage === s;
              const isUnlocked = stage >= s;

              return (
                <div
                  key={`stage-${s}`}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                    isCurrent
                      ? 'bg-slate-800/90 border-amber-400/80 shadow-md'
                      : isUnlocked
                      ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                      : 'bg-slate-950/30 border-slate-900 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isUnlocked ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isUnlocked ? <Check className="w-3.5 h-3.5" /> : s}
                    </div>
                    <div>
                      <span className="font-semibold block text-slate-200">{desc}</span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {s === 1 ? 'Base Tier' : s === 2 ? 'Requires 50 XP' : 'Requires 150 XP'}
                      </span>
                    </div>
                  </div>

                  {isCurrent && (
                    <span className="text-[10px] font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/15">
                      Active
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {hasUpgrade && (
            <div className="mt-2 p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sanctuary World Investment Monument is physically active!</span>
            </div>
          )}
        </div>

        {/* Quests Available for this District */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              District Quests ({districtTasks.length})
            </h4>
            <button
              onClick={() => {
                onClose();
                onOpenNewTaskModal(attribute);
              }}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
            >
              <Plus className="w-3 h-3" /> Add Habit
            </button>
          </div>

          <div className="space-y-2">
            {districtTasks.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-center">
                All quests in this district completed! Add a new task to continue expanding.
              </p>
            ) : (
              districtTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-slate-200 block">{t.title}</span>
                    <span className="text-[10px] font-mono text-slate-500">
                      +{t.xpReward} XP • {t.durationMinutes}m
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onCompleteTask(t.id);
                      onClose();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] transition-colors"
                  >
                    Complete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
