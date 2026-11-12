import React from 'react';

export default function InstitutionalTopBar({ 
  cycle = 'Nov–Dec 2026', 
  currency = 'INR ₹',
  solverLatency = '42ms'
}) {
  return (
    <header className="h-10 bg-carbon-900 border-b border-zinc-border px-3 flex items-center justify-between text-xs select-none">
      {/* Left: Desk Title and Breadcrumb */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 font-mono font-bold text-white tracking-wider text-[11px]">
          <span className="w-2 h-2 bg-tbo-orange inline-block"></span>
          <span>TBO.COM // INVENTORY TREASURY &amp; PRE-BUY DESK</span>
        </div>
        <div className="h-3 w-px bg-zinc-border hidden sm:block"></div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
          <span className="text-zinc-500">CORRIDOR DESK:</span>
          <span className="text-zinc-200">Global Hotels &amp; Air</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-500">CYCLE:</span>
          <span className="text-zinc-200">{cycle}</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-500">BASE CURR:</span>
          <span className="text-zinc-200 font-bold">{currency}</span>
        </div>
      </div>

      {/* Right: Quantitative Engine Status Telemetry */}
      <div className="flex items-center gap-4 font-mono text-[11px]">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-tbo-emerald"></span>
          <span className="text-zinc-400">SOLVER:</span>
          <span className="text-zinc-200 font-semibold">ONLINE ({solverLatency})</span>
        </div>
        <div className="h-3 w-px bg-zinc-border hidden md:block"></div>
        <div className="hidden md:flex items-center gap-1.5">
          <span className="text-zinc-400">GDS LATENCY:</span>
          <span className="text-zinc-200">18ms</span>
        </div>
        <div className="h-3 w-px bg-zinc-border hidden md:block"></div>
        <div className="hidden md:flex items-center gap-1.5">
          <span className="text-zinc-400">FEED SYNC:</span>
          <span className="text-tbo-emerald font-semibold">100%</span>
        </div>
      </div>
    </header>
  );
}
