import React, { useMemo, useState } from 'react';
import { xpForLevel } from '../../utils/gameEngine';

interface XPCurveChartProps {
  currentXP: number;
  currentLevel: number;
}

export const XPCurveChart: React.FC<XPCurveChartProps> = ({ currentXP, currentLevel }) => {
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  // Generate data points for levels 1 through 15
  const maxLevels = 15;
  const levelData = useMemo(() => {
    return Array.from({ length: maxLevels }, (_, i) => {
      const lvl = i + 1;
      const xpReq = xpForLevel(lvl);
      return { level: lvl, xpReq };
    });
  }, []);

  const maxXp = levelData[levelData.length - 1].xpReq;

  // Chart coordinates
  const width = 500;
  const height = 220;
  const padding = { left: 55, right: 30, top: 20, bottom: 40 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const points = useMemo(() => {
    return levelData.map((d) => {
      const x = padding.left + ((d.level - 1) / (maxLevels - 1)) * plotWidth;
      const y = padding.top + plotHeight - (d.xpReq / maxXp) * plotHeight;
      return { ...d, x, y };
    });
  }, [levelData, maxXp, plotWidth, plotHeight, padding]);

  const curvePath = useMemo(() => {
    return points.reduce((acc, pt, idx) => {
      return idx === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
    }, '');
  }, [points]);

  const areaPath = useMemo(() => {
    if (points.length === 0) return '';
    const first = points[0];
    const last = points[points.length - 1];
    return `${curvePath} L ${last.x},${padding.top + plotHeight} L ${first.x},${padding.top + plotHeight} Z`;
  }, [curvePath, points, padding, plotHeight]);

  // Current user's coordinate on curve
  const currentPos = useMemo(() => {
    const clampedLevel = Math.min(maxLevels, Math.max(1, currentLevel));
    const clampedXP = Math.min(maxXp, currentXP);
    const x = padding.left + ((clampedLevel - 1) / (maxLevels - 1)) * plotWidth;
    const y = padding.top + plotHeight - (clampedXP / maxXp) * plotHeight;
    return { x, y };
  }, [currentLevel, currentXP, maxLevels, maxXp, padding, plotWidth, plotHeight]);

  return (
    <div className="w-full flex flex-col items-center p-3 text-left">
      <div className="w-full flex items-center justify-between mb-2">
        <div>
          <span className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider">
            Progression Curve
          </span>
          <h4 className="text-sm font-semibold text-slate-100">Non-Linear Leveling (100 × n^1.65)</h4>
        </div>
        <div className="text-right text-xs">
          <span className="text-slate-400">Current Standing: </span>
          <span className="font-bold text-amber-400">Level {currentLevel}</span>
          <span className="text-slate-500 font-mono ml-1.5">({currentXP} XP)</span>
        </div>
      </div>

      <div className="w-full relative h-[220px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible select-none">
          <defs>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(245, 158, 11, 0.35)" />
              <stop offset="100%" stopColor="rgba(245, 158, 11, 0.0)" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = padding.top + plotHeight * (1 - pct);
            const xpVal = Math.round(maxXp * pct);
            return (
              <g key={`grid-y-${idx}`}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + plotWidth}
                  y2={y}
                  stroke="rgba(148, 163, 184, 0.15)"
                  strokeDasharray="3 3"
                />
                <text
                  x={padding.left - 8}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="central"
                  className="text-[9px] fill-slate-400 font-mono"
                >
                  {xpVal >= 1000 ? `${(xpVal / 1000).toFixed(1)}k` : xpVal}
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <path d={areaPath} fill="url(#curveGradient)" />

          {/* The Non-Linear Curve */}
          <path d={curvePath} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />

          {/* Data Points */}
          {points.map((pt) => {
            const isHovered = hoveredLevel === pt.level;
            const isCurrent = currentLevel === pt.level;

            return (
              <g
                key={`lvl-pt-${pt.level}`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredLevel(pt.level)}
                onMouseLeave={() => setHoveredLevel(null)}
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isCurrent ? 6 : isHovered ? 5 : 3.5}
                  fill={isCurrent ? '#38bdf8' : isHovered ? '#fbbf24' : '#e2e8f0'}
                  stroke="#0f172a"
                  strokeWidth="1.5"
                />
                {/* Level label on X-axis */}
                {(pt.level === 1 || pt.level % 2 === 1 || pt.level === maxLevels) && (
                  <text
                    x={pt.x}
                    y={padding.top + plotHeight + 16}
                    textAnchor="middle"
                    className={`text-[10px] font-mono ${
                      isCurrent ? 'fill-sky-400 font-bold' : 'fill-slate-400'
                    }`}
                  >
                    L{pt.level}
                  </text>
                )}
              </g>
            );
          })}

          {/* User Current Marker */}
          <g>
            <circle
              cx={currentPos.x}
              cy={currentPos.y}
              r="8"
              fill="rgba(56, 189, 248, 0.3)"
              className="animate-ping"
            />
            <circle cx={currentPos.x} cy={currentPos.y} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
          </g>

          {/* Tooltip on Hover */}
          {hoveredLevel && (
            <g>
              {(() => {
                const pt = points.find((p) => p.level === hoveredLevel);
                if (!pt) return null;
                return (
                  <g transform={`translate(${pt.x}, ${Math.max(25, pt.y - 30)})`}>
                    <rect
                      x="-55"
                      y="-20"
                      width="110"
                      height="24"
                      rx="6"
                      fill="#1e293b"
                      stroke="#f59e0b"
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="-8"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="text-[10px] fill-amber-300 font-semibold"
                    >
                      Lvl {pt.level}: {pt.xpReq.toLocaleString()} XP
                    </text>
                  </g>
                );
              })()}
            </g>
          )}
        </svg>
      </div>

      <p className="text-[11px] text-slate-400 mt-1 italic">
        Unlike linear level systems, Vitale models real-world skill mastery: early levels provide quick gratification,
        while later realms reflect sustained dedication.
      </p>
    </div>
  );
};
