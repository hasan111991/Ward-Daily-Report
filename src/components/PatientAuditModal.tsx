import React, { useState } from 'react';
import { PatientAuditItem } from '../types';
import { Check, X, Plus, AlertCircle, FileCheck } from 'lucide-react';

interface PatientAuditProps {
  patientList: PatientAuditItem[];
  onUpdatePatientList: (list: PatientAuditItem[]) => void;
}

export const PatientAuditModal: React.FC<PatientAuditProps> = ({
  patientList,
  onUpdatePatientList
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleToggle = (index: number, field: keyof PatientAuditItem) => {
    const updated = patientList.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          [field]: !item[field]
        };
      }
      return item;
    });
    onUpdatePatientList(updated);
  };

  const handleTextChange = (index: number, field: keyof PatientAuditItem, val: string) => {
    const updated = patientList.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          [field]: val
        };
      }
      return item;
    });
    onUpdatePatientList(updated);
  };

  const handleAddPatient = () => {
    const nextNumber = patientList.length + 1;
    const newPatient: PatientAuditItem = {
      bedNo: `Bed 3${nextNumber.toString().padStart(2, '0')}`,
      patientName: `Patient Sample ${nextNumber}`,
      mrn: `MRN-${Math.floor(80000 + Math.random() * 9000)}`,
      idBandOk: true,
      allergyDocumented: true,
      fallRiskAssessed: true,
      vitalSignsCurrent: true,
      marComplete: true,
      physicalMatchesHms: true,
      notes: 'Bedside chart and HMS audited.'
    };
    onUpdatePatientList([...patientList, newPatient]);
  };

  return (
    <div className="space-y-5">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">
                Random 5-Patient Bedside & HMS File Audit Sample
              </h2>
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Audit Requirement: Min 5 Patients
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Internal auditors pick 5 active patients at random and compare the physical paper folder against the hospital HMS software.
            </p>
          </div>

          <button
            onClick={handleAddPatient}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap self-start sm:self-center"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Patient Audit</span>
          </button>
        </div>
      </div>

      {/* Patient Cards / Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <th className="py-3 px-3 w-10 text-center">#</th>
                <th className="py-3 px-3 w-28">Bed No</th>
                <th className="py-3 px-3 min-w-[140px]">Patient Name</th>
                <th className="py-3 px-3 w-28">MRN / ID</th>
                <th className="py-3 px-2 text-center w-24">ID Band</th>
                <th className="py-3 px-2 text-center w-24">Allergy Doc</th>
                <th className="py-3 px-2 text-center w-24">Fall Risk</th>
                <th className="py-3 px-2 text-center w-24">Vitals Chart</th>
                <th className="py-3 px-2 text-center w-24">MAR Complete</th>
                <th className="py-3 px-2 text-center w-28">Physical = HMS</th>
                <th className="py-3 px-3 min-w-[180px]">Clinical Audit Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {patientList.map((p, idx) => {
                const allPass = p.idBandOk && p.allergyDocumented && p.fallRiskAssessed && p.vitalSignsCurrent && p.marComplete && p.physicalMatchesHms;

                return (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 text-center font-mono text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-3">
                      <input
                        type="text"
                        value={p.bedNo}
                        onChange={(e) => handleTextChange(idx, 'bedNo', e.target.value)}
                        className="w-full font-semibold text-xs text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-slate-900 focus:outline-none"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <input
                        type="text"
                        value={p.patientName}
                        onChange={(e) => handleTextChange(idx, 'patientName', e.target.value)}
                        className="w-full text-xs text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-slate-900 focus:outline-none"
                      />
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600">
                      <input
                        type="text"
                        value={p.mrn}
                        onChange={(e) => handleTextChange(idx, 'mrn', e.target.value)}
                        className="w-full text-xs font-mono text-slate-700 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-slate-900 focus:outline-none"
                      />
                    </td>

                    {/* ID Band Check */}
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() => handleToggle(idx, 'idBandOk')}
                        className={`w-6 h-6 rounded inline-flex items-center justify-center transition-colors ${
                          p.idBandOk ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {p.idBandOk ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      </button>
                    </td>

                    {/* Allergy Documented Check */}
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() => handleToggle(idx, 'allergyDocumented')}
                        className={`w-6 h-6 rounded inline-flex items-center justify-center transition-colors ${
                          p.allergyDocumented ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {p.allergyDocumented ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      </button>
                    </td>

                    {/* Fall Risk Assessed */}
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() => handleToggle(idx, 'fallRiskAssessed')}
                        className={`w-6 h-6 rounded inline-flex items-center justify-center transition-colors ${
                          p.fallRiskAssessed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {p.fallRiskAssessed ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      </button>
                    </td>

                    {/* Vitals Current */}
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() => handleToggle(idx, 'vitalSignsCurrent')}
                        className={`w-6 h-6 rounded inline-flex items-center justify-center transition-colors ${
                          p.vitalSignsCurrent ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {p.vitalSignsCurrent ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      </button>
                    </td>

                    {/* MAR Complete */}
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() => handleToggle(idx, 'marComplete')}
                        className={`w-6 h-6 rounded inline-flex items-center justify-center transition-colors ${
                          p.marComplete ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {p.marComplete ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      </button>
                    </td>

                    {/* Physical file matches HMS */}
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() => handleToggle(idx, 'physicalMatchesHms')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                          p.physicalMatchesHms
                            ? 'bg-emerald-600 text-white'
                            : 'bg-red-600 text-white'
                        }`}
                      >
                        {p.physicalMatchesHms ? 'Matched' : 'Gap'}
                      </button>
                    </td>

                    {/* Notes */}
                    <td className="py-3 px-3">
                      <input
                        type="text"
                        value={p.notes}
                        onChange={(e) => handleTextChange(idx, 'notes', e.target.value)}
                        className="w-full text-xs text-slate-700 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-slate-900 focus:outline-none"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
