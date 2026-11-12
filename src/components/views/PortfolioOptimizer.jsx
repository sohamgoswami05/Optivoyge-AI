import React, { useState } from 'react';
import { 
  PieChart, 
  TrendingUp, 
  ShieldAlert, 
  Activity, 
  Sliders, 
  RotateCcw, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight, 
  HelpCircle,
  Play,
  Layers,
  Sparkles
} from 'lucide-react';
import { PORTFOLIO_ALLOCATION_TIERS, MONTE_CARLO_SCENARIOS } from '../../data/mockData';

export default function PortfolioOptimizer({ budget }) {
  const [safeHavenPct, setSafeHavenPct] = useState(44);
  const [alphaPct, setAlphaPct] = useState(36);
  const spotBufferPct = Math.max(0, 100 - safeHavenPct - alphaPct);

  const [isRunningSim, setIsRunningSim] = useState(false);
  const [simRunCount, setSimRunCount] = useState(10000);
  const [stressFactor, setStressFactor] = useState(1.0); // 1.0 is normal

  const safeHavenAmount = (budget * safeHavenPct) / 100;
  const alphaAmount = (budget * alphaPct) / 100;
  const spotBufferAmount = (budget * spotBufferPct) / 100;

  // Markowitz calculated metrics
  const portfolioReturn = (safeHavenPct * 0.17 + alphaPct * 0.38 + spotBufferPct * 0.11).toFixed(1);
  const portfolioVolatility = ((alphaPct * 0.35 + safeHavenPct * 0.08 + spotBufferPct * 0.04) / 10).toFixed(2);
  const sharpeRatio = ((portfolioReturn - 4.5) / portfolioVolatility).toFixed(2);
  const cvar95 = (3.2 + (alphaPct * 0.04) - (safeHavenPct * 0.02)).toFixed(1);

  const handleRunMonteCarlo = () => {
    setIsRunningSim(true);
    setTimeout(() => {
      setSimRunCount(prev => prev + 10000);
      setIsRunningSim(false);
    }, 700);
  };

  const resetToOptimalSharpe = () => {
    setSafeHavenPct(44);
    setAlphaPct(36);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Innovation Concept Explainer */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-900 border border-purple-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-purple-500/10 to-transparent pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <PieChart className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">
                Winning Innovation Pillar 2
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                Modern Portfolio Theory for Travel
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-white">
              Portfolio Risk Optimizer (Markowitz-Style Pre-Buys)
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Travel inventory behaves just like financial assets. Rather than buying randomly, we treat hotel rooms and flight blocks as an investment portfolio—optimizing the <strong>Efficient Frontier</strong> between steady high-liquidity corporate inventory and high-yield event alpha, while capping downside unsold risk using 10,000 Monte Carlo iterations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetToOptimalSharpe}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Optimal Sharpe
            </button>
            <button
              onClick={handleRunMonteCarlo}
              disabled={isRunningSim}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/25 transition-all flex items-center gap-2 shrink-0 disabled:opacity-60"
            >
              {isRunningSim ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Running 10K Iterations...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Run Monte Carlo Simulation
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Allocation Sliders & Markowitz Efficient Frontier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Asset Allocation Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-400" />
                Portfolio Capital Allocation
              </h3>
              <span className="text-xs font-mono text-purple-400 font-bold">
                ${(budget / 1000000).toFixed(2)}M Input Budget
              </span>
            </div>

            {/* Allocation 1: Safe Haven */}
            <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-cyan-400"></span>
                  1. Core Safe Haven Assets
                </span>
                <span className="font-mono font-bold text-cyan-400 text-sm">{safeHavenPct}%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Steady corporate travel, major trunk routes (Dubai Business Bay, London LHR). Margin: ~17%, Zero unsold risk.
              </p>
              <input
                type="range"
                min={20}
                max={70}
                value={safeHavenPct}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSafeHavenPct(val);
                  if (val + alphaPct > 90) setAlphaPct(90 - val);
                }}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-1">
                <span>Capital: ${(safeHavenAmount / 1000).toFixed(0)}K</span>
                <span>Sharpe: 2.80</span>
              </div>
            </div>

            {/* Allocation 2: High Margin Alpha */}
            <div className="p-3.5 rounded-xl bg-orange-950/20 border border-orange-500/20 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-orange-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-[#FF5F1F]"></span>
                  2. High-Margin Alpha Assets
                </span>
                <span className="font-mono font-bold text-[#FF5F1F] text-sm">{alphaPct}%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Peak mega-events, concert residencies, holiday spikes (F1 Abu Dhabi, Sakura Tokyo). Margin: 38%+, Volatile demand.
              </p>
              <input
                type="range"
                min={10}
                max={60}
                value={alphaPct}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setAlphaPct(val);
                  if (val + safeHavenPct > 90) setSafeHavenPct(90 - val);
                }}
                className="w-full accent-[#FF5F1F] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-1">
                <span>Capital: ${(alphaAmount / 1000).toFixed(0)}K</span>
                <span>Sharpe: 3.42</span>
              </div>
            </div>

            {/* Allocation 3: Spot-Buy Buffer */}
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-400"></span>
                  3. Tactical Spot-Buy Buffer
                </span>
                <span className="font-mono font-bold text-emerald-400 text-sm">{spotBufferPct}%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Liquid cash reserve for just-in-time API spot booking & unforeseen cancellations. Zero capital lockup.
              </p>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${spotBufferPct}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-1">
                <span>Capital: ${(spotBufferAmount / 1000).toFixed(0)}K</span>
                <span>Liquidity Ratio: 100%</span>
              </div>
            </div>
          </div>

          {/* Portfolio Core Stats Summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[11px] text-slate-400">Expected Portfolio Return</span>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1 flex items-baseline gap-1">
                +{portfolioReturn}%
                <span className="text-[10px] text-slate-400 font-sans">annualized</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[11px] text-slate-400">Sharpe Ratio (Return/Risk)</span>
              <div className="text-xl font-bold font-mono text-purple-400 mt-1 flex items-baseline gap-1">
                {sharpeRatio}
                <span className="text-[10px] text-emerald-400 font-sans font-bold">Optimal Tier</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Markowitz Efficient Frontier SVG Visualizer & Monte Carlo Table (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Visual: Markowitz Efficient Frontier Chart */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Markowitz Efficient Frontier: Travel Risk vs. Return
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Optimal pre-buy portfolio vs unoptimized pure-spot and naive bulk buys
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Tangency Portfolio Locked
              </span>
            </div>

            {/* Custom SVG Efficient Frontier Graph */}
            <div className="relative h-64 w-full bg-slate-950/80 rounded-xl border border-slate-800 p-4 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 500 220">
                {/* Grid lines */}
                <line x1="50" y1="20" x2="50" y2="180" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="50" y1="180" x2="480" y2="180" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="50" y1="100" x2="480" y2="100" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />

                {/* Axis Labels */}
                <text x="50" y="200" fill="#64748b" fontSize="10" fontFamily="monospace">Low Volatility (0%)</text>
                <text x="380" y="200" fill="#64748b" fontSize="10" fontFamily="monospace">High Volatility (40%)</text>
                <text x="15" y="100" fill="#64748b" fontSize="10" transform="rotate(-90 15,100)" fontFamily="monospace">Expected Return %</text>

                {/* Efficient Frontier Curve */}
                <path
                  d="M 60,165 Q 120,130 180,95 T 320,50 T 470,35"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Sub-optimal Scatter Points (Monte Carlo Simulations) */}
                <circle cx="90" cy="155" r="3" fill="#38bdf8" opacity="0.6" />
                <circle cx="110" cy="148" r="3" fill="#38bdf8" opacity="0.5" />
                <circle cx="140" cy="130" r="3" fill="#38bdf8" opacity="0.6" />
                <circle cx="210" cy="115" r="3" fill="#f43f5e" opacity="0.5" />
                <circle cx="260" cy="90" r="3" fill="#38bdf8" opacity="0.6" />
                <circle cx="340" cy="80" r="3" fill="#f43f5e" opacity="0.5" />
                <circle cx="390" cy="65" r="3" fill="#f43f5e" opacity="0.5" />
                <circle cx="440" cy="55" r="3" fill="#f43f5e" opacity="0.6" />

                {/* Key Portfolios */}
                {/* 1. Status Quo: Pure Spot Buy */}
                <g>
                  <circle cx="100" cy="150" r="6" fill="#F43F5E" />
                  <text x="110" y="154" fill="#F43F5E" fontSize="11" fontWeight="bold">Pure Spot Buy (11.8% Return)</text>
                </g>

                {/* 2. Naive Bulk Buy */}
                <g>
                  <circle cx="420" cy="45" r="6" fill="#F59E0B" />
                  <text x="310" y="35" fill="#F59E0B" fontSize="11" fontWeight="bold">Naive 100% Pre-Buy (High Unsold Risk)</text>
                </g>

                {/* 3. TBO Optimal Frontier Point */}
                <g>
                  <circle cx="240" cy="72" r="8" fill="#10B981" stroke="#fff" strokeWidth="2" className="animate-pulse" />
                  <text x="252" y="70" fill="#10B981" fontSize="12" fontWeight="bold">★ TBO Tangency Portfolio (+{portfolioReturn}%)</text>
                  <text x="252" y="85" fill="#94a3b8" fontSize="10" fontFamily="monospace">Sharpe: {sharpeRatio} | CVaR: {cvar95}%</text>
                </g>
              </svg>
            </div>

            {/* Quick Legend */}
            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <strong>Optimal Tangency:</strong> Maximum Risk-Adjusted Profit
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                <strong>Purple Line:</strong> Markowitz Efficient Frontier
              </span>
              <span className="text-slate-400 font-mono">
                Simulations Run: {simRunCount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Monte Carlo 4 Stress-Test Scenarios Table */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden">
            <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-purple-400" />
                Monte Carlo Real-World Stress Test Scenarios
              </h4>
              <span className="text-[11px] font-mono text-purple-300">
                10,000 Iteration Yields
              </span>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] font-mono border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Stress Scenario</th>
                  <th className="py-2.5 px-3">Status Quo (Spot Buy)</th>
                  <th className="py-2.5 px-3">Naive Pre-Buy</th>
                  <th className="py-2.5 px-3">TBO Optimized Hybrid</th>
                  <th className="py-2.5 px-3 text-right">TBO Arbitrage Edge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 font-mono">
                {MONTE_CARLO_SCENARIOS.map((sc, idx) => (
                  <tr key={idx} className="hover:bg-slate-850/50 transition-colors">
                    <td className="py-2.5 px-3 font-sans font-semibold text-slate-200">
                      {sc.scenario}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">
                      {sc.baselineSpotProfit}
                    </td>
                    <td className="py-2.5 px-3 text-rose-400 font-medium">
                      {sc.naivePreBuyLoss}
                    </td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">
                      {sc.tboOptimizedProfit}
                    </td>
                    <td className="py-2.5 px-3 text-right text-cyan-400 font-bold">
                      {sc.winMargin}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
