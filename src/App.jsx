import React, { useState } from 'react';
import EnterpriseHeader from './components/workstation/EnterpriseHeader';
import ExecutiveSummaryBar from './components/workstation/ExecutiveSummaryBar';
import DemandPortfolioMatrix from './components/workstation/DemandPortfolioMatrix';
import QuantitativeSolverPane from './components/workstation/QuantitativeSolverPane';
import CorridorDetailDrawer from './components/workstation/CorridorDetailDrawer';

import { INITIAL_SKUS, FORMAT_INR_COMPACT } from './data/procurementData';

export default function App() {
  // Primary Control State
  const [budgetCeiling, setBudgetCeiling] = useState(5000000); // Default ₹50,00,000
  const [riskTolerance, setRiskTolerance] = useState('BALANCED'); // 'CONSERVATIVE' (4%), 'BALANCED' (7.5%), 'AGGRESSIVE' (12%)
  const [scenario, setScenario] = useState('STANDARD'); // 'STANDARD', 'SURGE', 'DISRUPTION'
  const [skus, setSkus] = useState(INITIAL_SKUS);
  const [selectedSkuIds, setSelectedSkuIds] = useState([]);
  const [activeDrawerSku, setActiveDrawerSku] = useState(null);

  // Scenario Multipliers
  const scenarioMultiplier = scenario === 'SURGE' ? 1.25 : scenario === 'DISRUPTION' ? 0.85 : 1.0;

  // Computed Financials based on budget & risk tolerance
  const preBuyRatio = riskTolerance === 'CONSERVATIVE' ? 0.70 : riskTolerance === 'BALANCED' ? 0.80 : 0.85;
  const allocatedCapital = Math.round(budgetCeiling * preBuyRatio * scenarioMultiplier);
  const spotReserveBuffer = Math.max(0, budgetCeiling - allocatedCapital);

  // Expected Risk-Adjusted Profit Margin
  const expectedMarginPct = (
    (riskTolerance === 'CONSERVATIVE' ? 24.2 : riskTolerance === 'BALANCED' ? 28.5 : 32.8) *
    (scenario === 'SURGE' ? 1.15 : scenario === 'DISRUPTION' ? 0.9 : 1.0)
  ).toFixed(1);

  const expectedProfit = Math.round(allocatedCapital * (Number(expectedMarginPct) / 100));

  // Sold-out prevention rate
  const soldOutPreventionRate = riskTolerance === 'CONSERVATIVE' ? '96.8' : riskTolerance === 'BALANCED' ? '98.4' : '99.2';

  // Toggle lock SKU
  const handleToggleLockSku = (id) => {
    setSkus((prev) =>
      prev.map((sku) => (sku.id === id ? { ...sku, locked: !sku.locked } : sku))
    );
  };

  // Batch commit orders
  const handleCommitBatch = (idsToCommit) => {
    setSkus((prev) =>
      prev.map((sku) => (idsToCommit.includes(sku.id) ? { ...sku, locked: true } : sku))
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans antialiased">
      {/* 1. Clean Enterprise Light Header */}
      <EnterpriseHeader 
        cycle="Nov-Dec 2026"
        currency="INR ₹"
      />

      {/* Main Workspace Container */}
      <main className="flex-1 w-full max-w-[1720px] mx-auto p-4 sm:p-6">
        {/* Scenario Switcher Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-200 text-xs text-slate-600 gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">Market Stress Simulation:</span>
            <div className="flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200">
              {[
                { id: 'STANDARD', label: 'Standard Normal Season' },
                { id: 'SURGE', label: 'Mega Event Surge (+25% Volume)' },
                { id: 'DISRUPTION', label: 'Hub Capacity Disruption' }
              ].map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => setScenario(sc.id)}
                  className={`px-3 py-1 rounded text-xs transition-all ${
                    scenario === sc.id
                      ? 'bg-white text-slate-900 font-semibold shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1 rounded-md bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition-colors shadow-xs"
            >
              Export Executive PDF Report
            </button>
          </div>
        </div>

        {/* 2. Executive 5-Column Summary & Financial Control Bar */}
        <ExecutiveSummaryBar
          budgetCeiling={budgetCeiling}
          setBudgetCeiling={setBudgetCeiling}
          riskTolerance={riskTolerance}
          setRiskTolerance={setRiskTolerance}
          allocatedCapital={allocatedCapital}
          spotReserveBuffer={spotReserveBuffer}
          expectedProfit={expectedProfit}
          expectedMarginPct={expectedMarginPct}
          soldOutPreventionRate={soldOutPreventionRate}
        />

        {/* 3. Main Operational Grid: 8-Column Matrix + 4-Column Quantitative Solver */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Center Left: Demand Telemetry & Portfolio Matrix */}
          <DemandPortfolioMatrix
            skus={skus}
            setSkus={setSkus}
            budgetCeiling={budgetCeiling}
            allocatedCapital={allocatedCapital}
            selectedSkuIds={selectedSkuIds}
            setSelectedSkuIds={setSelectedSkuIds}
            onToggleLockSku={handleToggleLockSku}
          />

          {/* Right Pane: Quantitative Solver & Commitment Gate */}
          <QuantitativeSolverPane
            budgetCeiling={budgetCeiling}
            riskTolerance={riskTolerance}
            allocatedCapital={allocatedCapital}
            spotReserveBuffer={spotReserveBuffer}
            expectedProfit={expectedProfit}
            expectedMarginPct={expectedMarginPct}
            selectedSkuIds={selectedSkuIds}
            skus={skus}
            onCommitBatch={handleCommitBatch}
          />
        </div>
      </main>

      {/* Corridor Deep-Dive Drawer */}
      {activeDrawerSku && (
        <CorridorDetailDrawer
          sku={activeDrawerSku}
          onClose={() => setActiveDrawerSku(null)}
          onToggleLock={handleToggleLockSku}
        />
      )}
    </div>
  );
}
