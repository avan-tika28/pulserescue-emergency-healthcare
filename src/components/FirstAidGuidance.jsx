import React, { useState, useEffect, useRef } from 'react';
import { 
  HeartPulse, 
  LifeBuoy, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Globe
} from 'lucide-react';
import { MULTILINGUAL_FIRST_AID } from '../data/mockData';

export default function FirstAidGuidance() {
  const [selectedKey, setSelectedKey] = useState('cpr');
  const [language, setLanguage] = useState('en'); // 'en', 'ta', 'hi'
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // CPR Metronome State
  const [metronomeRunning, setMetronomeRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [beatCount, setBeatCount] = useState(0);
  const [isBreathsPhase, setIsBreathsPhase] = useState(false);

  const audioCtxRef = useRef(null);
  const metronomeIntervalRef = useRef(null);

  const protocol = MULTILINGUAL_FIRST_AID[selectedKey] || MULTILINGUAL_FIRST_AID.cpr;
  const protocolData = protocol[language] || protocol.en;

  // Web Audio click generator for CPR metronome
  const playClick = (isHigh = false) => {
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
      osc.type = 'sine';
      osc.frequency.setValueAtTime(isHigh ? 900 : 620, ctx.currentTime);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch (e) {
      console.log('Audio err', e);
    }
  };

  useEffect(() => {
    if (metronomeRunning) {
      // 110 BPM ≈ 545ms per beat
      const beatMs = Math.round(60000 / 110);
      metronomeIntervalRef.current = setInterval(() => {
        setBeatCount((prev) => {
          const next = prev + 1;
          if (next % 30 === 0) {
            setIsBreathsPhase(true);
            playClick(true);
            setTimeout(() => setIsBreathsPhase(false), 3000);
          } else {
            playClick(false);
          }
          return next;
        });
      }, beatMs);
    } else {
      if (metronomeIntervalRef.current) clearInterval(metronomeIntervalRef.current);
    }

    return () => {
      if (metronomeIntervalRef.current) clearInterval(metronomeIntervalRef.current);
    };
  }, [metronomeRunning, soundEnabled]);

  const handleToggleMetronome = () => {
    if (!metronomeRunning && soundEnabled) playClick(true);
    setMetronomeRunning(!metronomeRunning);
  };

  const handleResetMetronome = () => {
    setMetronomeRunning(false);
    setBeatCount(0);
    setIsBreathsPhase(false);
  };

  const protocolKeys = [
    { key: 'cpr', label: 'CPR Resuscitation' },
    { key: 'bleeding', label: 'Severe Bleeding' },
    { key: 'stroke', label: 'Stroke (F.A.S.T.)' },
    { key: 'choking', label: 'Choking (Heimlich)' },
    { key: 'burns', label: 'Burns & Scalds' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 bg-slate-100 text-slate-700 rounded">
              <LifeBuoy className="w-4 h-4 text-teal-700" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
              Offline Resuscitation Protocols
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Emergency First-Aid Clinical Protocols
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Standardized life support directives available in English, தமிழ் (Tamil), and हिंदी (Hindi).
          </p>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200 shrink-0">
          <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-0.5" />
          <button
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
              language === 'en'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('ta')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
              language === 'ta'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            தமிழ்
          </button>
          <button
            onClick={() => setLanguage('hi')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
              language === 'hi'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            हिंदी
          </button>
        </div>
      </div>

      {/* Protocol Selection Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-1">
        {protocolKeys.map((p) => {
          const currentProto = MULTILINGUAL_FIRST_AID[p.key];
          const protoLocalized = currentProto?.[language] || currentProto?.en;
          const isSelected = selectedKey === p.key;

          return (
            <button
              key={p.key}
              onClick={() => {
                setSelectedKey(p.key);
                setActiveStepIndex(0);
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {protoLocalized?.title?.split('(')[0]?.trim() || p.label}
            </button>
          );
        })}
      </div>

      {/* Protocol Content Box */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Banner */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded border bg-red-50 text-red-700 border-red-200">
                {protocolData.urgency}
              </span>
              <span className="text-xs font-medium text-slate-500">{protocol.category}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {protocolData.title}
            </h3>
          </div>

          <span className="text-xs font-medium text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200">
            {protocolData.steps.length} Step Protocol
          </span>
        </div>

        {/* CPR Metronome Interactive Pod */}
        {protocol.hasMetronome && (
          <div className="p-5 bg-slate-900 text-white border-b border-slate-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className={`w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 ${
                  metronomeRunning ? 'scale-105' : ''
                }`}>
                  <HeartPulse className={`w-7 h-7 text-red-500 ${metronomeRunning ? 'animate-pulse' : ''}`} />
                </div>

                <div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                      Standardized CPR Compression Cadence
                    </span>
                    <span className="px-2 py-0.2 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                      110 BPM
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-0.5">
                    {language === 'ta' ? 'தொடர்ச்சியான நெஞ்சு அழுத்த வேகம் (110 BPM)' : language === 'hi' ? 'निरंतर छाती दबाव मेट्रोनोम (110 BPM)' : 'Continuous Hands-Only Compression Metronome'}
                  </h4>
                  <p className="text-xs text-slate-400 max-w-md">
                    {language === 'ta' ? 'இதயத்திற்கு ரத்த ஓட்டத்தை அதிகரிக்க நிமிடத்திற்கு 100-120 முறை அழுத்தவும்.' : language === 'hi' ? 'रक्त प्रवाह बनाए रखने के लिए 100-120 दबाव प्रति मिनट की अनुशंसित लय.' : 'Maintains the AHA-recommended 100–120 compressions/min pace for optimal coronary and cerebral perfusion.'}
                  </p>
                </div>
              </div>

              {/* Compression Counter & Controls */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="bg-slate-800 px-4 py-2.5 rounded-lg border border-slate-700 text-center min-w-[100px]">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">
                    {isBreathsPhase ? 'RESCUE BREATHS' : 'COMPRESSION'}
                  </span>
                  <div className={`text-2xl font-bold font-mono leading-none mt-1 ${isBreathsPhase ? 'text-teal-400 animate-bounce' : 'text-white'}`}>
                    {isBreathsPhase ? 'BREATHE' : (beatCount % 30 || 30)}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Total: {beatCount}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleToggleMetronome}
                    className={`px-4 py-2.5 rounded-lg font-semibold text-xs flex items-center gap-1.5 shadow-xs transition ${
                      metronomeRunning
                        ? 'bg-amber-500 hover:bg-amber-600 text-slate-900'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                  >
                    {metronomeRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{metronomeRunning ? 'Pause' : 'Start Beat'}</span>
                  </button>

                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                    title="Toggle audio click"
                  >
                    {soundEnabled ? <Volume2 className="w-4 h-4 text-teal-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                  </button>

                  <button
                    onClick={handleResetMetronome}
                    className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                    title="Reset counter"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Step-by-Step Instructions */}
        <div className="p-5 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {language === 'ta' ? 'படிமுறை வழிகாட்டி' : language === 'hi' ? 'चरण-दर-चरण निर्देश' : 'Protocol Action Steps'}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {protocolData.steps.map((st, i) => (
              <div
                key={i}
                className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white transition-colors flex gap-3 shadow-2xs"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {st.step}
                </div>
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-slate-900">{st.title}</h5>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Warnings */}
        <div className="p-5 bg-amber-50/70 border-t border-amber-200 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
            {language === 'ta' ? 'முக்கிய எச்சரிக்கைகள் (செய்யக்கூடாதவை)' : language === 'hi' ? 'महत्वपूर्ण सावधानियां (क्या न करें)' : 'Critical Clinical Caveats (Contraindicated Actions)'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {protocolData.criticalTips.map((tip, idx) => (
              <div key={idx} className="p-2.5 bg-white rounded-lg border border-amber-200 text-xs text-slate-700 flex items-start gap-2 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-1.5"></span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
