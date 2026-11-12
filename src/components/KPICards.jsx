import React from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  DollarSign, 
  Percent, 
  Radio, 
  ArrowUpRight, 
  ArrowDownRight,
  Flame,
  Award
} from 'lucide-react';

export default function KPICards({ budget, currency, exchangeRate = 1 }) {
  // Dynamic metrics derived from budget
  const formatMoney = (amount) => {
    const converted = amount * exchangeRate;
    const prefix = currency === 'USD' ? '$' : currency === 'AED' ? 'AED ' : '₹';
    if (converted >= 1000000) {
      return `${prefix}${(converted / 1000000).toFixed(2)}M`;
    }
    return `${prefix}${(converted / 1000).toFixed(0)}K`;
  };

  const expectedProfit = budget * 0.285; // 28.5% expected profit with algorithmic pre-buy
  const spotBaselineProfit = budget * 0.118; // 11.8% baseline spot profit
  const profitUplift = expectedProfit - spotBaselineProfit;
  const bookableAvailability = 98.4; // % fill rate with pre-buy vs 78.2% baseline
  const lookToBookOptimized = '84:1'; // down from 152:1
  const downsideCvar = '3.8%'; // Capped downside with D-14 clauses

  const kpis = [
    {
      id: 'budget',
      title: 'Active Procurement Budget',
      value: formatMoney(budget),
      change: 'Dynamic Input Cap',
      isPositive: true,
      subtext: '44% Safe Haven · 36% Alpha · 20% Spot',
      icon: DollarSign,
      color: 'from-orange-500/20 to-amber-500/10 border-[#FF5F1F]/40 text-[#FF5F1F]'
    },
    {
      id: 'expected-profit',
      title: 'Risk-Adjusted Expected Profit',
      value: formatMoney(expectedProfit),
      change: '+28.5% Net Margin',
      isPositive: true,
      subtext: `+${formatMoney(profitUplift)} vs pure spot buy`,
      icon: TrendingUp,
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-400'
    },
    {
      id: 'availability',
      title: 'Bookable Availability Rate',
      value: `${bookableAvailability}%`,
      change: '+20.2% vs Spot OTAs',
      isPositive: true,
      subtext: 'Zero peak sold-outs across guaranteed allotments',
      icon: Layers,
      color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/40 text-cyan-400'
    },
    {
      id: 'downside-risk',
      title: 'Downside Risk Cap (CVaR 95%)',
      value: downsideCvar,
      change: '-72% Risk Reduction',
      isPositive: true,
      subtext: 'D-14 automated release & agency rollover clauses',
      icon: ShieldCheck,
      color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/40 text-purple-400'
    },
    {
      id: 'look-to-book',
      title: 'Look-to-Book Conversion',
      value: lookToBookOptimized,
      change: 'from 158:1 baseline',
      isPositive: true,
      subtext: 'Instant booking confirmation without supplier API timeouts',
      icon: Flame,
      color: 'from-pink-500/20 to-rose-500/10 border-pink-500/40 text-pink-400'
    },
    {
      id: 'signal-alpha',
      title: 'Signal Early-Mover Alpha',
      value: formatMoney(budget * 0.082),
      change: '+18 to +35 days',
      isPositive: true,
      subtext: 'Arbitrage locked before bedbanks hike spot rates',
      icon: Radio,
      color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/40 text-amber-400'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-5">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.id}
            className={`relative p-3.5 rounded-xl bg-gradient-to-b ${kpi.color} bg-slate-900/90 border backdrop-blur-sm transition-all hover:translate-y-[-2px] hover:shadow-lg`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-medium text-slate-400 truncate max-w-[120px]">
                {kpi.title}
              </span>
              <div className="p-1.5 rounded-lg bg-slate-800/80">
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-1">
              <div className="text-lg lg:text-xl font-extrabold tracking-tight text-white font-mono">
                {kpi.value}
              </div>
            </div>

            <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-emerald-400">
              <ArrowUpRight className="w-3 h-3 shrink-0" />
              <span className="truncate">{kpi.change}</span>
            </div>

            <div className="text-[10px] text-slate-400 truncate mt-1 border-t border-slate-800/60 pt-1">
              {kpi.subtext}
            </div>
          </div>
        );
      })}
    </div>
  );
}
