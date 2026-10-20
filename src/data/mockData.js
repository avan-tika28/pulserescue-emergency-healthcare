// PulseRescue Emergency Healthcare Management Platform - Core Operational Data

export const HOSPITAL_METRICS = {
  facilityName: "Apex Trauma & Regional Resuscitation Center",
  status: "Operational - Normal Triage Flow",
  activeEmergencyCases: 28,
  criticalTriageCount: 4,
  icuBedsTotal: 24,
  icuBedsOccupied: 20,
  generalBedsTotal: 60,
  generalBedsOccupied: 46,
  ambulancesTotal: 16,
  ambulancesDispatched: 11,
  avgDispatchTimeMinutes: 5.4,
  avgERAdmitTimeMinutes: 13.8,
  triagedTodayCount: 156,
  resuscitationReadiness: "100% Operational"
};

// Hourly intake volume for the last 24 hours (clinical operational chart)
export const HOURLY_ADMISSION_TRENDS = [
  { hour: "00:00", admissions: 4, critical: 1 },
  { hour: "02:00", admissions: 3, critical: 1 },
  { hour: "04:00", admissions: 2, critical: 0 },
  { hour: "06:00", admissions: 5, critical: 1 },
  { hour: "08:00", admissions: 12, critical: 2 },
  { hour: "10:00", admissions: 18, critical: 3 },
  { hour: "12:00", admissions: 16, critical: 2 },
  { hour: "14:00", admissions: 14, critical: 2 },
  { hour: "16:00", admissions: 19, critical: 4 },
  { hour: "18:00", admissions: 22, critical: 3 },
  { hour: "20:00", admissions: 25, critical: 4 },
  { hour: "22:00", admissions: 16, critical: 2 }
];

export const EMERGENCY_INCIDENTS = [
  {
    id: "INC-9042",
    timestamp: "2 mins ago",
    type: "Cardiac Arrest (Suspected STEMI)",
    severity: "CRITICAL",
    esiLevel: 1,
    location: "Metro Station Gate 4, Tech Corridor",
    coordinates: "12.9716° N, 77.5946° E",
    caller: "On-site Security Supervisor",
    assignedUnit: "ALS-Ambulance #04 (Advanced Life Support)",
    etaMinutes: 3,
    status: "EN_ROUTE",
    telemetry: {
      hr: 142,
      spo2: 89,
      bp: "85/55",
      rhythm: "Ventricular Tachycardia"
    }
  },
  {
    id: "INC-9041",
    timestamp: "8 mins ago",
    type: "Highway Multi-Vehicle Collision",
    severity: "HIGH",
    esiLevel: 2,
    location: "Outer Ring Road, Pillar 148",
    coordinates: "12.9352° N, 77.6245° E",
    caller: "Highway Patrol Dispatch",
    assignedUnit: "Trauma-Ambulance #12 & Fire Rescue",
    etaMinutes: 6,
    status: "ON_SCENE",
    telemetry: {
      hr: 118,
      spo2: 93,
      bp: "105/70",
      rhythm: "Sinus Tachycardia"
    }
  },
  {
    id: "INC-9039",
    timestamp: "17 mins ago",
    type: "Acute Anaphylactic Shock",
    severity: "HIGH",
    esiLevel: 2,
    location: "Innovation Hub, Block C",
    coordinates: "12.9840° N, 77.6080° E",
    caller: "Corporate Health Officer",
    assignedUnit: "Rapid Response Unit #08",
    etaMinutes: 1,
    status: "IN_TRANSIT",
    telemetry: {
      hr: 128,
      spo2: 91,
      bp: "90/60",
      rhythm: "Sinus Tachycardia"
    }
  },
  {
    id: "INC-9035",
    timestamp: "32 mins ago",
    type: "Severe Asthma Attack (Hypoxia)",
    severity: "MODERATE",
    esiLevel: 3,
    location: "University Campus, North Gate",
    coordinates: "12.9220° N, 77.5810° E",
    caller: "Resident Health Staff",
    assignedUnit: "BLS-Ambulance #02",
    etaMinutes: 0,
    status: "ARRIVED_ER",
    telemetry: {
      hr: 104,
      spo2: 94,
      bp: "120/80",
      rhythm: "Normal Sinus"
    }
  }
];

