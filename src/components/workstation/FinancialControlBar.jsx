import React from 'react';
import { FORMAT_INR, FORMAT_INR_COMPACT } from '../../data/procurementData';

export default function FinancialControlBar({
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
    <div className="w-full bg-carbon-900 border-b border-zinc-hairline grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-zinc-hairline select-none">
      {/* 1. Interactive Input Control: Max Budget Ceiling */}
      <div className="p-2.5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-wider text-zinc-400 mb-1">
          <span>MAX BUDGET CEILING</span>
          <span className="text-zinc-500 font-sans">LIMIT</span>
        </div>
        <div className="flex items-center gap-1.5 my-0.5">
          <span className="text-zinc-500 font-mono text-xs">₹</span>
          <input
            type="number"
            min={1000000}
            max={50000000}
            step={500000}
            value={budgetCeiling}
            onChange={(e) => setBudgetCeiling(Math.max(1000000, Number(e.target.value)))}
            className="w-full bg-carbon-950 border border-zinc-border px-1.5 py-0.5 font-mono text-sm font-semibold text-white focus:outline-none focus:border-tbo-orange tabular"
          />
        </div>
        <div className="flex items-center gap-2 mt-1">
          <input
            type="range"
            min={1000000}
            max={50000000}
            step={500000}
            value={budgetCeiling}
            onChange={(e) => setBudgetCeiling(Number(e.target.value))}
            className="w-full h-1 bg-zinc-border accent-tbo-orange cursor-pointer"
          />
          <span className="text-[10px] font-mono text-zinc-400 shrink-0">
            {FORMAT_INR_COMPACT(budgetCeiling)}
          </span>
        </div>
      </div>

      {/* 2. Interactive Input Control: CVaR Risk Tolerance */}
      <div className="p-2.5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-wider text-zinc-400 mb-1">
          <span>MAX UNSOLD RISK (CVaR 95%)</span>
          <span className="text-zinc-500 font-sans">SHIELD</span>
        </div>
        <div className="grid grid-cols-3 gap-1 my-1">
          {[
            { id: 'CONSERVATIVE', label: 'Cons (4%)', val: '4.0%' },
            { id: 'BALANCED', label: 'Bal (7.5%)', val: '7.5%' },
            { id: 'AGGRESSIVE', label: 'Aggr (12%)', val: '12.0%' }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setRiskTolerance(mode.id)}
              className={`text-[10px] font-mono py-1 px-1 text-center border transition-none ${
                riskTolerance === mode.id
                  ? 'bg-zinc-800 text-white border-zinc-500 font-bold'
                  : 'bg-carbon-950 text-zinc-400 border-zinc-border hover:bg-carbon-850 hover:text-zinc-200'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
        <div className="text-[10px] font-mono text-zinc-500 flex justify-between">
          <span>LAMBDA: {riskTolerance === 'CONSERVATIVE' ? 'λ=2.4' : riskTolerance === 'BALANCED' ? 'λ=1.5' : 'λ=0.8'}</span>
          <span className="text-zinc-400">P95 TAIL LOSS CAP</span>
        </div>
      </div>

      {/* 3. Readout: Allocated Pre-Buy Capital */}
      <div className="p-2.5 flex flex-col justify-between">
        <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">
          ALLOCATED PRE-BUY CAPITAL
        </div>
        <div className="my-1">
          <div className="font-mono text-base font-bold text-white tabular">
            {FORMAT_INR(allocatedCapital)}
          </div>
          <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
            {preBuyAllocationPct}% of total budget ceiling
          </div>
        </div>
        <div className="w-full bg-carbon-950 h-1 overflow-hidden">
          <div 
            className="bg-tbo-orange h-full"
            style={{ width: `${preBuyAllocationPct}%` }}
          />
        </div>
      </div>

      {/* 4. Readout: Spot-API Reserve Buffer */}
      <div className="p-2.5 flex flex-col justify-between">
        <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">
          SPOT-API RESERVE BUFFER
        </div>
        <div className="my-1">
          <div className="font-mono text-base font-bold text-zinc-300 tabular">
            {FORMAT_INR(spotReserveBuffer)}
          </div>
          <div className="text-[10px] font-mono text-zinc-500 mt-0.5">
            {spotBufferPct}% unallocated liquidity buffer
          </div>
        </div>
        <div className="w-full bg-carbon-950 h-1 overflow-hidden">
          <div 
            className="bg-zinc-600 h-full"
            style={{ width: `${spotBufferPct}%` }}
          />
        </div>
      </div>

      {/* 5. Readout: Expected Risk-Adjusted Profit */}
      <div className="p-2.5 flex flex-col justify-between">
        <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">
          EXP. NET PROFIT (RISK-ADJ)
        </div>
        <div className="my-1">
          <div className="font-mono text-base font-bold text-tbo-emerald tabular">
            +{FORMAT_INR(expectedProfit)}
          </div>
          <div className="text-[10px] font-mono text-tbo-emerald mt-0.5">
            +{expectedMarginPct}% net margin yield
          </div>
        </div>
        <div className="text-[10px] font-mono text-zinc-500">
          VS SPOT: +{FORMAT_INR(Math.round(expectedProfit * 0.58))}
        </div>
      </div>

      {/* 6. Readout: Projected Sold-Out Prevention Rate */}
      <div className="p-2.5 flex flex-col justify-between">
        <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">
          SOLD-OUT PREVENTION RATE
        </div>
        <div className="my-1">
          <div className="font-mono text-base font-bold text-white tabular">
            {soldOutPreventionRate}%
          </div>
          <div className="text-[10px] font-mono text-tbo-emerald mt-0.5">
            Zero allotment stockouts
          </div>
        </div>
        <div className="text-[10px] font-mono text-zinc-500">
          PEAK AVAILABILITY LOCK
        </div>
      </div>
    </div>
  );
}
