import React, { useState } from 'react';
import { MASTER_AUDIT_SECTIONS } from '../data/checklistData';
import { Check, Search, Shield, ChevronDown, ChevronUp } from 'lucide-react';

export const MasterAuditChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSection = (sectionId: string) => {
    setCollapsedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  // Calculate totals
  let totalMasterItems = 0;
  MASTER_AUDIT_SECTIONS.forEach(s => {
    totalMasterItems += s.items.length;
  });
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const percent = Math.round((completedCount / totalMasterItems) * 100);

  return (
    <div className="space-y-5">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">
                Ward 3B: Comprehensive Internal Audit Preparation (10 Core Areas)
              </h2>
              <span className="text-[11px] font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-semibold">
                {completedCount}/{totalMasterItems} Verified ({percent}%)
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Complete reference checklist for quality audits, accreditation inspections, and departmental rounds.
            </p>
          </div>

          <div className="relative self-start sm:self-center">
            <input
              type="text"
              placeholder="Search 10 audit areas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg pl-7 pr-3 py-1.5 text-slate-900 w-52 sm:w-64 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
          </div>
        </div>

        {/* Progress bar line */}
        <div className="mt-3.5 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-slate-900 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* 10 Sections */}
      <div className="space-y-3.5">
        {MASTER_AUDIT_SECTIONS.map((sec) => {
          const isCollapsed = !!collapsedSections[sec.id];
          const filteredItems = sec.items.filter(item =>
            item.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sec.title.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (filteredItems.length === 0) return null;

          const sectionCheckedCount = sec.items.filter((_, idx) => !!checkedItems[`${sec.id}-${idx}`]).length;

          return (
            <div
              key={sec.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden"
            >
              <div
                onClick={() => toggleSection(sec.id)}
                className="px-4 py-3 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-100/60 transition-colors select-none"
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    {sec.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-500 tabular-nums">
                    {sectionCheckedCount} / {sec.items.length}
                  </span>
                  {isCollapsed ? (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  ) : (
                    <ChevronUp className="w-4 h-4 text-slate-500" />
                  )}
                </div>
              </div>

              {!isCollapsed && (
                <div className="divide-y divide-slate-100 p-1">
                  {filteredItems.map((itemText, idx) => {
                    const key = `${sec.id}-${idx}`;
                    const isChecked = !!checkedItems[key];

                    return (
                      <div
                        key={key}
                        onClick={() => toggleItem(key)}
                        className={`p-2.5 px-3 rounded-lg flex items-start gap-3 cursor-pointer transition-colors ${
                          isChecked ? 'bg-emerald-50/40 text-slate-800' : 'hover:bg-slate-50 text-slate-900'
                        }`}
                      >
                        <div
                          className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-all ${
                            isChecked
                              ? 'bg-slate-900 border-slate-900 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className={`text-xs leading-relaxed select-none ${isChecked ? 'text-slate-600 line-through' : 'font-medium'}`}>
                          {itemText}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
