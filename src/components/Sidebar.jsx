import React from 'react';
import { 
  LayoutDashboard, 
  Radio, 
  PieChart, 
  SlidersHorizontal, 
  Bot, 
  FileCheck2, 
  Sparkles, 
  Building2, 
  Plane, 
  ShieldAlert, 
  TrendingUp,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  pendingApprovalsCount,
  budget,
  onResetBudget
}) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Executive Overview',
      subtitle: 'Inventory matrix & Look-to-Book',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'signals',
      label: 'External Signal Fusion',
      subtitle: 'Concerts, visas & weather triggers',
      icon: Radio,
      badge: 'Live Radar',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
    },
    {
      id: 'portfolio',
      label: 'Portfolio Risk Optimizer',
      subtitle: 'Markowitz MPT & Monte Carlo',
      icon: PieChart,
      badge: '10K Sims',
      badgeColor: 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
    },
    {
      id: 'simulator',
      label: 'Pre-Buy vs Spot Recommender',
      subtitle: 'Dynamic contract allocation',
      icon: SlidersHorizontal,
      badge: 'Interactive',
      badgeColor: 'bg-orange-500/20 text-[#FF5F1F] border border-[#FF5F1F]/30'
    },
    {
      id: 'agent',
      label: 'Autonomous Agent & Approvals',
      subtitle: 'Human-in-the-loop reasoning POs',
      icon: Bot,
      badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount} Action` : 'Ready',
      badgeColor: pendingApprovalsCount > 0 ? 'bg-red-500 text-white animate-pulse' : 'bg-emerald-500/20 text-emerald-400'
    },
    {
      id: 'pitchdeck',
      label: 'Pitch Deck & Architecture',
      subtitle: 'VOYAGEHACK 4.0 Presentation',
      icon: Sparkles,
      badge: 'Deck Ready',
      badgeColor: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold'
    }
  ];

  return (
    <aside className="w-64 lg:w-72 shrink-0 bg-[#0B0F19]/95 border-r border-slate-800/80 p-3.5 flex flex-col justify-between h-[calc(100vh-61px)] sticky top-[61px] overflow-y-auto">
      <div>
        {/* Navigation Section */}
        <div className="mb-2">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Decision-Support Modules
          </p>
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-start gap-3 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500/15 to-transparent text-white border-l-4 border-[#FF5F1F]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/60'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 transition-colors ${
                    isActive 
                      ? 'bg-[#FF5F1F] text-white shadow-md shadow-[#FF5F1F]/20' 
                      : 'bg-slate-800/70 text-slate-400 group-hover:text-slate-200 group-hover:bg-slate-800'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-xs font-semibold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold shrink-0 ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Problem Statement Context Card */}
        <div className="mt-5 p-3 rounded-xl bg-slate-900/90 border border-slate-800/80">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F1F]"></span>
              Hackathon Scope
            </span>
            <span className="text-[10px] font-mono text-[#FF5F1F]">VOYAGEHACK 4.0</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Maximize TBO bookable availability & expected margin within a fixed budget via pre-buys, supplier NDC/allotments & risk hedging.
          </p>
        </div>
      </div>

      {/* Bottom Profile / Quick Stats */}
      <div className="mt-4 pt-3 border-t border-slate-800/70 space-y-2">
        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-mono">Current Budget</div>
            <div className="font-bold text-slate-100 font-mono">
              ${(budget / 1000000).toFixed(2)}M USD
            </div>
          </div>
          <button 
            onClick={onResetBudget}
            className="text-[10px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FF5F1F] to-amber-500 flex items-center justify-center text-xs font-bold text-white">
            TO
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-slate-200 truncate">TBO Procurement Desk</div>
            <div className="text-[10px] text-slate-400 font-mono">Enterprise B2B Tier 1</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