export const TRIAGE_PATIENTS = [
  {
    id: "PT-2026-881",
    name: "Arun Krishnan",
    age: 58,
    gender: "Male",
    bloodGroup: "O+",
    healthId: "PR-MED-8819",
    esi: 1,
    triageCategory: "Immediate / Resuscitation",
    badgeColor: "bg-red-50 text-red-700 border border-red-200",
    complaint: "Crushing retrosternal chest pain radiating to left arm, diaphoresis",
    vitals: { hr: 138, bp: "88/54", spo2: 90, temp: 98.4, resp: 28 },
    doctor: "Dr. Anita Desai (Trauma Chief)",
    assignedBay: "Shock Trauma Bay 1",
    status: "Cath Lab Activated",
    arrivalTime: "10:14 AM",
    allergies: ["Penicillin", "Aspirin"],
    riskScore: 96
  },
  {
    id: "PT-2026-879",
    name: "Sneha Mukherjee",
    age: 29,
    gender: "Female",
    bloodGroup: "B+",
    healthId: "PR-MED-4421",
    esi: 2,
    triageCategory: "Emergent",
    badgeColor: "bg-orange-50 text-orange-700 border border-orange-200",
    complaint: "Blunt abdominal trauma post-vehicle collision, localized guarding",
    vitals: { hr: 112, bp: "102/68", spo2: 96, temp: 98.9, resp: 22 },
    doctor: "Dr. Vikram Seth (Emergency Surgeon)",
    assignedBay: "Acute Trauma Bay 3",
    status: "FAST Ultrasound In-Progress",
    arrivalTime: "10:25 AM",
    allergies: ["Sulfa Drugs"],
    riskScore: 78
  },
  {
    id: "PT-2026-875",
    name: "Robert D'Souza",
    age: 71,
    gender: "Male",
    bloodGroup: "A-",
    healthId: "PR-MED-1904",
    esi: 2,
    triageCategory: "Emergent (Stroke Alert)",
    badgeColor: "bg-orange-50 text-orange-700 border border-orange-200",
    complaint: "Sudden right facial droop & expressive aphasia (FAST score positive)",
    vitals: { hr: 94, bp: "178/104", spo2: 97, temp: 98.6, resp: 18 },
    doctor: "Dr. Meera Nambiar (Neurologist)",
    assignedBay: "Stroke Care Bay 2",
    status: "Non-Contrast Head CT Ready",
    arrivalTime: "10:32 AM",
    allergies: ["None Reported"],
    riskScore: 84
  },
  {
    id: "PT-2026-868",
    name: "Kavya Patel",
    age: 19,
    gender: "Female",
    bloodGroup: "AB+",
    healthId: "PR-MED-7312",
    esi: 3,
    triageCategory: "Urgent",
    badgeColor: "bg-amber-50 text-amber-700 border border-amber-200",
    complaint: "Right lower quadrant abdominal pain, nausea, focal tenderness",
    vitals: { hr: 98, bp: "118/74", spo2: 99, temp: 101.2, resp: 20 },
    doctor: "Dr. Rajesh Gupta",
    assignedBay: "Triage Bed 8",
    status: "Awaiting Blood Panel & USG",
    arrivalTime: "09:50 AM",
    allergies: ["Ibuprofen"],
    riskScore: 48
  },
  {
    id: "PT-2026-854",
    name: "David Chen",
    age: 42,
    gender: "Male",
    bloodGroup: "O-",
    healthId: "PR-MED-6209",
    esi: 4,
    triageCategory: "Less Urgent",
    badgeColor: "bg-slate-100 text-slate-700 border border-slate-200",
    complaint: "Forearm laceration, active capillary bleeding controlled",
    vitals: { hr: 78, bp: "124/80", spo2: 99, temp: 98.2, resp: 16 },
    doctor: "Dr. Sunita Rao",
    assignedBay: "Minor Procedure Room 2",
    status: "Suturing in progress",
    arrivalTime: "09:30 AM",
    allergies: ["Latex"],
    riskScore: 22
  }
];

export const DEMO_PRESET_PATIENTS = [
  {
    fullName: "Priya Sharma",
    age: "34",
    gender: "Female",
    bloodGroup: "O+",
    phone: "+91 98450 12345",
    emergencyContactName: "Rohan Sharma (Spouse)",
    emergencyContactPhone: "+91 98450 67890",
    allergies: "Penicillin, Peanuts",
    chronicConditions: "Mild Asthma, Migraines",
    medications: "Albuterol inhaler as needed",
    organDonor: true,
    address: "Green Glen Layout, Bellandur, Bengaluru",
    insuranceProvider: "Premier Emergency Health Policy",
    policyNumber: "POL-99201-EMRG"
  },
  {
    fullName: "Karthik Sundaram",
    age: "62",
    gender: "Male",
    bloodGroup: "A+",
    phone: "+91 97110 54321",
    emergencyContactName: "Deepa Sundaram (Daughter)",
    emergencyContactPhone: "+91 97110 98765",
    allergies: "Sulfa antibiotics",
    chronicConditions: "Type 2 Diabetes, Hypertension, Coronary Stent (2023)",
    medications: "Metformin 500mg, Telmisartan 40mg, Clopidogrel 75mg",
    organDonor: true,
    address: "4th Cross, Malleshwaram, Bengaluru",
    insuranceProvider: "National Comprehensive Health Card",
    policyNumber: "POL-44810-CARD"
  }
];

