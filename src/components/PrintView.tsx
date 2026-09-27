import React, { useState } from 'react';
import { ShiftData, HandoverPoint, DeficiencyLogEntry } from '../types';
import { Printer, X, FileText, CheckSquare, Layers } from 'lucide-react';

interface PrintViewProps {
  onClose: () => void;
  morningData: ShiftData;
  eveningData: ShiftData;
  nightData: ShiftData;
  handoverPoints: HandoverPoint[];
  deficiencyLog: DeficiencyLogEntry[];
  dateString: string;
}

export const PrintView: React.FC<PrintViewProps> = ({
  onClose,
  morningData,
  eveningData,
  nightData,
  handoverPoints,
  deficiencyLog,
  dateString
}) => {
  const [printScope, setPrintScope] = useState<'all' | 'morning' | 'evening' | 'night' | 'handover'>('all');

  const handlePrint = () => {
    window.print();
  };

  // Reusable Page Header for each printed sheet
  const renderPageHeader = (shiftName: string, timing: string, staffName: string) => (
    <div className="border-b-2 border-slate-900 pb-3 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-sm sm:text-base font-bold tracking-tight uppercase text-slate-900">
            Hospital Quality & Patient Safety Accreditation Division
          </h1>
          <h2 className="text-xs sm:text-sm font-semibold text-slate-700">
            WARD 3B – DAILY INTERNAL AUDIT CHECKLIST: {shiftName.toUpperCase()}
          </h2>
        </div>
        <div className="text-right text-[11px] font-mono text-slate-600">
          <div className="font-bold text-slate-900">FORM W3B-AUD-2026</div>
          <div>Ward 3B Inpatient</div>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-slate-200 grid grid-cols-4 gap-2 text-[11px]">
        <div>
          <span className="text-slate-500 font-semibold">Date:</span>{' '}
          <span className="font-bold text-slate-900">{dateString}</span>
        </div>
        <div>
          <span className="text-slate-500 font-semibold">Shift Timing:</span>{' '}
          <span className="font-bold text-slate-900">{timing}</span>
        </div>
        <div>
          <span className="text-slate-500 font-semibold">Checked By:</span>{' '}
          <span className="font-bold text-slate-900">{staffName || '__________________'}</span>
        </div>
        <div>
          <span className="text-slate-500 font-semibold">Audit Status:</span>{' '}
          <span className="font-bold text-slate-900">PHYSICAL AUDIT</span>
        </div>
      </div>
    </div>
  );

  // Reusable Shift Content Renderer
  const renderShiftChecklist = (shiftData: ShiftData, shiftTitle: string, timing: string) => (
    <div className="shift-page print:break-after-page print:min-h-screen flex flex-col justify-between mb-8 print:mb-0 print:p-6 bg-white border border-slate-200 print:border-none rounded-xl print:rounded-none p-5 shadow-xs">
      <div>
        {renderPageHeader(shiftTitle, timing, shiftData.staffName)}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 print:grid-cols-2">
          {shiftData.categories.map((cat) => (
            <div key={cat.id} className="border border-slate-300 rounded p-2.5 print:break-inside-avoid bg-white">
              <div className="text-[11px] font-bold uppercase text-slate-900 bg-slate-100 px-2 py-1 rounded-xs border-b border-slate-300 mb-2 flex justify-between items-center">
                <span>{cat.title}</span>
                <span className="text-[9px] font-mono text-slate-500">{cat.items.length} items</span>
              </div>
              <div className="space-y-1">
                {cat.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-1.5 text-[10.5px] leading-tight text-slate-800">
                    <span className="font-mono text-slate-600 font-bold shrink-0">
                      {item.checked ? '[✓]' : '[  ]'}
                    </span>
                    <span className="flex-1">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Sign-off on each page */}
      <div className="mt-4 pt-3 border-t-2 border-slate-800 print:break-inside-avoid">
        <div className="grid grid-cols-3 gap-4 text-[10.5px] text-slate-800">
          <div>
            <div className="font-bold">Shift Staff Nurse In-Charge:</div>
            <div className="mt-4 text-slate-600">Name: {shiftData.staffName || '__________________'}</div>
            <div className="text-slate-600">Sign: __________________________</div>
          </div>
          <div>
            <div className="font-bold">Ward Sister / Quality Supervisor:</div>
            <div className="mt-4 text-slate-600">Name: __________________________</div>
            <div className="text-slate-600">Sign: __________________________</div>
          </div>
          <div>
            <div className="font-bold">Internal Audit Round Result:</div>
            <div className="mt-4 text-slate-600">[  ] Satisfactory  [  ] Deficiency</div>
            <div className="text-slate-600">Auditor Sign: ___________________</div>
          </div>
        </div>
        <div className="mt-2 text-[9px] text-slate-400 font-mono text-right">
          Ward 3B Internal Audit Checklist · Page Record · Hospital Quality Division
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs p-2 sm:p-6 flex justify-center">
      <div className="bg-slate-100 print:bg-white w-full max-w-5xl rounded-2xl shadow-2xl p-4 sm:p-8 text-slate-900 print:p-0 print:shadow-none print:w-full print:max-w-none">
        
        {/* CSS for print media layout */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            @page {
              size: A4 portrait;
              margin: 10mm 10mm 10mm 10mm;
            }
            body {
              background: white !important;
              color: black !important;
              font-size: 10pt;
            }
            .print\\:break-after-page {
              page-break-after: always !important;
              break-after: page !important;
            }
            .print\\:break-inside-avoid {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
            .print-hidden-scope {
              display: none !important;
            }
          }
        `}} />

        {/* Toolbar - hidden during actual printing */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-300 print:hidden gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Printer className="w-4 h-4 text-slate-700" />
              <span>Print Preview: Ward 3B Documentation</span>
            </h2>
            <p className="text-xs text-slate-500">
              Each shift and the handover matrix occupies its own clean page (A4 layout).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter scope buttons */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={() => setPrintScope('all')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  printScope === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All 4 Pages
              </button>
              <button
                onClick={() => setPrintScope('morning')}
                className={`px-2 py-1 rounded font-medium transition-colors ${
                  printScope === 'morning' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Morning
              </button>
              <button
                onClick={() => setPrintScope('evening')}
                className={`px-2 py-1 rounded font-medium transition-colors ${
                  printScope === 'evening' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Evening
              </button>
              <button
                onClick={() => setPrintScope('night')}
                className={`px-2 py-1 rounded font-medium transition-colors ${
                  printScope === 'night' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Night
              </button>
              <button
                onClick={() => setPrintScope('handover')}
                className={`px-2 py-1 rounded font-medium transition-colors ${
                  printScope === 'handover' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Handover Sheet
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Clean Pages</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Pages Container */}
        <div className="space-y-6 print:space-y-0 font-sans">
          
          {/* PAGE 1: MORNING SHIFT */}
          {(printScope === 'all' || printScope === 'morning') && (
            <div className={printScope !== 'all' && printScope !== 'morning' ? 'print-hidden-scope' : ''}>
              {renderShiftChecklist(morningData, 'Morning Shift', '08:00 AM – 02:00 PM')}
            </div>
          )}

          {/* PAGE 2: EVENING SHIFT */}
          {(printScope === 'all' || printScope === 'evening') && (
            <div className={printScope !== 'all' && printScope !== 'evening' ? 'print-hidden-scope' : ''}>
              {renderShiftChecklist(eveningData, 'Evening Shift', '02:00 PM – 08:00 PM')}
            </div>
          )}

          {/* PAGE 3: NIGHT SHIFT */}
          {(printScope === 'all' || printScope === 'night') && (
            <div className={printScope !== 'all' && printScope !== 'night' ? 'print-hidden-scope' : ''}>
              {renderShiftChecklist(nightData, 'Night Shift', '08:00 PM – 08:00 AM')}
            </div>
          )}

          {/* PAGE 4: 3-SHIFT HANDOVER MATRIX & DEFICIENCY LOG */}
          {(printScope === 'all' || printScope === 'handover') && (
            <div className={`handover-page print:break-after-page print:min-h-screen flex flex-col justify-between mb-8 print:mb-0 print:p-6 bg-white border border-slate-200 print:border-none rounded-xl print:rounded-none p-5 shadow-xs ${
              printScope !== 'all' && printScope !== 'handover' ? 'print-hidden-scope' : ''
            }`}>
              <div>
                {/* Header */}
                <div className="border-b-2 border-slate-900 pb-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-sm sm:text-base font-bold tracking-tight uppercase text-slate-900">
                        Hospital Quality & Patient Safety Accreditation Division
                      </h1>
                      <h2 className="text-xs sm:text-sm font-semibold text-slate-700">
                        WARD 3B – 3-SHIFT HANDOVER RECORD & DAILY DEFICIENCY LOG
                      </h2>
                    </div>
                    <div className="text-right text-[11px] font-mono text-slate-600">
                      <div className="font-bold text-slate-900">FORM W3B-HO-2026</div>
                      <div>Ward 3B Inpatient</div>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                    <div>Date: <span className="font-bold text-slate-900">{dateString}</span></div>
                    <div>Morning Handover: <span className="font-bold text-slate-900">02:00 PM (14:00)</span></div>
                    <div>Evening Handover: <span className="font-bold text-slate-900">08:00 PM (20:00)</span></div>
                    <div>Night Handover: <span className="font-bold text-slate-900">08:00 AM (08:00)</span></div>
                  </div>
                </div>

                {/* Section A: 3-Shift Handover Matrix */}
                <div className="mb-4">
                  <h3 className="text-xs font-bold uppercase text-slate-900 mb-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-900 inline-block"></span>
                    <span>1. Mandatory 3-Shift Bedside Handover (8 Core Parameters)</span>
                  </h3>
                  <table className="w-full text-left border-collapse border border-slate-400 text-[10.5px]">
                    <thead>
                      <tr className="bg-slate-100 font-bold border-b border-slate-400">
                        <th className="p-1.5 border border-slate-300 w-8 text-center">#</th>
                        <th className="p-1.5 border border-slate-300 min-w-[180px]">Handover Item</th>
                        <th className="p-1.5 border border-slate-300 text-center w-40 bg-sky-50/50">Morning → Evening (2:00 PM)</th>
                        <th className="p-1.5 border border-slate-300 text-center w-40 bg-amber-50/50">Evening → Night (8:00 PM)</th>
                        <th className="p-1.5 border border-slate-300 text-center w-40 bg-indigo-50/50">Night → Morning (8:00 AM)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {handoverPoints.map((p, idx) => (
                        <tr key={p.id} className="border-b border-slate-300">
                          <td className="p-1.5 border border-slate-300 text-center font-mono">{idx + 1}</td>
                          <td className="p-1.5 border border-slate-300 font-semibold">{p.title}</td>
                          <td className="p-1.5 border border-slate-300 text-center font-mono">
                            {p.morningToEvening.checked ? '[✓] Handed' : '[  ] Pending'}
                            {p.morningToEvening.notes && <div className="text-[9px] text-slate-600 font-sans mt-0.5">{p.morningToEvening.notes}</div>}
                          </td>
                          <td className="p-1.5 border border-slate-300 text-center font-mono">
                            {p.eveningToNight.checked ? '[✓] Handed' : '[  ] Pending'}
                            {p.eveningToNight.notes && <div className="text-[9px] text-slate-600 font-sans mt-0.5">{p.eveningToNight.notes}</div>}
                          </td>
                          <td className="p-1.5 border border-slate-300 text-center font-mono">
                            {p.nightToMorning.checked ? '[✓] Handed' : '[  ] Pending'}
                            {p.nightToMorning.notes && <div className="text-[9px] text-slate-600 font-sans mt-0.5">{p.nightToMorning.notes}</div>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Handover Nurse Signatures Matrix */}
                <div className="mb-4 border border-slate-300 rounded p-2 text-[10.5px] bg-slate-50/60">
                  <div className="grid grid-cols-3 gap-3 text-slate-800">
                    <div>
                      <div className="font-bold text-slate-900">Morning → Evening (14:00)</div>
                      <div className="text-[10px]">Relieving: {morningData.staffName || '_______________'}</div>
                      <div className="text-[10px]">Incoming: {eveningData.staffName || '_______________'}</div>
                      <div className="text-[10px]">Sign: ___________________</div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Evening → Night (20:00)</div>
                      <div className="text-[10px]">Relieving: {eveningData.staffName || '_______________'}</div>
                      <div className="text-[10px]">Incoming: {nightData.staffName || '_______________'}</div>
                      <div className="text-[10px]">Sign: ___________________</div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Night → Morning (08:00)</div>
                      <div className="text-[10px]">Relieving: {nightData.staffName || '_______________'}</div>
                      <div className="text-[10px]">Incoming: {morningData.staffName || '_______________'}</div>
                      <div className="text-[10px]">Sign: ___________________</div>
                    </div>
                  </div>
                </div>

                {/* Section B: Daily Audit Deficiency & Action Taken */}
                <div>
                  <h3 className="text-xs font-bold uppercase text-slate-900 mb-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-900 inline-block"></span>
                    <span>2. Daily Sign-off & Deficiency Action Log (CAPA)</span>
                  </h3>
                  <table className="w-full text-left border-collapse border border-slate-400 text-[10px]">
                    <thead>
                      <tr className="bg-slate-100 font-bold border-b border-slate-400">
                        <th className="p-1 border border-slate-300 w-24">Area</th>
                        <th className="p-1 border border-slate-300 w-16 text-center">Status</th>
                        <th className="p-1 border border-slate-300 min-w-[140px]">Deficiency Observed</th>
                        <th className="p-1 border border-slate-300 min-w-[140px]">Action Taken (CAPA)</th>
                        <th className="p-1 border border-slate-300 w-24">Responsible</th>
                        <th className="p-1 border border-slate-300 w-16 text-center">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deficiencyLog.map((d) => (
                        <tr key={d.id} className="border-b border-slate-300">
                          <td className="p-1 border border-slate-300 font-semibold">{d.area}</td>
                          <td className="p-1 border border-slate-300 text-center font-mono">
                            {d.status === 'OK' ? '[✓] OK' : '[!] ISSUE'}
                          </td>
                          <td className="p-1 border border-slate-300">{d.deficiency}</td>
                          <td className="p-1 border border-slate-300">{d.actionTaken}</td>
                          <td className="p-1 border border-slate-300">{d.responsible}</td>
                          <td className="p-1 border border-slate-300 text-center font-mono">{d.targetTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Final Accreditation Sign-off */}
              <div className="mt-4 pt-3 border-t-2 border-slate-800 print:break-inside-avoid">
                <div className="grid grid-cols-3 gap-4 text-[10.5px] text-slate-800">
                  <div>
                    <div className="font-bold">Ward Charge Nurse:</div>
                    <div className="mt-4">Name: ______________________</div>
                    <div>Sign: ______________________</div>
                  </div>
                  <div>
                    <div className="font-bold">Nursing Superintendent / Lead:</div>
                    <div className="mt-4">Name: ______________________</div>
                    <div>Sign: ______________________</div>
                  </div>
                  <div>
                    <div className="font-bold">Quality / Audit Officer:</div>
                    <div className="mt-4">Verification: [✓] APPROVED</div>
                    <div>Sign: ______________________</div>
                  </div>
                </div>
                <div className="mt-2 text-[9px] text-slate-400 font-mono text-right">
                  Ward 3B Handover & Sign-off · Page 4 · Hospital Quality Accreditation Record
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
