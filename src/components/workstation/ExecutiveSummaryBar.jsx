import React from 'react';
import { FORMAT_INR, FORMAT_INR_COMPACT } from '../../data/procurementData';

export default function ExecutiveSummaryBar({
  budgetCeiling,
  setBudgetCeiling,
  riskTolerance,
  setRiskTolerance,
  allocatedCapital,
  spotReserveBuffer,
  expectedProfit,
  expectedMarginPct,
  soldOutPreventionRate
}) {
  const preBuyAllocationPct = Math.round((allocatedCapital / budgetCeiling) * 100);
  const spotBufferPct = 100 - preBuyAllocationPct;

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden select-none mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200">
        
        {/* 1. Input Budget Cap & Slider */}
        <div className="p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
            <span>Input Procurement Budget</span>
            <span className="text-[11px] font-medium text-slate-400">Max Cap</span>
          </div>

          <div className="my-1">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-semibold text-base">₹</span>
              <input
                type="number"
                min={1000000}
                max={50000000}
                step={500000}
                value={budgetCeiling}
                onChange={(e) => setBudgetCeiling(Math.max(1000000, Number(e.target.value)))}
                className="w-full font-bold text-lg text-slate-900 border-b border-slate-300 focus:border-blue-600 focus:outline-none py-0.5 tabular-nums font-sans"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1 font-sans">
              <span>Current: <strong className="text-slate-800 tabular-nums">{FORMAT_INR_COMPACT(budgetCeiling)}</strong></span>
              <span className="text-slate-400">Range: ₹10L - ₹5Cr</span>
            </div>
          </div>

          <div className="mt-2">
            <input
              type="range"
              min={1000000}
              max={50000000}
              step={500000}
              value={budgetCeiling}
              onChange={(e) => setBudgetCeiling(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg accent-[#EA580C] cursor-pointer"
            />
          </div>
        </div>

        {/* 2. Allocated Pre-Buy Capital */}
        <div className="p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
            <span>Allocated Pre-Buy Capital</span>
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
              {preBuyAllocationPct}% Committed
            </span>
          </div>

          <div className="my-1">
            <div className="text-2xl font-bold text-slate-900 tabular-nums font-sans">
              {FORMAT_INR(allocatedCapital)}
            </div>
            <div className="text-xs text-slate-500 mt-0.5 font-sans">
              Guaranteed wholesale allotments across 8 corridors
            </div>
          </div>

          <div className="mt-2">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#EA580C] h-full rounded-full transition-all duration-300"
                style={{ width: `${preBuyAllocationPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* 3. Spot Reserve Buffer */}
        <div className="p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
            <span>Spot Reserve Buffer</span>
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
              {spotBufferPct}% Reserve
            </span>
          </div>

          <div className="my-1">
            <div className="text-2xl font-bold text-slate-700 tabular-nums font-sans">
              {FORMAT_INR(spotReserveBuffer)}
            </div>
            <div className="text-xs text-slate-500 mt-0.5 font-sans">
              Uncommitted liquidity for on-demand spot rates
            </div>
          </div>

          <div className="mt-2">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-slate-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${spotBufferPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* 4. Expected Risk-Adjusted Profit */}
        <div className="p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
            <span>Expected Net Profit</span>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              +{expectedMarginPct}% Margin
            </span>
          </div>

          <div className="my-1">
            <div className="text-2xl font-bold text-emerald-600 tabular-nums font-sans">
              +{FORMAT_INR(expectedProfit)}
            </div>
            <div className="text-xs text-emerald-700 font-medium mt-0.5 font-sans">
              +₹{Math.round(expectedProfit * 0.58).toLocaleString('en-IN')} net gain vs pure spot buy
            </div>
          </div>

          <div className="mt-2 text-[11px] text-slate-500 font-sans">
            Availability fill-rate: <strong className="text-slate-800">{soldOutPreventionRate}%</strong>
          </div>
        </div>

        {/* 5. Portfolio CVaR Risk Tolerance */}
        <div className="p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
            <span>Portfolio CVaR Risk Cap</span>
            <span className="text-[11px] font-semibold text-slate-600">95% Conf.</span>
          </div>

          <div className="my-1">
            <div className="grid grid-cols-3 gap-1 my-1">
              {[
                { id: 'CONSERVATIVE', label: 'Cons (4%)' },
                { id: 'BALANCED', label: 'Balanced (7.5%)' },
                { id: 'AGGRESSIVE', label: 'Aggr (12%)' }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setRiskTolerance(mode.id)}
                  className={`text-[11px] font-medium py-1.5 px-1 rounded-md text-center transition-all ${
                    riskTolerance === mode.id
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-1 text-[11px] text-slate-500 flex justify-between items-center font-sans">
            <span>Downside Shield:</span>
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
              14-Day Auto-Release Active
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
