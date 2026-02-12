
import React, { useEffect, useState } from 'react';

interface SplashProps {
  onStart: () => void;
  animate?: boolean;
}

const Splash: React.FC<SplashProps> = ({ onStart, animate = true }) => {
  const [startAnim, setStartAnim] = useState(false);

  useEffect(() => {
    if (animate) {
      // Small buffer to ensure visual continuity after the white flash of the intro
      const timer = setTimeout(() => setStartAnim(true), 100);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white text-slate-900 relative overflow-hidden h-screen w-full">
      <style>{`
        @keyframes float-gentle {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-15px) scale(1.02); }
        }
        @keyframes reveal-up {
          from { opacity: 0; transform: translateY(30px) scale(0.95); filter: blur(5px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        .anim-float { animation: float-gentle 6s infinite alternate ease-in-out; }
        .anim-reveal { animation: reveal-up 1.4s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
      `}</style>

      {/* Main Content Area */}
      <div className={`w-full max-w-sm flex flex-col items-center justify-center z-10 transition-opacity duration-500 ${startAnim ? 'opacity-100' : 'opacity-0'}`}>
        
        <div className="space-y-16 text-center mb-16">
          <div className="space-y-8">
             <div className={startAnim ? "anim-reveal" : ""} style={{ animationDelay: '0.2s' }}>
                <p className="text-[10px] tracking-[0.6em] text-slate-400 uppercase mb-6">
                  Salon Professional Ritual
                </p>
                <h1 className="text-5xl md:text-6xl font-serif text-slate-900 tracking-[0.35em] uppercase leading-tight">
                  KERASTASE
                </h1>
             </div>
             
             <div className={`flex flex-col items-center space-y-4 ${startAnim ? "anim-reveal" : ""}`} style={{ animationDelay: '0.6s' }}>
               <div className="w-12 h-[1px] bg-slate-200"></div>
               <h2 className="text-base font-bold tracking-[0.5em] text-slate-700">
                 美容室オークラ
               </h2>
               <p className="text-[10px] tracking-[0.4em] text-slate-400 font-light">
                 AI HAIR CONCIERGE
               </p>
             </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className={`w-full px-8 ${startAnim ? "anim-reveal" : ""}`} style={{ animationDelay: '1s' }}>
           <button 
            onClick={onStart}
            className="group relative w-full py-6 overflow-hidden bg-slate-900 text-white transition-all hover:bg-black shadow-[0_20px_50px_rgba(0,0,0,0.1)] active:scale-95"
          >
            <span className="relative z-10 text-[11px] font-bold tracking-[0.5em] uppercase group-hover:tracking-[0.6em] transition-all duration-700">
              診断を開始する
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
          
          <div className="mt-10 flex flex-col items-center space-y-2 opacity-40">
            <p className="text-[8px] tracking-[0.4em] text-slate-400 text-center uppercase">
              Personalized Hair Analysis
            </p>
            <div className="w-1 h-8 bg-gradient-to-b from-slate-200 to-transparent"></div>
          </div>
        </div>
      </div>
      
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
         <div className="absolute top-[5%] -left-[10%] w-[100vw] h-[100vw] border-[0.5px] border-slate-100 rounded-full anim-float"></div>
         <div className="absolute -bottom-[15%] -right-[15%] w-[80vw] h-[80vw] border-[0.5px] border-slate-100 rounded-full anim-float" style={{animationDelay: '-3s'}}></div>
         
         {/* Center Axis */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-100 to-transparent"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-slate-100 to-transparent"></div>
      </div>

    </div>
  );
};

export default Splash;
