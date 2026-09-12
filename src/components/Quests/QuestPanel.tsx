import React, { useState } from 'react';
import { Plus, CheckCircle, Clock, ShieldCheck, Filter, Sparkles } from 'lucide-react';
import { AttributeType, Task } from '../../types';
import { ATTRIBUTE_CONFIG } from '../../utils/gameEngine';
import { TaskProofModal } from './TaskProofModal';
import { NewTaskModal } from '../Modals/NewTaskModal';

interface QuestPanelProps {
  tasks: Task[];
  onCompleteTask: (taskId: string, proofUrl?: string, notes?: string) => void;
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  onSelectDistrict?: (attr: AttributeType) => void;
}

export const QuestPanel: React.FC<QuestPanelProps> = ({
  tasks,
  onCompleteTask,
  onAddTask,
  onSelectDistrict,
}) => {
  const [filter, setFilter] = useState<AttributeType | 'all' | 'completed'>('all');
  const [selectedTaskForProof, setSelectedTaskForProof] = useState<Task | null>(null);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'completed') return t.completed;
    if (filter === 'all') return !t.completed;
    return !t.completed && t.attribute === filter;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="w-full flex flex-col gap-4 text-left">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span>Quests & Real-World Habits</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 font-mono text-slate-400 font-normal">
              {activeCount} Available
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            Real-life deeds manifest as physical architecture and living nature in your world.
          </p>
        </div>

        <button
          onClick={() => setIsNewTaskModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Life Quest</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            filter === 'all'
              ? 'bg-slate-800 text-amber-400 border border-amber-400/40'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          All Active ({activeCount})
        </button>

        {(Object.keys(ATTRIBUTE_CONFIG) as AttributeType[]).map((attr) => {
          const conf = ATTRIBUTE_CONFIG[attr];
          const count = tasks.filter((t) => !t.completed && t.attribute === attr).length;
          const isSelected = filter === attr;

          return (
            <button
              key={attr}
              onClick={() => setFilter(attr)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-slate-800 text-slate-100 border'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
              style={{ borderColor: isSelected ? conf.accentHex : undefined }}
            >
              <span>{conf.icon}</span>
              <span>{conf.name}</span>
              <span className="text-[10px] font-mono text-slate-500">({count})</span>
            </button>
          );
        })}

        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            filter === 'completed'
              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/50'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          Completed Archive ({completedCount})
        </button>
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredTasks.length === 0 ? (
          <div className="col-span-full py-12 px-4 rounded-2xl bg-slate-900/40 border border-slate-800 text-center flex flex-col items-center justify-center">
            <Sparkles className="w-8 h-8 text-amber-400/60 mb-2" />
            <h3 className="text-sm font-bold text-slate-200">No Quests in this Category</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Create a custom real-life quest to nurture this domain and watch your world flourish.
            </p>
            <button
              onClick={() => setIsNewTaskModalOpen(true)}
              className="mt-3 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-300"
            >
              + Create Quest
            </button>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const conf = ATTRIBUTE_CONFIG[task.attribute];

            return (
              <div
                key={task.id}
                id={`task-card-${task.id}`}
                className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  task.completed
                    ? 'bg-slate-900/40 border-slate-800/80 opacity-75'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:shadow-xl'
                }`}
              >
                <div>
                  {/* Top tags */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <button
                      onClick={() => onSelectDistrict?.(task.attribute)}
                      className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: `${conf.accentHex}20`, color: conf.accentHex }}
                      title={`Belongs to ${conf.districtName}. Click to inspect district.`}
                    >
                      <span>{conf.icon}</span>
                      <span>{conf.name}</span>
                    </button>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3 h-3" />
                        {task.durationMinutes}m
                      </span>
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold">
                        +{task.xpReward} XP
                      </span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold">
                        +{task.essenceReward} Ess
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3
                    className={`text-sm font-bold leading-snug ${
                      task.completed ? 'line-through text-slate-400' : 'text-slate-100'
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{task.description}</p>
                </div>

                {/* Bottom Action */}
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                  {task.completed ? (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Completed</span>
                      {task.completedAt && (
                        <span className="text-[10px] text-slate-500 font-mono ml-1">
                          {new Date(task.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="w-full flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedTaskForProof(task)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-slate-100 transition-colors"
                      >
                        Proof / Notes
                      </button>
                      <button
                        onClick={() => onCompleteTask(task.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 active:scale-95 transition-all"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Log Complete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modals */}
      <TaskProofModal
        task={selectedTaskForProof}
        isOpen={Boolean(selectedTaskForProof)}
        onClose={() => setSelectedTaskForProof(null)}
        onConfirmComplete={onCompleteTask}
      />

      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        onCreateTask={onAddTask}
      />
    </div>
  );
};
