import React from 'react';
import { Sparkles, ArrowDown, ChevronRight, Eye } from 'lucide-react';
import { BOTTLE_CATALOG } from './ThreeScene';

interface SplashProps {
  onStart: () => void;
  activeBottleIndex: number;
  onSelectBottle: (index: number) => void;
  onOpen3DViewer?: () => void;
}

const Splash: React.FC<SplashProps> = ({
  onStart,
  activeBottleIndex,
  onSelectBottle,
  onOpen3DViewer
}) => {
  const currentBottle = BOTTLE_CATALOG[activeBottleIndex] || BOTTLE_CATALOG[2];

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between p-6 md:p-8 z-10 pointer-events-none">
      
      {/* Top Header Bar */}
      <header className="w-full flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-amber-200 p-[1px] shadow-lg">
            <div className="w-full h-full rounded-full bg-[#0d0e12] flex items-center justify-center">
              <span className="font-serif-luxury text-amber-300 font-bold text-base">K</span>
            </div>
          </div>
          <div>
            <h1 className="text-xs md:text-sm font-serif-luxury tracking-[0.25em] text-white uppercase font-bold">
              KÉRASTASE PARIS
            </h1>
            <p className="text-[10px] tracking-[0.2em] text-amber-200/80">
              美容室オークラ AI CONCIERGE
            </p>
          </div>
        </div>

        {/* 3D Inspect Mode Button */}
        {onOpen3DViewer && (
          <button
            onClick={onOpen3DViewer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md text-white text-[11px] tracking-wider transition-all active:scale-95 shadow-md"
          >
            <Eye className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">3Dボトル自由視点</span>
            <span className="sm:hidden">3D視点</span>
          </button>
        )}
      </header>

      {/* Middle Interactive Bottle Carousel & Details Bar */}
      <div className="my-auto py-6 pointer-events-auto flex flex-col items-center">
        
        {/* Floating Product Tag (Frosted Glass 3D Pill) */}
        <div className="glass-panel-dark px-5 py-3 rounded-2xl max-w-sm w-full text-center mb-6 shadow-2xl border border-white/15 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-[0.3em] font-serif-luxury text-amber-300 font-semibold">
              {currentBottle.line}
            </span>
            <span className="text-white/30 text-xs">·</span>
            <span className="text-[10px] tracking-widest text-slate-300">
              {currentBottle.colorName}
            </span>
          </div>

          <h2 className="text-base font-medium text-white tracking-wide">
            {currentBottle.name}
          </h2>

          <p className="text-[11px] text-amber-100/70 mt-1 font-light tracking-wide">
            {currentBottle.benefits}
          </p>
        </div>

        {/* 4 Iconic Bottle Switchers (Tap to focus in 3D) */}
        <div className="flex items-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-xl">
          {BOTTLE_CATALOG.map((b, idx) => {
            const isActive = activeBottleIndex === idx;
            return (
              <button
                key={b.id}
                onClick={() => onSelectBottle(idx)}
                className={`relative px-3 py-1.5 rounded-full text-[11px] transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/80 to-amber-600/90 text-white font-medium shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full border border-white/40"
                  style={{ backgroundColor: '#' + b.primaryColor.toString(16).padStart(6, '0') }}
                />
                <span className="text-[10px] tracking-wider whitespace-nowrap">
                  {b.line.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-[10px] text-slate-400 mt-2 tracking-widest text-center">
          ボトルをタップまたはドラッグして3D回転
        </p>
      </div>

      {/* Bottom CTA & Diagnosis Initiation Section */}
      <footer className="w-full flex flex-col items-center gap-4 pointer-events-auto pb-4">
        
        {/* Main CTA: Start Diagnosis */}
        <div className="w-full max-w-sm">
          <button
            onClick={onStart}
            className="group relative w-full py-4.5 px-6 rounded-2xl overflow-hidden bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-semibold tracking-[0.25em] text-xs uppercase shadow-[0_15px_35px_rgba(212,175,55,0.35)] transition-all duration-300 hover:shadow-[0_20px_45px_rgba(212,175,55,0.5)] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
            <span className="relative z-10">3Dヘア診断をスタート</span>
            <ChevronRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />

            {/* Shimmer Light reflection */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity cursor-pointer" onClick={onStart}>
          <span className="text-[9px] tracking-[0.3em] uppercase text-slate-400">
            Scroll or Tap to Start
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
        </div>
      </footer>
    </div>
  );
};

export default Splash;
