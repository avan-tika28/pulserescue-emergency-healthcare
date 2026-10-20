import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus,
  ShieldCheck, 
  QrCode, 
  Heart, 
  Phone, 
  User, 
  FileCheck2, 
  RotateCcw,
  CheckCircle2,
  Search,
  Filter,
  Edit3,
  Eye,
  X,
  Save,
  AlertCircle
} from 'lucide-react';
import { DEMO_PRESET_PATIENTS, TRIAGE_PATIENTS } from '../data/mockData';

const DEFAULT_PATIENTS = [
  {
    healthId: "PR-MED-8819",
    fullName: "Arun Krishnan",
    age: 58,
    gender: "Male",
    bloodGroup: "O+",
    phone: "+91 98201 11223",
    emergencyContactName: "Sunita Krishnan (Wife)",
    emergencyContactPhone: "+91 98201 99887",
    allergies: "Penicillin, Aspirin",
    chronicConditions: "Coronary Artery Disease, Hypertension",
    medications: "Atorvastatin 40mg, Metoprolol 50mg, Ramipril 5mg",
    organDonor: true,
    address: "Indiranagar 100ft Rd, Bengaluru",
    insuranceProvider: "National Health Card #POL-40291",
    status: "Admitted - Trauma Bay 1"
  },
  {
    healthId: "PR-MED-4421",
    fullName: "Sneha Mukherjee",
    age: 29,
    gender: "Female",
    bloodGroup: "B+",
    phone: "+91 94330 45678",
    emergencyContactName: "Subhash Mukherjee (Father)",
    emergencyContactPhone: "+91 94330 12345",
    allergies: "Sulfa Antibiotics, NSAIDs",
    chronicConditions: "Type 1 Diabetes (Insulin Dependent)",
    medications: "Insulin Glargine 22u bedtime, Insulin Lispro",
    organDonor: true,
    address: "Whitefield Main Rd, Bengaluru",
    insuranceProvider: "Comprehensive Health #POL-88712",
    status: "In CT Imaging - Bay 3"
  },
  {
    healthId: "PR-MED-1904",
    fullName: "Robert D'Souza",
    age: 71,
    gender: "Male",
    bloodGroup: "A-",
    phone: "+91 97654 32109",
    emergencyContactName: "Grace D'Souza (Daughter)",
    emergencyContactPhone: "+91 97654 88776",
    allergies: "None Reported",
    chronicConditions: "Atrial Fibrillation, Chronic Kidney Disease",
    medications: "Apixaban 5mg BID, Amlodipine 5mg",
    organDonor: false,
    address: "Richmond Town, Bengaluru",
    insuranceProvider: "Senior Care Emergency #POL-11203",
    status: "Awaiting Neurologist - Bay 2"
  },
  {
    healthId: "PR-MED-7312",
    fullName: "Kavya Patel",
    age: 19,
    gender: "Female",
    bloodGroup: "AB+",
    phone: "+91 98860 11223",
    emergencyContactName: "Dinesh Patel (Father)",
    emergencyContactPhone: "+91 98860 33445",
    allergies: "Ibuprofen",
    chronicConditions: "None Reported",
    medications: "None",
    organDonor: true,
    address: "Koramangala 4th Block, Bengaluru",
    insuranceProvider: "Student Health Cover #POL-99341",
    status: "Triage Bed 8"
  }
];