export const SAMPLE_REPORTS = [
  {
    id: "rep-cardiac",
    title: "Emergency Cardiac Biomarker Panel",
    date: "Today, 10:20 AM",
    patientName: "Arun Krishnan (58M)",
    patientId: "PT-2026-881",
    lab: "Apex Central Trauma Pathology Core",
    overallAssessment: "CRITICAL: Acute Myocardial Injury Detected",
    summaryText: "Markedly elevated High-Sensitivity Cardiac Troponin-I and CK-MB with ischemic ECG correlations indicating high probability of Acute Coronary Syndrome (NSTEMI/STEMI). Immediate catheterization triage recommended.",
    biomarkers: [
      { name: "High-Sensitivity Troponin I", value: "2.84", unit: "ng/mL", normalRange: "< 0.04", status: "CRITICAL HIGH", flag: "critical" },
      { name: "CK-MB Isoenzyme", value: "48.2", unit: "U/L", normalRange: "0 - 25", status: "HIGH", flag: "high" },
      { name: "B-Type Natriuretic Peptide (BNP)", value: "620", unit: "pg/mL", normalRange: "< 100", status: "ELEVATED", flag: "high" },
      { name: "Serum Potassium (K+)", value: "3.7", unit: "mEq/L", normalRange: "3.5 - 5.0", status: "NORMAL", flag: "normal" },
      { name: "D-Dimer", value: "380", unit: "ng/mL", normalRange: "< 500", status: "NORMAL", flag: "normal" }
    ],
    doctorRecommendations: [
      "Immediate STAT notification to Interventional Cardiology team.",
      "Dual Antiplatelet Therapy (DAPT) protocol per hospital standard guidelines.",
      "Continuous 12-lead ECG telemetry monitoring and telemetry defibrillator on standby.",
      "Supplemental oxygen titrating to maintain SpO2 >= 94%."
    ],
    patientFriendlyExplanation: "The blood test reveals elevated heart muscle injury proteins (Troponin), which indicates your heart muscle is undergoing stress and lack of blood flow. The medical team is preparing the cardiac catheterization lab to evaluate and open any blood vessel blockages promptly."
  },
  {
    id: "rep-sepsis",
    title: "Critical Sepsis & Hematology Workup",
    date: "Today, 09:45 AM",
    patientName: "Sneha Mukherjee (29F)",
    patientId: "PT-2026-879",
    lab: "Emergency Rapid Diagnostics Core",
    overallAssessment: "HIGH ALERT: Leukocytosis with Lactic Acidemia",
    summaryText: "Elevated White Blood Cell count (19,400) with prominent left shift and elevated blood lactate (3.6 mmol/L) signifies significant systemic physiological stress and hypoperfusion.",
    biomarkers: [
      { name: "White Blood Cells (WBC)", value: "19.4", unit: "x10^3/uL", normalRange: "4.5 - 11.0", status: "CRITICAL HIGH", flag: "critical" },
      { name: "Serum Lactate", value: "3.6", unit: "mmol/L", normalRange: "0.5 - 2.0", status: "HIGH", flag: "high" },
      { name: "Platelet Count", value: "165", unit: "x10^3/uL", normalRange: "150 - 450", status: "LOW NORMAL", flag: "normal" },
      { name: "C-Reactive Protein (CRP)", value: "68.4", unit: "mg/L", normalRange: "< 5.0", status: "HIGH", flag: "high" },
      { name: "Hemoglobin (Hb)", value: "9.8", unit: "g/dL", normalRange: "12.0 - 15.5", status: "MILD ANEMIA", flag: "warning" }
    ],
    doctorRecommendations: [
      "Initiate rapid IV crystalloid resuscitation (30 mL/kg within 3 hours).",
      "Obtain two sets of blood cultures prior to broad-spectrum IV antimicrobial administration.",
      "Repeat serial lactate testing every 2 hours to evaluate clearance rate.",
      "Maintain continuous arterial line or automated blood pressure monitoring for MAP >= 65 mmHg."
    ],
    patientFriendlyExplanation: "The body is showing signs of intense inflammatory reaction and fight against infection or injury, which is raising your white blood cells and lactate. The doctors are supplying targeted intravenous fluids and medicines to support your organs and restore blood flow."
  },
  {
    id: "rep-metabolic",
    title: "Diabetic Ketoacidosis & Renal Function Panel",
    date: "Today, 08:30 AM",
    patientName: "Karthik Sundaram (62M)",
    patientId: "PT-2026-860",
    lab: "Biochemical Emergency Core",
    overallAssessment: "MODERATE-HIGH: Hyperglycemia with Electrolyte Shift",
    summaryText: "Random Blood Glucose 386 mg/dL with positive serum ketones and expanded anion gap. Requires structured IV insulin and potassium maintenance.",
    biomarkers: [
      { name: "Blood Glucose (Stat)", value: "386", unit: "mg/dL", normalRange: "70 - 140", status: "CRITICAL HIGH", flag: "critical" },
      { name: "Serum Ketones", value: "Positive (++)", unit: "qualitative", normalRange: "Negative", status: "ABNORMAL", flag: "critical" },
      { name: "Venous Blood pH", value: "7.24", unit: "pH units", normalRange: "7.31 - 7.41", status: "ACIDOSIS", flag: "high" },
      { name: "Serum Creatinine", value: "1.6", unit: "mg/dL", normalRange: "0.7 - 1.3", status: "ELEVATED", flag: "warning" },
      { name: "Sodium (Na+)", value: "132", unit: "mEq/L", normalRange: "136 - 145", status: "MILD HYPONATREMIA", flag: "warning" }
    ],
    doctorRecommendations: [
      "Initiate low-dose IV Regular Insulin infusion protocol.",
      "Hourly point-of-care glucose monitoring and 2-hourly venous blood gas checks.",
      "Fluid replacement with 0.9% Normal Saline; add Dextrose once glucose falls below 250 mg/dL.",
      "Monitor serum potassium vigilantly before and during insulin therapy."
    ],
    patientFriendlyExplanation: "Your blood sugar level is elevated, causing temporary acidity in your bloodstream. You are receiving monitored fluids and insulin to gently bring your sugars back into the safe zone while protecting your kidneys."
  }
];

