import React, { useState, useEffect } from 'react';
import { ShiftType, ShiftData, HandoverPoint, DeficiencyLogEntry, PatientAuditItem } from './types';
import {
  MORNING_SHIFT_CATEGORIES,
  EVENING_SHIFT_CATEGORIES,
  NIGHT_SHIFT_CATEGORIES,
  INITIAL_HANDOVER_POINTS,
  INITIAL_DEFICIENCY_LOG,
  INITIAL_PATIENT_AUDIT,
  RED_FLAG_ITEMS
} from './data/checklistData';
import { Header } from './components/Header';
import { RedFlagBanner } from './components/RedFlagBanner';
import { ShiftChecklist } from './components/ShiftChecklist';
import { HandoverSheet } from './components/HandoverSheet';
import { DeficiencyTracker } from './components/DeficiencyTracker';
import { PatientAuditModal } from './components/PatientAuditModal';
import { MasterAuditChecklist } from './components/MasterAuditChecklist';
import { StaffReadinessModal } from './components/StaffReadinessModal';
import { PrintView } from './components/PrintView';
import { exportWardAuditExcel } from './utils/excelExport';
import { FileSpreadsheet, Download, RefreshCw, CheckCircle2, ShieldCheck, AlertCircle, FileText } from 'lucide-react';

function safeGetStorage<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return fallback;
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function safeSetStorage(key: string, value: any): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch {
    // Ignore storage quota or security errors
  }
}

