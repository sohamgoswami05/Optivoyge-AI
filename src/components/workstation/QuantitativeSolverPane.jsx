import React, { useState } from 'react';
import { FORMAT_INR, FORMAT_INR_COMPACT, MOCK_SOLVER_AUDIT_LOGS } from '../../data/procurementData';

export default function QuantitativeSolverPane({
  budgetCeiling,
  riskTolerance,
  allocatedCapital,
  spotReserveBuffer,
  expectedProfit,
  expectedMarginPct,
  selectedSkuIds,
  skus,
  onCommitBatch
}) {
  const [logs, setLogs] = useState(MOCK_SOLVER_AUDIT_LOGS);
  const [isSolving, setIsSolving] = useState(false);
  const [commitSuccess, setCommitSuccess] = useState(false);
  const [showSupplierRadar, setShowSupplierRadar] = useState(false);

  // Dynamic portfolio split based on risk tolerance
  const coreWeight = riskTolerance === 'CONSERVATIVE' ? 55 : riskTolerance === 'BALANCED' ? 45 : 30;
  const alphaWeight = riskTolerance === 'CONSERVATIVE' ? 25 : riskTolerance === 'BALANCED' ? 35 : 55;
  const spotWeight = 100 - coreWeight - alphaWeight;

  const coreAmount = Math.round((budgetCeiling * coreWeight) / 100);
  const alphaAmount = Math.round((budgetCeiling * alphaWeight) / 100);
  const spotAmount = Math.round((budgetCeiling * spotWeight) / 100);

  // Selected SKUs aggregation
  const selectedSkus = skus.filter((s) => selectedSkuIds.includes(s.id));
  const activeSkus = selectedSkus.length > 0 ? selectedSkus : skus;

  const totalSelectedCapital = Math.round(activeSkus.reduce((acc, curr) => acc + (allocatedCapital * curr.budgetWeight), 0));
  const totalUnits = activeSkus.reduce((acc, curr) => acc + curr.recPreBuyQty, 0);

  // Re-run solver simulation
  const handleReRunSolver = () => {
    setIsSolving(true);
    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const newLog = {
        timestamp: timeStr,
        status: 'Re-Convergence Complete',
        message: `Solver re-optimized in 38ms. Total procurement budget of ${FORMAT_INR_COMPACT(budgetCeiling)} distributed across ${activeSkus.length} active corridors with Sharpe Ratio 2.84.`
      };
      setLogs([newLog, ...logs]);
      setIsSolving(false);
    }, 450);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['SKU_ID', 'Corridor', 'Category', 'Recommended_Quantity', 'Unit_Cost_INR', 'Spot_Rate_INR', 'Markup_Pct', 'Allocated_Budget_INR', 'CVaR_Risk_Pct', 'Cancellation_Clause'];
    const rows = activeSkus.map((s) => [
      s.id,
      `"${s.corridor}"`,
      s.type,
      s.recPreBuyQty,
      s.unitCost,
      s.unitSpot,
      s.sellingMarkupPct,
      Math.round(allocatedCapital * s.budgetWeight),
      s.cvarRisk,
      `"${s.cancellationDeadline}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TBO_PreBuy_Allocation_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCommit = () => {
    onCommitBatch(activeSkus.map(s => s.id));
    setCommitSuccess(true);
    setTimeout(() => setCommitSuccess(false), 3000);
  };

  return (
    <div className="w-full lg:w-[380px] xl:w-[410px] shrink-0 bg-white border border-slate-200 rounded-lg shadow-xs flex flex-col justify-between select-none divide-y divide-slate-200 mb-6 font-sans">
      
      {/* 1. Markowitz Portfolio Allocation Split */}
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 tracking-tight">
            Portfolio Capital Allocation (Markowitz MPT)
          </h3>
          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
            Sharpe: 2.84
          </span>
        </div>

        {/* Stacked Allocation Bar */}
        <div className="space-y-2">
          <div className="w-full h-3 bg-slate-100 rounded-full flex overflow-hidden border border-slate-200">
            <div 
              style={{ width: `${coreWeight}%` }} 
              className="bg-slate-700 h-full transition-all duration-300"
              title={`Core Low-Volatility: ${coreWeight}%`}
            />
            <div 
              style={{ width: `${alphaWeight}%` }} 
              className="bg-[#EA580C] h-full transition-all duration-300"
              title={`High-Margin Event Surge: ${alphaWeight}%`}
            />
            <div 
              style={{ width: `${spotWeight}%` }} 
              className="bg-slate-300 h-full transition-all duration-300"
              title={`Spot Reserve Buffer: ${spotWeight}%`}
            />
          </div>

          {/* Allocation Legend with INR values */}
          <div className="grid grid-cols-3 gap-2 text-xs pt-1">
            <div className="p-2 rounded bg-slate-50 border border-slate-200/60">
              <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-slate-700 inline-block"></span>
                <span>Core ({coreWeight}%)</span>
              </div>
              <div className="font-bold text-slate-900 mt-1 tabular-nums text-xs">
                {FORMAT_INR_COMPACT(coreAmount)}
              </div>
            </div>

            <div className="p-2 rounded bg-orange-50/60 border border-orange-200/60">
              <div className="flex items-center gap-1.5 text-orange-900 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#EA580C] inline-block"></span>
                <span>Surge ({alphaWeight}%)</span>
              </div>
              <div className="font-bold text-[#EA580C] mt-1 tabular-nums text-xs">
                {FORMAT_INR_COMPACT(alphaAmount)}
              </div>
            </div>

            <div className="p-2 rounded bg-slate-50 border border-slate-200/60">
              <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-slate-400 inline-block"></span>
                <span>Spot ({spotWeight}%)</span>
              </div>
              <div className="font-bold text-slate-700 mt-1 tabular-nums text-xs">
                {FORMAT_INR_COMPACT(spotAmount)}
              </div>
            </div>
          </div>
        </div>

        {/* Financial Metrics Strip */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="p-2.5 rounded-md bg-slate-50 border border-slate-200/70">
            <span className="text-[11px] text-slate-500 font-medium block">Expected Return</span>
            <span className="text-slate-900 font-bold text-sm tabular-nums mt-0.5 block">+{expectedMarginPct}%</span>
            <span className="text-[10px] text-emerald-700 font-medium">+16.7% vs pure spot</span>
          </div>

          <div className="p-2.5 rounded-md bg-slate-50 border border-slate-200/70">
            <span className="text-[11px] text-slate-500 font-medium block">Portfolio CVaR (95%)</span>
            <span className="text-slate-900 font-bold text-sm tabular-nums mt-0.5 block">5.8% Cap</span>
            <span className="text-[10px] text-slate-500">Tail-loss bounded</span>
          </div>
        </div>
      </div>

      {/* 2. Optimizer Execution Audit Trace */}
      <div className="p-5 space-y-3 flex-1 flex flex-col min-h-[200px]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900 tracking-tight">
              Optimizer Audit &amp; Reasoning Trace
            </h3>
            <p className="text-[11px] text-slate-500">Deterministic mathematical convergence</p>
          </div>
          <button
            onClick={handleReRunSolver}
            disabled={isSolving}
            className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors disabled:opacity-50"
          >
            {isSolving ? 'Optimizing...' : 'Re-Run Solver'}
          </button>
        </div>

        {/* Audit Log Cards */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[170px]">
          {logs.map((log, idx) => (
            <div key={idx} className="p-2.5 rounded-md bg-slate-50 border border-slate-200/70 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">{log.status}</span>
                <span className="text-[11px] text-slate-400 tabular-nums">{log.timestamp}</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                {log.message}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Supplier Integration Health & Latency Radar */}
      <div className="p-4 bg-slate-50/70 border-t border-slate-200 space-y-2">
        <div className="flex items-center justify-between text-xs cursor-pointer" onClick={() => setShowSupplierRadar(!showSupplierRadar)}>
          <span className="font-bold text-slate-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Supplier Direct NDC &amp; API Feeds
          </span>
          <span className="text-[11px] text-blue-700 font-semibold">
            {showSupplierRadar ? 'Collapse' : '6 Connected'}
          </span>
        </div>

        {showSupplierRadar && (
          <div className="space-y-1.5 pt-1 text-[11px]">
            {[
              { name: 'Kerzner B2B Direct', latency: '24ms', status: 'Optimal NDC', color: 'text-emerald-700' },
              { name: 'Las Vegas Sands Global', latency: '48ms', status: 'Allotment Locked', color: 'text-emerald-700' },
              { name: 'Emirates Direct NDC', latency: '18ms', status: 'Direct Flight Block', color: 'text-emerald-700' },
              { name: 'IHCL Taj Corporate Connect', latency: '36ms', status: 'Hedged D-14', color: 'text-emerald-700' },
              { name: 'Hotelbeds Bedbank API', latency: '240ms', status: 'Spot Buffer Delay', color: 'text-amber-700' }
            ].map((sup, idx) => (
              <div key={idx} className="flex justify-between items-center py-1 px-2 rounded bg-white border border-slate-200">
                <span className="font-medium text-slate-800">{sup.name}</span>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-slate-400">{sup.latency}</span>
                  <span className={`font-semibold ${sup.color}`}>{sup.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Human-in-the-Loop Commitment Gate */}
      <div className="p-5 space-y-4 bg-slate-50/50 rounded-b-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900 tracking-tight">
              Procurement Commitment Gate
            </h3>
            <p className="text-[11px] text-slate-500">Executive financial sign-off</p>
          </div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
            {activeSkus.length} Corridors
          </span>
        </div>

        {/* Order Summary Strip */}
        <div className="space-y-2 text-xs bg-white p-3 rounded-md border border-slate-200">
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Total Capital Commitment:</span>
            <span className="text-slate-900 font-bold tabular-nums text-sm">{FORMAT_INR(totalSelectedCapital)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Total Pre-Buy Inventory:</span>
            <span className="text-slate-800 font-medium tabular-nums">{totalUnits.toLocaleString()} Units</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Refundable LCD Protection:</span>
            <span className="text-emerald-700 font-semibold tabular-nums">{FORMAT_INR(Math.round(totalSelectedCapital * 0.72))}</span>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-slate-100">
            <span className="text-slate-500">Projected Net Gain:</span>
            <span className="text-emerald-700 font-bold tabular-nums">+{FORMAT_INR(expectedProfit)} ({expectedMarginPct}%)</span>
          </div>
        </div>

        {commitSuccess && (
          <div className="p-2.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs text-center font-semibold">
            ✓ Orders successfully signed and committed to supplier NDC channels.
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleCommit}
            className="w-full py-2.5 bg-[#EA580C] hover:bg-[#C2410C] text-white font-semibold text-xs rounded-md shadow-xs transition-all tracking-tight"
          >
            Commit Pre-Buy Orders to Supplier API
          </button>

          <button
            onClick={handleExportCSV}
            className="w-full py-2 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs rounded-md border border-slate-300 transition-all"
          >
            Export Allocation CSV
          </button>
        </div>
      </div>
    </div>
  );
}
