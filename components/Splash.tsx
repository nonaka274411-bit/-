
import React from 'react';

interface SplashProps {
  onStart: () => void;
}

const Splash: React.FC<SplashProps> = ({ onStart }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white text-[#333333]">
      <div className="w-full max-w-sm space-y-12 text-center animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-widest uppercase">
            KERASTASE
          </h1>
          <p className="text-sm text-gray-500 tracking-wide">
            PERSONAL HAIR DIAGNOSIS
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-gray-600">
            あなたの髪質やライフスタイルに合わせて、<br/>
            最適なヘアケアプランをご提案します。
          </p>
        </div>

        <button 
          onClick={onStart}
          className="w-full py-4 bg-black text-white text-sm font-bold tracking-widest hover:bg-gray-800 transition-colors"
        >
          診断を始める
        </button>
      </div>
    </div>
  );
};

export default Splash;
