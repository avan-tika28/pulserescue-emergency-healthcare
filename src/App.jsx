import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DisclaimerBanner from './components/DisclaimerBanner';
import LoginPage from './components/LoginPage';
import LogoutConfirmationModal from './components/LogoutConfirmationModal';
import HomeDashboard from './components/HomeDashboard';
import PatientRegistration from './components/PatientRegistration';
import OneTapSOS from './components/OneTapSOS';
import DigitalHealthPassport from './components/DigitalHealthPassport';
import AIRiskAssessment from './components/AIRiskAssessment';
import MedicalReportAnalyzer from './components/MedicalReportAnalyzer';
import FirstAidGuidance from './components/FirstAidGuidance';
import DoctorDashboard from './components/DoctorDashboard';
import { HeartPulse, ShieldCheck, Activity } from 'lucide-react';

const PROTECTED_TABS = [
  'overview',
  'patients',
  'emergency',
  'passport',
  'risk-assessment',
  'reports',
  'first-aid',
  'clinical'
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('pulserescue_auth') === 'true';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('pulserescue_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      name: 'Dr. Sarah Mitchell, MD',
      role: 'Emergency Medicine Attending',
      email: 'dr.mitchell@pulserescue-health.org',
      hospitalId: 'MD-9042',
      facility: 'Apex Trauma & Resuscitation Center',
      department: 'Shock Trauma Bay 1'
    };
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [newlyRegisteredPatient, setNewlyRegisteredPatient] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [sessionNotice, setSessionNotice] = useState('');

  // Handle URL hash routing and route protection
  useEffect(() => {
    const syncRouteFromHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').trim();

      // If user is NOT authenticated: Block access to protected routes
      if (!isAuthenticated) {
        if (hash && hash !== 'login') {
          console.warn(`[PulseRescue Security] Unauthenticated attempt to access protected route: #${hash}. Redirecting to login.`);
          setSessionNotice(`Access Restricted: Please log in to view protected route (#${hash}).`);
          window.location.hash = '#login';
        }
        return;
      }

      // If user IS authenticated:
      if (PROTECTED_TABS.includes(hash)) {
        setActiveTab(hash);
      } else if (hash === 'login' || !hash) {
        // Authenticated user arriving at #login or root hash gets directed to overview
        window.location.hash = '#overview';
        setActiveTab('overview');
      }
    };

    syncRouteFromHash();
    window.addEventListener('hashchange', syncRouteFromHash);
    return () => window.removeEventListener('hashchange', syncRouteFromHash);
  }, [isAuthenticated]);

  // Sync window hash when activeTab changes while authenticated
  useEffect(() => {
    if (isAuthenticated) {
      if (window.location.hash !== `#${activeTab}`) {
        window.location.hash = `#${activeTab}`;
      }
    }
  }, [activeTab, isAuthenticated]);

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
    localStorage.setItem('pulserescue_auth', 'true');
    localStorage.setItem('pulserescue_user', JSON.stringify(userData));
    setSessionNotice('');
    setActiveTab('overview');
    window.location.hash = '#overview';
  };

  // Trigger confirmation modal (Requirement 3: When clicked, display a confirmation modal)
  const handleRequestLogout = () => {
    setIsLogoutModalOpen(true);
  };

  // Requirement 7: Cancel closes confirmation modal without logging the user out
  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  // Requirement 4, 5, 6, 8: Confirm logout clears session, preserves patient data, redirects to login
  const handleConfirmLogout = () => {
    // 1. Close modal
    setIsLogoutModalOpen(false);

    // 2. Clear authentication state
    setIsAuthenticated(false);

    // 3. Clear only authentication and session credentials
    // IMPORTANT: pulserescue_patients and local patient databases are explicitly NOT deleted!
    localStorage.removeItem('pulserescue_auth');
    localStorage.removeItem('pulserescue_user');
    sessionStorage.clear();

    // 4. Set feedback notice and redirect URL hash to login
    setSessionNotice('You have successfully logged out. Clinical session terminated.');
    window.location.hash = '#login';
  };

  const handlePatientRegistered = (patientData, shouldNavigateToPassport = false) => {
    setNewlyRegisteredPatient(patientData);
    if (shouldNavigateToPassport) {
      setActiveTab('passport');
    }
  };

  // If user is unauthenticated, show professional enterprise Login Page
  // Protected pages cannot be rendered or reached
  if (!isAuthenticated) {
    return (
      <LoginPage 
        onLoginSuccess={handleLoginSuccess}
        sessionNotice={sessionNotice}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-teal-600 selection:text-white">
      
      {/* Compliance & Simulation Sandbox Notice */}
      <DisclaimerBanner />

      {/* Main Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentUser={currentUser}
        onLogout={handleRequestLogout}
      />

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
        currentUser={currentUser}
      />

      {/* Main Clinical Console Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'overview' && (
          <HomeDashboard setActiveTab={setActiveTab} />
        )}

        {activeTab === 'patients' && (
          <PatientRegistration onPatientRegistered={handlePatientRegistered} />
        )}

        {activeTab === 'emergency' && (
          <OneTapSOS onNavigateToFirstAid={() => setActiveTab('first-aid')} />
        )}

        {activeTab === 'passport' && (
          <DigitalHealthPassport newlyRegisteredPatient={newlyRegisteredPatient} />
        )}

        {activeTab === 'risk-assessment' && (
          <AIRiskAssessment onSendToQueue={() => setActiveTab('clinical')} />
        )}

        {activeTab === 'reports' && (
          <MedicalReportAnalyzer />
        )}

        {activeTab === 'first-aid' && (
          <FirstAidGuidance />
        )}

        {activeTab === 'clinical' && (
          <DoctorDashboard />
        )}
      </main>

      {/* Professional Healthcare SaaS Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
            
            {/* Brand */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-slate-900 flex items-center justify-center text-white">
                <HeartPulse className="w-4 h-4 text-teal-400" />
              </div>
              <div>
                <span className="font-bold text-slate-900 tracking-tight text-sm">
                  Pulse<span className="text-teal-600">Rescue</span>
                </span>
                <span className="text-slate-400 text-xs ml-2">
                  Emergency Healthcare Management Platform
                </span>
              </div>
            </div>

            {/* Quick module links */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
              <button onClick={() => setActiveTab('overview')} className="hover:text-teal-700 transition">
                Overview
              </button>
              <button onClick={() => setActiveTab('patients')} className="hover:text-teal-700 transition">
                Patients
              </button>
              <button onClick={() => setActiveTab('emergency')} className="hover:text-red-700 transition text-red-700">
                Emergency Response
              </button>
              <button onClick={() => setActiveTab('risk-assessment')} className="hover:text-teal-700 transition">
                Triage Risk Engine
              </button>
              <button onClick={() => setActiveTab('first-aid')} className="hover:text-teal-700 transition">
                Multilingual First-Aid
              </button>
              <button onClick={() => setActiveTab('clinical')} className="hover:text-teal-700 transition">
                Clinical Console
              </button>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
            <p>
              PulseRescue Operations Console • Clinical Software Sandbox Environment.
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                HIPAA & Emergency Protocol Data Simulation
              </span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
