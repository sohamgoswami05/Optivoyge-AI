import React from 'react';

export default function EnterpriseHeader({ 
  cycle = 'Nov-Dec 2026', 
  currency = 'INR ₹'
}) {
  return (
    <header className="sticky top-0 z-30 h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs select-none w-full">
      {/* Left: TBO Brand Red Badge & Human Title */}
      <div className="flex items-center gap-3 whitespace-nowrap min-w-0">
        <span className="bg-red-600 text-white font-bold px-2 py-1 rounded text-xs tracking-wider shrink-0">
          TBO
        </span>
        <h1 className="font-bold text-slate-900 text-sm tracking-tight font-sans whitespace-nowrap truncate">
          TBO.com // Treasury &amp; Inventory Desk
        </h1>
      </div>

      {/* Right: Operational Status Pills Grouped Neatly (Zero Vertical Wrapping) */}
      <div className="flex items-center gap-3 whitespace-nowrap shrink-0 text-xs font-sans">
        {/* Cycle & Currency Pill */}
        <div className="hidden sm:flex items-center gap-2 text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1 rounded-md text-xs">
          <span className="text-slate-400 font-medium">Cycle:</span>
          <span className="font-semibold text-slate-800">{cycle}</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-400 font-medium">Currency:</span>
          <span className="font-semibold text-slate-800">{currency}</span>
        </div>

        {/* Optimizer Active Status Pill */}
        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Optimizer Active: 42ms</span>
        </div>

        {/* User Desk Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 text-xs">
          <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
            TO
          </div>
          <div className="hidden md:block text-slate-700 font-medium whitespace-nowrap">
            <span className="font-semibold text-slate-900">Procurement Desk</span> / <span className="text-slate-500 text-[11px]">Enterprise Tier 1</span>
          </div>
        </div>
      </div>
    </header>
  );
}
