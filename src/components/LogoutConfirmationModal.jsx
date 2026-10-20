import React, { useEffect } from 'react';
import { LogOut, AlertTriangle, ShieldCheck, X } from 'lucide-react';

export default function LogoutConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  currentUser
}) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const userDisplayName = currentUser?.name || 'Authorized Clinician';
  const userRole = currentUser?.role || 'Emergency Healthcare Specialist';
  const userFacility = currentUser?.facility || 'Apex Trauma & Resuscitation Center';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
      onClick={(e) => {
        // Close if clicked directly on backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden transform transition-all animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with warning accent */}
        <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shrink-0">
              <LogOut className="w-5 h-5" />
            </div>
            <div>
              <h3 id="logout-modal-title" className="text-base font-bold text-slate-900">
                Confirm Sign Out
              </h3>
              <p className="text-xs text-slate-500">
                Emergency Healthcare Management Console
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <div className="space-y-1.5">
            <p className="text-sm font-semibold text-slate-800">
              Are you sure you want to log out?
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              You are currently signed in as <span className="font-semibold text-slate-900">{userDisplayName}</span> ({userRole}) at <span className="text-slate-700">{userFacility}</span>.
            </p>
          </div>

          {/* Active Session Info Box */}
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 flex items-start gap-3 text-xs text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">Clinical Session Notice</p>
              <p className="text-[11px] text-amber-800 leading-normal">
                Logging out will clear your session credentials and lock access to the triage console, patient records, and emergency dispatch.
              </p>
            </div>
          </div>

          {/* Data Preservation Assurance */}
          <div className="bg-teal-50/70 border border-teal-200/70 rounded-xl p-3 flex items-start gap-2.5 text-xs text-teal-900">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-teal-800 leading-normal">
              <strong className="font-semibold">Data Safe:</strong> Registered patient records and local emergency audit logs will remain preserved in your workspace.
            </p>
          </div>

          {/* Authentication Transparency Note */}
          <p className="text-[10px] text-slate-400 italic">
            Note: This system currently operates with a simulated frontend authentication session. Production enterprise deployments require integration with an OAuth2/SAML identity provider.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="bg-slate-50 border-t border-slate-100 px-6 py-3.5 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 text-xs font-semibold transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-semibold shadow-xs transition flex items-center gap-1.5 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
