import React, { useState } from 'react';
import { HandoverPoint } from '../types';
import { ArrowRight, CheckCircle2, AlertCircle, FileText, UserCheck, Clock } from 'lucide-react';

interface HandoverSheetProps {
  handoverPoints: HandoverPoint[];
  onUpdateHandoverPoints: (points: HandoverPoint[]) => void;
  morningStaff: string;
  eveningStaff: string;
  nightStaff: string;
}

export const HandoverSheet: React.FC<HandoverSheetProps> = ({
  handoverPoints,
  onUpdateHandoverPoints,
  morningStaff,
  eveningStaff,
  nightStaff
}) => {
  const [activeTransition, setActiveTransition] = useState<'all' | 'm2e' | 'e2n' | 'n2m'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [editingTransition, setEditingTransition] = useState<'morningToEvening' | 'eveningToNight' | 'nightToMorning'>('morningToEvening');

  const handleToggleCheck = (
    id: string,
    transition: 'morningToEvening' | 'eveningToNight' | 'nightToMorning'
  ) => {
    const updated = handoverPoints.map(item => {
      if (item.id === id) {
        return {
          ...item,
          [transition]: {
            ...item[transition],
            checked: !item[transition].checked
          }
        };
      }
      return item;
    });
    onUpdateHandoverPoints(updated);
  };

  const handleSaveNotes = () => {
    if (!editingId) return;

    const updated = handoverPoints.map(item => {
      if (item.id === editingId) {
        return {
          ...item,
          [editingTransition]: {
            ...item[editingTransition],
            notes: editingNotes
          }
        };
      }
      return item;
    });
    onUpdateHandoverPoints(updated);
    setEditingId(null);
    setEditingNotes('');
  };

  // Stats
  const m2eDone = handoverPoints.filter(p => p.morningToEvening.checked).length;
  const e2nDone = handoverPoints.filter(p => p.eveningToNight.checked).length;
  const n2mDone = handoverPoints.filter(p => p.nightToMorning.checked).length;

  return (
    <div className="space-y-6">
      {/* Intro explanation & handover rules */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">
                Ward 3B: 3-Shift Compulsory Handover Protocol
              </h2>
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                8 Mandatory Handover Points
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Bedside shift-to-shift verbal and written handover. Relieving and incoming nurses must verify each point before relieving duties.
            </p>
          </div>

          {/* Quick Handover Shift Transition Selector with smooth horizontal scroll on mobile */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg overflow-x-auto max-w-full scrollbar-none w-full md:w-auto">
            <button
              onClick={() => setActiveTransition('all')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[34px] ${
                activeTransition === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All 3 Transitions
            </button>
            <button
              onClick={() => setActiveTransition('m2e')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[34px] ${
                activeTransition === 'm2e' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              M → E ({m2eDone}/8)
            </button>
            <button
              onClick={() => setActiveTransition('e2n')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[34px] ${
                activeTransition === 'e2n' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              E → N ({e2nDone}/8)
            </button>
            <button
              onClick={() => setActiveTransition('n2m')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[34px] ${
                activeTransition === 'n2m' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              N → M ({n2mDone}/8)
            </button>
          </div>
        </div>

        {/* Transition Staff Sign-off Status Cards */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-slate-100">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
              <span>Morning → Evening</span>
              <span className="font-mono text-emerald-700">{m2eDone}/8 Handed</span>
            </div>
            <div className="text-[11px] text-slate-600 space-y-0.5">
              <div>Handed by: <span className="font-semibold text-slate-800">{morningStaff || 'Morning Staff Nurse'}</span></div>
              <div>Taken by: <span className="font-semibold text-slate-800">{eveningStaff || 'Evening Staff Nurse'}</span></div>
              <div className="text-slate-400 font-mono text-[10px]">Time: 14:00 (2:00 PM)</div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
              <span>Evening → Night</span>
              <span className="font-mono text-emerald-700">{e2nDone}/8 Handed</span>
            </div>
            <div className="text-[11px] text-slate-600 space-y-0.5">
              <div>Handed by: <span className="font-semibold text-slate-800">{eveningStaff || 'Evening Staff Nurse'}</span></div>
              <div>Taken by: <span className="font-semibold text-slate-800">{nightStaff || 'Night Staff Nurse'}</span></div>
              <div className="text-slate-400 font-mono text-[10px]">Time: 20:00 (8:00 PM)</div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
              <span>Night → Morning</span>
              <span className="font-mono text-emerald-700">{n2mDone}/8 Handed</span>
            </div>
            <div className="text-[11px] text-slate-600 space-y-0.5">
              <div>Handed by: <span className="font-semibold text-slate-800">{nightStaff || 'Night Staff Nurse'}</span></div>
              <div>Taken by: <span className="font-semibold text-slate-800">{morningStaff || 'Morning Staff Nurse'}</span></div>
              <div className="text-slate-400 font-mono text-[10px]">Time: 08:00 (8:00 AM)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Handover Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-between px-3 py-1.5 bg-slate-50 border-b border-slate-200 text-[10px] text-slate-500 font-mono">
          <span>Bedside Handover Matrix</span>
          <span>Swipe horizontally →</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4 min-w-[200px]">Handover Item (Compulsory)</th>
                
                {(activeTransition === 'all' || activeTransition === 'm2e') && (
                  <th className="py-3 px-4 min-w-[240px] border-l border-slate-200 bg-sky-50/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sky-950 font-bold">Morning → Evening</span>
                      <span className="text-[10px] text-sky-700 font-mono">2:00 PM (14:00)</span>
                    </div>
                  </th>
                )}

                {(activeTransition === 'all' || activeTransition === 'e2n') && (
                  <th className="py-3 px-4 min-w-[240px] border-l border-slate-200 bg-amber-50/50">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-950 font-bold">Evening → Night</span>
                      <span className="text-[10px] text-amber-700 font-mono">8:00 PM (20:00)</span>
                    </div>
                  </th>
                )}

                {(activeTransition === 'all' || activeTransition === 'n2m') && (
                  <th className="py-3 px-4 min-w-[240px] border-l border-slate-200 bg-indigo-50/50">
                    <div className="flex items-center justify-between">
                      <span className="text-indigo-950 font-bold">Night → Morning</span>
                      <span className="text-[10px] text-indigo-700 font-mono">8:00 AM (08:00)</span>
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {handoverPoints.map((item, index) => {
                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 text-center font-mono font-medium text-slate-500">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {item.title}
                    </td>

                    {/* Morning to Evening Column */}
                    {(activeTransition === 'all' || activeTransition === 'm2e') && (
                      <td className="py-2.5 px-4 border-l border-slate-200 bg-sky-50/20">
                        <div className="space-y-1.5">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={item.morningToEvening.checked}
                              onChange={() => handleToggleCheck(item.id, 'morningToEvening')}
                              className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300"
                            />
                            <span className={`text-xs ${item.morningToEvening.checked ? 'text-emerald-700 font-bold' : 'text-slate-600'}`}>
                              {item.morningToEvening.checked ? 'Handed Over & Verified' : 'Check to Handover'}
                            </span>
                          </label>

                          <div className="flex items-center justify-between gap-2">
                            <p className="text-[11px] text-slate-600 truncate max-w-[200px]">
                              {item.morningToEvening.notes ? item.morningToEvening.notes : <span className="text-slate-400 italic">No notes</span>}
                            </p>
                            <button
                              onClick={() => {
                                setEditingId(item.id);
                                setEditingTransition('morningToEvening');
                                setEditingNotes(item.morningToEvening.notes || '');
                              }}
                              className="text-[11px] text-sky-700 hover:text-sky-900 hover:underline shrink-0"
                            >
                              {item.morningToEvening.notes ? 'Edit Note' : '+ Note'}
                            </button>
                          </div>
                        </div>
                      </td>
                    )}

                    {/* Evening to Night Column */}
                    {(activeTransition === 'all' || activeTransition === 'e2n') && (
                      <td className="py-2.5 px-4 border-l border-slate-200 bg-amber-50/20">
                        <div className="space-y-1.5">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={item.eveningToNight.checked}
                              onChange={() => handleToggleCheck(item.id, 'eveningToNight')}
                              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300"
                            />
                            <span className={`text-xs ${item.eveningToNight.checked ? 'text-emerald-700 font-bold' : 'text-slate-600'}`}>
                              {item.eveningToNight.checked ? 'Handed Over & Verified' : 'Check to Handover'}
                            </span>
                          </label>

                          <div className="flex items-center justify-between gap-2">
                            <p className="text-[11px] text-slate-600 truncate max-w-[200px]">
                              {item.eveningToNight.notes ? item.eveningToNight.notes : <span className="text-slate-400 italic">No notes</span>}
                            </p>
                            <button
                              onClick={() => {
                                setEditingId(item.id);
                                setEditingTransition('eveningToNight');
                                setEditingNotes(item.eveningToNight.notes || '');
                              }}
                              className="text-[11px] text-amber-800 hover:text-amber-950 hover:underline shrink-0"
                            >
                              {item.eveningToNight.notes ? 'Edit Note' : '+ Note'}
                            </button>
                          </div>
                        </div>
                      </td>
                    )}

                    {/* Night to Morning Column */}
                    {(activeTransition === 'all' || activeTransition === 'n2m') && (
                      <td className="py-2.5 px-4 border-l border-slate-200 bg-indigo-50/20">
                        <div className="space-y-1.5">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={item.nightToMorning.checked}
                              onChange={() => handleToggleCheck(item.id, 'nightToMorning')}
                              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                            />
                            <span className={`text-xs ${item.nightToMorning.checked ? 'text-emerald-700 font-bold' : 'text-slate-600'}`}>
                              {item.nightToMorning.checked ? 'Handed Over & Verified' : 'Check to Handover'}
                            </span>
                          </label>

                          <div className="flex items-center justify-between gap-2">
                            <p className="text-[11px] text-slate-600 truncate max-w-[200px]">
                              {item.nightToMorning.notes ? item.nightToMorning.notes : <span className="text-slate-400 italic">No notes</span>}
                            </p>
                            <button
                              onClick={() => {
                                setEditingId(item.id);
                                setEditingTransition('nightToMorning');
                                setEditingNotes(item.nightToMorning.notes || '');
                              }}
                              className="text-[11px] text-indigo-700 hover:text-indigo-900 hover:underline shrink-0"
                            >
                              {item.nightToMorning.notes ? 'Edit Note' : '+ Note'}
                            </button>
                          </div>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Note Edit Modal / Slide */}
      {editingId && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-5 shadow-xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Add Handover Note / Specific Patient Info
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              Enter specific bed numbers, critical values, doctor names, or investigation statuses for this shift handover.
            </p>

            <textarea
              rows={4}
              value={editingNotes}
              onChange={(e) => setEditingNotes(e.target.value)}
              placeholder="e.g. Bed 305: Repeat K+ sample sent at 13:00, report pending. Doctor notified."
              className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
            />

            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                onClick={() => setEditingId(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs"
              >
                Save Handover Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
