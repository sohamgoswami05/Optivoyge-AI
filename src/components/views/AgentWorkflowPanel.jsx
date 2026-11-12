import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Play, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  FileCheck2, 
  RotateCcw, 
  ArrowRight, 
  Check, 
  X, 
  Sparkles,
  Cpu,
  Layers,
  Terminal,
  DollarSign
} from 'lucide-react';
import { MOCK_AGENT_REASONING_LOG } from '../../data/mockData';
import confetti from 'canvas-confetti';

export default function AgentWorkflowPanel({ 
  inventory, 
  onOpenApproval, 
  budget, 
  onApproveItem 
}) {
  const [logs, setLogs] = useState(MOCK_AGENT_REASONING_LOG);
  const [isRunningReasoning, setIsRunningReasoning] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(4);
  const [approvedPOs, setApprovedPOs] = useState({});

  const pendingItems = inventory.filter(
    (item) => item.status === 'Pre-Buy Recommended' && !approvedPOs[item.id]
  );

  const handleRunAgentWorkflow = () => {
    setIsRunningReasoning(true);
    setActiveStepIndex(0);

    const steps = [
      { step: 0, delay: 600 },
      { step: 1, delay: 1400 },
      { step: 2, delay: 2200 },
      { step: 3, delay: 3000 },
      { step: 4, delay: 3800 }
    ];

    steps.forEach(({ step, delay }) => {
      setTimeout(() => {
        setActiveStepIndex(step);
        if (step === 4) {
          setIsRunningReasoning(false);
        }
      }, delay);
    });
  };

  const handleQuickApprove = (item) => {
    try {
      confetti({
        particleCount: 70,
        spread: 55,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.error(e);
    }
    setApprovedPOs((prev) => ({ ...prev, [item.id]: true }));
    onApproveItem(item.id, item.allotment);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Bot className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              Requirement 3: Live Agent Decision Engine
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              Human-in-the-Loop Safe Guarded
            </span>
          </div>
          <h2 className="text-lg font-extrabold text-white">
            Autonomous Inventory Optimization Agent
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            The agent continuously consumes real-time search streams, checks signal correlations, computes Markowitz covariance matrices, and drafts wholesale procurement POs. High-value commitments <strong>(&gt;$100K)</strong> require executive human-in-the-loop sign-off before contract execution.
          </p>
        </div>

        <button
          onClick={handleRunAgentWorkflow}
          disabled={isRunningReasoning}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 shrink-0 disabled:opacity-60"
        >
          {isRunningReasoning ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              Agent Executing Reasoning Cycle...
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              Trigger Live Optimization Cycle
            </>
          )}
        </button>
      </div>

      {/* Main Grid: Step-by-Step Reasoning Trace & Pending Action Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Live Agent Reasoning Feed (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Autonomous Step-by-Step Reasoning Trace
              </h3>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Agent Loop
              </span>
            </div>

            {/* Step list */}
            <div className="space-y-3">
              {logs.map((log, idx) => {
                const isStepActive = idx <= activeStepIndex;
                const isCurrent = idx === activeStepIndex && isRunningReasoning;

                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border transition-all text-xs ${
                      isStepActive
                        ? isCurrent
                          ? 'bg-slate-850 border-emerald-500 shadow-md shadow-emerald-500/10'
                          : 'bg-slate-850/70 border-slate-700/80'
                        : 'bg-slate-900/40 border-slate-800/40 opacity-40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                          isStepActive
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-slate-200">
                          {log.step}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {log.timestamp}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed pl-7">
                      {log.details}
                    </p>

                    {isCurrent && (
                      <div className="mt-2 pl-7 flex items-center gap-2 text-[10px] text-emerald-400 font-mono">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        Analyzing covariance across 10,000 vectors...
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Human-in-the-Loop Action Cards (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-[#FF5F1F]" />
                  Human-in-the-Loop Purchase Orders ({pendingItems.length} Pending)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Actionable procurement recommendations awaiting executive authorization
                </p>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-orange-500/10 text-[#FF5F1F] border border-[#FF5F1F]/20 font-bold">
                Action Required
              </span>
            </div>

            {pendingItems.length === 0 ? (
              <div className="p-8 rounded-xl bg-slate-850/50 border border-slate-800 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-sm text-slate-200">All Pre-Buy POs Authorized!</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Your procurement budget is fully hedged with optimal allocations across hotels and flight blocks.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {pendingItems.slice(0, 3).map((item) => {
                  const poTotal = item.recommendedBudget;
                  const poMargin = item.expectedNetProfit;

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-slate-850/80 border border-slate-700/80 space-y-3 hover:border-slate-600 transition-all shadow-md"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-[#FF5F1F]/15 text-[#FF5F1F] border border-[#FF5F1F]/30">
                              {item.id}
                            </span>
                            <span className="text-xs font-semibold text-slate-200">
                              {item.title}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                            <span>Supplier: <strong className="text-slate-300">{item.supplier}</strong></span>
                            <span>•</span>
                            <span>Dates: <strong className="text-slate-300">{item.dates}</strong></span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[10px] text-slate-400 uppercase font-mono block">PO Capital</span>
                          <span className="text-base font-bold font-mono text-white">
                            ${(poTotal / 1000).toFixed(0)}K
                          </span>
                        </div>
                      </div>

                      {/* Financial Badges */}
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Allotment</span>
                          <span className="font-mono font-bold text-slate-200">{item.allotment} units</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Expected Margin</span>
                          <span className="font-mono font-bold text-emerald-400">+{item.marginPct}%</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Net Expected Profit</span>
                          <span className="font-mono font-bold text-emerald-400">+${(poMargin / 1000).toFixed(1)}K</span>
                        </div>
                      </div>

                      {/* Downside Clause Tag */}
                      <div className="text-[11px] text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20 flex items-center justify-between">
                        <span>Downside Shield: {item.downsideProtection}</span>
                        <span className="font-mono text-purple-400 font-bold">D-{item.releaseDays}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-800">
                        <button
                          onClick={() => onOpenApproval(item)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                        >
                          Modify Allotment / Inspect
                        </button>
                        <button
                          onClick={() => handleQuickApprove(item)}
                          className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#FF5F1F] to-[#E54E10] text-white text-xs font-bold shadow-md shadow-[#FF5F1F]/20 hover:shadow-[#FF5F1F]/40 transition-all flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          One-Click Authorize
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
