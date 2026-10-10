import React, { useState } from 'react';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';

interface QuestionCardProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  options: string[];
  selectedOption?: string;
  onSelect: (option: string) => void;
  onBack?: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  stepNumber,
  totalSteps,
  title,
  subtitle,
  options,
  selectedOption,
  onSelect,
  onBack
}) => {
  const [clickedOption, setClickedOption] = useState<string | null>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8; // -4 to 4 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x: y, y: x });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleChoose = (opt: string) => {
    setClickedOption(opt);
    setTimeout(() => {
      onSelect(opt);
    }, 280);
  };

  return (
    <div className="relative w-full min-h-[82vh] flex flex-col justify-center items-center px-4 py-8 z-20 pointer-events-none">
      
      {/* 3D Glass Morphism Container */}
      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
        className="w-full max-w-md glass-panel-dark rounded-3xl p-6 sm:p-8 pointer-events-auto border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden"
      >
        
        {/* Subtle Ambient Golden Sheen inside Card */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Navigation & Step Indicator */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          {onBack ? (
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
              <span>前へ</span>
            </button>
          ) : (
            <div className="w-12" />
          )}

          {/* Luxury Step Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span className="text-[10px] font-serif-luxury tracking-widest text-amber-300 uppercase font-semibold">
              STEP {stepNumber.toString().padStart(2, '0')} / {totalSteps.toString().padStart(2, '0')}
            </span>
          </div>

          <span className="text-[11px] font-mono text-slate-400">
            {Math.round((stepNumber / totalSteps) * 100)}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-6 relative z-10">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-500 ease-out"
            style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
          />
        </div>

        {/* Question Header */}
        <div className="mb-6 text-center sm:text-left relative z-10">
          <h2 className="text-xl sm:text-2xl font-serif-luxury font-light text-white tracking-wide leading-snug mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-amber-100/70 font-light">
              {subtitle}
            </p>
          )}
          <div className="w-12 h-[2px] bg-gradient-to-r from-amber-400 to-transparent mt-3 mx-auto sm:mx-0" />
        </div>

        {/* Options Stack (Tactile 3D Buttons) */}
        <div className="space-y-3 relative z-10">
          {options.map((option, idx) => {
            const isSelected = clickedOption === option || selectedOption === option;

            return (
              <button
                key={option}
                onClick={() => handleChoose(option)}
                className={`group relative w-full text-left p-4 sm:p-4.5 rounded-2xl border transition-all duration-300 flex items-center justify-between shadow-md active:scale-[0.98] ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500/90 to-amber-600/95 border-amber-300 text-slate-950 font-medium shadow-[0_10px_25px_rgba(212,175,55,0.4)] translate-y-[-2px]'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-amber-400/40 text-slate-200 hover:text-white hover:translate-y-[-1px]'
                }`}
              >
                {/* Left index circle */}
                <div className="flex items-center gap-3.5 flex-1 pr-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-colors ${
                    isSelected
                      ? 'bg-slate-950 text-amber-300'
                      : 'bg-white/10 text-slate-300 group-hover:bg-amber-400/20 group-hover:text-amber-200'
                  }`}>
                    {idx + 1}
                  </span>

                  <span className="text-xs sm:text-sm font-light tracking-wide leading-relaxed">
                    {option}
                  </span>
                </div>

                {/* Right Selection Status */}
                <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-slate-950 text-amber-400 scale-100 opacity-100'
                    : 'opacity-0 scale-75 group-hover:opacity-40'
                }`}>
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>

                {/* Shimmer Accent on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </button>
            );
          })}
        </div>

        {/* Step Context Hint */}
        <p className="text-[10px] text-center text-slate-400 mt-5 tracking-widest font-light">
          サロンカルテに基づくAI最適化分析中
        </p>
      </div>
    </div>
  );
};

export default QuestionCard;
