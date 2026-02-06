
import React from 'react';
import { DiagnosisResult } from '../types';
import { KERASTASE_PRODUCTS } from '../productData';

interface ResultsViewProps {
  result: DiagnosisResult;
  onReset: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ result, onReset }) => {
  return (
    <div className="flex-1 py-16 flex flex-col space-y-16 animate-in fade-in duration-1000 bg-white">
      {/* Header */}
      <div className="text-center space-y-4 px-6">
        <h2 className="text-3xl font-serif text-gray-900 tracking-tight">Your Personal Ritual</h2>
        <div className="h-[0.5px] w-12 bg-[#c5a059] mx-auto opacity-30" />
        <p className="text-[13px] text-gray-500 font-light leading-relaxed italic max-w-xs mx-auto">
          "{result.summary}"
        </p>
      </div>

      {/* Product List */}
      <div className="space-y-24 px-1">
        {result.products.map((p, idx) => {
          const catalogItem = KERASTASE_PRODUCTS.find(item => item.name === p.name);
          const displayDescription = catalogItem?.description || p.description;
          const displayImage = catalogItem?.image || `https://source.unsplash.com/featured/?cosmetics,luxury,hair&sig=${idx}`;
          
          return (
            <div 
              key={idx} 
              className="group flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-10" 
              style={{ animationDelay: `${idx * 200}ms` }}
            >
              {/* Image with Uniform Aspect Ratio */}
              <div className="relative w-full image-aspect bg-gray-50 overflow-hidden shadow-sm transition-all duration-1000 group-hover:shadow-xl">
                <img 
                  src={displayImage} 
                  alt={p.name}
                  className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-1000 scale-[1.01] hover:scale-105"
                />
                <div className="absolute top-0 right-0 p-6">
                   <span className="text-[10px] font-serif text-[#c5a059] tracking-widest bg-white/80 backdrop-blur px-4 py-2 border border-gray-100">STEP 0{idx + 1}</span>
                </div>
              </div>

              {/* Text Info */}
              <div className="space-y-4 px-4">
                <div className="space-y-1">
                  <span className="text-[9px] tracking-[0.4em] text-[#c5a059] uppercase font-bold">{p.line}</span>
                  <h3 className="text-2xl font-serif text-gray-900 leading-tight">{p.name}</h3>
                </div>
                
                <p className="text-[13px] text-gray-500 font-light leading-relaxed border-l-2 border-[#c5a059]/10 pl-4 py-1">
                  {displayDescription}
                </p>
                
                <div className="bg-gray-50/50 p-5 space-y-2">
                   <span className="text-[8px] text-gray-400 uppercase tracking-widest font-bold block">Expert Guidance</span>
                   <p className="text-[11px] text-gray-500 italic leading-relaxed">{p.howToUse}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Advice Section */}
      <div className="mx-6 p-10 bg-[#fdfaf3] text-center space-y-6 border border-[#c5a059]/5 animate-in fade-in duration-1000 delay-500">
        <div className="inline-block px-3 py-1 border-y border-[#c5a059]/20">
          <span className="text-[9px] tracking-[0.4em] text-[#c5a059] uppercase font-bold">One Point Advice</span>
        </div>
        <p className="text-[13px] text-gray-700 font-light leading-loose max-w-xs mx-auto italic">
          {result.onePointAdvice}
        </p>
      </div>

      {/* Final Action */}
      <div className="pt-8 pb-20 flex flex-col items-center space-y-10 px-6">
        <button className="w-full py-6 bg-gray-900 text-white text-[10px] font-bold tracking-[0.5em] uppercase hover:bg-[#c5a059] transition-all duration-700 shadow-xl active:scale-95">
          Shop Your Ritual
        </button>
        <button 
          onClick={onReset}
          className="text-gray-300 text-[9px] tracking-[0.4em] uppercase hover:text-gray-600 transition-colors"
        >
          Reset Analysis
        </button>
      </div>
    </div>
  );
};

export default ResultsView;