export default function PatientRegistration({ onPatientRegistered }) {
  const [activeSubTab, setActiveSubTab] = useState('directory'); // 'directory' or 'register'
  const [searchQuery, setSearchQuery] = useState('');
  const [bloodFilter, setBloodFilter] = useState('ALL');

  // Unified patient list with localStorage persistence across sessions
  const [patientRecords, setPatientRecords] = useState(() => {
    try {
      const saved = localStorage.getItem('pulserescue_patients');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      // fallback
    }
    return DEFAULT_PATIENTS;
  });

  // Persist patient records to storage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('pulserescue_patients', JSON.stringify(patientRecords));
    } catch (e) {
      // ignore
    }
  }, [patientRecords]);


  // Editing state
  const [editingPatient, setEditingPatient] = useState(null);
  const [viewingPatient, setViewingPatient] = useState(null);

  // New patient registration form state
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    allergies: '',
    chronicConditions: '',
    medications: '',
    organDonor: true,
    address: '',
    insuranceProvider: '',
    policyNumber: ''
  });

  const [registeredCard, setRegisteredCard] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const bloodGroups = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const loadPreset = (presetIndex) => {
    const preset = DEMO_PRESET_PATIENTS[presetIndex];
    setFormData(preset);
    setSuccessMessage(`Loaded clinical preset: ${preset.fullName}`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert('Please fill out at least Patient Full Name and Contact Phone.');
      return;
    }

    const uniqueHealthId = `PR-MED-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord = {
      ...formData,
      healthId: uniqueHealthId,
      status: "Registered - Standby",
      registeredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setPatientRecords(prev => [newRecord, ...prev]);
    setRegisteredCard(newRecord);
    setSuccessMessage(`Successfully registered ${newRecord.fullName} with ID ${uniqueHealthId}!`);
    setTimeout(() => setSuccessMessage(''), 4000);

    if (onPatientRegistered) {
      onPatientRegistered(newRecord);
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setPatientRecords(prev => prev.map(p => {
      if (p.healthId === editingPatient.healthId) {
        return editingPatient;
      }
      return p;
    }));
    setSuccessMessage(`Updated records for ${editingPatient.fullName}`);
    setTimeout(() => setSuccessMessage(''), 3000);
    setEditingPatient(null);
  };

  // Filtered patients
  const filteredRecords = patientRecords.filter(pt => {
    const matchesSearch = 
      pt.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pt.healthId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pt.phone.includes(searchQuery) ||
      pt.allergies.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBlood = bloodFilter === 'ALL' || pt.bloodGroup === bloodFilter;
    return matchesSearch && matchesBlood;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 bg-slate-100 text-slate-700 rounded">
              <Users className="w-4 h-4 text-teal-700" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
              Patient Admissions & Records Management
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Patient Management Console
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Search, inspect, and update emergency medical records, or register incoming patients.
          </p>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200 shrink-0">
          <button
            onClick={() => {
              setActiveSubTab('directory');
              setRegisteredCard(null);
            }}
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition ${
              activeSubTab === 'directory'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-teal-600" />
            <span>Patient Directory ({patientRecords.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('register')}
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition ${
              activeSubTab === 'register'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 text-teal-600" />
            <span>New Emergency Intake</span>
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {successMessage}
        </div>
      )}

      {/* SUB-TAB 1: PATIENT DIRECTORY */}
      {activeSubTab === 'directory' && (
        <div className="space-y-4">
          
          {/* Search & Filter Toolbar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient name, ID, allergy, phone..."
                className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Blood:
              </span>
              <select
                value={bloodFilter}
                onChange={(e) => setBloodFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-medium bg-white focus:outline-none"
              >
                <option value="ALL">All Groups</option>
                {bloodGroups.map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>

              <button
                onClick={() => setActiveSubTab('register')}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg text-xs flex items-center gap-1.5 transition ml-2"
              >
                <UserPlus className="w-3.5 h-3.5 text-teal-400" />
                <span>Add Patient</span>
              </button>
            </div>
          </div>

          {/* Patient Records Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4 font-bold">Health ID & Name</th>
                    <th className="py-3 px-4 font-bold">Blood Group</th>
                    <th className="py-3 px-4 font-bold">Known Allergies</th>
                    <th className="py-3 px-4 font-bold">Emergency Contact</th>
                    <th className="py-3 px-4 font-bold">Current Status</th>
                    <th className="py-3 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map((pt) => (
                      <tr key={pt.healthId} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-mono text-[11px] text-teal-700 font-semibold block">{pt.healthId}</span>
                          <span className="font-bold text-slate-900 text-xs">{pt.fullName}</span>
                          <span className="text-[11px] text-slate-400 ml-1.5">({pt.age}y {pt.gender})</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-2 py-0.5 rounded font-black font-mono text-xs bg-red-50 text-red-700 border border-red-200">
                            {pt.bloodGroup}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-slate-700 font-medium truncate max-w-xs block">
                            {pt.allergies || 'None Reported'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-slate-800 font-medium block">{pt.emergencyContactName}</span>
                          <span className="text-[11px] font-mono text-slate-500">{pt.emergencyContactPhone}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                            {pt.status || 'Active Record'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setViewingPatient(pt)}
                              className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition"
                              title="View Patient Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingPatient({ ...pt })}
                              className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-teal-700 transition"
                              title="Edit Patient Record"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                        No matching patient records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: REGISTER NEW PATIENT */}
      {activeSubTab === 'register' && (
        <div>
          {registeredCard ? (
            /* Registration Success Card */
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">
                      Patient Successfully Enrolled
                    </h3>
                    <p className="text-xs text-slate-500">
                      Emergency Health ID: <strong className="text-teal-700 font-mono">{registeredCard.healthId}</strong>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setRegisteredCard(null);
                    setFormData({
                      fullName: '',
                      age: '',
                      gender: 'Male',
                      bloodGroup: 'O+',
                      phone: '',
                      emergencyContactName: '',
                      emergencyContactPhone: '',
                      allergies: '',
                      chronicConditions: '',
                      medications: '',
                      organDonor: true,
                      address: '',
                      insuranceProvider: '',
                      policyNumber: ''
                    });
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Register Another
                </button>
              </div>

              {/* Card Preview */}
              <div className="bg-slate-900 text-white rounded-xl p-6 shadow-sm border border-slate-800">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase tracking-wider">
                      PulseRescue Verified Health Record
                    </span>
                    <h4 className="text-xl font-bold text-white mt-2">{registeredCard.fullName}</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Age: {registeredCard.age} • Gender: {registeredCard.gender} • Emergency Contact: {registeredCard.emergencyContactName} ({registeredCard.emergencyContactPhone})
                    </p>
                  </div>

                  <div className="bg-red-600/20 border border-red-500/40 px-3.5 py-2 rounded-lg text-center shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-300 block">BLOOD TYPE</span>
                    <span className="text-2xl font-bold text-white font-mono">{registeredCard.bloodGroup}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                    <span className="text-amber-400 font-semibold block mb-0.5">Known Allergies:</span>
                    <span className="text-slate-300">{registeredCard.allergies || 'None Reported'}</span>
                  </div>
                  <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                    <span className="text-teal-400 font-semibold block mb-0.5">Chronic Medical Conditions:</span>
                    <span className="text-slate-300">{registeredCard.chronicConditions || 'None Reported'}</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span>Record stored in directory and synced to Digital Health Passport.</span>
                <button
                  onClick={() => setActiveSubTab('directory')}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs"
                >
                  View Patient Directory
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleRegisterSubmit} className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Patient Intake Form
                </span>

                {/* Sample Presets */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Sample Records:</span>
                  <button
                    type="button"
                    onClick={() => loadPreset(0)}
                    className="px-2.5 py-1 rounded text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                  >
                    Priya (Asthma)
                  </button>
                  <button
                    type="button"
                    onClick={() => loadPreset(1)}
                    className="px-2.5 py-1 rounded text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                  >
                    Karthik (Cardiac)
                  </button>
                </div>
              </div>

              {/* Demographics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Legal Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    placeholder="e.g. Priya Sharma"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    name="age"
                    placeholder="34"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-Binary">Non-Binary</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Blood Group <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none bg-white"
                  >
                    {bloodGroups.map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    placeholder="+91 98450 12345"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>
              </div>

              {/* Emergency Next-of-Kin */}
              <div className="pt-3 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-600 uppercase mb-3">Emergency Contact Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Next-of-Kin Name & Relation
                    </label>
                    <input
                      type="text"
                      name="emergencyContactName"
                      placeholder="e.g. Rohan Sharma (Spouse)"
                      value={formData.emergencyContactName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Emergency Phone Number
                    </label>
                    <input
                      type="tel"
                      name="emergencyContactPhone"
                      placeholder="+91 98450 67890"
                      value={formData.emergencyContactPhone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                    />
                  </div>
                </div>
              </div>

              {/* Clinical Flags */}
              <div className="pt-3 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-600 uppercase mb-3">Medical History & Allergies</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Known Drug & Food Allergies
                    </label>
                    <input
                      type="text"
                      name="allergies"
                      placeholder="e.g. Penicillin, Peanuts, Sulfa antibiotics"
                      value={formData.allergies}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Chronic Medical Conditions
                      </label>
                      <input
                        type="text"
                        name="chronicConditions"
                        placeholder="e.g. Type 2 Diabetes, Hypertension"
                        value={formData.chronicConditions}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Active Medications
                      </label>
                      <input
                        type="text"
                        name="medications"
                        placeholder="e.g. Metformin 500mg, Clopidogrel 75mg"
                        value={formData.medications}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg shadow-xs transition flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  Save Record & Generate Health ID
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {viewingPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-teal-400 block">{viewingPatient.healthId}</span>
                <h3 className="font-bold text-base text-white">{viewingPatient.fullName}</h3>
              </div>
              <button onClick={() => setViewingPatient(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Demographics</span>
                  <span className="font-semibold text-slate-800">{viewingPatient.age}y {viewingPatient.gender}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Blood Group</span>
                  <span className="font-bold text-red-700">{viewingPatient.bloodGroup}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Contact Phone</span>
                  <span className="font-mono text-slate-800">{viewingPatient.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Organ Donor</span>
                  <span className="text-slate-800 font-semibold">{viewingPatient.organDonor ? 'Registered Pledge' : 'No'}</span>
                </div>
              </div>

              <div>
                <span className="text-amber-800 font-semibold block mb-0.5">Known Allergies:</span>
                <p className="text-slate-700 bg-amber-50 p-2 rounded border border-amber-200">{viewingPatient.allergies || 'None Reported'}</p>
              </div>

              <div>
                <span className="text-slate-700 font-semibold block mb-0.5">Chronic Medical Conditions:</span>
                <p className="text-slate-700 bg-slate-50 p-2 rounded border border-slate-200">{viewingPatient.chronicConditions || 'None Reported'}</p>
              </div>

              <div>
                <span className="text-slate-700 font-semibold block mb-0.5">Active Prescription Regimen:</span>
                <p className="text-slate-700 bg-slate-50 p-2 rounded border border-slate-200 font-mono">{viewingPatient.medications || 'None'}</p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setViewingPatient(null)}
                  className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PATIENT MODAL */}
      {editingPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl max-w-xl w-full border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-teal-400 block">{editingPatient.healthId}</span>
                <h3 className="font-bold text-base text-white">Edit Record: {editingPatient.fullName}</h3>
              </div>
              <button onClick={() => setEditingPatient(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editingPatient.fullName}
                    onChange={(e) => setEditingPatient({ ...editingPatient, fullName: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Phone</label>
                  <input
                    type="tel"
                    value={editingPatient.phone}
                    onChange={(e) => setEditingPatient({ ...editingPatient, phone: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Known Allergies</label>
                <input
                  type="text"
                  value={editingPatient.allergies}
                  onChange={(e) => setEditingPatient({ ...editingPatient, allergies: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Chronic Conditions</label>
                <input
                  type="text"
                  value={editingPatient.chronicConditions}
                  onChange={(e) => setEditingPatient({ ...editingPatient, chronicConditions: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Current Medications</label>
                <input
                  type="text"
                  value={editingPatient.medications}
                  onChange={(e) => setEditingPatient({ ...editingPatient, medications: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Emergency Contact Name</label>
                  <input
                    type="text"
                    value={editingPatient.emergencyContactName}
                    onChange={(e) => setEditingPatient({ ...editingPatient, emergencyContactName: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Emergency Contact Phone</label>
                  <input
                    type="tel"
                    value={editingPatient.emergencyContactPhone}
                    onChange={(e) => setEditingPatient({ ...editingPatient, emergencyContactPhone: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPatient(null)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg text-xs flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5 text-teal-400" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
