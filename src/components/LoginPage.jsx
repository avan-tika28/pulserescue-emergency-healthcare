import React, { useState } from 'react';
import { 
  HeartPulse, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Activity, 
  Radio, 
  Stethoscope, 
  KeyRound, 
  Info,
  X
} from 'lucide-react';

export default function LoginPage({ onLoginSuccess, sessionNotice }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStatus, setForgotStatus] = useState('');

  const demoAccounts = [
    {
      role: 'Emergency Medicine Attending',
      name: 'Dr. Sarah Mitchell, MD',
      email: 'dr.mitchell@pulserescue-health.org',
      hospitalId: 'MD-9042',
      department: 'Trauma Shock Resuscitation'
    },
    {
      role: 'Lead Triage Officer',
      name: 'Mark Davis, RN BSN',
      email: 'm.davis@pulserescue-health.org',
      hospitalId: 'RN-4410',
      department: 'Emergency Department Intake'
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your institutional email address.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address (e.g., clinician@hospital.org).');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your account password.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    // Simulate enterprise authentication network request
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: 'Dr. Sarah Mitchell, MD',
        role: 'Emergency Medicine Attending',
        email: email,
        hospitalId: 'MD-9042',
        facility: 'Apex Trauma & Resuscitation Center',
        department: 'Shock Trauma Bay 1'
      });
    }, 1200);
  };

  const handleDemoLogin = (account) => {
    setEmail(account.email);
    setPassword('PulseRescue2026!');
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: account.name,
        role: account.role,
        email: account.email,
        hospitalId: account.hospitalId,
        facility: 'Apex Trauma & Resuscitation Center',
        department: account.department
      });
    }, 800);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) {
      setForgotStatus('error');
      return;
    }
    setForgotStatus('success');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      
      {/* Enterprise Card Container */}
      <div className="max-w-5xl w-full bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        
        {/* Left Visual & Value Proposition Side (Navy/Slate Clinical Theme) */}
        <div className="lg:col-span-6 bg-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle Ambient Background */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Brand Identity */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm">
                <HeartPulse className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">
                  Pulse<span className="text-teal-400">Rescue</span>
                </span>
                <p className="text-[11px] text-slate-400 font-medium">
                  Emergency Healthcare Management Platform
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                CLINICAL PORTAL ACCESS
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                Unified Emergency Triage & Hospital Command Console
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Empowering frontline emergency physicians, triage nurses, and paramedic response teams with synchronized pre-arrival vitals and automated clinical pathways.
              </p>
            </div>
          </div>

          {/* Key Feature Highlights */}
          <div className="relative z-10 py-6 space-y-3.5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-800 text-teal-400 shrink-0 border border-slate-700">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Bidirectional Telemetry & Dispatch</h4>
                <p className="text-[11px] text-slate-400 leading-tight">Live pre-arrival ambulance vitals stream straight into trauma bays.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-800 text-teal-400 shrink-0 border border-slate-700">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Standardized Manchester & ESI Triage</h4>
                <p className="text-[11px] text-slate-400 leading-tight">Evidence-calibrated clinical risk scoring for incoming emergencies.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-800 text-teal-400 shrink-0 border border-slate-700">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Zero-PIN Offline Health Passports</h4>
                <p className="text-[11px] text-slate-400 leading-tight">First-responder access to critical blood types and drug allergies.</p>
              </div>
            </div>
          </div>

          {/* Bottom Security & Compliance Bar */}
          <div className="relative z-10 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-teal-400" />
              256-Bit TLS • HIPAA Compliant Architecture
            </span>
            <span className="text-slate-500">v2.4.0 Production</span>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between bg-white">
          
          <div>
            <div className="pb-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Clinician & Staff Sign In
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your hospital credentials or select a quick evaluation profile below.
              </p>
            </div>

            {/* Session / Redirect Notice */}
            {sessionNotice && (
              <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-lg text-xs text-teal-800 flex items-start gap-2.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span className="leading-tight">{sessionNotice}</span>
              </div>
            )}

            {/* Error Message Banner */}
            {errorMessage && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Main Login Form */}
            <form onSubmit={handleLogin} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Institutional Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="clinician@pulserescue-health.org"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600 transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(true)}
                    className="text-xs font-medium text-teal-700 hover:text-teal-900 transition"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-teal-600 border-slate-300 focus:ring-teal-500"
                  />
                  <span>Remember this workstation</span>
                </label>
                <span className="text-[11px] text-slate-400">Station #WS-204</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Verifying Clinical Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate & Access Console</span>
                    <ArrowRight className="w-4 h-4 text-teal-400" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Evaluation Accounts */}
            <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600 uppercase text-[10px] tracking-wider">
                  Quick Evaluation Demo Logins
                </span>
                <span className="text-[10px] text-slate-400">Click to autofill & log in</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {demoAccounts.map((account, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleDemoLogin(account)}
                    className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-teal-50 hover:border-teal-300 text-left transition group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-teal-900">
                        {account.name.split(',')[0]}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 font-bold">{account.hospitalId}</span>
                    </div>
                    <span className="text-[10px] text-teal-700 font-medium block mt-0.5">
                      {account.role}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Educational / Sandbox Notice */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400 flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <p className="leading-tight">
              <strong>Evaluation Sandbox:</strong> Demonstration environment with simulated session authorization. Production implementations require institutional SSO (SAML/OAuth2) and LDAP directory integration.
            </p>
          </div>

        </div>

      </div>

      {/* Forgot Password Demo Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full border border-slate-200 overflow-hidden">
            
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-teal-400" />
                <h3 className="font-bold text-sm text-white">Password Recovery Service</h3>
              </div>
              <button
                onClick={() => {
                  setForgotModalOpen(false);
                  setForgotStatus('');
                }}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              {forgotStatus === 'success' ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Reset Token Dispatched
                  </p>
                  <p className="text-[11px] text-emerald-700 leading-relaxed">
                    A secure authentication reset link has been dispatched to <strong>{forgotEmail}</strong>. Please verify with your institutional YubiKey/Authenticator.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-3">
                  <p className="text-slate-600 leading-relaxed">
                    Enter your registered clinical email. An encrypted self-service recovery token will be routed to your institution's verified directory.
                  </p>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Institutional Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="clinician@hospital.org"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                    />
                  </div>
                  {forgotStatus === 'error' && (
                    <p className="text-red-600 text-xs">Please provide a valid email address.</p>
                  )}
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setForgotModalOpen(false)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg text-xs"
                    >
                      Dispatch Reset Token
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
