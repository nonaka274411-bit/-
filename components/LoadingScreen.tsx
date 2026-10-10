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
      
      {/* 3D Frosted Glass Container */}
      <div className="w-full max-w-sm glass-panel-dark rounded-3xl p-8 flex flex-col items-center text-center border border-white/20 shadow-2xl relative overflow-hidden pointer-events-auto">
        
        {/* Swirling Liquid Ring Animation */}
        <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
          {/* Animated Gold Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
          <div className="absolute inset-2 rounded-full border border-rose-400/30 border-b-rose-400 animate-[spin_3s_linear_infinite_reverse]" />
          
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500/20 to-amber-200/20 backdrop-blur-md flex items-center justify-center border border-amber-400/40 shadow-[0_0_25px_rgba(212,175,55,0.4)]">
            <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
          </div>

          {/* Orbiting particles */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_8px_#F6E05E]" />
          <div className="absolute bottom-1 right-2 w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_#FB7185]" />
        </div>

        {/* Brand Kicker */}
        <p className="text-[10px] tracking-[0.4em] font-serif-luxury text-amber-300 uppercase font-semibold mb-2">
          KÉRASTASE RITUAL AI
        </p>

        <h3 className="text-lg font-serif-luxury text-white tracking-widest uppercase mb-4">
          処方フォーミュラ調合中
        </h3>

        {/* Phase Text */}
        <div className="h-10 flex items-center justify-center">
          <p className="text-xs text-slate-300 font-light tracking-wide animate-fade-in key={phaseIndex}">
            {ANALYSIS_PHASES[phaseIndex]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-6 mb-2">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-400 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="w-full flex justify-between text-[10px] text-slate-400 font-mono">
          <span>DIAGNOSIS ACTIVE</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
