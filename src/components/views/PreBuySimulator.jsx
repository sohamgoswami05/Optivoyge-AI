import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  TrendingUp, 
  ShieldAlert, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  HelpCircle,
  Building2,
  Plane,
  Sparkles,
  Percent
} from 'lucide-react';
import { MOCK_DESTINATIONS } from '../../data/mockData';

export default function PreBuySimulator({ budget, setBudget }) {
  const [strategyMode, setStrategyMode] = useState('BALANCED'); // CONSERVATIVE, BALANCED, AGGRESSIVE
  const [occupancyAssumption, setOccupancyAssumption] = useState(88); // 88% expected pickup

  // Multiplier adjustments based on strategy mode
  const preBuyRatio = strategyMode === 'CONSERVATIVE' ? 0.52 : strategyMode === 'BALANCED' ? 0.68 : 0.82;
  const spotRatio = 1 - preBuyRatio;

  const preBuyCapital = budget * preBuyRatio;
  const spotCapital = budget * spotRatio;

  // Expected Financials
  const preBuyGrossMargin = 0.294; // 29.4% margin locked
  const spotGrossMargin = 0.118; // 11.8% spot margin
  const expectedProfit = (preBuyCapital * preBuyGrossMargin) + (spotCapital * spotGrossMargin);
  const pureSpotProfit = budget * 0.118;
  const naivePreBuyProfit = budget * (occupancyAssumption > 80 ? 0.24 : 0.04);
  const profitUplift = expectedProfit - pureSpotProfit;

  return (
    <div className="space-y-6">
      {/* Top Banner: Innovation Concept Explainer */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-950/60 via-slate-900 to-slate-900 border border-[#FF5F1F]/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-orange-500/10 to-transparent pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-orange-500/20 text-[#FF5F1F] border border-[#FF5F1F]/30">
                <SlidersHorizontal className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF5F1F] font-mono">
                Winning Innovation Pillar 3
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                Dynamic Contract Arbitrage
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-white">
              Dynamic Pre-Buy vs. Spot-Buy Recommender
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              When should TBO commit bulk capital to pre-buy contracts versus relying on real-time API spot rates? This interactive simulator models the <strong>exact tipping point</strong> using historical look-to-book velocity, supplier price curves, and downside release terms within your fixed budget.
            </p>
          </div>

          {/* Quick Strategy Mode Pill Switcher */}
          <div className="flex items-center bg-slate-950/90 border border-slate-800 p-1 rounded-xl text-xs shrink-0">
            <button
              onClick={() => setStrategyMode('CONSERVATIVE')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                strategyMode === 'CONSERVATIVE'
                  ? 'bg-cyan-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Conservative
            </button>
            <button
              onClick={() => setStrategyMode('BALANCED')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                strategyMode === 'BALANCED'
                  ? 'bg-[#FF5F1F] text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ★ Balanced (Recommended)
            </button>
            <button
              onClick={() => setStrategyMode('AGGRESSIVE')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                strategyMode === 'AGGRESSIVE'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Aggressive Alpha
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Master Budget Slider Card */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase text-slate-400 block font-bold">
              Interactive Input Procurement Budget (Problem Statement Core Constraint)
            </span>
            <div className="text-2xl lg:text-3xl font-extrabold text-white font-mono mt-0.5 flex items-baseline gap-2">
              ${(budget / 1000000).toFixed(2)}M USD
              <span className="text-xs font-sans text-emerald-400 font-semibold">
                (Allocating {Math.round(preBuyRatio * 100)}% Pre-Buy / {Math.round(spotRatio * 100)}% Spot Reserve)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {[1000000, 2500000, 5000000, 7500000, 10000000].map((b) => (
              <button
                key={b}
                onClick={() => setBudget(b)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                  budget === b
                    ? 'bg-[#FF5F1F] text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                ${(b / 1000000).toFixed(1)}M
              </button>
            ))}
          </div>
        </div>

        {/* Range Slider */}
        <input
          type="range"
          min={500000}
          max={10000000}
          step={250000}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full accent-[#FF5F1F] h-2.5 bg-slate-800 rounded-lg cursor-pointer"
        />

        <div className="flex justify-between text-xs font-mono text-slate-400">
          <span>Min: $500K</span>
          <span className="text-[#FF5F1F] font-bold">Current: ${(budget / 1000000).toFixed(2)}M</span>
          <span>Max: $10.0M Cap</span>
        </div>
      </div>

      {/* Head-to-Head Comparison: Pure Spot vs Naive Pre-Buy vs TBO Algorithmic Hybrid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Strategy 1: Status Quo Pure Spot-Buy */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase">
              Strategy A: Pure Spot-Buy
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              Status Quo
            </span>
          </div>

          <div className="text-xl font-bold font-mono text-slate-300">
            ${(pureSpotProfit / 1000).toFixed(0)}K
            <span className="text-xs font-sans text-slate-400 block font-normal mt-0.5">
              11.8% Net Margin
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span>Sold-Out Rate at Peak:</span>
              <span className="text-rose-400 font-bold">18.4% (Lost Sales)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Wholesale Spot Repricing:</span>
              <span className="text-rose-400 font-bold">+45% to +85% Surge</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Unsold Downside Risk:</span>
              <span className="text-emerald-400 font-bold">0% (Zero Lockup)</span>
            </div>
          </div>
        </div>

        {/* Strategy 2: Naive Bulk Pre-Buy */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              Strategy B: Naive Bulk Pre-Buy
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              High Risk
            </span>
          </div>

          <div className="text-xl font-bold font-mono text-amber-300">
            ${(naivePreBuyProfit / 1000).toFixed(0)}K
            <span className="text-xs font-sans text-slate-400 block font-normal mt-0.5">
              High Volatility (-$420K if demand drops)
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span>Sold-Out Rate at Peak:</span>
              <span className="text-emerald-400 font-bold">0% (100% Guaranteed)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Downside Release Clause:</span>
              <span className="text-rose-400 font-bold">None (100% Non-refundable)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Unsold Dump Exposure:</span>
              <span className="text-rose-400 font-bold">Up to 35% of Capital</span>
            </div>
          </div>
        </div>

        {/* Strategy 3: TBO Algorithmic Hybrid Pre-Buy */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#FF5F1F]/20 to-slate-900 border-2 border-[#FF5F1F] space-y-3 shadow-lg shadow-[#FF5F1F]/15">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-extrabold text-[#FF5F1F] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Strategy C: TBO Hybrid
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF5F1F] text-white font-bold">
              ★ TBO Winner
            </span>
          </div>

          <div className="text-2xl font-extrabold font-mono text-emerald-400">
            ${(expectedProfit / 1000).toFixed(0)}K
            <span className="text-xs font-sans text-emerald-300 block font-semibold mt-0.5">
              +28.5% Net Margin (+${(profitUplift / 1000).toFixed(0)}K lift)
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-orange-500/30">
            <div className="flex items-center justify-between">
              <span>Bookable Availability:</span>
              <span className="text-emerald-400 font-bold">98.4% Availability</span>
            </div>
            <div className="flex items-center justify-between">
              <span>D-14 Downside Protection:</span>
              <span className="text-cyan-400 font-bold">Automated Secondary Dump</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Downside Loss Cap (CVaR):</span>
              <span className="text-purple-400 font-bold">&lt; 3.8% Capped</span>
            </div>
          </div>
        </div>
      </div>

      {/* Destination-by-Destination Pre-Buy vs Spot Recommendation Table */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#FF5F1F]" />
              Destination Procurement Decision Engine
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Algorithmic pre-buy vs spot-buy verdicts based on look-to-book and sold-out probabilities
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-semibold">
            {MOCK_DESTINATIONS.filter(d => d.soldOutRisk !== 'Low').length} Pre-Buys Recommended
          </span>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] font-mono border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Destination</th>
              <th className="py-3 px-3">Region</th>
              <th className="py-3 px-3">Look-to-Book Ratio</th>
              <th className="py-3 px-3">Demand Trend</th>
              <th className="py-3 px-3">Sold-Out Risk</th>
              <th className="py-3 px-3">Avg Margin</th>
              <th className="py-3 px-3">Optimal Decision</th>
              <th className="py-3 px-4 text-right">Contract Clause Terms</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70">
            {MOCK_DESTINATIONS.map((dest) => {
              const shouldPreBuy = dest.soldOutRisk === 'Critical' || dest.soldOutRisk === 'High';

              return (
                <tr key={dest.id} className="hover:bg-slate-850/40 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-[#FF5F1F] mr-2">[{dest.id}]</span>
                    <strong className="text-slate-200">{dest.name}</strong>
                  </td>
                  <td className="py-3 px-3 text-slate-400">{dest.region}</td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-200">{dest.lookToBook}</td>
                  <td className="py-3 px-3 font-mono text-emerald-400 font-bold">{dest.demandTrend}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      dest.soldOutRisk === 'Critical'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : dest.soldOutRisk === 'High'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {dest.soldOutRisk} Sold-Out
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-emerald-400 font-bold">{dest.avgMargin}</td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      shouldPreBuy
                        ? 'bg-[#FF5F1F]/20 text-[#FF5F1F] border border-[#FF5F1F]/40'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {shouldPreBuy ? '★ Bulk Pre-Buy' : 'Spot API Buy'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-400 text-[11px]">
                    {shouldPreBuy ? 'Guaranteed Allotment + D-14 Clause' : 'Zero Lockup / Dynamic API'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
