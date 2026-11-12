import React, { useState } from 'react';
import { DEMAND_FORECAST_SERIES } from '../../data/procurementData';

export default function DemandForecastChart() {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // SVG dimensions
  const width = 800;
  const height = 190;
  const padding = { top: 24, right: 30, bottom: 30, left: 45 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // Max scale Y
  const maxY = 850;

  const getX = (index) => {
    return padding.left + (index / (DEMAND_FORECAST_SERIES.length - 1)) * innerWidth;
  };

  const getY = (val) => {
    return height - padding.bottom - (val / maxY) * innerHeight;
  };

  // Generate SVG path for P10-P90 Area
  const areaPath = () => {
    const topPoints = DEMAND_FORECAST_SERIES.map((d, i) => `${getX(i)},${getY(d.p90)}`).join(' L ');
    const bottomPoints = DEMAND_FORECAST_SERIES.slice().reverse().map((d, i) => {
      const origIndex = DEMAND_FORECAST_SERIES.length - 1 - i;
      return `${getX(origIndex)},${getY(d.p10)}`;
    }).join(' L ');
    return `M ${topPoints} L ${bottomPoints} Z`;
  };

  // Generate line path
  const linePath = (key) => {
    return DEMAND_FORECAST_SERIES.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d[key])}`).join(' ');
  };

  return (
    <div className="bg-white border-b border-slate-200 p-4 select-none">
      {/* Chart Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-2 border-b border-slate-100 font-sans">
        <div>
          <h3 className="text-xs font-bold text-slate-900 tracking-tight">
            Demand Forecast &amp; Look-to-Book Acceleration Band
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Monte Carlo P10 / P50 / P90 trajectory vs. real-time agency search query velocity
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 mt-2 sm:mt-0">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-1 bg-[#1D4ED8] rounded-full inline-block"></span>
            <span className="text-slate-800">Forecasted Demand (P50)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-1 bg-[#EA580C] rounded-full inline-block"></span>
            <span className="text-slate-800">Live Search Velocity</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2.5 bg-[#EFF6FF] border border-blue-200 rounded-sm inline-block"></span>
            <span className="text-slate-500">P10–P90 Confidence Band</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-slate-400 border-b border-dashed inline-block"></span>
            <span className="text-slate-400">Historical Baseline</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full h-[190px]">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full overflow-visible font-sans text-[10px]"
        >
          {/* Light Grey Dashed Horizontal Gridlines (#E2E8F0) */}
          {[0, 200, 400, 600, 800].map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fill="#94A3B8"
                  fontSize="10"
                  className="tabular-nums font-sans"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Vertical Gridlines & X-Axis Labels */}
          {DEMAND_FORECAST_SERIES.map((d, i) => {
            const x = getX(i);
            const isCutoff = d.day === '42 Days Out';
            return (
              <g key={d.day}>
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={height - padding.bottom}
                  stroke={isCutoff ? '#EA580C' : '#F1F5F9'}
                  strokeWidth={isCutoff ? '1.5' : '1'}
                  strokeDasharray={isCutoff ? '3 3' : 'none'}
                />
                <text
                  x={x}
                  y={height - padding.bottom + 16}
                  textAnchor="middle"
                  fill={isCutoff ? '#EA580C' : '#64748B'}
                  fontWeight={isCutoff ? '600' : '500'}
                  fontSize="10"
                >
                  {d.day}
                </text>
              </g>
            );
          })}

          {/* Shaded P10-P90 Confidence Band (Soft Light Blue #EFF6FF) */}
          <path
            d={areaPath()}
            fill="#EFF6FF"
            stroke="#DBEAFE"
            strokeWidth="0.5"
          />

          {/* Historical Baseline Line */}
          <path
            d={linePath('historical')}
            fill="none"
            stroke="#94A3B8"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Royal Blue Forecast Line (#1D4ED8) */}
          <path
            d={linePath('p50')}
            fill="none"
            stroke="#1D4ED8"
            strokeWidth="2.5"
          />

          {/* Live Look-to-Book Velocity Line (#EA580C) */}
          <path
            d={linePath('liveVelocity')}
            fill="none"
            stroke="#EA580C"
            strokeWidth="2"
          />

          {/* Optimal Pre-Buy Cutoff Banner */}
          <g transform={`translate(${getX(2) + 6}, ${padding.top + 6})`}>
            <rect x="0" y="-8" width="160" height="18" rx="3" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="1" />
            <text x="6" y="4" fill="#C2410C" fontSize="9.5" fontWeight="600">
              Optimal Pre-Buy Window (T-42d)
            </text>
          </g>

          {/* Data Points on Live Velocity */}
          {DEMAND_FORECAST_SERIES.map((d, i) => {
            const x = getX(i);
            const y = getY(d.liveVelocity);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="3.5"
                fill="#EA580C"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                className="cursor-pointer hover:r-5 transition-all"
                onMouseEnter={() => setHoveredPoint(d)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div className="absolute top-2 right-4 bg-white border border-slate-200 rounded-md p-3 text-xs shadow-md z-20 pointer-events-none font-sans min-w-[200px]">
            <div className="text-slate-900 font-bold border-b border-slate-100 pb-1 mb-1.5 flex justify-between">
              <span>{hoveredPoint.day} Telemetry</span>
              <span className="text-[10px] text-slate-400 font-normal">Indexed Vol</span>
            </div>
            <div className="flex justify-between text-[#EA580C] font-semibold py-0.5">
              <span>Search Velocity:</span>
              <span className="tabular-nums">{hoveredPoint.liveVelocity} / hr</span>
            </div>
            <div className="flex justify-between text-[#1D4ED8] font-semibold py-0.5">
              <span>P50 Forecast:</span>
              <span className="tabular-nums">{hoveredPoint.p50}</span>
            </div>
            <div className="flex justify-between text-slate-500 py-0.5 text-[11px]">
              <span>P10 / P90 Range:</span>
              <span className="tabular-nums">{hoveredPoint.p10} &ndash; {hoveredPoint.p90}</span>
            </div>
            <div className="flex justify-between text-slate-400 py-0.5 text-[11px]">
              <span>Historical Baseline:</span>
              <span className="tabular-nums">{hoveredPoint.historical}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
