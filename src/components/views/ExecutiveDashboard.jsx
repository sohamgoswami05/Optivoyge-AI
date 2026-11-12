import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Building2, 
  Plane, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Flame, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight, 
  Check, 
  Clock, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { MOCK_B2B_AGENCIES } from '../../data/mockData';

export default function ExecutiveDashboard({ 
  inventory, 
  onOpenApproval, 
  onOpenDetail,
  onNavigateToTab
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedDestination, setSelectedDestination] = useState('ALL');

  const destinations = ['ALL', 'Dubai, UAE', 'London, UK', 'Singapore', 'Paris, France', 'Tokyo, Japan', 'Phuket, Thailand', 'Bali, Indonesia'];

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'ALL' || item.type.toUpperCase().includes(typeFilter);
    const matchesCategory = categoryFilter === 'ALL' || item.category.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchesDest = selectedDestination === 'ALL' || item.destination === selectedDestination;

    return matchesSearch && matchesType && matchesCategory && matchesDest;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by TBO ID (e.g. TBOH-98231), Hotel, Airline block or Destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#FF5F1F]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Type Filter */}
          <div className="flex items-center bg-slate-950/80 p-0.5 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setTypeFilter('ALL')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                typeFilter === 'ALL' ? 'bg-[#FF5F1F] text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Assets
            </button>
            <button
              onClick={() => setTypeFilter('HOTEL')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1 ${
                typeFilter === 'HOTEL' ? 'bg-[#FF5F1F] text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3 h-3" /> Hotels
            </button>
            <button
              onClick={() => setTypeFilter('FLIGHT')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1 ${
                typeFilter === 'FLIGHT' ? 'bg-[#FF5F1F] text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Plane className="w-3 h-3" /> Flight Blocks
            </button>
          </div>

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-[#FF5F1F]"
          >
            <option value="ALL">All Risk Tiers</option>
            <option value="Alpha">High-Margin Alpha</option>
            <option value="Safe Haven">Core Safe Haven</option>
            <option value="Buffer">Tactical Spot Buffer</option>
          </select>

          {/* Destination Dropdown */}
          <select
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            className="px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-[#FF5F1F]"
          >
            {destinations.map((d) => (
              <option key={d} value={d}>
                {d === 'ALL' ? 'All Destinations' : d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Table: Enterprise Inventory Matrix */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5F1F]"></span>
              Travel Inventory Procurement Matrix
            </h3>
            <span className="text-xs text-slate-400">
              ({filteredInventory.length} recommended assets evaluated)
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Pre-Buy Arbitrage Locked
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span> External Event Trigger
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] font-mono border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">TBO ID & Item</th>
                <th className="py-3 px-3">Destination & Dates</th>
                <th className="py-3 px-3">Risk Tier</th>
                <th className="py-3 px-3">Look-to-Book</th>
                <th className="py-3 px-3">Wholesale Pre-Buy</th>
                <th className="py-3 px-3">Spot Peak</th>
                <th className="py-3 px-3">TBO Selling Price</th>
                <th className="py-3 px-3">Margin & Net Profit</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Procurement Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {filteredInventory.map((item) => {
                const isCommitted = item.status === 'Committed & Hedged';
                const isHotel = item.type === 'Hotel';

                return (
                  <tr 
                    key={item.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* TBO ID & Title */}
                    <td className="py-3 px-4">
                      <div className="flex items-start gap-2.5">
                        <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                          isHotel ? 'bg-amber-500/10 text-amber-400' : 'bg-cyan-500/10 text-cyan-400'
                        }`}>
                          {isHotel ? <Building2 className="w-3.5 h-3.5" /> : <Plane className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-[#FF5F1F] text-[11px]">
                              {item.id}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              ({item.allotment} {isHotel ? 'R/N' : 'seats'})
                            </span>
                          </div>
                          <div className="font-semibold text-slate-200 hover:text-white transition-colors max-w-xs truncate">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate max-w-xs">
                            Supplier: {item.supplier}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Destination & Dates */}
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-200">{item.destination}</div>
                      <div className="text-[11px] text-slate-400">{item.dates}</div>
                      <div className="text-[10px] text-cyan-400/90 truncate max-w-[160px] flex items-center gap-1 mt-0.5">
                        <Sparkles className="w-2.5 h-2.5 shrink-0" />
                        {item.eventTrigger}
                      </div>
                    </td>

                    {/* Risk Tier */}
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        item.category.includes('Alpha')
                          ? 'bg-orange-500/15 text-[#FF5F1F] border border-orange-500/30'
                          : item.category.includes('Safe')
                          ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                          : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {item.category}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-1 font-mono">
                        Rel: D-{item.releaseDays}
                      </div>
                    </td>

                    {/* Look-to-Book Ratio */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1 font-mono font-bold text-slate-200">
                        <Flame className="w-3.5 h-3.5 text-[#FF5F1F]" />
                        {item.lookToBook}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Cancel: {item.cancellationRate}
                      </div>
                    </td>

                    {/* Wholesale Pre-Buy */}
                    <td className="py-3 px-3 font-mono">
                      <div className="font-bold text-emerald-400 text-sm">
                        ${item.preBuyRate}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Total: ${(item.recommendedBudget / 1000).toFixed(0)}K
                      </div>
                    </td>

                    {/* Spot Peak */}
                    <td className="py-3 px-3 font-mono">
                      <div className="text-slate-400 line-through text-xs">
                        ${item.projectedSpotRate}
                      </div>
                      <div className="text-[10px] text-rose-400 font-semibold">
                        +{(Math.round(((item.projectedSpotRate - item.preBuyRate) / item.preBuyRate) * 100))}% Spot Surge
                      </div>
                    </td>

                    {/* TBO Selling Price */}
                    <td className="py-3 px-3 font-mono">
                      <div className="font-bold text-cyan-300 text-sm">
                        ${item.dynamicSellingPrice}
                      </div>
                      <div className="text-[10px] text-emerald-400/90 font-sans">
                        Dynamic Price Model
                      </div>
                    </td>

                    {/* Margin & Expected Profit */}
                    <td className="py-3 px-3 font-mono">
                      <div className="font-bold text-emerald-400 text-sm">
                        +{item.marginPct}%
                      </div>
                      <div className="text-[11px] text-slate-300 font-semibold">
                        +${(item.expectedNetProfit / 1000).toFixed(1)}K net
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        isCommitted
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : item.status.includes('Recommended')
                          ? 'bg-orange-500/20 text-[#FF5F1F] border border-orange-500/40'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {isCommitted ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            Committed
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" />
                            Pre-Buy Ready
                          </>
                        )}
                      </span>
                    </td>

                    {/* Action Button */}
                    <td className="py-3 px-4 text-right">
                      {isCommitted ? (
                        <div className="flex items-center justify-end gap-1 text-[11px] text-emerald-400 font-mono">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Hedged
                        </div>
                      ) : (
                        <button
                          onClick={() => onOpenApproval(item)}
                          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#FF5F1F] to-[#E54E10] text-white font-bold text-xs hover:shadow-lg hover:shadow-[#FF5F1F]/25 transition-all flex items-center gap-1.5 ml-auto"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Authorize PO
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Column Bottom Widgets: Live Agency Distribution & Downside Watchdog */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Widget 1: Real-Time B2B Travel Agency Demand Allocation */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                B2B Agency Pre-Allotment Commitments
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Top enterprise agencies pulling from TBO pre-bought inventory pools
              </p>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Live API Sync
            </span>
          </div>

          <div className="space-y-3">
            {MOCK_B2B_AGENCIES.map((agency) => (
              <div 
                key={agency.id}
                className="p-3 rounded-xl bg-slate-850/60 border border-slate-800/80 flex items-center justify-between hover:bg-slate-850 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-slate-200">{agency.name}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                      {agency.tier}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                    <span>Monthly GMV: <strong className="text-slate-200">{agency.monthlyVolume}</strong></span>
                    <span>•</span>
                    <span>L2B: <strong className="text-emerald-400 font-mono">{agency.lookToBook}</strong></span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    Credit: {agency.creditLimit}
                  </span>
                  <div className="text-[10px] text-emerald-400 flex items-center justify-end gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Auto-cleared
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 2: Risk-Adjusted Allocation Breakdown & Downside Safeguards */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  Downside Unsold Inventory Protection Watchdog
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Mitigating real-world volatility: cancellations, rate shifts & unsold risk
                </p>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Auto-Release Active
              </span>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <div className="font-semibold text-purple-300 mb-1 flex items-center justify-between">
                  <span>D-14 to D-30 Supplier Release Clause Execution</span>
                  <span className="text-emerald-400 font-mono">100% Capital Recovery</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  If booking pickup on Atlantis The Royal (TBOH-98231) falls below 72% at D-14, unsold units are automatically released back to Kerzner with zero cancellation penalty.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <div className="font-semibold text-[#FF5F1F] mb-1 flex items-center justify-between">
                  <span>Dynamic Cross-Agency Secondary Liquidation</span>
                  <span className="text-cyan-400 font-mono">&lt; 30 sec latency</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Unsold seats on Emirates EK501 (TBOF-44021) are auto-pushed to MakeMyTrip Corporate and Dnata B2B API feeds with dynamic 4% discount triggers before release threshold.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <div className="font-semibold text-cyan-300 mb-1 flex items-center justify-between">
                  <span>Markowitz Efficient Frontier Allocation Shield</span>
                  <span className="text-purple-400 font-mono">CVaR &lt; 4%</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Capping high-margin speculative inventory at 36% of portfolio ensures baseline cashflows from corporate trunk routes cover all procurement commitments.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Want to simulate stress testing?</span>
            <button
              onClick={() => onNavigateToTab('portfolio')}
              className="text-[#FF5F1F] hover:text-[#E54E10] font-semibold flex items-center gap-1 transition-colors"
            >
              Run Monte Carlo Stress Test <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
