import React from 'react';
import { 
  Compass, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  BarChart3, 
  TrendingUp, 
  Radio, 
  Sparkles,
  Presentation,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  currency, 
  setCurrency, 
  isPitchDeckMode, 
  setIsPitchDeckMode,
  agentRunning,
  pendingApprovalsCount
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-6 py-2.5 transition-all">
      <div className="flex items-center justify-between">
        {/* Left: Brand & Track */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5F1F] to-[#E54E10] shadow-lg shadow-[#FF5F1F]/25 text-white font-black tracking-wider">
            <span className="text-xl">TBO</span>
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                VOYAGE OPTIMIZER™
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-orange-500/20 text-[#FF5F1F] border border-[#FF5F1F]/30">
                  VOYAGEHACK 4.0
                </span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Track 1: <span className="text-slate-200">Automate Travel Inventory Pre-Buy & Risk Optimization</span>
            </p>
          </div>
        </div>

        {/* Center: Live Engine Status Pointers */}
        <div className="hidden xl:flex items-center gap-4 bg-slate-900/80 border border-slate-800 rounded-full px-4 py-1.5 text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-slate-400">External Feeds:</span>
            <span className="text-emerald-400 font-medium">6 Bedbanks & 4 NDC Live</span>
          </div>
          <div className="h-3 w-px bg-slate-700" />
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">Markowitz Engine:</span>
            <span className="text-cyan-400 font-medium">10K Monte Carlo / sec</span>
          </div>
          <div className="h-3 w-px bg-slate-700" />
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-slate-400">CVaR Guard:</span>
            <span className="text-purple-400 font-medium">Active (D-14 Auto Release)</span>
          </div>
        </div>

        {/* Right: Currency switcher, Pitch Deck mode & Agent status */}
        <div className="flex items-center gap-2.5">
          {/* Currency Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
            {['USD', 'AED', 'INR'].map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-2 py-1 rounded font-mono font-medium transition-colors ${
                  currency === curr
                    ? 'bg-[#FF5F1F] text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {curr === 'USD' ? '$ USD' : curr === 'AED' ? 'AED' : '₹ INR'}
              </button>
            ))}
          </div>

          {/* Agent Activity Badge */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>AI Agent: {agentRunning ? 'Hedging Active' : 'Synced'}</span>
            {pendingApprovalsCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#FF5F1F] text-white text-[10px] font-bold">
                {pendingApprovalsCount} PO
              </span>
            )}
          </div>

          {/* Pitch Deck Snapshot Mode Toggle */}
          <button
            onClick={() => setIsPitchDeckMode(!isPitchDeckMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isPitchDeckMode
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-800/80 hover:bg-slate-700/80 text-purple-300 border border-purple-500/30'
            }`}
            title="Toggle Pitch Deck Presenter Mode for high-res jury screenshots"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Pitch Deck View</span>
          </button>
        </div>
      </div>
    </header>
  );
}
