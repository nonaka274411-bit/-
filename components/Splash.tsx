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
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-[1.5px] shadow-md">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <span className="font-serif-luxury text-amber-600 font-bold text-lg">K</span>
            </div>
          </div>
          <div>
            <h1 className="text-sm md:text-base font-serif-luxury tracking-[0.25em] text-slate-900 uppercase font-bold">
              KÉRASTASE PARIS
            </h1>
            <p className="text-[10px] tracking-[0.2em] text-amber-700 font-medium">
              美容室オークラ AI CONCIERGE
            </p>
          </div>
        </div>

        {/* 3D Inspect Mode Button */}
        {onOpen3DViewer && (
          <button
            onClick={onOpen3DViewer}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/90 hover:bg-white border border-slate-200/90 backdrop-blur-md text-slate-800 text-xs font-medium tracking-wider transition-all active:scale-95 shadow-md hover:shadow-lg"
          >
            <Eye className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">3Dボトル自由視点</span>
            <span className="sm:hidden">3D視点</span>
          </button>
        )}
      </header>

      {/* Middle Interactive Bottle Carousel & Details Bar */}
      <div className="my-auto py-6 pointer-events-auto flex flex-col items-center">
        
        {/* Floating Product Tag (Bright Luminous Frosted Glass Card) */}
        <div className="glass-panel-light px-6 py-4 rounded-3xl max-w-sm w-full text-center mb-6 shadow-xl border border-white/95 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <span className="text-[11px] uppercase tracking-[0.3em] font-serif-luxury text-amber-700 font-bold">
              {currentBottle.line}
            </span>
            <span className="text-slate-300 text-xs">·</span>
            <span className="text-[11px] tracking-widest text-slate-500 font-medium">
              {currentBottle.colorName}
            </span>
          </div>

          <h2 className="text-lg font-bold text-slate-900 tracking-wide">
            {currentBottle.name}
          </h2>

          <p className="text-xs text-slate-600 mt-1.5 font-normal leading-relaxed">
            {currentBottle.benefits}
          </p>
        </div>

        {/* 4 Iconic Bottle Switchers (Tap to focus in 3D) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-slate-200/80 shadow-lg">
          {BOTTLE_CATALOG.map((b, idx) => {
            const isActive = activeBottleIndex === idx;
            return (
              <button
                key={b.id}
                onClick={() => onSelectBottle(idx)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold shadow-[0_4px_14px_rgba(217,119,6,0.4)] scale-105'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/10 shadow-sm"
                  style={{ backgroundColor: '#' + b.primaryColor.toString(16).padStart(6, '0') }}
                />
                <span className="text-[11px] tracking-wider whitespace-nowrap">
                  {b.line.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-500 mt-3 tracking-widest text-center font-medium bg-white/60 px-3 py-1 rounded-full">
          ボトルをタップまたはドラッグして3D回転
        </p>
      </div>

      {/* Bottom CTA & Diagnosis Initiation Section */}
      <footer className="w-full flex flex-col items-center gap-4 pointer-events-auto pb-4">
        
        {/* Main CTA: Start Diagnosis */}
        <div className="w-full max-w-sm">
          <button
            onClick={onStart}
            className="group relative w-full py-4.5 px-6 rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white font-bold tracking-[0.25em] text-xs uppercase shadow-[0_15px_35px_rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-[0_20px_45px_rgba(217,119,6,0.35)] hover:from-amber-600 hover:to-amber-700 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="relative z-10 text-white font-semibold">3Dヘア診断をスタート</span>
            <ChevronRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />

            {/* Shimmer Light reflection */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-1 opacity-80 hover:opacity-100 transition-opacity cursor-pointer" onClick={onStart}>
          <span className="text-[10px] tracking-[0.3em] uppercase text-slate-600 font-bold">
            Scroll or Tap to Start
          </span>
          <ArrowDown className="w-4 h-4 text-amber-600 animate-bounce" />
        </div>
      </footer>
    </div>
  );
};

export default Splash;
