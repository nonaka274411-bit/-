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
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6; // -3 to 3 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
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
      
      {/* 3D Bright Luminous Glass Container */}
      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
        className="w-full max-w-md glass-panel-light rounded-3xl p-6 sm:p-8 pointer-events-auto border border-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] backdrop-blur-2xl relative overflow-hidden"
      >
        
        {/* Subtle Ambient Light Warm Glows inside Card */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-rose-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Navigation & Step Indicator */}
        <div className="flex items-center justify-between mb-5 relative z-10">
          {onBack ? (
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-medium transition-colors bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full border border-slate-200"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-600" />
              <span>前へ</span>
            </button>
          ) : (
            <div className="w-12" />
          )}

          {/* Step Pill */}
          <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300 shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span className="text-[11px] font-serif-luxury tracking-widest text-amber-800 uppercase font-bold">
              STEP {stepNumber.toString().padStart(2, '0')} / {totalSteps.toString().padStart(2, '0')}
            </span>
          </div>

          <span className="text-xs font-mono font-bold text-slate-500">
            {Math.round((stepNumber / totalSteps) * 100)}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-6 relative z-10 border border-slate-200/60">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500 ease-out"
            style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
          />
        </div>

        {/* Question Header */}
        <div className="mb-6 text-center sm:text-left relative z-10">
          <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-slate-900 tracking-wide leading-snug mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-[13px] text-slate-600 font-normal leading-relaxed">
              {subtitle}
            </p>
          )}
          <div className="w-12 h-[2.5px] bg-gradient-to-r from-amber-500 to-amber-200 mt-3 mx-auto sm:mx-0 rounded-full" />
        </div>

        {/* Options Stack (Tactile 3D Buttons - High Contrast) */}
        <div className="space-y-3 relative z-10">
          {options.map((option, idx) => {
            const isSelected = clickedOption === option || selectedOption === option;

            return (
              <button
                key={option}
                onClick={() => handleChoose(option)}
                className={`group relative w-full text-left p-4 sm:p-4.5 rounded-2xl border transition-all duration-200 flex items-center justify-between shadow-sm active:scale-[0.98] ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 border-amber-600 text-white font-bold shadow-[0_10px_25px_rgba(217,119,6,0.35)] translate-y-[-2px]'
                    : 'bg-white/95 hover:bg-white border-slate-200/90 hover:border-amber-400 text-slate-800 hover:text-slate-900 hover:shadow-md hover:translate-y-[-1px]'
                }`}
              >
                {/* Left index circle */}
                <div className="flex items-center gap-3.5 flex-1 pr-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono font-bold transition-colors ${
                    isSelected
                      ? 'bg-white text-amber-700 shadow-sm'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-amber-100 group-hover:text-amber-800'
                  }`}>
                    {idx + 1}
                  </span>

                  <span className={`text-xs sm:text-sm tracking-wide leading-relaxed ${
                    isSelected ? 'font-bold text-white' : 'font-medium text-slate-800'
                  }`}>
                    {option}
                  </span>
                </div>

                {/* Right Selection Status */}
                <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-white text-amber-600 scale-100 opacity-100 shadow-sm'
                    : 'opacity-0 scale-75 group-hover:opacity-40'
                }`}>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Step Context Hint */}
        <p className="text-[11px] text-center text-slate-500 mt-5 tracking-widest font-medium">
          サロンカルテに基づくAI最適化分析中
        </p>
      </div>
    </div>
  );
};

export default QuestionCard;
