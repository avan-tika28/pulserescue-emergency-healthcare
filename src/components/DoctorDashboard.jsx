import React, { useState } from 'react';
import { 
  Stethoscope, 
  HeartPulse, 
  Bed, 
  Truck, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Activity, 
  Radio, 
  X,
  Filter,
  Search,
  Info
} from 'lucide-react';
import { TRIAGE_PATIENTS, EMERGENCY_INCIDENTS } from '../data/mockData';

export default function DoctorDashboard() {
  const [patients, setPatients] = useState(TRIAGE_PATIENTS);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [filterEsi, setFilterEsi] = useState('ALL');
  const [doctorSearch, setDoctorSearch] = useState('');
  const [actionSuccessMessage, setActionSuccessMessage] = useState('');
  const [bedModalOpen, setBedModalOpen] = useState(false);

  // Bed allocations
  const [beds, setBeds] = useState([
    { id: 'BAY-1', name: 'Shock Trauma Bay 1', status: 'OCCUPIED', patient: 'Arun Krishnan (58M)', type: 'Trauma' },
    { id: 'BAY-2', name: 'Stroke Care Bay 2', status: 'OCCUPIED', patient: 'Robert D\'Souza (71M)', type: 'Trauma' },
    { id: 'BAY-3', name: 'Acute Trauma Bay 3', status: 'OCCUPIED', patient: 'Sneha Mukherjee (29F)', type: 'Trauma' },
    { id: 'BAY-4', name: 'Trauma Bay 4 (Stat Ready)', status: 'AVAILABLE', patient: 'None', type: 'Trauma' },
    { id: 'ICU-1', name: 'Cardiothoracic ICU 1', status: 'OCCUPIED', patient: 'Post-Cath Intervention', type: 'ICU' },
    { id: 'ICU-2', name: 'Neuro Critical Care 2', status: 'AVAILABLE', patient: 'None', type: 'ICU' },
    { id: 'ICU-3', name: 'Medical ICU 3', status: 'AVAILABLE', patient: 'None', type: 'ICU' },
    { id: 'STEP-1', name: 'Step-Down Monitored 1', status: 'OCCUPIED', patient: 'Telemetry Observation', type: 'Stepdown' }
  ]);

  const filteredPatients = patients.filter(pt => {
    const matchesFilter = filterEsi === 'ALL' || pt.esi === Number(filterEsi);
    const matchesSearch = 
      pt.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      pt.healthId.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      pt.complaint.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      pt.assignedBay.toLowerCase().includes(doctorSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleUpdateStatus = (patientId, newStatus) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return { ...p, status: newStatus };
      }
      return p;
    }));
    setActionSuccessMessage(`Updated ${patientId} status to "${newStatus}"`);
    setTimeout(() => setActionSuccessMessage(''), 3000);
    if (selectedPatient && selectedPatient.id === patientId) {
      setSelectedPatient(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleAllocateBed = (bayId) => {
    setBeds(prev => prev.map(b => {
      if (b.id === bayId) {
        return {
          ...b,
          status: b.status === 'AVAILABLE' ? 'OCCUPIED' : 'AVAILABLE',
          patient: b.status === 'AVAILABLE' ? 'Reserved Incoming' : 'None'
        };
      }
      return b;
    }));
    setActionSuccessMessage(`Updated Bed ${bayId} status.`);
    setTimeout(() => setActionSuccessMessage(''), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 bg-slate-100 text-slate-700 rounded">
              <Stethoscope className="w-4 h-4 text-teal-700" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
              Trauma Bay & Resuscitation Center
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Clinical Operations & Trauma Console
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time ambulance telemetry, ESI-5 prioritized queue management, and bed capacity allocation.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setBedModalOpen(true)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition"
          >
            <Bed className="w-3.5 h-3.5 text-teal-400" />
            <span>Manage Clinical Bays ({beds.filter(b => b.status === 'AVAILABLE').length} Available)</span>
          </button>
        </div>
      </div>

      {/* Distinction of Sample Data */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-start gap-2">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-800">Sample Clinical Data Notice:</strong> The patient queue, telemetry figures, and bed allocations displayed below are preloaded operational test samples. Real-time EHR integration requires HL7 FHIR v4 API configuration.
        </p>
      </div>

      {actionSuccessMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {actionSuccessMessage}
        </div>
      )}

      {/* Inbound Telemetry Strip */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-teal-400" />
            <h3 className="font-bold text-xs tracking-wider uppercase text-slate-300">
              Live Inbound Paramedic Telemetry Stream
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {EMERGENCY_INCIDENTS.filter(i => i.status !== 'ARRIVED_ER').length} Units En Route
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {EMERGENCY_INCIDENTS.filter(i => i.status !== 'ARRIVED_ER').map((inc) => (
            <div key={inc.id} className="bg-slate-800/80 p-3.5 rounded-lg border border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  inc.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-300 border-red-500/40' : 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                }`}>
                  ESI-{inc.esiLevel} • {inc.severity}
                </span>
                <span className="text-xs font-bold text-teal-300 font-mono">ETA: {inc.etaMinutes} min</span>
              </div>
              <h4 className="font-semibold text-xs text-white line-clamp-1">{inc.type}</h4>
              <div className="grid grid-cols-3 gap-1 text-[11px] bg-slate-950/60 p-2 rounded font-mono">
                <div>
                  <span className="text-slate-400 block text-[9px]">HR</span>
                  <span className="font-bold text-slate-100">{inc.telemetry.hr} bpm</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">SPO2</span>
                  <span className={`font-bold ${inc.telemetry.spo2 < 92 ? 'text-red-400' : 'text-emerald-400'}`}>{inc.telemetry.spo2}%</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">BP</span>
                  <span className="font-bold text-slate-100">{inc.telemetry.bp}</span>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 flex items-center justify-between pt-0.5">
                <span className="truncate">{inc.assignedUnit.split(' ')[0]}</span>
                <span className="text-teal-400 font-medium">{inc.telemetry.rhythm}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Triage Queue Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-red-600" />
              Active Emergency Clinical Triage Queue
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Prioritized by ESI Severity Index and target physician evaluation window
            </p>
          </div>

          {/* Search & ESI Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
              <input
                type="text"
                value={doctorSearch}
                onChange={(e) => setDoctorSearch(e.target.value)}
                placeholder="Search patient, ID, bay..."
                className="pl-8 pr-2.5 py-1 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto">
              {[
                { id: 'ALL', label: 'All' },
                { id: '1', label: 'ESI-1 Resus' },
                { id: '2', label: 'ESI-2 Emergent' },
                { id: '3', label: 'ESI-3 Urgent' },
                { id: '4', label: 'ESI-4 Stable' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterEsi(f.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
                    filterEsi === f.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Patient Rows */}
        <div className="space-y-2.5">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((pt) => (
              <div
                key={pt.id}
                className="p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors bg-white"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  
                  {/* Left: Patient Info */}
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase ${pt.badgeColor}`}>
                        ESI-{pt.esi} {pt.triageCategory.split(' ')[0]}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                        {pt.name}
                      </h4>
                      <span className="text-xs text-slate-500">
                        {pt.age}y {pt.gender} • Blood: <strong className="text-red-700">{pt.bloodGroup}</strong>
                      </span>
                      <span className="text-xs font-mono text-slate-400">({pt.healthId})</span>
                    </div>

                    <p className="text-xs text-slate-600">
                      <strong className="text-slate-800">Complaint:</strong> {pt.complaint}
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-0.5">
                      <span>Bay: <strong className="text-slate-800">{pt.assignedBay}</strong></span>
                      <span>Physician: <strong className="text-slate-800">{pt.doctor}</strong></span>
                      <span>Arrived: <strong>{pt.arrivalTime}</strong></span>
                    </div>
                  </div>

                  {/* Vitals */}
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-xs font-mono shrink-0 grid grid-cols-4 gap-3 text-center">
                    <div>
                      <span className="text-[9px] text-slate-400 block">HR</span>
                      <span className="font-bold text-slate-900">{pt.vitals.hr}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block">BP</span>
                      <span className="font-bold text-slate-900">{pt.vitals.bp}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block">SPO2</span>
                      <span className={`font-bold ${pt.vitals.spo2 < 92 ? 'text-red-600' : 'text-emerald-700'}`}>{pt.vitals.spo2}%</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block">TEMP</span>
                      <span className="font-bold text-slate-900">{pt.vitals.temp}°</span>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 shrink-0">
                    <div className="text-right sm:mr-1">
                      <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200 inline-block">
                        {pt.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 w-full sm:w-auto">
                      <button
                        onClick={() => setSelectedPatient(pt)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg text-xs transition"
                      >
                        Trauma Orders
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(pt.id, 'Stabilized / Awaiting Ward')}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-xs transition"
                        title="Mark as Stabilized"
                      >
                        Stabilize
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs bg-slate-50 rounded-lg">
              No patients match current search or triage filter.
            </div>
          )}
        </div>
      </div>

      {/* Orders Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-lg max-w-xl w-full border border-slate-200 overflow-hidden">
            
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${selectedPatient.badgeColor}`}>
                  ESI-{selectedPatient.esi}
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  Physician Directives: {selectedPatient.name} ({selectedPatient.healthId})
                </h3>
                <p className="text-xs text-slate-400">
                  Bay: {selectedPatient.assignedBay} • Attending: {selectedPatient.doctor}
                </p>
              </div>

              <button
                onClick={() => setSelectedPatient(null)}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              
              <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-amber-900">
                <span className="font-bold block mb-0.5">Critical Patient Drug Allergies:</span>
                <span>{selectedPatient.allergies.join(', ') || 'None reported'}</span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Immediate Stat Actions:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedPatient.id, 'STAT Cath Lab Activated')}
                    className="p-2.5 bg-red-50 hover:bg-red-100 text-red-900 font-semibold rounded-lg border border-red-200 text-left transition"
                  >
                    Activate Cath Lab (Code STEMI)
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedPatient.id, 'Stat CT Head Ordered')}
                    className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-900 font-semibold rounded-lg border border-slate-200 text-left transition"
                  >
                    Order Non-Contrast Head CT
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedPatient.id, 'Blood Bank: 2U O- Crossmatched')}
                    className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-900 font-semibold rounded-lg border border-rose-200 text-left transition"
                  >
                    Order Stat Blood Protocol (2U O-)
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedPatient.id, 'Admitted to ICU Bed')}
                    className="p-2.5 bg-teal-50 hover:bg-teal-100 text-teal-900 font-semibold rounded-lg border border-teal-200 text-left transition"
                  >
                    Transfer to Critical Care / ICU
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="px-3.5 py-1.5 bg-slate-900 text-white font-medium rounded-lg text-xs"
                >
                  Close Orders
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Bed Management Modal */}
      {bedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Bed className="w-4 h-4 text-teal-400" />
                  Trauma Bays & Critical Care Capacity Monitor
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time bed availability for incoming emergency admissions
                </p>
              </div>
              <button
                onClick={() => setBedModalOpen(false)}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3 max-h-[65vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {beds.map((b) => (
                  <div
                    key={b.id}
                    className={`p-3 rounded-lg border flex items-center justify-between gap-3 ${
                      b.status === 'AVAILABLE'
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-slate-900">{b.name}</span>
                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded ${
                          b.status === 'AVAILABLE' ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-800'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Patient: <strong className="text-slate-800">{b.patient}</strong>
                      </p>
                    </div>

                    <button
                      onClick={() => handleAllocateBed(b.id)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition shrink-0 ${
                        b.status === 'AVAILABLE'
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                      }`}
                    >
                      {b.status === 'AVAILABLE' ? 'Reserve' : 'Vacate'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setBedModalOpen(false)}
                className="px-3.5 py-1.5 bg-slate-900 text-white font-medium rounded-lg text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
