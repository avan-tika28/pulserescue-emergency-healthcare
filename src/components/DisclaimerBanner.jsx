import React, { useState } from 'react';
import { ShieldCheck, Info, X } from 'lucide-react';

export default function DisclaimerBanner() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return (
      <div className="bg-slate-100 border-b border-slate-200 py-1 px-4 text-xs text-slate-600 flex justify-between items-center">
        <span className="flex items-center gap-1.5 font-medium text-[11px]">
          <Info className="w-3.5 h-3.5 text-teal-600" />
          PulseRescue Sandbox Environment: Simulated clinical operations active.
        </span>
        <button
          onClick={() => setIsDismissed(false)}
          className="text-teal-700 hover:text-teal-900 underline font-semibold text-[11px] ml-2"
        >
          View System Notice
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 px-4 py-1.5 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
            CLINICAL SANDBOX
          </span>
          <p className="text-slate-300 text-[11px] leading-tight">
            <strong className="text-white font-medium">Compliance & Verification Notice:</strong> Emergency response dispatches, patient telemetry, and AI clinical triage scoring in this console are simulated operations for healthcare workflow evaluation.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
          <span className="text-[10px] text-slate-400 hidden md:inline">
            System Status: 99.98% Available
          </span>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
            title="Minimize notice"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
