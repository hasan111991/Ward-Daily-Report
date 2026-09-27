import React, { useState } from 'react';
import { STAFF_VIVA_QUESTIONS } from '../data/checklistData';
import { StaffQuestion } from '../types';
import { HelpCircle, CheckCircle2, ChevronDown, ChevronUp, UserCheck } from 'lucide-react';

export const StaffReadinessModal: React.FC = () => {
  const [questions, setQuestions] = useState<StaffQuestion[]>(STAFF_VIVA_QUESTIONS);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const toggleAnswer = (id: string) => {
    setRevealedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMarkPass = (id: string, passed: boolean) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, passed } : q))
    );
  };

  const handleStaffTestedChange = (id: string, staffName: string) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, staffTested: staffName } : q))
    );
  };

  const passedCount = questions.filter(q => q.passed === true).length;

  return (
    <div className="space-y-5">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">
                Staff Knowledge & Viva Readiness Spot-Check
              </h2>
              <span className="text-[11px] font-mono text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 font-semibold">
                {passedCount}/{questions.length} Staff Verified
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Ask on-duty nurses and junior doctors these random viva questions before the audit team arrives to confirm SOP familiarity.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {questions.map((q, idx) => {
          const isRevealed = !!revealedAnswers[q.id];

          return (
            <div
              key={q.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 leading-snug">
                        {q.question}
                      </h3>
                      <div className="text-[11px] font-mono text-slate-500 mt-1">
                        Ref: {q.sopReference}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleMarkPass(q.id, true)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                        q.passed === true
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                      }`}
                    >
                      Staff Knew
                    </button>
                    <button
                      onClick={() => handleMarkPass(q.id, false)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                        q.passed === false
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-800'
                      }`}
                    >
                      Gap / Retrain
                    </button>
                  </div>
                </div>

                {/* Staff Member Tested input */}
                <div className="mt-3 flex items-center gap-2 pt-2 border-t border-slate-100">
                  <label className="text-[11px] text-slate-500">Staff Tested:</label>
                  <input
                    type="text"
                    placeholder="e.g. Staff Nurse Maria"
                    value={q.staffTested || ''}
                    onChange={(e) => handleStaffTestedChange(q.id, e.target.value)}
                    className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-0.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 w-44"
                  />
                  <button
                    onClick={() => toggleAnswer(q.id)}
                    className="ml-auto text-xs text-indigo-700 hover:text-indigo-900 font-medium inline-flex items-center gap-1"
                  >
                    <span>{isRevealed ? 'Hide Model Answer' : 'Show Model Answer'}</span>
                    {isRevealed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Model Answer Dropdown */}
                {isRevealed && (
                  <div className="mt-2.5 p-3 rounded-lg bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-950">
                    <span className="font-bold text-indigo-900">Standard Audit Answer: </span>
                    {q.keyAnswer}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
