import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { RED_FLAG_ITEMS } from '../data/checklistData';

interface RedFlagBannerProps {
  verifiedFlags: Record<string, boolean>;
  onToggleFlag: (id: string) => void;
}

export const RedFlagBanner: React.FC<RedFlagBannerProps> = ({ verifiedFlags, onToggleFlag }) => {
  const [expanded, setExpanded] = useState(false);
  const checkedCount = Object.values(verifiedFlags).filter(Boolean).length;
  const allVerified = checkedCount === RED_FLAG_ITEMS.length;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4 mb-6 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 bg-amber-100 rounded-md text-amber-800 shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-amber-950">
                Daily Red-Flag Check (Priority 6 Items)
              </h2>
              <span className="text-xs font-mono font-medium text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
                {checkedCount}/{RED_FLAG_ITEMS.length} Verified
              </span>
            </div>
            <p className="text-xs text-amber-800 mt-0.5">
              Agar time kam ho, ye 6 cheezen lazmi physically verify karein before audit rounds arrive.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          {allVerified && (
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>All 6 Physically Verified</span>
            </div>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs font-medium text-amber-900 hover:text-amber-950 px-2 py-1 rounded bg-amber-200/50 hover:bg-amber-200 transition-colors"
          >
            <span>{expanded ? 'Hide Details' : 'Verify Checklist'}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-amber-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {RED_FLAG_ITEMS.map((rf) => {
            const isChecked = !!verifiedFlags[rf.id];
            return (
              <div
                key={rf.id}
                onClick={() => onToggleFlag(rf.id)}
                className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-emerald-50/90 border-emerald-300 shadow-xs'
                    : 'bg-white border-amber-200 hover:border-amber-400'
                }`}
              >
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold leading-tight ${isChecked ? 'text-emerald-950' : 'text-slate-900'}`}>
                      {rf.title}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                      {rf.description}
                    </p>
                    <div className="mt-1 text-[10px] text-amber-900 bg-amber-100/60 px-1.5 py-0.5 rounded inline-block font-mono">
                      Standard: {rf.standard}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
