import React, { useMemo, useState } from 'react';
import { AttributeType } from '../../types';
import { ATTRIBUTE_CONFIG } from '../../utils/gameEngine';

interface AttributeRadarProps {
  attributes: Record<AttributeType, number>;
  onSelectAttribute?: (attr: AttributeType) => void;
}

export const AttributeRadar: React.FC<AttributeRadarProps> = ({ attributes, onSelectAttribute }) => {
  const [hoveredAttr, setHoveredAttr] = useState<AttributeType | null>(null);

  const attributeOrder: AttributeType[] = ['mind', 'craft', 'body', 'social', 'balance'];

  const maxVal = useMemo(() => {
    const vals = Object.values(attributes) as number[];
    const highest = Math.max(...vals, 100);
    // Round up to nearest nice round number (e.g., 100, 200, 300...)
    return Math.ceil(highest / 50) * 50;
  }, [attributes]);

  const center = 150;
  const radius = 105;

  // Calculate polygon points
  const points = useMemo(() => {
    return attributeOrder.map((attr, index) => {
      const angle = (Math.PI * 2 / 5) * index - Math.PI / 2;
      const value = Math.min(maxVal, attributes[attr] || 0);
      const dist = (value / maxVal) * radius;
      const x = center + dist * Math.cos(angle);
      const y = center + dist * Math.sin(angle);
      return { attr, x, y, angle, value };
    });
  }, [attributes, maxVal]);

  const polygonPath = points.map((p) => `${p.x},${p.y}`).join(' ');

  // Concentric polygon grids
  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <div className="relative w-[300px] h-[300px]">
        <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible select-none">
          <defs>
            <radialGradient id="radarFillGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(245, 158, 11, 0.45)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.25)" />
            </radialGradient>
          </defs>

          {/* Concentric Grid Rings */}
          {gridLevels.map((lvl) => {
            const gridPts = attributeOrder.map((_, i) => {
              const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
              const x = center + radius * lvl * Math.cos(angle);
              const y = center + radius * lvl * Math.sin(angle);
              return `${x},${y}`;
            });
            return (
              <polygon
                key={`grid-${lvl}`}
                points={gridPts.join(' ')}
                fill="none"
                stroke="rgba(148, 163, 184, 0.2)"
                strokeWidth="1"
                strokeDasharray={lvl === 1 ? 'none' : '3 3'}
              />
            );
          })}

          {/* Axes from center */}
          {attributeOrder.map((_, i) => {
            const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return (
              <line
                key={`axis-${i}`}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="rgba(148, 163, 184, 0.25)"
                strokeWidth="1"
              />
            );
          })}

          {/* Filled User Polygon */}
          <polygon
            points={polygonPath}
            fill="url(#radarFillGrad)"
            stroke="#f59e0b"
            strokeWidth="2.5"
            className="transition-all duration-700 ease-out"
          />

          {/* Nodes on points */}
          {points.map((p) => {
            const conf = ATTRIBUTE_CONFIG[p.attr];
            const isHovered = hoveredAttr === p.attr;

            return (
              <g
                key={`node-${p.attr}`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredAttr(p.attr)}
                onMouseLeave={() => setHoveredAttr(null)}
                onClick={() => onSelectAttribute?.(p.attr)}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 7 : 5}
                  fill={conf.accentHex}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all duration-200"
                />
              </g>
            );
          })}

          {/* Axis Labels */}
          {attributeOrder.map((attr, i) => {
            const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
            const labelRadius = radius + 26;
            const lx = center + labelRadius * Math.cos(angle);
            const ly = center + labelRadius * Math.sin(angle);
            const conf = ATTRIBUTE_CONFIG[attr];
            const val = attributes[attr] || 0;
            const isHovered = hoveredAttr === attr;

            return (
              <g
                key={`lbl-${attr}`}
                transform={`translate(${lx}, ${ly})`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredAttr(attr)}
                onMouseLeave={() => setHoveredAttr(null)}
                onClick={() => onSelectAttribute?.(attr)}
              >
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`text-xs font-semibold select-none transition-colors ${
                    isHovered ? 'fill-amber-400 font-bold' : 'fill-slate-300'
                  }`}
                  style={{ fontSize: '11px' }}
                >
                  {conf.icon} {conf.name} ({val})
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Breakdown stat bars */}
      <div className="w-full mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
        {attributeOrder.map((attr) => {
          const conf = ATTRIBUTE_CONFIG[attr];
          const val = attributes[attr] || 0;
          const pct = Math.min(100, Math.round((val / maxVal) * 100));

          return (
            <div
              key={`stat-${attr}`}
              onClick={() => onSelectAttribute?.(attr)}
              className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors text-left"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-300 flex items-center gap-1">
                  <span>{conf.icon}</span> {conf.name}
                </span>
                <span className="font-mono text-slate-400">{val} XP</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: conf.accentHex }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
