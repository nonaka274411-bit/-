import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

const ANALYSIS_PHASES = [
  '髪質の毛髪幹構造 & ダメージ深度を解析中...',
  '頭皮環境とくせ・うねりバランスを照合中...',
  'ケラスターゼ全シリーズから最適処方を調合中...',
  '至高の3ステップ パーソナルリチュアルを生成中...'
];

const LoadingScreen: React.FC = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setPhaseIndex(prev => (prev + 1) % ANALYSIS_PHASES.length);
    }, 900);

    const progInterval = setInterval(() => {
      setProgress(p => Math.min(95, p + 2));
    }, 50);

    return () => {
      clearInterval(phaseInterval);
      clearInterval(progInterval);
    };
  }, []);

  return (
    <div className="relative w-full min-h-[75vh] flex flex-col items-center justify-center px-6 z-20 pointer-events-none">
      
      {/* Bright Luminous Frosted Glass Container */}
      <div className="w-full max-w-sm glass-panel-light rounded-3xl p-8 flex flex-col items-center text-center border border-white shadow-2xl relative overflow-hidden pointer-events-auto">
        
        {/* Swirling Liquid Ring Animation */}
        <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-amber-300 border-t-amber-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border border-rose-300 border-b-rose-500 animate-[spin_3s_linear_infinite_reverse]" />
          
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-100 to-amber-200 backdrop-blur-md flex items-center justify-center border border-amber-300 shadow-[0_0_20px_rgba(217,119,6,0.3)]">
            <Sparkles className="w-6 h-6 text-amber-600 animate-pulse" />
          </div>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-amber-500 shadow-md" />
          <div className="absolute bottom-1 right-2 w-2 h-2 rounded-full bg-rose-500 shadow-md" />
        </div>

        {/* Brand Kicker */}
        <p className="text-[11px] tracking-[0.4em] font-serif-luxury text-amber-800 uppercase font-bold mb-2">
          KÉRASTASE RITUAL AI
        </p>

        <h3 className="text-xl font-serif-luxury text-slate-900 tracking-wider uppercase font-bold mb-4">
          処方フォーミュラ調合中
        </h3>

        {/* Phase Text */}
        <div className="h-10 flex items-center justify-center">
          <p className="text-xs sm:text-sm text-slate-700 font-medium tracking-wide animate-fade-in key={phaseIndex}">
            {ANALYSIS_PHASES[phaseIndex]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-6 mb-2 border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="w-full flex justify-between text-xs text-slate-500 font-mono font-bold">
          <span>DIAGNOSIS ACTIVE</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
