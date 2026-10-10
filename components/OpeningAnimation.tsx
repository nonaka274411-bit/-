import React, { useEffect, useState } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';

interface OpeningAnimationProps {
  onComplete: () => void;
}

const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'splash' | 'reveal' | 'zoom' | 'fade'>('splash');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 3-second cinematic timeline matching the video flow
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
    <div className={`fixed inset-0 z-[100] bg-[#070709] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-800 ${
      stage === 'fade' ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      {/* Background Studio Ambience & Golden Bokeh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1c1813] via-[#0b0b0e] to-[#050507] opacity-90" />

      {/* Floating Light Rays & Lens Flares */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-[450px] h-[450px] bg-rose-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[90px]" />
      </div>

      {/* Center 3D Holographic Stage */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-8 text-center">
        
        {/* Animated 3D Liquid Splash Swirl Ring */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8 flex items-center justify-center">
          
          {/* Swirling Liquid Ring SVG */}
          <svg className="absolute inset-0 w-full h-full animate-[spin_8s_linear_infinite]" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="goldSwirl" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#F6E05E" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#AA820A" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="roseSwirl" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FB7185" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="88" fill="none" stroke="url(#goldSwirl)" strokeWidth="3" strokeDasharray="140 380" strokeLinecap="round" />
            <circle cx="100" cy="100" r="72" fill="none" stroke="url(#roseSwirl)" strokeWidth="2" strokeDasharray="90 320" strokeLinecap="round" />
          </svg>

          {/* Reverse Splash Ring */}
          <svg className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite_reverse]" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="94" fill="none" stroke="rgba(212, 175, 55, 0.25)" strokeWidth="1.5" strokeDasharray="40 220" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" strokeDasharray="30 180" />
          </svg>

          {/* Golden Center Emblem with 3D Depth */}
          <div className={`relative z-10 w-36 h-36 md:w-44 md:h-44 rounded-full flex flex-col items-center justify-center p-4 border border-amber-400/40 bg-gradient-to-b from-[#1c1815]/80 to-[#0e0d10]/95 backdrop-blur-md shadow-[0_0_60px_rgba(212,175,55,0.35)] transition-all duration-1000 ${
            stage === 'reveal' || stage === 'zoom' ? 'scale-100 opacity-100' : 'scale-90 opacity-70'
          }`}>
            <span className="text-[10px] tracking-[0.45em] text-amber-200 uppercase font-light mb-1">
              HAUTE COIFFURE
            </span>
            <span className="text-4xl md:text-5xl font-serif-luxury font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2B2] via-[#D4AF37] to-[#997715] tracking-widest my-0.5">
              K
            </span>
            <div className="w-8 h-[1px] bg-amber-400/60 my-1" />
            <span className="text-[9px] tracking-[0.4em] text-slate-300 uppercase font-light">
              PARIS
            </span>
          </div>

          {/* Floating Droplet Elements */}
          <div className="absolute -top-2 right-8 w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_12px_#F6E05E] animate-bounce" />
          <div className="absolute bottom-6 left-6 w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_10px_#FB7185] animate-pulse" />
          <div className="absolute top-1/2 -left-3 w-2 h-2 rounded-full bg-purple-300 shadow-[0_0_8px_#A78BFA]" />
        </div>

        {/* Textual Brand Header */}
        <div className={`space-y-3 transition-all duration-700 ${stage !== 'splash' ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="flex items-center justify-center gap-2 text-amber-300 text-xs tracking-[0.3em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>Interactive 3D Ritual</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-serif-luxury text-white tracking-[0.25em] uppercase font-semibold">
            KERASTASE
          </h1>

          <p className="text-xs md:text-sm text-slate-300 tracking-[0.2em] font-light">
            美容室オークラ × 3D AI ヘアコンシェルジュ
          </p>
        </div>

        {/* Progress & Skip Button */}
        <div className="mt-8 w-full max-w-xs space-y-4">
          {/* Elegant gold progress bar */}
          <div className="w-full bg-white/10 h-[2px] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <button
            onClick={onComplete}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] tracking-widest text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
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
