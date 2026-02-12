
import React, { useEffect, useState } from 'react';

interface OpeningAnimationProps {
  onComplete: () => void;
}

const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'draw' | 'appear' | 'snip' | 'flash'>('draw');

  useEffect(() => {
    // Timeline
    const tAppear = setTimeout(() => setPhase('appear'), 800);   // Scissors appear
    const tSnip = setTimeout(() => setPhase('snip'), 1400);      // Snip action
    const tFlash = setTimeout(() => setPhase('flash'), 1700);    // Impact/Whiteout
    const tEnd = setTimeout(onComplete, 2400);                   // Handoff

    return () => {
      [tAppear, tSnip, tFlash, tEnd].forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-colors duration-700 ease-out ${phase === 'flash' ? 'bg-white' : 'bg-[#0A0A0A]'}`}>
      <style>{`
        @keyframes draw-line {
          0% { height: 0; opacity: 0; }
          100% { height: 60vh; opacity: 1; }
        }
        @keyframes scissor-scale-in {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes snip-upper {
          0% { transform: rotate(-30deg); }
          60% { transform: rotate(-40deg); }
          100% { transform: rotate(0deg); } /* Close */
        }
        @keyframes snip-lower {
          0% { transform: rotate(30deg); }
          60% { transform: rotate(40deg); }
          100% { transform: rotate(0deg); } /* Close */
        }
        @keyframes flash-expand {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
        @keyframes fade-out-element {
          to { opacity: 0; transform: scale(1.1); }
        }

        .anim-draw { animation: draw-line 0.8s cubic-bezier(0.45, 0, 0.55, 1) forwards; }
        .anim-scissor-in { animation: scissor-scale-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .anim-snip-u { animation: snip-upper 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards; }
        .anim-snip-l { animation: snip-lower 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards; }
        .anim-flash { animation: flash-expand 0.6s ease-out forwards; }
        .anim-exit { animation: fade-out-element 0.5s ease-out forwards; }
      `}</style>

      {/* --- FLASH LAYER --- */}
      {phase === 'flash' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
            <div className="w-[100vmax] h-[100vmax] bg-white rounded-full anim-flash origin-center"></div>
        </div>
      )}

      {/* --- CONTENT LAYER --- */}
      <div className={`relative z-20 flex items-center justify-center ${phase === 'flash' ? 'anim-exit' : ''}`}>
        
        {/* The Golden Hair Strand */}
        <div className={`absolute w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent shadow-[0_0_8px_#D4AF37] anim-draw ${phase === 'snip' || phase === 'flash' ? 'opacity-50' : ''}`} style={{ height: '60vh' }}></div>

        {/* The Scissors */}
        {(phase === 'appear' || phase === 'snip' || phase === 'flash') && (
          <div className="w-40 h-40 anim-scissor-in drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE68A" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#B4912F" />
                </linearGradient>
              </defs>
              
              <g transform="translate(50, 50)">
                {/* Upper Blade */}
                <g className={phase === 'snip' || phase === 'flash' ? 'anim-snip-u' : ''} style={{ transform: 'rotate(-30deg)' }}>
                  <path d="M-45 -5 L10 0 L50 -2 L55 0 L10 2 L-45 5 Z" fill="url(#gold-gradient)" />
                  <circle cx="-45" cy="-8" r="8" fill="none" stroke="url(#gold-gradient)" strokeWidth="1.5" />
                </g>
                
                {/* Lower Blade */}
                <g className={phase === 'snip' || phase === 'flash' ? 'anim-snip-l' : ''} style={{ transform: 'rotate(30deg)' }}>
                  <path d="M-45 5 L10 0 L50 2 L55 0 L10 -2 L-45 -5 Z" fill="url(#gold-gradient)" />
                  <circle cx="-45" cy="8" r="8" fill="none" stroke="url(#gold-gradient)" strokeWidth="1.5" />
                </g>
                
                {/* Pivot Gem */}
                <circle cx="0" cy="0" r="2.5" fill="#FFF" className="drop-shadow-md" />
              </g>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpeningAnimation;
