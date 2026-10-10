import React, { useState } from 'react';
import { DiagnosisResult } from '../types';
import { KERASTASE_PRODUCTS } from '../productData';
import { Sparkles, RotateCcw, Share2, CheckCircle2, ChevronRight, Eye } from 'lucide-react';

interface ResultsViewProps {
  result: DiagnosisResult;
  onReset: () => void;
  onFocusBottle?: (index: number) => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  onReset,
  onFocusBottle
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [copied, setCopied] = useState(false);

  // Helper to map product line to 3D bottle index
  const getBottleIndexForProduct = (line: string, name: string): number => {
    const l = (line + ' ' + name).toUpperCase();
    if (l.includes('BLOND') || l.includes('シカ')) return 0; // Blond Absolu
    if (l.includes('CHROMA') || l.includes('クロマ') || l.includes('カラー')) return 1; // Chroma Absolu
    if (l.includes('CHRONO') || l.includes('クロノ') || l.includes('テルミック')) return 2; // Chronologiste
    return 3; // Elixir Ultime / Oil
  };

  const handleCardClick = (idx: number, line: string, name: string) => {
    setActiveStep(idx);
    if (onFocusBottle) {
      const bIdx = getBottleIndexForProduct(line, name);
      onFocusBottle(bIdx);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      const text = `【ケラスターゼ AI 3Dヘア診断結果】\nあなた専用の3ステップリチュアル:\n` +
        result.products.map((p, i) => `STEP ${i + 1}: ${p.name} (${p.line})`).join('\n') +
        `\n\nプロのアドバイス:\n${result.onePointAdvice}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col pb-24 z-20 pointer-events-none">
      
      {/* Top Floating Header */}
      <div className="p-6 md:p-8 pointer-events-auto">
        <div className="max-w-xl mx-auto glass-panel-dark rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative overflow-hidden">
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[10px] font-serif-luxury tracking-[0.3em] text-amber-300 uppercase font-semibold">
                DIAGNOSTIC PRESCRIPTION
              </span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 text-[11px] transition-all"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-amber-300" />}
              <span>{copied ? 'コピー完了' : '処方を保存'}</span>
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif-luxury text-white tracking-wide font-light mb-3">
            Your Personalized Ritual
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-4 border-l-2 border-amber-400/80 pl-3.5 py-1 italic bg-white/5 rounded-r-lg">
            "{result.summary}"
          </p>

          <div className="flex items-center gap-2 text-[11px] text-amber-200/90 font-light">
            <Eye className="w-3.5 h-3.5 text-amber-300" />
            <span>製品カードをタップすると背景の3Dボトルが連動ズームします</span>
          </div>
        </div>
      </div>

      {/* 3-Step Ritual Product Cards (Tactile 3D Cards) */}
      <div className="px-6 md:px-8 space-y-5 max-w-xl mx-auto w-full pointer-events-auto">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-serif-luxury tracking-widest text-slate-300 uppercase">
            3-STEP PRESCRIPTION
          </span>
          <span className="text-[10px] text-slate-400">
            タップで3Dフォーカス
          </span>
        </div>

        {result.products.map((p, idx) => {
          const catalogItem = KERASTASE_PRODUCTS.find(item => item.name === p.name);
          const isSelected = activeStep === idx;
          const stepLabels = ['STEP 1 · クレンジング (頭皮・髪の土台)', 'STEP 2 · 集中補修 (髪質の深層ケア)', 'STEP 3 · プロテクト & 仕上げ (至高のツヤ)'];

          return (
            <div
              key={idx}
              onClick={() => handleCardClick(idx, p.line, p.name)}
              className={`group relative rounded-3xl p-5 sm:p-6 transition-all duration-300 cursor-pointer border active:scale-[0.99] ${
                isSelected
                  ? 'glass-panel-dark border-amber-400/60 shadow-[0_15px_35px_rgba(212,175,55,0.25)] ring-1 ring-amber-400/30'
                  : 'bg-[#121216]/80 hover:bg-[#1a1a22]/90 border-white/10 hover:border-white/20'
              }`}
            >
              {/* Background Step Number Watermark */}
              <div className="absolute right-4 top-2 text-[64px] font-serif-luxury font-bold text-white/5 pointer-events-none select-none">
                0{idx + 1}
              </div>

              {/* Step Category Header */}
              <div className="flex items-center justify-between mb-3 relative z-10">
                <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase">
                  {stepLabels[idx] || `STEP ${idx + 1}`}
                </span>

                <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase bg-white/10 text-slate-300">
                  {p.line}
                </span>
              </div>

              {/* Product Title */}
              <h3 className="text-base sm:text-lg font-medium text-white tracking-wide mb-2 relative z-10 flex items-center justify-between">
                <span>{p.name}</span>
                <ChevronRight className={`w-4 h-4 text-amber-300 transition-transform ${isSelected ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
              </h3>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed font-light mb-3 relative z-10">
                {catalogItem?.description || p.description}
              </p>

              {/* How to Use Box */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 relative z-10">
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-bold text-amber-400 shrink-0 uppercase tracking-wider">
                    HOW TO USE:
                  </span>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                    {p.howToUse}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Professional Stylist One-Point Tip */}
      <div className="px-6 md:px-8 mt-6 max-w-xl mx-auto w-full pointer-events-auto">
        <div className="glass-panel-dark rounded-3xl p-6 border border-amber-400/30 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <h4 className="text-[10px] font-serif-luxury uppercase tracking-[0.3em] text-amber-300 font-semibold">
              HAIR STYLIST SECRET TIP
            </h4>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light italic">
            "{result.onePointAdvice}"
          </p>

          <p className="text-[10px] text-slate-400 mt-3 text-right">
            美容室オークラ トップスタイリスト監修
          </p>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="px-6 md:px-8 mt-8 max-w-xl mx-auto w-full pointer-events-auto flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={onReset}
          className="w-full py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md"
        >
          <RotateCcw className="w-4 h-4 text-amber-300" />
          <span>もう一度診断する</span>
        </button>
      </div>

    </div>
  );
};

export default ResultsView;
