import React, { useState, useEffect, useRef } from 'react';
import { 
  AlertOctagon, 
  MapPin, 
  PhoneCall, 
  AlertTriangle, 
  CheckCircle2, 
  Truck, 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Clock, 
  HeartPulse, 
  Navigation,
  Info,
  X,
  Send,
  ListOrdered
} from 'lucide-react';

export default function OneTapSOS({ onNavigateToFirstAid }) {
  // Input parameters for the emergency
  const [emergencyType, setEmergencyType] = useState('Cardiac Arrest (Suspected STEMI)');
  const [locationAddress, setLocationAddress] = useState('Metro Station Gate 4, Outer Ring Rd, Tech Corridor, Bengaluru');
  const [coordinates, setCoordinates] = useState('12.9716° N, 77.5946° E');
  const [accessNotes, setAccessNotes] = useState('Patient collapsed near ticket turnstile. Unconscious.');

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [sosStatus, setSosStatus] = useState('IDLE'); // 'IDLE', 'COUNTDOWN', 'DISPATCHED'
  const [countdown, setCountdown] = useState(3);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [etaSeconds, setEtaSeconds] = useState(240); // 4 minutes
  const [activeStage, setActiveStage] = useState(0);

  // Simulated notification timeline log
  const [notificationLogs, setNotificationLogs] = useState([]);

  const countdownTimerRef = useRef(null);
  const etaTimerRef = useRef(null);
  const audioCtxRef = useRef(null);

  const emergencyTypes = [
    'Cardiac Arrest (Suspected STEMI)',
    'Acute Stroke (F.A.S.T. Alert)',
    'Multi-Vehicle Highway Collision',
    'Severe Respiratory Distress / Anaphylaxis',
    'Traumatic Fall / Head & Spinal Injury',
    'Severe Arterial Hemorrhage / Bleeding'
  ];

  // Synthesized audio alert tone
  const playSirenBeep = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(750, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      console.log('Audio error', e);
    }
  };

  const addLog = (message, status = 'success') => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setNotificationLogs(prev => [{ time, message, status }, ...prev]);
  };

  const handleOpenConfirm = () => {
    setConfirmModalOpen(true);
  };

  const handleConfirmSOS = () => {
    setConfirmModalOpen(false);
    setSosStatus('COUNTDOWN');
    setCountdown(3);
    playSirenBeep();

    addLog(`Emergency alert initialized: ${emergencyType}`);

    countdownTimerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimerRef.current);
          triggerEmergencyDispatch();
          return 0;
        }
        playSirenBeep();
        return prev - 1;
      });
    }, 1000);
  };

  const handleCancelCountdown = () => {
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    setSosStatus('IDLE');
    setCountdown(3);
    addLog('Emergency alert aborted by operator during confirmation window.', 'aborted');
  };

  const triggerEmergencyDispatch = () => {
    setSosStatus('DISPATCHED');
    setActiveStage(1);
    setEtaSeconds(240);

    addLog(`GPS coordinates verified: ${coordinates} (${locationAddress})`);

    setTimeout(() => {
      setActiveStage(2);
      addLog('Dispatched urgent alert to Level-1 facility: Apex Trauma Center & Manipal ER');
    }, 1200);

    setTimeout(() => {
      setActiveStage(3);
      addLog('Assigned ALS-Ambulance #04 (Advanced Life Support) with telemetry stream');
    }, 2500);

    setTimeout(() => {
      setActiveStage(4);
      addLog('Queued emergency next-of-kin SMS with live encrypted tracking URL');
    }, 4000);

    setTimeout(() => {
      setActiveStage(5);
      addLog('Allocated Shock Trauma Bay 1; Stat interventional catheterization team notified');
    }, 5500);
  };

  const handleReset = () => {
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    if (etaTimerRef.current) clearInterval(etaTimerRef.current);
    setSosStatus('IDLE');
    setCountdown(3);
    setActiveStage(0);
    setEtaSeconds(240);
    setNotificationLogs([]);
  };

  useEffect(() => {
    if (sosStatus === 'DISPATCHED') {
      etaTimerRef.current = setInterval(() => {
        setEtaSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (etaTimerRef.current) clearInterval(etaTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, [sosStatus]);

  const formatEta = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const stages = [
    { title: "GPS Geolocation Locked", desc: `Coordinates ${coordinates} verified (${locationAddress})` },
    { title: "Regional Trauma Facilities Notified", desc: "Apex Central Trauma and Aster Emergency Resuscitation Center alerted" },
    { title: "ALS-Ambulance #04 Dispatched", desc: "Advanced Life Support unit assigned with active in-transit telemetry stream" },
    { title: "Emergency Next-of-Kin SMS Broadcast", desc: "Automated alert with live encrypted tracking link sent to primary emergency contact" },
    { title: "Hospital Shock Bay 1 Pre-Allocated", desc: "Trauma team placed on pre-arrival standby with stat blood bank reserve" }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 bg-red-100 text-red-700 rounded">
              <AlertOctagon className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-700">
              Emergency Dispatch & Incident Response
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Emergency Response & Incident Dispatch
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Rapid incident trigger pipeline linking citizen distress signals to trauma center coordination.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-colors ${
              soundEnabled
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-600" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
            <span>Alert Tone: {soundEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {sosStatus !== 'IDLE' && (
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Console
            </button>
          )}
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-start gap-2">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-800">Operational Disclaimer:</strong> This console is a simulation environment for testing dispatch coordination, bystander guidance, and telemetry handoff. It does not place live emergency calls to government 108/911 networks.
        </p>
      </div>

      {/* Main Trigger Configuration Grid */}
      {sosStatus === 'IDLE' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Incident Parameters Configuration */}
          <div className="lg:col-span-7 bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
              1. Incident Details & Location Parameters
            </h3>

            {/* Emergency Type Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Emergency Incident Category
              </label>
              <select
                value={emergencyType}
                onChange={(e) => setEmergencyType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
              >
                {emergencyTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Location Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Incident Location & Street Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-4 h-4 text-teal-600" />
                </div>
                <input
                  type="text"
                  value={locationAddress}
                  onChange={(e) => setLocationAddress(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>
            </div>

            {/* GPS Coordinates Override */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  GPS Coordinates (Lat / Long)
                </label>
                <input
                  type="text"
                  value={coordinates}
                  onChange={(e) => setCoordinates(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono text-slate-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Accuracy Fix
                </label>
                <input
                  type="text"
                  readOnly
                  value="± 3.2 meters (High Precision)"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-600"
                />
              </div>
            </div>

            {/* Access notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                On-Site Access / Scene Notes
              </label>
              <textarea
                rows={2}
                value={accessNotes}
                onChange={(e) => setAccessNotes(e.target.value)}
                placeholder="e.g. Near main gate, security guard at site..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* Right Column: Trigger Button */}
          <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between text-center space-y-4">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                2. Immediate Dispatch Trigger
              </span>
              <p className="text-xs text-slate-400 mt-1">
                A verification dialog will appear before initiating dispatch.
              </p>
            </div>

            <div className="py-4 flex justify-center">
              <button
                type="button"
                onClick={handleOpenConfirm}
                className="w-40 h-40 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg flex flex-col items-center justify-center gap-1 transition-all transform active:scale-95 border-4 border-red-100 cursor-pointer"
              >
                <AlertOctagon className="w-10 h-10 text-white" />
                <span className="text-xl font-bold tracking-wider">
                  INITIATE SOS
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-red-100 bg-red-800/40 px-2 py-0.5 rounded-full">
                  One-Tap Trigger
                </span>
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-left text-xs text-slate-500 space-y-1">
              <span className="font-semibold text-slate-700 block">Automated Dispatch Sequence:</span>
              <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                <li>Transmits verified GPS fix and scene notes to ER bay</li>
                <li>Assigns ALS-Ambulance #04 with telemetry stream</li>
                <li>Sends family SMS alert with encrypted live tracking link</li>
              </ul>
            </div>
          </div>

        </div>
      )}

      {/* CONFIRMATION MODAL */}
      {confirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full border border-slate-200 overflow-hidden">
            <div className="bg-red-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-white" />
                <h3 className="font-bold text-sm">Confirm Emergency Alert Dispatch</h3>
              </div>
              <button onClick={() => setConfirmModalOpen(false)} className="text-red-200 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs text-slate-700">
              <p className="leading-relaxed">
                You are about to simulate broadcasting a high-priority distress signal with the following incident configuration:
              </p>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5 font-medium">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Incident Category</span>
                  <span className="font-bold text-red-700">{emergencyType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Location</span>
                  <span className="text-slate-900">{locationAddress}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">GPS Coordinates</span>
                  <span className="font-mono text-slate-800">{coordinates}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setConfirmModalOpen(false)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSOS}
                  className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Confirm & Dispatch Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COUNTDOWN ARMED STATE */}
      {sosStatus === 'COUNTDOWN' && (
        <div className="bg-red-50 rounded-xl p-8 border-2 border-red-300 text-center shadow-sm space-y-4">
          <div className="max-w-md mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold">
              <AlertTriangle className="w-3.5 h-3.5" />
              BROADCASTING EMERGENCY DISTRESS PACKET
            </span>
            <div className="text-6xl font-black text-red-700 my-2 font-mono">
              {countdown}
            </div>
            <p className="text-xs font-semibold text-red-900">
              Broadcasting distress signal in {countdown} seconds. Tap cancel if triggered accidentally.
            </p>
            <div>
              <button
                onClick={handleCancelCountdown}
                className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm transition"
              >
                Cancel Alert Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DISPATCHED STATE */}
      {sosStatus === 'DISPATCHED' && (
        <div className="space-y-6">
          
          {/* Dispatch Banner */}
          <div className="bg-slate-900 text-white rounded-xl p-6 shadow-sm border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[11px] font-bold bg-red-600/30 text-red-400 border border-red-500/40">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                SIMULATED DISPATCH ACTIVE
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white">
                ALS-Ambulance #04 En Route
              </h3>
              <p className="text-xs text-slate-300 max-w-lg">
                Incident: <strong>{emergencyType}</strong> at {locationAddress}. Bidirectional telemetry link established with Apex Central Trauma Bay.
              </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 px-5 py-3 rounded-xl text-center shrink-0">
              <span className="text-[11px] font-medium text-slate-400 block mb-0.5">Estimated Time of Arrival</span>
              <div className="text-3xl font-black text-white font-mono">
                {formatEta(etaSeconds)}
              </div>
              <span className="text-[11px] text-teal-400 font-medium block mt-0.5">
                ALS Unit 04 • 1.4 km
              </span>
            </div>
          </div>

          {/* Two-Column Grid: 5-Stage Checklist & Chronological Notification Logs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* 5-Stage Orchestration Checklist */}
            <div className="lg:col-span-7 bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-teal-600" />
                  Dispatch Orchestration Pipeline
                </h3>
                <span className="text-xs font-semibold text-slate-600">
                  Stage {Math.min(activeStage, 5)} of 5 Completed
                </span>
              </div>

              <div className="space-y-2.5">
                {stages.map((stage, idx) => {
                  const stageNum = idx + 1;
                  const isComplete = activeStage >= stageNum;
                  const isCurrent = activeStage === stageNum;

                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border transition-colors flex items-start gap-3 ${
                        isComplete
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : isCurrent
                          ? 'bg-amber-50/60 border-amber-300'
                          : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {isComplete ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center font-bold text-[10px]">
                            {stageNum}
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-xs font-bold ${isComplete ? 'text-slate-900' : 'text-slate-500'}`}>
                            {stage.title}
                          </h4>
                          <span className="text-[10px] font-semibold">
                            {isComplete ? (
                              <span className="text-emerald-700">Verified</span>
                            ) : isCurrent ? (
                              <span className="text-amber-700 font-bold">Processing...</span>
                            ) : (
                              <span className="text-slate-400">Pending</span>
                            )}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {stage.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Notification Logs Feed */}
            <div className="lg:col-span-5 bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <ListOrdered className="w-4 h-4 text-teal-600" />
                    Simulated Notification Audit Log
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">Live Stream</span>
                </div>

                <div className="space-y-2 mt-2 max-h-60 overflow-y-auto pr-1">
                  {notificationLogs.length > 0 ? (
                    notificationLogs.map((log, i) => (
                      <div key={i} className="p-2 rounded bg-slate-50 border border-slate-200 text-xs">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                          <span>{log.time}</span>
                          <span className={log.status === 'aborted' ? 'text-red-600' : 'text-teal-700 font-semibold'}>
                            {log.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-slate-700 font-medium mt-0.5 text-[11px] leading-tight">
                          {log.message}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 py-4 text-center">No logs generated yet.</p>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Need resuscitation guidance?</span>
                <button
                  onClick={onNavigateToFirstAid}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition"
                >
                  Open First-Aid Guide
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
