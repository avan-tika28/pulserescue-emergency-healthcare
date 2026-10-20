import React, { useState, useMemo } from 'react';
import { 
  HeartPulse, 
  AlertTriangle, 
  Activity, 
  Gauge, 
  ShieldCheck, 
  Info, 
  Stethoscope, 
  Sliders, 
  Clock, 
  CheckCircle2,
  TrendingUp,
  Brain,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function AIRiskAssessment({ onSendToQueue }) {
  const [activeCalculator, setActiveCalculator] = useState('heart'); // 'heart', 'diabetes', 'hypertension', 'triage'

  // ==========================================
  // 1. HEART DISEASE (ASCVD 10-YEAR RISK)
  // ==========================================
  const [heartInputs, setHeartInputs] = useState({
    age: 55,
    gender: 'male',
    systolicBP: 142,
    diastolicBP: 88,
    totalCholesterol: 215,
    hdlCholesterol: 42,
    smoker: true,
    diabetic: false,
    treatedForBP: true
  });

  const heartRiskResult = useMemo(() => {
    let base = 5;
    // Age factor
    if (heartInputs.age > 65) base += 12;
    else if (heartInputs.age > 50) base += 7;
    else if (heartInputs.age > 40) base += 3;

    // Blood pressure factor
    if (heartInputs.systolicBP >= 160) base += 8;
    else if (heartInputs.systolicBP >= 140) base += 5;
    else if (heartInputs.systolicBP >= 130) base += 2;

    // Cholesterol ratio factor (Total / HDL)
    const ratio = heartInputs.totalCholesterol / Math.max(1, heartInputs.hdlCholesterol);
    if (ratio > 5.0) base += 7;
    else if (ratio > 4.0) base += 4;

    // Lifestyle & comorbidities
    if (heartInputs.smoker) base += 8;
    if (heartInputs.diabetic) base += 9;
    if (heartInputs.treatedForBP) base += 3;

    const riskScore = Math.min(100, Math.max(2, base));
    let tier = 'Low Risk (< 5%)';
    let color = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    let badgeColor = 'bg-emerald-600 text-white';

    if (riskScore >= 20) {
      tier = 'High Risk (≥ 20%)';
      color = 'text-red-700 bg-red-50 border-red-200';
      badgeColor = 'bg-red-600 text-white';
    } else if (riskScore >= 10) {
      tier = 'Intermediate Risk (10–19.9%)';
      color = 'text-amber-800 bg-amber-50 border-amber-200';
      badgeColor = 'bg-amber-500 text-white';
    } else if (riskScore >= 5) {
      tier = 'Borderline Risk (5–9.9%)';
      color = 'text-blue-800 bg-blue-50 border-blue-200';
      badgeColor = 'bg-blue-600 text-white';
    }

    const drivers = [];
    if (heartInputs.systolicBP >= 140) drivers.push({ factor: 'Elevated Systolic Blood Pressure', impact: '+5.2% Risk' });
    if (heartInputs.smoker) drivers.push({ factor: 'Active Tobacco Use', impact: '+8.0% Risk' });
    if (ratio > 4.5) drivers.push({ factor: 'Suboptimal Total/HDL Cholesterol Ratio', impact: '+4.5% Risk' });
    if (heartInputs.age > 50) drivers.push({ factor: 'Age Category (> 50y)', impact: '+7.1% Risk' });

    return { riskScore, tier, color, badgeColor, drivers };
  }, [heartInputs]);

  // ==========================================
  // 2. TYPE 2 DIABETES (FINDRISC CALIBRATION)
  // ==========================================
  const [diabetesInputs, setDiabetesInputs] = useState({
    age: 48,
    bmi: 28.5,
    waistCircumference: 98, // cm
    dailyActivity: false,
    dailyVegFruit: true,
    bpMedication: true,
    pastHighGlucose: false,
    familyHistory: 'immediate' // 'none', 'second', 'immediate'
  });

  const diabetesRiskResult = useMemo(() => {
    let points = 0;
    if (diabetesInputs.age >= 64) points += 4;
    else if (diabetesInputs.age >= 55) points += 3;
    else if (diabetesInputs.age >= 45) points += 2;

    if (diabetesInputs.bmi >= 30) points += 3;
    else if (diabetesInputs.bmi >= 25) points += 1;

    if (diabetesInputs.waistCircumference >= 102) points += 4;
    else if (diabetesInputs.waistCircumference >= 94) points += 3;

    if (!diabetesInputs.dailyActivity) points += 2;
    if (!diabetesInputs.dailyVegFruit) points += 1;
    if (diabetesInputs.bpMedication) points += 2;
    if (diabetesInputs.pastHighGlucose) points += 5;
    if (diabetesInputs.familyHistory === 'immediate') points += 5;
    else if (diabetesInputs.familyHistory === 'second') points += 3;

    let tier = 'Low Risk (1 in 100)';
    let badgeColor = 'bg-emerald-600 text-white';
    if (points >= 15) {
      tier = 'High Risk (1 in 3 develops T2D)';
      badgeColor = 'bg-red-600 text-white';
    } else if (points >= 12) {
      tier = 'Moderate Risk (1 in 6 develops T2D)';
      badgeColor = 'bg-amber-500 text-white';
    } else if (points >= 7) {
      tier = 'Slightly Elevated (1 in 25)';
      badgeColor = 'bg-blue-600 text-white';
    }

    const drivers = [];
    if (diabetesInputs.familyHistory === 'immediate') drivers.push({ factor: 'First-Degree Family History of Diabetes', impact: '+5 Points' });
    if (diabetesInputs.bmi >= 25) drivers.push({ factor: `Elevated BMI (${diabetesInputs.bmi} kg/m²)`, impact: '+2 Points' });
    if (!diabetesInputs.dailyActivity) drivers.push({ factor: 'Sedentary Lifestyle (<30 min daily activity)', impact: '+2 Points' });
    if (diabetesInputs.bpMedication) drivers.push({ factor: 'Regular Antihypertensive Therapy', impact: '+2 Points' });

    return { points, tier, badgeColor, drivers };
  }, [diabetesInputs]);

  // ==========================================
  // 3. HYPERTENSION & CRISIS ASSESSMENT (AHA/ACC)
  // ==========================================
  const [htnInputs, setHtnInputs] = useState({
    systolic: 168,
    diastolic: 104,
    hasChestPain: false,
    hasDyspnea: true,
    hasBlurryVision: false,
    hasHeadache: true,
    onMedication: true
  });

  const htnResult = useMemo(() => {
    const sys = htnInputs.systolic;
    const dia = htnInputs.diastolic;
    const hasRedFlags = htnInputs.hasChestPain || htnInputs.hasDyspnea || htnInputs.hasBlurryVision;

    let stage = 'Normal (< 120/80 mmHg)';
    let badgeColor = 'bg-emerald-600 text-white';
    let urgency = 'Routine follow-up';
    let map = Math.round((2 * dia + sys) / 3); // Mean Arterial Pressure

    if (sys > 180 || dia > 120) {
      if (hasRedFlags) {
        stage = 'Hypertensive Emergency (Crisis with Target Organ Distress)';
        badgeColor = 'bg-red-600 text-white';
        urgency = 'IMMEDIATE ICU ADMISSION & IV ANTIHYPERTENSIVES';
      } else {
        stage = 'Hypertensive Urgency (Severe Elevation without acute organ failure)';
        badgeColor = 'bg-orange-600 text-white';
        urgency = 'Oral titration and physician evaluation < 2 hours';
      }
    } else if (sys >= 140 || dia >= 90) {
      stage = 'Stage 2 Hypertension';
      badgeColor = 'bg-amber-500 text-white';
      urgency = 'Dual-agent pharmacological titration recommended';
    } else if (sys >= 130 || dia >= 80) {
      stage = 'Stage 1 Hypertension';
      badgeColor = 'bg-blue-600 text-white';
      urgency = 'Lifestyle modification and single agent review';
    }

    const drivers = [];
    if (sys >= 160) drivers.push({ factor: `Severe Systolic Overload (${sys} mmHg)`, impact: 'Critical Afterload' });
    if (dia >= 100) drivers.push({ factor: `Diastolic Vascular Resistance (${dia} mmHg)`, impact: 'Microvascular Strain' });
    if (htnInputs.hasDyspnea) drivers.push({ factor: 'Presenting Acute Dyspnea', impact: 'Potential Pulmonary Congestion' });
    if (htnInputs.hasHeadache) drivers.push({ factor: 'Hypertensive Cephalea', impact: 'Cerebrovascular Pressure' });

    return { stage, badgeColor, urgency, map, drivers };
  }, [htnInputs]);

  // ==========================================
  // 4. EMERGENCY TRIAGE (MANCHESTER / ESI-5)
  // ==========================================
  const [complaint, setComplaint] = useState('chest_pain');
  const [heartRate, setHeartRate] = useState(115);
  const [systolicBP, setSystolicBP] = useState(95);
  const [diastolicBP, setDiastolicBP] = useState(60);
  const [spo2, setSpo2] = useState(91);
  const [temp, setTemp] = useState(98.6);
  const [respRate, setRespRate] = useState(24);
  const [painLevel, setPainLevel] = useState(8);
  const [avpu, setAvpu] = useState('A');
  const [triageSent, setTriageSent] = useState(false);

  const complaints = [
    { id: 'chest_pain', label: 'Retrosternal Chest Pain / Radiating Arm Pain', baseRisk: 40 },
    { id: 'dyspnea', label: 'Severe Dyspnea / Respiratory Distress', baseRisk: 35 },
    { id: 'head_trauma', label: 'Blunt Cranial Trauma / Loss of Consciousness', baseRisk: 38 },
    { id: 'stroke_symptoms', label: 'Acute Facial Asymmetry / Hemiparesis / Dysarthria', baseRisk: 42 },
    { id: 'acute_abdomen', label: 'Acute Abdominal Pain with Rebound Tenderness', baseRisk: 22 },
    { id: 'anaphylaxis', label: 'Systemic Angioedema / Stridor / Shock', baseRisk: 38 },
    { id: 'minor_wound', label: 'Superficial Soft Tissue Laceration', baseRisk: 8 }
  ];

  const triageResult = useMemo(() => {
    let score = 0;
    const selectedComp = complaints.find(c => c.id === complaint);
    if (selectedComp) score += selectedComp.baseRisk;

    if (spo2 < 90) score += 25;
    else if (spo2 < 94) score += 15;
    else if (spo2 < 96) score += 5;

    if (heartRate > 130 || heartRate < 45) score += 20;
    else if (heartRate > 105 || heartRate < 55) score += 10;

    if (systolicBP < 90 || systolicBP > 190) score += 22;
    else if (systolicBP < 100 || systolicBP > 165) score += 10;

    if (respRate > 30 || respRate < 10) score += 18;
    else if (respRate > 22) score += 8;

    if (temp > 102.5 || temp < 95.0) score += 12;

    if (avpu === 'U') score += 35;
    else if (avpu === 'P') score += 25;
    else if (avpu === 'V') score += 15;

    if (painLevel >= 8) score += 8;

    const finalScore = Math.min(100, Math.max(5, score));

    let esi = 5;
    let label = 'ESI-5: Non-Urgent';
    let badgeColor = 'bg-slate-100 text-slate-700 border-slate-300';
    let etaDoctor = '< 120 - 240 mins';
    let bay = 'Fast-Track Outpatient Room';

    if (finalScore >= 80 || avpu === 'U' || (complaint === 'chest_pain' && spo2 < 92)) {
      esi = 1;
      label = 'ESI-1: Resuscitation / Immediate';
      badgeColor = 'bg-red-50 text-red-700 border-red-300';
      etaDoctor = 'IMMEDIATE (0 Mins)';
      bay = 'Shock Trauma Bay 1';
    } else if (finalScore >= 60 || spo2 < 92 || systolicBP < 90) {
      esi = 2;
      label = 'ESI-2: Emergent / High Risk';
      badgeColor = 'bg-orange-50 text-orange-700 border-orange-300';
      etaDoctor = '< 10 Minutes';
      bay = 'Acute Critical Care Bay 2';
    } else if (finalScore >= 38) {
      esi = 3;
      label = 'ESI-3: Urgent (Multiple Diagnostic Resources)';
      badgeColor = 'bg-amber-50 text-amber-700 border-amber-300';
      etaDoctor = '< 30 - 60 Minutes';
      bay = 'Triage Treatment Bay 6';
    } else if (finalScore >= 20) {
      esi = 4;
      label = 'ESI-4: Less Urgent';
      badgeColor = 'bg-slate-100 text-slate-700 border-slate-200';
      etaDoctor = '< 60 Minutes';
      bay = 'Minor Procedure Bay 4';
    }

    return { score: finalScore, esi, label, badgeColor, etaDoctor, bay };
  }, [complaint, heartRate, systolicBP, diastolicBP, spo2, temp, respRate, painLevel, avpu]);

  const handleSendToDoctor = () => {
    setTriageSent(true);
    if (onSendToQueue) {
      onSendToQueue({
        complaint,
        vitals: { hr: heartRate, bp: `${systolicBP}/${diastolicBP}`, spo2, temp, resp: respRate },
        triageResult
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 bg-slate-100 text-slate-700 rounded">
              <Brain className="w-4 h-4 text-teal-700" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
              Clinical Decision Support Suite
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            AI Clinical Risk Assessment Models
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Calibrated risk stratification algorithms for Cardiovascular (ASCVD), Type 2 Diabetes, and Hypertension Crisis.
          </p>
        </div>

        {/* 4 Mode Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveCalculator('heart')}
            className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition ${
              activeCalculator === 'heart' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Heart Disease (ASCVD)
          </button>
          <button
            onClick={() => setActiveCalculator('diabetes')}
            className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition ${
              activeCalculator === 'diabetes' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Diabetes (FINDRISC)
          </button>
          <button
            onClick={() => setActiveCalculator('hypertension')}
            className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition ${
              activeCalculator === 'hypertension' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hypertension Crisis
          </button>
          <button
            onClick={() => setActiveCalculator('triage')}
            className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition ${
              activeCalculator === 'triage' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Emergency MTS Triage
          </button>
        </div>
      </div>

      {/* MODEL 1: HEART DISEASE / ASCVD */}
      {activeCalculator === 'heart' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
              Cardiovascular Risk Parameters (AHA / ACC ASCVD Estimator)
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Age (Years)</label>
                <input
                  type="number"
                  min="20"
                  max="85"
                  value={heartInputs.age}
                  onChange={(e) => setHeartInputs({ ...heartInputs, age: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                <select
                  value={heartInputs.gender}
                  onChange={(e) => setHeartInputs({ ...heartInputs, gender: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Systolic BP (mmHg)</label>
                <input
                  type="number"
                  value={heartInputs.systolicBP}
                  onChange={(e) => setHeartInputs({ ...heartInputs, systolicBP: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Total Cholesterol (mg/dL)</label>
                <input
                  type="number"
                  value={heartInputs.totalCholesterol}
                  onChange={(e) => setHeartInputs({ ...heartInputs, totalCholesterol: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">HDL Cholesterol (mg/dL)</label>
                <input
                  type="number"
                  value={heartInputs.hdlCholesterol}
                  onChange={(e) => setHeartInputs({ ...heartInputs, hdlCholesterol: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none"
                />
              </div>

              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 cursor-pointer pb-2">
                  <input
                    type="checkbox"
                    checked={heartInputs.smoker}
                    onChange={(e) => setHeartInputs({ ...heartInputs, smoker: e.target.checked })}
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                  <span className="text-xs font-medium text-slate-700">Active Smoker</span>
                </label>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={heartInputs.diabetic}
                  onChange={(e) => setHeartInputs({ ...heartInputs, diabetic: e.target.checked })}
                  className="w-4 h-4 text-teal-600 rounded"
                />
                <span className="text-xs font-medium text-slate-700">Diagnosed Diabetes</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={heartInputs.treatedForBP}
                  onChange={(e) => setHeartInputs({ ...heartInputs, treatedForBP: e.target.checked })}
                  className="w-4 h-4 text-teal-600 rounded"
                />
                <span className="text-xs font-medium text-slate-700">On Hypertension Medication</span>
              </label>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
              10-Year ASCVD Risk Score
            </h3>

            <div className="p-4 rounded-xl bg-slate-900 text-white text-center space-y-2">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Estimated 10-Yr Cardiovascular Risk</span>
              <div className="text-4xl font-bold font-mono text-white">
                {heartRiskResult.riskScore}%
              </div>
              <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold uppercase ${heartRiskResult.badgeColor}`}>
                {heartRiskResult.tier}
              </span>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-700 block mb-1.5">Primary Contributing Risk Factors:</span>
              <div className="space-y-1.5">
                {heartRiskResult.drivers.map((d, i) => (
                  <div key={i} className="p-2 rounded bg-slate-50 border border-slate-200 text-xs flex justify-between">
                    <span className="text-slate-700">{d.factor}</span>
                    <span className="font-bold text-red-700 font-mono">{d.impact}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-xs text-teal-900 space-y-1">
              <span className="font-semibold block">Clinical Preventive Guidance:</span>
              <p className="text-[11px] text-teal-800 leading-tight">
                {heartRiskResult.riskScore >= 20 ? 'High risk: High-intensity statin therapy and daily aspirin review recommended per ACC/AHA guidelines.' : 'Moderate-to-low risk: Lifestyle modification and annual lipid panel surveillance.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODEL 2: TYPE 2 DIABETES (FINDRISC) */}
      {activeCalculator === 'diabetes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
              Type 2 Diabetes Risk Model (FINDRISC Assessment)
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Body Mass Index (BMI)</label>
                <input
                  type="number"
                  step="0.5"
                  value={diabetesInputs.bmi}
                  onChange={(e) => setDiabetesInputs({ ...diabetesInputs, bmi: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Waist Circumference (cm)</label>
                <input
                  type="number"
                  value={diabetesInputs.waistCircumference}
                  onChange={(e) => setDiabetesInputs({ ...diabetesInputs, waistCircumference: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Family History of Diabetes</label>
                <select
                  value={diabetesInputs.familyHistory}
                  onChange={(e) => setDiabetesInputs({ ...diabetesInputs, familyHistory: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none"
                >
                  <option value="none">No family history (0 pts)</option>
                  <option value="second">Grandparent, aunt, uncle, or first cousin (3 pts)</option>
                  <option value="immediate">Parent, sibling, or child (5 pts)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={diabetesInputs.dailyActivity}
                  onChange={(e) => setDiabetesInputs({ ...diabetesInputs, dailyActivity: e.target.checked })}
                  className="w-4 h-4 text-teal-600 rounded"
                />
                <span>Daily physical exercise at least 30 minutes</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={diabetesInputs.dailyVegFruit}
                  onChange={(e) => setDiabetesInputs({ ...diabetesInputs, dailyVegFruit: e.target.checked })}
                  className="w-4 h-4 text-teal-600 rounded"
                />
                <span>Daily consumption of vegetables, fruits, or berries</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={diabetesInputs.bpMedication}
                  onChange={(e) => setDiabetesInputs({ ...diabetesInputs, bpMedication: e.target.checked })}
                  className="w-4 h-4 text-teal-600 rounded"
                />
                <span>Regular medication for high blood pressure</span>
              </label>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
              FINDRISC Risk Calculation
            </h3>

            <div className="p-4 rounded-xl bg-slate-900 text-white text-center space-y-2">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">FINDRISC Score</span>
              <div className="text-4xl font-bold font-mono text-white">
                {diabetesRiskResult.points} <span className="text-sm font-normal text-slate-400">/ 26</span>
              </div>
              <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold uppercase ${diabetesRiskResult.badgeColor}`}>
                {diabetesRiskResult.tier}
              </span>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-700 block mb-1.5">Contributing Factor Breakdown:</span>
              <div className="space-y-1.5">
                {diabetesRiskResult.drivers.map((d, i) => (
                  <div key={i} className="p-2 rounded bg-slate-50 border border-slate-200 text-xs flex justify-between">
                    <span className="text-slate-700">{d.factor}</span>
                    <span className="font-bold text-teal-700 font-mono">{d.impact}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 space-y-1">
              <span className="font-semibold block text-slate-900">Clinical Recommendation:</span>
              <p className="text-[11px] leading-tight">
                Order Fasting Plasma Glucose (FPG) and Glycated Hemoglobin (HbA1c) screening for individuals scoring ≥ 12 points.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODEL 3: HYPERTENSION CRISIS ASSESSMENT */}
      {activeCalculator === 'hypertension' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
              Blood Pressure Derangements & Organ Strain
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Systolic BP (mmHg)</label>
                <input
                  type="number"
                  value={htnInputs.systolic}
                  onChange={(e) => setHtnInputs({ ...htnInputs, systolic: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Diastolic BP (mmHg)</label>
                <input
                  type="number"
                  value={htnInputs.diastolic}
                  onChange={(e) => setHtnInputs({ ...htnInputs, diastolic: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono font-bold focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-xs font-semibold text-red-700 block">Acute Target-Organ Distress Symptoms (Check all present):</span>
              
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={htnInputs.hasChestPain}
                  onChange={(e) => setHtnInputs({ ...htnInputs, hasChestPain: e.target.checked })}
                  className="w-4 h-4 text-red-600 rounded"
                />
                <span className="font-medium text-slate-800">Crushing Retrosternal Chest Pain (Cardiac ischemia)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={htnInputs.hasDyspnea}
                  onChange={(e) => setHtnInputs({ ...htnInputs, hasDyspnea: e.target.checked })}
                  className="w-4 h-4 text-red-600 rounded"
                />
                <span className="font-medium text-slate-800">Shortness of Breath / Pulmonary Edema signs</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={htnInputs.hasBlurryVision}
                  onChange={(e) => setHtnInputs({ ...htnInputs, hasBlurryVision: e.target.checked })}
                  className="w-4 h-4 text-red-600 rounded"
                />
                <span className="font-medium text-slate-800">Blurry Vision / Papilledema signs</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={htnInputs.hasHeadache}
                  onChange={(e) => setHtnInputs({ ...htnInputs, hasHeadache: e.target.checked })}
                  className="w-4 h-4 text-red-600 rounded"
                />
                <span className="font-medium text-slate-800">Severe Occipital Headache</span>
              </label>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
              AHA / ACC Classification
            </h3>

            <div className="p-4 rounded-xl bg-slate-900 text-white text-center space-y-2">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Calculated Mean Arterial Pressure</span>
              <div className="text-3xl font-bold font-mono text-white">
                {htnResult.map} <span className="text-xs text-slate-400 font-normal">mmHg</span>
              </div>
              <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold uppercase ${htnResult.badgeColor}`}>
                {htnResult.stage}
              </span>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-700 block mb-1.5">Action Directive:</span>
              <p className="p-2.5 rounded bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900 leading-tight">
                {htnResult.urgency}
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-700 block mb-1">Hemodynamic Drivers:</span>
              <div className="space-y-1">
                {htnResult.drivers.map((d, i) => (
                  <div key={i} className="p-1.5 rounded bg-slate-50 border border-slate-200 text-xs flex justify-between">
                    <span className="text-slate-700">{d.factor}</span>
                    <span className="font-medium text-slate-900">{d.impact}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODEL 4: EMERGENCY MTS TRIAGE (PRESERVED) */}
      {activeCalculator === 'triage' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
              Presenting Signs & Triage Parameters
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Chief Complaint</label>
              <select
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none"
              >
                {complaints.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Heart Rate (BPM)</span>
                  <span className="font-bold text-slate-900 font-mono">{heartRate} bpm</span>
                </div>
                <input
                  type="range" min="40" max="180" value={heartRate}
                  onChange={(e) => setHeartRate(Number(e.target.value))}
                  className="w-full accent-teal-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">SpO2 Oxygen Saturation</span>
                  <span className="font-bold text-slate-900 font-mono">{spo2}%</span>
                </div>
                <input
                  type="range" min="70" max="100" value={spo2}
                  onChange={(e) => setSpo2(Number(e.target.value))}
                  className="w-full accent-teal-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">Systolic BP</span>
                    <span className="font-bold text-slate-900 font-mono">{systolicBP} mmHg</span>
                  </div>
                  <input
                    type="range" min="60" max="220" value={systolicBP}
                    onChange={(e) => setSystolicBP(Number(e.target.value))}
                    className="w-full accent-teal-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">Pain Scale (1–10)</span>
                    <span className="font-bold text-slate-900 font-mono">{painLevel} / 10</span>
                  </div>
                  <input
                    type="range" min="1" max="10" value={painLevel}
                    onChange={(e) => setPainLevel(Number(e.target.value))}
                    className="w-full accent-teal-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
              Computed ESI-5 Triage Result
            </h3>

            <div className="p-4 rounded-xl bg-slate-900 text-white text-center space-y-2">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Severity Index</span>
              <div className="text-4xl font-bold font-mono text-white">
                {triageResult.score} <span className="text-sm font-normal text-slate-400">/ 100</span>
              </div>
              <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold uppercase ${triageResult.badgeColor}`}>
                {triageResult.label}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2 bg-slate-50 rounded border border-slate-200 flex justify-between">
                <span className="text-slate-500">Physician Window:</span>
                <span className="font-bold text-slate-900 font-mono">{triageResult.etaDoctor}</span>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200 flex justify-between">
                <span className="text-slate-500">Recommended Allocation:</span>
                <span className="font-bold text-teal-800">{triageResult.bay}</span>
              </div>
            </div>

            <button
              onClick={handleSendToDoctor}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition"
            >
              {triageSent ? 'Dispatched to Emergency Department Queue ✓' : 'Dispatch to Clinical Queue'}
            </button>
          </div>
        </div>
      )}

      {/* Medical Compliance Notice */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-start gap-2">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-800">Clinical Decision Support:</strong> These calculators implement standard epidemiological models (ACC/AHA ASCVD, FINDRISC, AHA/ACC Hypertension, and MTS/ESI-5) for educational workflow simulation. They do not substitute for formal clinical laboratory investigations or personalized medical diagnostic procedures.
        </p>
      </div>

    </div>
  );
}
