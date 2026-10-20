import React, { useState, useEffect } from 'react';
import { 
  HeartPulse, 
  AlertOctagon, 
  Activity, 
  Clock, 
  Bed, 
  Truck, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  Users, 
  QrCode, 
  FileText, 
  LifeBuoy, 
  Stethoscope, 
  ChevronRight, 
  TrendingUp, 
  MapPin, 
  Calendar,
  Layers,
  BarChart3
} from 'lucide-react';
import { EMERGENCY_INCIDENTS, TRIAGE_PATIENTS, HOURLY_ADMISSION_TRENDS } from '../data/mockData';

export default function HomeDashboard({ setActiveTab }) {
  // Live clock display
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format date and time
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  // Calculate dynamic metrics directly from active operational data
  const totalActiveIncidents = EMERGENCY_INCIDENTS.length;
  const inboundAmbulances = EMERGENCY_INCIDENTS.filter(i => i.status !== 'ARRIVED_ER');
  const criticalIncidentsCount = EMERGENCY_INCIDENTS.filter(i => i.severity === 'CRITICAL' || i.esiLevel === 1).length;
  const criticalInBayCount = TRIAGE_PATIENTS.filter(p => p.esi === 1).length;
  const totalCriticalPriority = criticalIncidentsCount + criticalInBayCount;
  const activeTriageQueueCount = TRIAGE_PATIENTS.length;

  // Capacity calculations (sample operational capacity)
  const totalTraumaBays = 12;
  const occupiedTraumaBays = TRIAGE_PATIENTS.filter(p => p.assignedBay.toLowerCase().includes('bay')).length;
  const bayOccupancyRate = Math.round((occupiedTraumaBays / totalTraumaBays) * 100);

  const operationalModules = [
    {
      id: 'emergency',
      title: 'Emergency Response',
      desc: 'Simulate emergency panic triggers, GPS coordinate locking, and automated multi-agency dispatch workflows.',
      icon: AlertOctagon,
      actionLabel: 'Open Response Console',
      category: 'Dispatch & Alerting'
    },
    {
      id: 'patients',
      title: 'Patient Intake & Registration',
      desc: 'Record incoming emergency patients, capture life-saving flags, and generate encrypted Health IDs.',
      icon: Users,
      actionLabel: 'Register Patient',
      category: 'Admissions'
    },
    {
      id: 'passport',
      title: 'Digital Health Passport',
      desc: 'Access scannable emergency cards, critical blood types, anaphylaxis contraindications, and NFC credentials.',
      icon: QrCode,
      actionLabel: 'View Health Passports',
      category: 'Health Records'
    },
    {
      id: 'risk-assessment',
      title: 'Clinical Risk Assessment',
      desc: 'Stratify patient risk scores using standardized Manchester Triage System (MTS) and ESI vital derangements.',
      icon: HeartPulse,
      actionLabel: 'Run Triage Engine',
      category: 'Decision Support'
    },
    {
      id: 'reports',
      title: 'Diagnostic Report Analyzer',
      desc: 'Extract critical laboratory biomarkers from emergency cardiac, sepsis, and metabolic blood panels.',
      icon: FileText,
      actionLabel: 'Inspect Stat Labs',
      category: 'Diagnostics'
    },
    {
      id: 'first-aid',
      title: 'First-Aid Guidance (EN / TA / HI)',
      desc: 'Offline clinical emergency resuscitation protocols in English, Tamil, and Hindi with 110 BPM metronome.',
      icon: LifeBuoy,
      actionLabel: 'Access Guides',
      category: 'Clinical Protocols'
    },
    {
      id: 'clinical',
      title: 'Clinical Dashboard',
      desc: 'Trauma physician workstation for in-transit telemetry tracking, ESI queue management, and bay allocation.',
      icon: Stethoscope,
      actionLabel: 'Launch Console',
      category: 'Trauma Staff'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Compact Page Title & Live Clock Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Apex Trauma & Emergency Resuscitation Center • Facility ID: #EM-014
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Emergency Operations Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time status of emergency triage, incoming ambulance telemetry, and clinical bay utilization.
          </p>
        </div>

        {/* Live Date & Time Display */}
        <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg flex items-center gap-4 shrink-0 text-slate-700">
          <div className="flex items-center gap-2 text-xs border-r border-slate-200 pr-4">
            <Calendar className="w-4 h-4 text-teal-600" />
            <span className="font-semibold text-slate-800">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="font-bold text-slate-900">{formattedTime}</span>
          </div>
        </div>
      </div>

      {/* Calculated Operational KPI Indicators Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Active Emergency Incidents */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-medium">Active Incidents</span>
            <span className="p-1.5 bg-slate-100 rounded-md text-slate-600">
              <Activity className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{totalActiveIncidents}</span>
            <span className="text-xs font-medium text-slate-500">active dispatch records</span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Inbound to facility</span>
            <span className="font-semibold text-teal-700">{inboundAmbulances.length} Units En Route</span>
          </div>
        </div>

        {/* Critical ESI-1/2 Priority */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-medium">Critical Priority (ESI-1/2)</span>
            <span className="p-1.5 bg-red-50 rounded-md text-red-600">
              <AlertTriangle className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-red-700">{totalCriticalPriority}</span>
            <span className="text-xs font-medium text-slate-500">patients requiring STAT care</span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Resuscitation Bay 1</span>
            <span className="font-semibold text-red-700">Code STEMI Active</span>
          </div>
        </div>

        {/* Trauma Bay Utilization */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-medium">Trauma Bay Occupancy</span>
            <span className="p-1.5 bg-slate-100 rounded-md text-slate-600">
              <Bed className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{bayOccupancyRate}%</span>
            <span className="text-xs font-medium text-slate-500">({occupiedTraumaBays}/{totalTraumaBays} Bays)</span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Available bays</span>
            <span className="font-semibold text-emerald-700">{totalTraumaBays - occupiedTraumaBays} Bays Ready</span>
          </div>
        </div>

        {/* Active Triage Queue */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-medium">Triage In-Bay Queue</span>
            <span className="p-1.5 bg-slate-100 rounded-md text-slate-600">
              <Users className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{activeTriageQueueCount}</span>
            <span className="text-xs font-medium text-slate-500">patients evaluated</span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Manchester MTS status</span>
            <span className="font-semibold text-teal-700">Calibrated</span>
          </div>
        </div>

      </div>

      {/* 24-Hour Emergency Admission Trend & Activity Timeline (Compact Chart) */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-teal-600" />
            <h3 className="text-sm font-bold text-slate-900">
              24-Hour Emergency Admissions & Triage Volume (Clinical Activity Timeline)
            </h3>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-2.5 h-2.5 rounded bg-slate-300"></span>
              Standard Admissions
            </span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-2.5 h-2.5 rounded bg-teal-600"></span>
              Critical Triage (ESI-1/2)
            </span>
          </div>
        </div>

        {/* Clean SVG/CSS Bar Chart */}
        <div className="pt-2">
          <div className="grid grid-cols-12 gap-2 h-24 items-end px-1">
            {HOURLY_ADMISSION_TRENDS.map((item, idx) => {
              const maxAdmissions = 25;
              const heightPct = Math.round((item.admissions / maxAdmissions) * 100);
              const criticalPct = Math.round((item.critical / item.admissions) * 100);

              return (
                <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                  <div className="w-full bg-slate-100 rounded-t-sm flex flex-col justify-end overflow-hidden relative" style={{ height: `${heightPct}%` }}>
                    {/* Critical segment */}
                    <div 
                      className="w-full bg-teal-600 group-hover:bg-teal-700 transition-colors" 
                      style={{ height: `${criticalPct}%` }}
                      title={`${item.hour}: ${item.critical} Critical / ${item.admissions} Total`}
                    ></div>
                    {/* Standard segment */}
                    <div 
                      className="w-full bg-slate-300 group-hover:bg-slate-400 transition-colors" 
                      style={{ height: `${100 - criticalPct}%` }}
                      title={`${item.hour}: ${item.admissions} Admissions`}
                    ></div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono tracking-tight">{item.hour}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Two-Column Operational Feeds: Active Emergency Calls & Recent Triage Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Active Emergency Dispatches & Inbound Ambulances */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-slate-700" />
              <h3 className="font-bold text-sm text-slate-900">
                Inbound Emergency Telemetry & Dispatches
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {inboundAmbulances.length} Units En Route
            </span>
          </div>

          <div className="space-y-3">
            {EMERGENCY_INCIDENTS.map((inc) => (
              <div
                key={inc.id}
                className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                        inc.severity === 'CRITICAL' 
                          ? 'bg-red-50 text-red-700 border-red-200' 
                          : inc.severity === 'HIGH' 
                          ? 'bg-orange-50 text-orange-700 border-orange-200' 
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        ESI-{inc.esiLevel} • {inc.severity}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-700">{inc.id}</span>
                      <span className="text-[11px] text-slate-400">• {inc.timestamp}</span>
                    </div>

                    <h4 className="font-semibold text-xs sm:text-sm text-slate-900">
                      {inc.type}
                    </h4>

                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      {inc.location}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold font-mono text-teal-800 bg-teal-50 px-2 py-1 rounded border border-teal-200 inline-block">
                      {inc.status === 'ARRIVED_ER' ? 'Arrived ER' : `ETA ${inc.etaMinutes} min`}
                    </span>
                    <p className="text-[10px] text-slate-500 mt-1 font-mono">{inc.assignedUnit.split(' ')[0]}</p>
                  </div>
                </div>

                {/* Pre-arrival In-Transit Vitals Telemetry */}
                <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-xs bg-white px-2.5 py-1.5 rounded border border-slate-100">
                  <span className="text-[11px] font-medium text-slate-500">In-Transit Vitals:</span>
                  <div className="flex items-center gap-4 text-[11px] font-mono">
                    <span>HR: <strong className="text-slate-900">{inc.telemetry.hr} bpm</strong></span>
                    <span>SpO2: <strong className={inc.telemetry.spo2 < 92 ? 'text-red-600 font-bold' : 'text-emerald-700'}>{inc.telemetry.spo2}%</strong></span>
                    <span>BP: <strong className="text-slate-900">{inc.telemetry.bp}</strong></span>
                    <span className="text-slate-500 hidden sm:inline">{inc.telemetry.rhythm}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-1 text-right">
            <button
              onClick={() => setActiveTab('clinical')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
            >
              Open Full Clinical Command Console <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Recent Patient Triage Activity */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-teal-600" />
                <h3 className="font-bold text-sm text-slate-900">
                  Recent Patient Triage Activity
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {TRIAGE_PATIENTS.length} In-Bay
              </span>
            </div>

            <div className="space-y-2.5">
              {TRIAGE_PATIENTS.map((pt) => (
                <div
                  key={pt.id}
                  className="p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${pt.badgeColor}`}>
                          ESI-{pt.esi}
                        </span>
                        <span className="font-bold text-xs text-slate-900">{pt.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">({pt.healthId})</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1">
                        {pt.complaint}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {pt.assignedBay}
                      </span>
                      <p className="text-[10px] text-teal-700 font-medium mt-1">{pt.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Need to calculate triage priority?</span>
            <button
              onClick={() => setActiveTab('risk-assessment')}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs transition"
            >
              Run Risk Assessment
            </button>
          </div>
        </div>

      </div>

      {/* Operational Modules Navigation Grid */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-500" />
            Platform Operational Modules
          </h3>
          <span className="text-xs text-slate-500">Select module to navigate</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {operationalModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                onClick={() => setActiveTab(mod.id)}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-teal-500/60 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-teal-50 text-slate-700 group-hover:text-teal-700 flex items-center justify-center transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                      {mod.category}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-teal-700 transition-colors">
                    {mod.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                    {mod.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-teal-700">
                  <span>{mod.actionLabel}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
