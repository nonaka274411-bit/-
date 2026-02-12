
import React from 'react';
import { DiagnosisResult } from '../types';
import { KERASTASE_PRODUCTS } from '../productData';
import ProductIcon from './ProductIcon';

interface ResultsViewProps {
  result: DiagnosisResult;
  onReset: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ result, onReset }) => {
  return (
    <div className="flex-1 flex flex-col bg-white animate-fade-in pb-16">
      {/* Header Area */}
      <div className="px-8 pt-12 pb-8 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-1 h-4 bg-black"></div>
          <p className="text-[10px] tracking-[0.3em] text-gray-500 uppercase font-bold">Prescription</p>
        </div>
        <h2 className="text-3xl font-light text-slate-900 mb-6 tracking-wide">Your Personalized<br/>Ritual</h2>
        <div className="p-4 bg-white border-l-2 border-slate-300">
          <p className="text-xs text-slate-600 leading-7 font-light italic">
            "{result.summary}"
          </p>
        </div>
      </div>

      {/* Product List - Using Custom SVG Icons */}
      <div className="flex-1 px-8 py-8 space-y-16">
        {result.products.map((p, idx) => {
          const catalogItem = KERASTASE_PRODUCTS.find(item => item.name === p.name);
          const type = catalogItem?.type || 'shampoo';
          const color = catalogItem?.color || '#333';
          
          return (
            <div key={idx} className="group relative">
              {/* Step Indicator Background */}
              <div className="absolute -left-4 -top-6 text-[80px] font-bold text-gray-50 -z-10 select-none font-serif opacity-50">
                {idx + 1}
              </div>

              <div className="flex flex-row items-center gap-8">
                {/* Product Icon Section */}
                <div className="w-24 h-32 flex-shrink-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                   <ProductIcon type={type} color={color} className="w-full h-full drop-shadow-lg" />
                </div>
                
                {/* Text Content */}
                <div className="flex-1 py-1">
                  <div className="mb-3">
                    <span className="inline-block py-1 px-2 bg-gray-100 text-[8px] font-bold tracking-widest text-slate-500 uppercase rounded-sm">
                      {p.line}
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-slate-900 mb-3 leading-tight">{p.name}</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed mb-4 font-light">
                    {catalogItem?.description || p.description}
                  </p>
                  
                  <div className="flex items-start space-x-2 pt-3 border-t border-dashed border-gray-200">
                    <span className="text-[10px] font-bold text-slate-400 mt-0.5">USE:</span>
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      {p.howToUse}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Advice Section - Modern Card */}
      <div className="mx-6 mb-12">
        <div className="bg-slate-900 text-white px-8 py-8 shadow-xl">
          <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-700 pb-2">Professional Tip</h3>
          <p className="text-sm text-gray-300 leading-8 font-light font-serif italic">
            {result.onePointAdvice}
          </p>
        </div>
      </div>

      {/* Footer Action */}
      <div className="text-center pb-8">
        <button 
          onClick={onReset}
          className="text-[10px] font-bold tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors uppercase border-b border-transparent hover:border-slate-900 pb-1"
        >
          Start New Diagnosis
        </button>
      </div>
    </div>
  );
};

export default ResultsView;
