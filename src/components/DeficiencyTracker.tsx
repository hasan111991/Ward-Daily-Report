import React, { useState } from 'react';
import { DeficiencyLogEntry } from '../types';
import { Plus, CheckCircle, AlertTriangle, Clock, User, ShieldCheck } from 'lucide-react';

interface DeficiencyTrackerProps {
  deficiencies: DeficiencyLogEntry[];
  onUpdateDeficiencies: (list: DeficiencyLogEntry[]) => void;
  wardReady: boolean;
  onToggleWardReady: () => void;
  finalCheckedBy: string;
  onChangeFinalCheckedBy: (name: string) => void;
}

export const DeficiencyTracker: React.FC<DeficiencyTrackerProps> = ({
  deficiencies,
  onUpdateDeficiencies,
  wardReady,
  onToggleWardReady,
  finalCheckedBy,
  onChangeFinalCheckedBy
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newArea, setNewArea] = useState('Patient Files / HMS');
  const [newStatus, setNewStatus] = useState<'OK' | 'Issue'>('Issue');
  const [newDeficiency, setNewDeficiency] = useState('');
  const [newActionTaken, setNewActionTaken] = useState('');
  const [newResponsible, setNewResponsible] = useState('');
  const [newTargetTime, setNewTargetTime] = useState('');

  const handleToggleResolved = (id: string) => {
    onUpdateDeficiencies(
      deficiencies.map(d => (d.id === id ? { ...d, resolved: !d.resolved } : d))
    );
  };

  const handleUpdateField = (id: string, field: keyof DeficiencyLogEntry, value: any) => {
    onUpdateDeficiencies(
      deficiencies.map(d => (d.id === id ? { ...d, [field]: value } : d))
    );
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeficiency.trim()) return;

    const newEntry: DeficiencyLogEntry = {
      id: `def-${Date.now()}`,
      area: newArea,
      status: newStatus,
      deficiency: newDeficiency.trim(),
      actionTaken: newActionTaken.trim() || 'Pending verification',
      responsible: newResponsible.trim() || 'Ward Incharge',
      targetTime: newTargetTime.trim() || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      resolved: newStatus === 'OK'
    };

    onUpdateDeficiencies([...deficiencies, newEntry]);
    setNewDeficiency('');
    setNewActionTaken('');
    setNewResponsible('');
    setNewTargetTime('');
    setShowAddForm(false);
  };

  const resolvedCount = deficiencies.filter(d => d.resolved).length;
  const issuesCount = deficiencies.filter(d => d.status === 'Issue' && !d.resolved).length;

  return (
    <div className="space-y-6">
      {/* Overview & Sign-off summary */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">
                Daily Sign-off & Deficiency Action Tracker
              </h2>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-semibold ${
                issuesCount > 0
                  ? 'bg-amber-100 text-amber-900'
                  : 'bg-emerald-100 text-emerald-900'
              }`}>
                {issuesCount > 0 ? `${issuesCount} Open Issues` : 'All Resolved / OK'}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Document non-conformities found during rounds, assign immediate corrective actions (CAPA), and verify closure before external auditors arrive.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors self-start sm:self-center"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Deficiency</span>
          </button>
        </div>
      </div>

      {/* Add form modal / drawer */}
      {showAddForm && (
        <form onSubmit={handleAddEntry} className="bg-slate-50 p-4 rounded-xl border border-slate-300 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900">Record New Ward Audit Deficiency</h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Audit Area</label>
              <select
                value={newArea}
                onChange={(e) => setNewArea(e.target.value)}
                className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-900"
              >
                <option value="Patient Files / HMS">Patient Files / HMS</option>
                <option value="Medication Storage">Medication Storage</option>
                <option value="Crash Cart">Crash Cart</option>
                <option value="Infection Control">Infection Control</option>
                <option value="Environment & Fire">Environment & Fire</option>
                <option value="Equipment">Equipment</option>
                <option value="Staff Knowledge">Staff Knowledge</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as 'OK' | 'Issue')}
                className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-900"
              >
                <option value="Issue">Issue / Deficiency</option>
                <option value="OK">OK / Compliant</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Target Time</label>
              <input
                type="text"
                placeholder="e.g. 11:30 AM"
                value={newTargetTime}
                onChange={(e) => setNewTargetTime(e.target.value)}
                className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Deficiency Description</label>
            <input
              type="text"
              required
              placeholder="e.g. Bed 303: Allergy band missing; chart noted Penicillin allergy."
              value={newDeficiency}
              onChange={(e) => setNewDeficiency(e.target.value)}
              className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Action Taken (CAPA)</label>
              <input
                type="text"
                placeholder="e.g. Red allergy band affixed immediately; informed doctor"
                value={newActionTaken}
                onChange={(e) => setNewActionTaken(e.target.value)}
                className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Responsible Person</label>
              <input
                type="text"
                placeholder="e.g. Staff Nurse Fatima"
                value={newResponsible}
                onChange={(e) => setNewResponsible(e.target.value)}
                className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-900"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs"
            >
              Add to Sign-off Log
            </button>
          </div>
        </form>
      )}

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <th className="py-3 px-3 w-10 text-center">#</th>
                <th className="py-3 px-3 min-w-[140px]">Audit Area</th>
                <th className="py-3 px-3 w-28">Status</th>
                <th className="py-3 px-3 min-w-[220px]">Deficiency Observed</th>
                <th className="py-3 px-3 min-w-[200px]">Action Taken (CAPA)</th>
                <th className="py-3 px-3 min-w-[130px]">Responsible</th>
                <th className="py-3 px-3 w-24">Time</th>
                <th className="py-3 px-3 w-24 text-center">Resolved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {deficiencies.map((item, idx) => {
                const isIssue = item.status === 'Issue';
                return (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 text-center font-mono text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                      {item.area}
                    </td>
                    <td className="py-2.5 px-3">
                      <select
                        value={item.status}
                        onChange={(e) => handleUpdateField(item.id, 'status', e.target.value)}
                        className={`text-xs font-semibold px-2 py-0.5 rounded border ${
                          isIssue
                            ? 'bg-red-50 text-red-800 border-red-200'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        <option value="OK">OK</option>
                        <option value="Issue">Issue</option>
                      </select>
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">
                      <input
                        type="text"
                        value={item.deficiency}
                        onChange={(e) => handleUpdateField(item.id, 'deficiency', e.target.value)}
                        className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-slate-900 focus:outline-none py-0.5 text-xs text-slate-800"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">
                      <input
                        type="text"
                        value={item.actionTaken}
                        onChange={(e) => handleUpdateField(item.id, 'actionTaken', e.target.value)}
                        className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-slate-900 focus:outline-none py-0.5 text-xs text-slate-800"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">
                      <input
                        type="text"
                        value={item.responsible}
                        onChange={(e) => handleUpdateField(item.id, 'responsible', e.target.value)}
                        className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-slate-900 focus:outline-none py-0.5 text-xs text-slate-800"
                      />
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">
                      <input
                        type="text"
                        value={item.targetTime}
                        onChange={(e) => handleUpdateField(item.id, 'targetTime', e.target.value)}
                        className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-slate-900 focus:outline-none py-0.5 text-xs font-mono text-slate-800"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => handleToggleResolved(item.id)}
                        className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                          item.resolved
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                        }`}
                      >
                        {item.resolved ? 'RESOLVED' : 'PENDING'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Final Verification Box */}
      <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Final Ward Audit Readiness Verification & Sign-off</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 text-xs">
          <label className="flex items-center gap-2 bg-slate-800/80 p-2.5 rounded-lg cursor-pointer hover:bg-slate-800">
            <input
              type="checkbox"
              checked={wardReady}
              onChange={onToggleWardReady}
              className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400"
            />
            <span className="font-medium text-slate-200">
              All critical deficiencies resolved / escalated
            </span>
          </label>

          <label className="flex items-center gap-2 bg-slate-800/80 p-2.5 rounded-lg cursor-pointer hover:bg-slate-800">
            <input
              type="checkbox"
              defaultChecked={true}
              className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400"
            />
            <span className="font-medium text-slate-200">
              Evidence / documentation physically available
            </span>
          </label>

          <label className="flex items-center gap-2 bg-slate-800/80 p-2.5 rounded-lg cursor-pointer hover:bg-slate-800">
            <input
              type="checkbox"
              defaultChecked={true}
              className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400"
            />
            <span className="font-medium text-slate-200">
              Ward 3B 100% ready for internal / external audit
            </span>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Final Verification Checked By:</span>
            <input
              type="text"
              placeholder="e.g. Head Nurse / Ward Quality Lead"
              value={finalCheckedBy}
              onChange={(e) => onChangeFinalCheckedBy(e.target.value)}
              className="text-xs bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-white focus:outline-none focus:ring-1 focus:ring-emerald-400 w-56"
            />
          </div>

          <div className="text-xs font-mono text-emerald-400">
            Ward Audit Readiness: {wardReady ? 'AUDIT READY - SATISFACTORY' : 'INSPECTION IN PROGRESS'}
          </div>
        </div>
      </div>
    </div>
  );
};
