import React, { useState } from 'react';
import { ShiftType, ShiftData, ChecklistItem } from '../types';
import { Check, CheckCircle, AlertCircle, Clock, User, Shield, PenTool, Search } from 'lucide-react';

interface ShiftChecklistProps {
  currentShift: ShiftType;
  onSelectShift: (shift: ShiftType) => void;
  shiftData: ShiftData;
  onUpdateShiftData: (updater: (prev: ShiftData) => ShiftData) => void;
  onFlagDeficiencyToLog?: (item: ChecklistItem) => void;
}

export const ShiftChecklist: React.FC<ShiftChecklistProps> = ({
  currentShift,
  onSelectShift,
  shiftData,
  onUpdateShiftData,
  onFlagDeficiencyToLog
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'issues'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDeficiencyItemId, setActiveDeficiencyItemId] = useState<string | null>(null);
  const [deficiencyInput, setDeficiencyInput] = useState('');

  // Calculate stats
  let totalItems = 0;
  let checkedItems = 0;
  let issueItems = 0;

  shiftData.categories.forEach(cat => {
    cat.items.forEach(item => {
      totalItems++;
      if (item.checked) checkedItems++;
      if (item.status === 'issue') issueItems++;
    });
  });

  const completionPercent = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  const handleToggleItem = (itemId: string) => {
    onUpdateShiftData(prev => {
      const updatedCategories = prev.categories.map(cat => ({
        ...cat,
        items: cat.items.map(item => {
          if (item.id === itemId) {
            const nextChecked = !item.checked;
            return {
              ...item,
              checked: nextChecked,
              status: (nextChecked ? 'ok' : 'ok') as 'ok' | 'issue' | 'na'
            };
          }
          return item;
        })
      }));
      return { ...prev, categories: updatedCategories };
    });
  };

  const handleSetStatus = (itemId: string, status: 'ok' | 'issue' | 'na') => {
    onUpdateShiftData(prev => {
      const updatedCategories = prev.categories.map(cat => ({
        ...cat,
        items: cat.items.map(item => {
          if (item.id === itemId) {
            return {
              ...item,
              status,
              checked: status === 'ok'
            };
          }
          return item;
        })
      }));
      return { ...prev, categories: updatedCategories };
    });

    if (status === 'issue') {
      setActiveDeficiencyItemId(itemId);
    }
  };

  const handleSaveDeficiencyNote = (itemId: string) => {
    if (!deficiencyInput.trim()) return;

    onUpdateShiftData(prev => {
      const updatedCategories = prev.categories.map(cat => ({
        ...cat,
        items: cat.items.map(item => {
          if (item.id === itemId) {
            return {
              ...item,
              deficiencyNote: deficiencyInput.trim(),
              status: 'issue' as const,
              checked: false
            };
          }
          return item;
        })
      }));
      return { ...prev, categories: updatedCategories };
    });

    // Also trigger global deficiency handler if present
    const item = shiftData.categories
      .flatMap(c => c.items)
      .find(i => i.id === itemId);
    if (item && onFlagDeficiencyToLog) {
      onFlagDeficiencyToLog({
        ...item,
        deficiencyNote: deficiencyInput.trim(),
        status: 'issue'
      });
    }

    setDeficiencyInput('');
    setActiveDeficiencyItemId(null);
  };

  const handleCheckAll = (check: boolean) => {
    onUpdateShiftData(prev => ({
      ...prev,
      categories: prev.categories.map(cat => ({
        ...cat,
        items: cat.items.map(item => ({
          ...item,
          checked: check,
          status: (check ? 'ok' : 'ok') as 'ok' | 'issue' | 'na'
        }))
      }))
    }));
  };

  const handleSignOff = () => {
    if (!shiftData.staffName.trim()) {
      alert('Please enter Staff In-Charge Name before signing off.');
      return;
    }
    onUpdateShiftData(prev => ({
      ...prev,
      verified: true,
      signature: prev.staffName.trim(),
      timeChecked: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
  };

  return (
    <div className="space-y-5">
      {/* Shift Selector Segmented Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => onSelectShift('morning')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              currentShift === 'morning'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Morning Shift (8:00 AM – 2:00 PM)
          </button>
          <button
            onClick={() => onSelectShift('evening')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              currentShift === 'evening'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Evening Shift (2:00 PM – 8:00 PM)
          </button>
          <button
            onClick={() => onSelectShift('night')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              currentShift === 'night'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Night Shift (8:00 PM – 8:00 AM)
          </button>
        </div>

        {/* Progress & Quick Stats */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-600">
          <div>
            <span className="text-slate-500">Progress:</span>{' '}
            <span className="font-bold text-slate-900 tabular-nums">{completionPercent}%</span>
            <span className="text-slate-400 ml-1">({checkedItems}/{totalItems})</span>
          </div>
          {issueItems > 0 && (
            <div className="text-red-700 font-semibold bg-red-50 px-2 py-0.5 rounded">
              {issueItems} Issue{issueItems > 1 ? 's' : ''} Flagged
            </div>
          )}
        </div>
      </div>

      {/* Shift Meta & Staff In-Charge Banner */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 items-end">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
              Audit Date
            </label>
            <input
              type="date"
              value={shiftData.date}
              onChange={(e) => onUpdateShiftData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
              Staff In-Charge Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Staff Nurse Fatima / Incharge"
                value={shiftData.staffName}
                onChange={(e) => onUpdateShiftData(prev => ({ ...prev, staffName: e.target.value }))}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
              <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
              Verification Time
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. 08:30 AM"
                value={shiftData.timeChecked}
                onChange={(e) => onUpdateShiftData(prev => ({ ...prev, timeChecked: e.target.value }))}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
              <Clock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSignOff}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                shiftData.verified
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
              }`}
            >
              {shiftData.verified ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Shift Signed & Verified</span>
                </>
              ) : (
                <>
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Sign & Lock Shift</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Progress bar line */}
        <div className="mt-3.5 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>

      {/* Filter and Quick Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Filters */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Items ({totalItems})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'pending' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pending ({totalItems - checkedItems})
          </button>
          <button
            onClick={() => setFilter('issues')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'issues' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Issues ({issueItems})
          </button>
        </div>

        {/* Search & Bulk Check */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search checklist item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs bg-white border border-slate-200 rounded-lg pl-7 pr-3 py-1.5 text-slate-900 w-44 sm:w-56 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
          </div>

          <button
            onClick={() => handleCheckAll(true)}
            className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors whitespace-nowrap"
          >
            Mark All OK
          </button>
          <button
            onClick={() => handleCheckAll(false)}
            className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Checklist Sections */}
      <div className="space-y-4">
        {shiftData.categories.map((cat) => {
          // Filter items
          const filteredItems = cat.items.filter(item => {
            const matchesQuery = item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
              cat.title.toLowerCase().includes(searchQuery.toLowerCase());
            if (!matchesQuery) return false;

            if (filter === 'pending') return !item.checked;
            if (filter === 'issues') return item.status === 'issue';
            return true;
          });

          if (filteredItems.length === 0) return null;

          const catChecked = cat.items.filter(i => i.checked).length;
          const catTotal = cat.items.length;

          return (
            <div
              key={cat.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden"
            >
              {/* Category Header */}
              <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    cat.priorityLevel === 'critical' ? 'bg-red-500' : 'bg-amber-500'
                  }`} />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    {cat.title}
                  </h3>
                </div>
                <div className="text-xs font-mono text-slate-500 tabular-nums">
                  {catChecked} / {catTotal} verified
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-slate-100">
                {filteredItems.map((item) => {
                  const isIssue = item.status === 'issue';
                  const isChecked = item.checked;

                  return (
                    <div
                      key={item.id}
                      className={`p-3 sm:px-4 transition-colors ${
                        isIssue
                          ? 'bg-red-50/50'
                          : isChecked
                          ? 'bg-white hover:bg-slate-50/60'
                          : 'bg-white hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        {/* Checkbox and Text */}
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <button
                            type="button"
                            onClick={() => handleToggleItem(item.id)}
                            className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-all ${
                              isChecked
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-slate-300 bg-white hover:border-slate-400'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5" />}
                          </button>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                onClick={() => handleToggleItem(item.id)}
                                className={`text-xs cursor-pointer select-none leading-relaxed ${
                                  isChecked ? 'text-slate-800' : 'text-slate-900 font-medium'
                                }`}
                              >
                                {item.text}
                              </span>

                              {item.priority === 'critical' && (
                                <span className="text-[10px] font-semibold text-red-700 bg-red-50 px-1.5 py-0.2 rounded border border-red-200">
                                  CRITICAL
                                </span>
                              )}
                            </div>

                            {/* Deficiency note badge if present */}
                            {item.deficiencyNote && (
                              <div className="mt-1.5 flex items-start gap-1.5 text-xs text-red-900 bg-red-100/70 p-2 rounded-md border border-red-200">
                                <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-semibold">Deficiency Noted:</span> {item.deficiencyNote}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Status Quick Select (OK / Issue) */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleSetStatus(item.id, 'ok')}
                            className={`px-2 py-1 text-[11px] font-semibold rounded transition-colors ${
                              item.status === 'ok' && item.checked
                                ? 'bg-emerald-600 text-white'
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            OK
                          </button>
                          <button
                            onClick={() => {
                              if (activeDeficiencyItemId === item.id) {
                                setActiveDeficiencyItemId(null);
                              } else {
                                setActiveDeficiencyItemId(item.id);
                                setDeficiencyInput(item.deficiencyNote || '');
                              }
                            }}
                            className={`px-2 py-1 text-[11px] font-semibold rounded transition-colors ${
                              item.status === 'issue'
                                ? 'bg-red-600 text-white'
                                : 'text-slate-600 hover:text-red-700 hover:bg-red-50'
                            }`}
                          >
                            Issue
                          </button>
                        </div>
                      </div>

                      {/* Dropdown / Inline Editor to add deficiency note */}
                      {activeDeficiencyItemId === item.id && (
                        <div className="mt-2.5 pt-2.5 border-t border-slate-200 pl-8">
                          <label className="block text-[11px] font-semibold text-red-900 mb-1">
                            Describe Deficiency / Gap for Corrective Action:
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="e.g. Expired multivitamin vial found; discarded and informed incharge"
                              value={deficiencyInput}
                              onChange={(e) => setDeficiencyInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveDeficiencyNote(item.id);
                              }}
                              className="flex-1 text-xs bg-white border border-red-300 rounded px-2.5 py-1.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-red-500"
                            />
                            <button
                              onClick={() => handleSaveDeficiencyNote(item.id)}
                              className="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded transition-colors whitespace-nowrap"
                            >
                              Save Issue
                            </button>
                            <button
                              onClick={() => setActiveDeficiencyItemId(null)}
                              className="px-2 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
