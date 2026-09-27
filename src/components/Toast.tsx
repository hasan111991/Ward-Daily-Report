import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';

export interface ToastData {
  status: 'loading' | 'success' | 'error';
  title: string;
  message?: string;
}

interface ToastProps {
  toast: ToastData | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast || toast.status === 'loading') return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.status === 'success';
  const isLoading = toast.status === 'loading';
  const isError = toast.status === 'error';

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-md w-[calc(100vw-2rem)] sm:w-auto transition-all animate-in fade-in slide-in-from-bottom-5">
      <div
        className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl shadow-2xl border backdrop-blur-md ${
          isSuccess
            ? 'bg-slate-900/95 text-white border-emerald-500/40 ring-1 ring-emerald-500/20'
            : isLoading
            ? 'bg-slate-900/95 text-white border-blue-500/40 ring-1 ring-blue-500/20'
            : 'bg-red-950/95 text-white border-red-500/40 ring-1 ring-red-500/20'
        }`}
      >
        <div className="shrink-0 mt-0.5">
          {isLoading && <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />}
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {isError && <AlertCircle className="w-5 h-5 text-red-400" />}
        </div>

        <div className="flex-1 min-w-0 pr-1">
          <p className="text-xs sm:text-sm font-semibold tracking-tight text-white flex items-center gap-1.5">
            {toast.title}
          </p>
          {toast.message && (
            <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5 leading-relaxed break-words font-mono">
              {toast.message}
            </p>
          )}
        </div>

        {!isLoading && (
          <button
            onClick={onClose}
            aria-label="Close notification"
            className="p-1 -mr-1 -mt-1 text-slate-400 hover:text-white rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
