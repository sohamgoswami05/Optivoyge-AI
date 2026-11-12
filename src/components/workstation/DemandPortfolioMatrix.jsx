import React, { useState } from 'react';
import { FORMAT_INR, FORMAT_INR_COMPACT } from '../../data/procurementData';
import DemandForecastChart from './DemandForecastChart';

export default function DemandPortfolioMatrix({
  skus,
  setSkus,
  budgetCeiling,
  allocatedCapital,
  selectedSkuIds,
  setSelectedSkuIds,
  onToggleLockSku,
  onSelectCorridor
}) {
  const [activeTab, setActiveTab] = useState('ledger');
  const [sortField, setSortField] = useState('allocated');
  const [sortAsc, setSortAsc] = useState(false);
  const [markupSlider, setMarkupSlider] = useState(28.5); // Global markup elasticity test
  const [liquidationSimActive, setLiquidationSimActive] = useState(false);

  // Toggle select all
  const allSelected = skus.length > 0 && selectedSkuIds.length === skus.length;
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedSkuIds([]);
    } else {
      setSelectedSkuIds(skus.map((s) => s.id));
    }
  };

  const toggleSelectRow = (id, e) => {
    e.stopPropagation();
    if (selectedSkuIds.includes(id)) {
      setSelectedSkuIds(selectedSkuIds.filter((item) => item !== id));
    } else {
      setSelectedSkuIds([...selectedSkuIds, id]);
    }
  };

  // Dynamic calculations based on current allocated capital
  const enrichedSkus = skus.map((sku) => {
    const allocatedBudget = Math.round(allocatedCapital * sku.budgetWeight);
    const sellingPrice = Math.round(sku.unitCost * (1 + sku.sellingMarkupPct / 100));
    const dynamicSimPrice = Math.round(sku.unitCost * (1 + markupSlider / 100));
    const spotArbitrage = sku.unitSpot - sku.unitCost;
    const projectedProfit = Math.round((sellingPrice - sku.unitCost) * sku.recPreBuyQty);
    
    // Elasticity calculation: baseline conversion drops as price approaches spot
    const priceRatio = dynamicSimPrice / sku.unitSpot;
    const simulatedConversion = Math.max(45, Math.min(98, Math.round(100 - (priceRatio * 42))));
    const simulatedRevenue = Math.round(sku.recPreBuyQty * (simulatedConversion / 100) * dynamicSimPrice);
    const simulatedProfit = Math.round(sku.recPreBuyQty * (simulatedConversion / 100) * (dynamicSimPrice - sku.unitCost));

    return {
      ...sku,
      allocatedBudget,
      sellingPrice,
      dynamicSimPrice,
      spotArbitrage,
      projectedProfit,
      simulatedConversion,
      simulatedRevenue,
      simulatedProfit
    };
  });

  // Sort logic
  const sortedSkus = [...enrichedSkus].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (sortField === 'allocated') {
      aVal = a.allocatedBudget;
      bVal = b.allocatedBudget;
    } else if (sortField === 'l2b') {
      aVal = parseInt(a.l2bRatio, 10);
      bVal = parseInt(b.l2bRatio, 10);
    } else if (sortField === 'cvar') {
      aVal = a.cvarRisk;
      bVal = b.cvarRisk;
    }
    if (aVal < bVal) return sortAsc ? -1 : 1;
    if (aVal > bVal) return sortAsc ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden select-none mb-6">
      {/* View Switcher Tabs (Underline Style, Natural Titles) */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 bg-white overflow-x-auto">
        <div className="flex items-center gap-6 whitespace-nowrap">
          {[
            { id: 'ledger', label: 'Pre-Buy Allocation Ledger' },
            { id: 'signals', label: 'Look-to-Book & Signal Telemetry' },
            { id: 'arbitrage', label: 'Pre-Buy vs. Spot Arbitrage Matrix' },
            { id: 'waterfall', label: 'Liquidation Waterfall & Packaging' },
            { id: 'pricing', label: 'Dynamic Pricing & Elasticity' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 text-xs font-semibold tracking-tight transition-all relative ${
                  isActive
                    ? 'text-slate-900 border-b-2 border-[#EA580C]'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-500 hidden xl:flex items-center gap-3 whitespace-nowrap pl-4">
          <span>Corridors: <strong className="text-slate-800 tabular-nums">{skus.length} Active</strong></span>
          <span className="text-slate-300">•</span>
          <span>Selected: <strong className="text-[#EA580C] tabular-nums font-semibold">{selectedSkuIds.length}</strong></span>
        </div>
      </div>

      {/* Demand Forecast Chart */}
      <DemandForecastChart />

      {/* Tab 1: Pre-Buy Allocation Ledger (Spacious, Zero Column Overlap) */}
      {activeTab === 'ledger' && (
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-600 font-semibold text-[11px] border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="w-10 px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="accent-[#EA580C] rounded cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 min-w-[220px]">
                  Corridor &amp; Property
                </th>
                <th className="px-3 py-3 text-center min-w-[90px]">
                  Category
                </th>
                <th className="px-4 py-3 min-w-[240px]">
                  External Demand Signal
                </th>
                <th className="px-3 py-3 text-center min-w-[110px]">
                  Buy Window
                </th>
                <th className="px-3 py-3 text-right min-w-[120px]">
                  Rec. Quantity
                </th>
                <th className="px-4 py-3 text-right min-w-[170px] whitespace-nowrap">
                  Pre-Buy vs. Spot Rate
                </th>
                <th 
                  onClick={() => handleSort('allocated')}
                  className="px-4 py-3 text-right min-w-[150px] cursor-pointer hover:text-slate-900 whitespace-nowrap"
                >
                  Allocated Budget {sortField === 'allocated' && (sortAsc ? '↑' : '↓')}
                </th>
                <th className="px-3 py-3 text-right min-w-[110px]">
                  Expected Margin
                </th>
                <th className="px-4 py-3 text-center min-w-[140px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans text-xs">
              {sortedSkus.map((sku) => {
                const isSelected = selectedSkuIds.includes(sku.id);
                const isLocked = sku.locked;
                const isFlight = sku.type.includes('Flight');

                return (
                  <tr
                    key={sku.id}
                    onClick={() => onSelectCorridor && onSelectCorridor(sku)}
                    className={`transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/60'
                        : isLocked
                        ? 'bg-emerald-50/40'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => toggleSelectRow(sku.id, e)}
                        className="accent-[#EA580C] rounded cursor-pointer"
                      />
                    </td>

                    {/* Corridor & Property Name (2 lines) */}
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-bold text-slate-900 leading-snug hover:text-blue-700 transition-colors">
                          {sku.corridor}
                        </div>
                        <div className="text-[11px] text-slate-400 font-normal mt-0.5">
                          {sku.id} &bull; {sku.supplier}
                        </div>
                      </div>
                    </td>

                    {/* Category Badge */}
                    <td className="px-3 py-3 text-center whitespace-nowrap">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium border ${
                        isFlight 
                          ? 'bg-blue-50 text-blue-700 border-blue-200' 
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {sku.type}
                      </span>
                    </td>

                    {/* External Demand Signal */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                        <span className="text-slate-800 font-medium">
                          {sku.triggerSignal}
                        </span>
                      </div>
                    </td>

                    {/* Buy Window */}
                    <td className="px-3 py-3 text-center whitespace-nowrap">
                      <span className="text-slate-700 font-medium">
                        {sku.optimalBuyWindow}
                      </span>
                    </td>

                    {/* Recommended Quantity */}
                    <td className="px-3 py-3 text-right tabular-nums whitespace-nowrap">
                      <span className="font-bold text-slate-900">
                        {sku.recPreBuyQty}
                      </span>
                      <span className="text-slate-500 text-[11px] ml-1">
                        {sku.unitMetric}
                      </span>
                    </td>

                    {/* Pre-Buy vs. Spot Rate (Bold green vs strikethrough grey, NO OVERLAP) */}
                    <td className="px-4 py-3 text-right tabular-nums whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-bold text-emerald-700">
                          {FORMAT_INR(sku.unitCost)}
                        </span>
                        <span className="text-slate-400 line-through text-[11px]">
                          {FORMAT_INR(sku.unitSpot)}
                        </span>
                      </div>
                    </td>

                    {/* Allocated Budget (₹) */}
                    <td className="px-4 py-3 text-right tabular-nums font-bold text-slate-900 whitespace-nowrap">
                      {FORMAT_INR(sku.allocatedBudget)}
                    </td>

                    {/* Expected Margin Badge */}
                    <td className="px-3 py-3 text-right tabular-nums whitespace-nowrap">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        +{sku.sellingMarkupPct}%
                      </span>
                    </td>

                    {/* Action: Approve Pre-Buy */}
                    <td className="px-4 py-3 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onToggleLockSku(sku.id)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-all ${
                          isLocked
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold'
                            : 'bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-xs'
                        }`}
                      >
                        {isLocked ? '✓ Approved' : 'Approve Pre-Buy'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Look-to-Book & External Signal Telemetry */}
      {activeTab === 'signals' && (
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200 text-xs">
            <span className="font-bold text-slate-800">
              External Signal Fusion Radar &amp; Query Telemetry
            </span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              42 Real-Time Ingestion Sources Connected
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-600 font-semibold text-[11px] border-b border-slate-200 uppercase">
                <tr>
                  <th className="px-4 py-3">Signal ID &amp; Source</th>
                  <th className="px-4 py-3">Catalyst Trigger Description</th>
                  <th className="px-4 py-3">Destination Corridor</th>
                  <th className="px-4 py-3 text-right">L2B Velocity</th>
                  <th className="px-4 py-3 text-center">Repricing Lead Window</th>
                  <th className="px-4 py-3 text-right">Spot Inflation Risk</th>
                  <th className="px-4 py-3 text-center">System Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {[
                  { id: 'SIG-DXB-01', source: 'Dubai Shopping Festival Official API', desc: 'Shopping Festival & New Year Gala Peak Demand Window', corridor: 'Dubai (DXB)', l2b: '194:1 (vs 88:1 base)', lead: '28 Days Lead', inflation: '+54% Spot Surge', verdict: 'Lock 320 Wholesale Room-Nights' },
                  { id: 'SIG-LHR-02', source: 'Ticketmaster & Songkick Live Wire', desc: 'Coldplay Wembley Stadium 6-Night Summer Residency', corridor: 'London (LHR)', l2b: '188:1 (vs 85:1 base)', lead: '21 Days Lead', inflation: '+62% Spot Surge', verdict: 'Lock 140 Luxury Room-Nights' },
                  { id: 'SIG-BKK-03', source: 'IATA Timatic Immigration Policy Feed', desc: 'Thailand Permanent 60-Day Visa Exemption Expansion', corridor: 'Bangkok (BKK)', l2b: '178:1 (vs 80:1 base)', lead: '35 Days Lead', inflation: '+38% Spot Surge', verdict: 'Lock 380 Allotment Room-Nights' },
                  { id: 'SIG-GOI-04', source: 'BookMyShow Live Events API', desc: 'Sunburn Festival & Year-End Coastal Tourism Rush', corridor: 'Goa (GOI)', l2b: '280:1 (vs 110:1 base)', lead: '42 Days Lead', inflation: '+75% Spot Surge', verdict: 'Lock 180 Resort Room-Nights' },
                  { id: 'SIG-TYO-05', source: 'Japan Met Agency Phenology Satellite', desc: 'Early Sakura Cherry Blossom Peak Bloom Model', corridor: 'Tokyo (TYO)', l2b: '215:1 (vs 95:1 base)', lead: '18 Days Lead', inflation: '+48% Spot Surge', verdict: 'Lock 260 Premier Room-Nights' },
                  { id: 'SIG-DEL-06', source: 'OAG Flight Schedules Engine', desc: 'Diwali Peak Trunk Capacity Squeeze Ex-Delhi to Dubai', corridor: 'DEL-DXB Trunk', l2b: '240:1 (vs 92:1 base)', lead: '30 Days Lead', inflation: '+51% Seat Surge', verdict: 'Lock 400 Direct NDC Seats' }
                ].map((sig) => (
                  <tr key={sig.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-800">
                      <div>{sig.id}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{sig.source}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-900 font-medium">
                      {sig.desc}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {sig.corridor}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-amber-700 tabular-nums">
                      {sig.l2b}
                    </td>
                    <td className="px-4 py-3 text-center text-blue-700 font-semibold whitespace-nowrap">
                      {sig.lead}
                    </td>
                    <td className="px-4 py-3 text-right text-rose-600 font-bold tabular-nums">
                      {sig.inflation}
                    </td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md bg-orange-50 text-[#EA580C] border border-orange-200 font-semibold text-[11px]">
                        {sig.verdict}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Pre-Buy vs. Spot Arbitrage Matrix */}
      {activeTab === 'arbitrage' && (
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200 text-xs">
            <span className="font-bold text-slate-800">
              Unit Economics: Contract Pre-Buy Wholesale vs. Dynamic API Spot Rates
            </span>
            <span className="text-slate-500">
              LCD = Last Cancellation Deadline (Risk Mitigation Window)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-600 font-semibold text-[11px] border-b border-slate-200 uppercase">
                <tr>
                  <th className="px-4 py-3">Property / Corridor</th>
                  <th className="px-4 py-3 text-right">Wholesale Pre-Buy</th>
                  <th className="px-4 py-3 text-right">Projected Spot Peak</th>
                  <th className="px-4 py-3 text-right">Unit Margin Arbitrage</th>
                  <th className="px-4 py-3 text-right">TBO Dynamic Price</th>
                  <th className="px-4 py-3 text-center">Cancellation Clause</th>
                  <th className="px-4 py-3">Downside Protection Terms</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {enrichedSkus.map((sku) => (
                  <tr key={sku.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      <div>{sku.corridor}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{sku.propertyName}</div>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-700 tabular-nums">
                      {FORMAT_INR(sku.unitCost)}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-400 line-through tabular-nums">
                      {FORMAT_INR(sku.unitSpot)}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-700 tabular-nums">
                      +{FORMAT_INR(sku.spotArbitrage)} ({Math.round((sku.spotArbitrage / sku.unitCost) * 100)}%)
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900 tabular-nums">
                      {FORMAT_INR(sku.sellingPrice)}
                    </td>
                    <td className="px-4 py-3 text-center font-semibold text-rose-600 whitespace-nowrap">
                      {sku.cancellationDeadline}
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-[11px]">
                      Automated secondary liquidation trigger if agency pickup lags at deadline.
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Liquidation Waterfall & Dynamic Packaging (Winning Innovation) */}
      {activeTab === 'waterfall' && (
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
            <div>
              <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                Automated 4-Stage Liquidation Waterfall &amp; Packaging Engine
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Protecting TBO from unsold inventory liability by sequencing distribution, volume incentives, bundling, and supplier release clauses
              </p>
            </div>

            <button
              onClick={() => setLiquidationSimActive(!liquidationSimActive)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                liquidationSimActive
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              {liquidationSimActive ? '✓ Stage 3 & 4 Protection Simulated' : 'Simulate Lagging Pickup Shock'}
            </button>
          </div>

          {/* 4-Stage Visual Waterfall Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Stage 1: Primary B2B</span>
                <span className="text-[10px] text-slate-500 font-medium">D-60 to D-21</span>
              </div>
              <div className="text-base font-bold text-emerald-700 tabular-nums">
                +28.5% Base Margin
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Regular wholesale distribution across Tier-1 enterprise agencies (Emirates Holidays, MakeMyTrip Corporate, Dnata).
              </p>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200">
                Target Pickup: &gt; 65% of Allotment
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-50/50 border border-blue-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-blue-900">Stage 2: Flash Incentive</span>
                <span className="text-[10px] text-blue-600 font-medium">D-20 to D-14</span>
              </div>
              <div className="text-base font-bold text-blue-700 tabular-nums">
                +4.0% Agency Rebate
              </div>
              <p className="text-[11px] text-blue-800 leading-relaxed">
                If pickup lags below 60%, the system automatically activates a commission kicker to high-velocity agencies to accelerate bookings.
              </p>
              <div className="text-[10px] text-blue-600 pt-1 border-t border-blue-200">
                Maintains public price integrity
              </div>
            </div>

            <div className="p-4 rounded-lg bg-orange-50/50 border border-orange-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-orange-950">Stage 3: Dynamic Bundling</span>
                <span className="text-[10px] text-[#EA580C] font-medium">D-13 to D-7</span>
              </div>
              <div className="text-base font-bold text-[#EA580C] tabular-nums">
                Opaque Room Packaging
              </div>
              <p className="text-[11px] text-orange-900 leading-relaxed">
                Pairs uncommitted rooms with guaranteed NDC flight seats into dynamic flight+hotel packages, hiding discounted room rates.
              </p>
              <div className="text-[10px] text-orange-700 pt-1 border-t border-orange-200">
                Blended Margin: +24% to +31%
              </div>
            </div>

            <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-950">Stage 4: Contract Release</span>
                <span className="text-[10px] text-emerald-700 font-medium">D-7 to D-0</span>
              </div>
              <div className="text-base font-bold text-emerald-800 tabular-nums">
                100% Capital Recovery
              </div>
              <p className="text-[11px] text-emerald-900 leading-relaxed">
                Automatic trigger of supplier LCD put-option. Unsold allotments are returned to hotel bedbank with zero cancellation penalty.
              </p>
              <div className="text-[10px] text-emerald-700 pt-1 border-t border-emerald-200">
                Capping downside loss at ₹0
              </div>
            </div>
          </div>

          {/* Dynamic Flight + Hotel Packaging Pairs Table */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs">
              Live Stage 3 Automated Packaging Bundles (Flight + Hotel Synthesis)
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-2.5">Dynamic Package Name</th>
                    <th className="px-4 py-2.5">Hotel Inventory Component</th>
                    <th className="px-4 py-2.5">Flight Block Component</th>
                    <th className="px-4 py-2.5 text-right">Bundled Package Price</th>
                    <th className="px-4 py-2.5 text-right">Agency Discount</th>
                    <th className="px-4 py-2.5 text-right">TBO Blended Margin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900">
                      Dubai Luxury Weekend Escape
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      Atlantis The Palm (3 Nights) [TBOH-DXB-98231]
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      Emirates EK501 Seat [TBOF-DEL-1109]
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900 tabular-nums">
                      ₹56,300 / pax
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-emerald-700 tabular-nums">
                      -16.5% vs Spot
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-700 tabular-nums">
                      +30.4% Net
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900">
                      London Culture &amp; Concert Tour
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      The Langham Regent St (4 Nights) [TBOH-LHR-88319]
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      Air India AI129 Direct [TBOF-BOM-2204]
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900 tabular-nums">
                      ₹87,000 / pax
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-emerald-700 tabular-nums">
                      -14.2% vs Spot
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-700 tabular-nums">
                      +28.2% Net
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900">
                      Singapore FinTech Executive Package
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      Marina Bay Sands (3 Nights) [TBOH-SIN-44102]
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      Singapore Airlines SQ421 Seat Block
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900 tabular-nums">
                      ₹66,200 / pax
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-emerald-700 tabular-nums">
                      -18.0% vs Spot
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-700 tabular-nums">
                      +26.8% Net
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Dynamic Pricing & Elasticity Curve */}
      {activeTab === 'pricing' && (
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
            <div>
              <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                Dynamic B2B Selling Price &amp; Elasticity Optimizer
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Simulate how varying B2B markups impact conversion velocity and total net profit yields
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Global Markup Test:</span>
              <span className="text-sm font-bold text-blue-700 tabular-nums">+{markupSlider}%</span>
            </div>
          </div>

          {/* Interactive Elasticity Slider Control */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-800">
                Markup Range Scrubber: <strong className="text-blue-700 font-bold">+{markupSlider}%</strong>
              </span>
              <span className="text-slate-500 text-[11px]">
                Empirical Price Elasticity (&epsilon; = -1.6)
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={45}
              step={0.5}
              value={markupSlider}
              onChange={(e) => setMarkupSlider(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>Low Margin / High Volume (+10%)</span>
              <span className="text-emerald-700 font-semibold">&bull; Sweet Spot (+26% to +29%) &bull;</span>
              <span>High Margin / Low Volume (+45%)</span>
            </div>
          </div>

          {/* Simulated Sensitivity Matrix Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[11px]">
                <tr>
                  <th className="px-4 py-3">Corridor &amp; Property</th>
                  <th className="px-4 py-3 text-right">Wholesale Cost</th>
                  <th className="px-4 py-3 text-right">Simulated Dynamic Price</th>
                  <th className="px-4 py-3 text-right">Spot Competitor Price</th>
                  <th className="px-4 py-3 text-center">TBO Spot Arbitrage Edge</th>
                  <th className="px-4 py-3 text-center">Est. Conversion Rate</th>
                  <th className="px-4 py-3 text-right">Simulated Net Profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {enrichedSkus.map((sku) => (
                  <tr key={sku.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      <div>{sku.corridor}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{sku.recPreBuyQty} {sku.unitMetric}</div>
                    </td>
                    <td className="px-4 py-3 text-right text-slate-600 tabular-nums">
                      {FORMAT_INR(sku.unitCost)}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-blue-700 tabular-nums">
                      {FORMAT_INR(sku.dynamicSimPrice)}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-400 line-through tabular-nums">
                      {FORMAT_INR(sku.unitSpot)}
                    </td>
                    <td className="px-4 py-3 text-center font-semibold text-emerald-700 tabular-nums">
                      -{Math.round(((sku.unitSpot - sku.dynamicSimPrice) / sku.unitSpot) * 100)}% Cheaper
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-slate-800 tabular-nums">
                      {sku.simulatedConversion}%
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-700 tabular-nums">
                      +{FORMAT_INR(sku.simulatedProfit)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
