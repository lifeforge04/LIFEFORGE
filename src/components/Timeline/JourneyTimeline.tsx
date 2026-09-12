import React from 'react';
import { History, Milestone, CheckCircle2, Sparkles, Flame, Shield } from 'lucide-react';
import { JourneyEvent } from '../../types';
import { ATTRIBUTE_CONFIG } from '../../utils/gameEngine';

interface JourneyTimelineProps {
  events: JourneyEvent[];
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ events }) => {
  return (
    <div className="w-full flex flex-col gap-4 text-left">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-1">
          <History className="w-4 h-4 text-amber-400" />
          <h2 className="text-lg font-bold text-slate-100">Chronicle of Your Journey</h2>
        </div>
        <p className="text-xs text-slate-400">
          A physical visual history of your discipline. Each milestone is a permanent testament to real-life habits.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-6 my-2">
        {events.map((ev, idx) => {
          const conf = ev.attribute ? ATTRIBUTE_CONFIG[ev.attribute] : null;

          return (
            <div key={ev.id} className="relative group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.5)]">
                {ev.type === 'milestone' && <Milestone className="w-2.5 h-2.5" />}
                {ev.type === 'task' && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />}
                {ev.type === 'streak' && <Flame className="w-2.5 h-2.5 text-orange-400" />}
                {ev.type === 'upgrade' && <Sparkles className="w-2.5 h-2.5 text-amber-400" />}
              </div>

              {/* Event Card */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 group-hover:border-slate-700 transition-all shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {ev.dayLabel}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {new Date(ev.timestamp).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  {conf && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1"
                      style={{ backgroundColor: `${conf.accentHex}15`, color: conf.accentHex }}
                    >
                      <span>{conf.icon}</span> {conf.name} Domain
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-100">{ev.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{ev.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
