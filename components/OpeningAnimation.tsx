import React, { useEffect, useState } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';

interface OpeningAnimationProps {
  onComplete: () => void;
}

const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'splash' | 'reveal' | 'zoom' | 'fade'>('splash');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => Math.min(100, p + 2));
    }, 45);

    const tReveal = setTimeout(() => setStage('reveal'), 700);
    const tZoom = setTimeout(() => setStage('zoom'), 1700);
    const tFade = setTimeout(() => setStage('fade'), 2600);
    const tEnd = setTimeout(onComplete, 3100);

    return () => {
      clearInterval(interval);
      clearTimeout(tReveal);
      clearTimeout(tZoom);
      clearTimeout(tFade);
      clearTimeout(tEnd);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#faf8f5] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-800 ${
      stage === 'fade' ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      {/* Background Luminous Studio Ambience & Golden Bokeh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-[#fcfaf7] to-[#f4f0e8] opacity-95" />

      {/* Floating Light Rays & Soft Warm Flares */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-200/40 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-[450px] h-[450px] bg-rose-200/30 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-200/30 rounded-full blur-[90px]" />
      </div>

      {/* Center 3D Stage */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-8 text-center">
        
        {/* Animated Liquid Splash Swirl Ring */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8 flex items-center justify-center">
          
          <svg className="absolute inset-0 w-full h-full animate-[spin_8s_linear_infinite]" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="goldSwirl" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#F6E05E" stopOpacity="1" />
                <stop offset="100%" stopColor="#AA820A" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="roseSwirl" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FB7185" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="88" fill="none" stroke="url(#goldSwirl)" strokeWidth="3.5" strokeDasharray="140 380" strokeLinecap="round" />
            <circle cx="100" cy="100" r="72" fill="none" stroke="url(#roseSwirl)" strokeWidth="2.5" strokeDasharray="90 320" strokeLinecap="round" />
          </svg>

          <svg className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite_reverse]" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="94" fill="none" stroke="rgba(212, 175, 55, 0.35)" strokeWidth="1.5" strokeDasharray="40 220" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(217, 119, 6, 0.4)" strokeWidth="1.5" strokeDasharray="30 180" />
          </svg>

          {/* Luminous Center Emblem with 3D Depth */}
          <div className={`relative z-10 w-36 h-36 md:w-44 md:h-44 rounded-full flex flex-col items-center justify-center p-4 border border-amber-300/80 bg-white/90 backdrop-blur-xl shadow-[0_10px_40px_rgba(212,175,55,0.25)] transition-all duration-1000 ${
            stage === 'reveal' || stage === 'zoom' ? 'scale-100 opacity-100' : 'scale-90 opacity-70'
          }`}>
            <span className="text-[10px] tracking-[0.45em] text-amber-800 uppercase font-bold mb-1">
              HAUTE COIFFURE
            </span>
            <span className="text-4xl md:text-5xl font-serif-luxury font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 tracking-widest my-0.5">
              K
            </span>
            <div className="w-8 h-[1.5px] bg-amber-400 my-1" />
            <span className="text-[10px] tracking-[0.4em] text-slate-700 uppercase font-bold">
              PARIS
            </span>
          </div>

          <div className="absolute -top-2 right-8 w-3 h-3 rounded-full bg-amber-400 shadow-md animate-bounce" />
          <div className="absolute bottom-6 left-6 w-2.5 h-2.5 rounded-full bg-rose-400 shadow-md animate-pulse" />
          <div className="absolute top-1/2 -left-3 w-2 h-2 rounded-full bg-purple-400 shadow-md" />
        </div>

        {/* Textual Brand Header */}
        <div className={`space-y-3 transition-all duration-700 ${stage !== 'splash' ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="flex items-center justify-center gap-2 text-amber-700 text-xs tracking-[0.3em] uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
            <span>Interactive 3D Ritual</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-serif-luxury text-slate-900 tracking-[0.25em] uppercase font-bold">
            KERASTASE
          </h1>

          <p className="text-xs md:text-sm text-slate-600 tracking-[0.2em] font-medium">
            美容室オークラ × 3D AI ヘアコンシェルジュ
          </p>
        </div>

        {/* Progress & Skip Button */}
        <div className="mt-8 w-full max-w-xs space-y-4">
          <div className="w-full bg-slate-200 h-[2.5px] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <button
            onClick={onComplete}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-widest text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 transition-colors shadow-sm"
          >
            <span>SKIP INTRO</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpeningAnimation;
