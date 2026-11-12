import React from 'react';
import { FORMAT_INR } from '../../data/procurementData';

export default function CorridorDetailDrawer({ sku, onClose, onToggleLock }) {
  if (!sku) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs select-none">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto font-sans animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                {sku.type}
              </span>
              <span className="text-xs font-mono font-medium text-slate-500">
                {sku.id}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">
              {sku.corridor}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {sku.propertyName} &bull; Supplier: {sku.supplier}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1 text-xs text-slate-700">
          
          {/* Key Financial Spread Card */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-xs">
              Unit Economics &amp; Margin Arbitrage
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">Contracted Wholesale Rate:</span>
                <span className="font-bold text-base text-emerald-700 tabular-nums">
                  {FORMAT_INR(sku.unitCost)}
                </span>
                <span className="text-[10px] text-slate-400 block">per {sku.unitMetric}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Projected Peak Spot Rate:</span>
                <span className="font-bold text-base text-slate-400 line-through tabular-nums">
                  {FORMAT_INR(sku.unitSpot)}
                </span>
                <span className="text-[10px] text-rose-600 block font-semibold">+54% Peak Inflation</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
              <span className="text-slate-600 font-medium">TBO Dynamic Target Selling Price:</span>
              <span className="font-bold text-slate-900 tabular-nums text-sm">
                {FORMAT_INR(Math.round(sku.unitCost * (1 + sku.sellingMarkupPct / 100)))} (+{sku.sellingMarkupPct}%)
              </span>
            </div>
          </div>

          {/* Allocation & Downside Shield */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-xs">
              Allotment &amp; Risk Parameters
            </h3>
            <div className="space-y-2 border border-slate-200 rounded-lg p-3">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Recommended Allocation:</span>
                <span className="font-semibold text-slate-900 tabular-nums">{sku.recPreBuyQty} {sku.unitMetric}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Optimal Procurement Window:</span>
                <span className="font-semibold text-blue-700">{sku.optimalBuyWindow}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Look-to-Book Telemetry:</span>
                <span className="font-bold text-amber-700 tabular-nums">{sku.l2bRatio} (vs {sku.l2bBaseline} base)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Historical Sold-Out Rate:</span>
                <span className="font-semibold text-slate-900 tabular-nums">{sku.historicalSoldOutRate}% at peak</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">CVaR Downside Exposure:</span>
                <span className="font-semibold text-emerald-700">{sku.cvarRisk}% capped</span>
              </div>
            </div>
          </div>

          {/* Cancellation & Liquidation Terms */}
          <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-200 space-y-1.5">
            <div className="font-bold text-emerald-800 text-xs">
              Downside Protection: {sku.cancellationDeadline}
            </div>
            <p className="text-[11px] text-emerald-700 leading-relaxed">
              If agency pickup on this corridor falls below 70% at the last cancellation deadline, unreserved units are automatically routed to secondary B2B flash liquidation channels with zero cancellation liability.
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Close
          </button>

          <button
            onClick={() => {
              onToggleLock(sku.id);
              onClose();
            }}
            className={`px-5 py-2.5 rounded-md font-semibold text-xs transition-all ${
              sku.locked
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-xs'
            }`}
          >
            {sku.locked ? '✓ Already Approved' : 'Approve & Lock Pre-Buy PO'}
          </button>
        </div>

      </div>
    </div>
  );
}