export default function App() {
  const todayStr = new Date().toISOString().split('T')[0];

  // Navigation tab
  const [activeTab, setActiveTab] = useState<string>('shifts');
  const [currentShift, setCurrentShift] = useState<ShiftType>('morning');
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  // Red flag states
  const [verifiedFlags, setVerifiedFlags] = useState<Record<string, boolean>>(() => {
    return safeGetStorage('ward3b_redflags', {});
  });

  // Morning Shift Data
  const [morningData, setMorningData] = useState<ShiftData>(() => {
    return safeGetStorage('ward3b_morning', {
      shift: 'morning',
      date: todayStr,
      staffName: '',
      timeChecked: '08:30 AM',
      signature: '',
      verified: false,
      categories: MORNING_SHIFT_CATEGORIES
    });
  });

  // Evening Shift Data
  const [eveningData, setEveningData] = useState<ShiftData>(() => {
    return safeGetStorage('ward3b_evening', {
      shift: 'evening',
      date: todayStr,
      staffName: '',
      timeChecked: '02:30 PM',
      signature: '',
      verified: false,
      categories: EVENING_SHIFT_CATEGORIES
    });
  });

  // Night Shift Data
  const [nightData, setNightData] = useState<ShiftData>(() => {
    return safeGetStorage('ward3b_night', {
      shift: 'night',
      date: todayStr,
      staffName: '',
      timeChecked: '08:30 PM',
      signature: '',
      verified: false,
      categories: NIGHT_SHIFT_CATEGORIES
    });
  });

  // Handover points
  const [handoverPoints, setHandoverPoints] = useState<HandoverPoint[]>(() => {
    return safeGetStorage('ward3b_handover', INITIAL_HANDOVER_POINTS);
  });

  // Deficiencies
  const [deficiencies, setDeficiencies] = useState<DeficiencyLogEntry[]>(() => {
    return safeGetStorage('ward3b_deficiencies', INITIAL_DEFICIENCY_LOG);
  });

  // 5-Patient audit
  const [patientList, setPatientList] = useState<PatientAuditItem[]>(() => {
    return safeGetStorage('ward3b_patient_audit', INITIAL_PATIENT_AUDIT);
  });

  // Final sign-off
  const [wardReady, setWardReady] = useState<boolean>(true);
  const [finalCheckedBy, setFinalCheckedBy] = useState<string>('Sister In-Charge / Quality Lead');

  // Sync to localStorage safely
  useEffect(() => {
    safeSetStorage('ward3b_redflags', verifiedFlags);
  }, [verifiedFlags]);

  useEffect(() => {
    safeSetStorage('ward3b_morning', morningData);
  }, [morningData]);

  useEffect(() => {
    safeSetStorage('ward3b_evening', eveningData);
  }, [eveningData]);

  useEffect(() => {
    safeSetStorage('ward3b_night', nightData);
  }, [nightData]);

  useEffect(() => {
    safeSetStorage('ward3b_handover', handoverPoints);
  }, [handoverPoints]);

  useEffect(() => {
    safeSetStorage('ward3b_deficiencies', deficiencies);
  }, [deficiencies]);

  useEffect(() => {
    safeSetStorage('ward3b_patient_audit', patientList);
  }, [patientList]);

  // Overall compliance percent calculation
  let totalChecked = 0;
  let totalAuditItems = 0;

  [morningData, eveningData, nightData].forEach(shift => {
    shift.categories.forEach(cat => {
      cat.items.forEach(item => {
        totalAuditItems++;
        if (item.checked) totalChecked++;
      });
    });
  });

  const overallPercent = totalAuditItems > 0 ? Math.round((totalChecked / totalAuditItems) * 100) : 0;

  const handleDownloadExcel = () => {
    exportWardAuditExcel({
      morningData,
      eveningData,
      nightData,
      handoverPoints,
      deficiencyLog: deficiencies,
      patientAuditList: patientList,
      dateString: morningData.date || todayStr
    });
  };

  const handleToggleRedFlag = (id: string) => {
    setVerifiedFlags(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleFlagDeficiencyToLog = (item: any) => {
    const newEntry: DeficiencyLogEntry = {
      id: `def-${Date.now()}`,
      area: `${currentShift.toUpperCase()} Shift - ${item.category}`,
      status: 'Issue',
      deficiency: item.deficiencyNote || item.text,
      actionTaken: 'Flagged during shift checklist; corrective action in progress',
      responsible:
        currentShift === 'morning'
          ? morningData.staffName || 'Morning Staff'
          : currentShift === 'evening'
          ? eveningData.staffName || 'Evening Staff'
          : nightData.staffName || 'Night Staff',
      targetTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      resolved: false
    };
    setDeficiencies(prev => [newEntry, ...prev]);
  };

  const handleResetDay = () => {
    if (window.confirm('Reset all shift checklists and start a new audit day? This will uncheck shift items.')) {
      setMorningData({
        shift: 'morning',
        date: todayStr,
        staffName: '',
        timeChecked: '08:30 AM',
        signature: '',
        verified: false,
        categories: MORNING_SHIFT_CATEGORIES
      });
      setEveningData({
        shift: 'evening',
        date: todayStr,
        staffName: '',
        timeChecked: '02:30 PM',
        signature: '',
        verified: false,
        categories: EVENING_SHIFT_CATEGORIES
      });
      setNightData({
        shift: 'night',
        date: todayStr,
        staffName: '',
        timeChecked: '08:30 PM',
        signature: '',
        verified: false,
        categories: NIGHT_SHIFT_CATEGORIES
      });
      setHandoverPoints(INITIAL_HANDOVER_POINTS);
      setVerifiedFlags({});
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onDownloadExcel={handleDownloadExcel}
        onOpenPrint={() => setShowPrintModal(true)}
        completedPercent={overallPercent}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Banner with Direct Excel Download Callout */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-4 sm:p-6 shadow-md mb-6 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono tracking-wider uppercase text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/80">
                  Ward 3B Internal Audit & Quality System
                </span>
                <span className="text-[11px] font-mono text-slate-300">
                  Date: {morningData.date || todayStr}
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                Daily Shift Audit Checklists & 3-Shift Handover Matrix
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Separated checklists for <span className="text-emerald-300 font-semibold">Morning (8am – 2pm)</span>,{' '}
                <span className="text-amber-300 font-semibold">Evening (2pm – 8pm)</span>, and{' '}
                <span className="text-indigo-300 font-semibold">Night (8pm – 8am)</span> shifts with 8-point mandatory bedside handover, deficiency resolution, and multi-sheet Excel generator.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleDownloadExcel}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-xl shadow-md transition-all whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>Download Excel File (.xlsx)</span>
              </button>

              <button
                onClick={handleResetDay}
                title="Start a new daily audit record"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all whitespace-nowrap"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>New Day</span>
              </button>
            </div>
          </div>

          {/* Quick Sheet Manifest Chips */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
            <span className="font-semibold text-slate-400">Excel Workbook Sheets:</span>
            <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60 font-mono text-emerald-300">
              Sheet 1: Morning (8am-2pm)
            </span>
            <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60 font-mono text-amber-300">
              Sheet 2: Evening (2pm-8pm)
            </span>
            <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60 font-mono text-indigo-300">
              Sheet 3: Night (8pm-8am)
            </span>
            <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60 font-mono text-sky-300">
              Sheet 4: 3-Shift Handover
            </span>
            <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60 font-mono text-slate-300">
              Sheet 5: Master Audit (10 Areas)
            </span>
            <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60 font-mono text-slate-300">
              Sheet 6: Deficiencies & Sign-off
            </span>
          </div>
        </div>

        {/* Priority Red-Flag Banner (Always Visible on Top) */}
        <RedFlagBanner
          verifiedFlags={verifiedFlags}
          onToggleFlag={handleToggleRedFlag}
        />

        {/* Tab View Content */}
        {activeTab === 'shifts' && (
          <ShiftChecklist
            currentShift={currentShift}
            onSelectShift={setCurrentShift}
            shiftData={
              currentShift === 'morning'
                ? morningData
                : currentShift === 'evening'
                ? eveningData
                : nightData
            }
            onUpdateShiftData={
              currentShift === 'morning'
                ? setMorningData
                : currentShift === 'evening'
                ? setEveningData
                : setNightData
            }
            onFlagDeficiencyToLog={handleFlagDeficiencyToLog}
          />
        )}

        {activeTab === 'handover' && (
          <HandoverSheet
            handoverPoints={handoverPoints}
            onUpdateHandoverPoints={setHandoverPoints}
            morningStaff={morningData.staffName}
            eveningStaff={eveningData.staffName}
            nightStaff={nightData.staffName}
          />
        )}

        {activeTab === 'deficiencies' && (
          <DeficiencyTracker
            deficiencies={deficiencies}
            onUpdateDeficiencies={setDeficiencies}
            wardReady={wardReady}
            onToggleWardReady={() => setWardReady(!wardReady)}
            finalCheckedBy={finalCheckedBy}
            onChangeFinalCheckedBy={setFinalCheckedBy}
          />
        )}

        {activeTab === 'patientAudit' && (
          <PatientAuditModal
            patientList={patientList}
            onUpdatePatientList={setPatientList}
          />
        )}

        {activeTab === 'masterAudit' && <MasterAuditChecklist />}

        {activeTab === 'staffQuiz' && <StaffReadinessModal />}
      </main>

      {/* Print View Modal */}
      {showPrintModal && (
        <PrintView
          onClose={() => setShowPrintModal(false)}
          morningData={morningData}
          eveningData={eveningData}
          nightData={nightData}
          handoverPoints={handoverPoints}
          deficiencyLog={deficiencies}
          dateString={morningData.date || todayStr}
        />
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            Ward 3B Internal Audit & Clinical Quality Compliance · Inpatient Nursing Division
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDownloadExcel}
              className="text-emerald-700 hover:text-emerald-900 font-semibold"
            >
              Export Excel (.xlsx)
            </button>
            <span>·</span>
            <button
              onClick={() => setShowPrintModal(true)}
              className="hover:text-slate-800"
            >
              Print Hard Copy
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
