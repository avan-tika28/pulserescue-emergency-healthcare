import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  AlertTriangle, 
  CheckCircle2, 
  Stethoscope, 
  Users, 
  Copy, 
  Check, 
  Clock,
  AlertCircle,
  RotateCcw,
  Sparkles,
  FileSearch
} from 'lucide-react';
import { SAMPLE_REPORTS } from '../data/mockData';

export default function MedicalReportAnalyzer() {
  const [selectedReportId, setSelectedReportId] = useState(SAMPLE_REPORTS[0].id);
  const [copied, setCopied] = useState(false);
  const [uploadState, setUploadState] = useState('IDLE'); // 'IDLE', 'PROCESSING', 'SUCCESS', 'ERROR'
  const [activeTab, setActiveTab] = useState('doctor'); // 'doctor' or 'patient'
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const currentReport = SAMPLE_REPORTS.find(r => r.id === selectedReportId) || SAMPLE_REPORTS[0];

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setUploadState('PROCESSING');
      setErrorMessage('');

      setTimeout(() => {
        setUploadState('SUCCESS');
        setSelectedReportId(SAMPLE_REPORTS[1].id);
      }, 1600);
    }
  };

  const handleSimulateError = () => {
    setUploadedFileName('corrupted_stat_scan_904.pdf');
    setUploadState('PROCESSING');
    setTimeout(() => {
      setUploadState('ERROR');
      setErrorMessage('OCR Extraction Failed: Document image resolution insufficient to reliably extract numerical biomarker assays (Unrecognized DICOM/HL7 format). Please upload standard pathology PDF.');
    }, 1200);
  };

  const handleCopyNotes = () => {
    const text = `${currentReport.title}\nAssessment: ${currentReport.overallAssessment}\n${currentReport.summaryText}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 bg-slate-100 text-slate-700 rounded">
              <FileText className="w-4 h-4 text-teal-700" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
              Stat Emergency Laboratory
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Medical Diagnostic Report Analyzer
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated extraction of critical biomarkers, abnormal clinical flags, and dual physician/caregiver summaries.
          </p>
        </div>

        {/* Upload & Error Testing Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleSimulateError}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-red-700 hover:bg-red-50 border border-slate-200 transition"
          >
            Simulate Scan Error
          </button>

          <label className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg text-xs flex items-center gap-2 cursor-pointer shadow-xs transition">
            <Upload className="w-3.5 h-3.5 text-teal-400" />
            <span>Upload Stat Lab (PDF / TXT)</span>
            <input 
              type="file" 
              className="hidden" 
              accept=".pdf,.txt,.csv,.json"
              onChange={handleFileUpload} 
            />
          </label>
        </div>
      </div>

      {/* PROCESSING STATE */}
      {uploadState === 'PROCESSING' && (
        <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 shadow-sm space-y-2.5 animate-fadeIn">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-teal-300 flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-teal-400 border-t-transparent rounded-full animate-spin"></span>
              Optical Character Recognition (OCR) & AI Biomarker Extraction In Progress...
            </span>
            <span className="font-mono text-slate-400 text-[11px]">{uploadedFileName}</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-teal-500 h-full w-2/3 animate-pulse"></div>
          </div>
          <p className="text-[11px] text-slate-400">
            Parsing troponin, white blood cell counts, lactate levels, and cross-matching physiological reference standards.
          </p>
        </div>
      )}

      {/* ERROR STATE */}
      {uploadState === 'ERROR' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-800 font-bold text-xs">
              <AlertCircle className="w-4 h-4 text-red-600" />
              Document Ingestion Warning
            </div>
            <button
              onClick={() => setUploadState('IDLE')}
              className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-red-300 text-red-700 rounded text-xs font-medium"
            >
              Dismiss
            </button>
          </div>
          <p className="text-xs text-red-700 leading-relaxed">
            {errorMessage}
          </p>
        </div>
      )}

      {/* SUCCESS STATE NOTIFICATION */}
      {uploadState === 'SUCCESS' && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800 animate-fadeIn">
          <span className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Successfully ingested and analyzed {uploadedFileName}. Critical biomarkers mapped below.
          </span>
          <button
            onClick={() => setUploadState('IDLE')}
            className="text-emerald-700 font-semibold underline text-[11px]"
          >
            Clear Banner
          </button>
        </div>
      )}

      {/* Select Report Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SAMPLE_REPORTS.map((rep) => (
          <button
            key={rep.id}
            onClick={() => setSelectedReportId(rep.id)}
            className={`p-3.5 rounded-lg border text-left transition-colors ${
              selectedReportId === rep.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className={selectedReportId === rep.id ? 'text-teal-300 font-semibold' : 'text-slate-500'}>
                {rep.patientName}
              </span>
              <span className={selectedReportId === rep.id ? 'text-slate-400' : 'text-slate-400'}>
                {rep.date.split(',')[1]}
              </span>
            </div>
            <h4 className="font-bold text-xs sm:text-sm line-clamp-1">{rep.title}</h4>
            <span className={`inline-block mt-2 text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
              rep.overallAssessment.includes('CRITICAL') || rep.overallAssessment.includes('HIGH')
                ? 'bg-red-50 text-red-700 border-red-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              {rep.overallAssessment.split(':')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Report Details Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Meta Header */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                VERIFIED STAT LAB
              </span>
              <span className="text-xs font-mono text-slate-500">{currentReport.patientId}</span>
              <span className="text-xs text-slate-400">• {currentReport.lab}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              {currentReport.title}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Patient: <strong className="text-slate-900">{currentReport.patientName}</strong> • Recorded: {currentReport.date}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyNotes}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-medium rounded-lg border border-slate-300 text-xs flex items-center gap-1.5 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Clinical Order'}</span>
            </button>
          </div>
        </div>

        {/* Assessment Strip */}
        <div className="p-4 bg-red-50/70 border-b border-red-200 flex items-start gap-3">
          <div className="p-1 bg-red-600 text-white rounded shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-900">
              {currentReport.overallAssessment}
            </h4>
            <p className="text-xs text-red-800 mt-0.5 leading-relaxed">
              {currentReport.summaryText}
            </p>
          </div>
        </div>

        {/* Biomarkers Table */}
        <div className="p-5 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Observed Biomarkers & Reference Ranges
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                  <th className="py-2 font-bold">Biomarker / Assay</th>
                  <th className="py-2 font-bold">Measured Value</th>
                  <th className="py-2 font-bold">Reference Range</th>
                  <th className="py-2 font-bold">Diagnostic Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentReport.biomarkers.map((bm, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-2.5 font-medium text-slate-900">{bm.name}</td>
                    <td className="py-2.5 font-mono font-bold text-xs text-slate-900">
                      {bm.value} <span className="font-normal text-slate-500">{bm.unit}</span>
                    </td>
                    <td className="py-2.5 font-mono text-slate-500">{bm.normalRange} {bm.unit}</td>
                    <td className="py-2.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                        bm.flag === 'critical'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : bm.flag === 'high'
                          ? 'bg-orange-50 text-orange-700 border-orange-200'
                          : bm.flag === 'warning'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {bm.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Perspectives: Doctor vs Caregiver */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <button
              onClick={() => setActiveTab('doctor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'doctor'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5 text-teal-400" />
              Trauma Physician Directives
            </button>
            <button
              onClick={() => setActiveTab('patient')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'patient'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-teal-200" />
              Plain English (Patient & Family Translation)
            </button>
          </div>

          {activeTab === 'doctor' ? (
            <div className="space-y-2.5">
              <span className="text-xs font-semibold text-slate-800 block">
                Evidence-Based Protocol Recommendations:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentReport.doctorRecommendations.map((rec, i) => (
                  <div key={i} className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-1.5">
              <span className="text-xs font-semibold text-slate-800">
                Caregiver & Patient Summary:
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentReport.patientFriendlyExplanation}
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
