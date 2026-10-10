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

  const getBottleIndexForProduct = (line: string, name: string): number => {
    const l = (line + ' ' + name).toUpperCase();
    if (l.includes('BLOND') || l.includes('シカ')) return 0;
    if (l.includes('CHROMA') || l.includes('クロマ') || l.includes('カラー')) return 1;
    if (l.includes('CHRONO') || l.includes('クロノ') || l.includes('テルミック')) return 2;
    return 3;
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
        <div className="max-w-xl mx-auto glass-panel-light rounded-3xl p-6 sm:p-8 border border-white shadow-xl relative overflow-hidden">
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              <span className="text-[11px] font-serif-luxury tracking-[0.3em] text-amber-800 uppercase font-bold">
                DIAGNOSTIC PRESCRIPTION
              </span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-medium transition-all shadow-sm"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-amber-600" />}
              <span>{copied ? 'コピー完了' : '処方を保存'}</span>
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif-luxury text-slate-900 tracking-wide font-bold mb-3">
            Your Personalized Ritual
          </h2>

          <p className="text-xs sm:text-[13px] text-slate-700 font-normal leading-relaxed mb-4 border-l-3 border-amber-500 pl-4 py-1.5 italic bg-amber-50/60 rounded-r-xl">
            "{result.summary}"
          </p>

          <div className="flex items-center gap-2 text-xs text-amber-800 font-medium bg-amber-100/60 px-3 py-1.5 rounded-xl border border-amber-200">
            <Eye className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>製品カードをタップすると背景の3Dボトルが連動ズームします</span>
          </div>
        </div>
      </div>

      {/* 3-Step Ritual Product Cards (Bright Luminous Cards) */}
      <div className="px-6 md:px-8 space-y-5 max-w-xl mx-auto w-full pointer-events-auto">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-serif-luxury tracking-widest text-slate-800 uppercase font-bold">
            3-STEP PRESCRIPTION
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
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
                  ? 'bg-white border-amber-500 shadow-[0_15px_35px_rgba(217,119,6,0.2)] ring-2 ring-amber-400/40'
                  : 'bg-white/90 hover:bg-white border-slate-200/90 hover:border-amber-300 shadow-md'
              }`}
            >
              {/* Background Step Number Watermark */}
              <div className="absolute right-4 top-2 text-[64px] font-serif-luxury font-bold text-amber-500/10 pointer-events-none select-none">
                0{idx + 1}
              </div>

              {/* Step Category Header */}
              <div className="flex items-center justify-between mb-3 relative z-10">
                <span className="text-[11px] font-mono tracking-widest text-amber-700 uppercase font-bold">
                  {stepLabels[idx] || `STEP ${idx + 1}`}
                </span>

                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-50 text-amber-800 border border-amber-200">
                  {p.line}
                </span>
              </div>

              {/* Product Title */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-wide mb-2 relative z-10 flex items-center justify-between">
                <span>{p.name}</span>
                <ChevronRight className={`w-4 h-4 text-amber-600 transition-transform ${isSelected ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal mb-3 relative z-10">
                {catalogItem?.description || p.description}
              </p>

              {/* How to Use Box */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 relative z-10">
                <div className="flex items-start gap-2">
                  <span className="text-[11px] font-bold text-amber-700 shrink-0 uppercase tracking-wider">
                    HOW TO USE:
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
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
        <div className="rounded-3xl p-6 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-300 shadow-md relative overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h4 className="text-[11px] font-serif-luxury uppercase tracking-[0.3em] text-amber-800 font-bold">
              HAIR STYLIST SECRET TIP
            </h4>
          </div>

          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium italic">
            "{result.onePointAdvice}"
          </p>

          <p className="text-xs text-slate-500 mt-3 text-right font-medium">
            美容室オークラ トップスタイリスト監修
          </p>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="px-6 md:px-8 mt-8 max-w-xl mx-auto w-full pointer-events-auto flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={onReset}
          className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg hover:shadow-xl"
        >
          <RotateCcw className="w-4 h-4 text-amber-300" />
          <span>もう一度診断する</span>
        </button>
      </div>

    </div>
  );
};

export default ResultsView;
