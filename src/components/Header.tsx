import React from 'react';
import { FileSpreadsheet, Printer, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onDownloadExcel: () => void;
  onOpenPrint: () => void;
  completedPercent: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onDownloadExcel,
  onOpenPrint,
  completedPercent
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setActiveTab('shifts'); }}
            className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap"
          >
            Ward 3B Audit & Handover
          </a>
        </div>

        {/* Zone 2: 4-6 text navigation links */}
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

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenPrint}
            title="Print hard copy for ward clipboard"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Print Blank / Copy</span>
          </button>

          <button
            onClick={onDownloadExcel}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-xs rounded-lg transition-all whitespace-nowrap"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-100" />
            <span>Download Excel (.xlsx)</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-slate-100 bg-slate-50/80 scrollbar-none text-xs">
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 rounded font-medium whitespace-nowrap ${
                isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
