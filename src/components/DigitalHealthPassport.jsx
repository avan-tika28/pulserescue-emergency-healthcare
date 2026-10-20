import React, { useState } from 'react';
import { 
  QrCode, 
  Heart, 
  AlertTriangle, 
  PhoneCall, 
  Printer, 
  Smartphone, 
  Copy, 
  Check, 
  Activity, 
  Zap, 
  CheckCircle2, 
  Lock,
  Eye,
  EyeOff,
  ShieldCheck
} from 'lucide-react';

export default function DigitalHealthPassport({ newlyRegisteredPatient }) {
  // Clinical profile options
  const demoProfiles = [
    ...(newlyRegisteredPatient ? [{
      id: newlyRegisteredPatient.healthId,
      name: newlyRegisteredPatient.fullName,
      age: newlyRegisteredPatient.age,
      gender: newlyRegisteredPatient.gender,
      bloodGroup: newlyRegisteredPatient.bloodGroup,
      allergies: newlyRegisteredPatient.allergies.split(',').map(s => s.trim()).filter(Boolean),
      conditions: newlyRegisteredPatient.chronicConditions.split(',').map(s => s.trim()).filter(Boolean),
      medications: newlyRegisteredPatient.medications.split(',').map(s => s.trim()).filter(Boolean),
      emergencyContact: newlyRegisteredPatient.emergencyContactName || 'Next of Kin',
      emergencyPhone: newlyRegisteredPatient.emergencyContactPhone || '+91 98450 67890',
      organDonor: newlyRegisteredPatient.organDonor,
      insurance: newlyRegisteredPatient.insuranceProvider || 'Premier Emergency Coverage'
    }] : []),
    {
      id: "PR-MED-8819",
      name: "Arun Krishnan",
      age: 58,
      gender: "Male",
      bloodGroup: "O+",
      allergies: ["Penicillin (Severe Anaphylaxis)", "Aspirin (Bronchospasm)"],
      conditions: ["Coronary Artery Disease", "Hypertension", "Hyperlipidemia"],
      medications: ["Atorvastatin 40mg", "Metoprolol 50mg", "Ramipril 5mg"],
      emergencyContact: "Sunita Krishnan (Wife)",
      emergencyPhone: "+91 98201 11223",
      organDonor: true,
      insurance: "Health Companion #POL-40291"
    },
    {
      id: "PR-MED-4421",
      name: "Sneha Mukherjee",
      age: 29,
      gender: "Female",
      bloodGroup: "B+",
      allergies: ["Sulfa Antibiotics", "NSAIDs"],
      conditions: ["Type 1 Diabetes (Insulin Dependent)"],
      medications: ["Insulin Glargine 22u bedtime", "Insulin Lispro with meals"],
      emergencyContact: "Subhash Mukherjee (Father)",
      emergencyPhone: "+91 94330 45678",
      organDonor: true,
      insurance: "Complete Medical Cover #POL-88712"
    },
    {
      id: "PR-MED-1904",
      name: "Robert D'Souza",
      age: 71,
      gender: "Male",
      bloodGroup: "A-",
      allergies: ["None Reported"],
      conditions: ["Atrial Fibrillation", "Previous TIA (2024)", "Chronic Kidney Disease Stage 2"],
      medications: ["Apixaban 5mg BID", "Amlodipine 5mg"],
      emergencyContact: "Grace D'Souza (Daughter)",
      emergencyPhone: "+91 97654 32109",
      organDonor: false,
      insurance: "Senior Citizens Care #POL-11203"
    }
  ];

  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [simulatedCallActive, setSimulatedCallActive] = useState(false);
  const [nfcScanning, setNfcScanning] = useState(false);
  const [privacyMasked, setPrivacyMasked] = useState(true);

  const patient = demoProfiles[selectedProfileIndex] || demoProfiles[0];

  const handleCopyId = () => {
    navigator.clipboard?.writeText(patient.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateCall = () => {
    setSimulatedCallActive(true);
    setTimeout(() => setSimulatedCallActive(false), 4000);
  };

  const handleSimulateNfc = () => {
    setNfcScanning(true);
    setTimeout(() => setNfcScanning(false), 2500);
  };

  const maskPhone = (phone) => {
    if (!privacyMasked) return phone;
    const parts = phone.split(' ');
    if (parts.length >= 3) {
      return `${parts[0]} ${parts[1]} •••••`;
    }
    return phone.slice(0, 8) + '••••';
  };

  const maskInsurance = (ins) => {
    if (!privacyMasked) return ins;
    return ins.replace(/#POL-\d+/, '#POL-•••••');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 bg-slate-100 text-slate-700 rounded">
              <QrCode className="w-4 h-4 text-teal-700" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
              Offline-Ready Medical Identity
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Digital Emergency Health Passport
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Paramedic and first-responder zero-PIN interface for critical blood type, allergy contraindications, and contacts.
          </p>
        </div>

        {/* Profile Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-medium text-slate-500">Record:</span>
          <select
            value={selectedProfileIndex}
            onChange={(e) => setSelectedProfileIndex(Number(e.target.value))}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
          >
            {demoProfiles.map((p, idx) => (
              <option key={p.id} value={idx}>
                {p.name} ({p.bloodGroup})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Operational Utility Bar with Privacy Safeguards */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 font-semibold text-[11px] border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Local Device Enclave Storage
          </span>
          
          <button
            onClick={() => setPrivacyMasked(!privacyMasked)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white text-slate-700 font-medium text-[11px] border border-slate-300 hover:bg-slate-100 transition"
          >
            {privacyMasked ? <EyeOff className="w-3 h-3 text-slate-500" /> : <Eye className="w-3 h-3 text-teal-600" />}
            <span>Privacy Safeguards: {privacyMasked ? 'MASKED' : 'UNMASKED'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateNfc}
            disabled={nfcScanning}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg flex items-center gap-1.5 transition text-xs"
          >
            <Smartphone className="w-3.5 h-3.5 text-teal-400" />
            <span>{nfcScanning ? 'Reading NFC Card...' : 'Simulate Paramedic NFC Tap'}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-medium rounded-lg border border-slate-300 flex items-center gap-1.5 transition text-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Emergency Card</span>
          </button>
        </div>
      </div>

      {nfcScanning && (
        <div className="p-3 bg-teal-50 border border-teal-300 rounded-lg text-center space-y-0.5">
          <p className="text-xs font-semibold text-teal-900 flex items-center justify-center gap-1.5">
            <Zap className="w-4 h-4 text-teal-600" />
            NFC Near-Field Signal Detected • Decrypting Patient Emergency Payload
          </p>
          <p className="text-[11px] text-teal-700">Immediate first-responder view decrypted without requiring phone unlock PIN.</p>
        </div>
      )}

      {/* Main Healthcare ID Card */}
      <div className="rounded-2xl bg-slate-900 text-white p-6 sm:p-7 shadow-sm border border-slate-800 relative">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase tracking-wider">
                Emergency Health Passport
              </span>
              <span className="text-xs text-slate-400 font-mono">PulseRescue Standard</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {patient.name}
            </h3>
            <div className="flex items-center gap-3 mt-1 text-xs text-slate-300 font-medium">
              <span>{patient.age} Yrs</span>
              <span>•</span>
              <span>{patient.gender}</span>
              <span>•</span>
              <button 
                onClick={handleCopyId}
                className="flex items-center gap-1 text-teal-400 hover:text-teal-300 underline font-mono text-[11px]"
              >
                ID: {patient.id}
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Blood Group Badge */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-red-600/20 border border-red-500/40 text-center min-w-[100px] shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-300 block">
              BLOOD GROUP
            </span>
            <span className="text-3xl font-black text-white font-mono leading-none mt-1 block">
              {patient.bloodGroup}
            </span>
            <span className="text-[9px] font-semibold text-red-300 mt-1 block uppercase">
              {patient.bloodGroup === 'O-' ? 'Universal Donor' : 'Standard Type'}
            </span>
          </div>
        </div>

        {/* Clinical Flags & Details */}
        <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-slate-800">
          
          <div className="md:col-span-8 space-y-4">
            {/* Allergies */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Critical Contraindicated Drug Allergies
              </div>
              <div className="flex flex-wrap gap-2">
                {patient.allergies && patient.allergies.length > 0 ? (
                  patient.allergies.map((allergy, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 rounded text-xs font-semibold bg-amber-500/20 text-amber-200 border border-amber-500/30 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      {allergy}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400">None reported</span>
                )}
              </div>
            </div>

            {/* Chronic Conditions */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-300 uppercase tracking-wider mb-1.5">
                <Activity className="w-3.5 h-3.5 text-teal-400" />
                Pre-Existing Chronic Conditions
              </div>
              <div className="flex flex-wrap gap-2">
                {patient.conditions && patient.conditions.length > 0 ? (
                  patient.conditions.map((cond, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 rounded text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700"
                    >
                      {cond}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400">None reported</span>
                )}
              </div>
            </div>

            {/* Active Medications */}
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Active Prescription Regimen:
              </span>
              <p className="text-xs text-slate-300 font-mono">
                {patient.medications && patient.medications.length > 0 ? patient.medications.join(', ') : 'None'}
              </p>
            </div>
          </div>

          {/* QR Code Matrix with Privacy Safeguard Indicator */}
          <div className="md:col-span-4 flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow-xs text-slate-900">
            <div className="w-32 h-32 bg-slate-50 border border-slate-300 p-2 rounded-lg flex items-center justify-center">
              <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                <rect x="5" y="5" width="25" height="25" rx="2" stroke="currentColor" strokeWidth="4" fill="none" />
                <rect x="11" y="11" width="13" height="13" fill="currentColor" />
                <rect x="70" y="5" width="25" height="25" rx="2" stroke="currentColor" strokeWidth="4" fill="none" />
                <rect x="76" y="11" width="13" height="13" fill="currentColor" />
                <rect x="5" y="70" width="25" height="25" rx="2" stroke="currentColor" strokeWidth="4" fill="none" />
                <rect x="11" y="76" width="13" height="13" fill="currentColor" />
                <rect x="36" y="8" width="6" height="6" />
                <rect x="46" y="8" width="6" height="6" />
                <rect x="56" y="14" width="6" height="6" />
                <rect x="36" y="22" width="6" height="6" />
                <rect x="48" y="24" width="6" height="6" />
                <rect x="8" y="38" width="6" height="6" />
                <rect x="18" y="44" width="6" height="6" />
                <rect x="36" y="38" width="8" height="8" />
                <rect x="48" y="40" width="6" height="6" />
                <rect x="60" y="38" width="8" height="8" />
                <rect x="76" y="40" width="6" height="6" />
                <rect x="86" y="46" width="6" height="6" />
                <rect x="38" y="56" width="6" height="6" />
                <rect x="50" y="54" width="6" height="6" />
                <rect x="64" y="58" width="6" height="6" />
                <rect x="38" y="72" width="6" height="6" />
                <rect x="48" y="78" width="8" height="8" />
                <rect x="62" y="74" width="6" height="6" />
                <rect x="78" y="72" width="8" height="8" />
                <rect x="86" y="84" width="6" height="6" />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-slate-800 mt-2">
              SCAN FOR EM-PROFILE
            </span>
            <span className="text-[9px] text-teal-700 font-mono font-semibold">
              {privacyMasked ? 'MASKED DEMO ENCRYPTION' : 'UNMASKED CLINICAL PAYLOAD'}
            </span>
          </div>

        </div>

        {/* Bottom Actions with Masked Data */}
        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={handleSimulateCall}
              className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold flex items-center gap-1.5 transition"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Speed-Dial: {patient.emergencyContact}</span>
            </button>
            <span className="font-mono text-slate-400">{maskPhone(patient.emergencyPhone)}</span>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            {patient.organDonor && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-300">
                <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                Organ Donor
              </span>
            )}
            <span className="text-[11px]">
              Coverage: {maskInsurance(patient.insurance)}
            </span>
          </div>
        </div>

      </div>

      {simulatedCallActive && (
        <div className="p-3 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 font-medium flex items-center justify-between">
          <span className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-teal-600" />
            Connecting outbound emergency call to {patient.emergencyContact} ({maskPhone(patient.emergencyPhone)})...
          </span>
          <span className="text-teal-700 font-mono text-[11px]">Active</span>
        </div>
      )}

    </div>
  );
}
