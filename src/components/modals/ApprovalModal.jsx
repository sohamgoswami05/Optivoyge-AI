import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  ShieldAlert, 
  FileText, 
  Building2, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Sparkles,
  Lock,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ApprovalModal({ item, onClose, onApprove }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signedBy, setSignedBy] = useState('Anand Kumar (Head of Global Procurement)');
  const [selectedAllotment, setSelectedAllotment] = useState(item.allotment);

  const calculatedCost = selectedAllotment * item.preBuyRate;
  const calculatedExpectedProfit = (item.dynamicSellingPrice - item.preBuyRate) * selectedAllotment;
  const calculatedMargin = (((item.dynamicSellingPrice - item.preBuyRate) / item.dynamicSellingPrice) * 100).toFixed(1);

  const handleConfirmApproval = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.error(e);
      }
      setIsSubmitting(false);
      onApprove(item.id, selectedAllotment);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#FF5F1F]/20 text-[#FF5F1F] border border-[#FF5F1F]/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-orange-500/10 text-[#FF5F1F] font-bold border border-[#FF5F1F]/30">
                  {item.id}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                  Pre-Buy PO Authorization
                </span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">
                {item.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* Key Terms Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-850/80 border border-slate-800">
              <span className="text-[11px] text-slate-400">Supplier / Bedbank</span>
              <div className="font-semibold text-slate-200 mt-0.5 truncate">{item.supplier}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-850/80 border border-slate-800">
              <span className="text-[11px] text-slate-400">Contract Travel Dates</span>
              <div className="font-semibold text-slate-200 mt-0.5 truncate">{item.dates}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-850/80 border border-slate-800">
              <span className="text-[11px] text-slate-400">Pre-Buy Wholesale Rate</span>
              <div className="font-bold text-emerald-400 mt-0.5 font-mono">${item.preBuyRate} / unit</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-850/80 border border-slate-800">
              <span className="text-[11px] text-slate-400">Projected Spot Peak</span>
              <div className="font-bold text-rose-400 mt-0.5 font-mono">${item.projectedSpotRate} / unit</div>
            </div>
          </div>

          {/* Interactive Allotment Adjuster */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">
                Authorized Allotment Quantity: <span className="text-[#FF5F1F] font-mono text-sm">{selectedAllotment} Units</span>
              </label>
              <span className="text-[11px] text-slate-400">Max Supplier Quota: {item.allotment * 1.5}</span>
            </div>
            <input
              type="range"
              min={Math.floor(item.allotment * 0.5)}
              max={Math.floor(item.allotment * 1.4)}
              step={10}
              value={selectedAllotment}
              onChange={(e) => setSelectedAllotment(Number(e.target.value))}
              className="w-full accent-[#FF5F1F] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
              <span>Conservative: {Math.floor(item.allotment * 0.5)}</span>
              <span className="text-[#FF5F1F] font-semibold">Recommended: {item.allotment}</span>
              <span>Aggressive: {Math.floor(item.allotment * 1.4)}</span>
            </div>
          </div>

          {/* Financial Breakdown Table */}
          <div className="rounded-xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-850/80 text-slate-400">
                <tr>
                  <th className="p-2.5">Financial Metric</th>
                  <th className="p-2.5">Pre-Buy Contract</th>
                  <th className="p-2.5">Status Quo (Spot Buy)</th>
                  <th className="p-2.5 text-right">TBO Margin Arbitrage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                <tr>
                  <td className="p-2.5 text-slate-300 font-sans">Total Procurement Cost</td>
                  <td className="p-2.5 text-slate-200">${calculatedCost.toLocaleString()}</td>
                  <td className="p-2.5 text-slate-400">${(selectedAllotment * item.projectedSpotRate).toLocaleString()}</td>
                  <td className="p-2.5 text-right text-emerald-400 font-bold">
                    -${(selectedAllotment * (item.projectedSpotRate - item.preBuyRate)).toLocaleString()} (Locked Savings)
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 text-slate-300 font-sans">Target Selling Price to B2B Agencies</td>
                  <td className="p-2.5 text-slate-200">${item.dynamicSellingPrice} / unit</td>
                  <td className="p-2.5 text-slate-400">${item.projectedSpotRate} / unit</td>
                  <td className="p-2.5 text-right text-cyan-400 font-bold">
                    -{(100 - (item.dynamicSellingPrice / item.projectedSpotRate) * 100).toFixed(1)}% Competitive Edge
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 text-slate-300 font-sans">Expected Net Gross Margin</td>
                  <td className="p-2.5 text-emerald-400 font-bold">${calculatedExpectedProfit.toLocaleString()} ({calculatedMargin}%)</td>
                  <td className="p-2.5 text-slate-400">${Math.floor(calculatedExpectedProfit * 0.35).toLocaleString()} (8.5%)</td>
                  <td className="p-2.5 text-right text-emerald-400 font-bold">
                    +${(calculatedExpectedProfit - Math.floor(calculatedExpectedProfit * 0.35)).toLocaleString()} Profit Lift
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Downside Protection Clause Notice */}
          <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs flex items-start gap-3">
            <Lock className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold text-purple-300">Downside Unsold Protection Clause:</div>
              <div className="text-[12px] text-purple-200/80 mt-0.5">
                {item.downsideProtection}. Automated AI release watchdog will trigger unsold inventory dump to flash B2B channels at D-{item.releaseDays} if look-to-book falls below 60:1.
              </div>
            </div>
          </div>

          {/* Signoff details */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
            <span>Authorizing Officer:</span>
            <input
              type="text"
              value={signedBy}
              onChange={(e) => setSignedBy(e.target.value)}
              className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 text-xs w-72 focus:outline-none focus:border-[#FF5F1F]"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Cancel / Review Later
          </button>
          
          <button
            onClick={handleConfirmApproval}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5F1F] to-[#E54E10] text-white font-bold text-xs shadow-lg shadow-[#FF5F1F]/25 hover:shadow-[#FF5F1F]/40 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing Smart PO & Notifying Supplier...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Authorize & Commit Pre-Buy PO (${calculatedCost.toLocaleString()})
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
