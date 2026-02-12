import React from 'react';

interface SplashProps {
  onStart: () => void;
}

const Splash: React.FC<SplashProps> = ({ onStart }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white text-[#333333] relative overflow-hidden">
      {/* Symbolic Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] border border-gray-100 rounded-full animate-[spin_60s_linear_infinite] opacity-50 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-gray-100 rounded-full animate-[spin_40s_linear_infinite_reverse] opacity-50 pointer-events-none"></div>

      <div className="w-full max-w-sm space-y-16 text-center animate-fade-in relative z-10">
        <div className="space-y-6">
          <div className="flex justify-center mb-4">
             {/* K Icon Simplified */}
             <div className="w-12 h-12 border-2 border-black flex items-center justify-center text-2xl font-serif">K</div>
          </div>
          <h1 className="text-3xl font-bold tracking-[0.25em] uppercase text-black">
            Kérastase
          </h1>
          <div className="h-[1px] w-12 bg-black mx-auto"></div>
          <p className="text-xs text-gray-500 tracking-[0.2em] uppercase">
            Hair Diagnosis
          </p>
        </div>

        <div className="space-y-4 px-4">
          <p className="text-sm leading-8 text-gray-600 font-light">
            Discover your personalized ritual.<br/>
            あなただけの、美しさの解を。
          </p>
        </div>

        <div className="pt-4">
          <button 
            onClick={onStart}
            className="group relative w-full py-4 overflow-hidden bg-black text-white text-xs font-bold tracking-[0.25em] transition-all hover:bg-gray-900"
          >
            <span className="relative z-10 uppercase">Start Diagnosis</span>
            <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-gray-800"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Splash;