import React, { useState } from 'react';
import { 
  Radio, 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  ShieldAlert, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  PlusCircle, 
  Activity, 
  MapPin, 
  Clock, 
  Check, 
  Flame,
  Zap,
  Ticket,
  FileText,
  CloudSun
} from 'lucide-react';
import { MOCK_EXTERNAL_SIGNALS } from '../../data/mockData';

export default function SignalFusionEngine({ onOpenApproval, inventory }) {
  const [signals, setSignals] = useState(MOCK_EXTERNAL_SIGNALS);
  const [selectedSignal, setSelectedSignal] = useState(MOCK_EXTERNAL_SIGNALS[0]);
  const [isSimulatingShock, setIsSimulatingShock] = useState(false);
  const [hedgedSignals, setHedgedSignals] = useState({});

  const handleSimulateCustomShock = () => {
    setIsSimulatingShock(true);
    setTimeout(() => {
      const newSignal = {
        id: `SIG-0${signals.length + 1}`,
        type: 'Pop Megastar Tour Announce',
        title: 'Beyoncé Renaissance World Tour Added Dates at Tottenham Stadium',
        destination: 'London, UK (LHR)',
        dateRange: 'Jul 10 - Jul 18, 2027',
        surgeLeadTime: '21 days ahead of bedbank spot repricing',
        estimatedDemandSpike: '+290%',
        spotPriceInflationRisk: '+75%',
        signalSource: 'Live Nation Global Tour Wire + Eventim API',
        confidence: 99,
        status: 'Active Alert',
        action: 'Lock 300 luxury rooms at The Ritz London & 400 flight seats',
        impactedValue: '$510,000'
      };
      setSignals([newSignal, ...signals]);
      setSelectedSignal(newSignal);
      setIsSimulatingShock(false);
    }, 800);
  };

  const handleExecuteHedge = (signalId) => {
    setHedgedSignals((prev) => ({ ...prev, [signalId]: true }));
    // If corresponding inventory item exists, trigger approval
    const matchingItem = inventory.find(i => i.cityCode === 'DXB' || i.cityCode === 'LHR');
    if (matchingItem) {
      onOpenApproval(matchingItem);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Innovation Concept Explainer */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-900 border border-cyan-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Radio className="w-4 h-4 animate-pulse" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                Winning Innovation Pillar 1
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                Real-Time NLP & Scraper Graph
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-white">
              External Signal Fusion Engine
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Suppliers and hotel bedbanks take <strong>14 to 35 days</strong> to realize demand surges and raise wholesale prices. Our engine continuously fuses real-time external catalysts (concert announcements, visa changes, sporting events, weather forecasts) with internal look-to-book telemetry to pre-buy before rates explode.
            </p>
          </div>

          <button
            onClick={handleSimulateCustomShock}
            disabled={isSimulatingShock}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 shrink-0 disabled:opacity-60"
          >
            {isSimulatingShock ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                Ingesting Live Feed Shock...
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5" />
                Simulate New Event Shock
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Signal Radar Stream & Deep Dive Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Real-time Signal Feed (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Live External Event Stream ({signals.length})
            </h3>
            <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Polling 42 Sources
            </span>
          </div>

          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {signals.map((sig) => {
              const isSelected = selectedSignal.id === sig.id;
              const isHedged = hedgedSignals[sig.id];

              return (
                <div
                  key={sig.id}
                  onClick={() => setSelectedSignal(sig)}
                  className={`p-3.5 rounded-xl cursor-pointer transition-all border text-left ${
                    isSelected
                      ? 'bg-slate-850 border-cyan-500 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-900/80 hover:bg-slate-850/80 border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                      {sig.type}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      {sig.confidence}% Confidence
                    </span>
                  </div>

                  <h4 className="font-semibold text-xs text-white leading-snug line-clamp-2">
                    {sig.title}
                  </h4>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#FF5F1F]" />
                      {sig.destination}
                    </span>
                    <span>•</span>
                    <span className="text-rose-400 font-semibold font-mono">
                      Spike {sig.estimatedDemandSpike}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-800 text-[10px]">
                    <span className="text-amber-400 font-mono font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Lead: {sig.surgeLeadTime}
                    </span>
                    {isHedged ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Pre-Buy Hedged
                      </span>
                    ) : (
                      <span className="text-slate-400 group-hover:text-cyan-400 flex items-center gap-1">
                        Inspect Arbitrage <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Signal Arbitrage Diagnostic & Lead Time Visualizer (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Signal Detail Card */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#FF5F1F]/10 text-[#FF5F1F] font-bold border border-[#FF5F1F]/30">
                    {selectedSignal.id}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Source: {selectedSignal.signalSource}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">
                  {selectedSignal.title}
                </h3>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Impacted Market Value</span>
                <span className="text-lg font-mono font-extrabold text-emerald-400">
                  {selectedSignal.impactedValue}
                </span>
              </div>
            </div>

            {/* Metrics Triad */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-850/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Surge Lead Window</span>
                <span className="text-sm font-bold text-amber-400 font-mono mt-0.5 block">
                  {selectedSignal.surgeLeadTime}
                </span>
                <span className="text-[10px] text-slate-400">Ahead of supplier price surge</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-850/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Spot Price Inflation</span>
                <span className="text-sm font-bold text-rose-400 font-mono mt-0.5 block">
                  {selectedSignal.spotPriceInflationRisk}
                </span>
                <span className="text-[10px] text-slate-400">If relying on spot API buy</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-850/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Predicted Demand Lift</span>
                <span className="text-sm font-bold text-emerald-400 font-mono mt-0.5 block">
                  {selectedSignal.estimatedDemandSpike}
                </span>
                <span className="text-[10px] text-slate-400">Search volume spike</span>
              </div>
            </div>

            {/* Visual Timeline: The Lead-Time Pre-Buy Advantage */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  Signal Lead-Time Arbitrage Timeline
                </span>
                <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                  TBO Arbitrage Capture Window
                </span>
              </div>

              {/* Step Progression Timeline */}
              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-cyan-400 before:via-[#FF5F1F] before:to-emerald-400 text-xs">
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow shadow-cyan-400/50" />
                  <div className="font-semibold text-slate-200">Day 0: External Catalyst Ingested</div>
                  <div className="text-[11px] text-slate-400">Event announcement caught via Ticketmaster/Timatic/Satellite API before public OTA awareness.</div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#FF5F1F] shadow shadow-[#FF5F1F]/50" />
                  <div className="font-semibold text-slate-200">Day 2: Internal Look-to-Book Telemetry Jump</div>
                  <div className="text-[11px] text-slate-400">Search queries from tier-1 travel agencies climb to 190:1. System flags high-probability sell-out.</div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-amber-400 shadow shadow-amber-400/50" />
                  <div className="font-semibold text-amber-300">Day 3: TBO Algorithmic Pre-Buy Committed (Wholesale Rate Locked)</div>
                  <div className="text-[11px] text-slate-400">Locking 300+ room/seat blocks at base wholesale contract rates with D-14 downside release protection.</div>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-rose-400 shadow shadow-rose-400/50" />
                  <div className="font-semibold text-slate-200">Day 18–25: Suppliers & OTAs Reprice Wholesale Spot (+58% to +85%)</div>
                  <div className="text-[11px] text-slate-400">Unhedged competitors face massive rate hikes or sold-out API errors. TBO retains 100% bookable inventory.</div>
                </div>

                {/* Step 5 */}
                <div className="relative">
                  <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow shadow-emerald-400/50" />
                  <div className="font-semibold text-emerald-400">Day 30+: High-Margin B2B Distribution</div>
                  <div className="text-[11px] text-slate-400">TBO sells inventory to corporate buyers with +28% to +35% net profit margin while beating spot prices by 12%.</div>
                </div>
              </div>
            </div>

            {/* Action Trigger Box */}
            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold block">
                  Recommended System Action
                </span>
                <p className="text-xs text-slate-200 mt-0.5">
                  {selectedSignal.action}
                </p>
              </div>

              <button
                onClick={() => handleExecuteHedge(selectedSignal.id)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF5F1F] to-[#E54E10] text-white font-bold text-xs shadow-lg shadow-[#FF5F1F]/20 hover:shadow-[#FF5F1F]/40 transition-all flex items-center gap-1.5 shrink-0"
              >
                <Check className="w-3.5 h-3.5" />
                Execute Pre-Buy Hedge
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
