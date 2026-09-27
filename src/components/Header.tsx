import React from 'react';
import { FileSpreadsheet, Printer, ShieldCheck, Loader2, Cloud, CloudOff, AlertCircle } from 'lucide-react';

export type SyncStatus = 'synced' | 'saving' | 'offline' | 'error';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onDownloadExcel: () => void;
  onOpenPrint: () => void;
  completedPercent: number;
  isExporting?: boolean;
  syncStatus?: SyncStatus;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onDownloadExcel,
  onOpenPrint,
  completedPercent,
  isExporting = false,
  syncStatus = 'synced'
}) => {
  const navTabs = [
    { id: 'shifts', label: 'Shift Checklists' },
    { id: 'handover', label: '3-Shift Handover' },
    { id: 'deficiencies', label: 'Deficiencies & Sign-off' },
    { id: 'patientAudit', label: '5-Patient Sample' },
    { id: 'masterAudit', label: 'Master 10 Areas' },
    { id: 'staffQuiz', label: 'Staff Viva' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-7 h-7 sm:w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-xs">
            <ShieldCheck className="w-4 h-4 sm:w-5 h-5" />
          </div>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setActiveTab('shifts'); }}
            className="text-sm sm:text-base lg:text-lg font-bold tracking-tight text-slate-900 truncate"
          >
            Ward 3B Audit & Handover
          </a>
        </div>

        {/* Zone 2: Desktop navigation links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary actions (responsive on mobile) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Cloud Sync Status Indicator */}
          <div
            title={
              syncStatus === 'synced'
                ? 'Backend Database: Connected & Saved to Firebase Firestore'
                : syncStatus === 'saving'
                ? 'Saving changes to Firebase Cloud Database...'
                : syncStatus === 'offline'
                ? 'Running offline (saved in local device storage)'
                : 'Connection issue (retrying)'
            }
            className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
              syncStatus === 'synced'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : syncStatus === 'saving'
                ? 'bg-sky-50 text-sky-700 border-sky-200 animate-pulse'
                : syncStatus === 'offline'
                ? 'bg-slate-100 text-slate-600 border-slate-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}
          >
            {syncStatus === 'synced' && (
              <>
                <Cloud className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cloud Saved</span>
              </>
            )}
            {syncStatus === 'saving' && (
              <>
                <Loader2 className="w-3.5 h-3.5 text-sky-600 animate-spin" />
                <span>Saving...</span>
              </>
            )}
            {syncStatus === 'offline' && (
              <>
                <CloudOff className="w-3.5 h-3.5 text-slate-500" />
                <span>Offline</span>
              </>
            )}
            {syncStatus === 'error' && (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Sync Retry</span>
              </>
            )}
          </div>

          <button
            onClick={onOpenPrint}
            title="Print hard copy for ward clipboard"
            className="inline-flex items-center justify-center gap-1.5 p-2 sm:px-3 sm:py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 border border-slate-200 rounded-lg transition-colors whitespace-nowrap min-h-[36px]"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Print Blank / Copy</span>
          </button>

          <button
            onClick={onDownloadExcel}
            disabled={isExporting}
            className={`inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs rounded-lg transition-all whitespace-nowrap min-h-[36px] ${
              isExporting
                ? 'bg-emerald-700 opacity-90 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800'
            }`}
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 text-emerald-100 animate-spin" />
                <span className="hidden sm:inline">Generating...</span>
                <span className="sm:hidden font-bold">...</span>
              </>
            ) : (
              <>
                <FileSpreadsheet className="w-4 h-4 text-emerald-100" />
                <span className="hidden sm:inline">Download Excel (.xlsx)</span>
                <span className="sm:hidden font-bold">Excel</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav bar with smooth horizontal scroll and touch-friendly targets */}
      <div className="lg:hidden overflow-x-auto border-t border-slate-100 bg-slate-50/95 scrollbar-none px-3 py-1.5">
        <div className="flex items-center gap-1.5 min-w-max">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors min-h-[36px] flex items-center ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