// Multilingual First-Aid Protocols (English, Tamil, Hindi)
export const MULTILINGUAL_FIRST_AID = {
  cpr: {
    id: "cpr",
    category: "Cardiac & Breathing",
    bpmTarget: 110,
    hasMetronome: true,
    en: {
      title: "Adult CPR (Cardiopulmonary Resuscitation)",
      urgency: "LIFE-THREATENING",
      steps: [
        {
          step: 1,
          title: "Check Responsiveness & Alert Emergency Response",
          desc: "Tap victim's collarbone firmly and call out. If unresponsive and not breathing normally, trigger Emergency Response and call for an AED immediately."
        },
        {
          step: 2,
          title: "Position Hands on Center of Chest",
          desc: "Place the heel of one hand on the center of the chest (lower half of breastbone). Interlock fingers with the other hand. Keep arms straight and shoulders positioned directly over hands."
        },
        {
          step: 3,
          title: "Deliver Firm, Rapid Compressions (100–120 BPM)",
          desc: "Compress chest at least 2 inches (5 cm) deep at a steady pace. Allow full chest recoil between compressions. Use the 110 BPM metronome rhythm below."
        },
        {
          step: 4,
          title: "30 Compressions to 2 Rescue Breaths",
          desc: "Deliver 30 compressions followed by 2 gentle breaths if trained. If untrained or uncertain, perform continuous Hands-Only CPR without pause until emergency responders arrive."
        }
      ],
      criticalTips: [
        "Do not interrupt compressions for more than 10 seconds.",
        "Position patient on a firm, flat surface (floor), not a mattress.",
        "Alternate compressors every 2 minutes to prevent fatigue."
      ]
    },
    ta: {
      title: "பெரியவர்களுக்கான CPR (இதய-சுவாச புத்துயிரூட்டல்)",
      urgency: "உயிர் ஆபத்தானது",
      steps: [
        {
          step: 1,
          title: "நினைவை சோதித்து அவசர உதவியை அழைக்கவும்",
          desc: "தோள்பட்டையை மெதுவாக தட்டி அழைக்கவும். எந்த பதிலும் இல்லை மற்றும் சுவாசம் இல்லையெனில், உடனடியாக அவசர உதவியை அழைத்து AED கருவியை வரவழைக்கவும்."
        },
        {
          step: 2,
          title: "மார்பின் மையத்தில் கைகளை வைக்கவும்",
          desc: "மார்பெலும்பின் கீழ் பாதியில் ஒரு கையின் உள்ளங்கையை வைக்கவும். மற்றொரு கையின் விரல்களை அதன் மேல் கோர்த்து வைக்கவும். முழங்கைகளை நேராக வைக்கவும்."
        },
        {
          step: 3,
          title: "வேகமாகவும் ஆழமாகவும் அழுத்தவும் (100 - 120 BPM)",
          desc: "மார்பை குறைந்தது 2 அங்குலம் (5 செ.மீ) ஆழத்திற்கு அழுத்தவும். கீழே உள்ள 110 BPM ஒலி வழிகாட்டியைப் பயன்படுத்தி சரியான வேகத்தில் அழுத்தவும்."
        },
        {
          step: 4,
          title: "30 அழுத்தங்கள் மற்றும் 2 சுவாசங்கள்",
          desc: "பயிற்சி பெற்றிருந்தால் 30 முறை நெஞ்சை அழுத்திய பின் 2 முறை செயற்கை சுவாசம் அளிக்கவும். பயிற்சி இல்லாவிடில் மருத்துவர் வரும் வரை தொடர்ந்து கைகளால் மட்டுமே அழுத்தவும்."
        }
      ],
      criticalTips: [
        "10 வினாடிகளுக்கு மேல் அழுத்தத்தை ஒருபோதும் நிறுத்த வேண்டாம்.",
        "பாதிக்கப்பட்டவரை மெத்தையில் அல்லாமல் தட்டையான கடினமான தரையில் படுக்க வைக்கவும்.",
        "களைப்பைத் தவிர்க்க 2 நிமிடங்களுக்கு ஒருமுறை அடுத்தவரிடம் மாற்றவும்."
      ]
    },
    hi: {
      title: "वयस्कों के लिए सीपीआर (हृदय-श्वसन पुनर्जीवन)",
      urgency: "जीवन के लिए गंभीर खतरा",
      steps: [
        {
          step: 1,
          title: "प्रतिक्रिया जांचें और आपातकालीन सहायता बुलाएं",
          desc: "कंधे को हल्के से थपथपाएं और पूछें 'क्या आप ठीक हैं?'. यदि कोई प्रतिक्रिया नहीं है और सांस नहीं चल रही है, तो तुरंत आपातकालीन सहायता बुलाएं."
        },
        {
          step: 2,
          title: "छाती के केंद्र पर हाथ रखें",
          desc: "छाती की हड्डी के निचले आधे हिस्से पर एक हाथ की हथेली रखें. दूसरे हाथ की उंगलियों को आपस में फंसाएं. कोहनियों को पूरी तरह सीधा रखें."
        },
        {
          step: 3,
          title: "तेजी से और मजबूती से दबाएं (100 - 120 BPM)",
          desc: "छाती को कम से कम 2 इंच (5 सेमी) गहरा दबाएं. प्रत्येक दबाव के बाद छाती को पूरी तरह वापस आने दें. नीचे दिए गए 110 BPM मेट्रोनोम का पालन करें."
        },
        {
          step: 4,
          title: "30 दबाव और 2 सांसें",
          desc: "यदि प्रशिक्षित हैं तो 30 बार छाती दबाने के बाद 2 बार सांस दें. यदि अप्रशिक्षित हैं, तो पैरामेडिक्स के आने तक लगातार केवल हाथों से सीपीआर जारी रखें."
        }
      ],
      criticalTips: [
        "10 सेकंड से अधिक समय तक दबाव प्रक्रिया न रोकें.",
        "रोगी को गद्दे पर नहीं, बल्कि समतल और कठोर फर्श पर लिटाएं.",
        "थकावट से बचने के लिए हर 2 मिनट में दूसरे व्यक्ति की मदद लें."
      ]
    }
  },
  bleeding: {
    id: "bleeding",
    category: "Trauma & Wounds",
    bpmTarget: null,
    hasMetronome: false,
    en: {
      title: "Severe Hemorrhage & Bleeding Control",
      urgency: "CRITICAL",
      steps: [
        {
          step: 1,
          title: "Direct Sustained Firm Pressure",
          desc: "Cover the wound with a clean sterile dressing, cloth, or gauze. Press down firmly with both hands directly over the bleeding site without lifting."
        },
        {
          step: 2,
          title: "Maintain Pressure for At Least 5 Minutes",
          desc: "Do not lift dressing to inspect the wound; early blood clots break easily. If blood soaks through, place another layer directly on top."
        },
        {
          step: 3,
          title: "Apply Tourniquet for Life-Threatening Limb Bleeding",
          desc: "If severe arterial bleeding on an arm or leg cannot be controlled with direct pressure, place a tourniquet 2-3 inches above the wound (never over a joint) and tighten until bleeding ceases."
        },
        {
          step: 4,
          title: "Manage Shock and Maintain Body Heat",
          desc: "Keep the patient lying flat, elevate legs if no spinal trauma is suspected, and cover with a blanket while waiting for transport."
        }
      ],
      criticalTips: [
        "Record the exact time of tourniquet placement.",
        "Never remove embedded impaled objects; secure dressing around them.",
        "Do not apply a tourniquet directly over a joint."
      ]
    },
    ta: {
      title: "கடும் இரத்தப்போக்கு கட்டுப்பாடு",
      urgency: "அவசரம்",
      steps: [
        {
          step: 1,
          title: "நேரடி தொடர் அழுத்தம்",
          desc: "காயத்தின் மீது ஒரு சுத்தமான துணி அல்லது காஸ் வைத்து இரு கைகளாலும் நேரடியாக உறுதியாக அழுத்தவும்."
        },
        {
          step: 2,
          title: "குறைந்தது 5 நிமிடங்கள் அழுத்தத்தை தொடரவும்",
          desc: "துணியை தூக்கி பார்க்க வேண்டாம்; இரத்தம் உறைவது பாதிக்கப்படும். இரத்தம் ஊறி வெளியேறினால் மேலே மற்றொரு துணியை வைத்து அழுத்தவும்."
        },
        {
          step: 3,
          title: "கைகால் இரத்தப்போக்கிற்கு டார்னிகேட் (Tourniquet) கட்டவும்",
          desc: "அழுத்தியும் இரத்தம் நிற்கவில்லை என்றால், காயத்திற்கு 2-3 அங்குலம் மேலே ஒரு டார்னிகேட் பட்டையை இறுகக் கட்டவும் (மூட்டுகளின் மேல் கட்டக்கூடாது)."
        },
        {
          step: 4,
          title: "அதிர்ச்சியை தடுத்து உடல் வெப்பத்தை பராமரிக்கவும்",
          desc: "பாதிக்கப்பட்டவரை படுக்க வைத்து, போர்வையால் போர்த்தி கதகதப்பாக வைக்கவும்."
        }
      ],
      criticalTips: [
        "டார்னிகேட் கட்டிய நேரத்தை குறித்து வைக்கவும்.",
        "காயத்தில் குத்தியுள்ள பொருட்களை வெளியே இழுக்க வேண்டாம்; அவற்றை சுற்றி கட்டு போடவும்.",
        "மூட்டுகளின் மீது ஒருபோதும் டார்னிகேட் கட்டக்கூடாது."
      ]
    },
    hi: {
      title: "गंभीर रक्तस्राव नियंत्रण",
      urgency: "गंभीर आपातकाल",
      steps: [
        {
          step: 1,
          title: "सीधा और निरंतर दबाव डालें",
          desc: "घाव पर साफ बाँझ पट्टी या कपड़ा रखें. दोनों हाथों से सीधे घाव पर मजबूती से दबाव बनाएं."
        },
        {
          step: 2,
          title: "कम से कम 5 मिनट तक दबाव बनाए रखें",
          desc: "पट्टी उठाकर न देखें; इससे थक्का टूट सकता है. यदि खून बहना जारी रहे, तो ऊपर से एक और कपड़ा रखकर दबाएं."
        },
        {
          step: 3,
          title: "गंभीर अंग रक्तस्राव के लिए टूर्निकेट लगाएं",
          desc: "यदि हाथ या पैर से गंभीर रक्तस्राव न रुके, तो घाव से 2-3 इंच ऊपर टूर्निकेट कसकर बांधें (जोड़ पर कभी न बांधें)."
        },
        {
          step: 4,
          title: "शॉक से बचाएं और शरीर गर्म रखें",
          desc: "मरीज को सीधा लिटाएं और कंबल से ढकें ताकि शरीर का तापमान सामान्य रहे."
        }
      ],
      criticalTips: [
        "टूर्निकेट लगाने का सटीक समय नोट करें.",
        "घाव में धंसी हुई नुकीली वस्तुओं को न निकालें; उनके आसपास सहारा देकर पट्टी बांधें.",
        "जोड़ों (Joints) पर टूर्निकेट न लगाएं."
      ]
    }
  },
  stroke: {
    id: "stroke",
    category: "Neurological",
    bpmTarget: null,
    hasMetronome: false,
    en: {
      title: "Acute Stroke - The F.A.S.T. Assessment",
      urgency: "TIME-CRITICAL",
      steps: [
        {
          step: 1,
          title: "F - Facial Drooping",
          desc: "Ask the person to smile. Does one side of the face droop or appear asymmetric?"
        },
        {
          step: 2,
          title: "A - Arm Weakness",
          desc: "Ask the person to raise both arms. Does one arm drift downward or cannot be lifted?"
        },
        {
          step: 3,
          title: "S - Speech Difficulty",
          desc: "Ask the person to repeat a simple sentence. Is speech slurred, strange, or absent?"
        },
        {
          step: 4,
          title: "T - Time to Alert Emergency Response",
          desc: "If any sign is present, activate emergency response immediately. Brain tissue degrades rapidly; note exact onset time."
        }
      ],
      criticalTips: [
        "Do NOT administer aspirin until head CT confirms ischemic vs hemorrhagic stroke.",
        "Do NOT provide oral fluids or medications due to aspiration risk.",
        "Position patient on side (recovery position) if consciousness is reduced."
      ]
    },
    ta: {
      title: "பக்கவாதம் (Stroke) - F.A.S.T. பரிசோதனை",
      urgency: "நேரம் மிக முக்கியமானது",
      steps: [
        {
          step: 1,
          title: "F - முக சாய்வு (Face)",
          desc: "சிரிக்கச் சொல்லுங்கள். முகத்தின் ஒரு பக்கம் கோணலாகிறதா அல்லது தொங்குகிறதா?"
        },
        {
          step: 2,
          title: "A - கை பலவீனம் (Arm)",
          desc: "இரு கைகளையும் மேலே தூக்கச் சொல்லுங்கள். ஒரு கை கீழே சரிகிறதா அல்லது தூக்க முடியவில்லையா?"
        },
        {
          step: 3,
          title: "S - பேச்சு தடுமாற்றம் (Speech)",
          desc: "ஒரு எளிய வாக்கியத்தை பேசச் சொல்லுங்கள். பேச்சு குழறுகிறதா அல்லது பேச முடியவில்லையா?"
        },
        {
          step: 4,
          title: "T - அவசர சிகிச்சைக்கான நேரம் (Time)",
          desc: "இந்த அறிகுறிகளில் ஏதேனும் ஒன்று இருந்தாலும், உடனே அவசர மருத்துவ பிரிவை அழைக்கவும். அறிகுறிகள் தொடங்கிய நேரத்தை குறித்து வைக்கவும்."
        }
      ],
      criticalTips: [
        "சிடி ஸ்கேன் (CT Scan) செய்யும் வரை ஆஸ்பிரின் மாத்திரை கொடுக்க வேண்டாம்.",
        "தண்ணீர் அல்லது உணவு கொடுக்க வேண்டாம் (விழுங்கும் திறன் பாதிக்கப்பட்டிருக்கலாம்).",
        "சுயநினைவு குறைந்தால் ஒருக்களித்து படுக்க வைக்கவும்."
      ]
    },
    hi: {
      title: "स्ट्रोक (लकवा) - F.A.S.T. प्रोटोकॉल",
      urgency: "अत्यधिक समय-संवेदनशील",
      steps: [
        {
          step: 1,
          title: "F - चेहरा झुकना (Face)",
          desc: "मुस्कुराने के लिए कहें. क्या चेहरे का एक हिस्सा झुक रहा है या टेढ़ा हो रहा है?"
        },
        {
          step: 2,
          title: "A - हाथ की कमजोरी (Arm)",
          desc: "दोनों हाथ ऊपर उठाने को कहें. क्या एक हाथ नीचे गिर रहा है या कमजोर है?"
        },
        {
          step: 3,
          title: "S - बोलने में कठिनाई (Speech)",
          desc: "एक साधारण वाक्य बोलने को कहें. क्या आवाज लड़खड़ा रही है या बोली बंद है?"
        },
        {
          step: 4,
          title: "T - तुरंत सहायता का समय (Time)",
          desc: "इनमें से कोई भी लक्षण दिखने पर तुरंत आपातकालीन सहायता लें और लक्षण शुरू होने का समय नोट करें."
        }
      ],
      criticalTips: [
        "सीटी स्कैन से पहले एस्पिरिन न दें.",
        "मरीज को पानी या खाना न दें क्योंकि निगलने की क्षमता प्रभावित हो सकती है.",
        "उल्टी की स्थिति में मरीज को करवट दिलाकर लिटाएं."
      ]
    }
  },
  choking: {
    id: "choking",
    category: "Airway Obstruction",
    bpmTarget: null,
    hasMetronome: false,
    en: {
      title: "Choking Emergency - Heimlich Maneuver",
      urgency: "LIFE-THREATENING",
      steps: [
        {
          step: 1,
          title: "Verify Airway Obstruction",
          desc: "Ask 'Are you choking?'. If they can cough forcefully or speak, encourage coughing. If unable to breathe, cough, or speak, initiate assistance."
        },
        {
          step: 2,
          title: "Deliver 5 Firm Back Blows",
          desc: "Stand behind the patient, lean them forward slightly, and deliver 5 firm blows between the shoulder blades with the heel of your hand."
        },
        {
          step: 3,
          title: "Deliver 5 Inward & Upward Abdominal Thrusts",
          desc: "Make a fist with one hand placed just above the navel. Grasp fist with your other hand and thrust sharply inward and upward."
        },
        {
          step: 4,
          title: "Alternate Until Airway is Clear",
          desc: "Repeat 5 back blows and 5 abdominal thrusts. If patient loses responsiveness, lower them safely to the floor and initiate CPR."
        }
      ],
      criticalTips: [
        "For pregnant women or infants, perform chest thrusts instead of abdominal thrusts.",
        "Never perform blind finger sweeps in the oral cavity.",
        "All choking victims receiving thrusts should have a clinical assessment."
      ]
    },
    ta: {
      title: "தொண்டையில் உணவு அடைத்தால் - ஹெய்ம்லிச் முறை",
      urgency: "உயிர் ஆபத்தானது",
      steps: [
        {
          step: 1,
          title: "சுவாச அடைப்பை உறுதிப்படுத்தவும்",
          desc: "அவர்களால் இரும அல்லது பேச முடிகிறதா என்று பார்க்கவும். பேசவோ சுவாசிக்கவோ முடியாவிட்டால் உடனடியாக உதவவும்."
        },
        {
          step: 2,
          title: "முதுகில் 5 முறை தட்டவும்",
          desc: "அவர்களுக்குப் பின்னால் நின்று, உடலை சற்று முன்னோக்கி சாய்த்து, தோள்பட்டைகளுக்கு நடுவில் உங்கள் உள்ளங்கையால் 5 முறை பலமாக தட்டவும்."
        },
        {
          step: 3,
          title: "வயிற்றை 5 முறை மேல்நோக்கி அழுத்தவும் (Heimlich)",
          desc: "தொப்புளுக்கு சற்று மேலே ஒரு கையை முஷ்டியாக வைத்து, மற்றொரு கையால் பிடித்து உள்நோக்கியும் மேல்நோக்கியும் 5 முறை வேகமாக அழுத்தவும்."
        },
        {
          step: 4,
          title: "அடைப்பு நீங்கும் வரை தொடரவும்",
          desc: "5 முதுகு தட்டல்கள் மற்றும் 5 வயிற்று அழுத்தங்களை மாறி மாறி செய்யவும். நோயாளி மயக்கமடைந்தால் உடனடியாக CPR தொடங்கவும்."
        }
      ],
      criticalTips: [
        "கர்ப்பிணிப் பெண்களுக்கு வயிற்றுக்கு பதிலாக மார்பில் அழுத்தவும்.",
        "வாய்க்குள் தெரியாத பொருட்களை விரல் விட்டு எடுக்க முயற்சிக்க வேண்டாம்.",
        "அடைப்பு நீங்கிய பின்னரும் மருத்துவரிடம் காண்பிக்க வேண்டும்."
      ]
    },
    hi: {
      title: "दम घुटना / गले में फंसाव - हेमलिच पैंतरेबाज़ी",
      urgency: "जीवन के लिए गंभीर खतरा",
      steps: [
        {
          step: 1,
          title: "अवरोध की जांच करें",
          desc: "पूछें 'क्या आपका दम घुट रहा है?'. यदि वे बोल या खांस नहीं पा रहे हैं, तो तुरंत सहायता शुरू करें."
        },
        {
          step: 2,
          title: "पीठ पर 5 बार थपथपाएं",
          desc: "मरीज के पीछे खड़े हों, उन्हें थोड़ा आगे झुकाएं और दोनों कंधों के बीच हथेली से 5 बार मजबूती से थपथपाएं."
        },
        {
          step: 3,
          title: "पेट पर 5 बार अंदर और ऊपर की ओर झटका दें",
          desc: "नाभि के ठीक ऊपर एक मुट्ठी रखें, दूसरे हाथ से पकड़ें और अंदर-ऊपर की ओर तेज झटका दें."
        },
        {
          step: 4,
          title: "अवरोध हटने तक जारी रखें",
          desc: "5 बार पीठ थपथपाना और 5 बार पेट का झटका बारी-बारी से करें. यदि मरीज बेहोश हो जाए, तो तुरंत सीपीआर शुरू करें."
        }
      ],
      criticalTips: [
        "गर्भवती महिलाओं के लिए पेट के बजाय छाती पर दबाव दें.",
        "मुंह में अंधाधुंध उंगली डालकर वस्तु निकालने की कोशिश न करें.",
        "सफल होने के बाद भी आंतरिक चोटों की जांच के लिए डॉक्टर को दिखाएं."
      ]
    }
  },
  burns: {
    id: "burns",
    category: "Thermal Injury",
    bpmTarget: null,
    hasMetronome: false,
    en: {
      title: "Severe Burns & Scalds Management",
      urgency: "URGENT",
      steps: [
        {
          step: 1,
          title: "Cool Under Running Water for 20 Minutes",
          desc: "Immediately cool burn area under clean, cool running tap water for a full 20 minutes to prevent thermal spread into deeper dermal layers."
        },
        {
          step: 2,
          title: "Remove Constrictive Items Promptly",
          desc: "Carefully take off rings, watches, and loose garments before tissue edema develops. Never rip away clothing adhered to charred tissue."
        },
        {
          step: 3,
          title: "Cover with Sterile Dressing or Clean Plastic Film",
          desc: "Shield the wound using sterile non-adherent gauze or clean plastic wrap laid flat. This reduces contact pain and bacterial infiltration."
        },
        {
          step: 4,
          title: "Keep Patient Warm and Seek Clinical Evaluation",
          desc: "Prolonged cooling risks hypothermia. Cover undamaged regions with a blanket and arrange transport if burns exceed palm size or involve joints/face."
        }
      ],
      criticalTips: [
        "Never apply ice or freezing water (causes additional tissue necrosis).",
        "Never apply oils, butter, flour, or toothpastes.",
        "Do not puncture or de-roof intact burn blisters."
      ]
    },
    ta: {
      title: "தீக்காயங்கள் மேலாண்மை",
      urgency: "அவசரம்",
      steps: [
        {
          step: 1,
          title: "20 நிமிடங்கள் குளிர்ந்த நீரில் குளிர்விக்கவும்",
          desc: "தீக்காயத்தின் மேல் 20 நிமிடங்களுக்கு சாதாரண ஓடும் குளிர்ந்த நீரை ஊற்றவும். இது தோல் ஆழமாக சேதமடைவதை தடுக்கும்."
        },
        {
          step: 2,
          title: "நகைகள் மற்றும் இறுக்கமான ஆடைகளை அகற்றவும்",
          desc: "வீக்கம் ஏற்படுவதற்கு முன் மோதிரம், கைக்கடிகாரங்களை கழற்றவும். தோലோடு ஒட்டியுள்ள ஆடைகளை பலவந்தமாக இழுக்க வேண்டாம்."
        },
        {
          step: 3,
          title: "சுத்தமான துணி அல்லது பிளாஸ்டிக் ஃபிலிமால் மூடவும்",
          desc: "காயத்தின் மீது சுத்தமான ஒட்டாத துணி அல்லது க்ளிங் ஃபிலிம் வைத்து மூடவும். இது தொற்று மற்றும் வலியை குறைக்கும்."
        },
        {
          step: 4,
          title: "உடலை கதகதப்பாக வைத்து மருத்துவரிடம் செல்லவும்",
          desc: "அதிக நேரம் குளிர்விப்பதால் உடல் நடுக்கம் ஏற்படலாம். தீக்காயம் படாத பகுதிகளை போர்வையால் போர்த்தி உடனே மருத்துவமனைக்கு செல்லவும்."
        }
      ],
      criticalTips: [
        "ஒருபோதும் ஐஸ் கட்டி அல்லது பனிநீரை பயன்படுத்த வேண்டாம்.",
        "எண்ணெய், வெண்ணெய், மாவு அல்லது பற்பசை பூச வேண்டாம்.",
        "தீக்காய கொப்புளங்களை ஒருபோதும் உடைக்க வேண்டாம்."
      ]
    },
    hi: {
      title: "गंभीर जलन और छाले का प्राथमिक उपचार",
      urgency: "जरूरी",
      steps: [
        {
          step: 1,
          title: "20 मिनट तक बहते ठंडे पानी से ठंडा करें",
          desc: "जले हुए स्थान पर तुरंत 20 मिनट तक साफ नल का बहता ठंडा पानी डालें ताकि ऊतकों की गहराई तक नुकसान न पहुंचे."
        },
        {
          step: 2,
          title: "गहने और तंग कपड़े तुरंत हटाएं",
          desc: "सूजन आने से पहले अंगूठी, घड़ी और ढीले कपड़े निकालें. त्वचा से चिपके कपड़ों को जबरदस्ती न खींचें."
        },
        {
          step: 3,
          title: "साफ पट्टी या प्लास्टिक फिल्म से ढकें",
          desc: "घाव को साफ, गैर-चिपचिपी पट्टी या साफ प्लास्टिक क्लिंग फिल्म से ढकें ताकि संक्रमण और हवा का दर्द कम हो."
        },
        {
          step: 4,
          title: "रोगी को गर्म रखें और अस्पताल ले जाएं",
          desc: "ज्यादा ठंडा करने से हाइपोथर्मिया का खतरा होता है. बिना जले हिस्सों को कंबल से ढकें और डॉक्टर से संपर्क करें."
        }
      ],
      criticalTips: [
        "बर्फ या अत्यधिक ठंडा पानी कभी न लगाएं.",
        "तेल, मक्खन, आटा या टूथपेस्ट का लेप न लगाएं.",
        "जलन से बने छालों (Blisters) को न फोड़ें."
      ]
    }
  }
};
