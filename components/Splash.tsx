
import React from 'react';

interface SplashProps {
  onStart: () => void;
}

const Splash: React.FC<SplashProps> = ({ onStart }) => {
  const brandName = "KERASTASE";
  
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-20 animate-in fade-in duration-1000 relative">
      {/* Dynamic Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c5a059] rounded-full blur-[150px] opacity-[0.08] pulse-light pointer-events-none" />
      
      {/* Decorative Particles (Simulated with simple spans) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-[#c5a059]/20 blur-sm animate-float"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${10 + i * 2}s`,
              animationDelay: `${i}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 space-y-10">
        <div className="space-y-4">
          <h2 className="text-[11px] tracking-[1em] uppercase text-gray-400 font-bold mb-6 animate-in slide-in-from-top-6 duration-1000">Paris</h2>
          <h1 className="text-6xl md:text-7xl font-serif tracking-tighter flex justify-center perspective-1000">
            {brandName.split('').map((char, i) => (
              <span 
                key={i} 
                className="letter-reveal gold-gradient px-[3px] inline-block hover:scale-110 transition-transform duration-500 cursor-default"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent mx-auto animate-in zoom-in duration-1000 delay-1000" />
      </div>

      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
        <div className="space-y-4">
          <h3 className="text-2xl font-serif text-gray-800 italic font-light tracking-wide">The Art of Hair Science</h3>
          <p className="text-[10px] text-gray-400 tracking-[0.4em] font-medium uppercase">
            AIコンシェルジュが提案する至福のリチュアル
          </p>
        </div>

        <button 
          onClick={onStart}
          className="group relative px-20 py-6 bg-white border border-[#c5a059]/30 text-[#c5a059] hover:text-white transition-all duration-1000 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2"
        >
          <span className="relative z-10 tracking-[0.4em] text-[11px] font-bold">START CONSULTATION</span>
          <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-[#c5a059] transition-transform duration-700 ease-out" />
        </button>
      </div>

      <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center space-y-2 opacity-40">
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#c5a059] to-transparent animate-bounce" />
        <span className="text-[8px] tracking-[0.5em] text-gray-400 uppercase font-bold">Discover Your Beauty</span>
      </div>
    </div>
  );
};

export default Splash;
